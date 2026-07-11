import { applyModification } from '../utils/helpers.js';
import { Pokemon } from '../models/Pokemon.js';
import { WEATHER_CONFIG } from '../data/weather.js';

export class BattleController {
    constructor(arena) {
        this.arena = arena;
    }

    get abilityEngine() { return this.arena.abilityEngine; }
    get weather() { return this.arena.gs?.weather || 'none'; }
    get wCfg() { return WEATHER_CONFIG[this.weather] || WEATHER_CONFIG.none; }

    // ── DRY Helper: applyHPChange ─────────────────────────────────────────
    /**
     * Applies an HP change to a Pokémon, then handles all side-effects in one place:
     * damage numbers, battle log, announcement, and sprite animation.
     */
    _applyHPChange(pokemon, playerId, newHP, source = '', preventSync = false) {
        const clamped = Math.max(0, Math.min(pokemon.maxHp, newHP));
        const delta = clamped - pokemon.currentHP;
        pokemon.currentHP = clamped;
        this.arena.renderer.renderAll(); // Immediate sync

        if (delta === 0) return;

        const isHeal = delta > 0;
        const isFaint = clamped === 0 && delta < 0;
        const label = source ? ` (${source})` : '';

        this.arena._showDamageNumber(playerId, Math.abs(delta), isHeal ? 'heal' : 'damage');
        this.arena._notify(
            `${pokemon.fullName}: ${isHeal ? '+' : ''}${delta} HP${label} (${clamped}/${pokemon.maxHp})`,
            isHeal ? 'heal' : 'damage'
        );

        const animType = isFaint ? 'faint' : isHeal ? 'heal' : 'damage';
        if (isFaint) this.arena.audio.playCry(pokemon);
        this.arena._animateSprite(playerId, animType, () => this.arena.renderer.renderAll());

        // Multiplayer Action Sync
        if (!preventSync && this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
            const slotId = this.arena.gs.players.find(p => p.id === playerId)?.team.indexOf(pokemon);
            if (slotId !== undefined && slotId !== -1) {
                this.arena.multiplayer.sendAction('hp_change', {
                    playerId,
                    slotId,
                    newHP: clamped,
                    source
                });
            }
        }

        // Autosave Local State
        this.arena.saveLocalState();
    }

    // ── Attack ────────────────────────────────────────────────────────────

    /**
     * Read and validate attack form inputs from the DOM.
     *
     * Isolated here so that handleAttack() stays pure logic. Also makes
     * it possible to stub this method in tests without needing a real DOM.
     *
     * @returns {{ attackerId, targetId, moveType, movePower } | null}
     *   Returns the parsed input object, or null if validation fails
     *   (error already announced inside this method).
     */
    readAttackInputs() {
        const attackerSel = document.getElementById('attacker-select');
        const targetSel   = document.getElementById('attack-target-select');
        const typeSel     = document.getElementById('move-type-select');
        const powerInput  = document.getElementById('move-power-input');

        const attackerId = attackerSel?.dataset?.value || attackerSel?.value;
        const targetId   = targetSel?.dataset?.value   || targetSel?.value;
        const moveType   = typeSel?.value;
        let   movePower  = parseInt(powerInput?.value, 10);

        // Clamp power to valid range
        if (movePower > 1000) { movePower = 1000; if (powerInput) powerInput.value = 1000; }
        if (movePower < 1)    { movePower = 0; }

        if (!attackerId || !targetId || !moveType || isNaN(movePower)) {
            this.arena._announce('Attacker, Target, Move Type, and Power are required!', true);
            this.arena.audio.play('error');
            return null;
        }

        return { attackerId, targetId, moveType, movePower };
    }

    handleAttack(attackType, remoteData = null) {
        this.arena.audio.play('attack');

        let attackerId, targetId, moveType, movePower, damage, effectiveness;

        if (remoteData) {
            attackerId   = remoteData.attackerId;
            targetId     = remoteData.targetId;
            moveType     = remoteData.moveType;
            movePower    = remoteData.movePower;
            damage       = remoteData.damage;
            effectiveness = remoteData.effectiveness;
        } else {
            // Read and validate form inputs via dedicated helper — no inline DOM access.
            const inputs = this.readAttackInputs();
            if (!inputs) return;  // helper already announced the error
            ({ attackerId, targetId, moveType, movePower } = inputs);
        }

        const attackerPlayer = this.arena.gs.players.find(p => p.id === attackerId);
        const targetPlayer = this.arena.gs.players.find(p => p.id === targetId);
        if (!attackerPlayer || !targetPlayer) return;

        const attacker = attackerPlayer.getActivePokemon();
        const target = targetPlayer.getActivePokemon();

        if (attacker.isFainted()) {
            this.arena._announce(`${attacker.fullName} is fainted and cannot attack!`, true);
            return;
        }
        if (target.isFainted()) {
            this.arena._announce(`${target.fullName} is already fainted!`, true);
            return;
        }

        if (attacker.hasStatus('paralysis') && !remoteData && Math.random() < 0.5) {
            this.arena._notify(`${attacker.fullName} is paralyzed and couldn't move!`, 'damage');
            this.arena.audio.playCry(attacker);

            if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
                this.arena.multiplayer.sendAction('attack', {
                    attackerId,
                    targetId,
                    moveType,
                    movePower,
                    attackType,
                    paralyzed: true
                });
            }
            return;
        }

