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
        this._preEvoMap = new Map(); // evolutionKey -> Set(parentNames)
    }

    /** Build all lookup structures. Call once at startup. O(n). */
    buildIndex() {
        if (!this._raw || Object.keys(this._raw).length === 0) return;

        const traverse = (node, baseNode) => {
            // Support both capitalized Name (base/evolution nodes) and lowercase name (form nodes)
            const nodeName = node?.Name || node?.name;
            if (!node || typeof node !== 'object' || !nodeName) return;
            const key = nodeName.toLowerCase();
            const existing = this._index.get(key);
            const hasEvos = node.evolutions && node.evolutions.length > 0;
            const existingHasEvos = existing?.foundNode.evolutions?.length > 0;

            if (!existing || (!existingHasEvos && hasEvos)) {
                // Normalise: ensure .Name is always set so rest of code can use .Name
                if (!node.Name && node.name) node.Name = node.name;
                
                // Preserve the most comprehensive baseNode (the one with the most forms)
                const existingFormsCount = existing?.baseNode?.forms ? Object.keys(existing.baseNode.forms).length : 0;
                const newFormsCount = baseNode?.forms ? Object.keys(baseNode.forms).length : 0;
                const finalBaseNode = (existingFormsCount > newFormsCount) ? existing.baseNode : baseNode;

                this._index.set(key, { foundNode: node, baseNode: finalBaseNode });
                
                // Only insert into Trie if not already present or if we are upgrading to a better node
                if (!existing) this._trie.insert(nodeName);
            }
            // Recurse into forms (may use lowercase `name` in dataset)
            if (node.forms) {
                for (const f of Object.values(node.forms)) {
                    if (f && (f.Name || f.name)) traverse(f, node);
                }
            }
            // Recurse into evolutions.
            if (node.evolutions) {
                for (const evo of node.evolutions) {
                    const evoName = evo?.Name || evo?.name;
                    if (evoName) {
                        const evoKey = evoName.toLowerCase();
                        if (!this._preEvoMap.has(evoKey)) {
                            this._preEvoMap.set(evoKey, new Set());
                        }
                        this._preEvoMap.get(evoKey).add(nodeName);
                    }
                    traverse(evo, evo);
                }
            }
        };

        for (const pokemon of Object.values(this._raw)) traverse(pokemon, pokemon);

        this.allNames = [...this._index.values()].map(v => v.foundNode.Name || v.foundNode.name);
        this.filteredNames = this._buildFiltered([
            'Basic', 'Mid', 'Final', 
            'Legendary', 'Mythical', 'Ultra Beast'
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
     * O(k + m) prefix search with substring fallback.
     * @param {string} query
     * @param {number} limit
     * @returns {string[]}
     */
    search(query, limit = 5) {
        if (!query) return [];
        const q = query.toLowerCase();
        
        // 1. Get prefix matches from Trie (fastest)
        const prefixMatches = this._trie.search(q, limit);
        
        if (prefixMatches.length >= limit) return prefixMatches;

        // 2. Add substring matches for remaining slots
        const seen = new Set(prefixMatches.map(n => n.toLowerCase()));
        const results = [...prefixMatches];

        for (const name of this.allNames) {
            if (results.length >= limit) break;
            const lowerName = name.toLowerCase();
            if (lowerName.includes(q) && !seen.has(lowerName)) {
                results.push(name);
                seen.add(lowerName);
            }
        }

        return results;
    }

    /** Build the tier-filtered name list used for team generation. */
    _buildFiltered(allowedTiers) {
        const regionalPrefixRe = /^(Alolan|Galarian|Hisuian|Paldean)\s+/i;
        const normalizeTier = (t) => t ? t.replace(regionalPrefixRe, '').trim() : t;
        const names = [];
        for (const { foundNode } of this._index.values()) {
            if (foundNode.tier && allowedTiers.includes(normalizeTier(foundNode.tier))) {
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
        return evos.map(evo => typeof evo === 'string' ? evo : (evo.Name || evo.name)).filter(Boolean);
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

    /**
     * Get the list of pre-evolution names for a given Pokémon name.
     * @param {string} name 
     * @returns {string[]} Array of parent species names
     */
    getPreEvolutions(name) {
        const key = name?.toLowerCase();
        const parents = this._preEvoMap.get(key);
        return parents ? Array.from(parents) : [];
    }
}
