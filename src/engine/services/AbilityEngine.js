// ==========================================
// ABILITY ENGINE
// Implements ALL ability battle effects.
// Data priority: Abilities.xlsx (game-specific) > Showdown abilities.ts
// ==========================================

import { WEATHER_CONFIG } from '../data/weather.js';

export class AbilityEngine {
    constructor(arena) {
        this.arena = arena;
    }

    get weather() { return this.arena?.gs?.weather || 'none'; }
    get gs() { return this.arena?.gs; }

    // ── Helpers ────────────────────────────────────────────────────────────

    _notify(msg, type = 'action') { this.arena._notify(msg, type); }
    _applyHP(pokemon, playerId, newHP, src) {
        if (this.arena?.battleController) {
            this.arena.battleController._applyHPChange(pokemon, playerId, newHP, src);
        } else {
            pokemon.currentHP = Math.max(0, Math.min(pokemon.maxHp, newHP));
        }
    }

    _getPlayerId(pokemon) {
        return this.gs?.players?.find(p => p.getActivePokemon() === pokemon)?.id;
    }

    _ability(pokemon) {
        return (pokemon?.ability || '').toLowerCase().replace(/[\s\-]/g, '');
    }

    _hasAbility(pokemon, ...names) {
        const a = this._ability(pokemon);
        return names.some(n => a === n.toLowerCase().replace(/[\s\-]/g, ''));
    }

    _statPercent(pokemon, stat, percent) {
        const base = pokemon.stats[stat];
        const mod = Math.floor(base * percent);
        pokemon.statModifiers[stat] = (pokemon.statModifiers[stat] || 0) + mod;
        return mod;
    }