        if (remoteData && remoteData.paralyzed) {
            this.arena._notify(`${attacker.fullName} is paralyzed and couldn't move!`, 'damage');
            this.arena.audio.playCry(attacker);
            return;
        }

        this.arena.history.snapshot(this.arena.gs);
        this.arena.audio.playCry(attacker);

        if (remoteData) {
            // Apply predetermined remote damage directly
            let msg = `${attacker.fullName} used a ${attackType} ${moveType} attack on ${target.fullName} for ${damage} damage!`;
            if (effectiveness > 1) msg += " It's super effective!";
            if (effectiveness < 1 && effectiveness > 0) msg += " It's not very effective...";
            if (effectiveness === 0) msg = `${target.fullName} is immune!`;

            this.arena.log.add(msg, effectiveness === 0 ? 'action' : 'damage');
            this.arena._announce(msg);

            if (damage > 0) {
                this.arena._showDamageNumber(targetId, damage, effectiveness >= 2 ? 'critical' : 'damage');
            }

            target.currentHP = Math.max(0, target.currentHP - damage);
            this.arena.renderer.renderAll();

            const onDone = () => {
                if (target.isFainted()) {
                    this.arena.audio.playCry(target);
                    this.arena._announce(`${target.fullName} fainted!`);
                    this.arena._animateSprite(targetId, 'faint', () => this.arena.renderer.renderAll());
                } else {
                    this.arena.renderer.renderAll();
                }
            };

            damage > 0
                ? this.arena._animateSprite(targetId, 'damage', onDone)
                : onDone();
        } else {
            // ── Get enriched move object (from window.MovesData) ─────────
            const moveObj = window.MovesData
                ? Object.values(window.MovesData).find(m => m.type === moveType)
                : null;
            const move = moveObj
                ? { ...moveObj, type: moveType, category: attackType === 'physical' ? 'Physical' : 'Special', flags: moveObj.flags || {} }
                : { type: moveType, category: attackType === 'physical' ? 'Physical' : 'Special', flags: {} };

            // ── Weather burn/freeze immunity checks ───────────────────────
            if (this.wCfg?.statusImmune?.includes('burn') && effectiveness > 0) {
                // Can't apply burn in rain
            }

            // ── Ability block check (before damage) ───────────────────────
            if (this.abilityEngine && this.abilityEngine.isBlockedByAbility(attacker, target, move)) {
                this.abilityEngine.getDefenseMultiplier(attacker, target, move);
                damage = 0;
                effectiveness = 0;
            } else {
                // Calculate damage locally
                const calc = this.arena.engine.calculateDamage(
                    attacker, target, movePower, moveType, attackType,
                    this.weather, move, this.abilityEngine
                );
                damage = calc.damage;
                effectiveness = calc.effectiveness;
            }

            let msg;
            if (effectiveness === 0) {
                msg = target.ability && this.abilityEngine?.isBlockedByAbility(attacker, target, move)
                    ? `${target.fullName}'s ${target.ability} made it immune!`
                    : `${target.fullName} is immune!`;
            } else {
                msg = `${attacker.fullName} used a ${attackType} ${moveType} attack on ${target.fullName} for ${damage} damage!`;
                if (effectiveness > 1) msg += " It's super effective!";
                if (effectiveness < 1 && effectiveness > 0) msg += " It's not very effective...";
            }

            this.arena.log.add(msg, effectiveness === 0 ? 'action' : 'damage');
            this.arena._announce(msg);

            if (damage > 0) {
                this.arena._showDamageNumber(targetId, damage, effectiveness >= 2 ? 'critical' : 'damage');
            }

            target.currentHP = Math.max(0, target.currentHP - damage);
            this.arena.renderer.renderAll();

            // ── Post-attack ability effects ───────────────────────────────
            if (this.abilityEngine && damage > 0) {
                this.abilityEngine.onAttackUsed(attacker, target, move, damage);
                this.abilityEngine.onHitDefender(attacker, target, move, damage);
            }

            // ── Secondary effects from move ───────────────────────────────
            if (damage > 0 && move.secondary) {
                this._applySecondaryEffect(attacker, target, move.secondary);
            }

            // ── Extremely Harsh Sunlight: fire moves apply severe burn 100% ─
            if (this.wCfg.fireSevereBurn && moveType === 'Fire' && damage > 0) {
                target.applyStatus('burn');
                this._notify(`${target.fullName} was severely burned by the extreme sunlight!`, 'action');
            }

            const onDone = () => {
                if (target.isFainted()) {
                    this.arena.audio.playCry(target);
                    this.arena._announce(`${target.fullName} fainted!`);
                    // Crowning ability: change form on KO
                    if (this.abilityEngine) {
                        const ka = (attacker.ability || '').toLowerCase().replace(/[\s\-]/g, '');
                        if (ka === 'crowning') {
                            this.abilityEngine._notify(`${attacker.fullName}'s Crowning triggered!`, 'action');
                        }
                    }
                    this.arena._animateSprite(targetId, 'faint', () => this.arena.renderer.renderAll());
                } else {
                    this.arena.renderer.renderAll();
                }
            };

            // Broadcast to other players
            if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
                this.arena.multiplayer.sendAction('attack', {
                    attackerId,
                    targetId,
                    moveType,
                    movePower,
                    attackType,
                    damage,
                    effectiveness
                });
            }

