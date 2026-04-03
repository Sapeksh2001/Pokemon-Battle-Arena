/**
 * POKÉMON BATTLE ARENA — REFACTORED SCRIPT
 * ==========================================
 * Architecture : OOP + DRY + DSA
 *
 * Class hierarchy
 * ───────────────
 * DSA Primitives
 *   RingBuffer        — O(1) circular buffer used by BattleLog
 *   Trie              — O(k) prefix-tree used by PokemonDatabase for search
 *
 * Domain Model (own their state, serialise/restore for undo-redo)
 *   Pokemon           — all per-Pokémon data + behaviour
 *   Player            — trainer data + team management
 *
 * Service Layer (stateless logic that operates on domain objects)
 *   PokemonDatabase   — HashMap O(1) lookup + Trie O(k) search over raw data
 *   BattleEngine      — pure damage / effectiveness maths (no DOM, no side-effects)
 *
 * Infrastructure (framework-style helpers)
 *   AudioManager      — Tone.js wrapper; single init, semantic play(action) API
 *   BattleLog         — RingBuffer-backed log with DOM rendering + export
 *   HistoryManager    — Undo/redo with toJSON/fromJSON round-trip
 *   ModalManager      — Central registry; open/close/closeAll + Escape shortcut
 *   Timer             — Round timer encapsulation
 *
 * Presentation
 *   UIRenderer        — All DOM creation / update; zero game logic
 *
 * Controller
 *   PokemonBattleArena — Wires everything; owns gameState; handles user actions
 *
 * DRY helpers (methods on PokemonBattleArena)
 *   notify(msg, type, isError)          — battleLog.add + makeAnnouncement in one call
 *   applyHPChange(pokemon, pid, newHP)  — clamp, animate, log, render
 *   populateDropdown(el, items, ...)    — builds any <select> without repetition
 *   applyModification(curr, base, ...)  — unified stat-mod arithmetic
 */



const typeChart = {
    Normal: { Rock: 0.5, Ghost: 0, Steel: 0.5 },
    Fighting: { Normal: 2, Flying: 0.5, Poison: 0.5, Rock: 2, Bug: 0.5, Ghost: 0, Steel: 2, Psychic: 0.5, Ice: 2, Dark: 2, Fairy: 0.5 },
    Flying: { Fighting: 2, Rock: 0.5, Bug: 2, Steel: 0.5, Grass: 2, Electric: 0.5 },
    Poison: { Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0, Grass: 2, Fairy: 2 },
    Ground: { Flying: 0, Poison: 2, Rock: 2, Bug: 0.5, Steel: 2, Fire: 2, Grass: 0.5, Electric: 2 },
    Rock: { Fighting: 0.5, Ground: 0.5, Flying: 2, Bug: 2, Steel: 0.5, Fire: 2, Ice: 2 },
    Bug: { Fighting: 0.5, Flying: 0.5, Poison: 0.5, Ghost: 0.5, Steel: 0.5, Fire: 0.5, Grass: 2, Psychic: 2, Dark: 2, Fairy: 0.5 },
    Ghost: { Normal: 0, Ghost: 2, Psychic: 2, Dark: 0.5 },
    Steel: { Rock: 2, Steel: 0.5, Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2, Fairy: 2 },
    Fire: { Rock: 0.5, Bug: 2, Steel: 2, Fire: 0.5, Water: 0.5, Grass: 2, Ice: 2, Dragon: 0.5 },
    Water: { Ground: 2, Rock: 2, Fire: 2, Water: 0.5, Grass: 0.5, Dragon: 0.5 },
    Grass: { Flying: 0.5, Poison: 0.5, Ground: 2, Rock: 2, Bug: 0.5, Steel: 0.5, Fire: 0.5, Water: 2, Grass: 0.5, Dragon: 0.5 },
    Electric: { Flying: 2, Ground: 0, Water: 2, Grass: 0.5, Electric: 0.5, Dragon: 0.5 },
    Psychic: { Fighting: 2, Poison: 2, Steel: 0.5, Psychic: 0.5, Dark: 0 },
    Ice: { Flying: 2, Ground: 2, Steel: 0.5, Fire: 0.5, Water: 0.5, Grass: 2, Ice: 0.5, Dragon: 2 },
    Dragon: { Steel: 0.5, Dragon: 2, Fairy: 0 },
    Dark: { Fighting: 0.5, Ghost: 2, Psychic: 2, Dark: 0.5, Fairy: 0.5 },
    Fairy: { Fighting: 2, Poison: 0.5, Steel: 0.5, Fire: 0.5, Dragon: 2, Dark: 2 }
};

const typeColors = {
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C',
    grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1',
    ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
    rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746',
    steel: '#B7B7CE', fairy: '#D685AD'
};

const arenaBackgrounds = {
    Normal: [
        'https://raw.githubusercontent.com/Sapeksh2001/Prallax-Window/main/plx-1.png',
        'https://raw.githubusercontent.com/Sapeksh2001/Prallax-Window/main/plx-2.png',
        'https://raw.githubusercontent.com/Sapeksh2001/Prallax-Window/main/plx-3.png',
        'https://raw.githubusercontent.com/Sapeksh2001/Prallax-Window/main/plx-4.png',
        'https://raw.githubusercontent.com/Sapeksh2001/Prallax-Window/main/plx-5.png',
        'https://raw.githubusercontent.com/Sapeksh2001/Prallax-Window/main/ground.png'
    ],
    Fire: Array(6).fill('https://img.freepik.com/premium-vector/pixel-art-landscape-volcano-background_59146-121.jpg?w=1060'),
    Water: Array(6).fill('https://img.freepik.com/premium-vector/pixel-art-underwater-background-with-fish-coral-seaweed-vector-illustration_614533-289.jpg?w=1060')
};


// Used by BattleLog for O(1) enqueue + eviction

class RingBuffer {
    /**
     * @param {number} capacity - Maximum number of items before oldest is overwritten.
     */
    constructor(capacity) {
        this.capacity = capacity;
        this._buf = new Array(capacity);
        this._head = 0;   // index of oldest entry
        this._tail = 0;   // index of next write slot
        this._size = 0;
    }

    /** O(1) — push a new item, silently evicting the oldest if full. */
    push(item) {
        this._buf[this._tail] = item;
        this._tail = (this._tail + 1) % this.capacity;
        if (this._size < this.capacity) {
            this._size++;
        } else {
            // Buffer is full; advance head to discard oldest entry.
            this._head = (this._head + 1) % this.capacity;
        }
    }

    /** O(n) — return items in insertion order (oldest first). */
    toArray() {
        const out = [];
        for (let i = 0; i < this._size; i++) {
            out.push(this._buf[(this._head + i) % this.capacity]);
        }
        return out;
    }

    /** O(1) */
    clear() { this._head = 0; this._tail = 0; this._size = 0; }

    get size() { return this._size; }
}


// Used by PokemonDatabase for O(k) prefix search

class Trie {
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


// HashMap for O(1) named lookup; Trie for O(k) search

class PokemonDatabase {
    /**
     * @param {object} rawData - window.MergedPokemonData
     */
    constructor(rawData) {
        this._raw = rawData;
        this._index = new Map();   // name.toLowerCase() → { foundNode, baseNode }
        this._trie = new Trie();
        // Tier-filtered names are cached for quick team generation.
        this.allNames = [];
        this.filteredNames = [];
    }

    /** Build all lookup structures. Call once at startup. O(n). */
    buildIndex() {
        const traverse = (node, baseNode) => {
            if (!node || typeof node !== 'object' || !node.Name) return;
            const key = node.Name.toLowerCase();
            if (!this._index.has(key)) {
                this._index.set(key, { foundNode: node, baseNode });
                this._trie.insert(node.Name);
            }
            // Recurse into forms that have a Name.
            if (node.forms) {
                for (const f of Object.values(node.forms)) {
                    if (f && f.Name) traverse(f, node);
                }
            }
            // Recurse into evolutions.
            if (node.evolutions) {
                for (const evo of node.evolutions) traverse(evo, evo);
            }
        };

        for (const pokemon of Object.values(this._raw)) traverse(pokemon, pokemon);

        this.allNames = [...this._index.values()].map(v => v.foundNode.Name);
        this.filteredNames = this._buildFiltered(['Basic', 'Ultra Beast', 'Legendary', 'Mythical']);
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
}


// Owns all per-Pokémon state; serialises / restores for undo

class Pokemon {
    constructor(data, baseData) {
        this.baseName = baseData.Name;
        this.fullName = data.Name;
        this.maxHp = data.stats.hp;
        this.currentHP = data.stats.hp;
        this.stats = { ...data.stats };
        // Support both old ["Grass Poison"] and new ["Grass", "Poison"] formats
        this.types = data.types.flatMap(t => t.split(' '));
        this.sprite = data.sprite;
        this.cry = data.cry;
        this.tier = data.tier;
        this.data = data;       // raw data for the current form
        this.baseData = baseData;   // raw data for the base form (needed for form changes)
        this.statModifiers = {};         // key → delta from base stat
        this.statuses = {};         // e.g. { poison: true, burn: true }
    }

    // ── Computed properties ──────────────────

    isFainted() { return this.currentHP <= 0; }
    getHPPercent() { return this.currentHP / this.maxHp; }

    /**
     * Returns the effective value of a stat after applying in-battle modifiers.
     * Fixes the double-count bug that existed in the original handleAttack().
     */
    getEffectiveStat(statName) {
        return this.stats[statName] + (this.statModifiers[statName] || 0);
    }

    // ── Mutations ───────────────────────────

    /** Applies damage (clamped to 0). Returns actual damage dealt. */
    takeDamage(amount) {
        const before = this.currentHP;
        this.currentHP = Math.max(0, this.currentHP - amount);
        return before - this.currentHP;
    }

    /** Applies healing (clamped to maxHp). Returns actual HP restored. */
    heal(amount) {
        const before = this.currentHP;
        this.currentHP = Math.min(this.maxHp, this.currentHP + amount);
        return this.currentHP - before;
    }

    /**
     * DRY: unified stat-modification arithmetic used by handleStatUpdate().
     * Modification types: 'set', '+', '-', '+%', '-%'.
     */
    modifyStat(statName, modType, value) {
        if (statName === 'hp') {
            const base = this.maxHp;
            const current = this.currentHP;
            const newHP = applyModification(current, base, modType, value, base);
            this.currentHP = newHP;
            return newHP - current; // positive = heal, negative = damage
        }
        const base = this.stats[statName];
        const current = this.statModifiers[statName] || 0;

        let newModifier;
        if (modType === 'set') {
            newModifier = value - base;
        } else {
            newModifier = applyModification(current, base, modType, value);
        }

        this.statModifiers[statName] = newModifier;
        return newModifier - current;
    }

    applyStatus(status) { this.statuses[status] = true; }
    removeStatus(status) { delete this.statuses[status]; }
    hasStatus(status) { return !!this.statuses[status]; }

    /** Clear all statuses and stat modifiers (called on switch-out). */
    clearStatuses() {
        this.statuses = {};
        this.statModifiers = {};
    }

    // ── Serialisation for HistoryManager ────

    toJSON() {
        return {
            fullName: this.fullName,
            baseName: this.baseName,
            maxHp: this.maxHp,
            currentHP: this.currentHP,
            stats: { ...this.stats },
            statModifiers: { ...this.statModifiers },
            statuses: { ...this.statuses }
        };
    }

    /**
     * Restore a Pokemon instance from a serialised snapshot.
     * @param {object} json     - From toJSON()
     * @param {PokemonDatabase} db
     */
    static fromJSON(json, db) {
        const result = db.find(json.fullName);
        if (!result) {
            console.warn(`Pokemon.fromJSON: "${json.fullName}" not found in database.`);
            return null;
        }
        const p = new Pokemon(result.foundNode, result.baseNode);
        if (json.maxHp !== undefined) p.maxHp = json.maxHp;
        if (json.stats) p.stats = { ...json.stats };
        p.currentHP = json.currentHP;
        p.statModifiers = { ...json.statModifiers };
        p.statuses = { ...json.statuses };
        return p;
    }
}

/**
 * DRY helper — shared arithmetic for stat and HP modifications.
 * Extracted from the original's repeated switch blocks in handleStatUpdate().
 * @param {number} current - Current value (stat modifier delta OR current HP)
 * @param {number} base    - Base stat value
 * @param {string} modType - 'set' | '+' | '-' | '+%' | '-%'
 * @param {number} value
 * @param {number} [max=Infinity] - Upper clamp (used for HP)
 * @param {number} [min=-Infinity] - Lower clamp
 */
function applyModification(current, base, modType, value, max = Infinity, min = -Infinity) {
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


// Owns trainer + team state; serialises / restores for undo

class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.team = Array(6).fill(null); // Array<Pokemon|null>
        this.activePokemonIndex = 0;
    }

    // ── Accessors ───────────────────────────

    getActivePokemon() {
        return this.team[this.activePokemonIndex] ?? null;
    }

    hasLivingPokemon() {
        return this.team.some(p => p && !p.isFainted());
    }

    // ── Team mutations ───────────────────────

    setSlot(index, pokemon) {
        this.team[index] = pokemon;
    }

    clearSlot(index) {
        this.team[index] = null;
        // If we cleared the active slot, find the next live one.
        if (this.activePokemonIndex === index) {
            const next = this.team.findIndex(p => p !== null);
            this.activePokemonIndex = next === -1 ? 0 : next;
        }
    }

