// ==========================================
// DATA LOADER — Async JSON fetch loading
// ==========================================
// Each data file is a JSON file served from public/data/.
// We fetch them in parallel and assign them to window.* globals.

const BASE_URL = import.meta.env.BASE_URL || '/';
const cleanBaseUrl = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';

const DATA_FILES = [
    { src: `${cleanBaseUrl}data/pokemon.json`,       global: 'MergedPokemonData',    label: 'Pokémon data'   },
    { src: `${cleanBaseUrl}data/abilities.json`,     global: 'AbilitiesData',         label: 'Abilities'      },
    { src: `${cleanBaseUrl}data/abilities_data.json`,global: 'AbilitiesDetailedData', label: 'Abilities detail'},
    { src: `${cleanBaseUrl}data/abilities_map.json`, global: 'PokemonAbilitiesMap',   label: 'Abilities map'  },
    { src: `${cleanBaseUrl}data/moves.json`,         global: 'MovesData',             label: 'Move data'      },
    { src: `${cleanBaseUrl}data/movesets.json`,      global: 'MovesetsData',          label: 'Move sets'      },
    { src: `${cleanBaseUrl}data/attack_chart.json`,  global: 'AttackChartData',       label: 'Attack chart'   },
];

/**
 * Fetch a JSON file and store it on the global window object.
 * @param {string} src  - URL of the JSON file
 * @param {string} globalName - Name of window global to set
 * @returns {Promise<void>}
 */
async function loadJson(src, globalName) {
    console.log(`[DataLoader] Fetching ${src}`);
    const res = await fetch(src);
    if (!res.ok) {
        throw new Error(`Failed to load ${src}: ${res.status}`);
    }
    let data = await res.json();
    if (globalName === 'MovesData') {
        const normalized = {};
        for (const [key, value] of Object.entries(data)) {
            if (!value.name) value.name = key;
            const normKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
            normalized[normKey] = value;
        }
        
        // Proxy to support arbitrary capitalization/spaces during dynamic accesses
        const proxy = new Proxy(normalized, {
            get(target, prop) {
                if (typeof prop === 'string') {
                    const normProp = prop.toLowerCase().replace(/[^a-z0-9]/g, '');
                    if (normProp in target) {
                        return target[normProp];
                    }
                }
                return target[prop];
            },
            has(target, prop) {
                if (typeof prop === 'string') {
                    const normProp = prop.toLowerCase().replace(/[^a-z0-9]/g, '');
                    if (normProp in target) {
                        return true;
                    }
                }
                return prop in target;
            }
        });
        window[globalName] = proxy;
    } else {
        window[globalName] = data;
    }
    console.log(`[DataLoader] Loaded global window.${globalName}`);
}

/**
 * Emit a structured progress event that ArenaContext v3 listens for.
 */
function emitProgress(loaded, total, label) {
    window.dispatchEvent(new CustomEvent('arena:progress', {
        detail: { loaded, total, label }
    }));
}

/**
 * Load all game data files in parallel, emitting progress events after each one.
 *
 * @param {function(loaded: number, total: number, label: string): void} [onProgress]
 *   Optional legacy callback.
 * @returns {Promise<void>} Resolves when every global is available.
 */
export async function loadGameData(onProgress) {
    const total = DATA_FILES.length;
    let loadedCount = 0;

    console.log('[DataLoader] Starting to fetch game data files in parallel...', total, 'files');

    const loadTasks = DATA_FILES.map(async ({ src, global: globalName, label }) => {
        // Skip if already present (e.g. hot-reload scenarios)
        if (window[globalName]) {
            console.log(`[DataLoader] ${globalName} already exists on window. Skipping.`);
        } else {
            try {
                await loadJson(src, globalName);
            } catch (err) {
                console.error(`[DataLoader] Caught error loading ${src}:`, err);
                throw err;
            }
        }

        loadedCount++;
        emitProgress(loadedCount, total, label);   // CustomEvent
        onProgress?.(loadedCount, total, label);   // Legacy callback
    });

    await Promise.all(loadTasks);
    console.log('[DataLoader] All game data files loaded successfully.');
}


