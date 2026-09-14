const fs = require('fs');
const https = require('https');

const fetchJson = (url) => new Promise((resolve, reject) => {
    https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
    }).on('error', reject);
});

(async () => {
    console.log('Fetching learnsets from Pokemon Showdown...');
    const scriptText = await fetchJson('https://play.pokemonshowdown.com/data/learnsets.js');
    
    console.log('Parsing learnsets...');
    // The file contains `exports.BattleLearnsets = { ... }` or similar.
    // We can evaluate it in a clean environment.
    const sandbox = { exports: {} };
    require('vm').runInNewContext(scriptText, sandbox);
    const learnsets = sandbox.exports.BattleLearnsets || sandbox.exports.Learnsets;
    
    if (!learnsets) {
        console.error('Failed to parse learnsets!');
        process.exit(1);
    }

    console.log('Loading local pokemon.json...');
    const pokemonData = JSON.parse(fs.readFileSync('public/data/pokemon.json', 'utf8'));

    const toId = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

    const newMovesets = {};
    let matchedCount = 0;
    let missing = [];

    const mapPokemon = (node, isForm = false) => {
        if (!node) return;
        const name = node.Name || node.name;
        if (!name) return;
        
        let id = toId(name);
        
        // Handle Alola, Galar, Hisui, Paldea forms correctly
        // e.g. "Rattata-Alola" -> "rattataalola"
        
        // Sometimes base forms are needed, or specific fallbacks.
        let moves = [];
        if (learnsets[id] && learnsets[id].learnset) {
            moves = Object.keys(learnsets[id].learnset);
        } else {
            // fallback: check base node
            let baseId = toId(node.baseSpecies || name.split('-')[0]);
            if (learnsets[baseId] && learnsets[baseId].learnset) {
                moves = Object.keys(learnsets[baseId].learnset);
            }
        }
        
        if (moves.length > 0) {
            newMovesets[name] = moves;
            matchedCount++;
        } else {
            missing.push(name);
        }
        
        if (node.forms) {
            for (let fKey in node.forms) {
                mapPokemon(node.forms[fKey], true);
            }
        }
        if (node.evolutions) {
            for (let e of node.evolutions) {
                mapPokemon(e, false);
            }
        }
    };

    for (let key in pokemonData) {
        mapPokemon(pokemonData[key]);
    }

    console.log(`Matched moves for ${matchedCount} Pokemon/forms.`);
    console.log(`Missing moves for ${missing.length} Pokemon/forms:`);
    console.log(missing.join(', '));

    fs.writeFileSync('public/data/movesets.json', JSON.stringify(newMovesets, null, 2));
    console.log('Saved updated movesets to public/data/movesets.json');
})();