    // ── On Switch-In Triggers ──────────────────────────────────────────────
    /**
     * Call when a Pokémon enters the field (switch-in or game start)
     */
    onSwitchIn(pokemon) {
        const pid = this._getPlayerId(pokemon);
        const a = this._ability(pokemon);

        // Intimidate — lower all opponents' Attack by 20%
        if (a === 'intimidate') {
            const foes = this.gs.players.filter(p => p.getActivePokemon() !== pokemon);
            foes.forEach(p => {
                const foe = p.getActivePokemon();
                if (!foe || foe.isFainted()) return;
                if (this._hasAbility(foe, 'clearbody', 'whitesmoke', 'fullmetalbody', 'bigpecks')) return;
                if (this._hasAbility(foe, 'innerFocus', 'innerfocus')) return; // Inner Focus blocks Intimidate
                const reduction = Math.floor(foe.stats.attack * 0.20);
                foe.statModifiers.attack = (foe.statModifiers.attack || 0) - reduction;
                this._notify(`${pokemon.fullName}'s Intimidate lowered ${foe.fullName}'s Attack!`, 'action');
            });
        }

        // Download — compare Def+SpDef vs foe; if less raise Atk+SpAtk 30%
        if (a === 'download') {
            const foes = this.gs.players.filter(p => p.getActivePokemon() !== pokemon);
            if (foes.length > 0) {
                const foe = foes[0].getActivePokemon();
                if (foe) {
                    const selfDef = pokemon.getEffectiveStat('defence') + pokemon.getEffectiveStat('specialDefence');
                    const foeDef = foe.getEffectiveStat('defence') + foe.getEffectiveStat('specialDefence');
                    if (selfDef < foeDef) {
                        this._statPercent(pokemon, 'attack', 0.30);
                        this._statPercent(pokemon, 'specialAttack', 0.30);
                        this._notify(`${pokemon.fullName}'s Download boosted its Attack stats!`, 'action');
                    }
                }
            }
        }

        // Drought → start harsh sunlight
        if (a === 'drought') {
            this._setWeather('harsh-sunlight', pokemon);
        }

        // Desolate Land → extremely harsh sunlight (superior)
        if (a === 'desolateland') {
            this._setWeather('extreme-sunlight', pokemon);
        }

        // Drizzle → rain
        if (a === 'drizzle') {
            this._setWeather('rain', pokemon);
        }

        // Primordial Sea → heavy rain (superior)
        if (a === 'primordialsea') {
            this._setWeather('heavy-rain', pokemon);
        }

        // Sand Stream → sandstorm
        if (a === 'sandstream') {
            this._setWeather('sandstorm', pokemon);
        }

        // Snow Warning → hail
        if (a === 'snowwarning') {
            this._setWeather('hail', pokemon);
        }

        // Snow Storm ability → starts Snow Storm superior weather
        if (a === 'snowstorm') {
            this._setWeather('snow-storm', pokemon);
        }

        // Dune Storm ability → Dune Storm
        if (a === 'dunestorm') {
            this._setWeather('dune-storm', pokemon);
        }

        // Grassy Surge → grass terrain (simplified: grass moves +50%, ice/flying -50%)
        if (a === 'grassysurge') {
            this.gs.terrain = 'grassy';
            this._notify(`${pokemon.fullName} created a Grassy Terrain!`, 'action');
        }

        // Electric Surge → electric terrain
        if (a === 'electricsurge') {
            this.gs.terrain = 'electric';
            this._notify(`${pokemon.fullName} created an Electric Terrain!`, 'action');
        }

        // Psychic Surge → psychic terrain
        if (a === 'psychicsurge') {
            this.gs.terrain = 'psychic';
            this._notify(`${pokemon.fullName} created a Psychic Terrain!`, 'action');
        }

        // Teravolt → burn foe
        if (a === 'teravolt') {
            const foes = this.gs.players.filter(p => p.getActivePokemon() !== pokemon);
            foes.forEach(p => {
                const foe = p.getActivePokemon();
                if (foe && !foe.hasStatus('burn') && !foe.types.includes('Fire')) {
                    foe.applyStatus('burn');
                    this._notify(`${pokemon.fullName}'s Teravolt paralyzed ${foe.fullName}!`, 'action');
                }
            });
        }

        // Turboblaze → burn foe (like Teravolt variant)
        if (a === 'turboblaze') {
            const foes = this.gs.players.filter(p => p.getActivePokemon() !== pokemon);
            foes.forEach(p => {
                const foe = p.getActivePokemon();
                if (foe && !foe.hasStatus('burn') && !foe.types.includes('Fire')) {
                    foe.applyStatus('burn');
                    this._notify(`${pokemon.fullName}'s Turboblaze burned ${foe.fullName}!`, 'action');
                }
            });
        }

        // Synchronize — copy own status to foe on switch-in
        if (a === 'synchronize') {
            const statuses = Object.keys(pokemon.statuses);
            if (statuses.length > 0) {
                const foes = this.gs.players.filter(p => p.getActivePokemon() !== pokemon);
                foes.forEach(p => {
                    const foe = p.getActivePokemon();
                    if (!foe) return;
                    statuses.forEach(s => foe.applyStatus(s));
                    this._notify(`${pokemon.fullName}'s Synchronize spread its status to ${foe.fullName}!`, 'action');
                });
            }
        }

        // Intrepid Sword — raise Atk+SpAtk by % of own HP lost (Zacian)
        if (a === 'intrepidsword') {
            const lostPct = 1 - pokemon.getHPPercent();
            if (lostPct > 0) {
                const boost = Math.floor(pokemon.stats.attack * lostPct);
                pokemon.statModifiers.attack = (pokemon.statModifiers.attack || 0) + boost;
                pokemon.statModifiers.specialAttack = (pokemon.statModifiers.specialAttack || 0) + boost;
                this._notify(`${pokemon.fullName}'s Intrepid Sword raised its attack!`, 'action');
            }
        }

        // Protosynthesis — raise chosen stat by 20% in harsh sunlight
        if (a === 'protosynthesis' && (this.weather === 'harsh-sunlight' || this.weather === 'extreme-sunlight')) {
            // Raise highest stat
            const pick = this._highestStat(pokemon);
            this._statPercent(pokemon, pick, 0.20);
            this._notify(`${pokemon.fullName}'s Protosynthesis boosted its ${pick}!`, 'action');
        }

        // Therianation / Incarnation — form change
        if (a === 'therianation') {
            this._notify(`${pokemon.fullName} shifted to its Therian Form!`, 'action');
            pokemon.currentHP = Math.min(pokemon.maxHp, Math.floor(pokemon.currentHP + pokemon.maxHp * 0.30));
            pokemon.statuses = {};
        }
        if (a === 'incarnation') {
            this._notify(`${pokemon.fullName} shifted to its Incarnate Form!`, 'action');
            pokemon.currentHP = Math.min(pokemon.maxHp, Math.floor(pokemon.currentHP + pokemon.maxHp * 0.30));
            pokemon.statuses = {};
        }
    }

