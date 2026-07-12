import { applyModification, normalizeTier } from '../utils/helpers.js';
import { spriteOverrides } from '../data/sprite_overrides.js';

// ==========================================
// DOMAIN MODEL: POKÉMON
// ==========================================

export class Pokemon {
    constructor(data, baseData) {
        this.baseName = baseData.Name || baseData.name;
        this.fullName = data.Name || data.name;
        this.maxHp = data.stats.hp;
        this.currentHP = data.stats.hp;
        this.stats = { ...data.stats };
        // Support both old ["Grass Poison"] and new ["Grass", "Poison"] formats
        this.types = data.types.flatMap(t => t.split(' '));
        
        // Manual override check
        this.sprite = spriteOverrides[this.fullName] || data.sprite;
        this.cry = data.cry;
        this.tier = normalizeTier(data.tier);
        this.data = data;       // raw data for the current form
        this.baseData = baseData;   // raw data for the base form (needed for form changes)
        this.statModifiers = {};         // key → delta from base stat
        this.statuses = {};         // e.g. { poison: true, burn: true }
        
        // Battle state fields
        this.destinyBondTarget = null;
        this.flinched = false;
        this.protected = false;
        this.enduring = false;
        this.lastMoveUsed = null;
        this.trappedEffects = []; // array of { name: string, damagePercent: number, roundsLeft: number }
        
        this.moves = [];
        this.ability = null;
        this.hiddenAbility = null;
        
        // Ability usage limits tracking
        this.abilityUses = 0;
        this.hiddenAbilityUses = 0;
        this.abilityUsesThisRound = 0;
        this.hiddenAbilityUsesThisRound = 0;
        
        this.shuffleMoves();
        this.shuffleAbility();
    }

    shuffleMoves() {
        if (typeof window !== 'undefined' && window.MovesetsData) {
            let moveset = window.MovesetsData[this.fullName] || window.MovesetsData[this.baseName] || [];
            if (moveset.length > 0) {
                let shuffled = [...moveset].sort(() => 0.5 - Math.random());
                this.moves = shuffled.slice(0, 4);
            }
        }
    }

    shuffleAbility() {
        if (typeof window !== 'undefined' && window.PokemonAbilitiesMap) {
            const normalize = (n) => n ? n.replace(/-/g, ' ').replace(/\s+/g, ' ').trim() : '';
            const normFull = normalize(this.fullName);
            const normBase = normalize(this.baseName);
            let abilities = window.PokemonAbilitiesMap[normFull] || window.PokemonAbilitiesMap[this.fullName] || window.PokemonAbilitiesMap[normBase] || window.PokemonAbilitiesMap[this.baseName] || [];
            if (abilities.length > 0) {
                let hiddenAbilities = abilities.filter(a => typeof a === 'object' && a.hidden);
                if (hiddenAbilities.length > 0) {
                    this.ability = hiddenAbilities[0].name;
                    this.hiddenAbility = hiddenAbilities[0].name;
                } else {
                    let regularAbilities = abilities.map(a => typeof a === 'string' ? a : a.name);
                    this.ability = regularAbilities[Math.floor(Math.random() * regularAbilities.length)];
                    this.hiddenAbility = null;
                }
            } else {
                this.ability = null;
                this.hiddenAbility = null;
            }
        }
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
        let val = this.stats[statName] + (this.statModifiers[statName] || 0);
        if (statName === 'attack' && this.hasStatus('burn')) {
            val = Math.floor(val * 0.8);
        }
        if (statName === 'speed' && this.hasStatus('paralysis')) {
            val = Math.floor(val * 0.5);
        }
        return Math.max(1, val);
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

    applyStatus(status) {
        if (status === 'poison' || status === 'bad_poison' || status === 'toxic') {
            if (this.types.includes('Steel') || this.types.includes('Poison')) return false;
        }
        if (status === 'burn' && this.types.includes('Fire')) return false;
        if (status === 'paralysis' && (this.types.includes('Ground') || this.types.includes('Electric'))) return false;
        
        this.statuses[status] = { duration: 0 };
        return true;
    }
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
        this.tier = normalizeTier(newData.tier || newBaseData.tier);
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
            statuses: { ...this.statuses },
            moves: [...this.moves],
            ability: this.ability,
            hiddenAbility: this.hiddenAbility,
            types: [...this.types],
            sprite: this.sprite,
            cry: this.cry,
            tier: this.tier,
            data: this.data,
            baseData: this.baseData,
            destinyBondTarget: this.destinyBondTarget,
            flinched: this.flinched,
            protected: this.protected,
            enduring: this.enduring,
            lastMoveUsed: this.lastMoveUsed,
            trappedEffects: this.trappedEffects ? JSON.parse(JSON.stringify(this.trappedEffects)) : []
        };
    }

    /**
     * Restore a Pokemon instance from a serialised snapshot.
     */
    static fromJSON(json, db = null) {
        if (!json) return null;

        let result = null;
        if (db && typeof db.find === 'function' && db._raw && Object.keys(db._raw).length > 0) {
            result = db.find(json.fullName);
        }

        let p;
        if (result) {
            p = new Pokemon(result.foundNode, result.baseNode);
        } else if (json.data && json.baseData) {
            // Restore completely from self-contained JSON
            p = new Pokemon(json.data, json.baseData);
        } else {
            console.warn(`Pokemon.fromJSON: Cannot restore "${json.fullName}". No database and no serialized fallback data.`);
            return null;
        }

        if (json.maxHp !== undefined) p.maxHp = json.maxHp;
        if (json.stats) p.stats = { ...json.stats };
        p.currentHP = json.currentHP;
        p.statModifiers = { ...json.statModifiers };
        p.statuses = { ...json.statuses };
        if (json.moves) p.moves = [...json.moves];
        if (json.ability !== undefined) p.ability = json.ability;
        if (json.hiddenAbility !== undefined) p.hiddenAbility = json.hiddenAbility;
        if (json.types) p.types = [...json.types];
        if (json.sprite) p.sprite = json.sprite;
        if (json.cry) p.cry = json.cry;
        if (json.tier) p.tier = json.tier;
        
        p.destinyBondTarget = json.destinyBondTarget !== undefined ? json.destinyBondTarget : null;
        p.flinched = json.flinched !== undefined ? json.flinched : false;
        p.protected = json.protected !== undefined ? json.protected : false;
        p.enduring = json.enduring !== undefined ? json.enduring : false;
        p.lastMoveUsed = json.lastMoveUsed !== undefined ? json.lastMoveUsed : null;
        p.trappedEffects = json.trappedEffects !== undefined ? JSON.parse(JSON.stringify(json.trappedEffects)) : [];
        return p;
    }
}
