// ==========================================
// TRIE PREFIX TREE (O(k) Search Algorithm)
// ==========================================

export class Trie {
    constructor() {
        this._root = Object.create(null);
    }

    /** O(k) where k = word length */
    insert(word) {
        let node = this._root;
        for (const ch of word.toLowerCase()) {
            if (!node[ch]) node[ch] = Object.create(null);
            node = node[ch];
        }
        node._word = word; // Store original-cased form at terminal node.
    }

    /**
     * O(k + m) where k = prefix length, m = number of results.
     * @param {string} prefix
     * @param {number} limit  - Max results to return.
     * @returns {string[]}
     */
    search(prefix, limit = 5) {
        let node = this._root;
        for (const ch of prefix.toLowerCase()) {
            if (!node[ch]) return [];
            node = node[ch];
        }
        const results = [];
        this._collect(node, results, limit);
        return results;
    }

    /** DFS traversal from a given node to collect terminal words. */
    _collect(node, results, limit) {
        if (results.length >= limit) return;
        if (node._word) results.push(node._word);
        for (const key of Object.keys(node)) {
            if (key !== '_word') this._collect(node[key], results, limit);
        }
    }
}