    /**
     * Switch active Pokémon.
     * @returns {boolean} Whether the switch was successful.
     */
    switchTo(slotIndex) {
        const target = this.team[slotIndex];
        if (!target || target.isFainted()) return false;
        if (this.activePokemonIndex === slotIndex) return false;
        // Clear statuses on the outgoing Pokémon.
        this.getActivePokemon()?.clearStatuses();
        this.activePokemonIndex = slotIndex;
        return true;
    }

    canSwitchTo(slotIndex) {
        const p = this.team[slotIndex];
        return p !== null && !p.isFainted() && slotIndex !== this.activePokemonIndex;
    }

    // ── Serialisation for HistoryManager ────

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            team: this.team.map(p => (p ? p.toJSON() : null)),
            activePokemonIndex: this.activePokemonIndex
        };
    }

    /**
     * @param {object} json  - From toJSON()
     * @param {PokemonDatabase} db
     */
    static fromJSON(json, db) {
        const player = new Player(json.id, json.name);
        player.team = json.team.map(t => (t ? Pokemon.fromJSON(t, db) : null));
        player.activePokemonIndex = json.activePokemonIndex;
        return player;
    }
}


// Single Tone.js initialisation; semantic play(action) API

class AudioManager {
    constructor() {
        this._ready = false;
        this._synth = null;
        this._noise = null;
        this._poly = null;
    }

    /** Lazy-initialise Tone.js on the first user interaction. */
    init() {
        if (this._ready) return;
        this._synth = new Tone.Synth().toDestination();
        this._noise = new Tone.NoiseSynth({
            noise: { type: 'pink' },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0 }
        }).toDestination();
        this._poly = new Tone.PolySynth(Tone.Synth).toDestination();
        this._ready = true;
    }

    /**
     * DRY: single entry-point replaces 8 standalone play* functions.
     * @param {'click'|'attack'|'status'|'confirm'|'error'|'heal'|'faint'|'evolve'} action
     */
    play(action) {
        if (!this._ready) return;
        const actions = {
            click: () => this._synth.triggerAttackRelease('C5', '8n'),
            attack: () => this._noise.triggerAttackRelease('0.1'),
            status: () => this._poly.triggerAttackRelease(['E5', 'G#5'], '16n'),
            confirm: () => this._poly.triggerAttackRelease(['C4', 'G4'], '8n'),
            error: () => this._synth.triggerAttackRelease('F#3', '8n'),
            heal: () => this._poly.triggerAttackRelease(['C5', 'E5', 'G5'], '8n'),
            faint: () => this._synth.triggerAttackRelease('C3', '4n'),
            evolve: () => this._poly.triggerAttackRelease(['C4', 'E4', 'G4', 'C5'], '4n'),
        };
        actions[action]?.();
    }

    /** Play a Pokémon's cry audio file. */
    playCry(pokemon) {
        if (!pokemon?.cry) return;
        const audio = new Audio(pokemon.cry);
        audio.volume = 0.4;
        audio.play().catch(e => console.warn('Cry audio failed:', e));
    }
}


// Pure damage calculations — no DOM, no side-effects, fully unit-testable

class BattleEngine {
    constructor(chart) {
        this._chart = chart;
    }

    /**
     * Calculate the combined type-effectiveness multiplier.
     * Handles dual-types by multiplying per defending type.
     * @param {string}   moveType      - e.g. 'Fire'
     * @param {string[]} defenderTypes - e.g. ['Grass', 'Poison']
     * @returns {number}
     */
    getTypeEffectiveness(moveType, defenderTypes) {
        return defenderTypes.reduce((multiplier, defType) => {
            const chart = this._chart[moveType];
            return (chart && chart[defType] !== undefined)
                ? multiplier * chart[defType]
                : multiplier;
        }, 1);
    }

    /**
     * Calculate final damage dealt.
     * Uses the stat difference formula and applies the type effectiveness multiplier.
     * Fixes the double-count bug from the original handleAttack() at lines 1636-1637.
     *
     * @param {Pokemon} attacker
     * @param {Pokemon} defender
     * @param {number}  movePower  - Capped externally to [1, 1000]
     * @param {string}  moveType   - e.g. 'Fire'
     * @param {'physical'|'special'} attackType
     * @returns {{ damage: number, effectiveness: number }}
     */
    calculateDamage(attacker, defender, movePower, moveType, attackType) {
        const effectiveness = this.getTypeEffectiveness(moveType, defender.types);

        // Immune types always deal 0 damage.
        if (effectiveness === 0) return { damage: 0, effectiveness: 0 };

        const offStat = attackType === 'physical'
            ? attacker.getEffectiveStat('attack')
            : attacker.getEffectiveStat('specialAttack');
        const defStat = attackType === 'physical'
            ? defender.getEffectiveStat('defence')
            : defender.getEffectiveStat('specialDefence');

        const statDifference = offStat - defStat;

        // Only deal damage when the attacker has a stat advantage.
        const damage = statDifference > 0
            ? Math.max(1, Math.floor(movePower * effectiveness * statDifference / 100))
            : 0;

        return { damage, effectiveness };
    }
}


// RingBuffer-backed, DOM-rendered log with export

class BattleLog {
    constructor(capacity = 200) {
        this._buffer = new RingBuffer(capacity);
        this._gameStateRef = null;  // Set by PokemonBattleArena.init()
    }

    /** @param {object} gameState - Reference used during export. */
    linkGameState(gameState) { this._gameStateRef = gameState; }

    /**
     * Add an entry. DRY: replaces the scattered battleLog.add() calls.
     * @param {string} message
     * @param {'action'|'damage'|'heal'|'status'|'round'|'system'} type
     */
    add(message, type = 'action') {
        const timestamp = new Date().toLocaleTimeString('en-US', {
            hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        this._buffer.push({
            timestamp,
            message: escapeHTML(message),
            type,
            id: `${Date.now()}-${Math.random()}`
        });
        this._render();
    }

    _render() {
        const logDiv = document.getElementById('battle-log');
        if (!logDiv) return;
        const entries = this._buffer.toArray();
        logDiv.innerHTML = entries.length
            ? entries.map(e => `<div class="log-entry-${e.type}">${e.message}</div>`).join('')
            : '<div class="text-slate-500">[SYSTEM] No actions yet...</div>';
        logDiv.scrollTop = logDiv.scrollHeight;
    }

    loadLogs(logs) {
        this._buffer.clear();
        logs.forEach(msg => this._buffer.push(msg));
        this._render();
    }

    clear() {
        if (!confirm('Clear the entire battle log? This cannot be undone.')) return;
        this._buffer.clear();
        this._render();
        this.add('Battle log cleared.', 'system');
    }

    export() {
        if (this._buffer.size === 0) return;
        const gs = this._gameStateRef;
        const header = `POKÉMON BATTLE ARENA — BATTLE LOG
Generated : ${new Date().toLocaleString()}
Round     : ${gs ? gs.round : '?'}
Weather   : ${gs ? gs.weather : '?'}
Players   : ${gs ? gs.players.length : '?'}
${'='.repeat(40)}\n\n`;
        const body = this._buffer.toArray().map(e => `[${e.timestamp}] ${e.message}`).join('\n');
        const blob = new Blob([header + body], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = Object.assign(document.createElement('a'), {
            href: url, download: `battle-log-${new Date().toISOString().slice(0, 10)}.txt`
        });
        a.click();
        URL.revokeObjectURL(url);
    }
}


// Undo/redo using proper toJSON/fromJSON round-trip (no JSON.stringify hack)

class HistoryManager {
    constructor(maxHistory = 30) {
        this._past = [];
        this._future = [];
        this._maxHistory = maxHistory;
    }

    /**
     * Capture a serialised snapshot of the current game state.
     * @param {object} gameState
     */
    snapshot(gameState) {
        const snap = this._serialise(gameState);
        this._past.push(snap);
        if (this._past.length > this._maxHistory) this._past.shift(); // O(1) for small arrays; use deque for large ones
        this._future = [];  // Any new action clears the redo branch.
        this._updateButtons();
    }

    /**
     * Restore the previous state.
     * @param {object}          gameState
     * @param {PokemonDatabase} db
     * @returns {boolean}
     */
    undo(gameState, db) {
        if (this._past.length === 0) return false;
        this._future.push(this._serialise(gameState));
        this._restore(gameState, this._past.pop(), db);
        this._updateButtons();
        return true;
    }

    /**
     * Restore the next state.
     * @param {object}          gameState
     * @param {PokemonDatabase} db
     * @returns {boolean}
     */
    redo(gameState, db) {
        if (this._future.length === 0) return false;
        this._past.push(this._serialise(gameState));
        if (this._past.length > this._maxHistory) this._past.shift();
        this._restore(gameState, this._future.pop(), db);
        this._updateButtons();
        return true;
    }

    /** Serialise the game state to a plain-object snapshot. */
    _serialise(gs) {
        return {
            players: gs.players.map(p => p.toJSON()),
            round: gs.round,
            weather: gs.weather,
            activeTurnPlayerId: gs.activeTurnPlayerId,
            selectedAttackTargetId: gs.selectedAttackTargetId,
            selectedStatusTargetId: gs.selectedStatusTargetId,
            timestamp: Date.now()
        };
    }

    /** Restore a serialised snapshot back into the live gameState. */
    _restore(gs, snap, db) {
        gs.players = snap.players.map(d => Player.fromJSON(d, db));
        gs.round = snap.round;
        gs.weather = snap.weather;
        gs.activeTurnPlayerId = snap.activeTurnPlayerId;
        gs.selectedAttackTargetId = snap.selectedAttackTargetId;
        gs.selectedStatusTargetId = snap.selectedStatusTargetId;
    }

    _updateButtons() {
        const undoBtn = document.getElementById('undo-btn');
        const redoBtn = document.getElementById('redo-btn');
        if (undoBtn) {
            undoBtn.disabled = this._past.length === 0;
            undoBtn.title = this._past.length > 0
                ? `Undo (${this._past.length} action(s) available)`
                : 'Nothing to undo';
        }
        if (redoBtn) {
            redoBtn.disabled = this._future.length === 0;
            redoBtn.title = this._future.length > 0
                ? `Redo (${this._future.length} action(s) available)`
                : 'Nothing to redo';
        }
    }

    clear() { this._past = []; this._future = []; this._updateButtons(); }
    get canUndo() { return this._past.length > 0; }
    get canRedo() { return this._future.length > 0; }
}


// Central registry; replaces 20+ scattered toggleModal() calls

class ModalManager {
    constructor() {
        this._registry = new Map(); // name → HTMLElement
    }

    /** Register a modal by semantic name. */
    register(name, el) {
        if (el) this._registry.set(name, el);
    }

    open(name) { this._registry.get(name)?.classList.add('visible'); }
    close(name) { this._registry.get(name)?.classList.remove('visible'); }

    /** Close all open modals. Used by the Escape key handler. */
    closeAll() {
        for (const el of this._registry.values()) el.classList.remove('visible');
    }

    isOpen(name) { return this._registry.get(name)?.classList.contains('visible') ?? false; }
    anyOpen() { return [...this._registry.values()].some(el => el.classList.contains('visible')); }
}


// Round timer encapsulated in its own class

class Timer {
    constructor(seconds = 120) {
        this._default = seconds;
        this.timeLeft = seconds;
        this.isRunning = false;
        this._interval = null;
        this._displayEl = null;
    }

    linkDisplay(el) { this._displayEl = el; }

    start(onTick) {
        if (this.isRunning) return;
        this.isRunning = true;
        this._interval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
                this._updateDisplay();
                if (onTick) onTick(this.timeLeft);
            } else {
                this.pause();
            }
        }, 1000);
    }

    pause() {
        this.isRunning = false;
        clearInterval(this._interval);
    }

    reset() {
        this.pause();
        this.timeLeft = this._default;
        this._updateDisplay();
    }

    _updateDisplay() {
        if (!this._displayEl) return;
        const m = Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
        const s = (this.timeLeft % 60).toString().padStart(2, '0');
        this._displayEl.textContent = `${m}:${s}`;
        this._displayEl.classList.toggle('low-time', this.timeLeft <= 10 && this.timeLeft > 0);
    }
}


// All DOM creation and updates — zero game logic

class UIRenderer {
    /**
     * @param {object}           gameState
     * @param {PokemonBattleArena} arena    - For callbacks (openTeamManager, editHP, etc.)
     */
    constructor(gameState, arena) {
        this._gs = gameState;
        this._arena = arena;
        this._playerGrid = document.getElementById('player-grid');
    }

    // ── Gauge generation ─────────────────────────────────────────────

    /**
     * Generate 60 gauge-segment HTML with HP-aware dimming.
     * Segments at or below the active threshold render at full opacity;
     * segments above it (lost HP) render dim so the arc visually shrinks.
     * @param {number} pct - HP percentage 0.0 to 1.0
     */
    _buildGaugeHTML(pct) {
        const colors = [
            'var(--hp-color-red)', 'var(--hp-color-orange)', 'var(--hp-color-yellow-orange)',
            'var(--hp-color-yellow)', 'var(--hp-color-yellow-green)', 'var(--hp-color-green)'
        ];
        const total = 60, span = 270, start = -135;
        const activeCount = Math.max(1, Math.round(pct * total));
        let html = '';
        for (let i = 0; i < total; i++) {
            const color = colors[Math.floor(i / (total / colors.length))];
            const rotation = start + (i / (total - 1)) * span;
            const active = i < activeCount;
            const opacity = active ? '1' : '0.12';
            html += '<div class="hp-segment-rotator" style="transform:rotate(' + rotation + 'deg);">'
                + '<div class="hp-segment-visual" style="background-color:' + color + ';opacity:' + opacity + ';"></div>'
                + '</div>';
        }
        return html;
    }

