// ==========================================
// BATTLE ENGINE (Pure Math) — Weather + Ability Aware
// ==========================================

import { WEATHER_CONFIG, SUN_MOVES, THUNDER_ACCURACY_MOVES } from '../data/weather.js';
import { getTerrainDefenseModifier, getTerrainMovePowerMultiplier, getTerrainStatMultiplier } from '../data/terrain.js';
import { AbilityEngine } from './AbilityEngine.js';

export class BattleEngine {
    constructor(chart, rng = null) {
        this._chart = chart; // typeChart mapping
        this.rng = rng;
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

        // Terrain move power modifier (data-driven, stackable)
        if (terrain) {
            const tType = typeof terrain === 'string' ? terrain : terrain.type;
            if (tType) {
                effectivePower *= getTerrainMovePowerMultiplier(tType, effectiveMoveType);
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

        let adjustedOff = offStat;
        if (terrain) {
            const tType = typeof terrain === 'string' ? terrain : terrain.type;
            const statName = attackType === 'physical' ? 'attack' : 'specialAttack';
            const terrainStatMod = getTerrainStatMultiplier(tType, attacker.types, statName);
            adjustedOff = Math.floor(offStat * terrainStatMod);
        }

        const a = adjustedOff * offMult;
        const d = defStat * defMult;

        // Rock SpDef boost in sandstorm
        let adjustedD = d;
        if (wCfg.rockSpDefBoost && attackType === 'special' && defender.types.includes('Rock')) {
            adjustedD = d * 1.50;
        }

        // Terrain-based Def/SpD modifier (stackable with weather & ability)
        if (terrain) {
            const tType = typeof terrain === 'string' ? terrain : terrain.type;
            if (tType) {
                const terrainDefMod = getTerrainDefenseModifier(tType, defender.types);
                adjustedD *= terrainDefMod;
            }
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
    calculateWeatherTick(players, weather, round = 1) {
        if (!weather || weather === 'none') return [];
        const wKey = String(weather).toLowerCase().replace(/[\s\-_]/g, '');
        const wCfg = WEATHER_CONFIG[wKey] || WEATHER_CONFIG[weather] || {};
        const tick = wCfg.tickDamage || (wKey === 'sandstorm' ? { amount: 0.0625, immuneTypes: ['Rock', 'Ground', 'Steel'] } : null);
        if (!tick) return [];

        const results = [];
        (players || []).forEach(player => {
            const pokemon = typeof player.getActivePokemon === 'function'
                ? player.getActivePokemon()
                : (player.activePokemon || player);
            if (!pokemon || (typeof pokemon.isFainted === 'function' && pokemon.isFainted())) return;
            if (pokemon.currentHP <= 0 || pokemon.currentHp <= 0) return;

            // Check Overcoat ability immunity
            const a = (pokemon.ability || '').toLowerCase().replace(/[\s\-]/g, '');
            if (a === 'overcoat') return;

            const types = pokemon.types || [];
            const immune = tick.immuneTypes && tick.immuneTypes.some(t => types.includes(t));
            if (immune) return;

            // Calculate damage amount (with scaling for superior weathers)
            let amount = tick.amount || 0.0625;
            if (tick.scaling) {
                const scaleSteps = Math.floor((round - 1) / 2); // every 2 rounds
                amount += tick.scaleAmount * scaleSteps;
            }

            const maxHp = pokemon.maxHp || pokemon.maxHP || 100;
            const dmg = Math.max(1, Math.floor(maxHp * amount));
            results.push({ pokemon, playerId: player.id || 'p1', damage: dmg, source: wCfg.label || weather });
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

    /**
     * Apply move effects (secondary effects, stat changes, drain, recoil, weather, delayed moves).
     * Called unconditionally after every move — including status moves dealing 0 damage.
     * // ponytail: minimal direct pipeline, supports roadmap and game-data schemas
     */
    applyMoveEffect(move, user, target, damageDealt = 0, gameState = {}) {
        return applyMoveEffect(move, user, target, damageDealt, { ...gameState, rng: gameState?.rng || this.rng });
    }

    applyMoveEffects(move, user, target, damageDealt = 0, gameState = {}) {
        return this.applyMoveEffect(move, user, target, damageDealt, gameState);
    }

    applyStatusCondition(target, statusType, gameState = {}) {
        return applyStatusCondition(target, statusType, gameState);
    }

    applyStatStage(subject, stat, stages, gameState = {}) {
        return applyStatStage(subject, stat, stages, gameState);
    }
}

// ── Canonical Status Normalizer ──────────────────────────────────────────
function normalizeStatusType(raw) {
    if (!raw) return null;
    const s = String(raw).toLowerCase().replace(/[\s\-_]/g, '');
    if (['par', 'paralyze', 'paralysis'].includes(s)) return 'paralysis';
    if (['brn', 'burn', 'burned'].includes(s)) return 'burn';
    if (['psn', 'poison', 'poisoned'].includes(s)) return 'poison';
    if (['tox', 'toxic', 'badpoison', 'badlypoisoned'].includes(s)) return 'toxic';
    if (['frz', 'freeze', 'frozen'].includes(s)) return 'freeze';
    if (['slp', 'sleep', 'asleep'].includes(s)) return 'sleep';
    if (['confuse', 'confused', 'confusion'].includes(s)) return 'confusion';
    return s;
}

// ── Canonical Stat Key Normalizer ────────────────────────────────────────
function normalizeStatKey(raw) {
    if (!raw) return 'attack';
    const s = String(raw).toLowerCase().replace(/[\s\-_]/g, '');
    if (['atk', 'attack'].includes(s)) return 'attack';
    if (['def', 'defence', 'defense'].includes(s)) return 'defence';
    if (['spa', 'spatk', 'specialattack'].includes(s)) return 'specialAttack';
    if (['spd', 'spdef', 'specialdefence', 'specialdefense'].includes(s)) return 'specialDefence';
    if (['spe', 'spd_speed', 'speed'].includes(s)) return 'speed';
    return raw;
}

/**
 * Apply status condition with immunity checks (Type immunities + Ability immunities).
 * // ponytail: direct immunity table, avoids status machine abstraction
 */
export function applyStatusCondition(target, statusType, gameState = {}) {
    if (!target) return false;
    const canonical = normalizeStatusType(statusType);
    if (!canonical) return false;

    // Block if already has a primary status condition
    const isPrimary = ['burn', 'paralysis', 'freeze', 'sleep', 'poison', 'toxic'].includes(canonical);
    if (isPrimary) {
        if (target.status) return false;
        if (target.statuses && Object.keys(target.statuses).some(s =>
            ['burn', 'severe_burn', 'paralysis', 'neuro_paralysis', 'freeze', 'frozen', 'sleep', 'poison', 'bad_poison', 'toxic'].includes(s)
        )) {
            return false;
        }
    }

    // Type immunities
    const immunities = {
        burn: ['Fire'],
        freeze: ['Ice'],
        paralysis: ['Electric', 'Ground'],
        poison: ['Poison', 'Steel'],
        toxic: ['Poison', 'Steel'],
        sleep: []
    };
    const targetTypes = target.types || [];
    if (immunities[canonical]?.some(t => targetTypes.includes(t))) {
        const msg = `${target.fullName || target.name || 'Target'} is immune!`;
        _logMessage(gameState, msg, 'action');
        return false;
    }

    // Ability immunities
    const abEngine = gameState?.arena?.abilityEngine || gameState?.abilityEngine;
    const isImmune = (abEngine?.checkStatusImmunity ? abEngine.checkStatusImmunity(target.ability, canonical) : false)
        || AbilityEngine.checkStatusImmunity(target.ability, canonical);

    if (isImmune) {
        const msg = `${target.fullName || target.name || 'Target'}'s ${target.ability} prevents ${canonical}!`;
        _logMessage(gameState, msg, 'action');
        return false;
    }

    // Apply status
    target.status = canonical;
    if (typeof target.applyStatus === 'function') {
        target.applyStatus(canonical);
    } else {
        target.statuses = target.statuses || {};
        target.statuses[canonical] = { duration: 0 };
    }

    if (canonical === 'poison' || canonical === 'toxic') {
        target.poisonCounter = target.poisonCounter || 1;
    }

    const readableStatus = canonical === 'paralysis' ? 'paralyzed' : canonical + 'ed';
    const msg = `${target.fullName || target.name || 'Target'} is ${readableStatus}!`;
    _logMessage(gameState, msg, 'status');
    return true;
}

/**
 * Apply stat stage modification (-6 to +6) and update effective stat modifiers.
 */
export function applyStatStage(subject, stat, stages, gameState = {}) {
    if (!subject || !stages) return;
    const statKey = normalizeStatKey(stat);
    subject.statStages = subject.statStages || {};
    const prevStage = subject.statStages[statKey] || 0;
    const nextStage = Math.max(-6, Math.min(6, prevStage + stages));
    subject.statStages[statKey] = nextStage;

    // Calculate modifier delta (approx 10% base stat per stage delta)
    const delta = nextStage - prevStage;
    if (delta !== 0) {
        const base = (subject.stats && subject.stats[statKey]) || 100;
        const modDelta = Math.floor(base * Math.abs(delta) * 0.10);
        subject.statModifiers = subject.statModifiers || {};
        subject.statModifiers[statKey] = (subject.statModifiers[statKey] || 0) + (delta < 0 ? -modDelta : modDelta);
    }

    const verb = stages >= 2 ? 'sharply rose' : stages > 0 ? 'rose' : stages <= -2 ? 'fell sharply' : 'fell';
    const msg = `${subject.fullName || subject.name || 'Target'}'s ${statKey} ${verb}!`;
    _logMessage(gameState, msg, 'action');
}

/**
 * Helper to emit a message to gameState.log / arena log.
 */
function _logMessage(gameState, msg, type = 'action') {
    if (!gameState) return;
    if (Array.isArray(gameState.log)) {
        gameState.log.push(msg);
    } else if (gameState.log && typeof gameState.log.add === 'function') {
        gameState.log.add(msg, type);
    }
}

/**
 * Core Move Effect Application.
 * Resolves secondary status effects, stat boosts, drain, recoil, weather, field effects, and status moves.
 * Supports both roadmap schema and full moves.json dataset.
 */
export function applyMoveEffect(move, user, target, damageDealt = 0, gameState = {}) {
    if (!move) return;
    const nameClean = (move.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    // ── 0. Known Status Move Mapping (for text-only moves.json entries) ─────
    const STATUS_MOVE_DEFS = {
        swordsdance:   { statChanges: [{ stat: 'attack', stages: 2, target: 'self' }] },
        dragondance:   { statChanges: [{ stat: 'attack', stages: 1, target: 'self' }, { stat: 'speed', stages: 1, target: 'self' }] },
        calmmind:      { statChanges: [{ stat: 'specialAttack', stages: 1, target: 'self' }, { stat: 'specialDefence', stages: 1, target: 'self' }] },
        agility:       { statChanges: [{ stat: 'speed', stages: 2, target: 'self' }] },
        irondefense:   { statChanges: [{ stat: 'defence', stages: 2, target: 'self' }] },
        amnesia:       { statChanges: [{ stat: 'specialDefence', stages: 2, target: 'self' }] },
        nastyplot:     { statChanges: [{ stat: 'specialAttack', stages: 2, target: 'self' }] },
        acidarmor:     { statChanges: [{ stat: 'defence', stages: 2, target: 'self' }] },
        barrier:       { statChanges: [{ stat: 'defence', stages: 2, target: 'self' }] },
        bulkup:        { statChanges: [{ stat: 'attack', stages: 1, target: 'self' }, { stat: 'defence', stages: 1, target: 'self' }] },
        featherdance:  { statChanges: [{ stat: 'attack', stages: -2, target: 'target' }] },
        screech:       { statChanges: [{ stat: 'defence', stages: -2, target: 'target' }] },
        faketears:     { statChanges: [{ stat: 'specialDefence', stages: -2, target: 'target' }] },
        thunderwave:   { effect: 'paralyze', effectChance: 100 },
        willowisp:     { effect: 'burn', effectChance: 100 },
        toxic:         { effect: 'toxic', effectChance: 100 },
        hypnosis:      { effect: 'sleep', effectChance: 100 },
        sleeppowder:   { effect: 'sleep', effectChance: 100 },
        spore:         { effect: 'sleep', effectChance: 100 },
        confuseray:    { effect: 'confusion', effectChance: 100 },
        sandstorm:     { weather: 'Sandstorm', weatherDuration: 5 },
        raindance:     { weather: 'rain', weatherDuration: 5 },
        sunnyday:      { weather: 'harsh-sunlight', weatherDuration: 5 },
        snowscape:     { weather: 'hail', weatherDuration: 5 },
        hail:          { weather: 'hail', weatherDuration: 5 },
    };

    const statusPreset = STATUS_MOVE_DEFS[nameClean];
    let statusToApply = move.effect || statusPreset?.effect;
    let effectChance = move.effectChance !== undefined ? move.effectChance : statusPreset?.effectChance;

    // Check move.secondary structure from moves.json
    if (!statusToApply && move.secondary) {
        if (move.secondary.status) {
            statusToApply = move.secondary.status;
            effectChance = move.secondary.chance || 100;
        } else if (move.secondary.volatileStatus) {
            statusToApply = move.secondary.volatileStatus;
            effectChance = move.secondary.chance || 100;
        }
    }

    const activeRng = gameState?.rng || gameState?.arena?.rng || (typeof window !== 'undefined' && window.arena?.rng);

    // 1. Status conditions
    if (statusToApply && target) {
        const roll = (activeRng ? activeRng.next() : Math.random()) * 100;
        if (effectChance === undefined || effectChance === null || roll < effectChance) {
            applyStatusCondition(target, statusToApply, gameState);
        }
    }

    // ── 2. Stat Stage Changes ──────────────────────────────────────────────
    const statChanges = move.statChanges || statusPreset?.statChanges;
    if (Array.isArray(statChanges) && statChanges.length > 0) {
        for (const change of statChanges) {
            const isSelf = change.target === 'self' || move.target === 'self' || (!change.target && statusPreset?.statChanges?.[0]?.target === 'self');
            const subject = isSelf ? user : (target || user);
            const stages = change.stages !== undefined ? change.stages : (change.change !== undefined ? change.change : change.amount);
            if (subject && stages !== undefined) {
                applyStatStage(subject, change.stat, stages, gameState);
            }
        }
    }

    // Also support moves.json secondary.boosts
    if (move.secondary?.boosts && target) {
        const secChance = move.secondary.chance || 100;
        const secRoll = (activeRng ? activeRng.next() : Math.random()) * 100;
        if (secRoll < secChance) {
            for (const [sStat, sStages] of Object.entries(move.secondary.boosts)) {
                applyStatStage(target, sStat, sStages, gameState);
            }
        }
    }

    // Also support moves.json selfBoosts
    if (move.selfBoosts && user) {
        for (const [sbStat, sbStages] of Object.entries(move.selfBoosts)) {
            applyStatStage(user, sbStat, sbStages, gameState);
        }
    }

    // ── 3. Drain (Giga Drain, Drain Punch, Absorb) ──────────────────────────
    const drainFraction = Array.isArray(move.drain)
        ? (move.drain[0] / move.drain[1])
        : (typeof move.drain === 'number' ? move.drain : null);

    if (drainFraction && damageDealt > 0 && user) {
        const healAmount = Math.max(1, Math.floor(damageDealt * drainFraction));
        if (typeof user.heal === 'function') {
            user.heal(healAmount);
        } else {
            user.currentHp = Math.min(user.maxHp || user.currentHp, (user.currentHp || user.currentHP) + healAmount);
            if (user.currentHP !== undefined) user.currentHP = user.currentHp;
        }
        const msg = `${user.fullName || user.name || 'Attacker'} restored ${healAmount} HP!`;
        _logMessage(gameState, msg, 'heal');
    }

    // ── 4. Recoil (Brave Bird, Double-Edge, Head Smash) ────────────────────
    const recoilFraction = Array.isArray(move.recoil)
        ? (move.recoil[0] / move.recoil[1])
        : (typeof move.recoil === 'number' ? move.recoil : null);

    if (recoilFraction && damageDealt > 0 && user) {
        const recoilDamage = Math.max(1, Math.floor(damageDealt * recoilFraction));
        if (typeof user.takeDamage === 'function') {
            user.takeDamage(recoilDamage);
        } else {
            user.currentHp = Math.max(0, (user.currentHp || user.currentHP) - recoilDamage);
            if (user.currentHP !== undefined) user.currentHP = user.currentHp;
        }
        const msg = `${user.fullName || user.name || 'Attacker'} is hit with recoil!`;
        _logMessage(gameState, msg, 'damage');
    }

    // ── 5. Field Effects (Reflect, Light Screen, Tailwind) ─────────────────
    if (move.fieldEffect) {
        gameState.fieldEffects = gameState.fieldEffects || [];
        gameState.fieldEffects.push({
            name: move.fieldEffect,
            user: user?.fullName || user?.name,
            turnsLeft: 5
        });
        _logMessage(gameState, `${move.fieldEffect} was set on the field!`, 'action');
    }

    // ── 6. Weather Changes (Sandstorm, Rain Dance, etc.) ───────────────────
    const weatherToSet = move.weather || statusPreset?.weather;
    if (weatherToSet) {
        gameState.weather = weatherToSet;
        gameState.weatherTurnsLeft = move.weatherDuration || statusPreset?.weatherDuration || 5;
        _logMessage(gameState, `The weather changed to ${weatherToSet}!`, 'action');
    }

    // ── 7. Delayed Moves (Future Sight, Doom Desire) ───────────────────────
    if (move.delayed) {
        gameState.delayedMoves = gameState.delayedMoves || [];
        gameState.delayedMoves.push({
            moveName: move.name || 'Delayed Attack',
            damage: move.power || 50,
            target: target?.id || target?.fullName || target?.name,
            turnsLeft: move.delayTurns || 2,
        });
        _logMessage(gameState, `${user?.fullName || user?.name || 'Attacker'} foresaw an attack!`, 'action');
    }
}
