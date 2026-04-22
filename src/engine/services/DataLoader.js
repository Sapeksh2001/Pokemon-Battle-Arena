// ==========================================
// DATA LOADER — Async JSON fetch
// ==========================================
// Each data file is now a JSON file.
// We fetch them on demand and assign to window globals
// to maintain compatibility with the legacy engine.

import pokemonDataUrl from '../../data/Pokemon_NewDataset.json?url';
import abilityDataUrl from '../../data/ability.json?url';
import abilitiesMapUrl from '../../data/abilities_map.json?url';
import movesDataUrl from '../../data/moves_data.json?url';
import movesetsDataUrl from '../../data/movesets.json?url';

const DATA_FILES = [
    { src: pokemonDataUrl,   global: 'MergedPokemonData',    label: 'Pokémon data'   },
    { src: abilityDataUrl,   global: 'AbilitiesData',         label: 'Abilities'      },
    { src: abilitiesMapUrl,  global: 'PokemonAbilitiesMap',   label: 'Abilities map'  },
    { src: movesDataUrl,    global: 'MovesData',             label: 'Move data'      },
    { src: movesetsDataUrl,  global: 'MovesetsData',          label: 'Move sets'      },
];

/**
 * Fetch a JSON file and return the parsed object.
 * @param {string} src - URL/path
 * @returns {Promise<object>}
 */
async function loadJson(src) {
    console.log(`[DataLoader] Fetching JSON from ${src}`);
    const response = await fetch(src);
    if (!response.ok) {
        throw new Error(`Failed to load: ${src} (Status: ${response.status})`);
    }
    return await response.json();
}

/**
 * Load all game data files sequentially, calling onProgress after each one.
 *
 * @param {function(loaded: number, total: number, label: string): void} onProgress
 *   Called after each file finishes. `loaded` is the count done so far.
 * @returns {Promise<void>} Resolves when every global is available.
 */
export async function loadGameData(onProgress) {
    const total = DATA_FILES.length;
    let loadedCount = 0;

    console.log('[DataLoader] Starting to load game data files in parallel...', total, 'files');

    const loadTasks = DATA_FILES.map(async ({ src, global: globalName, label }) => {
        // Skip if already present (e.g. hot-reload scenarios)
        if (window[globalName]) {
            console.log(`[DataLoader] ${globalName} already exists on window. Skipping ${src}.`);
        } else {
            console.log(`[DataLoader] Awaiting fetch for ${src}...`);
            try {
                const data = await loadJson(src);
                window[globalName] = data;
            } catch (err) {
                console.error(`[DataLoader] Caught error loading ${src}:`, err);
                throw err;
            }

            // Sanity check
            if (!window[globalName]) {
                console.error(`[DataLoader] Sanity check failed! window.${globalName} is undefined after loading ${src}.`);
                throw new Error(`Fetch successful but global "window.${globalName}" is still undefined.`);
            }
            console.log(`[DataLoader] Successfully verified global "window.${globalName}".`);
        }

        loadedCount++;
        onProgress?.(loadedCount, total, label);
    });

    await Promise.all(loadTasks);
    console.log('[DataLoader] All game data files loaded successfully.');
}
