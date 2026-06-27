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
        this._notifyChange();
    }

    /**
     * Restore the previous state.
     * @returns {boolean}
     */
    undo(gameState, db) {
        if (this._past.length === 0) return false;
        this._future.push(this._serialise(gameState));
        this._restore(gameState, this._past.pop(), db);
        this._notifyChange();
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
        this._notifyChange();
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

    /**
     * Emit a 'history:changed' event so that React components (or legacy
     * DOM code) can update undo/redo button state without the service
     * needing to touch the DOM directly.
     *
     * Legacy fallback: also update DOM buttons if they exist, so the
     * in-engine HTML still works during the migration period.
     */
    _notifyChange() {
        // Emit event for React consumers (ArenaContext, useArena hook, etc.)
        window.dispatchEvent(new CustomEvent('history:changed', {
            detail: { canUndo: this.canUndo, canRedo: this.canRedo }
        }));

        // Legacy DOM update — kept so existing #undo-btn / #redo-btn HTML still works.
        // Remove this block once ArenaView fully manages its own undo/redo buttons.
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

    /**
     * @deprecated Use _notifyChange() instead.
     * Kept as a shim for any callers that haven't been updated.
     */
    _updateButtons() {
        this._notifyChange();
    }

    clear() { this._past = []; this._future = []; this._notifyChange(); }
    get canUndo() { return this._past.length > 0; }
    get canRedo() { return this._future.length > 0; }
}
