// ==========================================
// TERRAIN RULES — Type-Based Def/SpD Modifiers
// ==========================================
//
// Each terrain applies defensive modifiers to Pokémon based on their type(s):
//   4x Weakness  (-20% Def/SpD): both types in weakness2x
//   2x Weakness  (-10% Def/SpD): one type in weakness2x, other neutral
//   0.5x Resist  (+10% Def/SpD): one type in resistance05x, other neutral
//   0.25x Resist (+20% Def/SpD): both types in resistance05x
//   0x Immunity  (+10% Def/SpD): any type in immune (takes priority)
//   Cancelling   (  0% Def/SpD): one weak + one resistant = neutral
//
// movePowerBoost: 1.2x for the terrain's matching move type (stackable).

export const TERRAIN_CONFIG = {
    none: {
        label: 'Normal',
        weakness2x: [],
        resistance05x: [],
        immune: [],
        movePowerBoost: {},
    },

    fire: {
        label: 'Fire Terrain',
        weakness2x: ['Bug', 'Grass', 'Ice', 'Steel'],
        resistance05x: ['Dragon', 'Fire', 'Rock', 'Water'],
        immune: [],
        movePowerBoost: { Fire: 1.2 },
    },

    water: {
        label: 'Water Terrain',
        weakness2x: ['Fire', 'Ground', 'Rock'],
        resistance05x: ['Dragon', 'Grass', 'Water'],
        immune: [],
        movePowerBoost: { Water: 1.2 },
    },

    electric: {
        label: 'Electric Terrain',
        weakness2x: ['Flying', 'Water'],
        resistance05x: ['Dragon', 'Electric', 'Grass'],
        immune: ['Ground'],
        movePowerBoost: { Electric: 1.5 },  // canonical: 1.5x (existing behaviour preserved)
    },

    grassy: {
        label: 'Grassy Terrain',
        weakness2x: ['Ground', 'Rock', 'Water'],
        resistance05x: ['Bug', 'Dragon', 'Fire', 'Flying', 'Grass', 'Poison', 'Steel'],
        immune: [],
        movePowerBoost: { Grass: 1.5 },  // canonical: 1.5x (existing behaviour preserved)
    },

    ice: {
        label: 'Ice Terrain',
        weakness2x: ['Dragon', 'Flying', 'Grass', 'Ground'],
        resistance05x: ['Fire', 'Ice', 'Steel', 'Water'],
        immune: [],
        movePowerBoost: { Ice: 1.2 },
    },

    fighting: {
        label: 'Fighting Terrain',
        weakness2x: ['Dark', 'Ice', 'Normal', 'Rock', 'Steel'],
        resistance05x: ['Bug', 'Fairy', 'Flying', 'Poison', 'Psychic'],
        immune: ['Ghost'],
        movePowerBoost: { Fighting: 1.2 },
    },

    poison: {
        label: 'Poison Terrain',
        weakness2x: ['Fairy', 'Grass'],
        resistance05x: ['Ghost', 'Ground', 'Poison', 'Rock'],
        immune: ['Steel'],
        movePowerBoost: { Poison: 1.2 },
    },

    ground: {
        label: 'Ground Terrain',
        weakness2x: ['Electric', 'Fire', 'Poison', 'Rock', 'Steel'],
        resistance05x: ['Bug', 'Grass'],
        immune: ['Flying'],
        movePowerBoost: { Ground: 1.2 },
    },

    flying: {
        label: 'Flying Terrain',
        weakness2x: ['Bug', 'Fighting', 'Grass'],
        resistance05x: ['Electric', 'Rock', 'Steel'],
        immune: [],
        movePowerBoost: { Flying: 1.2 },
    },

    psychic: {
        label: 'Psychic Terrain',
        weakness2x: ['Fighting', 'Poison'],
        resistance05x: ['Psychic', 'Steel'],
        immune: ['Dark'],
        movePowerBoost: { Psychic: 1.5 },  // canonical: 1.5x (existing behaviour preserved)
    },

    bug: {
        label: 'Bug Terrain',
        weakness2x: ['Dark', 'Grass', 'Psychic'],
        resistance05x: ['Fairy', 'Fighting', 'Fire', 'Flying', 'Ghost', 'Poison', 'Steel'],
        immune: [],
        movePowerBoost: { Bug: 1.2 },
    },

    rock: {
        label: 'Rock Terrain',
        weakness2x: ['Bug', 'Fire', 'Flying', 'Ice'],
        resistance05x: ['Fighting', 'Ground', 'Steel'],
        immune: [],
        movePowerBoost: { Rock: 1.2 },
    },

    ghost: {
        label: 'Ghost Terrain',
        weakness2x: ['Ghost', 'Psychic'],
        resistance05x: ['Dark'],
        immune: ['Normal'],
        movePowerBoost: { Ghost: 1.2 },
    },

    dragon: {
        label: 'Dragon Terrain',
        weakness2x: ['Dragon'],
        resistance05x: ['Steel'],
        immune: ['Fairy'],
        movePowerBoost: { Dragon: 1.2 },
    },

    dark: {
        label: 'Dark Terrain',
        weakness2x: ['Ghost', 'Psychic'],
        resistance05x: ['Dark', 'Fairy', 'Fighting'],
        immune: [],
        movePowerBoost: { Dark: 1.2 },
    },

    steel: {
        label: 'Steel Terrain',
        weakness2x: ['Fairy', 'Ice', 'Rock'],
        resistance05x: ['Electric', 'Fire', 'Steel', 'Water'],
        immune: [],
        movePowerBoost: { Steel: 1.2 },
    },

    fairy: {
        label: 'Fairy Terrain',
        weakness2x: ['Dark', 'Dragon', 'Fighting'],
        resistance05x: ['Fire', 'Poison', 'Steel'],
        immune: [],
        movePowerBoost: { Fairy: 1.2, Dragon: 0.5 },  // Misty Terrain also halves Dragon
    },
};

