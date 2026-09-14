import { Player } from '../models/Player.js';

export const SCHEMA_VERSION = 1;
export const STORAGE_KEY = 'pba_active_battle_state';

/**
 * PersistenceManager
 * Handles versioned serialization and deserialization of the active battle state
 * to and from localStorage.
 */
export class PersistenceManager {
    constructor(arena) {
        this.arena = arena;
    }

    saveState(gs = this.arena.gs, log = this.arena.log) {
        if (typeof localStorage === 'undefined') return false;
        try {
            const state = {
                version: SCHEMA_VERSION,
                players: (gs.players || []).map(p => p.toJSON()),
                round: gs.round || 1,
                weather: gs.weather || 'none',
                terrain: gs.terrain ? JSON.parse(JSON.stringify(gs.terrain)) : null,
                delayedEffects: JSON.parse(JSON.stringify(gs.delayedEffects || [])),
                activeTurnPlayerId: gs.activeTurnPlayerId || null,
                selectedAttackTargetId: gs.selectedAttackTargetId || null,
                selectedStatusTargetId: gs.selectedStatusTargetId || null,
                logs: log?._buffer ? log._buffer.toArray() : []
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            return true;
        } catch (err) {
            console.error('[PersistenceManager] Save failed:', err);
            return false;
        }
    }

    loadState(gs = this.arena.gs, db = this.arena.db, log = this.arena.log) {
        if (typeof localStorage === 'undefined') return false;
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (!saved) return false;
            const state = JSON.parse(saved);
            if (!state || typeof state !== 'object') return false;

            gs.players = (state.players || []).map(p => Player.fromJSON(p, db));
            gs.round = state.round || 1;
            gs.weather = state.weather || 'none';
            gs.terrain = state.terrain || null;
            gs.delayedEffects = (state.delayedEffects || []).map(e => ({ ...e }));
            gs.activeTurnPlayerId = state.activeTurnPlayerId || null;
            gs.selectedAttackTargetId = state.selectedAttackTargetId || null;
            gs.selectedStatusTargetId = state.selectedStatusTargetId || null;

            if (state.logs && log?.loadLogs) {
                log.loadLogs(state.logs);
            }
            return true;
        } catch (err) {
            console.error('[PersistenceManager] Load failed:', err);
            return false;
        }
    }

    clearState() {
        if (typeof localStorage === 'undefined') return;
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (err) {
            console.error('[PersistenceManager] Clear failed:', err);
        }
    }
}
