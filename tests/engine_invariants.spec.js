import { test, expect } from '@playwright/test';
import { Pokemon } from '../src/engine/models/Pokemon.js';
import { Player } from '../src/engine/models/Player.js';
import { BattleEngine } from '../src/engine/services/BattleEngine.js';
import { AbilityEngine } from '../src/engine/services/AbilityEngine.js';
import { HistoryManager } from '../src/engine/services/HistoryManager.js';
import { BattleController } from '../src/engine/services/BattleController.js';
import { MultiplayerManager } from '../src/engine/api/socketClient.js';
import { PersistenceManager, SCHEMA_VERSION } from '../src/engine/services/PersistenceManager.js';
import { InputManager } from '../src/engine/ui/InputManager.js';
import { typeChart } from '../src/engine/data/constants.js';

function createPokemon(config = {}) {
    const rawData = {
        name: config.name || 'Pikachu',
        stats: {
            hp: config.hp || 160,
            attack: config.attack ?? config.atk ?? 100,
            defence: config.defence ?? config.def ?? 100,
            specialAttack: config.specialAttack ?? config.spa ?? 100,
            specialDefence: config.specialDefence ?? config.spd ?? 100,
            speed: config.speed ?? config.spe ?? 100,
            ...(config.stats || {})
        },
        types: config.types || ['Electric'],
        sprite: '',
        cry: '',
        tier: 'OU'
    };
    const poke = new Pokemon(rawData, rawData);
    if (config.ability) poke.ability = config.ability;
    if (config.currentHP !== undefined) poke.currentHP = config.currentHP;
    return poke;
}

function createSimulatedArena() {
    const arena = {
        gs: {
            round: 1,
            weather: 'none',
            terrain: null,
            players: [],
            log: [],
            delayedEffects: [],
            activeTurnPlayerId: null,
            selectedAttackTargetId: null,
            selectedStatusTargetId: null,
        },
        log: {
            add: (msg, type) => arena.gs.log.push(typeof msg === 'string' ? msg : msg?.msg || String(msg))
        },
        _notify: (msg, type) => arena.gs.log.push(typeof msg === 'string' ? msg : msg?.msg || String(msg)),
    };
    arena.gs.arena = arena;
    arena.engine = new BattleEngine(typeChart);
    arena.abilityEngine = new AbilityEngine(arena);
    return arena;
}

