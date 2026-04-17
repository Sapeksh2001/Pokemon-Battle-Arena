import fs from 'fs';

const data = fs.readFileSync('src/Pokemon_NewDataset.js', 'utf8');
const lines = data.split('\n');
const brokenInstances = [];

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('gen5/.png')) {
        // Look back for Name
        let name = 'Unknown';
        for (let j = i; j >= Math.max(0, i - 100); j--) {
            const nameMatch = lines[j].match(/"(Name|name)":\s*"([^"]+)"/);
            if (nameMatch) {
                name = nameMatch[2];
                break;
            }
        }
        brokenInstances.push({ name, line: i + 1 });
    }
}

console.log('Broken Gen5 instances:');
brokenInstances.forEach(b => console.log(`${b.name} (Line ${b.line})`));
