import { RingBuffer } from '../utils/RingBuffer.js';
import { escapeHTML } from '../utils/helpers.js';

// ==========================================
// BATTLE LOG (RingBuffer + DOM Output)
// ==========================================

export class BattleLog {
    constructor(capacity = 200) {
        this._buffer = new RingBuffer(capacity);
        this._gameStateRef = null;  // Set by PokemonBattleArena.init()
    }

    /** @param {object} gameState - Reference used during export. */
    linkGameState(gameState) { this._gameStateRef = gameState; }

    /**
     * Add an entry.
     * @param {string} message
     * @param {'action'|'damage'|'heal'|'status'|'round'|'system'} type
     * @param {boolean} preventSync - If true, avoids broadcasting (to prevent infinite loops)
     */
    add(message, type = 'action', preventSync = false) {
        const timestamp = new Date().toLocaleTimeString('en-US', {
            hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        const logEntry = {
            timestamp,
            message: escapeHTML(message),
            type,
            id: `${Date.now()}-${Math.random()}`
        };
        
        this._buffer.push(logEntry);
        this._render();
        
        // Broadcast to other players instantly
        if (!preventSync && window.arena && window.arena.multiplayer && window.arena.multiplayer.mode === 'playing') {
            window.arena.multiplayer.sendAction('log_add', logEntry);
        }
    }

    _render() {
        const logDiv = document.getElementById('battle-log');
        if (!logDiv) return;
        const entries = this._buffer.toArray();
        logDiv.innerHTML = entries.length
            ? entries.map(e => `<div class="log-entry-${e.type}">${e.message}</div>`).join('')
            : '<div class="text-slate-500">[SYSTEM] No actions yet...</div>';
        logDiv.scrollTop = logDiv.scrollHeight;
    }

    loadLogs(logs) {
        this._buffer.clear();
        logs.forEach(msg => this._buffer.push(msg));
        this._render();
    }

    clear() {
        if (!confirm('Clear the entire battle log? This cannot be undone.')) return;
        this._buffer.clear();
        this._render();
        this.add('Battle log cleared.', 'system');
    }

    export() {
        if (this._buffer.size === 0) return;
        const gs = this._gameStateRef;
        const header = `POKÉMON BATTLE ARENA — BATTLE LOG\nGenerated : ${new Date().toLocaleString()}\nRound     : ${gs ? gs.round : '?'}\nWeather   : ${gs ? gs.weather : '?'}\nPlayers   : ${gs ? gs.players.length : '?'}\n${'='.repeat(40)}\n\n`;
        const body = this._buffer.toArray().map(e => `[${e.timestamp}] ${e.message}`).join('\n');
        const blob = new Blob([header + body], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = Object.assign(document.createElement('a'), {
            href: url, download: `battle-log-${new Date().toISOString().slice(0, 10)}.txt`
        });
        a.click();
        URL.revokeObjectURL(url);
    }
}