    // ── Full re-render ───────────────────────────────────────────────

    renderAll() {
        this._renderPlayerCards();
        this._updateControlPanel();
        this._updateWeatherView();
        const btn = document.getElementById('end-round-btn');
        if (btn) btn.textContent = `END ROUND ${this._gs.round}`;
    }

    // ── Player cards ─────────────────────────────────────────────────

    _renderPlayerCards() {
        this._playerGrid.innerHTML = '';
        this._gs.players.forEach(p => this._playerGrid.appendChild(this._createPlayerCard(p)));
        for (let i = this._gs.players.length; i < 6; i++) {
            this._playerGrid.appendChild(this._createEmptyCard());
        }
        lucide.createIcons();
    }

    _createEmptyCard() {
        const card = document.createElement('div');
        card.className = 'player-card p-4 flex flex-col items-center justify-center h-full text-gray-500 border-dashed';
        card.innerHTML = `<div class="text-center">
            <i data-lucide="user-plus" class="w-16 h-16 mx-auto"></i>
            <p class="mt-2">EMPTY SLOT</p>
        </div>`;
        return card;
    }

    _createPlayerCard(player) {
        const card = document.createElement('div');
        card.className = 'player-card p-4 flex flex-col items-center justify-between h-full';
        card.id = `player-card-${player.id}`;
        card.dataset.playerId = player.id;

        card.classList.toggle('active-turn', player.id === this._gs.activeTurnPlayerId);
        card.classList.toggle('selected-target', player.id === this._gs.selectedAttackTargetId);
        card.classList.toggle('selected-status-target', player.id === this._gs.selectedStatusTargetId);

        const pokemon = player.getActivePokemon();
        if (!pokemon) {
            card.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-center">
                    <h3 class="font-bold text-2xl text-gray-400">${escapeHTML(player.name)}</h3>
                    <p class="text-sm text-gray-500 mt-4">No active Pokémon.</p>
                    <button onclick="window.openTeamManager(${player.id})"
                            class="w-full mt-4 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs">
                        Manage Team
                    </button>
                </div>`;
            return card;
        }

        // Tier-based visual treatment
        const tier = (pokemon.tier || '').toLowerCase();
        if (tier.includes('legendary') || tier.includes('mythical') ||
            tier.includes('ultra beast') || tier.includes('mega') || tier.includes('gmax')) {
            card.classList.add('holo-gold');
        } else if (tier === 'final') {
            card.classList.add('holo-silver');
        }
        card.classList.add(`tier-border-${tier.replace(/ /g, '-')}`);
        if (pokemon.isFainted()) card.classList.add('opacity-50', 'bg-red-900/30');

        // HP gauge needle rotation
        const pct = pokemon.getHPPercent();
        const span = 270, startAngle = -135;
        const needleAngle = Math.max(startAngle, Math.min(startAngle + span,
            startAngle + pct * span));

        card.innerHTML = `
            <div class="entry-animation-container"></div>
            ${player.id === this._gs.activeTurnPlayerId
                ? '<div class="turn-indicator-arrow"><i data-lucide="chevrons-down" class="w-8 h-8"></i></div>'
                : ''}
            <div class="w-full flex-shrink-0">
                <div class="w-full flex justify-between items-start gap-2 min-w-0">
                    <h2 class="font-bold card-trainer-name" title="${escapeHTML(player.name)}">${escapeHTML(player.name)}</h2>
                    <div class="flex gap-2">
                        <button onclick="window.removePlayer(${player.id})"
                                class="text-red-400 hover:text-red-300 transition-colors" title="Remove Player">
                            <i data-lucide="user-x" class="w-4 h-4"></i>
                        </button>
                        <button onclick="window.openTeamManager(${player.id})"
                                class="text-slate-400 hover:text-white transition-colors" title="Manage Team">
                            <i data-lucide="settings-2" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
                <h3 class="font-bold card-pokemon-name">${escapeHTML(pokemon.fullName)}</h3>
                <p class="pokemon-tier">${pokemon.tier || 'Unknown'}</p>
                <div class="flex justify-center gap-2 mt-1">
                    ${this._renderTypeBadges(pokemon.types)}
                </div>
            </div>
            <div class="flex flex-col items-center justify-center flex-grow min-h-0">
                <div class="relative">
                    <img src="${pokemon.sprite}"
                         onerror="this.onerror=null;this.src='https://placehold.co/96x96/000000/FFFFFF?text=?';"
                         alt="${escapeHTML(pokemon.fullName)}"
                         class="pokemon-sprite ${pokemon.isFainted() ? 'grayscale' : ''}">
                    ${pokemon.isFainted()
                ? '<div class="absolute inset-0 flex items-center justify-center"><span class="text-red-500 text-2xl font-bold -rotate-12 bg-black/50 px-2">FAINTED</span></div>'
                : ''}
                    <div class="absolute top-0 right-0 flex flex-col gap-1">
                        ${this._renderStatusIcons(pokemon)}
                    </div>
                </div>
                <div class="hp-gauge-container">
                    <div class="hp-gauge-segments-container">${this._buildGaugeHTML(pct)}</div>
                    <div class="hp-gauge-pivot"></div>
                    <div class="hp-gauge-needle" style="transform:rotate(${needleAngle}deg);"></div>
                    <div class="hp-gauge-center" onclick="window.editHP(${player.id})">
                        <div class="current-hp">${pokemon.currentHP}</div>
                        <div class="max-hp">${pokemon.maxHp}</div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 grid-rows-2 text-center w-full card-stat-grid flex-shrink-0">
                ${this._renderStatHeaders(pokemon)}
                ${this._renderStatValues(pokemon)}
            </div>
            <div class="grid grid-cols-6 gap-1 w-full flex-shrink-0 card-team-row">
                ${this._renderTeamIcons(player)}
            </div>`;

        return card;
    }

    /** DRY: Renders type badge HTML — used by createPlayerCard. */
    _renderTypeBadges(types) {
        return types.map(t =>
            `<span class="type-badge" style="background-color:var(--type-${t.toLowerCase()})">${t.toUpperCase()}</span>`
        ).join('');
    }

    /** DRY: Renders status condition icons from the Pokemon's statuses object. */
    _renderStatusIcons(pokemon) {
        const iconMap = {
            poison: { icon: 'skull', color: 'text-purple-400' },
            bad_poison: { icon: 'skull', color: 'text-purple-400' },
            burn: { icon: 'flame', color: 'text-orange-400' },
            paralyze: { icon: 'zap', color: 'text-yellow-400' },
            curse: { icon: 'ghost', color: 'text-indigo-400' },
        };
        return Object.keys(pokemon.statuses)
            .filter(s => iconMap[s])
            .map(s => `<i data-lucide="${iconMap[s].icon}" class="w-5 h-5 ${iconMap[s].color}"></i>`)
            .join('');
    }

    /** Stat header row icons (Attack, Defense, SpA, SpD, Speed). */
    _renderStatHeaders(pokemon) {
        const isParalyzed = pokemon.hasStatus('paralyze');
        return [
            `<div class="flex justify-center items-center" title="Attack"><i data-lucide="sword"></i></div>`,
            `<div class="flex justify-center items-center" title="Defense"><i data-lucide="shield"></i></div>`,
            `<div class="flex justify-center items-center" title="Special Attack"><i data-lucide="swords"></i></div>`,
            `<div class="flex justify-center items-center" title="Special Defense"><i data-lucide="shield-check"></i></div>`,
            `<div class="flex justify-center items-center ${isParalyzed ? 'stat-paralyzed' : ''}" title="Speed"><i data-lucide="zap"></i></div>`,
        ].join('');
    }

    /** Stat value row. Applies colour coding for modifiers. */
    _renderStatValues(pokemon) {
        const isParalyzed = pokemon.hasStatus('paralyze');
        return Object.entries(pokemon.stats)
            .filter(([key]) => key !== 'hp')
            .map(([key]) => {
                const mod = pokemon.statModifiers[key] || 0;
                let colorClass = mod > 0 ? 'text-green-400' : mod < 0 ? 'text-red-400' : '';
                if (key === 'speed' && isParalyzed) colorClass = 'stat-paralyzed';
                const effective = key === 'speed' && isParalyzed
                    ? Math.floor(pokemon.getEffectiveStat('speed') / 2)
                    : pokemon.getEffectiveStat(key);
                return `<div class="${colorClass}">${effective}</div>`;
            }).join('');
    }

    /** Team icon row — Pokéballs clickable to switch active Pokémon. */
    _renderTeamIcons(player) {
        return player.team.map((p, i) => {
            const isActive = i === player.activePokemonIndex;
            const isFainted = p && p.isFainted();
            const src = p ? p.sprite
                : (isFainted
                    ? 'https://img.pokemondb.net/sprites/items/luxury-ball.png'
                    : 'https://img.pokemondb.net/sprites/items/poke-ball.png');
            const border = isActive ? 'border-2 border-yellow-400' : 'border-2 border-slate-600';
            return `<img src="${src}" title="${p ? escapeHTML(p.fullName) : 'Empty'}"
                         class="w-12 h-12 team-pokeball bg-slate-800 p-1 ${border} ${isFainted ? 'grayscale' : ''}"
                         onclick="window.handleTeamIconClick(${player.id}, ${i})">`;
        }).join('');
    }

    // ── Control panel ──────────────────────────────────────────────────

    /**
     * DRY: Populates any <select> element without copy-paste.
     * Replaces the original's four nearly-identical dropdown rebuild blocks.
     *
     * @param {HTMLSelectElement} selectEl
     * @param {any[]}             items
     * @param {Function}          valueFn   - item → option value
     * @param {Function}          labelFn   - item → option label
     * @param {string}            placeholder
     */
    populateDropdown(selectEl, items, valueFn, labelFn, placeholder) {
        const saved = selectEl.value;
        selectEl.innerHTML = `<option value="">${placeholder}</option>`;
        items.forEach(item => selectEl.add(new Option(labelFn(item), valueFn(item))));
        // Reapply the previously selected value if it's still valid.
        if ([...selectEl.options].some(o => o.value === saved)) selectEl.value = saved;
    }

    _updateControlPanel() {
        const gs = this._gs;
        const allActive = gs.players.filter(p => p.getActivePokemon());
        const nonFainted = allActive.filter(p => !p.getActivePokemon().isFainted());
        const hasPlayers = nonFainted.length > 0;

        const attackerSel = document.getElementById('attacker-select');
        const attackTargetSel = document.getElementById('attack-target-select');
        const statusTargetSel = document.getElementById('status-target-select');
        const mgmtSel = document.getElementById('management-pokemon-select');

        // Enable/disable controls.
        [
            attackerSel, attackTargetSel, statusTargetSel,
            document.getElementById('end-round-btn'),
            document.getElementById('update-stat-btn')
        ].forEach(el => el && (el.disabled = !hasPlayers));
        if (mgmtSel) mgmtSel.disabled = allActive.length === 0;

        // DRY: four dropdowns built with the same helper.
        const pLabel = p => `${p.name} - ${p.getActivePokemon().fullName}`;
        this.populateDropdown(attackerSel, nonFainted, p => p.id, pLabel, '-- Attacker --');
        this.populateDropdown(attackTargetSel, nonFainted, p => p.id, pLabel, '-- Target --');
        this.populateDropdown(statusTargetSel, nonFainted, p => p.id, pLabel, '-- Player --');

        // Management: includes fainted Pokémon for revive.
        this.populateDropdown(mgmtSel, allActive,
            p => `${p.id}-${p.activePokemonIndex}`,
            p => {
                const pk = p.getActivePokemon();
                return `${p.name} - ${pk.fullName}${pk.isFainted() ? ' (FNT)' : ''}`;
            },
            '-- Pokémon --'
        );

        this._updateStatusButtonStyles();
        this._updateManagementButtons();
    }

    _updateWeatherView() {
        const w = this._gs.weather;
        document.getElementById('sandstorm-overlay')?.classList.toggle('hidden', w !== 'sandstorm');
        document.getElementById('hail-overlay')?.classList.toggle('hidden', w !== 'hail');

        const btn = document.getElementById('weather-btn');
        if (btn) {
            const shortNames = { none: 'Wth: None', sun: 'Wth: Sun', rain: 'Wth: Rain', sandstorm: 'Wth: Sand', hail: 'Wth: Hail' };
            btn.textContent = shortNames[w] || 'Wth';

            btn.className = 'p-1 border border-black text-xs font-bold transition-colors shadow-inner ' +
                (w === 'none' ? 'bg-slate-600 hover:bg-slate-700 text-white' :
                    w === 'sun' ? 'bg-yellow-500 hover:bg-yellow-600 text-black' :
                        w === 'rain' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                            w === 'sandstorm' ? 'bg-amber-600 hover:bg-amber-700 text-white' :
                                'bg-cyan-200 hover:bg-cyan-300 text-black');
        }
    }

    _updateStatusButtonStyles() {
        const targetId = parseInt(document.getElementById('status-target-select')?.value);
        const player = this._gs.players.find(p => p.id === targetId);
        const statuses = player?.getActivePokemon()?.statuses ?? {};
        document.querySelectorAll('.status-btn').forEach(btn => {
            if (btn.dataset.status) {
                btn.classList.toggle('status-button-active', !!statuses[btn.dataset.status]);
            }
        });
    }

    _updateManagementButtons() {
        const sel = document.getElementById('management-pokemon-select');
        const evolveBtn = document.getElementById('evolve-btn');
        const formBtn = document.getElementById('change-form-btn');
        const reviveBtn = document.getElementById('revive-btn');
        if (!sel || !evolveBtn || !formBtn || !reviveBtn) return;

        evolveBtn.disabled = true;
        formBtn.disabled = true;
        reviveBtn.disabled = true;

        if (!sel.value) return;
        const [pid, sid] = sel.value.split('-').map(Number);
        const player = this._gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon) return;

        reviveBtn.disabled = !pokemon.isFainted();
        if (!pokemon.isFainted()) {
            evolveBtn.disabled = !(pokemon.data?.evolutions?.some(e => e?.Name));
            const base = pokemon.baseData || pokemon.data;
            const otherForms = [base, ...Object.values(base.forms || {})]
                .filter(f => f?.Name && f.Name !== pokemon.fullName);
            formBtn.disabled = otherForms.length === 0;
        }
    }
}


// ============================================
// MULTIPLAYER CONFIGURATION
// ============================================
// Auto-detect: in production, use the current page origin (since server.js
// serves both the frontend and the Socket.IO backend on the same port).
// In local dev, fall back to localhost:3001.
const SOCKET_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:3001'
    : window.location.origin;

// ============================================
// MULTIPLAYER MANAGER CLASS
// ============================================

class MultiplayerManager {
    constructor(arena) {
        this.arena = arena;
        this.socket = null;
        this.roomCode = null;
        this.playerId = null;
        this.isHost = false;
        this.isConnected = false;
        this.mode = 'offline'; // 'offline', 'creating', 'joining', 'playing'
    }

    connect() {
        if (this.socket) return;
        console.log('[MULTIPLAYER] Connecting to server:', SOCKET_URL);
        this.socket = io(SOCKET_URL, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5
        });
        this.setupEventListeners();
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
        }
    }

    setupEventListeners() {
        this.socket.on('connect', () => {
            console.log('[MULTIPLAYER] Connected to server');
            this.isConnected = true;
            this.playerId = this.socket.id;
            this.showNotification('Connected to server', 'success');
        });

        this.socket.on('disconnect', () => {
            console.log('[MULTIPLAYER] Disconnected from server');
            this.isConnected = false;
            this.showNotification('Disconnected from server', 'error');
        });

        this.socket.on('connect_error', (error) => {
            console.error('[MULTIPLAYER] Connection error:', error);
            this.showNotification('Connection failed. Server may be sleeping (wait 30s)', 'error');
        });

        this.socket.on('room:info', (data) => {
            console.log('[MULTIPLAYER] Room info:', data);
            this.updateRoomUI(data);
        });

        this.socket.on('room:playerJoined', (data) => {
            console.log('[MULTIPLAYER] Player joined:', data);
            this.showNotification(`${data.playerName} joined the room`, 'info');
        });

        this.socket.on('room:playerLeft', (data) => {
            console.log('[MULTIPLAYER] Player left:', data);
            this.showNotification(`${data.playerName} left the room`, 'info');
        });

        this.socket.on('room:closed', (data) => {
            console.log('[MULTIPLAYER] Room closed:', data);
            this.showNotification(data.reason, 'error');
            this.leaveRoom();
        });

        this.socket.on('game:started', (data) => {
            console.log('[MULTIPLAYER] Game started:', data);
            this.mode = 'playing';

            // Close ALL modals (lobby, create room, join room)
            this.arena.modals.close('multiplayerLobby');
            const lobbyModal = document.getElementById('multiplayer-lobby-modal');
            if (lobbyModal) lobbyModal.classList.remove('visible');

            // Also close the create/join room modals if still open
            const roomModal = document.getElementById('room-modal');
            if (roomModal) roomModal.classList.remove('visible');
            const joinModal = document.getElementById('join-modal');
            if (joinModal) joinModal.classList.remove('visible');

            // === CRITICAL: Transition from lobby-view to arena-view ===
            // This is the same transition that "Quick Battle" triggers via enterBattleArena()
            const lobbyView = document.getElementById('lobby-view');
            const arenaView = document.getElementById('arena-view');
            const loadingScreen = document.getElementById('loading-screen');

            if (loadingScreen) loadingScreen.classList.remove('hidden');

            setTimeout(() => {
                if (lobbyView) lobbyView.classList.add('hidden');
                if (arenaView) arenaView.classList.remove('hidden');
                if (loadingScreen) loadingScreen.classList.add('hidden');

                // Apply the synced game state if provided
                if (data.gameState) {
                    this.receiveGameState(data.gameState);
                }

                // Notify players the battle has started
                this.arena.log.add('🎮 Multiplayer game started! All players connected.', 'system');
                this.arena.renderer.renderAll();
                this.showNotification('Game started! Battle begins!', 'success');
            }, 1500);
        });

        this.socket.on('game:update', (data) => {
            console.log('[MULTIPLAYER] Game update from:', data.from);
            if (data.gameState) {
                this.receiveGameState(data.gameState);
            }
        });

        this.socket.on('game:action', (data) => {
            console.log('[MULTIPLAYER] Action from:', data.from, data.action);
            this.handleRemoteAction(data.action, data.payload);
        });

        this.socket.on('chat:message', (data) => {
            console.log('[MULTIPLAYER] Chat:', data);
            this.displayChatMessage(data);
        });
    }

    createRoom(playerName) {
        if (!this.isConnected) {
            this.showNotification('Not connected to server', 'error');
            return;
        }
        this.socket.emit('room:create', { playerName }, (response) => {
            if (response.success) {
                this.roomCode = response.roomCode;
                this.playerId = response.playerId;
                this.isHost = true;
                this.mode = 'creating';
                console.log('[MULTIPLAYER] Room created:', this.roomCode);
                this.showNotification(`Room created: ${this.roomCode}`, 'success');
                this.showRoomLobby();
            } else {
                console.error('[MULTIPLAYER] Failed to create room:', response.error);
                this.showNotification(`Error: ${response.error}`, 'error');
            }
        });
    }

    joinRoom(roomCode, playerName) {
        if (!this.isConnected) {
            this.showNotification('Not connected to server', 'error');
            return;
        }
        this.socket.emit('room:join', { roomCode, playerName }, (response) => {
            if (response.success) {
                this.roomCode = response.roomCode;
                this.playerId = response.playerId;
                this.isHost = false;
                this.mode = 'joining';
                console.log('[MULTIPLAYER] Joined room:', this.roomCode);
                this.showNotification('Joined room successfully', 'success');
                this.showRoomLobby();
            } else {
                console.error('[MULTIPLAYER] Failed to join room:', response.error);
                this.showNotification(`Error: ${response.error}`, 'error');
            }
        });
    }

    leaveRoom() {
        this.roomCode = null;
        this.isHost = false;
        this.mode = 'offline';
        this.arena.modals.close('multiplayerLobby');
    }

    toggleReady() {
        if (!this.roomCode) return;
        this.socket.emit('player:ready', {}, (response) => {
            if (response.success) {
                console.log('[MULTIPLAYER] Ready status:', response.isReady);
            }
        });
    }

    startGame() {
        if (!this.isHost) {
            this.showNotification('Only the host can start the game', 'error');
            return;
        }
        const serializedState = this.serializeGameState();
        this.socket.emit('game:start', { gameState: serializedState }, (response) => {
            if (response.success) {
                console.log('[MULTIPLAYER] Game starting...');
            } else {
                this.showNotification(`Error: ${response.error}`, 'error');
            }
        });
    }

    sendGameState() {
        console.log('[MULTIPLAYER] sendGameState called. roomCode:', this.roomCode, 'mode:', this.mode);
        if (!this.roomCode || this.mode !== 'playing') {
            console.log('[MULTIPLAYER] sendGameState SKIPPED (guard failed)');
            return;
        }
        try {
            const gameState = this.serializeGameState();
            console.log('[MULTIPLAYER] Serialized state - players:', gameState.players?.length, 'round:', gameState.round);
            this.socket.emit('game:sync', { gameState }, (response) => {
                if (!response || !response.success) {
                    console.error('[MULTIPLAYER] Failed to sync game state', response);
                } else {
                    console.log('[MULTIPLAYER] Game state synced successfully');
                }
            });
        } catch (err) {
            console.error('[MULTIPLAYER] Error serializing game state:', err);
        }
    }

    receiveGameState(gameState) {
        console.log('[MULTIPLAYER] receiveGameState called. Players:', gameState?.players?.length, 'Round:', gameState?.round);
        try {
            this.deserializeGameState(gameState);
            this.arena.renderer.renderAll();
            console.log('[MULTIPLAYER] Game state applied and rendered successfully');
        } catch (err) {
            console.error('[MULTIPLAYER] Error deserializing game state:', err);
        }
    }

    sendAction(action, payload) {
        if (!this.roomCode || this.mode !== 'playing') return;
        this.socket.emit('game:action', { action, payload });
    }

    handleRemoteAction(action, payload) {
        switch (action) {
            case 'attack':
                break;
            case 'heal':
                break;
            case 'statusEffect':
                break;
            default:
                console.warn('[MULTIPLAYER] Unknown action:', action);
        }
    }

    serializeGameState() {
        const gs = this.arena.gs;
        return {
            players: gs.players.map(p => p.toJSON()),
            round: gs.round,
            weather: gs.weather,
            activeTurnPlayerId: gs.activeTurnPlayerId,
            selectedAttackTargetId: gs.selectedAttackTargetId,
            selectedStatusTargetId: gs.selectedStatusTargetId,
            logs: this.arena.log._buffer.toArray()
        };
    }

    deserializeGameState(state) {
        const gs = this.arena.gs;
        gs.players = state.players.map(p => Player.fromJSON(p, this.arena.db));
        gs.round = state.round;
        gs.weather = state.weather;
        gs.activeTurnPlayerId = state.activeTurnPlayerId;
        gs.selectedAttackTargetId = state.selectedAttackTargetId;
        gs.selectedStatusTargetId = state.selectedStatusTargetId;
        
        if (state.logs && state.logs.length > 0) {
            this.arena.log.loadLogs(state.logs);
        }
    }

    showRoomLobby() {
        this.arena.modals.open('multiplayerLobby');
        const codeDisplay = document.getElementById('room-code-display');
        if (codeDisplay) {
            codeDisplay.textContent = this.roomCode;
        }
    }

    updateRoomUI(data) {
        const playerList = document.getElementById('room-player-list');
        if (!playerList) return;
        playerList.innerHTML = data.players.map(p => `
            <div class="player-item ${p.isHost ? 'host' : ''}">
                <span class="player-name">${p.name}</span>
                ${p.isHost ? '<span class="host-badge">HOST</span>' : ''}
                ${p.isReady ? '<span class="ready-badge">READY</span>' : ''}
            </div>
        `).join('');
        const startBtn = document.getElementById('start-game-btn');
        if (startBtn) {
            startBtn.style.display = this.isHost ? 'block' : 'none';
        }
    }

    showNotification(message, type = 'info') {
        this.arena._announce(message, type === 'error');
    }

    displayChatMessage(data) {
        const message = `[CHAT] ${data.playerName}: ${data.message}`;
        this.arena.log.add(message, 'system');
    }
}


// Wires all services; handles all user interactions

class PokemonBattleArena {
    constructor() {
        // Services
        this.audio = new AudioManager();
        this.db = new PokemonDatabase(window.MergedPokemonData || {});
        this.engine = new BattleEngine(typeChart);
        this.log = new BattleLog(200);
        this.history = new HistoryManager(30);
        this.modals = new ModalManager();
        this.timer = new Timer(120);
        this.multiplayer = new MultiplayerManager(this);

        // Game state — plain object so it remains JSON-serialisable by HistoryManager.
        this.gs = {
            players: [],
            round: 1,
            weather: 'none',
            activeTurnPlayerId: null,
            selectedAttackTargetId: null,
            selectedStatusTargetId: null,
            currentEditing: { playerId: null, slotId: null },
            currentHPEdit: null,
        };

        // Renderer (needs a reference back to arena for onclick callbacks).
        this.renderer = new UIRenderer(this.gs, this);
    }

    // ── Bootstrap ─────────────────────────────────────────────────────────

    init() {
        if (Object.keys(this.db._raw).length === 0) {
            this._announce('Error: Pokémon data file not found or empty.', true);
            return;
        }

        document.body.addEventListener('click', () => Tone.start(), { once: true });
        document.body.addEventListener('click', () => this.audio.init(), { once: true });

        this.db.buildIndex();
        // gauge now generated dynamically per-render
        this.log.linkGameState(this.gs);

        this._registerModals();
        this._prepopulate();
        this._populateMoveTypeSelector();
        this._setupEventListeners();
        this._setupKeyboardShortcuts();
        this._setupMultiplayerUI();

        this.renderer.renderAll();
        lucide.createIcons();
        this._setArena('Normal');
        this.history._updateButtons();
        this.log.add('Battle arena initialised. 6 trainers ready!', 'system');

        // Expose callbacks used by inline HTML onclick attributes.
        window.openTeamManager = id => this.openTeamManager(id);
        window.handleTeamIconClick = (pid, sid) => this.handleTeamIconClick(pid, sid);
        window.editHP = id => this.editHP(id);
        window.removePlayer = id => this.removePlayer(id);
    }

    _setupMultiplayerUI() {
        // Expose methods to global scope for HTML buttons in index.html
        window.createMultiplayerRoom = () => {
            const name = prompt('Enter your trainer name (Host):');
            if (name) {
                this.multiplayer.connect();
                setTimeout(() => this.multiplayer.createRoom(name), 500);
            }
        };

        window.joinMultiplayerRoom = () => {
            const code = prompt('Enter the 6-digit room code:');
            const name = prompt('Enter your trainer name:');
            if (code && name) {
                this.multiplayer.connect();
                setTimeout(() => this.multiplayer.joinRoom(code.toUpperCase(), name), 500);
            }
        };
    }

    _registerModals() {
        [
            ['team', 'team-modal'],
            ['selection', 'selection-modal'],
            ['hpEdit', 'hp-edit-modal'],
            ['confirm', 'confirm-modal'],
            ['multiplayerLobby', 'multiplayer-lobby-modal'],
        ].forEach(([name, id]) => this.modals.register(name, document.getElementById(id)));
    }

    // ── DRY Helper: notify ────────────────────────────────────────────────
    /**
     * Single call to log AND announce. Eliminates the 10+ places that called
     * battleLog.add() + makeAnnouncement() separately.
     */
    _notify(message, logType = 'action', isError = false) {
        this.log.add(message, logType);
        this._announce(message, isError);
    }

    // ── DRY Helper: applyHPChange ─────────────────────────────────────────
    /**
     * Applies an HP change to a Pokémon, then handles all side-effects in one place:
     * damage numbers, battle log, announcement, and sprite animation.
     * Consolidates duplicate logic from: confirmHPEdit, handleStatUpdate,
     * handleRevive, and applyWeatherDamage.
     *
     * @param {Pokemon} pokemon
     * @param {number}  playerId
     * @param {number}  newHP     - The target HP value (will be clamped)
     * @param {string}  [source]  - Label for the log entry (e.g. "sandstorm")
     */
    _applyHPChange(pokemon, playerId, newHP, source = '') {
        const clamped = Math.max(0, Math.min(pokemon.maxHp, newHP));
        const delta = clamped - pokemon.currentHP;
        pokemon.currentHP = clamped;

        if (delta === 0) { this.renderer.renderAll(); return; }

        const isHeal = delta > 0;
        const isFaint = clamped === 0 && delta < 0;
        const label = source ? ` (${source})` : '';

        this._showDamageNumber(playerId, Math.abs(delta), isHeal ? 'heal' : 'damage');
        this._notify(
            `${pokemon.fullName}: ${isHeal ? '+' : ''}${delta} HP${label} (${clamped}/${pokemon.maxHp})`,
            isHeal ? 'heal' : 'damage'
        );

        const animType = isFaint ? 'faint' : isHeal ? 'heal' : 'damage';
        if (isFaint) this.audio.playCry(pokemon);
        this._animateSprite(playerId, animType, () => this.renderer.renderAll());
    }

    // ── Player management ─────────────────────────────────────────────────

    addPlayer() {
        if (this.gs.players.length >= 6) {
            this._announce('Lobby Full: Maximum 6 trainers allowed.', true);
            return;
        }

        const input = document.getElementById('new-player-name');
        const name = input?.value.trim();
        if (!name) return;

        const player = new Player(Date.now(), name);
        this.gs.players.push(player);
        input.value = '';
        this.renderer.renderAll();
        this.openTeamManager(player.id);

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    removePlayer(playerId) {
        if (this.multiplayer && this.multiplayer.mode !== 'offline' && !this.multiplayer.isHost) {
            this._notify('Only the host can remove players in multiplayer mode.', 'system', true);
            return;
        }

        const player = this.gs.players.find(p => p.id === playerId);
        if (!player) return;

        this.openConfirmModal(
            'Remove Trainer',
            `Are you sure you want to remove ${player.name} from the battle?`,
            () => {
                this.history.snapshot(this.gs);
                this.gs.players = this.gs.players.filter(p => p.id !== playerId);
                // Clear any selections pointing to the removed player.
                ['activeTurnPlayerId', 'selectedAttackTargetId', 'selectedStatusTargetId'].forEach(key => {
                    if (this.gs[key] === playerId) this.gs[key] = null;
                });
                this._notify(`${player.name} has been removed from the battle.`, 'system');
                this.renderer.renderAll();

                // Sync game state in multiplayer
                if (this.multiplayer && this.multiplayer.mode === 'playing') {
                    this.multiplayer.sendGameState();
                }
            }
        );
    }

    // ── Round ─────────────────────────────────────────────────────────────

    endRound() {
        this.history.snapshot(this.gs);
        this.gs.round++;
        this._applyWeatherDamage();
        this._applyStatusDamage();
        this.renderer.renderAll();
        this._notify(`========== ROUND ${this.gs.round} BEGINS ==========`, 'round');

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    // ── Attack ────────────────────────────────────────────────────────────

    handleAttack(attackType) {
        this.audio.play('attack');
        const attackerSel = document.getElementById('attacker-select');
        const targetSel = document.getElementById('attack-target-select');
        const typeSel = document.getElementById('move-type-select');
        const powerInput = document.getElementById('move-power-input');

        const attackerId = parseInt(attackerSel?.value);
        const targetId = parseInt(targetSel?.value);
        const moveType = typeSel?.value;
        let movePower = parseInt(powerInput?.value);

        if (movePower > 1000) { movePower = 1000; if (powerInput) powerInput.value = 1000; }
        if (movePower < 1) { movePower = 1; }

        if (!attackerId || !targetId || !moveType || isNaN(movePower)) {
            this._announce('Attacker, Target, Move Type, and Power are required!', true);
            this.audio.play('error');
            return;
        }

        const attackerPlayer = this.gs.players.find(p => p.id === attackerId);
        const targetPlayer = this.gs.players.find(p => p.id === targetId);
        if (!attackerPlayer || !targetPlayer) return;

        const attacker = attackerPlayer.getActivePokemon();
        const target = targetPlayer.getActivePokemon();

        if (attacker.isFainted()) {
            this._announce(`${attacker.fullName} is fainted and cannot attack!`, true);
            return;
        }
        if (target.isFainted()) {
            this._announce(`${target.fullName} is already fainted!`, true);
            return;
        }

        this.history.snapshot(this.gs);
        this.audio.playCry(attacker);

        const { damage, effectiveness } = this.engine.calculateDamage(
            attacker, target, movePower, moveType, attackType
        );

        // Build the announcement message.
        let msg = `${attacker.fullName} used a ${attackType} ${moveType} attack on ${target.fullName} for ${damage} damage!`;
        if (effectiveness > 1) msg += " It's super effective!";
        if (effectiveness < 1 && effectiveness > 0) msg += " It's not very effective...";
        if (effectiveness === 0) msg = `${target.fullName} is immune!`;

        this.log.add(msg, effectiveness === 0 ? 'action' : 'damage');
        this._announce(msg);

        if (damage > 0) {
            this._showDamageNumber(targetId, damage, effectiveness >= 2 ? 'critical' : 'damage');
        }

        const newHP = target.currentHP - damage;
        target.currentHP = Math.max(0, newHP);

        const onDone = () => {
            if (target.isFainted()) {
                this.audio.playCry(target);
                this._announce(`${target.fullName} fainted!`);
                this._animateSprite(targetId, 'faint', () => this.renderer.renderAll());
            } else {
                this.renderer.renderAll();
            }

            // Sync game state in multiplayer
            if (this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendGameState();
            }
        };
        damage > 0
            ? this._animateSprite(targetId, 'damage', onDone)
            : onDone();
    }

    updateAttackPreview() {
        const typeSel = document.getElementById('move-type-select');
        const targetSel = document.getElementById('attack-target-select');
        const display = document.getElementById('type-effectiveness-display');
        if (!display) return;

        const moveType = typeSel?.value;
        const targetId = parseInt(targetSel?.value);
        if (!moveType || !targetId) { display.textContent = '--'; return; }

        const player = this.gs.players.find(p => p.id === targetId);
        const pokemon = player?.getActivePokemon();
        if (!pokemon) { display.textContent = '--'; return; }

        const mult = this.engine.getTypeEffectiveness(moveType, pokemon.types);
        let label = `x${mult}`;
        if (mult >= 2) label += ' (Super effective!)';
        if (mult < 1 && mult > 0) label += ' (Not very effective...)';
        if (mult === 0) label += ' (No effect!)';
        display.textContent = label;
    }

    // ── Status & stats ────────────────────────────────────────────────────

    toggleStatus(event) {
        this.audio.play('status');
        const status = event.target.closest('button')?.dataset.status;
        const targetId = parseInt(document.getElementById('status-target-select')?.value);
        if (!status || !targetId) return;

        const player = this.gs.players.find(p => p.id === targetId);
        const pokemon = player?.getActivePokemon();
        if (!pokemon) return;

        this.history.snapshot(this.gs);
        const wasActive = pokemon.hasStatus(status);
        if (wasActive) {
            pokemon.removeStatus(status);
            this._notify(`${pokemon.fullName}'s ${status} was cured.`, 'status');
        } else {
            pokemon.applyStatus(status);
            this._notify(`${pokemon.fullName} was afflicted with ${status}.`, 'status');
        }
        this.renderer.renderAll();

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    handleStatUpdate() {
        const statusTargetSel = document.getElementById('status-target-select');
        const statSel = document.getElementById('stat-select');
        const statValInput = document.getElementById('stat-value-input');
        const modTypeSel = document.getElementById('stat-mod-type');

        const targetId = parseInt(statusTargetSel?.value);
        const statName = statSel?.value;
        const value = parseInt(statValInput?.value);
        const modType = modTypeSel?.value;

        if (!targetId || !statName || isNaN(value)) {
            this._announce('Please select a target, stat, and value.', true);
            return;
        }
        const player = this.gs.players.find(p => p.id === targetId);
        const pokemon = player?.getActivePokemon();
        if (!pokemon) return;

        this.history.snapshot(this.gs);

        if (statName === 'hp') {
            // DRY: delegate to _applyHPChange for unified HP handling.
            const currentModded = applyModification(
                pokemon.currentHP, pokemon.maxHp, modType, value, pokemon.maxHp
            );
            this._applyHPChange(pokemon, targetId, currentModded, 'stat update');
        } else {
            const change = pokemon.modifyStat(statName, modType, value);
            const final = pokemon.getEffectiveStat(statName);
            if (change > 0) {
                this._notify(`${pokemon.fullName}'s ${statName.toUpperCase()} rose! (→ ${final})`, 'heal');
                this._animateSprite(targetId, 'heal', () => this.renderer.renderAll());
            } else if (change < 0) {
                this._notify(`${pokemon.fullName}'s ${statName.toUpperCase()} fell! (→ ${final})`, 'damage');
                this._animateSprite(targetId, 'damage', () => this.renderer.renderAll());
            } else {
                this.renderer.renderAll();
            }
        }
        this.audio.play('confirm');

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    // ── HP Edit Modal ─────────────────────────────────────────────────────

    editHP(playerId) {
        const player = this.gs.players.find(p => p.id === playerId);
        const pokemon = player?.getActivePokemon();
        if (!pokemon) return;

        this.gs.currentHPEdit = { playerId, pokemon };

        document.getElementById('hp-edit-title').textContent = `Edit ${pokemon.fullName}'s HP`;
        document.getElementById('hp-current-display').textContent = `${pokemon.currentHP} / ${pokemon.maxHp}`;
        const input = document.getElementById('hp-new-value');
        input.value = pokemon.currentHP;
        input.max = pokemon.maxHp;

        this.modals.open('hpEdit');
        this.audio.play('click');
        setTimeout(() => { input.focus(); input.select(); }, 100);
    }

    confirmHPEdit() {
        const { playerId, pokemon } = this.gs.currentHPEdit || {};
        if (!pokemon) return;
        const newHP = parseInt(document.getElementById('hp-new-value')?.value);
        if (isNaN(newHP)) { this._announce('Please enter a valid number!', true); this.audio.play('error'); return; }
        if (newHP < 0 || newHP > pokemon.maxHp) {
            this._announce(`HP must be between 0 and ${pokemon.maxHp}!`, true);
            this.audio.play('error');
            return;
        }
        this.history.snapshot(this.gs);
        this.modals.close('hpEdit');
        this.audio.play('confirm');
        // DRY: _applyHPChange handles logging, animating, and rendering.
        this._applyHPChange(pokemon, playerId, newHP, 'manual edit');

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    // ── Team Management Modal ─────────────────────────────────────────────

    openTeamManager(playerId) {
        this.audio.play('click');
        this.gs.currentEditing.playerId = playerId;
        const player = this.gs.players.find(p => p.id === playerId);
        if (!player) return;
        document.getElementById('team-modal-title').textContent = `Manage ${escapeHTML(player.name)}'s Team`;
        this._renderTeamEditorGrid();
        document.getElementById('pokemon-editor-form')?.classList.add('hidden');
        this.modals.open('team');
    }

    _renderTeamEditorGrid() {
        const player = this.gs.players.find(p => p.id === this.gs.currentEditing.playerId);
        if (!player) return;
        const container = document.getElementById('team-editor-grid');
        if (!container) return;
        container.innerHTML = '';

        for (let i = 0; i < 6; i++) {
            const pokemon = player.team[i];
            const slot = document.createElement('div');
            slot.className = 'bg-slate-700 p-2 text-center cursor-pointer hover:bg-slate-600 relative';
            slot.dataset.slotId = i;

            if (pokemon) {
                slot.innerHTML = `
                    ${player.activePokemonIndex === i
                        ? '<div class="absolute top-1 left-1 text-yellow-400"><i data-lucide="star" class="w-4 h-4 fill-current"></i></div>'
                        : ''}
                    <img src="${pokemon.sprite}" alt="${escapeHTML(pokemon.fullName)}" class="mx-auto h-16">
                    <p class="font-bold text-xs mt-1">${escapeHTML(pokemon.fullName)}</p>
                    <div class="flex justify-center gap-1 mt-1">
                        <button class="edit-pokemon-btn text-xs bg-yellow-600 hover:bg-yellow-700 p-1">
                            <i data-lucide="pencil" class="w-3 h-3"></i>
                        </button>
                        <button class="remove-pokemon-btn text-xs bg-red-600 hover:bg-red-700 p-1">
                            <i data-lucide="trash-2" class="w-3 h-3"></i>
                        </button>
                    </div>`;
            } else {
                slot.classList.add('flex', 'items-center', 'justify-center', 'border-2', 'border-dashed', 'border-slate-600', 'min-h-[110px]');
                slot.innerHTML = `<button class="add-pokemon-btn text-slate-400 hover:text-white"><i data-lucide="plus-circle" class="w-8 h-8"></i></button>`;
            }
            container.appendChild(slot);
        }
        lucide.createIcons();

        // Attach slot event listeners.
        container.querySelectorAll('div[data-slot-id]').forEach(slot => {
            slot.addEventListener('click', e => {
                this.audio.play('click');
                const btn = e.target.closest('button');
                const slotId = parseInt(slot.dataset.slotId);
                if (btn?.classList.contains('edit-pokemon-btn')) this._openPokemonEditor(slotId);
                else if (btn?.classList.contains('remove-pokemon-btn')) this._removePokemonSlot(slotId);
                else if (btn?.classList.contains('add-pokemon-btn')) this._openPokemonEditor(slotId);
                else if (player.team[slotId]) {
                    player.activePokemonIndex = slotId;
                    this._renderTeamEditorGrid();
                }
            });
        });
    }

    _openPokemonEditor(slotId) {
        this.gs.currentEditing.slotId = slotId;
        const player = this.gs.players.find(p => p.id === this.gs.currentEditing.playerId);
        const pokemon = player?.team[slotId];
        const form = document.getElementById('pokemon-editor-form');
        if (!form) return;

        // Build ability selector HTML for the current pokemon
        const abilityOptionsHTML = this._buildAbilityOptionsHTML(pokemon?.fullName);

        form.innerHTML = `
            <h4 class="text-lg text-yellow-300 mb-3">${pokemon ? 'Edit' : 'Add'} Pokémon (Slot ${slotId + 1})</h4>
            <div class="mb-2">
                <label for="pokedex-search" class="text-xs">Search Pokémon</label>
                <input type="text" id="pokedex-search"
                       class="w-full bg-slate-900 p-2 mt-1 text-xs"
                       onclick="this.select()"
                       value="${pokemon ? escapeHTML(pokemon.fullName) : ''}">
                <div id="pokedex-search-results" class="bg-slate-900 border border-slate-600 mt-1"></div>
            </div>
            <div class="mb-2">
                <label for="ability-select" class="text-xs text-slate-300">Ability</label>
                <select id="ability-select" class="w-full bg-slate-900 border border-slate-600 p-2 mt-1 text-xs">
                    <option value="">-- Select Ability --</option>
                    ${abilityOptionsHTML}
                </select>
                <div id="ability-description" class="text-xs text-slate-400 mt-1 italic"></div>
            </div>
            <div class="flex gap-2 mt-4">
                <button id="confirm-pokemon-edit" class="bg-green-600 hover:bg-green-700 p-2 text-xs w-full">Confirm</button>
                <button id="cancel-pokemon-edit"  class="bg-gray-600  hover:bg-gray-700  p-2 text-xs w-full">Cancel</button>
            </div>`;
        form.classList.remove('hidden');

        const searchInput = document.getElementById('pokedex-search');
        const searchResults = document.getElementById('pokedex-search-results');
        const abilitySelect = document.getElementById('ability-select');
        const abilityDesc = document.getElementById('ability-description');

        // Trie-powered O(k) live search (replaces O(n) filter).
        searchInput.addEventListener('input', () => {
            const q = searchInput.value.trim();
            searchResults.innerHTML = '';
            if (q.length < 2) return;
            this.db.search(q, 5).forEach(name => {
                const div = document.createElement('div');
                div.className = 'p-2 cursor-pointer hover:bg-slate-700 text-xs';
                div.textContent = name;
                div.onclick = () => {
                    searchInput.value = name;
                    searchResults.innerHTML = '';
                    // Refresh ability options for the newly selected Pokémon
                    if (abilitySelect) {
                        abilitySelect.innerHTML =
                            '<option value="">-- Select Ability --</option>' +
                            this._buildAbilityOptionsHTML(name);
                    }
                    if (abilityDesc) abilityDesc.textContent = '';
                };
                searchResults.appendChild(div);
            });
        });

        // Ability select — show description
        if (abilitySelect) {
            abilitySelect.addEventListener('change', () => {
                const chosen = abilitySelect.value;
                if (!chosen || typeof AbilitiesData === 'undefined') {
                    if (abilityDesc) abilityDesc.textContent = '';
                    return;
                }
                const info = AbilitiesData[chosen];
                if (abilityDesc) {
                    abilityDesc.textContent = info
                        ? `${info.description} (Gen ${info.generation})`
                        : '';
                }
            });
        }

        document.getElementById('confirm-pokemon-edit').addEventListener('click', () => {
            this.audio.play('confirm');
            this._confirmPokemonEdit();
        });
        document.getElementById('cancel-pokemon-edit').addEventListener('click', () => {
            this.audio.play('click');
            form.classList.add('hidden');
        });
    }

    /**
     * Build <option> HTML for the ability selector for a given Pokémon name.
     * Reads from window.PokemonAbilitiesMap (pre-built in abilities_map.js).
     *
     * PokemonAbilitiesMap entries are arrays of {name: string, hidden: boolean}.
     * Falls back to trying the base name without forme suffixes.
     *
     * @param {string|null} pokemonName
     * @returns {string} HTML string of <option> elements
     */
    _buildAbilityOptionsHTML(pokemonName) {
        if (typeof window.PokemonAbilitiesMap === 'undefined') return '';

        // Try the exact name first, then shrink forme suffixes one word at a time
        let abilities = null;
        if (pokemonName) {
            abilities = window.PokemonAbilitiesMap[pokemonName];
            if (!abilities) {
                // Try removing trailing forme word (e.g. "Charizard Mega X" → "Charizard Mega" → "Charizard")
                const parts = pokemonName.split(' ');
                for (let i = parts.length - 1; i >= 1 && !abilities; i--) {
                    abilities = window.PokemonAbilitiesMap[parts.slice(0, i).join(' ')];
                }
            }
        }
        if (!abilities || !abilities.length) return '';

        return abilities.map(entry => {
            // Support both old string format and new {name, hidden} object format
            const abilityName = typeof entry === 'string' ? entry : entry.name;
            const isHidden = typeof entry === 'object' && entry.hidden;
            const label = isHidden ? `[H] ${abilityName}` : abilityName;
            return `<option value="${escapeHTML(abilityName)}" ${isHidden ? 'class="ability-hidden"' : ''}>${escapeHTML(label)}</option>`;
        }).join('');
    }

    _confirmPokemonEdit() {
        const player = this.gs.players.find(p => p.id === this.gs.currentEditing.playerId);
        const slotId = this.gs.currentEditing.slotId;
        if (!player || slotId === null) return;

        const name = document.getElementById('pokedex-search')?.value;
        const result = this.db.find(name);
        if (!result) {
            this._announce(`Invalid Pokémon: "${escapeHTML(name)}"`, true);
            this.audio.play('error');
            return;
        }
        const pokemon = new Pokemon(result.foundNode, result.baseNode);
        player.setSlot(slotId, pokemon);
        if (player.team.filter(p => p).length === 1) player.activePokemonIndex = slotId;
        this._renderTeamEditorGrid();
        document.getElementById('pokemon-editor-form')?.classList.add('hidden');

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    _removePokemonSlot(slotId) {
        const player = this.gs.players.find(p => p.id === this.gs.currentEditing.playerId);
        if (player) {
            player.clearSlot(slotId);
            this._renderTeamEditorGrid();

            // Sync game state in multiplayer
            if (this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendGameState();
            }
        }
    }

    // ── Team icon click (main arena view) ────────────────────────────────

    handleTeamIconClick(playerId, slotId) {
        this.audio.play('click');
        const player = this.gs.players.find(p => p.id === playerId);
        if (!player) return;
        const target = player.team[slotId];
        if (target && !target.isFainted()) {
            this._switchActivePokemon(playerId, slotId);
        } else if (target && target.isFainted()) {
            this._announce('Cannot switch to a fainted Pokémon!', true);
        } else {
            this.openTeamManager(playerId);
        }
    }

    _switchActivePokemon(playerId, slotId, fromModal = false) {
        const player = this.gs.players.find(p => p.id === playerId);
        const newPokemon = player?.team[slotId];
        if (!player || !newPokemon || newPokemon.isFainted()) return;
        if (player.activePokemonIndex === slotId) return;

        const doSwitch = () => {
            const old = player.getActivePokemon();
            const switched = player.switchTo(slotId);
            if (!switched) return;
            if (!fromModal) {
                this.log.add(`${player.name} switched from ${old?.fullName || 'none'} to ${newPokemon.fullName}`, 'action');
                this.renderer.renderAll();
                this.audio.playCry(newPokemon);
                this._playEntryAnimation(playerId, newPokemon.types[0]);
            } else {
                this._renderTeamEditorGrid();
            }

            // Sync game state in multiplayer
            if (this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendGameState();
            }
        };

        fromModal
            ? doSwitch()
            : this._animateSprite(playerId, 'switch-out', doSwitch);
    }

    // ── Confirm Modal ─────────────────────────────────────────────────────

    openConfirmModal(title, message, onConfirm) {
        const titleEl = document.getElementById('confirm-modal-title');
        const messageEl = document.getElementById('confirm-modal-message');
        if (titleEl) titleEl.textContent = title;
        if (messageEl) messageEl.innerHTML = escapeHTML(message);

        const yesBtn = document.getElementById('confirm-modal-yes');
        const noBtn = document.getElementById('confirm-modal-no');

        if (yesBtn) {
            yesBtn.onclick = () => {
                this.audio.play('confirm');
                this.modals.close('confirm');
                onConfirm();
            };
        }

        if (noBtn) {
            noBtn.onclick = () => {
                this.audio.play('click');
                this.modals.close('confirm');
            };
        }

        this.modals.open('confirm');
        this.audio.play('click');
    }

    // ── Evolution & form change ───────────────────────────────────────────

    handleEvolve() {
        const val = document.getElementById('management-pokemon-select')?.value;
        if (!val) { this._announce('Select a Pokémon to evolve.', true); return; }
        const [pid, sid] = val.split('-').map(Number);
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon) return;
        const evos = (pokemon.data.evolutions || []).filter(e => e?.Name);
        if (evos.length === 0) { this._announce(`${pokemon.fullName} cannot evolve further.`, true); return; }
        evos.length === 1
            ? this._confirmEvolution(evos[0].Name)
            : this._openEvolutionChoiceModal(evos);
    }

    _openEvolutionChoiceModal(evolutions) {
        const val = document.getElementById('management-pokemon-select')?.value;
        const [pid, sid] = val.split('-').map(Number);
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        document.getElementById('selection-modal-title').textContent = `Evolve ${pokemon?.fullName} into...`;
        this._populateSelectionGrid(evolutions, name => this._confirmEvolution(name));
        this.modals.open('selection');
    }

    _confirmEvolution(evolutionName) {
        const val = document.getElementById('management-pokemon-select')?.value;
        const [pid, sid] = val.split('-').map(Number);
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!player || !pokemon) { this._announce(`Error evolving to ${evolutionName}.`, true); return; }

        this.history.snapshot(this.gs);
        const oldName = pokemon.fullName;
        this._animateSprite(pid, 'evolve', () => {
            const result = this.db.find(evolutionName);
            if (!result) return;
            player.team[sid] = new Pokemon(result.foundNode, result.baseNode);
            this.modals.close('selection');
            this._notify(`${oldName} evolved into ${evolutionName}!`, 'action');
            this.renderer.renderAll();
            this.audio.playCry(player.team[sid]);

            // Sync game state in multiplayer
            if (this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendGameState();
            }
        });
    }

    openFormChangeModal() {
        const val = document.getElementById('management-pokemon-select')?.value;
        if (!val) return;
        const [pid, sid] = val.split('-').map(Number);
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon?.baseData) return;

        const forms = [pokemon.baseData, ...Object.values(pokemon.baseData.forms || {})]
            .filter(f => f?.Name && f.Name !== pokemon.fullName);

        if (forms.length === 0) {
            this._announce(`${pokemon.fullName} has no other forms.`, true);
            return;
        }
        document.getElementById('selection-modal-title').textContent = `Change ${pokemon.fullName}'s Form`;
        this._populateSelectionGrid(forms, name => this._confirmFormChange(name));
        this.modals.open('selection');
    }

    _confirmFormChange(formName) {
        const val = document.getElementById('management-pokemon-select')?.value;
        if (!val) return;
        const [pid, sid] = val.split('-').map(Number);
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon) return;

        this.history.snapshot(this.gs);
        const oldName = pokemon.fullName;
        this._animateSprite(pid, 'evolve', () => {
            const result = this.db.find(formName);
            if (!result) return;
            player.team[sid] = new Pokemon(result.foundNode, result.baseNode);
            this.modals.close('selection');
            this._notify(`${oldName} changed form to ${formName}!`, 'action');
            this.renderer.renderAll();
            this.audio.playCry(player.team[sid]);

            // Sync game state in multiplayer
            if (this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendGameState();
            }
        });
    }

