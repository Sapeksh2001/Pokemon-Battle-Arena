// ==========================================
// POKÉMON BATTLE ARENA — SHARED HELPERS
// ==========================================

/**
 * Shared arithmetic for stat and HP modifications.
 * @param {number} current - Current value
 * @param {number} base    - Base stat value
 * @param {string} modType - 'set' | '+' | '-' | '+%' | '-%'
 * @param {number} value
 * @param {number} [max=Infinity]
 * @param {number} [min=-Infinity]
 */
export function applyModification(current, base, modType, value, max = Infinity, min = -Infinity) {
    const map = {
        'set': value,
        '+': current + value,
        '-': current - value,
        '+%': current + Math.floor(base * value / 100),
        '-%': current - Math.floor(base * value / 100),
    };
    const result = map[modType] ?? current;
    return Math.max(min, Math.min(max, result));
}

/** Sanitize strings before injecting into DOM. */
export function escapeHTML(str) {
    if (!str) return '';
    return str.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Strip regional form prefixes so they collapse to their base tier.
 * e.g. "Galarian Basic" → "Basic", "Hisuian Final" → "Final"
 */
export function normalizeTier(tier) {
    if (!tier) return '';
    const regionalNames = /^(Alolan|Galarian|Hisuian|Paldean|Paladian|Alola|Galar|Hisui|Paldea)$/i;
    if (regionalNames.test(tier.trim())) return '';
    
    return tier
        .replace(/^(Alolan|Galarian|Hisuian|Paldean|Paladian|Alola|Galar|Hisui|Paldea)\s+/i, '')
        .trim();
}
