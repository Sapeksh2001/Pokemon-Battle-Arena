/**
 * BattleRng
 * Deterministic Pseudo-Random Number Generator using the Mulberry32 algorithm.
 * Enables reproducible battle calculations, replay verification, and multiplayer
 * desync prevention.
 */
export class BattleRng {
    /**
     * @param {number|string} [seed] - Optional numeric or string seed.
     */
    constructor(seed = null) {
        this.initialSeed = seed !== null ? this._normalizeSeed(seed) : Math.floor(Math.random() * 0xFFFFFFFF);
        this.state = this.initialSeed;
    }

    _normalizeSeed(seed) {
        if (typeof seed === 'number') {
            return (seed >>> 0) || 1;
        }
        // String hashing (djb2)
        const str = String(seed);
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return (hash >>> 0) || 1;
    }

    /**
     * Reset PRNG back to initial seed.
     */
    reset() {
        this.state = this.initialSeed;
    }

    /**
     * Returns a pseudo-random float in [0, 1).
     * Mulberry32 algorithm.
     * @returns {number}
     */
    next() {
        let t = (this.state += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    /**
     * Returns a pseudo-random integer between min and max (inclusive).
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    nextInt(min, max) {
        if (min > max) [min, max] = [max, min];
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    /**
     * Evaluates a percentage chance (0 to 100).
     * e.g., chance(30) returns true approximately 30% of the time.
     * @param {number} percent
     * @returns {boolean}
     */
    chance(percent) {
        return (this.next() * 100) < percent;
    }

    /**
     * Randomly picks one element from an array.
     * @template T
     * @param {T[]} array
     * @returns {T|null}
     */
    pick(array) {
        if (!Array.isArray(array) || array.length === 0) return null;
        const index = Math.floor(this.next() * array.length);
        return array[index];
    }

    /**
     * Returns a deterministically shuffled shallow copy of the array.
     * @template T
     * @param {T[]} array
     * @returns {T[]}
     */
    shuffle(array) {
        if (!Array.isArray(array)) return [];
        const copy = [...array];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(this.next() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }
}
