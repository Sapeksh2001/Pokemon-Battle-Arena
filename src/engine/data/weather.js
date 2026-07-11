// ==========================================
// WEATHER RULES — from data/Weather.txt
// ==========================================

export const WEATHER_CONFIG = {
    none: {
        label: 'None',
        superior: false,
        tickDamage: null,    // no tick
        immune: [],
        moveModifiers: {},   // { type: multiplier }
        nullified: [],       // types that deal 0 damage
        typeOverride: {},    // Water → Ice in snow storm
        statusImmune: [],    // burn, freeze etc
        rockSpDefBoost: false,
        blizzardAccuracy: false,
        thunderHurricaneAccuracy: null, // null=default, Infinity=perfect, 50=halved
    },

    sandstorm: {
        label: 'Sandstorm',
        superior: false,
        tickDamage: { amount: 0.05, immuneTypes: ['Rock', 'Ground', 'Steel'] },
        immune: ['Rock', 'Ground', 'Steel'],
        moveModifiers: {
            // Sunlight/moonlight based moves halved — handled via move flags
        },
        nullified: [],
        statusImmune: [],
        rockSpDefBoost: true,   // Rock-type SpDef +50%
        blizzardAccuracy: false,
        thunderHurricaneAccuracy: null,
        sunMoveHalfed: true,
    },

    hail: {
        label: 'Hail',
        superior: false,
        tickDamage: { amount: 0.05, immuneTypes: ['Ice'] },
        immune: ['Ice'],
        moveModifiers: {},
        nullified: [],
        statusImmune: [],
        rockSpDefBoost: false,
        blizzardAccuracy: true, // blizzard never misses + 30% bypass
        thunderHurricaneAccuracy: null,
        sunMoveHalfed: true,
    },

    rain: {
        label: 'Rain',
        superior: false,
        tickDamage: null,
        immune: [],
        moveModifiers: { Water: 1.5, Fire: 0.5 },
        nullified: [],
        statusImmune: ['burn'],  // cannot be burnt in rain
        rockSpDefBoost: false,
        blizzardAccuracy: false,
        thunderHurricaneAccuracy: Infinity, // always hit
        sunMoveHalfed: true,
    },

    'harsh-sunlight': {
        label: 'Harsh Sunlight',
        superior: false,
        tickDamage: null,
        immune: [],
        moveModifiers: { Fire: 1.5, Water: 0.5 },
        nullified: [],
        statusImmune: ['freeze'],  // cannot be frozen
        rockSpDefBoost: false,
        blizzardAccuracy: false,
        thunderHurricaneAccuracy: 50,
        sunMoveHalfed: false,
        sunHealBoost: 0.66,  // Synthesis/Moonlight/Morning Sun heal 66% in sun
    },

    'heavy-rain': {
        label: 'Heavy Rain',
        superior: true,
        tickDamage: null,
        immune: [],
        moveModifiers: { Water: 2.0, Fire: 0, Rock: 0, Ground: 0 },
        nullified: ['Fire', 'Rock', 'Ground'],
        statusImmune: ['burn'],
        rockSpDefBoost: false,
        blizzardAccuracy: false,
        thunderHurricaneAccuracy: Infinity,
        sunMoveHalfed: true,
        electricAlwaysSuperEffective: true,
        electricInfiniteAccuracy: true,
    },

    'extreme-sunlight': {
        label: 'Extremely Harsh Sunlight',
        superior: true,
        tickDamage: null,
        immune: [],
        moveModifiers: { Fire: 2.0, Water: 0, Ice: 0, Bug: 0 },
        nullified: ['Water', 'Ice', 'Bug'],
        statusImmune: ['freeze'],
        rockSpDefBoost: false,
        blizzardAccuracy: false,
        thunderHurricaneAccuracy: 50,
        sunHealBoost: 0.66,
        fireSevereBurn: true,   // Fire moves inflict burn at 100%
        fireInfiniteAccuracy: true,
    },

    'snow-storm': {
        label: 'Snow Storm',
        superior: true,
        tickDamage: {
            amount: 0.10,
            scaling: true,      // increases every 2 rounds
            scaleAmount: 0.05,
            immuneTypes: ['Ice'],
        },
        immune: ['Ice'],
        moveModifiers: {
            Ice: 1.5,
            Fire: 0.5,
            Flying: 0.5,
            Grass: 0.5,
            Ground: 0.5,
            Rock: 0.5,
            Bug: 0.5,
            Dragon: 0.5,
        },
        nullified: [],
        typeOverride: { Water: 'Ice' },  // water moves become ice
        statusImmune: [],
        rockSpDefBoost: false,
        blizzardAccuracy: false,
        iceDoublePrecision: true,   // Ice moves 2x accuracy
        thunderHurricaneAccuracy: null,
    },

    'dune-storm': {
        label: 'Dune Storm',
        superior: true,
        tickDamage: {
            amount: 0.10,
            scaling: true,
            scaleAmount: 0.10,
            immuneTypes: ['Rock', 'Ground', 'Steel'],
        },
        immune: ['Rock', 'Ground', 'Steel'],
        moveModifiers: {
            Ground: 1.5,
            Flying: 0,
            Fire: 0,
            Grass: 0.5,
            Bug: 0.5,
            Fairy: 0.5,
            Electric: 0.5,
            Water: 0.5,
        },
        nullified: ['Flying', 'Fire'],
        statusImmune: [],
        rockSpDefBoost: false,
        blizzardAccuracy: false,
        groundDoublePrecision: true,    // Ground moves 2x accuracy
        thunderHurricaneAccuracy: null,
    },

    'delta-stream': {
        label: 'Delta Stream',
        superior: true,
        untouchable: true,  // cannot be replaced by ANY weather including superior
        tickDamage: null,
        immune: [],
        moveModifiers: { Flying: 1.0 },   // flying is normal
        nonFlyingHalved: true,            // all non-flying moves halved
        flyingSpeedDouble: true,          // Flying pokemon speed x2
        nullified: [],
        statusImmune: [],
        rockSpDefBoost: false,
        blizzardAccuracy: false,
        thunderHurricaneAccuracy: null,
    },
};

export const WEATHER_KEYS = Object.keys(WEATHER_CONFIG);
export const SUPERIOR_WEATHERS = WEATHER_KEYS.filter(k => WEATHER_CONFIG[k].superior);
export const UNTOUCHABLE_WEATHERS = WEATHER_KEYS.filter(k => WEATHER_CONFIG[k].untouchable);

// Sun-based moves (halved in sand/hail, boosted in sun)
export const SUN_MOVES = new Set([
    'synthesis', 'morningsun', 'moonlight', 'solarbeam', 'solarblade', 'weatherball'
]);

// Thunder/Hurricane special accuracy treatment
export const THUNDER_ACCURACY_MOVES = new Set(['thunder', 'hurricane', 'blizzard']);

// Punch moves (affected by Iron Fist ability)
export const PUNCH_MOVES_FLAGS = 'punch';
export const CONTACT_FLAG = 'contact';
export const SOUND_FLAG = 'sound';
export const BITE_FLAG = 'bite';
export const BULLET_FLAG = 'bullet';
export const WIND_FLAG = 'wind';
export const SLICING_FLAG = 'slicing';