    // ── On Switch-Out Triggers ─────────────────────────────────────────────
    onSwitchOut(pokemon) {
        const a = this._ability(pokemon);

        // Regenerator — heal 50% on switch-out
        if (a === 'regenerator') {
            const heal = Math.floor(pokemon.maxHp * 0.50);
            pokemon.currentHP = Math.min(pokemon.maxHp, pokemon.currentHP + heal);
            this._notify(`${pokemon.fullName} restored HP with Regenerator!`, 'heal');
        }

        // Natural Cure — remove status on switch-out
        if (a === 'naturalcure') {
            pokemon.statuses = {};
            this._notify(`${pokemon.fullName}'s Natural Cure removed its status conditions!`, 'heal');
        }

        // Hospitality — heal a random non-fainted teammate 50%
        if (a === 'hospitality') {
            const myPlayer = this.gs.players.find(p => p.team.includes(pokemon));
            if (myPlayer) {
                const allies = myPlayer.team.filter(pk => pk !== pokemon && !pk.isFainted() && pk.currentHP < pk.maxHp);
                if (allies.length > 0) {
                    const target = allies[Math.floor(Math.random() * allies.length)];
                    const heal = Math.floor(target.maxHp * 0.50);
                    target.currentHP = Math.min(target.maxHp, target.currentHP + heal);
                    this._notify(`${pokemon.fullName}'s Hospitality healed ${target.fullName}!`, 'heal');
                }
            }
        }
    }

