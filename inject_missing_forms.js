const fs = require('fs');
const https = require('https');

function fetchPokedex() {
    return new Promise((resolve, reject) => {
        https.get('https://play.pokemonshowdown.com/data/pokedex.js', (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function calculateLv100MaxStats(baseStats) {
    const stats = {};
    const iv = 31;
    const ev = 252;
    const level = 100;
    
    for (const [stat, base] of Object.entries(baseStats)) {
        if (stat === 'hp') {
            stats.hp = Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + level + 10;
        } else {
            // max+ nature adds 10%
            let calc = Math.floor((Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + 5) * 1.1);
            
            // map PS stat names to dataset names
            let mappedStat = stat;
            if (stat === 'atk') mappedStat = 'attack';
            if (stat === 'def') mappedStat = 'defence';
            if (stat === 'spa') mappedStat = 'specialAttack';
            if (stat === 'spd') mappedStat = 'specialDefence';
            if (stat === 'spe') mappedStat = 'speed';
            
            stats[mappedStat] = calc;
        }
    }
    return stats;
}

function normalizeId(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

async function run() {
    console.log("Fetching live Showdown Pokedex...");
    const rawPokedex = await fetchPokedex();
    
    // Evaluate the showdown config into a local variable
    let BattlePokedex = {};
    // Extract everything after `exports.BattlePokedex = `
    const match = rawPokedex.match(/exports\.BattlePokedex\s*=\s*(\{.*?\});/s);
    if (!match) {
        console.error("Failed to parse pokedex");
        return;
    }
    
    // Safer eval by simulating exports Environment
    eval(`const exports = {}; ${rawPokedex}; BattlePokedex = exports.BattlePokedex;`);

    // Load our local dataset
    let datasetRaw = fs.readFileSync('Pokemon_NewDataset.js', 'utf8');
    
    // Using simple regex patching for the local dataset might be risky because of its size.
    // Instead we parse the entire Dataset dictionary into an object!
    // Strip the "const MergedPokemonData = " and parse it safely
    let jsonMatch = datasetRaw.match(/const MergedPokemonData = (\{[\s\S]+\});/);
    if (!jsonMatch) {
         console.error("Could not find MergedPokemonData in file");
         return;
    }
    
    // Eval the dataset to manipulate it properly
    let MergedPokemonData;
    eval(`MergedPokemonData = ${jsonMatch[1]}`);

    // Map all names to their base formats string names
    // Some ps forms don't explicitly list baseSpecies if they are completely different forms with same pokedex ID.
    // We will just iterate all BattlePokedex keys, see if they have baseSpecies.
    
    let addedCount = 0;
    
    // Helper: traverse evolutions and return array of all pokemon representations
    function getAllPokemonInDataset() {
        const found = [];
        
         function traverse(evoList) {
             for (const p of evoList) {
                 found.push(p);
                 if (p.evolutions && p.evolutions.length > 0) {
                     traverse(p.evolutions);
                 }
             }
         }
         traverse(Object.values(MergedPokemonData));
         return found;
    }
    
    const allPokemon = getAllPokemonInDataset();
    // Build a map of name -> Object reference
    const nameMap = {};
    for (const p of allPokemon) {
        nameMap[p.Name] = p;
    }

    // Now look for missing alternate forms in Showdown's pokedex
    for (const [key, psData] of Object.entries(BattlePokedex)) {
        if (!psData.baseSpecies) continue; // Not an alternate form
        
        const baseName = psData.baseSpecies;
        const formObj = nameMap[baseName];
        
        // If we don't have the base species in our dataset, skip
        if (!formObj) continue;
        
        // If it's a mega/alolan/etc it might already be in our forms dictionary. 
        // Our forms dictionary is keyed differently depending on how it was generated.
        if (!formObj.forms) formObj.forms = {};
        
        const formName = psData.forme || psData.name;
        
        // Exclude meaningless/purely cosmetic or gigantamax if they don't change stats/types, but users requested forms.
        // Actually, Gmax only changes HP in SS. We will include.
        if (psData.name === baseName) continue;
        
        // Check if we already have it.
        const alreadyExists = Object.values(formObj.forms).some(f => f.name === psData.name);
        if (alreadyExists) continue;

        // Generate form entry
        const id = normalizeId(psData.name);
        
        const types = psData.types || formObj.types;
        let stats;
        if (psData.baseStats) {
            stats = calculateLv100MaxStats(psData.baseStats);
        } else {
            stats = formObj.stats; // Fallback to base form stats if not redefined
        }
        
        let sprite = `https://play.pokemonshowdown.com/sprites/ani/${id}.gif`;
        if (id.startsWith('iron') && id !== 'ironcross') sprite = `https://play.pokemonshowdown.com/sprites/gen5/${id}.png`; // Paradox fixes from earlier
        const cry = `https://play.pokemonshowdown.com/audio/cries/${id}.mp3`;
        
        // Tier tagging logic
        let tier = "Variant";
        if (id.includes('mega')) tier = "Mega";
        if (id.includes('alola')) tier = "Alolan";
        if (id.includes('galar')) tier = "Galarian";
        if (id.includes('hisui')) tier = "Hisuian";
        if (id.includes('paldea')) tier = "Paldean";
        if (id.includes('gmax')) tier = "G-Max";
        if (psData.tags && psData.tags.includes("Legendary")) tier = "Legendary";
        if (psData.tags && psData.tags.includes("Mythical")) tier = "Mythical";

        formObj.forms[psData.forme || id] = {
            name: psData.name,
            stats: stats,
            types: types,
            sprite: sprite,
            cry: cry,
            tier: tier,
            isSeparateEntry: false
        };
        
        console.log(`Added form ${psData.name} to ${baseName}`);
        addedCount++;
    }
    
    if (addedCount > 0) {
        // Unfortunately, stringifying directly loses the original formatting and ordering, 
        // but JavaScript objects output normally is valid JS.
        // Let's use JSON.stringify but remove quotes from keys to match the style somewhat, 
        // though standard JSON format is fine as it evaluates identically!
        const newFileContent = datasetRaw.replace(jsonMatch[1], JSON.stringify(MergedPokemonData, null, 2));
        fs.writeFileSync('Pokemon_NewDataset.js', newFileContent);
        console.log(`\nSuccessfully injected ${addedCount} missing forms into Pokemon_NewDataset.js!`);
    } else {
        console.log("No missing forms found to add.");
    }
}

run();
