const fs = require('fs');
const pokemon = JSON.parse(fs.readFileSync('public/data/pokemon.json'));

let total = 0;
let evos = 0;
let forms = 0;

function count(mon) {
    total++;
    if (mon.evolutions) {
        mon.evolutions.forEach(e => {
            evos++;
            count(e);
        });
    }
    if (mon.forms) {
        for (let f in mon.forms) {
            forms++;
            total++; // forms count as pokemon
        }
    }
}

for (let key in pokemon) {
    count(pokemon[key]);
}

console.log({ total, baseKeys: Object.keys(pokemon).length, evos, forms });
