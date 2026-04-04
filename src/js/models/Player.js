import { Pokemon } from './Pokemon.js';

// ==========================================
// DOMAIN MODEL: PLAYER / TRAINER
// ==========================================

export class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.team = Array(6).fill(null); // Array<Pokemon|null>
        this.activePokemonIndex = 0;
    }

    // Accessors
    getActivePokemon() {
        return this.team[this.activePokemonIndex] ?? null;
    }

    hasLivingPokemon() {
        return this.team.some(p => p && !p.isFainted());
    }

    // Team mutations
    setSlot(index, pokemon) {
        this.team[index] = pokemon;
    }

    clearSlot(index) {
        this.team[index] = null;
        if (this.activePokemonIndex === index) {
            const next = this.team.findIndex(p => p !== null);
            this.activePokemonIndex = next === -1 ? 0 : next;
        }
    }

    switchTo(slotIndex) {
        const target = this.team[slotIndex];
        if (!target || target.isFainted()) return false;
        if (this.activePokemonIndex === slotIndex) return false;
        
        this.getActivePokemon()?.clearStatuses();
        this.activePokemonIndex = slotIndex;
        return true;
    }

    canSwitchTo(slotIndex) {
        const p = this.team[slotIndex];
        return p !== null && !p.isFainted() && slotIndex !== this.activePokemonIndex;
    }

    // Serialisation for HistoryManager & Multiplayer
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            team: this.team.map(p => (p ? p.toJSON() : null)),
            activePokemonIndex: this.activePokemonIndex // Need to fix formatting later just to match JSON signature
        };
    }

    static fromJSON(json, db) {
        const player = new Player(json.id, json.name);
        player.team = json.team.map(t => (t ? Pokemon.fromJSON(t, db) : null));
        player.activePokemonIndex = json.activePokemonIndex;
        return player;
    }
}