    // ── On Attack (modify power before damage calc) ────────────────────────
    /**
     * Returns a multiplier to apply to move power based on attacker's ability.
     * @param {Pokemon} attacker
     * @param {Pokemon} defender
     * @param {Object} move  — enriched move object { type, category, power, flags, ... }
     * @returns {number} multiplier
     */
    getAttackMultiplier(attacker, defender, move) {
        const a = this._ability(attacker);
        const moveId = (move.name || '').toLowerCase().replace(/[\s\-]/g, '');
        const isContact = !!(move.flags?.contact);
        const isPunch = !!(move.flags?.punch);
        const isSound = !!(move.flags?.sound);
        const isBite = !!(move.flags?.bite);
        const isBullet = !!(move.flags?.bullet);
        const isWind = !!(move.flags?.wind);
        const isSlicing = !!(move.flags?.slicing);
        const movePower = move.power || 0;
        const moveType = move.type || '';
        const isPhysical = move.category === 'Physical';
        const attHp = attacker.getHPPercent();

        let mult = 1.0;

        // Adaptability: same type as foe → +50% more if type matches
        if (a === 'adaptability' && defender.types.includes(moveType)) {
            mult *= 1.5;
        }

        // Iron Fist: punch moves +20%
        if (a === 'ironfist' && isPunch) mult *= 1.20;

        // Technician: in this game means not-very-effective → super effective
        // We handle this separately as it changes effectiveness not power

        // Tough Claws: contact moves +30%
        if (a === 'toughclaws' && isContact) mult *= 1.30;

        // Mega Launcher: pulse/aura moves +50%
        if (a === 'megalauncher' && (moveId.includes('pulse') || moveId.includes('aura') || moveId.includes('wave'))) {
            mult *= 1.50;
        }

        // Reckless: recoil moves +30% power (recoil also applied)
        if (a === 'reckless' && move.recoil) mult *= 1.30;

        // Blaze: fire moves +50% when HP ≤ 30%
        if (a === 'blaze' && moveType === 'Fire' && attHp <= 0.30) mult *= 1.50;

        // Torrent: water moves +50% when HP ≤ 30%
        if (a === 'torrent' && moveType === 'Water' && attHp <= 0.30) mult *= 1.50;

        // Overgrow: grass moves +50% when HP ≤ 30%
        if (a === 'overgrow' && moveType === 'Grass' && attHp <= 0.30) mult *= 1.50;

        // Swarm: bug moves +50% when HP ≤ 30%
        if (a === 'swarm' && moveType === 'Bug' && attHp <= 0.30) mult *= 1.50;

        // Guts: +50% physical attack when statused (not applied here — stat is adjusted in Pokemon.getEffectiveStat)
        // We handle by modifying attacker stat via onStatusApplied

        // Hustle: physical attack +50% (accuracy -20%, handled in accuracy section)
        if (a === 'hustle' && isPhysical) mult *= 1.50;

        // Sand Force: rock+ground moves +50% in sandstorm
        if (a === 'sandforce' && (moveType === 'Rock' || moveType === 'Ground') &&
            (this.weather === 'sandstorm' || this.weather === 'dune-storm')) {
            mult *= 1.50;
        }

        // Flash Fire: stored fire boost
        if (a === 'flashfire' && moveType === 'Fire' && attacker._flashFireActive) {
            mult *= 1.50;
        }

        // Sharpness: slicing moves +50%
        if (a === 'sharpness' && isSlicing) mult *= 1.50;

        // Justified: vs Dark/Ghost types +50%
        if (a === 'justified' && (defender.types.includes('Dark') || defender.types.includes('Ghost'))) {
            mult *= 1.50;
        }

        // Inner Justice: if foe's Def+SpDef < Atk+SpAtk → moves +50%
        if (a === 'innerjustice') {
            const foeDef = defender.getEffectiveStat('defence') + defender.getEffectiveStat('specialDefence');
            const foeAtk = defender.getEffectiveStat('attack') + defender.getEffectiveStat('specialAttack');
            if (foeDef < foeAtk) mult *= 1.50;
        }

        // Dark Aura: convert move to Dark type (power unchanged)
        // — handled by type override in BattleEngine

        // Fairy Aura: convert to Fairy type

        // Soundproof: ignore sound moves (handled in onDefend)

        // Terrain-based: Grassy Surge, Electric Surge, Psychic Surge
        if (this.gs?.terrain === 'grassy') {
            if (moveType === 'Grass') mult *= 1.50;
            if (moveType === 'Ice' || moveType === 'Flying') mult *= 0.50;
        }
        if (this.gs?.terrain === 'electric') {
            if (moveType === 'Electric') mult *= 1.50;
            if (moveType === 'Steel' || moveType === 'Water') mult *= 0.50;
        }
        if (this.gs?.terrain === 'psychic') {
            if (moveType === 'Psychic') mult *= 1.50;
            if (moveType === 'Ghost' || moveType === 'Bug') mult *= 0.50;
        }

        return mult;
    }

