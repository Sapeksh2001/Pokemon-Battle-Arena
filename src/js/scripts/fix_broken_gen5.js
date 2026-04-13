import fs from 'fs';

const filePath = 'src/Pokemon_NewDataset.js';
let content = fs.readFileSync(filePath, 'utf8');

const mapping = {
    'Ogerpon': 'ogerpon.png',
    'Ogerpon-Wellspring': 'ogerpon-wellspring.png',
    'Ogerpon-Hearthflame': 'ogerpon-hearthflame.png',
    'Ogerpon-Cornerstone': 'ogerpon-cornerstone.png',
    'Ogerpon-Teal-Tera': 'ogerpon-tealtera.png',
    'Ogerpon-Wellspring-Tera': 'ogerpon-wellspringtera.png',
    'Ogerpon-Hearthflame-Tera': 'ogerpon-hearthflametera.png',
    'Ogerpon-Cornerstone-Tera': 'ogerpon-cornerstonetera.png',
    'Terapagos': 'terapagos.png',
    'Terapagos-Terastal': 'terapagos-terastal.png',
    'Terapagos-Stellar': 'terapagos-stellar.png'
};

const lines = content.split('\n');
let replaced = 0;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('gen5/.png')) {
        // Find name
        let name = null;
        for (let j = i; j >= Math.max(0, i - 100); j--) {
            const match = lines[j].match(/"(Name|name)":\s*"([^"]+)"/);
            if (match) {
                name = match[2];
                break;
            }
        }
        
        if (name && mapping[name]) {
            lines[i] = lines[i].replace('gen5/.png', `gen5/${mapping[name]}`);
            replaced++;
        }
    }
}

fs.writeFileSync(filePath, lines.join('\n'));
console.log(`Replaced ${replaced} broken sprites in ${filePath}`);
