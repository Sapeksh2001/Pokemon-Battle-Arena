// ==========================================
// BATTLE COMMAND VALIDATOR (Multiplayer Security & Rule Authority)
// // ponytail: pure function validation, direct rules without abstraction bloat
// ==========================================

export class BattleCommandValidator {
    /**
     * Validate an incoming multiplayer action before dispatching to the game engine.
     *
     * @param {string} action - Action name ('attack', 'hp_change', 'switch_pokemon', etc.)
     * @param {Object} payload - Command payload
     * @param {Object} [actionMetadata={}] - Network envelope metadata { sender, senderUid, actionId, isHost }
     * @param {Object} [gameState={}] - Current Arena GameState { players, activeTurnPlayerId }
     * @param {Object} [roomContext={}] - Room context { hostId, playerId }
     * @returns {{ valid: boolean, reason?: string }}
     */
    static validateCommand(action, payload = {}, actionMetadata = {}, gameState = {}, roomContext = {}) {
        if (!action || typeof action !== 'string') {
            return { valid: false, reason: 'Invalid or missing action type' };
        }

        const senderId = actionMetadata.sender || payload.sender || payload.senderId;
        if (!senderId) {
            if (!gameState.players || gameState.players.length === 0) {
                return { valid: true };
            }
            return { valid: false, reason: 'Missing sender ID in command envelope' };
        }

        // ponytail: derive host status ONLY from trusted server-side roomContext — never from client metadata
        const isHost = !!(roomContext.hostId && String(roomContext.hostId) === String(senderId));

        // P2: Reject stale / out-of-order commands via monotonic battleSequence
        if (roomContext.expectedSequence != null && payload.battleSequence != null) {
            if (payload.battleSequence < roomContext.expectedSequence) {
                return { valid: false, reason: `Stale command: sequence ${payload.battleSequence} < expected ${roomContext.expectedSequence}` };
            }
        }

        const players = gameState.players || [];

        switch (action) {
            case 'attack': {
                const { attackerId, targetId, movePower } = payload;
                if (!attackerId || !targetId) {
                    if (players.length === 0) return { valid: true };
                    return { valid: false, reason: 'Attack command requires attackerId and targetId' };
                }

                // 1. Sender Ownership Check: sender must own the attacking entity (unless host proxy)
                if (!isHost && String(attackerId) !== String(senderId)) {
                    return { valid: false, reason: `Sender ${senderId} does not own attacking player ${attackerId}` };
                }

                // 2. Self-targeting check for attacks (standard offensive moves cannot target own team)
                if (String(attackerId) === String(targetId)) {
                    return { valid: false, reason: 'Attacking Pokémon cannot target itself or own player in standard attack' };
                }

                // 3. Attacker & Target Presence
                const attackerPlayer = players.find(p => String(p.id) === String(attackerId));
                const targetPlayer = players.find(p => String(p.id) === String(targetId));

                if (!attackerPlayer) {
                    return { valid: false, reason: `Attacker player ${attackerId} not found in battle` };
                }
                if (!targetPlayer) {
                    return { valid: false, reason: `Target player ${targetId} not found in battle` };
                }

                // 4. Fainted Checks
                const attackerPoke = typeof attackerPlayer.getActivePokemon === 'function'
                    ? attackerPlayer.getActivePokemon()
                    : (attackerPlayer.activePokemon || attackerPlayer.team?.[0]);

                const targetPoke = typeof targetPlayer.getActivePokemon === 'function'
                    ? targetPlayer.getActivePokemon()
                    : (targetPlayer.activePokemon || targetPlayer.team?.[0]);

                if (!attackerPoke || (typeof attackerPoke.isFainted === 'function' && attackerPoke.isFainted()) || attackerPoke.currentHP <= 0) {
                    return { valid: false, reason: 'Attacking Pokémon is fainted and cannot attack' };
                }
                if (!targetPoke || (typeof targetPoke.isFainted === 'function' && targetPoke.isFainted()) || targetPoke.currentHP <= 0) {
                    return { valid: false, reason: 'Target Pokémon is already fainted' };
                }

                // 5. Move Power Bounds Check (preventing arbitrary 99999 raw values)
                if (movePower !== undefined && movePower !== null) {
                    const numPower = Number(movePower);
                    if (isNaN(numPower) || numPower < 0 || numPower > 300) {
                        return { valid: false, reason: `Move power ${movePower} is out of legal bounds (0-300)` };
                    }
                }

                // 6. Turn Order Check (if active turn is enforced)
                if (gameState.activeTurnPlayerId && !isHost) {
                    if (String(gameState.activeTurnPlayerId) !== String(senderId)) {
                        return { valid: false, reason: `Out-of-turn attack: active player is ${gameState.activeTurnPlayerId}, but sender is ${senderId}` };
                    }
                }

                return { valid: true };
            }

            case 'hp_change': {
                // Non-host players CANNOT mutate another player's Pokémon HP directly over the wire
                if (!isHost && String(payload.playerId) !== String(senderId)) {
                    return { valid: false, reason: `Non-host sender ${senderId} cannot directly modify opponent ${payload.playerId} HP` };
                }
                if (payload.newHP !== undefined && payload.newHP !== null) {
                    const hp = Number(payload.newHP);
                    if (isNaN(hp) || hp < 0 || hp > 1000) {
                        return { valid: false, reason: `newHP value ${payload.newHP} is out of legal bounds (0-1000)` };
                    }
                }
                return { valid: true };
            }

            case 'stat_update': {
                if (!isHost && String(payload.playerId) !== String(senderId)) {
                    return { valid: false, reason: `Non-host sender ${senderId} cannot directly modify opponent ${payload.playerId} stats` };
                }
                return { valid: true };
            }

            case 'status_toggle': {
                if (!isHost && String(payload.playerId) !== String(senderId)) {
                    return { valid: false, reason: `Non-host sender ${senderId} cannot directly toggle opponent ${payload.playerId} status` };
                }
                return { valid: true };
            }

            case 'switch_pokemon': {
                if (!isHost && String(payload.playerId) !== String(senderId)) {
                    return { valid: false, reason: `Sender ${senderId} cannot switch opponent ${payload.playerId} Pokémon` };
                }
                if (typeof payload.slotId === 'number' && (payload.slotId < 0 || payload.slotId > 5)) {
                    return { valid: false, reason: `Invalid slot index: ${payload.slotId}` };
                }
                return { valid: true };
            }

            case 'evolve':
            case 'devolve':
            case 'form_change': {
                if (!isHost && String(payload.playerId) !== String(senderId)) {
                    return { valid: false, reason: `Sender ${senderId} cannot alter form/evolution of opponent ${payload.playerId} Pokémon` };
                }
                return { valid: true };
            }

            case 'trade_pokemon': {
                if (!isHost && String(payload.playerId) !== String(senderId)) {
                    return { valid: false, reason: `Sender ${senderId} cannot trade opponent ${payload.playerId} Pokémon` };
                }
                return { valid: true };
            }

            case 'cycle_weather': {
                if (!isHost) {
                    return { valid: false, reason: `Sender ${senderId} is not host; only host can cycle global weather manually` };
                }
                return { valid: true };
            }

            case 'end_round': {
                if (gameState.activeTurnPlayerId && !isHost) {
                    if (String(gameState.activeTurnPlayerId) !== String(senderId)) {
                        return { valid: false, reason: `Sender ${senderId} cannot end round out of turn` };
                    }
                }
                return { valid: true };
            }

            case 'log_add':
                return { valid: true };

            case 'player_add':
            case 'player_remove': {
                if (!isHost) {
                    return { valid: false, reason: `Only the host can ${action}` };
                }
                return { valid: true };
            }

            default:
                // Unknown actions are rejected defensively
                return { valid: false, reason: `Unrecognized action type: ${action}` };
        }
    }
}