export const TERRAIN_KEYS = Object.keys(TERRAIN_CONFIG);

/**
 * Calculate the Def/SpD multiplier a terrain applies to a defending Pokémon.
 *
 * @param {string}   terrainType   — key into TERRAIN_CONFIG (e.g. 'fire')
 * @param {string[]} defenderTypes — the defending Pokémon's type array
 * @returns {number} multiplier to apply to Def and SpD (0.80 .. 1.20)
 */
export function getTerrainDefenseModifier(terrainType, defenderTypes) {
    const cfg = TERRAIN_CONFIG[terrainType];
    if (!cfg) return 1.0;

    // Immunity takes priority: any defender type in immune list → +10%
    if (cfg.immune.length > 0 && defenderTypes.some(t => cfg.immune.includes(t))) {
        return 1.10;
    }

    // Count how many defender types fall in each bucket
    let weakCount = 0;
    let resistCount = 0;
    for (const t of defenderTypes) {
        if (cfg.weakness2x.includes(t)) weakCount++;
        if (cfg.resistance05x.includes(t)) resistCount++;
    }

    const net = resistCount - weakCount;

    // net ≤ -2 → 4x weakness  → -20% → 0.80
    // net == -1 → 2x weakness  → -10% → 0.90
    // net == 0  → neutral      →   0% → 1.00
    // net == 1  → 0.5x resist  → +10% → 1.10
    // net ≥ 2   → 0.25x resist → +20% → 1.20
    if (net <= -2) return 0.80;
    if (net === -1) return 0.90;
    if (net === 0) return 1.00;
    if (net === 1) return 1.10;
    return 1.20; // net >= 2
}

/**
 * Get the move power multiplier from the active terrain for a given move type.
 *
 * @param {string} terrainType — key into TERRAIN_CONFIG
 * @param {string} moveType    — e.g. 'Fire', 'Electric'
 * @returns {number} multiplier (default 1.0)
 */
export function getTerrainMovePowerMultiplier(terrainType, moveType) {
    const cfg = TERRAIN_CONFIG[terrainType];
    if (!cfg || !cfg.movePowerBoost) return 1.0;
    return cfg.movePowerBoost[moveType] ?? 1.0;
}
