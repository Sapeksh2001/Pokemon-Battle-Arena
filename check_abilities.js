import fs from 'fs';

// Read pokemon data
const dataCode = fs.readFileSync('./src/data/pokemon_data.js', 'utf8');
const mapCode = fs.readFileSync('./src/data/abilities_map.js', 'utf8');

global.window = {};
// Quick and dirty eval to get the object
let Pokedex;
eval(dataCode.replace('export const Pokedex =', 'Pokedex =').replace('export const MergedPokemonData', 'var MergedPokemonData'));

let PokemonAbilitiesMap = {};
eval(mapCode.replace('var PokemonAbilitiesMap =', 'PokemonAbilitiesMap =').replace('if (typeof window', '//'));

let missing = 0;
let total = 0;

for (let key in Pokedex) {
    const p = Pokedex[key];
    
    function checkMap(name) {
        total++;
        const normalize = (n) => n ? n.replace(/-/g, ' ').replace(/\s+/g, ' ').trim() : '';
        const normName = normalize(name);
        if (!PokemonAbilitiesMap[normName] && !PokemonAbilitiesMap[name]) {
            missing++;
        }
    }
    
    checkMap(p.name || p.Name || key);
    
    if (p.forms) {
        for (let fKey in p.forms) {
            const f = p.forms[fKey];
            checkMap(f.name || f.Name || fKey);
        }
    }
}
console.log(`Missing abilities for ${missing} out of ${total} Pokemon.`);
