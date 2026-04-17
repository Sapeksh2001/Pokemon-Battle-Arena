import fs from 'fs';
import https from 'https';

const data = fs.readFileSync('src/Pokemon_NewDataset.js', 'utf8');
const spriteRegex = /"sprite":\s*"(https:\/\/play\.pokemonshowdown\.com\/sprites\/ani\/([^"]+)\.gif)"/g;
let match;
const urls = [];

while ((match = spriteRegex.exec(data)) !== null) {
    urls.push({ full: match[1], name: match[2] });
}

console.log(`Found ${urls.length} ani sprites. Testing subset...`);

async function checkUrl(urlObj) {
    return new Promise((resolve) => {
        https.get(urlObj.full, (res) => {
            if (res.statusCode === 404) {
                resolve({ ...urlObj, status: 404 });
            } else {
                resolve({ ...urlObj, status: res.statusCode });
            }
        }).on('error', (e) => {
            resolve({ ...urlObj, status: 'error' });
        });
    });
}

// Check some modern ones
const modernOnes = ['sprigatito', 'fuecoco', 'quaxly', 'ogerpon', 'terapagos', 'pecharunt'];
const toCheck = urls.filter(u => modernOnes.some(m => u.name.includes(m)));

console.log(`Checking ${toCheck.length} modern sprites...`);
Promise.all(toCheck.map(checkUrl)).then(results => {
    results.forEach(r => {
        console.log(`${r.name}: ${r.status}`);
    });
});