    /**
     * Returns a multiplier to apply to damage received based on DEFENDER's ability.
     */
    getDefenseMultiplier(attacker, defender, move) {
        const a = this._ability(defender);
        const moveType = move.type || '';
        const isContact = !!(move.flags?.contact);
        const isSound = !!(move.flags?.sound);
        const isBullet = !!(move.flags?.bullet);

        // Levitate: immune to Ground
        if (a === 'levitate' && moveType === 'Ground') return 0;

        // Flash Fire: immune to Fire
        if (a === 'flashfire' && moveType === 'Fire') {
            defender._flashFireActive = true;
            this._notify(`${defender.fullName}'s Flash Fire absorbed the fire move!`, 'action');
            return 0;
        }

        // Water Absorb: immune to Water, heal 25%
        if (a === 'waterabsorb' && moveType === 'Water') {
            const heal = Math.floor(defender.maxHp * 0.25);
            defender.currentHP = Math.min(defender.maxHp, defender.currentHP + heal);
            this._notify(`${defender.fullName} absorbed the Water move!`, 'heal');
            return 0;
        }

        // Storm Drain: absorb water, raise SpAtk 20%
        if (a === 'stormdrain' && moveType === 'Water') {
            this._statPercent(defender, 'specialAttack', 0.20);
            this._notify(`${defender.fullName}'s Storm Drain absorbed the Water move and raised Sp. Atk!`, 'action');
            return 0;
        }

        // Volt Absorb: immune to Electric, heal 25%
        if (a === 'voltabsorb' && moveType === 'Electric') {
            const heal = Math.floor(defender.maxHp * 0.25);
            defender.currentHP = Math.min(defender.maxHp, defender.currentHP + heal);
            this._notify(`${defender.fullName} absorbed the Electric move!`, 'heal');
            return 0;
        }

        // Ice Body: immune to Ice
        if (a === 'icebody' && moveType === 'Ice') return 0;

        // Heatproof: immune to Fire
        if (a === 'heatproof' && moveType === 'Fire') return 0;

        // Thick Fat: halve Fire/Ice
        if (a === 'thickfat' && (moveType === 'Fire' || moveType === 'Ice')) return 0.5;

        // Dry Skin: immune to Water (heal), but fire hurts more
        if (a === 'dryskin') {
            if (moveType === 'Water') {
                const heal = Math.floor(defender.maxHp * 0.25);
                defender.currentHP = Math.min(defender.maxHp, defender.currentHP + heal);
                this._notify(`${defender.fullName}'s Dry Skin absorbed moisture!`, 'heal');
                return 0;
            }
            if (moveType === 'Fire') return 1.25; // take extra fire damage
        }

        // Soundproof: immune to sound moves
        if (a === 'soundproof' && isSound) {
            this._notify(`${defender.fullName}'s Soundproof blocked the sound move!`, 'action');
            return 0;
        }

        // Bulletproof: immune to bullet moves
        if (a === 'bulletproof' && isBullet) {
            this._notify(`${defender.fullName}'s Bulletproof blocked the bullet move!`, 'action');
            return 0;
        }

        // Solid Rock: super-effective damage -25%
        if (a === 'solidrock') {
            // We'll check effectiveness via BattleEngine — handled in BattleEngine
        }

        // Overcoat: immune to weather damage and powder moves
        if (a === 'overcoat') {
            // Weather immunity handled in BattleController
        }

        // Shell Armor: protect from super-effective (1 use per battle)
        if (a === 'shellarmor' && !defender._shellArmorUsed) {
            // Checked in BattleEngine for super-effective
        }

        // Weak Armor: physical attacks lower def, raise speed
        if (a === 'weakarmor' && move.category === 'Physical') {
            const defRed = Math.floor(defender.stats.defence * 0.10);
            const spdBoost = Math.floor(defender.stats.speed * 0.20);
            defender.statModifiers.defence = (defender.statModifiers.defence || 0) - defRed;
            defender.statModifiers.speed = (defender.statModifiers.speed || 0) + spdBoost;
            this._notify(`${defender.fullName}'s Weak Armor raised its Speed!`, 'action');
        }

        // Wonder Guard: only super-effective moves deal damage
        // — handled in BattleEngine

        return 1.0;
    }

