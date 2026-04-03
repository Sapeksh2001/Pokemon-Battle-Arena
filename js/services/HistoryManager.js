import { Player } from '../models/Player.js';

// ==========================================
// HISTORY MANAGER (Undo/Redo State machine)
// ==========================================

export class HistoryManager {
    constructor(maxHistory = 30) {
        this._past = [];
        this._future = [];
        this._maxHistory = maxHistory;
    }

    /**
     * Capture a serialised snapshot of the current game state.
     */
    snapshot(gameState) {
        const snap = this._serialise(gameState);
        this._past.push(snap);
        if (this._past.length > this._maxHistory) this._past.shift();
        this._future = [];  // Any new action clears the redo branch.
        this._updateButtons();
    }

    /**
     * Restore the previous state.
     * @returns {boolean}
     */
    undo(gameState, db) {
        if (this._past.length === 0) return false;
        this._future.push(this._serialise(gameState));
        this._restore(gameState, this._past.pop(), db);
        this._updateButtons();
        return true;
    }

    /**
     * Restore the next state.
     * @returns {boolean}
     */
    redo(gameState, db) {
        if (this._future.length === 0) return false;
        this._past.push(this._serialise(gameState));
        if (this._past.length > this._maxHistory) this._past.shift();
        this._restore(gameState, this._future.pop(), db);
        this._updateButtons();
        return true;
    }

    /** Serialise the game state to a plain-object snapshot. */
    _serialise(gs) {
        return {
            players: gs.players.map(p => p.toJSON()),
            round: gs.round,
            weather: gs.weather,
            activeTurnPlayerId: gs.activeTurnPlayerId,
            selectedAttackTargetId: gs.selectedAttackTargetId,
            selectedStatusTargetId: gs.selectedStatusTargetId,
            timestamp: Date.now()
        };
    }

    /** Restore a serialised snapshot back into the live gameState. */
    _restore(gs, snap, db) {
        gs.players = snap.players.map(d => Player.fromJSON(d, db));
        gs.round = snap.round;
        gs.weather = snap.weather;
        gs.activeTurnPlayerId = snap.activeTurnPlayerId;
        gs.selectedAttackTargetId = snap.selectedAttackTargetId;
        gs.selectedStatusTargetId = snap.selectedStatusTargetId;
    }

    _updateButtons() {
        const undoBtn = document.getElementById('undo-btn');
        const redoBtn = document.getElementById('redo-btn');
        if (undoBtn) {
            undoBtn.disabled = this._past.length === 0;
            undoBtn.title = this._past.length > 0
                ? `Undo (${this._past.length} action(s) available)`
                : 'Nothing to undo';
        }
        if (redoBtn) {
            redoBtn.disabled = this._future.length === 0;
            redoBtn.title = this._future.length > 0
                ? `Redo (${this._future.length} action(s) available)`
                : 'Nothing to redo';
        }
    }

    clear() { this._past = []; this._future = []; this._updateButtons(); }
    get canUndo() { return this._past.length > 0; }
    get canRedo() { return this._future.length > 0; }
}
