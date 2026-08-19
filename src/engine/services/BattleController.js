import { applyModification } from '../utils/helpers.js';
import { Pokemon } from '../models/Pokemon.js';
import { WEATHER_CONFIG } from '../data/weather.js';
import { TERRAIN_CONFIG } from '../data/terrain.js';

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
        const moveNameSel = document.getElementById('move-name-select');

        const attackerId = attackerSel?.dataset?.value || attackerSel?.value;
        let   targetId   = targetSel?.dataset?.value   || targetSel?.value;
        const moveType   = typeSel?.value;
        let   movePower  = parseInt(powerInput?.value, 10);
        const moveName   = moveNameSel?.value || '';

        // Clamp power to valid range
        if (movePower > 1000) { movePower = 1000; if (powerInput) powerInput.value = 1000; }
        if (movePower < 1)    { movePower = 0; }

        // Find actual move category from MovesData if possible
        const moveData = window.MovesData && moveName ? window.MovesData[moveName] : null;
        const isStatusMove = moveData?.category === 'Status' || moveData?.category === 'status';

        // Auto self-target if it is a self status move and no target is selected
        if (isStatusMove && !targetId && attackerId) {
            targetId = attackerId;
            if (targetSel) {
                if (targetSel.dataset) targetSel.dataset.value = attackerId;
                targetSel.value = attackerId;
            }
        }

        if (!attackerId || !targetId || !moveType || isNaN(movePower)) {
            this.arena._announce('Attacker, Target, Move Type, and Power are required!', true);
            this.arena.audio.play('error');
            return null;
        }

        return { attackerId, targetId, moveType, movePower, moveName };
    }


    handleAttack(attackType, remoteData = null) {
        this.arena.audio.play('attack');

        let attackerId, targetId, moveType, movePower, moveName, damage, effectiveness;

        if (remoteData) {
            attackerId   = remoteData.attackerId;
            targetId     = remoteData.targetId;
            moveType     = remoteData.moveType;
            movePower    = remoteData.movePower;
            moveName     = remoteData.moveName || '';
            damage       = remoteData.damage;
            effectiveness = remoteData.effectiveness;
        } else {
            // Read and validate form inputs via dedicated helper — no inline DOM access.
            const inputs = this.readAttackInputs();
            if (!inputs) return;  // helper already announced the error
            ({ attackerId, targetId, moveType, movePower, moveName } = inputs);
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

        // Flinch Check
        if (attacker.flinched && !remoteData) {
            attacker.flinched = false;
            const flinchMsg = `${attacker.fullName} flinched and couldn't move!`;
            this.arena._notify(flinchMsg, 'action');
            this.arena.log.add(`[FLINCH] ${flinchMsg}`, 'action');
            this.arena.renderer.renderAll();

            if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
                this.arena.multiplayer.sendAction('attack', {
                    attackerId,
                    targetId,
                    moveType,
                    movePower,
                    attackType,
                    flinched: true
                });
            }
            return;
        }

        if (remoteData && remoteData.flinched) {
            attacker.flinched = false;
            const flinchMsg = `${attacker.fullName} flinched and couldn't move!`;
            this.arena._notify(flinchMsg, 'action');
            this.arena.log.add(`[FLINCH] ${flinchMsg}`, 'action');
            this.arena.renderer.renderAll();
            return;
        }

        // Sleep & Deep Sleep Check (Snore / Sleep Talk bypass)
        const nameCleanEarly = moveName ? moveName.toLowerCase().replace(/[^a-z0-9]/g, '') : '';
        const isAsleep = attacker.hasStatus('sleep') || attacker.hasStatus('deep_sleep') || attacker.hasStatus('deepsleep');
        if (isAsleep && !['snore', 'sleeptalk'].includes(nameCleanEarly)) {
            const slpMsg = `${attacker.fullName} is fast asleep and couldn't move!`;
            this.arena._notify(slpMsg, 'action');
            this.arena.log.add(`[SLEEP] ${slpMsg}`, 'action');
            this.arena.renderer.renderAll();
            return;
        }

        // Frozen Check
        const isFrozen = attacker.hasStatus('freeze') || attacker.hasStatus('frozen');
        if (isFrozen) {
            const frzMsg = `${attacker.fullName} is frozen solid and couldn't move!`;
            this.arena._notify(frzMsg, 'action');
            this.arena.log.add(`[FROZEN] ${frzMsg}`, 'action');
            this.arena.renderer.renderAll();
            return;
        }

        // Confusion Check (50% chance to hurt self for 50 dmg; 25% chance to snap out if able to move)
        if (attacker.hasStatus('confusion') && !remoteData) {
            if (Math.random() < 0.5) {
                attacker.takeDamage(50);
                this._applyHPChange(attacker, attackerPlayer.id, attacker.currentHP, 'Confusion');
                const confHitMsg = `${attacker.fullName} is confused and hurt itself in confusion for 50 damage!`;
                this.arena._notify(confHitMsg, 'damage');
                this.arena.log.add(`[CONFUSION] ${confHitMsg}`, 'damage');
                this.arena.renderer.renderAll();
                return;
            } else {
                if (Math.random() < 0.25) {
                    attacker.removeStatus('confusion');
                    const cureMsg = `${attacker.fullName} snapped out of confusion!`;
                    this.arena._notify(cureMsg, 'heal');
                    this.arena.log.add(`[CONFUSION] ${cureMsg}`, 'heal');
                }
            }
        }

        // Paralysis & Neuro Paralysis Check
        const isParalyzed = attacker.hasStatus('paralysis') || attacker.hasStatus('neuro_paralysis') || attacker.hasStatus('neuroparalysis');
        if (attacker.hasStatus('neuro_paralysis') || attacker.hasStatus('neuroparalysis')) {
            const moveObjEarly = window.MovesData && moveName ? window.MovesData[moveName] : null;
            if (moveObjEarly && moveObjEarly.priority > 0) {
                this.arena._announce(`${attacker.fullName} cannot use priority moves due to Neuro Paralysis!`, true);
                return;
            }
        }

        if (isParalyzed && !remoteData && Math.random() < 0.5) {
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
            const moveObj = window.MovesData && moveName
                ? window.MovesData[moveName]
                : null;
            const move = moveObj
                ? { ...moveObj, type: moveType, category: moveObj.category || (attackType === 'physical' ? 'Physical' : 'Special'), flags: moveObj.flags || {} }
                : { type: moveType, category: attackType === 'physical' ? 'Physical' : 'Special', flags: {} };

            const isStatusMove = move.category === 'Status' || move.category === 'status' || attackType === 'status';
            const nameClean = moveName ? moveName.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

            // ── Move Condition Warnings ──────────────────────────────────
            if (!remoteData && moveName) {
                if (nameClean === 'dreameater' && !target.hasStatus('sleep')) {
                    if (!confirm(`${moveObj?.name || moveName} requires the target to be asleep. Attack anyway?`)) return;
                }
                if ((nameClean === 'snore' || nameClean === 'sleeptalk') && !attacker.hasStatus('sleep')) {
                    if (!confirm(`${moveObj?.name || moveName} requires the attacker to be asleep. Attack anyway?`)) return;
                }
                if ((nameClean === 'solarbeam' || nameClean === 'solarblade') && 
                    !['harsh-sunlight', 'extreme-sunlight'].includes(this.weather)) {
                    if (!confirm(`${moveObj?.name || moveName} takes 2 rounds to charge without sunlight. Attack anyway?`)) return;
                }
            }

            // Protect / Shield moves setting
            if (nameClean === 'protect' || nameClean === 'detect' || nameClean === 'obstruct' || nameClean === 'spikyshield') {
                if (attacker.lastMoveUsed === nameClean) {
                    this.arena._announce(`${attacker.fullName} cannot use ${moveObj?.name || moveName} consecutively!`, true);
                    return;
                }
                attacker.protected = true;
                this.arena.log.add(`[PROTECT] ${attacker.fullName} is protecting itself!`, 'action');
            } else if (nameClean === 'endure') {
                if (attacker.lastMoveUsed === nameClean) {
                    this.arena._announce(`${attacker.fullName} cannot use ${moveObj?.name || moveName} consecutively!`, true);
                    return;
                }
                attacker.enduring = true;
                this.arena.log.add(`[PROTECT] ${attacker.fullName} braced itself to endure hits!`, 'action');
            }

            // Determine Target List (AOE Check)
            let targetList = [{ player: targetPlayer, pokemon: target }];
            const isAOE = ['aeroblast', 'discharge', 'dracometeor', 'eruption', 'hurricane', 'originpulse', 'selfdestruct', 'explosion', 'mindblown',
                            'earthquake', 'surf', 'echoedvoice', 'hypervoice', 'precipiceblades', 'roaroftime', 'spacialrend', 'relicsong',
                            'petalblizzard', 'pyroball', 'glaciate', 'breakingswipe', 'sludgewave'].includes(nameClean);

            if (isAOE) {
                targetList = [];
                const isAllPlayers = ['earthquake', 'surf', 'echoedvoice', 'hypervoice', 'precipiceblades', 'roaroftime', 'spacialrend', 'relicsong'].includes(nameClean);
                this.arena.gs.players.forEach(p => {
                    const activePoke = p.getActivePokemon();
                    if (!activePoke || activePoke.isFainted()) return;
                    if (isAllPlayers) {
                        if (activePoke.fullName !== attacker.fullName) {
                            targetList.push({ player: p, pokemon: activePoke });
                        }
                    } else {
                        if (p.id !== attackerPlayer.id) {
                            targetList.push({ player: p, pokemon: activePoke });
                        }
                    }
                });
                if (targetList.length === 0) {
                    targetList = [{ player: targetPlayer, pokemon: target }];
                }
            }

            // Determine Multi-hit Count
            let hitCount = 1;
            const isMultiHit = ['bulletseed', 'doublehit', 'doubleironbash', 'doublekick', 'dualwingbeat', 'poisonsting', 'bonemerang', 'furyattack', 'furyswipes', 'surgingstrikes'].includes(nameClean);
            const isTossDependent = ['dragondarts', 'pinmissile', 'rockblast', 'watershuriken', 'bonerush'].includes(nameClean);
            
            if (isMultiHit) {
                if (['bulletseed', 'surgingstrikes'].includes(nameClean)) hitCount = 3;
                else if (['furyattack'].includes(nameClean)) hitCount = 4;
                else if (['furyswipes'].includes(nameClean)) hitCount = 5;
                else hitCount = 2;
            } else if (isTossDependent) {
                hitCount = Math.floor(Math.random() * 4) + 2; // 2-5 hits
            }

            // Delayed move check
            const isDelayedMove = nameClean === 'futuresight' || nameClean === 'doomdesire';
            if (isDelayedMove) {
                if (!this.arena.gs.delayedEffects) this.arena.gs.delayedEffects = [];
                this.arena.gs.delayedEffects.push({
                    name: moveObj?.name || moveName,
                    targetId: targetId,
                    damage: Math.max(20, Math.floor(attacker.getEffectiveStat('specialAttack') * 1.25)),
                    roundsLeft: 2
                });
                const forecastMsg = `${attacker.fullName} foresaw a future attack on ${target.fullName}!`;
                this.arena.log.add(forecastMsg, 'action');
                this.arena._announce(forecastMsg);
                this.arena.renderer.renderAll();
                return;
            }

            let mainMsg = `${attacker.fullName} used ${moveObj?.name || moveName || 'Attack'}!`;
            this.arena.log.add(mainMsg, 'action');
            this.arena._announce(mainMsg);

            let totalDamageDealtToAny = 0;

            // Execute attack on each target
            targetList.forEach(({ player: tPlayer, pokemon: tPoke }) => {
                let currentPower = movePower;
                let tDamage = 0;
                let tEffectiveness = 1;

                if (isStatusMove) {
                    tDamage = 0;
                    tEffectiveness = 1;
                    const statusMsg = `${attacker.fullName} targeted ${tPoke.fullName} with status move!`;
                    this.arena.log.add(statusMsg, 'action');
                } else {
                    // Check Protect
                    if (tPoke.protected) {
                        tDamage = 0;
                        tEffectiveness = 0;
                        const protectMsg = `${tPoke.fullName} protected itself!`;
                        this.arena._announce(protectMsg);
                        this.arena.log.add(`[PROTECT] ${protectMsg}`, 'action');
                        
                        // Obstruct/Spiky Shield contact
                        if (tPoke.lastMoveUsed === 'obstruct') {
                            const mod = Math.floor(attacker.stats.defence * 0.20);
                            attacker.statModifiers.defence = (attacker.statModifiers.defence || 0) - mod;
                            this.arena.log.add(`[BOOST] ${attacker.fullName}'s defence fell due to Obstruct!`, 'action');
                        }
                        if (tPoke.lastMoveUsed === 'spikyshield') {
                            const spikyDmg = Math.floor(attacker.maxHp * 0.10);
                            attacker.takeDamage(spikyDmg);
                            this._applyHPChange(attacker, attackerPlayer.id, attacker.currentHP, 'Spiky Shield');
                            this.arena.log.add(`[RECOIL] ${attacker.fullName} was hurt by ${tPoke.fullName}'s Spiky Shield!`, 'damage');
                        }
                        return;
                    }

                    // Multi-strike execution loop
                    let accumDmg = 0;
                    for (let h = 0; h < hitCount; h++) {
                        if (tPoke.isFainted()) break;

                        let strikeDmg = 0;
                        if (this.abilityEngine && this.abilityEngine.isBlockedByAbility(attacker, tPoke, move)) {
                            this.abilityEngine.getDefenseMultiplier(attacker, tPoke, move);
                            strikeDmg = 0;
                            tEffectiveness = 0;
                        } else {
                            const calc = this.arena.engine.calculateDamage(
                                attacker, tPoke, currentPower, moveType, attackType,
                                this.weather, move, this.abilityEngine, this.arena.gs.terrain
                            );
                            strikeDmg = calc.damage;
                            tEffectiveness = calc.effectiveness;
                            if (nameClean === 'bonerush') {
                                currentPower += 25;
                            }
                        }

                        // Endure check
                        if (tPoke.enduring && strikeDmg >= tPoke.currentHP) {
                            strikeDmg = Math.max(0, tPoke.currentHP - 1);
                            const endureMsg = `${tPoke.fullName} endured the hit!`;
                            this.arena._announce(endureMsg);
                            this.arena.log.add(`[PROTECT] ${endureMsg}`, 'action');
                        }

                        tPoke.takeDamage(strikeDmg);
                        accumDmg += strikeDmg;

                        // Secondary effects from move
                        if (move.secondary && tEffectiveness > 0) {
                            this._applySecondaryEffect(attacker, tPoke, move.secondary);
                        }

                        if (hitCount > 1 && strikeDmg > 0) {
                            this.arena.log.add(`[MULTI-HIT] Strike ${h+1}: ${strikeDmg} damage to ${tPoke.fullName}!`, 'damage');
                        }
                    }

                    tDamage = accumDmg;
                    totalDamageDealtToAny += tDamage;

                    const dmgMsg = `${tPoke.fullName} took ${tDamage} damage!`;
                    this.arena.log.add(dmgMsg, tEffectiveness === 0 ? 'action' : 'damage');
                    this.arena._announce(dmgMsg);
                    if (tEffectiveness > 1) this.arena.log.add(`It's super effective on ${tPoke.fullName}!`, 'damage');
                    if (tEffectiveness < 1 && tEffectiveness > 0) this.arena.log.add(`It's not very effective on ${tPoke.fullName}...`, 'damage');
                }

                if (tDamage > 0) {
                    this.arena._showDamageNumber(tPlayer.id, tDamage, tEffectiveness >= 2 ? 'critical' : 'damage');
                    
                    // Thawing on Fire, Steel, or Fighting hit
                    if ((tPoke.hasStatus('freeze') || tPoke.hasStatus('frozen')) && ['Fire', 'Steel', 'Fighting'].includes(moveType)) {
                        tPoke.removeStatus('freeze');
                        tPoke.removeStatus('frozen');
                        this.arena._notify(`${tPoke.fullName} thawed out!`, 'heal');
                        this.arena.log.add(`[THAW] ${tPoke.fullName} thawed out from the ${moveType} move!`, 'heal');
                    }

                    // Wake up on damage (50% for Sleep, 30% for Deep Sleep)
                    if (tPoke.hasStatus('sleep') && Math.random() < 0.5) {
                        tPoke.removeStatus('sleep');
                        this.arena._notify(`${tPoke.fullName} woke up upon taking damage!`, 'heal');
                        this.arena.log.add(`[SLEEP] ${tPoke.fullName} woke up!`, 'heal');
                    }
                    if ((tPoke.hasStatus('deep_sleep') || tPoke.hasStatus('deepsleep')) && Math.random() < 0.3) {
                        tPoke.removeStatus('deep_sleep');
                        tPoke.removeStatus('deepsleep');
                        this.arena._notify(`${tPoke.fullName} woke up from deep sleep upon taking damage!`, 'heal');
                        this.arena.log.add(`[DEEP SLEEP] ${tPoke.fullName} woke up from deep sleep!`, 'heal');
                    }

                    // Infatuation end on damage (50% chance)
                    if (tPoke.hasStatus('infatuation') && Math.random() < 0.5) {
                        tPoke.removeStatus('infatuation');
                        this.arena._notify(`${tPoke.fullName} is no longer infatuated!`, 'heal');
                        this.arena.log.add(`[INFATUATION] ${tPoke.fullName} is no longer infatuated!`, 'heal');
                    }

                    // Drain and Recoil (Category A & B)
                    if (move.drain) {
                        const healAmt = Math.floor(tDamage * move.drain[0] / move.drain[1]);
                        if (healAmt > 0) {
                            attacker.heal(healAmt);
                            this._applyHPChange(attacker, attackerPlayer.id, attacker.currentHP, moveObj?.name || moveName);
                            this.arena.log.add(`[DRAIN] ${attacker.fullName} recovered ${healAmt} HP from draining!`, 'heal');
                        }
                    }
                    if (move.recoil) {
                        const recoilDmg = Math.floor(tDamage * move.recoil[0] / move.recoil[1]);
                        if (recoilDmg > 0) {
                            attacker.takeDamage(recoilDmg);
                            this._applyHPChange(attacker, attackerPlayer.id, attacker.currentHP, 'Recoil');
                            this.arena.log.add(`[RECOIL] ${attacker.fullName} took ${recoilDmg} recoil damage!`, 'damage');
                        }
                    }

                    // Trapping & DoT (Category K)
                    let dotName = '';
                    let dotPercent = 0.05;
                    let dotRounds = 3;
                    let trapsSwitch = false;
                    
                    if (nameClean === 'bind') { dotName = 'Bind'; trapsSwitch = true; }
                    else if (nameClean === 'firespin') { dotName = 'Fire Spin'; dotRounds = 2; trapsSwitch = true; }
                    else if (nameClean === 'infestation') { dotName = 'Infestation'; dotRounds = 5; trapsSwitch = true; }
                    else if (nameClean === 'snaptrap') { dotName = 'Snap Trap'; trapsSwitch = true; }
                    else if (nameClean === 'stoneaxe') { dotName = 'Stone Axe'; }
                    else if (nameClean === 'leechseed') { dotName = 'Leech Seed'; dotPercent = 0.10; dotRounds = 99; }
                    
                    if (dotName) {
                        tPoke.trappedEffects.push({
                            name: dotName,
                            damagePercent: dotPercent,
                            roundsLeft: dotRounds,
                            trapsSwitch: trapsSwitch
                        });
                        this.arena.log.add(`[TRAP] ${tPoke.fullName} was trapped by ${dotName}!`, 'status');
                    }

                    // Post-attack abilities
                    if (this.abilityEngine) {
                        this.abilityEngine.onAttackUsed(attacker, tPoke, move, tDamage);
                        this.abilityEngine.onHitDefender(attacker, tPoke, move, tDamage);
                    }
                }

                // If status move direct status
                if (isStatusMove && move.status && tEffectiveness > 0) {
                    const sName = move.status === 'brn' ? 'burn' :
                                  move.status === 'par' ? 'paralysis' :
                                  move.status === 'psn' ? 'poison' :
                                  move.status === 'frz' ? 'freeze' :
                                  move.status === 'slp' ? 'sleep' : move.status;
                    if (tPoke.applyStatus(sName)) {
                        this.arena.log.add(`[EFFECT] ${tPoke.fullName} got ${sName}!`, 'status');
                    }
                }

                // If status move direct boosts
                if (isStatusMove && move.boosts && tEffectiveness > 0) {
                    Object.entries(move.boosts).forEach(([stat, stages]) => {
                        const statMap = { atk: 'attack', def: 'defence', spa: 'specialAttack', spd: 'specialDefence', spe: 'speed' };
                        const statName = statMap[stat] || stat;
                        const pct = stages * 0.10;
                        const mod = Math.floor(tPoke.stats[statName] * Math.abs(pct));
                        tPoke.statModifiers[statName] = (tPoke.statModifiers[statName] || 0) + (stages < 0 ? -mod : mod);
                        this.arena.log.add(`[BOOST] ${tPoke.fullName}'s ${statName} ${stages < 0 ? 'fell' : 'rose'}!`, 'action');
                    });
                }

                // Extremely Harsh Sunlight severe burn
                if (this.wCfg.fireSevereBurn && moveType === 'Fire' && tDamage > 0) {
                    tPoke.applyStatus('severe_burn');
                    this._notify(`${tPoke.fullName} was severely burned by the extreme sunlight!`, 'action');
                }
            });

            // Self-sacrifice, Destiny Bond, Healing (Category D, F)
            if (nameClean === 'destinybond') {
                attacker.destinyBondTarget = targetId;
                this.arena.log.add(`[DESTINY BOND] ${attacker.fullName} is trying to take its opponent down with it!`, 'action');
            } else if (nameClean === 'explosion' || nameClean === 'selfdestruct') {
                attacker.currentHP = 0;
                this.arena.log.add(`[SACRIFICE] ${attacker.fullName} exploded!`, 'damage');
            } else if (nameClean === 'finalgambit') {
                attacker.currentHP = 0;
                this.arena.log.add(`[SACRIFICE] ${attacker.fullName} sacrificed itself for Final Gambit!`, 'damage');
            } else if (nameClean === 'memento') {
                attacker.currentHP = 0;
                Object.entries({ atk: -3, spa: -3 }).forEach(([stat, stages]) => {
                    const statMap = { atk: 'attack', spa: 'specialAttack' };
                    const statName = statMap[stat];
                    const pct = stages * 0.10;
                    const mod = Math.floor(target.stats[statName] * Math.abs(pct));
                    target.statModifiers[statName] = (target.statModifiers[statName] || 0) + (stages < 0 ? -mod : mod);
                    this.arena.log.add(`[BOOST] ${target.fullName}'s ${statName} fell sharply!`, 'action');
                });
            } else if (nameClean === 'healingwish') {
                attacker.currentHP = 0;
                attackerPlayer.team.forEach(p => {
                    if (p && !p.isFainted()) {
                        p.currentHP = p.maxHp;
                        p.clearStatuses();
                    }
                });
                this.arena.log.add(`[SACRIFICE] ${attacker.fullName} sacrificed itself to heal its team!`, 'heal');
            } else if (nameClean === 'lunardance') {
                attacker.currentHP = 0;
                let revivedCount = 0;
                attackerPlayer.team.forEach(p => {
                    if (p && p.isFainted() && revivedCount < 2) {
                        p.currentHP = p.maxHp;
                        p.clearStatuses();
                        revivedCount++;
                    }
                });
                this.arena.log.add(`[SACRIFICE] ${attacker.fullName} sacrificed itself to revive teammates!`, 'heal');
            } else if (nameClean === 'mindblown') {
                const selfDmg = Math.floor(attacker.maxHp * 0.50);
                attacker.takeDamage(selfDmg);
                this._applyHPChange(attacker, attackerPlayer.id, attacker.currentHP, 'Mind Blown sacrifice');
                this.arena.log.add(`[SACRIFICE] ${attacker.fullName} lost 50% HP using Mind Blown!`, 'damage');
            } else if (nameClean === 'partingshot') {
                attacker.currentHP = 0;
                Object.entries({ atk: -2, spa: -2 }).forEach(([stat, stages]) => {
                    const statMap = { atk: 'attack', spa: 'specialAttack' };
                    const statName = statMap[stat];
                    const pct = stages * 0.10;
                    const mod = Math.floor(target.stats[statName] * Math.abs(pct));
                    target.statModifiers[statName] = (target.statModifiers[statName] || 0) + (stages < 0 ? -mod : mod);
                });
                this.arena.log.add(`[SACRIFICE] ${attacker.fullName} used Parting Shot!`, 'action');
            }

            // Healing moves (Category F)
            let healPercent = 0;
            if (nameClean === 'recover' || nameClean === 'roost' || nameClean === 'lunarblessing') healPercent = 0.40;
            else if (nameClean === 'moonlight' || nameClean === 'synthesis' || nameClean === 'morningsun') {
                healPercent = ['harsh-sunlight', 'extreme-sunlight'].includes(this.weather) ? 0.66 : 0.40;
            } else if (nameClean === 'lifedew') healPercent = 0.25;
            else if (nameClean === 'rest') healPercent = 1.0;
            else if (nameClean === 'wish') {
                if (!this.arena.gs.delayedEffects) this.arena.gs.delayedEffects = [];
                this.arena.gs.delayedEffects.push({
                    name: 'Wish Healing',
                    targetId: attackerPlayer.id,
                    isHeal: true,
                    roundsLeft: 2
                });
                this.arena.log.add(`[HEAL] ${attacker.fullName} made a wish!`, 'action');
            } else if (nameClean === 'aquartering' && this.weather === 'rain') {
                healPercent = 0.30;
            }

            if (healPercent > 0) {
                if (nameClean === 'recover' || nameClean === 'roost' || nameClean === 'rest' || nameClean === 'lunarblessing') {
                    if (attacker.lastMoveUsed === nameClean) {
                        this.arena._announce(`${attacker.fullName} cannot use ${moveObj?.name || moveName} consecutively!`, true);
                        return;
                    }
                }
                const healed = Math.floor(attacker.maxHp * healPercent);
                attacker.heal(healed);
                this._applyHPChange(attacker, attackerPlayer.id, attacker.currentHP, 'Healing Move');
                this.arena.log.add(`[HEAL] ${attacker.fullName} recovered ${healed} HP!`, 'heal');
                if (nameClean === 'rest') {
                    attacker.applyStatus('sleep');
                }
            }

            // Terrain Setting (Category J) — all 17 terrain types
            const TERRAIN_MOVE_MAP = {
                'electricterrain': 'electric',
                'grassyterrain': 'grassy',
                'psychicterrain': 'psychic',
                'mistyterrain': 'fairy',
                'fireterrain': 'fire',
                'waterterrain': 'water',
                'iceterrain': 'ice',
                'fightingterrain': 'fighting',
                'poisonterrain': 'poison',
                'groundterrain': 'ground',
                'flyingterrain': 'flying',
                'bugterrain': 'bug',
                'rockterrain': 'rock',
                'ghostterrain': 'ghost',
                'dragonterrain': 'dragon',
                'darkterrain': 'dark',
                'steelterrain': 'steel',
                'fairyterrain': 'fairy',
            };
            const terrainKey = TERRAIN_MOVE_MAP[nameClean];
            if (terrainKey) {
                const tCfg = TERRAIN_CONFIG[terrainKey];
                this.arena.gs.terrain = { type: terrainKey, roundsLeft: 5 };
                const label = tCfg?.label || terrainKey;
                this.arena.log.add(`[TERRAIN] ${label} is now active!`, 'action');
                this.arena._announce(`${label} covers the battlefield!`);
            }

            // Attacker self stat changes (Category E)
            const selfBoosts = move.self?.boosts || (nameClean === 'closecombat' || nameClean === 'dragonascent' ? { def: -1, spd: -1 } :
                               nameClean === 'vcreate' ? { def: -1, spd: -1, spe: -1 } :
                               nameClean === 'dracometeor' ? { spa: -2 } :
                               nameClean === 'overheat' || nameClean === 'psychoboost' || nameClean === 'fleurcannon' ? { spa: -1 } :
                               nameClean === 'flamecharge' ? { spe: 1 } :
                               nameClean === 'poweruppunch' ? { atk: 1 } :
                               nameClean === 'spinout' ? { spe: -1 } :
                               nameClean === 'shiftgear' ? { atk: 1, spe: 1 } : null);
            if (selfBoosts) {
                Object.entries(selfBoosts).forEach(([stat, stages]) => {
                    const statMap = { atk: 'attack', def: 'defence', spa: 'specialAttack', spd: 'specialDefence', spe: 'speed' };
                    const statName = statMap[stat] || stat;
                    const pct = stages * 0.10;
                    const mod = Math.floor(attacker.stats[statName] * Math.abs(pct));
                    attacker.statModifiers[statName] = (attacker.statModifiers[statName] || 0) + (stages < 0 ? -mod : mod);
                    this.arena.log.add(`[SELF] ${attacker.fullName}'s ${statName} ${stages < 0 ? 'fell' : 'rose'}!`, 'action');
                });
            }

            attacker.lastMoveUsed = nameClean;

            this.arena.renderer.renderAll();

            const onDone = () => {
                let anyFainted = false;

                targetList.forEach(({ player: tPlayer, pokemon: tPoke }) => {
                    if (tPoke.isFainted()) {
                        anyFainted = true;
                        this.arena.audio.playCry(tPoke);
                        this.arena._announce(`${tPoke.fullName} fainted!`);
                        
                        // Destiny bond check
                        if (tPoke.destinyBondTarget) {
                            const dbTargetPlayer = this.arena.gs.players.find(p => p.id === tPoke.destinyBondTarget);
                            const dbTarget = dbTargetPlayer?.getActivePokemon();
                            if (dbTarget && !dbTarget.isFainted()) {
                                dbTarget.currentHP = 0;
                                this._applyHPChange(dbTarget, dbTargetPlayer.id, 0, 'Destiny Bond');
                                this.arena.log.add(`[DESTINY BOND] ${dbTarget.fullName} fainted due to Destiny Bond!`, 'damage');
                            }
                            tPoke.destinyBondTarget = null;
                        }

                        // Crowning ability: change form on KO
                        if (this.abilityEngine) {
                            const ka = (attacker.ability || '').toLowerCase().replace(/[\s\-]/g, '');
                            if (ka === 'crowning') {
                                this.abilityEngine._notify(`${attacker.fullName}'s Crowning triggered!`, 'action');
                            }
                        }
                        this.arena._animateSprite(tPlayer.id, 'faint', () => this.arena.renderer.renderAll());
                    }
                });

                if (attacker.isFainted()) {
                    this.arena.audio.playCry(attacker);
                    this.arena._announce(`${attacker.fullName} fainted!`);
                    
                    if (attacker.destinyBondTarget) {
                        const dbTargetPlayer = this.arena.gs.players.find(p => p.id === attacker.destinyBondTarget);
                        const dbTarget = dbTargetPlayer?.getActivePokemon();
                        if (dbTarget && !dbTarget.isFainted()) {
                            dbTarget.currentHP = 0;
                            this._applyHPChange(dbTarget, dbTargetPlayer.id, 0, 'Destiny Bond');
                            this.arena.log.add(`[DESTINY BOND] ${dbTarget.fullName} fainted due to Destiny Bond!`, 'damage');
                        }
                        attacker.destinyBondTarget = null;
                    }
                    this.arena._animateSprite(attackerPlayer.id, 'faint', () => this.arena.renderer.renderAll());
                }

                if (!anyFainted) {
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
                    damage: totalDamageDealtToAny,
                    effectiveness: 1
                });
            }

            totalDamageDealtToAny > 0
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

        // Reset round ability use trackers, flinch, protected, enduring for all players' pokemon
        this.arena.gs.players.forEach(p => {
            p.team.forEach(poke => {
                if (poke) {
                    poke.abilityUsesThisRound = 0;
                    poke.hiddenAbilityUsesThisRound = 0;
                    poke.flinched = false;
                    poke.protected = false;
                    poke.enduring = false;
                }
            });
        });

        // Terrain duration reduction
        if (this.arena.gs.terrain) {
            // Normalize legacy bare-string format
            if (typeof this.arena.gs.terrain === 'string') {
                this.arena.gs.terrain = { type: this.arena.gs.terrain, roundsLeft: 5 };
            }
            this.arena.gs.terrain.roundsLeft--;
            if (this.arena.gs.terrain.roundsLeft <= 0) {
                const tCfg = TERRAIN_CONFIG[this.arena.gs.terrain.type];
                const label = tCfg?.label || this.arena.gs.terrain.type;
                this.arena.log.add(`[TERRAIN] ${label} wore off.`, 'action');
                this.arena._announce(`${label} faded from the battlefield.`);
                this.arena.gs.terrain = null;
            }
        }

        this._applyWeatherDamage();
        this._applyStatusDamage();
        this._applyDelayedEffects();
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

    _applyDelayedEffects() {
        if (!this.arena.gs.delayedEffects) this.arena.gs.delayedEffects = [];
        const remaining = [];
        this.arena.gs.delayedEffects.forEach(effect => {
            effect.roundsLeft--;
            if (effect.roundsLeft <= 0) {
                if (effect.isHeal) {
                    const targetPlayer = this.arena.gs.players.find(p => p.id === effect.targetId || p.id === parseInt(effect.targetId));
                    const target = targetPlayer?.getActivePokemon();
                    if (target && !target.isFainted()) {
                        const healed = Math.floor(target.maxHp * 0.50);
                        target.heal(healed);
                        this._applyHPChange(target, targetPlayer.id, target.currentHP, effect.name);
                        this.arena.log.add(`[HEAL] ${effect.name} healed ${target.fullName} for ${healed} HP!`, 'heal');
                    }
                } else {
                    const targetPlayer = this.arena.gs.players.find(p => p.id === effect.targetId || p.id === parseInt(effect.targetId));
                    const target = targetPlayer?.getActivePokemon();
                    if (target && !target.isFainted()) {
                        target.takeDamage(effect.damage);
                        this._applyHPChange(target, targetPlayer.id, target.currentHP, effect.name);
                        this.arena.log.add(`[EFFECT] ${effect.name} struck ${target.fullName} for ${effect.damage} damage!`, 'damage');
                    }
                }
            } else {
                remaining.push(effect);
            }
        });
        this.arena.gs.delayedEffects = remaining;
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

            // Trapping DoT & Leech Seed
            if (pokemon.trappedEffects && pokemon.trappedEffects.length > 0) {
                pokemon.trappedEffects.forEach(effect => {
                    if (effect.roundsLeft > 0) {
                        const trapDmg = Math.max(1, Math.floor(pokemon.maxHp * effect.damagePercent));
                        totalDmg += trapDmg;
                        effect.roundsLeft--;
                        
                        if (effect.name === 'Leech Seed') {
                            const otherPlayer = this.arena.gs.players.find(p => p.id !== player.id);
                            const otherPoke = otherPlayer?.getActivePokemon();
                            if (otherPoke && !otherPoke.isFainted()) {
                                otherPoke.heal(trapDmg);
                                this._applyHPChange(otherPoke, otherPlayer.id, otherPoke.currentHP, 'Leech Seed');
                                this.arena.log.add(`[DRAIN] Leech Seed transferred ${trapDmg} HP to ${otherPoke.fullName}!`, 'heal');
                            }
                        }
                        this.arena.log.add(`[TRAP] ${pokemon.fullName} took ${trapDmg} damage from ${effect.name}!`, 'damage');
                    }
                });
                pokemon.trappedEffects = pokemon.trappedEffects.filter(e => e.roundsLeft > 0);
            }

            if (totalDmg > 0) {
                pokemon.takeDamage(totalDmg);
                this._applyHPChange(pokemon, player.id, pokemon.currentHP, 'status conditions');
                affected.push(pokemon.fullName);
            }

            curedStatus.forEach(s => pokemon.removeStatus(s));
            if (curedStatus.length > 0) cured.push(pokemon.fullName);
        });

        if (affected.length > 0) {
            this.arena._notify(`${affected.join(', ')} took damage from status conditions!`, 'damage');
        }
        if (cured.length > 0) {
            this.arena._notify(`${cured.join(', ')} recovered from status conditions!`, 'heal');
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
                const msgText = `${target.fullName} was ${statusName}ed by the move!`;
                this._notify(msgText, 'action');
                this.arena.log.add(`[Secondary Effect] ${msgText}`, 'status');
            }
        }

        if (boosts) {
            Object.entries(boosts).forEach(([stat, stages]) => {
                const statMap = { atk: 'attack', def: 'defence', spa: 'specialAttack', spd: 'specialDefence', spe: 'speed' };
                const statName = statMap[stat] || stat;
                const pct = stages * 0.10;
                const mod = Math.floor(target.stats[statName] * Math.abs(pct));
                target.statModifiers[statName] = (target.statModifiers[statName] || 0) + (stages < 0 ? -mod : mod);
                const msgText = `${target.fullName}'s ${statName} ${stages < 0 ? 'fell' : 'rose'}!`;
                this._notify(msgText, 'action');
                this.arena.log.add(`[Secondary Effect] [BOOST] ${msgText}`, 'action');
            });
        }

        if (volatileStatus === 'confusion') {
            target.applyStatus('confusion');
            const msgText = `${target.fullName} became confused!`;
            this._notify(msgText, 'action');
            this.arena.log.add(`[Secondary Effect] ${msgText}`, 'status');
        }

        if (volatileStatus === 'flinch') {
            target.flinched = true;
            const msgText = `${target.fullName} flinched!`;
            this._notify(msgText, 'action');
            this.arena.log.add(`[Secondary Effect] [FLINCH] ${msgText}`, 'status');
        }
    }

    _switchActivePokemon(playerId, slotId, fromModal = false, remote = false) {
        const player = this.arena.gs.players.find(p => p.id === playerId);
        const oldPokemon = player?.getActivePokemon();
        if (oldPokemon && oldPokemon.trappedEffects && oldPokemon.trappedEffects.some(e => e.trapsSwitch && e.roundsLeft > 0)) {
            this.arena._announce(`${oldPokemon.fullName} is trapped and cannot switch!`, true);
            return;
        }

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
