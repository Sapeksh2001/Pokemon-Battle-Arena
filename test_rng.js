const fs = require('fs');
const content = fs.readFileSync('src/engine/api/socketClient.js', 'utf8');
console.log(content.includes('window._mpRng ='));