    /** DRY: Builds the generic selection grid used for both evolutions and forms. */
    _populateSelectionGrid(dataItems, onSelect) {
        const grid = document.getElementById('selection-grid');
        if (!grid) return;
        grid.innerHTML = '';
        dataItems.forEach(item => {
            if (!item?.Name) return;
            const div = document.createElement('div');
            div.className = 'bg-slate-700 p-2 text-center cursor-pointer hover:bg-slate-600';
            div.innerHTML = `<img src="${item.sprite || ''}" alt="${escapeHTML(item.Name)}" class="mx-auto h-16">
                             <p class="font-bold text-xs mt-1">${escapeHTML(item.Name)}</p>`;
            div.onclick = () => onSelect(item.Name);
            grid.appendChild(div);
        });
    }

    // ── Revive ────────────────────────────────────────────────────────────

    handleRevive() {
        const val = document.getElementById('management-pokemon-select')?.value;
        if (!val) { this._announce('Select a fainted Pokémon to revive.', true); this.audio.play('error'); return; }
        const [pid, sid] = val.split('-').map(Number);
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon?.isFainted()) { this._announce('This Pokémon is not fainted.', true); return; }

        this.history.snapshot(this.gs);
        const revivedHP = Math.floor(pokemon.maxHp / 2);
        this._applyHPChange(pokemon, pid, revivedHP, 'revive');
        this._announce(`${pokemon.fullName} has been revived!`);

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    // ── Weather ───────────────────────────────────────────────────────────

