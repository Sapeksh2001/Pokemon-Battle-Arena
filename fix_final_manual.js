import fs from 'fs';

const manualOverrides = {
  "Farfetch’d": "https://play.pokemonshowdown.com/sprites/ani/farfetchd.gif",
  "Farfetch’d-Galar": "https://play.pokemonshowdown.com/sprites/ani/farfetchd-galar.gif",
  "Sirfetch’d": "https://play.pokemonshowdown.com/sprites/ani/sirfetchd.gif",
  "Zygarde-10%": "https://play.pokemonshowdown.com/sprites/ani/zygarde-10.gif",
  "Oricorio-Pa'u": "https://play.pokemonshowdown.com/sprites/ani/oricorio-pau.gif",
  "Toxtricity-Low-Key": "https://play.pokemonshowdown.com/sprites/ani/toxtricity-lowkey.gif",
  "Toxtricity-Low-Key-Gmax": "https://play.pokemonshowdown.com/sprites/ani/toxtricity-gmax.gif",
  "Walking Wake": "https://play.pokemonshowdown.com/sprites/ani/walkingwake.gif",
  "Roaring Moon": "https://play.pokemonshowdown.com/sprites/ani/roaringmoon.gif",
  "Gouging Fire": "https://play.pokemonshowdown.com/sprites/ani/gougingfire.gif",
  "Raging Bolt": "https://play.pokemonshowdown.com/sprites/ani/ragingbolt.gif",
  "Great Tusk": "https://play.pokemonshowdown.com/sprites/ani/greattusk.gif",
  "Slither Wing": "https://play.pokemonshowdown.com/sprites/ani/slitherwing.gif",
  "Scream Tail": "https://play.pokemonshowdown.com/sprites/ani/screamtail.gif",
  "Sandy Shocks": "https://play.pokemonshowdown.com/sprites/ani/sandyshocks.gif",
  "Flutter Mane": "https://play.pokemonshowdown.com/sprites/ani/fluttermane.gif",
  "Brute Bonnet": "https://play.pokemonshowdown.com/sprites/ani/brutebonnet.gif",
  "Iron Leaves": "https://play.pokemonshowdown.com/sprites/ani/ironleaves.gif",
  "Toxtricity-Gmax": "https://play.pokemonshowdown.com/sprites/ani/toxtricity-gmax.gif",
  "Charizard-Gmax": "https://play.pokemonshowdown.com/sprites/ani/charizard-gmax.gif",
  "Meowth-Gmax": "https://play.pokemonshowdown.com/sprites/ani/meowth-gmax.gif",
  "Pikachu-Gmax": "https://play.pokemonshowdown.com/sprites/ani/pikachu-gmax.gif",
  "Gengar-Gmax": "https://play.pokemonshowdown.com/sprites/ani/gengar-gmax.gif",
  "Snorlax-Gmax": "https://play.pokemonshowdown.com/sprites/ani/snorlax-gmax.gif",
  "Kingler-Gmax": "https://play.pokemonshowdown.com/sprites/ani/kingler-gmax.gif",
  "Machamp-Gmax": "https://play.pokemonshowdown.com/sprites/ani/machamp-gmax.gif",
  "Lapras-Gmax": "https://play.pokemonshowdown.com/sprites/ani/lapras-gmax.gif",
  "Alcremie-Gmax": "https://play.pokemonshowdown.com/sprites/ani/alcremie-gmax.gif"
};

function processRecursive(obj) {
  if (Array.isArray(obj)) {
    obj.forEach(item => processRecursive(item));
  } else if (obj && typeof obj === 'object') {
    const name = obj.Name || obj.name;
    if (name && manualOverrides[name]) {
      obj.sprite = manualOverrides[name];
      console.log(`Applied override for ${name}: ${obj.sprite}`);
    }
    Object.keys(obj).forEach(key => {
      if (key !== 'baseStats' && key !== 'stats') {
        processRecursive(obj[key]);
      }
    });
  }
}

// Load non-ESM file
const content = fs.readFileSync('Pokemon_NewDataset.js', 'utf8');
const dataStart = content.indexOf('{');
const dataEnd = content.lastIndexOf('}');
const jsonData = content.substring(dataStart, dataEnd + 1);

try {
  // Use a hacky eval-like approach since it's a JS object literal, not strictly JSON
  let MergedPokemonData;
  eval(`MergedPokemonData = ${jsonData}`);

  // Process
  Object.keys(MergedPokemonData).forEach(key => {
    processRecursive(MergedPokemonData[key]);
  });

  // Write-back with the original structure
  const header = `var MergedPokemonData = `;
  const footer = `\nif (typeof window !== "undefined") window.MergedPokemonData = MergedPokemonData;`;
  const output = header + JSON.stringify(MergedPokemonData, null, 2) + ";" + footer;

  fs.writeFileSync('Pokemon_NewDataset.js', output);
  fs.writeFileSync('public/Pokemon_NewDataset.js', output);
  console.log('Final manual updates applied successfully.');
} catch (e) {
  console.error('Error parsing or processing data:', e);
}