test.describe('Phase 1: Engine Invariants & Correctness', () => {

    test('1. Custom damage math is preserved and deterministic', () => {
        const engine = new BattleEngine(typeChart);
        // Attacker: Physical Attack = 120, Move Power = 90, Type = Electric
        const attacker = createPokemon({ attack: 120, types: ['Electric'] });
        // Defender: Physical Defence = 80, Type = Water (Electric -> Water is 2x super-effective in typeChart)
        const defender = createPokemon({ defence: 80, types: ['Water'] });

        // Expected custom formula:
        // a = 120, d = 80, effectivePower = 90, effectiveness = 2
        // rawDamage = (a - adjustedD) + (effectivePower * effectiveness)
        // rawDamage = (120 - 80) + (90 * 2) = 40 + 180 = 220
        const result = engine.calculateDamage(attacker, defender, 90, 'Electric', 'physical');
        expect(result.effectiveness).toBe(2);
        expect(result.damage).toBe(220);
    });

    test('2. Teravolt ability inflicts paralysis (not burn) and respects Electric immunity', () => {
        const arena = createSimulatedArena();
        const zekrom = createPokemon({ name: 'Zekrom', ability: 'Teravolt', types: ['Dragon', 'Electric'] });
        const waterFoe = createPokemon({ name: 'Blastoise', types: ['Water'] });
        const electricFoe = createPokemon({ name: 'Jolteon', types: ['Electric'] });

        const p1 = new Player('p1', 'Player 1');
        p1.setSlot(0, zekrom);
        const p2 = new Player('p2', 'Player 2');
        p2.setSlot(0, waterFoe);
        const p3 = new Player('p3', 'Player 3');
        p3.setSlot(0, electricFoe);

        arena.gs.players = [p1, p2, p3];

        // Trigger switch-in ability for Teravolt
        arena.abilityEngine.onSwitchIn(zekrom, arena.gs);

        // Water foe should receive paralysis, NOT burn
        expect(waterFoe.hasStatus('burn')).toBe(false);
        expect(waterFoe.hasStatus('paralysis')).toBe(true);

        // Electric foe is immune to paralysis
        expect(electricFoe.hasStatus('paralysis')).toBe(false);
        expect(electricFoe.hasStatus('burn')).toBe(false);
    });

    test('3. Player.id is always a string to prevent numeric vs string lookup bugs', () => {
        const numericIdPlayer = new Player(42, 'Red');
        expect(numericIdPlayer.id).toBe('42');
        expect(typeof numericIdPlayer.id).toBe('string');

        const fromJsonPlayer = Player.fromJSON({ id: 99, name: 'Blue', team: [] }, {});
        expect(fromJsonPlayer.id).toBe('99');
        expect(typeof fromJsonPlayer.id).toBe('string');
    });

    test('4. HistoryManager preserves terrain, delayedEffects, and schema version', () => {
        const history = new HistoryManager(10);
        const gs = {
            players: [new Player('p1', 'Ash')],
            round: 2,
            weather: 'rain',
            terrain: { type: 'grassy', roundsLeft: 4 },
            delayedEffects: [{ name: 'Leech Seed', targetId: 'p1', damagePercent: 0.10, roundsLeft: 3 }],
            activeTurnPlayerId: 'p1',
            selectedAttackTargetId: null,
            selectedStatusTargetId: null
        };

        history.snapshot(gs);

        // Mutate live state
        gs.round = 3;
        gs.weather = 'sun';
        gs.terrain = null;
        gs.delayedEffects = [];

        // Undo
        const success = history.undo(gs, {});
        expect(success).toBe(true);
        expect(gs.round).toBe(2);
        expect(gs.weather).toBe('rain');
        expect(gs.terrain).toEqual({ type: 'grassy', roundsLeft: 4 });
        expect(gs.delayedEffects).toHaveLength(1);
        expect(gs.delayedEffects[0].name).toBe('Leech Seed');
    });

    test('5. Remote attack action computes deterministic damage instead of trusting arbitrary remote damage payload', () => {
        const arena = createSimulatedArena();
        arena.history = new HistoryManager(10);
        arena.renderer = { renderAll: () => {} };
        arena.audio = { play: () => {}, playCry: () => {} };
        arena._showDamageNumber = () => {};
        arena._animateSprite = (id, type, cb) => cb?.();
        arena._announce = () => {};
        arena.saveLocalState = () => {};
        arena.battleController = new BattleController(arena);

        const attacker = createPokemon({ name: 'Electabuzz', attack: 120, types: ['Electric'] });
        const defender = createPokemon({ name: 'Poliwag', defence: 80, hp: 300, currentHP: 300, types: ['Water'] });

        const p1 = new Player('p1', 'Player 1');
        p1.setSlot(0, attacker);
        const p2 = new Player('p2', 'Player 2');
        p2.setSlot(0, defender);

        arena.gs.players = [p1, p2];

        // Malicious client sends spoofed damage = 9999
        arena.battleController.handleAttack('physical', {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'Thunder Punch',
            moveType: 'Electric',
            movePower: 90,
            attackType: 'physical',
            damage: 9999, // <--- Spoofed malicious damage
            effectiveness: 1
        });

        // Expected deterministic calculation:
        // rawDamage = (120 - 80) + (90 * 2) = 220
        // Target HP before: 300. After taking 220 damage, currentHP should be 80, NOT 0!
        expect(defender.currentHP).toBe(80);
    });

    test('6. MultiplayerManager drops duplicate actions sharing the same actionId', () => {
        let attackCallCount = 0;
        const fakeArena = {
            battleController: {
                handleAttack: () => { attackCallCount++; }
            },
            log: { _buffer: { toArray: () => [] } }
        };
        const mp = new MultiplayerManager(fakeArena);

        // First arrival of action with actionId 'act-123'
        mp.handleRemoteAction('attack', { attackType: 'physical', actionId: 'act-123' });
        expect(attackCallCount).toBe(1);

        // Duplicate replay of action with identical actionId 'act-123'
        mp.handleRemoteAction('attack', { attackType: 'physical', actionId: 'act-123' });
        expect(attackCallCount).toBe(1); // Should remain 1, duplicate dropped!

        // New distinct action with actionId 'act-456'
        mp.handleRemoteAction('attack', { attackType: 'physical', actionId: 'act-456' });
        expect(attackCallCount).toBe(2);
    });

    test('7. PersistenceManager saves and restores state with schema version, terrain, and delayedEffects', () => {
        const store = {};
        const mockLocalStorage = {
            getItem: (key) => store[key] || null,
            setItem: (key, val) => { store[key] = String(val); },
            removeItem: (key) => { delete store[key]; }
        };
        globalThis.localStorage = mockLocalStorage;

        const fakeArena = {
            gs: {
                players: [new Player('p1', 'Red')],
                round: 5,
                weather: 'sun',
                terrain: { type: 'psychic', roundsLeft: 3 },
                delayedEffects: [{ name: 'Future Sight', roundsLeft: 2 }],
                activeTurnPlayerId: 'p1',
                selectedAttackTargetId: null,
                selectedStatusTargetId: null,
            },
            log: { _buffer: { toArray: () => ['Turn 1'] } }
        };

        const pm = new PersistenceManager(fakeArena);
        const saved = pm.saveState();
        expect(saved).toBe(true);

        const rawSaved = JSON.parse(store['pba_active_battle_state']);
        expect(rawSaved.version).toBe(SCHEMA_VERSION);
        expect(rawSaved.terrain).toEqual({ type: 'psychic', roundsLeft: 3 });
        expect(rawSaved.delayedEffects).toEqual([{ name: 'Future Sight', roundsLeft: 2 }]);

        // Load into new gs
        const newGs = {};
        const loaded = pm.loadState(newGs, {}, null);
        expect(loaded).toBe(true);
        expect(newGs.round).toBe(5);
        expect(newGs.weather).toBe('sun');
        expect(newGs.terrain).toEqual({ type: 'psychic', roundsLeft: 3 });
        expect(newGs.delayedEffects).toEqual([{ name: 'Future Sight', roundsLeft: 2 }]);
        expect(newGs.players[0].id).toBe('p1');
    });

    test('8. InputManager binds and unbinds listeners cleanly without error', () => {
        const fakeArena = { modals: { anyOpen: () => false, closeAll: () => {} } };
        const inputMgr = new InputManager(fakeArena);

        // In Node environment without window, should safely no-op
        inputMgr.bind();
        expect(inputMgr._isBound).toBe(false);

        // In an environment with window
        const mockWindow = {
            events: {},
            addEventListener: (ev, fn) => { mockWindow.events[ev] = fn; },
            removeEventListener: (ev, fn) => { delete mockWindow.events[ev]; }
        };
        globalThis.window = mockWindow;

        inputMgr.bind();
        expect(inputMgr._isBound).toBe(true);
        expect(typeof mockWindow.events['keydown']).toBe('function');

        inputMgr.unbind();
        expect(inputMgr._isBound).toBe(false);
        expect(mockWindow.events['keydown']).toBeUndefined();
    });

});
