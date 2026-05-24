import { applyModification } from '../utils/helpers.js';
import { Pokemon } from '../models/Pokemon.js';

export class BattleController {
    constructor(arena) {
        this.arena = arena;
    }

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

    handleAttack(attackType, remoteData = null) {
        this.arena.audio.play('attack');

        let attackerId, targetId, moveType, movePower, damage, effectiveness;

        if (remoteData) {
            attackerId = remoteData.attackerId;
            targetId = remoteData.targetId;
            moveType = remoteData.moveType;
            movePower = remoteData.movePower;
            damage = remoteData.damage;
            effectiveness = remoteData.effectiveness;
        } else {
            const attackerSel = document.getElementById('attacker-select');
            const targetSel = document.getElementById('attack-target-select');
            const typeSel = document.getElementById('move-type-select');
            const powerInput = document.getElementById('move-power-input');

            attackerId = attackerSel?.dataset?.value || attackerSel?.value;
            targetId = targetSel?.dataset?.value || targetSel?.value;
            moveType = typeSel?.value;
            movePower = parseInt(powerInput?.value);

            if (movePower > 1000) { movePower = 1000; if (powerInput) powerInput.value = 1000; }
            if (movePower < 1) { movePower = 0; }

            if (!attackerId || !targetId || !moveType || isNaN(movePower)) {
                this.arena._announce('Attacker, Target, Move Type, and Power are required!', true);
                this.arena.audio.play('error');
                return;
            }
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
            // Calculate damage locally
            const calc = this.arena.engine.calculateDamage(
                attacker, target, movePower, moveType, attackType
            );
            damage = calc.damage;
            effectiveness = calc.effectiveness;

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
        if (this.arena.gs.weather === 'none') return;
        const affected = [];
        this.arena.gs.players.forEach(player => {
            const pokemon = player.getActivePokemon();
            if (!pokemon || pokemon.isFainted()) return;
            const immune = this.arena.gs.weather === 'sandstorm'
                ? pokemon.types.some(t => ['Rock', 'Ground', 'Steel'].includes(t))
                : pokemon.types.includes('Ice'); // hail
            if (!immune) {
                const dmg = Math.floor(pokemon.maxHp / 16);
                pokemon.takeDamage(dmg);
                affected.push(pokemon.fullName);
            }
        });
        if (affected.length > 0) {
            this.arena._notify(
                `${affected.join(', ')} ${affected.length === 1 ? 'is' : 'are'} buffeted by the ${this.arena.gs.weather}!`,
                'damage'
            );
        }
    }

    _switchActivePokemon(playerId, slotId, fromModal = false, remote = false) {
        const player = this.arena.gs.players.find(p => p.id === playerId);
        const newPokemon = player?.team[slotId];
        if (!player || !newPokemon || newPokemon.isFainted()) return;
        if (player.activePokemonIndex === slotId) return;

        const doSwitch = () => {
            const old = player.getActivePokemon();
            const switched = player.switchTo(slotId);
            if (!switched) return;
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
