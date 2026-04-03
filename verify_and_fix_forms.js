const fs = require('fs');
const https = require('https');

const datasetPath = 'Pokemon_NewDataset.js';
let raw = fs.readFileSync(datasetPath, 'utf8');
let jsonMatch = raw.match(/const MergedPokemonData = (\{[\s\S]+\});/);
if (!jsonMatch) {
    console.error("Could not parse dataset.");
    process.exit(1);
}

let MergedPokemonData;
eval(`MergedPokemonData = ${jsonMatch[1]}`);

// Gather all pokemon that have forms
const pokemonWithForms = [];
const urlsToCheck = new Set();
const linkOriginMap = new Map(); // url -> { pokemon, formName, type (sprite/cry) }

function traverse(obj) {
    for (const p of Object.values(obj)) {
        if (p.forms && Object.keys(p.forms).length > 0) {
            pokemonWithForms.push(p.Name);
            for (const f of Object.values(p.forms)) {
                urlsToCheck.add(f.sprite);
                urlsToCheck.add(f.cry);
                linkOriginMap.set(f.sprite, { base: p.Name, formName: f.name, type: 'sprite', ref: f });
                linkOriginMap.set(f.cry, { base: p.Name, formName: f.name, type: 'cry', ref: f });
            }
        }
        if (p.evolutions && p.evolutions.length > 0) {
            traverse(p.evolutions);
        }
    }
}
traverse(MergedPokemonData);

console.log(`Found ${pokemonWithForms.length} base Pokémon that have alternate forms.`);
console.log(`List: ${pokemonWithForms.join(', ')}\n`);

const checkUrl = (url) => new Promise(resolve => {
    https.get(url, { method: 'HEAD' }, res => resolve(res.statusCode)).on('error', () => resolve(500));
});

async function verifyAndFix() {
    const brokenUrls = [];
    const urls = Array.from(urlsToCheck);
    
    console.log(`Checking ${urls.length} form URLs for 404s...`);
    
    // Concurrent checking
    const concurrency = 20;
    for (let i = 0; i < urls.length; i += concurrency) {
        const batch = urls.slice(i, i + concurrency);
        const results = await Promise.all(batch.map(checkUrl));
        for (let j = 0; j < batch.length; j++) {
            if (results[j] !== 200) {
                brokenUrls.push(batch[j]);
            }
        }
    }

    if (brokenUrls.length === 0) {
        console.log("All alternate form links are perfectly working! 0 broken links.");
        return;
    }

    console.log(`Found ${brokenUrls.length} broken links. Starting auto-fix...\n`);
    let fixedCount = 0;

    for (const url of brokenUrls) {
        const info = linkOriginMap.get(url);
        let fixedUrl = null;
        
        if (info.type === 'sprite') {
            // Try gen5 png fallback
            let tryUrl = url.replace('sprites/ani/', 'sprites/gen5/').replace('.gif', '.png');
            if (await checkUrl(tryUrl) === 200) fixedUrl = tryUrl;
            
            // Try base pokemon sprite
            if (!fixedUrl) {
                const baseId = info.base.toLowerCase().replace(/[^a-z0-9]+/g, '');
                tryUrl = `https://play.pokemonshowdown.com/sprites/ani/${baseId}.gif`;
                if (await checkUrl(tryUrl) === 200) fixedUrl = tryUrl;
            }
        } else if (info.type === 'cry') {
            // Try base pokemon cry
            const baseId = info.base.toLowerCase().replace(/[^a-z0-9]+/g, '');
            let tryUrl = `https://play.pokemonshowdown.com/audio/cries/${baseId}.mp3`;
            if (await checkUrl(tryUrl) === 200) fixedUrl = tryUrl;
        }

        if (fixedUrl) {
            console.log(`FIXED: ${url} \n    -> ${fixedUrl}`);
            info.ref[info.type] = fixedUrl;
            fixedCount++;
        } else {
            console.log(`UNABLE TO FIX: ${url}`);
        }
    }

    if (fixedCount > 0) {
        const newFileContent = raw.replace(jsonMatch[1], JSON.stringify(MergedPokemonData, null, 2));
        fs.writeFileSync(datasetPath, newFileContent);
        console.log(`\nSuccessfully applied ${fixedCount} fixes to Pokémon_NewDataset.js!`);
    }
}

verifyAndFix();
