import data from './test_dataset.js';
import { PokemonDatabase } from './src/engine/services/PokemonDatabase.js';

const db = new PokemonDatabase(data);
db.buildIndex();

const tiers = ['Final', 'Legendary', 'Ultra Beast', 'Mythical'];
const filtered = db._buildFiltered(tiers);
console.log('Filtered pool size:', filtered.length);
if (filtered.length === 0) {
  console.log('All names in DB:', db.allNames.length);
  const existingTiers = new Set();
  for (const v of db._index.values()) {
     existingTiers.add(v.foundNode.tier);
  }
  console.log('Existing tiers:', Array.from(existingTiers));
}
