import { Trie } from '../utils/Trie.js';
import { Pokemon } from '../models/Pokemon.js';

// ==========================================
// POKÉMON DATABASE SERVICE (O(1) / O(k) lookups)
// ==========================================

export class PokemonDatabase {
    /**
     * @param {object} rawData - window.MergedPokemonData
     */
    constructor(rawData) {
        this._raw = rawData || {};
        this._index = new Map();   // name.toLowerCase() → { foundNode, baseNode }
        this._trie = new Trie();
        
        // Tier-filtered names are cached for quick team generation.
        this.allNames = [];
        this.filteredNames = [];
    }

    /** Build all lookup structures. Call once at startup. O(n). */
    buildIndex() {
        if (!this._raw || Object.keys(this._raw).length === 0) return;

        const traverse = (node, baseNode) => {
            // Support both capitalized Name (base/evolution nodes) and lowercase name (form nodes)
            const nodeName = node?.Name || node?.name;
            if (!node || typeof node !== 'object' || !nodeName) return;
            const key = nodeName.toLowerCase();
            if (!this._index.has(key)) {
                // Normalise: ensure .Name is always set so rest of code can use .Name
                if (!node.Name && node.name) node.Name = node.name;
                this._index.set(key, { foundNode: node, baseNode });
                this._trie.insert(nodeName);
            }
            // Recurse into forms (may use lowercase `name` in dataset)
            if (node.forms) {
                for (const f of Object.values(node.forms)) {
                    if (f && (f.Name || f.name)) traverse(f, node);
                }
            }
            // Recurse into evolutions.
            if (node.evolutions) {
                for (const evo of node.evolutions) traverse(evo, evo);
            }
        };

        for (const pokemon of Object.values(this._raw)) traverse(pokemon, pokemon);

        this.allNames = [...this._index.values()].map(v => v.foundNode.Name);
        this.filteredNames = this._buildFiltered([
            'Basic', 'Mid', 'Final', 
            'Legendary', 'Mythical', 'Ultra Beast', 
            'Alolan', 'Galarian', 'Hisuian', 'Paldean'
        ]);
    }

    /**
     * O(1) lookup by exact name.
     * @param {string} name
     * @returns {{ foundNode: object, baseNode: object } | null}
     */
    find(name) {
        return this._index.get(name?.toLowerCase()) ?? null;
    }

    /**
     * Create a new Pokemon model instance.
     * @param {string} name 
     * @param {number} level 
     * @returns {Pokemon|null}
     */
    createPokemonInstance(name, level = 100) {
        const result = this.find(name);
        if (!result) return null;
        const pokemon = new Pokemon(result.foundNode, result.baseNode);
        pokemon.level = level;
        return pokemon;
    }

    /**
     * O(k + m) prefix search using the Trie.
     * @param {string} prefix
     * @param {number} limit
     * @returns {string[]}
     */
    search(prefix, limit = 5) {
        return this._trie.search(prefix, limit);
    }

    /** Build the tier-filtered name list used for team generation. */
    _buildFiltered(allowedTiers) {
        const names = [];
        for (const { foundNode } of this._index.values()) {
            if (foundNode.tier && allowedTiers.includes(foundNode.tier)) {
                names.push(foundNode.Name);
            }
        }
        return names;
    }

    /**
     * Get the list of evolution names for a given Pokémon name.
     * @param {string} name 
     * @returns {string[]} Array of evolution species names, or empty array
     */
    getEvolutions(name) {
        const result = this.find(name);
        if (!result) return [];
        // The raw data structure has evolutions stored as arrays or objects.
        // Let's assume the baseNode has an `evolutions` array of target species names or objects with `Name`.
        const evos = result.foundNode.evolutions || [];
        return evos.map(evo => typeof evo === 'string' ? evo : evo.Name).filter(Boolean);
    }

    /**
     * Get the list of alternate form names for a given Pokémon name.
     * @param {string} name 
     * @returns {string[]} Array of form species names, or empty array
     */
    getForms(name) {
        const result = this.find(name);
        if (!result || !result.baseNode) return [];
        const formsObj = result.baseNode.forms || {};
        // Dataset uses lowercase `name` for form entries; fall back to f.name if f.Name missing
        return Object.values(formsObj).map(f => f && (f.Name || f.name)).filter(Boolean);
    }
}
