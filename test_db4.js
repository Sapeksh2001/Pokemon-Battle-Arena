import data from './test_dataset.js';
import { PokemonDatabase } from './src/engine/services/PokemonDatabase.js';

const db = new PokemonDatabase(data);
db.buildIndex();

const tiers = ['Final', 'Legendary', 'Ultra Beast', 'Mythical'];
const filtered = db._buildFiltered(tiers);
const pool = [...filtered].sort(() => 0.5 - Math.random());
const teamNames = [];
for (let i = 0; i < 6; i++) teamNames.push(pool.shift());

console.log('teamNames:', teamNames);

const team = teamNames.map(n => {
    const r = db.find(n);
    if (!r) console.log('COULD NOT FIND:', n);
    return r ? { name: r.foundNode.Name } : null;
}).filter(Boolean);

console.log('team size:', team.length);