    /**
     * After damage is dealt — apply on-hit effects from defender's ability.
     */
    onHitDefender(attacker, defender, move, damage) {
        const a = this._ability(defender);
        const isContact = !!(move.flags?.contact);
        const pid = this._getPlayerId(attacker);

        // Flame Body: 30% burn on contact
        if (a === 'flamebody' && isContact && Math.random() < 0.30) {
            if (attacker.applyStatus('burn')) {
                this._notify(`${attacker.fullName} got burned by ${defender.fullName}'s Flame Body!`, 'action');
            }
        }

        // Static: 30% paralysis on contact
        if (a === 'static' && isContact && Math.random() < 0.30) {
            if (attacker.applyStatus('paralysis')) {
                this._notify(`${attacker.fullName} got paralyzed by ${defender.fullName}'s Static!`, 'action');
            }
        }

        // Poison Point: 30% poison on contact
        if (a === 'poisonpoint' && isContact && Math.random() < 0.30) {
            if (attacker.applyStatus('poison')) {
                this._notify(`${attacker.fullName} got poisoned by ${defender.fullName}'s Poison Point!`, 'action');
            }
        }

        // Effect Spore: 30% random status (spore) on contact
        if (a === 'effectspore' && isContact && Math.random() < 0.30) {
            const statuses = ['paralysis', 'poison', 'sleep'];
            const s = statuses[Math.floor(Math.random() * statuses.length)];
            if (attacker.applyStatus(s)) {
                this._notify(`${attacker.fullName} was hit by ${defender.fullName}'s Effect Spore (${s})!`, 'action');
            }
        }

        // Rough Skin: foe loses 10% HP on contact
        if (a === 'roughskin' && isContact && pid) {
            const dmg = Math.floor(attacker.maxHp * 0.10);
            attacker.takeDamage(dmg);
            this._notify(`${defender.fullName}'s Rough Skin hurt ${attacker.fullName}!`, 'damage');
        }

        // Clawed Armor: foe loses 30% HP on contact (game-specific)
        if (a === 'clawedarmor' && isContact) {
            const dmg = Math.floor(attacker.maxHp * 0.30);
            attacker.takeDamage(dmg);
            this._notify(`${defender.fullName}'s Clawed Armor retaliated!`, 'damage');
        }

        // Tangled Feet: raise evasion 20% on being hit (simplified: raise speed)
        if (a === 'tangledfeet') {
            const boost = Math.floor(defender.stats.speed * 0.20);
            defender.statModifiers.speed = (defender.statModifiers.speed || 0) + boost;
        }

        // Weak Armor already handled in getDefenseMultiplier

        // Inner Focus / Own Tempo (no flinch/confusion) — passive, no on-hit needed

        // Synchronize — copy status to attacker
        if (a === 'synchronize') {
            const statuses = Object.keys(defender.statuses);
            if (statuses.length > 0 && Math.random() < 0.5) {
                statuses.forEach(s => attacker.applyStatus(s));
                this._notify(`${defender.fullName}'s Synchronize copied its status to ${attacker.fullName}!`, 'action');
            }
        }
    }

    /**
     * After attacker uses a move — apply secondary effects from attacker's ability.
     */
    onAttackUsed(attacker, defender, move, damage) {
        const a = this._ability(attacker);
        const moveType = move.type || '';

        // Poison Puppeteer: poison → also confuse foe
        if (a === 'poisonpuppeteer' && defender.hasStatus('poison')) {
            defender.applyStatus('confusion');
            this._notify(`${defender.fullName} is confused from ${attacker.fullName}'s Poison Puppeteer!`, 'action');
        }

        // Terrorize: lower foe atk+spatk 20% at end of round (handled in end-of-round instead)

        // Drain — heal attacker based on damage dealt
        if (move.drain && damage > 0) {
            const [num, denom] = move.drain;
            const heal = Math.floor(damage * (num / denom));
            attacker.currentHP = Math.min(attacker.maxHp, attacker.currentHP + heal);
            this._notify(`${attacker.fullName} absorbed ${heal} HP!`, 'heal');
        }

        // Recoil — damage attacker
        if (move.recoil && damage > 0) {
            const [num, denom] = move.recoil;
            // Game has Reckless ability = 30% recoil. Move's base recoil is the fraction
            const recoilMult = a === 'reckless' ? 0.30 : (num / denom);
            const recoilDmg = Math.floor(attacker.maxHp * recoilMult);
            attacker.takeDamage(recoilDmg);
            this._notify(`${attacker.fullName} was damaged by recoil!`, 'damage');
        }

        // Quark Drive (game version): track electric move count, boost on use
        if (a === 'quarkdrive' && moveType === 'Electric') {
            if (!attacker._quarkCount) attacker._quarkCount = 0;
            attacker._quarkCount++;
        }
    }

