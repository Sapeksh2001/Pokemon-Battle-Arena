import fs from 'fs';

const script = fs.readFileSync('script.js', 'utf8');

// The imports block to prepend
const imports = `import { typeChart, typeColors, arenaBackgrounds } from './data/constants.js';
import { PokemonDatabase } from './services/PokemonDatabase.js';
import { Pokemon } from './models/Pokemon.js';
import { Player } from './models/Player.js';
import { applyModification, escapeHTML } from './utils/helpers.js';
import { AudioManager } from './services/AudioManager.js';
import { BattleEngine } from './services/BattleEngine.js';
import { BattleLog } from './services/BattleLog.js';
import { HistoryManager } from './services/HistoryManager.js';
import { ModalManager } from './ui/ModalManager.js';
import { Timer } from './ui/Timer.js';
import { UIRenderer } from './ui/UIRenderer.js';
import { MultiplayerManager } from './api/socketClient.js';

`;

// Find the start of PokemonBattleArena
const arenaStartMatch = script.indexOf('class PokemonBattleArena {');
// Find the start of the escapeHTML function (which we want to skip)
const escapeHTMLMatch = script.indexOf('function escapeHTML(str) {');

// Find the global window.addEventListener('load'
const windowLoadMatch = script.indexOf("window.addEventListener('load', () => {");

// We extract:
// 1. The PokemonBattleArena class
// 2. The window.onload and share functions
const arenaClass = script.slice(arenaStartMatch, escapeHTMLMatch).trim();
const bottomScripts = script.slice(windowLoadMatch).trim();

// To be safe, let's inject those global window aliases for UI onclicks
const windowBindings = `
// Expose functions globally for inline HTML onclick handlers
window.escapeHTML = escapeHTML;
`;

const finalResult = imports + arenaClass + '\n\n' + windowBindings + '\n\n' + bottomScripts;

fs.writeFileSync('js/main.js', finalResult);
console.log('Successfully wrote js/main.js');
