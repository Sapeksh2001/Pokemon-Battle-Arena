import { applyModification } from '../utils/helpers';

export class StatusManager {
    constructor(arena) {
        this.arena = arena;
    }

    toggleStatus(event) {
        this.arena.audio.play('status');
        const status = event.target.closest('button')?.dataset.status;
        const targetId = document.getElementById('status-target-select')?.dataset?.value || (document.getElementById('status-target-select') as HTMLSelectElement | null)?.value;
        if (!status || !targetId) return;

        const player = this.arena.gs.players.find(p => p.id === targetId);
        const pokemon = player?.getActivePokemon();
        if (!pokemon) return;

        this.arena.history.snapshot(this.arena.gs);
        const wasActive = pokemon.hasStatus(status);
        if (wasActive) {
            pokemon.removeStatus(status);
            this.arena._notify(`${pokemon.fullName}'s ${status} was cured.`, 'status');
        } else {
            const applied = pokemon.applyStatus(status);
            if (applied === false) {
                this.arena._notify(`${pokemon.fullName} is immune to ${status}!`, 'action');
            } else {
                this.arena._notify(`${pokemon.fullName} was afflicted with ${status}.`, 'status');
            }
        }
        this.arena.renderer.renderAll();

        // Sync game state in multiplayer
        if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
            this.arena.multiplayer.sendGameState();
        }
    }

    handleStatUpdate() {
        const statusTargetSel = document.getElementById('status-target-select') as HTMLSelectElement | null;
        const statSel = document.getElementById('stat-select') as HTMLSelectElement | null;
        const statValInput = document.getElementById('stat-value-input') as HTMLInputElement | null;
        const modTypeSel = document.getElementById('stat-mod-type') as HTMLSelectElement | null;

        const targetId = statusTargetSel?.value;
        const statName = statSel?.value;
        const value = parseInt(statValInput?.value || '0');
        const modType = modTypeSel?.value;

        if (!targetId || !statName || isNaN(value)) {
            this.arena._announce('Please select a target, stat, and value.', true);
            return;
        }
        const player = this.arena.gs.players.find(p => p.id === targetId);
        const pokemon = player?.getActivePokemon();
        if (!pokemon) return;

        this.arena.history.snapshot(this.arena.gs);

        if (statName === 'hp') {
            // DRY: delegate to _applyHPChange for unified HP handling.
            const currentModded = applyModification(
                pokemon.currentHP, pokemon.maxHp, modType, value, pokemon.maxHp
            );
            this.arena.battle._applyHPChange(pokemon, targetId, currentModded, 'stat update');
        } else {
            const change = pokemon.modifyStat(statName, modType, value);
            const final = pokemon.getEffectiveStat(statName);
            if (change > 0) {
                this.arena._notify(`${pokemon.fullName}'s ${statName.toUpperCase()} rose! (→ ${final})`, 'heal');
                this.arena._animateSprite(targetId, 'heal', () => this.arena.renderer.renderAll());
            } else if (change < 0) {
                this.arena._notify(`${pokemon.fullName}'s ${statName.toUpperCase()} fell! (→ ${final})`, 'damage');
                this.arena._animateSprite(targetId, 'damage', () => this.arena.renderer.renderAll());
            } else {
                this.arena.renderer.renderAll();
            }
        }
        this.arena.audio.play('confirm');

        // Sync game state in multiplayer
        if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
            this.arena.multiplayer.sendGameState();
        }
    }
}
