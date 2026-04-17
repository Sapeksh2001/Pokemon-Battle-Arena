export class BattleManager {
    constructor(arena) {
        this.arena = arena;
    }

    handleAttack(attackType: string) {
        this.arena.audio.play('attack');
        const attackerSel = document.getElementById('attacker-select') as HTMLSelectElement | null;
        const targetSel = document.getElementById('attack-target-select') as HTMLSelectElement | null;
        const typeSel = document.getElementById('move-type-select') as HTMLSelectElement | null;
        const powerInput = document.getElementById('move-power-input') as HTMLInputElement | null;

        const attackerId = attackerSel?.dataset?.value || attackerSel?.value;
        const targetId = targetSel?.dataset?.value || targetSel?.value;
        const moveType = typeSel?.value;
        let movePower = parseInt(powerInput?.value || '0');

        if (movePower > 1000) { movePower = 1000; if (powerInput) powerInput.value = '1000'; }
        if (movePower < 1) { movePower = 0; }

        if (!attackerId || !targetId || !moveType || isNaN(movePower)) {
            this.arena._announce('Attacker, Target, Move Type, and Power are required!', true);
            this.arena.audio.play('error');
            return;
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

        if (attacker.hasStatus('paralysis') && Math.random() < 0.5) {
            this.arena._notify(`${attacker.fullName} is paralyzed and couldn't move!`, 'damage');
            this.arena.audio.playCry(attacker);
            return;
        }

        this.arena.history.snapshot(this.arena.gs);
        this.arena.audio.playCry(attacker);

        const { damage, effectiveness } = this.arena.engine.calculateDamage(
            attacker, target, movePower, moveType, attackType
        );

        // Build the announcement message.
        let msg = `${attacker.fullName} used a ${attackType} ${moveType} attack on ${target.fullName} for ${damage} damage!`;
        if (effectiveness > 1) msg += " It's super effective!";
        if (effectiveness < 1 && effectiveness > 0) msg += " It's not very effective...";
        if (effectiveness === 0) msg = `${target.fullName} is immune!`;

        this.arena.log.add(msg, effectiveness === 0 ? 'action' : 'damage');
        this.arena._announce(msg);

        if (damage > 0) {
            this.arena._showDamageNumber(targetId, damage, effectiveness >= 2 ? 'critical' : 'damage');
        }

        const newHP = target.currentHP - damage;
        target.currentHP = Math.max(0, newHP);

        // Immediate visual sync for health bars/gauges
        this.arena.renderer.renderAll();
        if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
            this.arena.multiplayer.sendGameState();
        }

        const onDone = () => {
            if (target.isFainted()) {
                this.arena.audio.playCry(target);
                this.arena._announce(`${target.fullName} fainted!`);
                this.arena._animateSprite(targetId, 'faint', () => this.arena.renderer.renderAll());
            } else {
                // Secondary render catch-all
                this.arena.renderer.renderAll();
            }
        };

        damage > 0
            ? this.arena._animateSprite(targetId, 'damage', onDone)
            : onDone();
    }

    _applyHPChange(pokemon, playerId, newHP, source = '') {
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
    }
}