    cycleWeather() {
        this.history.snapshot(this.gs);
        const cycle = ['none', 'sandstorm', 'hail'];
        const next = cycle[(cycle.indexOf(this.gs.weather) + 1) % cycle.length];
        const old = this.gs.weather;
        this.gs.weather = next;
        this._notify(`Weather changed from ${old} to ${next}.`, 'action');
        this.renderer.renderAll();
        this.audio.play('click');

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    _applyStatusDamage() {
        const affected = [];
        this.gs.players.forEach(player => {
            const pokemon = player.getActivePokemon();
            if (!pokemon || pokemon.isFainted()) return;

            if (pokemon.hasStatus('poison') || pokemon.hasStatus('bad_poison') || pokemon.hasStatus('burn')) {
                const dmg = Math.max(1, Math.floor(pokemon.maxHp / 8));
                pokemon.takeDamage(dmg);
                affected.push(pokemon.fullName);
            }
        });
        if (affected.length > 0) {
            this._notify(
                `${affected.join(', ')} took damage from their status conditions!`,
                'damage'
            );
        }
    }

    _applyWeatherDamage() {
        if (this.gs.weather === 'none') return;
        const affected = [];
        this.gs.players.forEach(player => {
            const pokemon = player.getActivePokemon();
            if (!pokemon || pokemon.isFainted()) return;
            const immune = this.gs.weather === 'sandstorm'
                ? pokemon.types.some(t => ['Rock', 'Ground', 'Steel'].includes(t))
                : pokemon.types.includes('Ice'); // hail
            if (!immune) {
                const dmg = Math.floor(pokemon.maxHp / 16);
                pokemon.takeDamage(dmg);
                affected.push(pokemon.fullName);
            }
        });
        if (affected.length > 0) {
            this._notify(
                `${affected.join(', ')} ${affected.length === 1 ? 'is' : 'are'} buffeted by the ${this.gs.weather}!`,
                'damage'
            );
        }
    }

    // ── Arena background ──────────────────────────────────────────────────

    _setArena(type) {
        const backgrounds = arenaBackgrounds[type] || arenaBackgrounds['Normal'];
        document.querySelectorAll('.parallax-layer').forEach((layer, i) => {
            if (backgrounds[i]) layer.style.backgroundImage = `url('${backgrounds[i]}')`;
        });
    }

    // ── Sprite animations ─────────────────────────────────────────────────

    _animateSprite(playerId, animationType, callback) {
        const card = document.getElementById(`player-card-${playerId}`);
        const sprite = card?.querySelector('.pokemon-sprite');
        if (!sprite) { callback?.(); return; }

        const allClasses = ['damage-animation', 'heal-animation', 'faint-animation',
            'evolve-animation', 'switch-out-animation', 'switch-in-animation'];
        sprite.classList.remove(...allClasses);
        void sprite.offsetHeight; // Force reflow to restart CSS animation.

        const durations = { damage: 300, heal: 800, faint: 800, evolve: 1000, 'switch-out': 400, 'switch-in': 400 };
        const soundMap = { damage: 'attack', heal: 'heal', faint: 'faint', evolve: 'evolve' };

        sprite.classList.add(`${animationType}-animation`);
        if (soundMap[animationType]) this.audio.play(soundMap[animationType]);

        setTimeout(() => {
            sprite.classList.remove(`${animationType}-animation`);
            callback?.();
        }, durations[animationType] ?? 800);
    }

    _playEntryAnimation(playerId, type) {
        const card = document.getElementById(`player-card-${playerId}`);
        const cont = card?.querySelector('.entry-animation-container');
        if (!cont) return;
        const effect = document.createElement('div');
        effect.className = 'entry-animation-effect';
        const typeClass = `entry-anim-${type.toLowerCase()}`;
        const exists = Array.from(document.styleSheets)
            .flatMap(s => { try { return Array.from(s.cssRules); } catch { return []; } })
            .some(r => r.selectorText === `.${typeClass}`);
        effect.classList.add(exists ? typeClass : 'entry-anim-default');
        cont.appendChild(effect);
        setTimeout(() => effect.remove(), 600);
    }

    // ── Damage number popup ───────────────────────────────────────────────

    _showDamageNumber(playerId, amount, type = 'damage') {
        const card = document.getElementById(`player-card-${playerId}`);
        const sprite = card?.querySelector('.pokemon-sprite');
        if (!card || !sprite) return;

        const el = document.createElement('div');
        el.className = `damage-number ${type}`;
        el.textContent = type === 'heal' ? `+${amount}` : `-${amount}`;

        const sr = sprite.getBoundingClientRect();
        const cr = card.getBoundingClientRect();
        el.style.left = `${sr.left - cr.left + sr.width / 2}px`;
        el.style.top = `${sr.top - cr.top + sr.height / 2}px`;

        card.appendChild(el);
        setTimeout(() => el.parentNode && el.remove(), 1200);
    }

    // ── Announcement banner ───────────────────────────────────────────────

    _announce(text, isError = false) {
        // Mirror original makeAnnouncement() which always played a sound.
        this.audio.play(isError ? 'error' : 'confirm');
        const banner = document.getElementById('announcement-banner');
        const textEl = document.getElementById('announcement-text');
        if (!banner || !textEl) return;
        textEl.textContent = text;
        banner.classList.toggle('border-red-500', isError);
        banner.classList.toggle('border-white', !isError);
        banner.classList.remove('hidden');
        banner.classList.add('announcement-enter');
        setTimeout(() => {
            banner.classList.replace('announcement-enter', 'announcement-exit');
            setTimeout(() => { banner.classList.add('hidden'); banner.classList.remove('announcement-exit'); }, 500);
        }, 2500);
    }

    // ── Prepopulate ───────────────────────────────────────────────────────

    _prepopulate() {
        this._toggleLoading(true, 'Loading Pokémon teams...');
        const names = ['Ash', 'Misty', 'Brock', 'Gary', 'Jessie', 'James'];
        const pool = [...this.db.filteredNames].sort(() => 0.5 - Math.random());

        names.forEach((name, i) => {
            const teamNames = pool.splice(0, 6);
            if (pool.length < 6) pool.push(...this.db.filteredNames);

            const team = teamNames.map(n => {
                const r = this.db.find(n);
                return r ? new Pokemon(r.foundNode, r.baseNode) : null;
            }).filter(Boolean);
            while (team.length < 6) team.push(null);

            const player = new Player(Date.now() + i, name);
            team.forEach((pk, idx) => player.setSlot(idx, pk));
            this.gs.players.push(player);
        });
        setTimeout(() => this._toggleLoading(false), 500);
    }

    // ── Move type dropdown ────────────────────────────────────────────────

    _populateMoveTypeSelector() {
        const sel = document.getElementById('move-type-select');
        if (!sel) return;
        sel.innerHTML = '<option value="">Select Type</option>';
        Object.keys(typeColors).forEach(type => {
            const cap = type.charAt(0).toUpperCase() + type.slice(1);
            sel.add(new Option(cap, cap));
        });
    }

    // ── Move name selector (populated from MovesetsData) ──────────────────

    /**
     * Populate the Move Name dropdown based on what moves a given Pokémon can learn.
     * Falls back to showing all moves (alphabetically) if the name isn't in MovesetsData.
     * @param {string|null} pokemonName
     */
    _populateMoveSelector(pokemonName) {
        const sel = document.getElementById('move-name-select');
        if (!sel) return;
        sel.innerHTML = '<option value="">-- Select Move --</option>';

        if (typeof MovesetsData === 'undefined' || typeof MovesData === 'undefined') return;

        // Retrieve the moveset: try exact name first, then base name without suffixes.
        let moves = MovesetsData[pokemonName];
        if (!moves && pokemonName) {
            // Try base name (e.g. 'Charizard' from 'Charizard Mega X')
            const baseName = pokemonName.split(' ')[0];
            moves = MovesetsData[baseName];
        }
        // If still nothing, fall back to all moves sorted
        const movelist = moves || Object.keys(MovesData).sort();

        movelist.forEach(moveName => {
            const md = MovesData[moveName];
            if (!md) return;
            const label = md.power > 0
                ? `${moveName} (${md.type} · ${md.category} · ${md.power})`
                : `${moveName} (${md.type} · ${md.category})`;
            sel.add(new Option(label, moveName));
        });
    }

    // ── PokemonAbilitiesMap population ────────────────────────────────────

    /**
     * Populates window.PokemonAbilitiesMap (from abilities_map.js) with known
     * ability names sourced from AbilitiesData keys, keyed by Pokémon name.
     * Since pokemon_data.js has no built-in abilities list, we assign a small
     * curated set based on each Pokémon's types so the UI has something useful
     * to show. Real ability lookup still works via AbilitiesData.
     */
    _populateAbilitiesMap() {
        if (typeof window.PokemonAbilitiesMap === 'undefined' ||
            typeof AbilitiesData === 'undefined') return;

        // Map type → canonical abilities that typically appear for that type.
        const typeAbilityHints = {
            Fire: ['Blaze', 'Flash Fire', 'Drought', 'Flame Body'],
            Water: ['Torrent', 'Swift Swim', 'Drizzle', 'Water Absorb'],
            Grass: ['Overgrow', 'Chlorophyll', 'Leaf Guard', 'Grassy Surge'],
            Electric: ['Static', 'Motor Drive', 'Lightning Rod', 'Electric Surge'],
            Psychic: ['Synchronize', 'Trace', 'Magic Guard', 'Telepathy'],
            Normal: ['Intimidate', 'Guts', 'Adaptability', 'Hustle'],
            Flying: ['Keen Eye', 'Big Pecks', 'Gale Wings', 'No Guard'],
            Fighting: ['Guts', 'Iron Fist', 'Moxie', 'Defiant'],
            Ice: ['Ice Body', 'Slush Rush', 'Refrigerate', 'Thick Fat'],
            Dragon: ['Rough Skin', 'Multiscale', 'Mold Breaker', 'Unnerve'],
            Dark: ['Intimidate', 'Pickpocket', 'Unburden', 'Defiant'],
            Steel: ['Clear Body', 'Sturdy', 'Full Metal Body', 'Iron Barbs'],
            Rock: ['Sturdy', 'Sand Stream', 'Rock Head', 'Battle Armor'],
            Ground: ['Sand Rush', 'Sand Force', 'Arena Trap', 'Guts'],
            Bug: ['Compound Eyes', 'Shield Dust', 'Swarm', 'Wonder Skin'],
            Ghost: ['Levitate', 'Cursed Body', 'Frisk', 'No Guard'],
            Poison: ['Poison Point', 'Stench', 'Corrosion', 'Liquid Ooze'],
            Fairy: ['Cute Charm', 'Magic Guard', 'Fairy Aura', 'Pixilate'],
        };

        // Build map for every known Pokémon in the database.
        for (const { foundNode } of this.db._index.values()) {
            const name = foundNode.Name;
            if (!name || window.PokemonAbilitiesMap[name]) continue;
            const types = (foundNode.types || []).flatMap(t => t.split(' '));
            const abilities = new Set();
            types.forEach(t => {
                (typeAbilityHints[t] || []).forEach(a => {
                    if (AbilitiesData[a]) abilities.add(a);
                });
            });
            window.PokemonAbilitiesMap[name] = [...abilities].slice(0, 4);
        }
    }

    // ── Loading overlay ───────────────────────────────────────────────────

    _toggleLoading(show, msg = 'Processing...') {
        let overlay = document.getElementById('operation-loading-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'operation-loading-overlay';
            overlay.className = 'loading-overlay';
            overlay.innerHTML = `<div><div class="loading-spinner"></div>
                                  <div class="loading-text" id="loading-message">${msg}</div></div>`;
            document.body.appendChild(overlay);
        }
        const msgEl = document.getElementById('loading-message');
        if (msgEl) msgEl.textContent = msg;
        overlay.classList.toggle('active', show);
    }

    // ── Event listeners ───────────────────────────────────────────────────

    _setupEventListeners() {
        const gs = this.gs;

        // Attacker select — also repopulates move list
        document.getElementById('attacker-select')?.addEventListener('change', e => {
            gs.activeTurnPlayerId = e.target.value ? parseInt(e.target.value) : null;
            this.updateAttackPreview();
            if (gs.activeTurnPlayerId) {
                const p = gs.players.find(p => p.id === gs.activeTurnPlayerId);
                const pk = p?.getActivePokemon();
                if (pk) {
                    this._setArena(pk.types[0]); // first type as primary
                    this._populateMoveSelector(pk.fullName);
                }
            } else {
                this._populateMoveSelector(null);
            }
            this.renderer.renderAll();
        });

        // Move name select — auto-fills power and type
        document.getElementById('move-name-select')?.addEventListener('change', e => {
            const moveName = e.target.value;
            if (!moveName) return;
            const moveData = (typeof MovesData !== 'undefined') ? MovesData[moveName] : null;
            if (moveData) {
                const powerInput = document.getElementById('move-power-input');
                const typeSelect = document.getElementById('move-type-select');
                if (powerInput && moveData.power && moveData.power > 0) {
                    powerInput.value = moveData.power;
                } else if (powerInput) {
                    powerInput.value = '';
                }
                if (typeSelect && moveData.type) {
                    // Find matching option (case-insensitive)
                    const opt = [...typeSelect.options].find(
                        o => o.value.toLowerCase() === moveData.type.toLowerCase()
                    );
                    if (opt) typeSelect.value = opt.value;
                }
                this.updateAttackPreview();
            }
        });

        // Attack target select
        document.getElementById('attack-target-select')?.addEventListener('change', e => {
            gs.selectedAttackTargetId = e.target.value ? parseInt(e.target.value) : null;
            this.updateAttackPreview();
            this.renderer.renderAll();
        });

        // Status target select
        document.getElementById('status-target-select')?.addEventListener('change', e => {
            gs.selectedStatusTargetId = e.target.value ? parseInt(e.target.value) : null;
            this.renderer._updateStatusButtonStyles();
            this.renderer.renderAll();
        });

        document.getElementById('move-type-select')?.addEventListener('change', () => {
            this.updateAttackPreview();
            document.getElementById('announcement-banner')?.classList.add('hidden');
        });

        // Clear sticky errors when attack inputs change
        ['move-power-input'].forEach(id => {
            document.getElementById(id)?.addEventListener('input', () => {
                document.getElementById('announcement-banner')?.classList.add('hidden');
            });
        });
        ['attacker-select', 'attack-target-select'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', () => {
                document.getElementById('announcement-banner')?.classList.add('hidden');
            });
        });

        // Status buttons
        document.querySelectorAll('.status-btn').forEach(btn => {
            if (btn.id !== 'weather-btn') btn.addEventListener('click', e => this.toggleStatus(e));
        });
        document.getElementById('weather-btn')?.addEventListener('click', () => this.cycleWeather());

        // Attack buttons
        document.getElementById('physical-attack-btn')?.addEventListener('click', () => this.handleAttack('physical'));
        document.getElementById('special-attack-btn')?.addEventListener('click', () => this.handleAttack('special'));

        // Stat update
        document.getElementById('update-stat-btn')?.addEventListener('click', () => this.handleStatUpdate());

        // Management
        document.getElementById('management-pokemon-select')?.addEventListener('change', () => this.renderer._updateManagementButtons());
        document.getElementById('evolve-btn')?.addEventListener('click', () => this.handleEvolve());
        document.getElementById('change-form-btn')?.addEventListener('click', () => this.openFormChangeModal());
        document.getElementById('revive-btn')?.addEventListener('click', () => this.handleRevive());

        // Player management
        document.getElementById('add-player-btn')?.addEventListener('click', () => { this.audio.play('click'); this.addPlayer(); });
        document.getElementById('end-round-btn')?.addEventListener('click', () => { this.audio.play('confirm'); this.endRound(); });

        // Timer
        const timerDisplay = document.getElementById('timer-display');
        this.timer.linkDisplay(timerDisplay);
        document.getElementById('timer-start')?.addEventListener('click', () => { this.audio.play('click'); this.timer.start(); });
        document.getElementById('timer-pause')?.addEventListener('click', () => { this.audio.play('click'); this.timer.pause(); });
        document.getElementById('timer-reset')?.addEventListener('click', () => { this.audio.play('click'); this.timer.reset(); });

        // Undo / Redo
        document.getElementById('undo-btn')?.addEventListener('click', () => {
            if (this.history.undo(this.gs, this.db)) {
                this.audio.play('click');
                this.renderer.renderAll();
                this.log.add('[UNDO] Action undone', 'system');
                this._announce('Action undone');
            } else {
                this._announce('Nothing to undo!', true);
                this.audio.play('error');
            }
        });
        document.getElementById('redo-btn')?.addEventListener('click', () => {
            if (this.history.redo(this.gs, this.db)) {
                this.audio.play('click');
                this.renderer.renderAll();
                this.log.add('[REDO] Action redone', 'system');
                this._announce('Action redone');
            } else {
                this._announce('Nothing to redo!', true);
                this.audio.play('error');
            }
        });

        // Battle log
        document.getElementById('clear-log-btn')?.addEventListener('click', () => this.log.clear());
        document.getElementById('export-log-btn')?.addEventListener('click', () => { this.log.export(); this.audio.play('confirm'); });

        // HP Edit modal
        document.getElementById('close-hp-edit-modal')?.addEventListener('click', () => { this.audio.play('click'); this.modals.close('hpEdit'); });
        document.getElementById('cancel-hp-edit')?.addEventListener('click', () => { this.audio.play('click'); this.modals.close('hpEdit'); });
        document.getElementById('confirm-hp-edit')?.addEventListener('click', () => this.confirmHPEdit());

        document.querySelectorAll('.hp-quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.audio.play('click');
                const pct = parseInt(btn.dataset.percent);
                const pokemon = this.gs.currentHPEdit?.pokemon;
                if (pokemon) document.getElementById('hp-new-value').value = Math.floor(pokemon.maxHp * pct / 100);
            });
        });
        document.querySelectorAll('.hp-adjust-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.audio.play('click');
                const change = parseInt(btn.dataset.change);
                const pokemon = this.gs.currentHPEdit?.pokemon;
                const input = document.getElementById('hp-new-value');
                if (pokemon && input) {
                    input.value = Math.max(0, Math.min(pokemon.maxHp, (parseInt(input.value) || 0) + change));
                }
            });
        });
        document.getElementById('hp-new-value')?.addEventListener('keydown', e => {
            if (e.key === 'Enter') this.confirmHPEdit();
            if (e.key === 'Escape') this.modals.close('hpEdit');
        });

        // Confirm modal
        document.getElementById('close-confirm-modal')?.addEventListener('click', () => {
            this.audio.play('click');
            this.modals.close('confirm');
        });

        // Team modal
        document.getElementById('close-team-modal')?.addEventListener('click', () => { this.audio.play('click'); this.modals.close('team'); });
        document.getElementById('confirm-team-btn')?.addEventListener('click', () => {
            this.audio.play('confirm');
            this.modals.close('team');
            this.renderer.renderAll();
        });

        // Selection modal
        document.getElementById('close-selection-modal')?.addEventListener('click', () => { this.audio.play('click'); this.modals.close('selection'); });

        // RNG
        document.getElementById('generate-number-btn')?.addEventListener('click', () => {
            this.audio.play('click');
            const num = Math.floor(Math.random() * 100) + 1;
            document.getElementById('random-number-display').textContent = num;
            this.log.add(`[RNG] Game Master rolled a ${num}`, 'system');
        });
    }

    _setupKeyboardShortcuts() {
        document.addEventListener('keydown', e => {
            const active = document.activeElement;
            const inInput = active && ['INPUT', 'SELECT', 'TEXTAREA'].includes(active.tagName);
            const isMod = e.ctrlKey || e.metaKey;

            if (inInput && !isMod) return;

            // Undo / Redo
            if (isMod && e.key === 'z' && !e.shiftKey) { e.preventDefault(); document.getElementById('undo-btn')?.click(); return; }
            if (isMod && e.key === 'z' && e.shiftKey) { e.preventDefault(); document.getElementById('redo-btn')?.click(); return; }

            // Close modals
            if (e.key === 'Escape') { this.modals.closeAll(); this.audio.play('click'); return; }

            // Don't fire arena shortcuts when a modal is open.
            if (this.modals.anyOpen()) return;

            const shortcuts = {
                ' ': 'end-round-btn',
                'p': 'physical-attack-btn',
                's': 'special-attack-btn',
                'e': 'evolve-btn',
                'f': 'change-form-btn',
                'r': 'generate-number-btn',
            };
            if (shortcuts[e.key?.toLowerCase()]) {
                e.preventDefault();
                document.getElementById(shortcuts[e.key.toLowerCase()])?.click();
                return;
            }

            // 1-6: select player as attacker
            if (e.key >= '1' && e.key <= '6') {
                e.preventDefault();
                const player = this.gs.players[parseInt(e.key) - 1];
                const sel = document.getElementById('attacker-select');
                if (player && sel) { sel.value = player.id; sel.dispatchEvent(new Event('change')); this.audio.play('click'); }
            }
        });
    }

    // ── MULTIPLAYER UI SETUP ──────────────────────────────────────────────

    _setupMultiplayerUI() {
        // Connect to existing CREATE ROOM and JOIN ROOM buttons (NO duplicate buttons!)
        const createRoomBtn = document.getElementById('create-room-btn');
        const joinRoomBtn = document.getElementById('join-room-btn');
        const trainerNameInput = document.getElementById('trainer-name-input');

        if (createRoomBtn) {
            createRoomBtn.addEventListener('click', () => {
                const playerName = trainerNameInput?.value.trim() || 'Trainer';
                if (!playerName) {
                    this._announce('Please enter your trainer name first!', true);
                    return;
                }
                // Connect to multiplayer server
                this.multiplayer.connect();
                // Wait a moment for connection, then create room
                setTimeout(() => {
                    this.multiplayer.createRoom(playerName);
                }, 500);
                this.audio.play('click');
            });
        }

        if (joinRoomBtn) {
            joinRoomBtn.addEventListener('click', () => {
                const playerName = trainerNameInput?.value.trim() || 'Trainer';
                if (!playerName) {
                    this._announce('Please enter your trainer name first!', true);
                    return;
                }
                // Prompt for room code
                const roomCode = prompt('Enter 6-digit room code:');
                if (roomCode && roomCode.length === 6) {
                    // Connect to multiplayer server
                    this.multiplayer.connect();
                    // Wait a moment for connection, then join room
                    setTimeout(() => {
                        this.multiplayer.joinRoom(roomCode.toUpperCase(), playerName);
                    }, 500);
                }
                this.audio.play('click');
            });
        }

        // Expose arena globally for onclick handlers in HTML
        window.arena = this;
    }
}



