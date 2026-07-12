// ==========================================
// BATTLE ENGINE (Pure Math) — Weather + Ability Aware
// ==========================================

import { WEATHER_CONFIG, SUN_MOVES, THUNDER_ACCURACY_MOVES } from '../data/weather.js';

export class BattleEngine {
    constructor(chart) {
        this._chart = chart; // typeChart mapping
    }

    /**
     * Calculate the combined type-effectiveness multiplier.
     * Handles dual-types by multiplying per defending type.
     * @param {string}   moveType
     * @param {string[]} defenderTypes
     * @returns {number}
     */
    getTypeEffectiveness(moveType, defenderTypes) {
        return defenderTypes.reduce((multiplier, defType) => {
            const chart = this._chart[moveType];
            return (chart && chart[defType] !== undefined)
                ? multiplier * chart[defType]
                : multiplier;
        }, 1);
    }

    /**
     * Calculate final damage dealt.
     * Weather, ability, move flags all factor in here.
     *
     * @param {Pokemon}  attacker
     * @param {Pokemon}  defender
     * @param {number}   movePower
     * @param {string}   moveType
     * @param {string}   attackType   — 'physical' or 'special'
     * @param {string}   weather      — current weather key
     * @param {Object}   move         — full enriched move object (may be null for manual attacks)
     * @param {AbilityEngine} abilityEngine
     * @returns {{ damage, effectiveness, blockedBy }}
     */
    calculateDamage(attacker, defender, movePower, moveType, attackType, weather = 'none', move = null, abilityEngine = null, terrain = null) {
        // ── 0. Ability block check ─────────────────────────────────────────
        if (abilityEngine && move) {
            const blocked = abilityEngine.isBlockedByAbility(attacker, defender, move);
            if (blocked) {
                // Trigger absorb effect
                abilityEngine.getDefenseMultiplier(attacker, defender, move);
                return { damage: 0, effectiveness: 0, blockedBy: defender.ability };
            }
        }

        // ── 1. Weather type overrides ─────────────────────────────────────
        let effectiveMoveType = moveType;
        const wCfg = WEATHER_CONFIG[weather] || WEATHER_CONFIG.none;

        // Snow Storm: Water moves become Ice
        if (wCfg.typeOverride && wCfg.typeOverride[moveType]) {
            effectiveMoveType = wCfg.typeOverride[moveType];
        }

        // Dark Aura / Fairy Aura ability — override move type
        if (abilityEngine) {
            const attackerAbility = (attacker.ability || '').toLowerCase().replace(/[\s\-]/g, '');
            if (attackerAbility === 'darkaura') effectiveMoveType = 'Dark';
            if (attackerAbility === 'fairyaura') effectiveMoveType = 'Fairy';
        }

        // ── 2. Type effectiveness ─────────────────────────────────────────
        let effectiveness = this.getTypeEffectiveness(effectiveMoveType, defender.types);

        // Technician ability: convert NVE to Super Effective (game rule)
        if (abilityEngine && effectiveness < 1) {
            const atkAbility = (attacker.ability || '').toLowerCase().replace(/[\s\-]/g, '');
            if (atkAbility === 'technician') {
                effectiveness = 2;
            }
        }

        // Shell Armor: block one super-effective hit
        if (abilityEngine && effectiveness > 1) {
            const defAbility = (defender.ability || '').toLowerCase().replace(/[\s\-]/g, '');
            if (defAbility === 'shellarmor' && !defender._shellArmorUsed) {
                defender._shellArmorUsed = true;
                if (abilityEngine) abilityEngine._notify(`${defender.fullName}'s Shell Armor blocked the super-effective hit!`, 'action');
                effectiveness = 1;
            }
        }

        // Heavy Rain: Electric always super effective (even vs Ground)
        if (wCfg.electricAlwaysSuperEffective && effectiveMoveType === 'Electric') {
            effectiveness = Math.max(effectiveness, 2);
        }

        // Immune types always deal 0 damage (after ability absorb check done above)
        if (effectiveness === 0) return { damage: 0, effectiveness: 0 };

        // ── 3. Move power modifiers ───────────────────────────────────────
        let effectivePower = movePower;

        // Weather move modifier
        if (wCfg.moveModifiers && wCfg.moveModifiers[effectiveMoveType] !== undefined) {
            effectivePower *= wCfg.moveModifiers[effectiveMoveType];
        }

        // nullified = 0 power
        if (wCfg.nullified && wCfg.nullified.includes(effectiveMoveType)) {
            effectivePower = 0;
        }

        // Delta Stream: all non-flying moves halved
        if (wCfg.nonFlyingHalved && effectiveMoveType !== 'Flying') {
            effectivePower *= 0.5;
        }

        // Ability power modifier (attacker)
        if (abilityEngine && move) {
            const atkMult = abilityEngine.getAttackMultiplier(attacker, defender, move);
            effectivePower *= atkMult;
        }

        // Terrain move power modifier
        if (terrain) {
            if (terrain.type === 'electric' && effectiveMoveType === 'Electric') {
                effectivePower *= 1.5;
            }
            if (terrain.type === 'grassy' && effectiveMoveType === 'Grass') {
                effectivePower *= 1.5;
            }
            if (terrain.type === 'psychic' && effectiveMoveType === 'Psychic') {
                effectivePower *= 1.5;
            }
            if (terrain.type === 'misty' && effectiveMoveType === 'Dragon') {
                effectivePower *= 0.5;
            }
        }

        // Ability defense modifier (defender)
        let defAbilityMult = 1.0;
        if (abilityEngine && move) {
            defAbilityMult = abilityEngine.getDefenseMultiplier(attacker, defender, move);
        }

        // Solid Rock: super-effective -25%
        if (abilityEngine) {
            const defAbility = (defender.ability || '').toLowerCase().replace(/[\s\-]/g, '');
            if (defAbility === 'solidrock' && effectiveness > 1) {
                defAbilityMult *= 0.75;
            }
        }

        if (effectivePower <= 0) return { damage: 0, effectiveness: 0 };

        // ── 4. Stat selection ─────────────────────────────────────────────
        const offStat = attackType === 'physical'
            ? attacker.getEffectiveStat('attack')
            : attacker.getEffectiveStat('specialAttack');
        const defStat = attackType === 'physical'
            ? defender.getEffectiveStat('defence')
            : defender.getEffectiveStat('specialDefence');

        // Guts/Marvel Scale stat multipliers (from ability)
        let offMult = 1.0, defMult = 1.0;
        if (abilityEngine) {
            offMult = abilityEngine.getStatModifierFromAbility(attacker, attackType === 'physical' ? 'attack' : 'specialAttack');
            defMult = abilityEngine.getStatModifierFromAbility(defender, attackType === 'physical' ? 'defence' : 'specialDefence');
        }

        const a = offStat * offMult;
        const d = defStat * defMult;

        // Rock SpDef boost in sandstorm
        let adjustedD = d;
        if (wCfg.rockSpDefBoost && attackType === 'special' && defender.types.includes('Rock')) {
            adjustedD = d * 1.50;
        }

        // ── 5. Custom damage formula ──────────────────────────────────────
        const rawDamage = (a - adjustedD) + (effectivePower * effectiveness);
        const damage = Math.max(0, Math.floor(rawDamage * defAbilityMult));

        return { damage, effectiveness };
    }

