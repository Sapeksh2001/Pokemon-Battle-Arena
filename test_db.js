import fs from 'fs';
import { PokemonDatabase } from './src/engine/services/PokemonDatabase.js';

let dataString = fs.readFileSync('./src/data/Pokemon_NewDataset.js', 'utf8');
dataString = dataString.replace('var MergedPokemonData =', 'const data =');
dataString = dataString.replace('if (typeof window !== "undefined") window.MergedPokemonData = MergedPokemonData;', '');
dataString += '\nexport default data;';
fs.writeFileSync('./test_dataset.js', dataString);