            damage > 0
                ? this.arena._animateSprite(targetId, 'damage', onDone)
                : onDone();
        }

        // Autosave Local State
        this.arena.saveLocalState();
    }

    // ── Round ─────────────────────────────────────────────────────────────

    endRound(remote = false) {
        this.arena.audio.play('confirm');
        this.arena.history.snapshot(this.arena.gs);
        this.arena.gs.round++;
        this._applyWeatherDamage();
        this._applyStatusDamage();
        this._applyEndRoundAbilities();
        this.arena.renderer.renderAll();
        this.arena._notify(`========== ROUND ${this.arena.gs.round} BEGINS ==========`, 'round');

        // Broadcast to other players
        if (!remote && this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
            this.arena.multiplayer.sendAction('end_round', {});
        }

        // Autosave Local State
        this.arena.saveLocalState();
    }

    _applyStatusDamage() {
        const affected = [];
        const cured = [];
        this.arena.gs.players.forEach(player => {
            const pokemon = player.getActivePokemon();
            if (!pokemon || pokemon.isFainted()) return;

            let totalDmg = 0;
            let curedStatus = [];

            if (pokemon.hasStatus('poison')) {
                const rounds = pokemon.statuses['poison'].duration;
                const multipliers = [0.05, 0.10, 0.15];
                const mult = multipliers[Math.min(rounds, 2)];
                totalDmg += Math.max(1, Math.floor(pokemon.maxHp * mult));
                pokemon.statuses['poison'].duration++;
                if (pokemon.statuses['poison'].duration >= 3) curedStatus.push('poison');
            }

            if (pokemon.hasStatus('bad_poison') || pokemon.hasStatus('toxic')) {
                const sName = pokemon.hasStatus('bad_poison') ? 'bad_poison' : 'toxic';
                const rounds = pokemon.statuses[sName].duration;
                const mult = 0.10 + (0.02 * rounds); // 10%, 12%, 14%...
                totalDmg += Math.max(1, Math.floor(pokemon.maxHp * mult));
                pokemon.statuses[sName].duration++;
            }

            if (pokemon.hasStatus('burn')) {
                totalDmg += Math.max(1, Math.floor(pokemon.maxHp * 0.10));
                pokemon.statuses['burn'].duration++;
                if (pokemon.statuses['burn'].duration >= 3) curedStatus.push('burn');
            }

            if (pokemon.hasStatus('curse')) {
                totalDmg += Math.max(1, Math.floor(pokemon.maxHp * 0.30));
                pokemon.statuses['curse'].duration++;
            }

            if (pokemon.hasStatus('paralysis')) {
                pokemon.statuses['paralysis'].duration++;
                if (pokemon.statuses['paralysis'].duration >= 3) curedStatus.push('paralysis');
            }

            if (totalDmg > 0) {
                pokemon.takeDamage(totalDmg);
                affected.push(pokemon.fullName);
            }

            curedStatus.forEach(s => pokemon.removeStatus(s));
            if (curedStatus.length > 0) cured.push(pokemon.fullName);
        });

        if (affected.length > 0) {
            this.arena._notify(`${affected.join(', ')} took damage from their status conditions!`, 'damage');
        }
        if (cured.length > 0) {
            this.arena._notify(`${cured.join(', ')} recovered from their status conditions!`, 'heal');
        }
    }

    _applyWeatherDamage() {
        const weather = this.arena.gs.weather;
        if (!weather || weather === 'none') return;

        const ticks = this.arena.engine.calculateWeatherTick(
            this.arena.gs.players, weather, this.arena.gs.round
        );

        ticks.forEach(({ pokemon, playerId, damage, source }) => {
            pokemon.takeDamage(damage);
            this._applyHPChange(pokemon, playerId, pokemon.currentHP, source);
        });

        if (ticks.length > 0) {
            const names = ticks.map(t => t.pokemon.fullName);
            const wLabel = WEATHER_CONFIG[weather]?.label || weather;
            this.arena._notify(
                `${names.join(', ')} ${names.length === 1 ? 'is' : 'are'} buffeted by ${wLabel}!`,
                'damage'
            );
        }
    }

    _applyEndRoundAbilities() {
        if (!this.abilityEngine) return;
        this.arena.gs.players.forEach(player => {
            const pokemon = player.getActivePokemon();
            if (!pokemon || pokemon.isFainted()) return;
            this.abilityEngine.onEndRound(pokemon);
        });
    }

    // ── Secondary Effect Helper ────────────────────────────────────────────
    _applySecondaryEffect(attacker, target, secondary) {
        const { chance, status, boosts, volatileStatus } = secondary;
        if (!chance || Math.random() * 100 > chance) return;

        // Block weather-immune statuses
        if (status) {
            const wImmune = this.wCfg?.statusImmune || [];
            const statusName = status === 'brn' ? 'burn' :
                               status === 'par' ? 'paralysis' :
                               status === 'psn' ? 'poison' :
                               status === 'frz' ? 'freeze' :
                               status === 'slp' ? 'sleep' : status;
            if (wImmune.includes(statusName)) {
                this._notify(`${target.fullName} can't get ${statusName} in this weather!`, 'action');
                return;
            }
            if (target.applyStatus(statusName)) {
                this._notify(`${target.fullName} was ${statusName}ed by the move!`, 'action');
            }
        }

        if (boosts) {
            Object.entries(boosts).forEach(([stat, stages]) => {
                const statMap = { atk: 'attack', def: 'defence', spa: 'specialAttack', spd: 'specialDefence', spe: 'speed' };
                const statName = statMap[stat] || stat;
                const pct = stages * 0.10;
                const mod = Math.floor(target.stats[statName] * Math.abs(pct));
                target.statModifiers[statName] = (target.statModifiers[statName] || 0) + (stages < 0 ? -mod : mod);
                this._notify(`${target.fullName}'s ${statName} ${stages < 0 ? 'fell' : 'rose'}!`, 'action');
            });
        }

        if (volatileStatus === 'confusion') {
            target.applyStatus('confusion');
            this._notify(`${target.fullName} became confused!`, 'action');
        }
    }

    _switchActivePokemon(playerId, slotId, fromModal = false, remote = false) {
        const player = this.arena.gs.players.find(p => p.id === playerId);
        const newPokemon = player?.team[slotId];
        if (!player || !newPokemon || newPokemon.isFainted()) return;
        if (player.activePokemonIndex === slotId) return;

        const doSwitch = () => {
            const old = player.getActivePokemon();

            // Ability switch-out effect
            if (old && this.abilityEngine) {
                this.abilityEngine.onSwitchOut(old);
            }

            const switched = player.switchTo(slotId);
            if (!switched) return;

            // Ability switch-in effect
            if (this.abilityEngine) {
                this.abilityEngine.onSwitchIn(newPokemon);
            }

            if (!fromModal) {
                this.arena.log.add(`${player.name} switched from ${old?.fullName || 'none'} to ${newPokemon.fullName}`, 'action');
                this.arena.renderer.renderAll();
                this.arena.audio.playCry(newPokemon);
                this.arena._playEntryAnimation(playerId, newPokemon.types[0]);
            } else {
                this.arena._renderTeamEditorGrid();
            }

            if (!remote && this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
                this.arena.multiplayer.sendAction('switch_pokemon', {
                    playerId,
                    slotId,
                    fromModal
                });
            }
        };

        fromModal
            ? doSwitch()
            : this.arena._animateSprite(playerId, 'switch-out', doSwitch);

        // Autosave Local State
        this.arena.saveLocalState();
    }
}
