import data from './test_dataset.js';
import { PokemonDatabase } from './src/engine/services/PokemonDatabase.js';

const db = new PokemonDatabase(data);
db.buildIndex();

const tiers = ['Final', 'Legendary', 'Ultra Beast', 'Mythical'];
const filtered = db._buildFiltered(tiers);

const undefinedNames = filtered.filter(n => typeof n === 'undefined');
console.log('Undefined names count:', undefinedNames.length);
if (undefinedNames.length > 0) {
  // Why is it undefined? Let's check some nodes
  let count = 0;
  for (const { foundNode } of db._index.values()) {
      if (foundNode.tier && tiers.includes(foundNode.tier)) {
          if (!foundNode.Name) {
              console.log('Node without Name property:', foundNode.name || foundNode);
              count++;
              if (count > 5) break;
          }
      }
  }
}
