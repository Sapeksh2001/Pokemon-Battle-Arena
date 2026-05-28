import data from './test_dataset.js';
import { PokemonDatabase } from './src/engine/services/PokemonDatabase.js';
import { Pokemon } from './src/engine/models/Pokemon.js';

const db = new PokemonDatabase(data);
db.buildIndex();

const tiers = ['Final', 'Legendary', 'Ultra Beast', 'Mythical'];
const filtered = db._buildFiltered(tiers);
const pool = [...filtered].sort(() => 0.5 - Math.random());
let errorCount = 0;
for (const name of pool) {
    const r = db.find(name);
    try {
        new Pokemon(r.foundNode, r.baseNode);
    } catch (err) {
        console.error(`Error creating ${name}:`, err.message);
        errorCount++;
        if (errorCount > 3) break;
    }
}
console.log('Total errors:', errorCount);