    // ── End-of-Round Triggers ──────────────────────────────────────────────
    onEndRound(pokemon) {
        const a = this._ability(pokemon);
        const pid = this._getPlayerId(pokemon);

        // Speed Boost: +20% speed each round (capped at 50% total)
        if (a === 'speedboost') {
            if (!pokemon._speedBoostTotal) pokemon._speedBoostTotal = 0;
            if (pokemon._speedBoostTotal < 0.50) {
                const boost = Math.floor(pokemon.stats.speed * 0.20);
                pokemon.statModifiers.speed = (pokemon.statModifiers.speed || 0) + boost;
                pokemon._speedBoostTotal = (pokemon._speedBoostTotal || 0) + 0.20;
                this._notify(`${pokemon.fullName}'s Speed Boost raised its speed!`, 'action');
            }
        }

        // Dry Skin: heal 12.5% in rain, lose 12.5% in sun
        if (a === 'dryskin') {
            if (this.weather === 'rain' || this.weather === 'heavy-rain') {
                const heal = Math.floor(pokemon.maxHp * 0.125);
                pokemon.currentHP = Math.min(pokemon.maxHp, pokemon.currentHP + heal);
                this._notify(`${pokemon.fullName}'s Dry Skin absorbed moisture from rain!`, 'heal');
            } else if (this.weather === 'harsh-sunlight' || this.weather === 'extreme-sunlight') {
                const dmg = Math.floor(pokemon.maxHp * 0.125);
                pokemon.takeDamage(dmg);
                this._notify(`${pokemon.fullName}'s Dry Skin dried out in the sun!`, 'damage');
            }
        }

        // Ice Body: heal 10% in hail
        if (a === 'icebody' && this.weather === 'hail') {
            const heal = Math.floor(pokemon.maxHp * 0.10);
            pokemon.currentHP = Math.min(pokemon.maxHp, pokemon.currentHP + heal);
            this._notify(`${pokemon.fullName} recovered HP with Ice Body!`, 'heal');
        }

        // Hydration: during rain, full HP restore + clear status (stops rain)
        if (a === 'hydration' && (this.weather === 'rain' || this.weather === 'heavy-rain')) {
            pokemon.currentHP = pokemon.maxHp;
            pokemon.statuses = {};
            this.gs.weather = 'none';
            this._notify(`${pokemon.fullName}'s Hydration restored all HP and cleared status! Rain stopped!`, 'heal');
        }

        // Bad Dreams: sleeping foes lose 30% HP
        if (a === 'baddreams') {
            const foes = this.gs.players.filter(p => p.getActivePokemon() !== pokemon);
            foes.forEach(p => {
                const foe = p.getActivePokemon();
                if (foe && foe.hasStatus('sleep')) {
                    const dmg = Math.floor(foe.maxHp * 0.30);
                    foe.takeDamage(dmg);
                    this._notify(`${foe.fullName} suffers from Bad Dreams!`, 'damage');
                }
            });
        }

        // Terrorize: lower foe Atk+SpAtk 20% each round
        if (a === 'terrorize') {
            const foes = this.gs.players.filter(p => p.getActivePokemon() !== pokemon);
            foes.forEach(p => {
                const foe = p.getActivePokemon();
                if (!foe || foe.isFainted()) return;
                const atkRed = Math.floor(foe.stats.attack * 0.20);
                const spaRed = Math.floor(foe.stats.specialAttack * 0.20);
                foe.statModifiers.attack = (foe.statModifiers.attack || 0) - atkRed;
                foe.statModifiers.specialAttack = (foe.statModifiers.specialAttack || 0) - spaRed;
                this._notify(`${pokemon.fullName}'s Terrorize weakened ${foe.fullName}'s attacks!`, 'action');
            });
        }

        // Mutli Boost (game specific): raise 3 random stats 15% each round
        if (a === 'mutliboost' || a === 'multiboost') {
            const stats = ['attack','defence','specialAttack','specialDefence','speed'];
            for (let i = 0; i < 3; i++) {
                const s = stats[Math.floor(Math.random() * stats.length)];
                const boost = Math.floor(pokemon.stats[s] * 0.15);
                pokemon.statModifiers[s] = (pokemon.statModifiers[s] || 0) + boost;
            }
            this._notify(`${pokemon.fullName}'s Mutli Boost raised its stats!`, 'action');
        }

        // Illusive Mist: raise evasion (simplified: raise speed as proxy) 10% each round
        if (a === 'illusivemist') {
            const boost = Math.floor(pokemon.stats.speed * 0.10);
            pokemon.statModifiers.speed = (pokemon.statModifiers.speed || 0) + boost;
        }

        // RKS System: change to random type each round
        if (a === 'rkssystem') {
            const types = ['Normal','Fire','Water','Grass','Electric','Ice','Fighting','Poison','Ground','Flying','Psychic','Bug','Rock','Ghost','Dragon','Dark','Steel','Fairy'];
            pokemon.types = [types[Math.floor(Math.random() * types.length)]];
            this._notify(`${pokemon.fullName}'s RKS System changed its type!`, 'action');
        }

        // Quark Drive: apply stat boost based on count
        if (a === 'quarkdrive' && pokemon._quarkCount > 0) {
            const pick = this._highestStat(pokemon);
            const boost = Math.floor(pokemon.stats[pick] * 0.10 * pokemon._quarkCount);
            pokemon.statModifiers[pick] = (pokemon.statModifiers[pick] || 0) + boost;
            this._notify(`${pokemon.fullName}'s Quark Drive activated!`, 'action');
            pokemon._quarkCount = 0;
        }

        // Grassy Surge: 50% chance heal from foe contact (handled inline)
    }

