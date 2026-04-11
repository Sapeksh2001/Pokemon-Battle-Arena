import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_PATH = path.join(__dirname, 'play.csv');
const DATASET_PATH = path.join(__dirname, 'Pokemon_NewDataset.js');

function loadCsvMapping() {
    const csvContent = fs.readFileSync(CSV_PATH, 'utf8');
    const lines = csvContent.split('\n');
    const mapping = {};
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const [filename, url] = line.split(',');
        if (filename && url) {
            const cleanFilename = filename.replace(/[’‘]/g, "'");
            const slug = cleanFilename.replace(/\.(gif|png|jpg)$/i, '').toLowerCase();
            mapping[slug] = url;
            const stripped = slug.replace(/['-]/g, '');
            if (!mapping[stripped]) mapping[stripped] = url;
        }
    }
    return mapping;
}

function getSlugs(name) {
    if (!name) return [];
    let base = name.toLowerCase().replace(/[’‘]/g, "'");
    const candidates = new Set();
    let standard = base.replace(/[:."\s]/g, '');
    if (standard === 'type-null') standard = 'typenull';
    candidates.add(standard);
    candidates.add(standard.replace(/-/g, ''));
    if (standard.includes('%')) candidates.add(standard.replace('%', ''));
    candidates.add(standard.replace(/-mega-([xy])$/, '-mega$1'));
    if (standard.endsWith('-f')) candidates.add(standard);
    else if (standard.endsWith('-m')) candidates.add(standard);
    return Array.from(candidates);
}

function scanDataset(pokemon, results, baseName) {
    const name = pokemon.Name || pokemon.name || baseName;
    const slugs = getSlugs(name);
    results.totalEntries++;
    results.entries[name] = { name, slugs, currentSprite: pokemon.sprite };
    if (pokemon.forms) {
        for (const fKey in pokemon.forms) {
            scanDataset(pokemon.forms[fKey], results, name);
        }
    }
    if (pokemon.evolutions && Array.isArray(pokemon.evolutions)) {
        pokemon.evolutions.forEach(evo => {
            scanDataset(evo, results, evo.Name);
        });
    }
}

async function main() {
    const csvMap = loadCsvMapping();
    const fileContent = fs.readFileSync(DATASET_PATH, 'utf8');
    const startIndex = fileContent.indexOf('{');
    const endIndex = fileContent.lastIndexOf('}');
    const jsonString = fileContent.substring(startIndex, endIndex + 1);
    const MergedPokemonData = eval(`(${jsonString})`);

    const scanResults = { totalEntries: 0, entries: {} };
    for (const pKey in MergedPokemonData) {
        scanDataset(MergedPokemonData[pKey], scanResults, pKey);
    }

    const missingInCsv = [];
    for (const name in scanResults.entries) {
        const entry = scanResults.entries[name];
        let found = false;
        for (const slug of entry.slugs) {
            if (csvMap[slug]) {
                found = true;
                break;
            }
        }
        if (!found) missingInCsv.push(name);
    }

    console.log(JSON.stringify(missingInCsv));
}

main();
