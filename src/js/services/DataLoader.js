// ==========================================
// DATA LOADER — Async dynamic script injection
// ==========================================
// Each data file sets a global variable when it runs.
// We inject <script> tags on demand and wait for onload,
// then verify the global exists before resolving.

import pokemonDataUrl from '../../Pokemon_NewDataset.js?url';
import abilityDataUrl from '../../ability.js?url';
import abilitiesMapUrl from '../../abilities_map.js?url';
import movesDataUrl from '../../moves_data.js?url';
import movesetsDataUrl from '../../movesets.js?url';

const DATA_FILES = [
    { src: pokemonDataUrl,   global: 'MergedPokemonData',    label: 'Pokémon data'   },
    { src: abilityDataUrl,   global: 'AbilitiesData',         label: 'Abilities'      },
    { src: abilitiesMapUrl,  global: 'PokemonAbilitiesMap',   label: 'Abilities map'  },
    { src: movesDataUrl,    global: 'MovesData',             label: 'Move data'      },
    { src: movesetsDataUrl,  global: 'MovesetsData',          label: 'Move sets'      },
];

/**
 * Dynamically inject a classic (non-module) script tag and wait for it to load.
 * @param {string} src  - URL/path relative to the document
 * @returns {Promise<void>}
 */
function loadScript(src) {
    return new Promise((resolve, reject) => {
        console.log(`[DataLoader] Creating <script> for ${src}`);
        const el = document.createElement('script');
        el.src = src;
        el.onload = () => {
            console.log(`[DataLoader] Script loaded event fired for ${src}`);
            resolve();
        };
        el.onerror = () => {
            console.error(`[DataLoader] Error event fired for ${src}`);
            reject(new Error(`Failed to load: ${src}`));
        };
        document.head.appendChild(el);
    });
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
            console.log(`[DataLoader] Awaiting loadScript for ${src}...`);
            try {
                await loadScript(src);
            } catch (err) {
                console.error(`[DataLoader] Caught error loading ${src}:`, err);
                throw err;
            }

            // Sanity check — the script should have set the global
            if (!window[globalName]) {
                console.error(`[DataLoader] Sanity check failed! window.${globalName} is undefined after loading ${src}.`);
                throw new Error(`Script loaded but global "window.${globalName}" is still undefined. Check ${src}.`);
            }
            console.log(`[DataLoader] Successfully verified global "window.${globalName}".`);
        }

        loadedCount++;
        onProgress?.(loadedCount, total, label);
    });

    await Promise.all(loadTasks);
    console.log('[DataLoader] All game data files loaded successfully.');
}