    // ── Weather ability helper ─────────────────────────────────────────────
    _setWeather(weatherKey, pokemon) {
        const current = this.gs.weather;
        const currentCfg = WEATHER_CONFIG[current] || {};
        const newCfg = WEATHER_CONFIG[weatherKey] || {};

        // Delta Stream cannot be overridden by anything
        if (currentCfg.untouchable) {
            this._notify(`${pokemon.fullName}'s ability failed — Delta Stream cannot be overridden!`, 'action');
            return;
        }

        // Superior weather cannot be overridden by normal weather
        if (currentCfg.superior && !newCfg.superior) {
            this._notify(`${pokemon.fullName}'s ability failed — superior weather is in effect!`, 'action');
            return;
        }

        this.gs.weather = weatherKey;
        this._notify(`${pokemon.fullName}'s ability started ${newCfg.label || weatherKey}!`, 'action');
        if (this.arena.renderer) this.arena.renderer.renderAll();
    }

    // ── Utility ────────────────────────────────────────────────────────────
    _highestStat(pokemon) {
        const stats = ['attack','specialAttack','defence','specialDefence','speed'];
        return stats.reduce((best, s) =>
            pokemon.getEffectiveStat(s) > pokemon.getEffectiveStat(best) ? s : best, 'attack');
    }

    /**
     * Check if a move is blocked (Levitate, Water Absorb, etc.)
     * Returns true if move should be fully absorbed/blocked
     */
    isBlockedByAbility(attacker, defender, move) {
        const a = this._ability(defender);
        const moveType = move.type || '';
        const isSound = !!(move.flags?.sound);
        const isBullet = !!(move.flags?.bullet);

        if (a === 'levitate' && moveType === 'Ground') return true;
        if (a === 'flashfire' && moveType === 'Fire') return true;
        if (a === 'waterabsorb' && moveType === 'Water') return true;
        if (a === 'stormdrain' && moveType === 'Water') return true;
        if (a === 'voltabsorb' && moveType === 'Electric') return true;
        if (a === 'icebody' && moveType === 'Ice') return true;
        if (a === 'heatproof' && moveType === 'Fire') return true;
        if (a === 'soundproof' && isSound) return true;
        if (a === 'bulletproof' && isBullet) return true;

        // Wonder Guard: block non-super-effective moves
        if (a === 'wonderguard') {
            const effectiveness = this.arena?.engine?.getTypeEffectiveness(moveType, defender.types) || 1;
            if (effectiveness <= 1) return true;
        }

        return false;
    }

    /**
     * Applies Guts/Marvel Scale stat changes based on status.
     * Called in Pokemon.getEffectiveStat.
     */
    getStatModifierFromAbility(pokemon, statName) {
        const a = this._ability(pokemon);
        const isStatused = Object.keys(pokemon.statuses).length > 0;

        if (a === 'guts' && statName === 'attack' && isStatused) {
            return 1.50; // 50% boost
        }
        if (a === 'marvelscale' && statName === 'defence' && isStatused) {
            return 1.50;
        }
        if (a === 'lightmetal') {
            if (statName === 'defence') return 0.50;
            if (statName === 'speed') return 2.0;
        }
        if (a === 'guarddown') {
            // nullify def/spdef and add to atk/spatk
            if (statName === 'defence' || statName === 'specialDefence') return 0;
        }

        return 1.0;
    }
}