/** Escapes HTML to prevent XSS. Used by UIRenderer and BattleLog. */
function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}



window.addEventListener('load', () => {
    const arena = new PokemonBattleArena();
    arena.init();

    // Auto-join from URL parameter: ?room=XXXXXX
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get('room');
    if (roomCode && roomCode.length === 6) {
        setTimeout(() => {
            const name = prompt(`Join room ${roomCode}?\nEnter your trainer name:`);
            if (name && name.trim()) {
                if (arena.multiplayer) {
                    arena.multiplayer.connect();
                    setTimeout(() => {
                        arena.multiplayer.joinRoom(roomCode, name.trim());
                    }, 1000);
                }
            }
            // Clean the URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 2000);
    }
});

// ============================================
// SHARE INVITE FUNCTIONS (global scope for onclick)
// ============================================

function copyRoomCode() {
    const roomCode = document.getElementById('room-code-display')?.textContent?.trim();
    if (!roomCode) return;

    navigator.clipboard.writeText(roomCode).then(() => {
        const feedback = document.getElementById('copy-feedback');
        if (feedback) {
            feedback.textContent = '✅ Code copied!';
            feedback.classList.remove('hidden');
            setTimeout(() => feedback.classList.add('hidden'), 2000);
        }
        const btn = document.getElementById('copy-code-btn');
        if (btn) {
            btn.textContent = '✅ Copied!';
            setTimeout(() => { btn.textContent = '📋 Copy Code'; }, 2000);
        }
    }).catch(() => {
        const codeEl = document.getElementById('room-code-display');
        if (codeEl) {
            const range = document.createRange();
            range.selectNode(codeEl);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    });
}

function shareRoomLink() {
    const roomCode = document.getElementById('room-code-display')?.textContent?.trim();
    if (!roomCode) return;

    const joinUrl = `${window.location.origin}${window.location.pathname}?room=${roomCode}`;
    const shareText = `Join my Pokémon Battle Arena! Room Code: ${roomCode}`;

    if (navigator.share) {
        navigator.share({
            title: 'Pokémon Battle Arena - Join My Room!',
            text: shareText,
            url: joinUrl
        }).catch(() => copyToClipboardWithFeedback(joinUrl));
    } else {
        copyToClipboardWithFeedback(joinUrl);
    }
}

function copyToClipboardWithFeedback(text) {
    navigator.clipboard.writeText(text).then(() => {
        const feedback = document.getElementById('copy-feedback');
        if (feedback) {
            feedback.textContent = '🔗 Link copied to clipboard!';
            feedback.classList.remove('hidden');
            setTimeout(() => feedback.classList.add('hidden'), 3000);
        }
        const btn = document.getElementById('share-link-btn');
        if (btn) {
            btn.textContent = '✅ Link Copied!';
            setTimeout(() => { btn.textContent = '🔗 Share Link'; }, 2000);
        }
    });
}