    /**
     * Apply weather tick damage for all players (called from BattleController._applyWeatherDamage).
     * Returns array of { pokemon, playerId, damage, source } for each affected Pokémon.
     */
    calculateWeatherTick(players, weather, round) {
        const wCfg = WEATHER_CONFIG[weather] || {};
        const tick = wCfg.tickDamage;
        if (!tick) return [];

        const results = [];
        players.forEach(player => {
            const pokemon = player.getActivePokemon();
            if (!pokemon || pokemon.isFainted()) return;

            // Check Overcoat ability immunity
            const a = (pokemon.ability || '').toLowerCase().replace(/[\s\-]/g, '');
            if (a === 'overcoat') return;

            const immune = tick.immuneTypes && tick.immuneTypes.some(t => pokemon.types.includes(t));
            if (immune) return;

            // Calculate damage amount (with scaling for superior weathers)
            let amount = tick.amount;
            if (tick.scaling) {
                const scaleSteps = Math.floor((round - 1) / 2); // every 2 rounds
                amount += tick.scaleAmount * scaleSteps;
            }

            const dmg = Math.max(1, Math.floor(pokemon.maxHp * amount));
            results.push({ pokemon, playerId: player.id, damage: dmg, source: wCfg.label || weather });
        });

        return results;
    }

    /**
     * Check weather-based move accuracy modifiers.
     * Returns a new accuracy value (null = use default, Infinity = always hits, number = override)
     */
    getWeatherAccuracy(moveName, weather) {
        const wCfg = WEATHER_CONFIG[weather] || {};
        const moveId = (moveName || '').toLowerCase().replace(/[\s\-]/g, '');

        if (wCfg.blizzardAccuracy && moveId === 'blizzard') return Infinity;
        if (wCfg.thunderHurricaneAccuracy !== undefined && wCfg.thunderHurricaneAccuracy !== null) {
            if (moveId === 'thunder' || moveId === 'hurricane') return wCfg.thunderHurricaneAccuracy;
        }
        if (wCfg.iceDoublePrecision && ['blizzard', 'icebeam', 'iciclecrash', 'iciclespear'].includes(moveId)) {
            return Infinity; // 2x accuracy simplified as never-miss
        }
        if (wCfg.groundDoublePrecision && ['earthquake', 'earthpower', 'bulldoze', 'fissure', 'sandtomb'].includes(moveId)) {
            return Infinity;
        }
        if (wCfg.fireInfiniteAccuracy) {
            // All fire moves have infinite accuracy in extreme sunlight
            return null; // handled per moveType in BattleController
        }

        return null; // use default
    }
}
