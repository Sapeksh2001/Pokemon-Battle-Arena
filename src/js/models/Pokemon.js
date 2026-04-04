import { applyModification } from '../utils/helpers.js';

// ==========================================
// DOMAIN MODEL: POKÉMON
// ==========================================

export class Pokemon {
    constructor(data, baseData) {
        this.baseName = baseData.Name;
        this.fullName = data.Name;
        this.maxHp = data.stats.hp;
        this.currentHP = data.stats.hp;
        this.stats = { ...data.stats };
        // Support both old ["Grass Poison"] and new ["Grass", "Poison"] formats
        this.types = data.types.flatMap(t => t.split(' '));
        this.sprite = data.sprite;
        this.cry = data.cry;
        this.tier = data.tier;
        this.data = data;       // raw data for the current form
        this.baseData = baseData;   // raw data for the base form (needed for form changes)
        this.statModifiers = {};         // key → delta from base stat
        this.statuses = {};         // e.g. { poison: true, burn: true }
    }

    get name() { return this.fullName; }
    get baseSpecies() { return this.baseName; }

    // Computed properties
    get spriteUrl() {
        const nameForSprite = this.fullName.toLowerCase().replace(/[^a-z0-9]/g, '');
        return `https://play.pokemonshowdown.com/sprites/gen5/${nameForSprite}.png`;
    }

    isFainted() { return this.currentHP <= 0; }
    getHPPercent() {
        if (!this.maxHp || this.maxHp <= 0) return 0;
        return Math.max(0, Math.min(1, this.currentHP / this.maxHp));
    }

    /** Returns the effective value of a stat after applying in-battle modifiers. */
    getEffectiveStat(statName) {
        return this.stats[statName] + (this.statModifiers[statName] || 0);
    }

    // Mutations
    takeDamage(amount) {
        const before = this.currentHP;
        this.currentHP = Math.max(0, this.currentHP - amount);
        return before - this.currentHP;
    }

    heal(amount) {
        const before = this.currentHP;
        this.currentHP = Math.min(this.maxHp, this.currentHP + amount);
        return this.currentHP - before;
    }

    modifyStat(statName, modType, value) {
        if (statName === 'hp') {
            const base = this.maxHp;
            const current = this.currentHP;
            const newHP = applyModification(current, base, modType, value, base);
            this.currentHP = newHP;
            return newHP - current; // positive = heal, negative = damage
        }
        const base = this.stats[statName];
        const current = this.statModifiers[statName] || 0;

        let newModifier;
        if (modType === 'set') {
            newModifier = value - base;
        } else {
            newModifier = applyModification(current, base, modType, value);
        }

        this.statModifiers[statName] = newModifier;
        return newModifier - current;
    }

    applyStatus(status) { this.statuses[status] = true; }
    removeStatus(status) { delete this.statuses[status]; }
    hasStatus(status) { return !!this.statuses[status]; }

    clearStatuses() {
        this.statuses = {};
        this.statModifiers = {};
    }

    _updateFormOrEvolution(newData, newBaseData) {
        if (!newData || !newBaseData) return false;
        
        const oldMaxHp = this.maxHp;
        const newMaxHp = newData.stats.hp;
        const hpFraction = this.currentHP / oldMaxHp;
        
        // Form nodes in the dataset use lowercase `name`; buildIndex normalises .Name = .name,
        // but be defensive here in case the raw node is passed directly.
        this.baseName = newBaseData.Name || newBaseData.name;
        this.fullName = newData.Name || newData.name;
        this.maxHp = newMaxHp;
        this.currentHP = Math.max(1, Math.round(newMaxHp * hpFraction));
        
        this.stats = { ...newData.stats };
        this.types = newData.types.flatMap(t => t.split(' '));
        this.sprite = newData.sprite;
        this.cry = newData.cry;
        this.tier = newData.tier || newBaseData.tier;
        this.data = newData;
        this.baseData = newBaseData;
        
        return true;
    }

    changeForm(newFormName, db) {
        const result = db.find(newFormName);
        if (!result) return false;
        return this._updateFormOrEvolution(result.foundNode, result.baseNode);
    }

    evolve(newSpeciesName, db) {
        const result = db.find(newSpeciesName);
        if (!result) return false;
        return this._updateFormOrEvolution(result.foundNode, result.baseNode);
    }

    // Serialisation for HistoryManager & Multiplayer State Sync
    toJSON() {
        return {
            fullName: this.fullName,
            baseName: this.baseName,
            maxHp: this.maxHp,
            currentHP: this.currentHP,
            stats: { ...this.stats },
            statModifiers: { ...this.statModifiers },
            statuses: { ...this.statuses }
        };
    }

    /**
     * Restore a Pokemon instance from a serialised snapshot.
     */
    static fromJSON(json, db) {
        const result = db.find(json.fullName);
        if (!result) {
            console.warn(`Pokemon.fromJSON: "${json.fullName}" not found in database.`);
            return null;
        }
        const p = new Pokemon(result.foundNode, result.baseNode);
        if (json.maxHp !== undefined) p.maxHp = json.maxHp;
        if (json.stats) p.stats = { ...json.stats };
        p.currentHP = json.currentHP;
        p.statModifiers = { ...json.statModifiers };
        p.statuses = { ...json.statuses };
        return p;
    }
}
