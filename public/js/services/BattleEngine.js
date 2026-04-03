// ==========================================
// BATTLE ENGINE (Pure Math)
// ==========================================

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
     * Uses the stat difference formula, clamped to [1, Infinity].
     */
    calculateDamage(attacker, defender, movePower, moveType, attackType) {
        const effectiveness = this.getTypeEffectiveness(moveType, defender.types);

        // Immune types always deal 0 damage.
        if (effectiveness === 0) return { damage: 0, effectiveness: 0 };

        const offStat = attackType === 'physical'
            ? attacker.getEffectiveStat('attack')
            : attacker.getEffectiveStat('specialAttack');
        const defStat = attackType === 'physical'
            ? defender.getEffectiveStat('defence')
            : defender.getEffectiveStat('specialDefence');

        // Authentic Generation 5 formula (Level 100 baseline)
        const level = 100;
        const a = offStat;
        const d = defStat;

        const baseDamage = Math.floor(Math.floor(Math.floor(2 * level / 5 + 2) * movePower * a / d) / 50) + 2;
        // RNG variance (0.85 to 1.00)
        const rng = (Math.floor(Math.random() * 16) + 85) / 100;

        // Final combat damage
        const damage = Math.max(1, Math.floor(baseDamage * effectiveness * rng));

        return { damage, effectiveness };
    }
}
