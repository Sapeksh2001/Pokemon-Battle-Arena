export class HPManager {
    constructor(arena) {
        this.arena = arena;
    }

    editHP(playerId) {
        const player = this.arena.gs.players.find(p => p.id === playerId);
        const pokemon = player?.getActivePokemon();
        if (!pokemon) return;

        this.arena.gs.currentHPEdit = { playerId, pokemon };

        const titleEl = document.getElementById('hp-edit-title');
        const displayEl = document.getElementById('hp-current-display');
        const input = document.getElementById('hp-new-value') as HTMLInputElement | null;

        if (titleEl) titleEl.textContent = `Edit ${pokemon.fullName}'s HP`;
        if (displayEl) displayEl.textContent = `${pokemon.currentHP} / ${pokemon.maxHp}`;
        if (input) {
            input.value = pokemon.currentHP.toString();
            input.max = pokemon.maxHp.toString();
            setTimeout(() => { input.focus(); input.select(); }, 100);
        }

        this.arena.modals.open('hpEdit');
        this.arena.audio.play('click');
    }

    confirmHPEdit() {
        const { playerId, pokemon } = this.arena.gs.currentHPEdit || {};
        if (!pokemon) return;
        const input = document.getElementById('hp-new-value') as HTMLInputElement | null;
        const newHP = parseInt(input?.value || '0');
        if (isNaN(newHP)) { this.arena._announce('Please enter a valid number!', true); this.arena.audio.play('error'); return; }
        if (newHP < 0 || newHP > pokemon.maxHp) {
            this.arena._announce(`HP must be between 0 and ${pokemon.maxHp}!`, true);
            this.arena.audio.play('error');
            return;
        }
        this.arena.history.snapshot(this.arena.gs);
        this.arena.modals.close('hpEdit');
        this.arena.audio.play('confirm');
        // DRY: battle._applyHPChange handles logging, animating, and rendering.
        this.arena.battle._applyHPChange(pokemon, playerId, newHP, 'manual edit');

        // Sync game state in multiplayer
        if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
            this.arena.multiplayer.sendGameState();
        }
    }
}
