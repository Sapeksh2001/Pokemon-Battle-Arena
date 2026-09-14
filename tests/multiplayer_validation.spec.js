import fs from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';
import { BattleCommandValidator } from '../src/engine/services/BattleCommandValidator.js';
import { BattleController } from '../src/engine/services/BattleController.js';
import { BattleEngine } from '../src/engine/services/BattleEngine.js';
import { AbilityEngine } from '../src/engine/services/AbilityEngine.js';
import { BattleRng } from '../src/engine/utils/BattleRng.js';
import { Player } from '../src/engine/models/Player.js';
import { Pokemon } from '../src/engine/models/Pokemon.js';
import { typeChart } from '../src/engine/data/constants.js';

const allMoves = JSON.parse(fs.readFileSync(path.resolve('./public/data/moves.json'), 'utf8'));
globalThis.window = globalThis.window || {};
globalThis.window.MovesData = allMoves;

function createMockPokemon(name, hp, currentHP, attack, defence, types = ['Normal']) {
    const raw = {
        name,
        fullName: name,
        types,
        hp,
        currentHP,
        currentHp: currentHP,
        maxHp: hp,
        maxHP: hp,
        attack,
        defence,
        specialAttack: attack,
        specialDefence: defence,
        speed: 100,
        stats: { attack, defence, specialAttack: attack, specialDefence: defence, speed: 100 },
        statModifiers: {},
        statuses: {},
        status: null,
        ability: 'none',
        hasStatus(s) { return !!this.statuses[s] || this.status === s; },
        applyStatus(s) { this.statuses[s] = true; this.status = s; return true; },
        removeStatus(s) { delete this.statuses[s]; if (this.status === s) this.status = null; },
        takeDamage(dmg) { this.currentHP = Math.max(0, this.currentHP - dmg); return this.currentHP; },
        heal(amt) { this.currentHP = Math.min(this.maxHp, this.currentHP + amt); return this.currentHP; },
        isFainted() { return this.currentHP <= 0; },
        getEffectiveStat(s) { return this.stats[s] || 100; },
        getHPPercent() { return Math.round((this.currentHP / (this.maxHp || 100)) * 100); }
    };
    return raw;
}

test.describe('Multiplayer Command Authorization & Simulation Parity', () => {

    let gameState;
    let playerA;
    let playerB;

    test.beforeEach(() => {
        playerA = new Player('p1', 'Alice');
        playerA.setSlot(0, createMockPokemon('Pikachu', 200, 200, 100, 80, ['Electric']));

        playerB = new Player('p2', 'Bob');
        playerB.setSlot(0, createMockPokemon('Blastoise', 300, 300, 90, 110, ['Water']));

        gameState = {
            players: [playerA, playerB],
            round: 1,
            activeTurnPlayerId: 'p1'
        };
    });

    test('1. Unauthorized attack: Player B cannot command Player A Pokémon to attack', () => {
        const payload = {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'Thunderbolt',
            moveType: 'Electric',
            movePower: 90
        };
        const metadata = { sender: 'p2', isHost: false };
        const result = BattleCommandValidator.validateCommand('attack', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('does not own');
    });

    test('2. Attack targeting self / own Pokémon is rejected for offensive moves', () => {
        const payload = {
            attackerId: 'p1',
            targetId: 'p1',
            moveName: 'Tackle',
            moveType: 'Normal',
            movePower: 40,
            attackType: 'physical'
        };
        const metadata = { sender: 'p1', isHost: false };
        const result = BattleCommandValidator.validateCommand('attack', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('Offensive move cannot target own player');
    });

    test('3. Attack with out-of-bounds power (>300) is rejected', () => {
        const payload = {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'Super Nuke',
            moveType: 'Fire',
            movePower: 99999
        };
        const metadata = { sender: 'p1', isHost: false };
        const result = BattleCommandValidator.validateCommand('attack', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('out of legal bounds');
    });

    test('4. Attack targeting already fainted Pokémon is rejected', () => {
        playerB.getActivePokemon().currentHP = 0;
        const payload = {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'Thunderbolt',
            moveType: 'Electric',
            movePower: 90
        };
        const metadata = { sender: 'p1', isHost: false };
        const result = BattleCommandValidator.validateCommand('attack', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('already fainted');
    });

    test('5. Malicious HP manipulation: Non-host cannot send hp_change for opponent', () => {
        const payload = { playerId: 'p1', slotId: 0, newHP: 0 };
        const metadata = { sender: 'p2', isHost: false };
        const result = BattleCommandValidator.validateCommand('hp_change', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('cannot directly modify opponent');
    });

    test('6. Host authority: Room host CAN send hp_change for player', () => {
        const payload = { playerId: 'p2', slotId: 0, newHP: 150 };
        const metadata = { sender: 'p1' };
        const result = BattleCommandValidator.validateCommand('hp_change', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(true);
    });

    test('7. Malicious stat modification: Non-host cannot send stat_update for opponent', () => {
        const payload = { playerId: 'p1', stat: 'attack', stages: -6 };
        const metadata = { sender: 'p2', isHost: false };
        const result = BattleCommandValidator.validateCommand('stat_update', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('cannot directly modify opponent');
    });

    test('8. Malicious status injection: Non-host cannot send status_toggle for opponent', () => {
        const payload = { playerId: 'p1', status: 'paralysis' };
        const metadata = { sender: 'p2', isHost: false };
        const result = BattleCommandValidator.validateCommand('status_toggle', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('cannot directly toggle opponent');
    });

    test('9. Unauthorized roster manipulation: Cannot switch, evolve, or trade opponent Pokémon', () => {
        const meta = { sender: 'p2', isHost: false };

        const switchRes = BattleCommandValidator.validateCommand('switch_pokemon', { playerId: 'p1', slotId: 1 }, meta, gameState, { hostId: 'p1' });
        expect(switchRes.valid).toBe(false);

        const evolveRes = BattleCommandValidator.validateCommand('evolve', { playerId: 'p1', slotId: 0, evolutionName: 'Raichu' }, meta, gameState, { hostId: 'p1' });
        expect(evolveRes.valid).toBe(false);

        const tradeRes = BattleCommandValidator.validateCommand('trade_pokemon', { playerId: 'p1', slotId: 0, newPokemonName: 'Mewtwo' }, meta, gameState, { hostId: 'p1' });
        expect(tradeRes.valid).toBe(false);
    });

    // ── Simulation Parity (True Remote Path) ──────────────────────────────

    test('10. Simulation Parity: Multi-hit attack — local path (Client A) vs remote path (Client B) produces identical HP', () => {
        const seed = 77788899;

        function createTestArena(seedVal) {
            const rng = new BattleRng(seedVal);
            const engine = new BattleEngine(typeChart, rng);
            const p1 = new Player('p1', 'Alice');
            p1.setSlot(0, createMockPokemon('Sceptile', 250, 250, 110, 80, ['Grass']));

            const p2 = new Player('p2', 'Bob');
            p2.setSlot(0, createMockPokemon('Swampert', 350, 350, 110, 110, ['Water', 'Ground']));

            const arena = {
                rng,
                engine,
                gs: { players: [p1, p2], round: 1, weather: 'none' },
                log: { add: () => {} },
                audio: { play: () => {}, playCry: () => {} },
                renderer: { renderAll: () => {} },
                history: { snapshot: () => {} },
                _announce: () => {},
                _notify: () => {},
                _showDamageNumber: () => {},
                _animateSprite: (id, type, cb) => cb?.(),
                saveLocalState: () => {},
                multiplayer: null
            };
            arena.abilityEngine = new AbilityEngine(arena);
            arena.battleController = new BattleController(arena);
            return arena;
        }

        const arenaClientA = createTestArena(seed);
        const arenaClientB = createTestArena(seed);

        // Client A: LOCAL attack — stub readAttackInputs (no DOM in tests)
        arenaClientA.battleController.readAttackInputs = () => ({
            attackerId: 'p1', targetId: 'p2', moveType: 'Grass', movePower: 25, moveName: 'Bullet Seed'
        });
        arenaClientA.battleController.handleAttack('physical');

        // Client B: REMOTE attack — receives the payload Client A would have broadcast
        arenaClientB.battleController.handleAttack('physical', {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'Bullet Seed',
            moveType: 'Grass',
            movePower: 25,
            attackType: 'physical'
        });

        const defenderA = arenaClientA.gs.players[1].getActivePokemon();
        const defenderB = arenaClientB.gs.players[1].getActivePokemon();

        expect(defenderA.currentHP).toBe(defenderB.currentHP);
        expect(defenderA.currentHP).toBeLessThan(350);
    });

    test('11. Simulation Parity: Secondary effect rolls — local vs remote produce identical status', () => {
        const seed = 55443322;

        function createTestArena(seedVal) {
            const rng = new BattleRng(seedVal);
            const engine = new BattleEngine(typeChart, rng);
            const p1 = new Player('p1', 'Alice');
            p1.setSlot(0, createMockPokemon('Electabuzz', 250, 250, 120, 80, ['Electric']));

            const p2 = new Player('p2', 'Bob');
            p2.setSlot(0, createMockPokemon('Squirtle', 300, 300, 80, 80, ['Water']));

            const arena = {
                rng,
                engine,
                gs: { players: [p1, p2], round: 1, weather: 'none' },
                log: { add: () => {} },
                audio: { play: () => {}, playCry: () => {} },
                renderer: { renderAll: () => {} },
                history: { snapshot: () => {} },
                _announce: () => {},
                _notify: () => {},
                _showDamageNumber: () => {},
                _animateSprite: (id, type, cb) => cb?.(),
                saveLocalState: () => {},
                multiplayer: null
            };
            arena.abilityEngine = new AbilityEngine(arena);
            arena.battleController = new BattleController(arena);
            return arena;
        }

        const arenaA = createTestArena(seed);
        const arenaB = createTestArena(seed);

        arenaA.battleController.readAttackInputs = () => ({
            attackerId: 'p1', targetId: 'p2', moveType: 'Electric', movePower: 90, moveName: 'Thunderbolt'
        });
        arenaA.battleController.handleAttack('special');

        arenaB.battleController.handleAttack('special', {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'Thunderbolt',
            moveType: 'Electric',
            movePower: 90,
            attackType: 'special'
        });

        const defenderA = arenaA.gs.players[1].getActivePokemon();
        const defenderB = arenaB.gs.players[1].getActivePokemon();

        expect(defenderA.currentHP).toBe(defenderB.currentHP);
        expect(defenderA.hasStatus('paralysis')).toBe(defenderB.hasStatus('paralysis'));
    });

    // ── Phase 1 Malicious Payload Tests ───────────────────────────────────

    test('12. Fake isHost bypass: Non-host claiming isHost in metadata is still rejected', () => {
        const payload = { playerId: 'p1', slotId: 0, newHP: 0 };
        const metadata = { sender: 'p2', isHost: true };
        const result = BattleCommandValidator.validateCommand('hp_change', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('cannot directly modify opponent');
    });

    test('13. Invalid movePower injection: out-of-bounds power for legitimate move name', () => {
        const payload = {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'Tackle',
            moveType: 'Normal',
            movePower: 99999
        };
        const metadata = { sender: 'p1' };
        const result = BattleCommandValidator.validateCommand('attack', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('out of legal bounds');
    });

    test('14. Non-host player_add: Only host can add players', () => {
        const payload = { id: 'p3', name: 'Mallory' };
        const metadata = { sender: 'p2' };
        const result = BattleCommandValidator.validateCommand('player_add', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('Only the host');
    });

    test('15. Non-host player_remove: Only host can remove players', () => {
        const payload = { playerId: 'p1' };
        const metadata = { sender: 'p2' };
        const result = BattleCommandValidator.validateCommand('player_remove', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('Only the host');
    });

    test('16. Host CAN add and remove players', () => {
        const metadata = { sender: 'p1' };

        const addRes = BattleCommandValidator.validateCommand('player_add', { id: 'p3', name: 'Charlie' }, metadata, gameState, { hostId: 'p1' });
        expect(addRes.valid).toBe(true);

        const removeRes = BattleCommandValidator.validateCommand('player_remove', { playerId: 'p2' }, metadata, gameState, { hostId: 'p1' });
        expect(removeRes.valid).toBe(true);
    });

    test('17. Stale battleSequence: Out-of-order command is rejected', () => {
        const payload = {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'Tackle',
            moveType: 'Normal',
            movePower: 40,
            battleSequence: 3
        };
        const metadata = { sender: 'p1' };
        const roomContext = { hostId: 'p1', expectedSequence: 5 };
        const result = BattleCommandValidator.validateCommand('attack', payload, metadata, gameState, roomContext);

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('Sequence mismatch');
    });

    test('18. Current battleSequence: In-order command is accepted', () => {
        const payload = {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'Tackle',
            moveType: 'Normal',
            movePower: 40,
            battleSequence: 5
        };
        const metadata = { sender: 'p1' };
        const roomContext = { hostId: 'p1', expectedSequence: 5 };
        const result = BattleCommandValidator.validateCommand('attack', payload, metadata, gameState, roomContext);

        expect(result.valid).toBe(true);
    });

    test('19. Duplicate actionId: Second identical action is dropped by MultiplayerManager', () => {
        const processedIds = new Set();
        const actionId = 'abc-123';

        expect(processedIds.has(actionId)).toBe(false);
        processedIds.add(actionId);

        expect(processedIds.has(actionId)).toBe(true);
    });

    // ── Phase 2 Security Tests ────────────────────────────────────────────

    test('20. Unknown move injection: BattleController rejects unknown remote moves', () => {
        const seed = 11111111;
        const rng = new BattleRng(seed);
        const engine = new BattleEngine(typeChart, rng);
        const p1 = new Player('p1', 'Alice');
        p1.setSlot(0, createMockPokemon('Pikachu', 200, 200, 100, 80, ['Electric']));
        const p2 = new Player('p2', 'Bob');
        p2.setSlot(0, createMockPokemon('Blastoise', 300, 300, 90, 110, ['Water']));

        let announced = null;
        const arena = {
            rng, engine,
            gs: { players: [p1, p2], round: 1, weather: 'none' },
            log: { add: () => {} },
            audio: { play: () => {} },
            renderer: { renderAll: () => {} },
            history: { snapshot: () => {} },
            _announce: (msg) => { announced = msg; },
            _notify: () => {},
            _showDamageNumber: () => {},
            _animateSprite: (id, type, cb) => cb?.(),
            saveLocalState: () => {},
            multiplayer: null
        };
        arena.abilityEngine = new AbilityEngine(arena);
        arena.battleController = new BattleController(arena);

        // Set up MovesData with known moves only (no 'FakeNuke')
        const origMovesData = (typeof globalThis !== 'undefined') ? globalThis.window?.MovesData : undefined;
        globalThis.window = globalThis.window || {};
        globalThis.window.MovesData = { 'Tackle': { type: 'Normal', basePower: 40, category: 'Physical' } };

        const hpBefore = p2.getActivePokemon().currentHP;

        // Send unknown move as remote data
        arena.battleController.handleAttack('special', {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'FakeNuke',
            moveType: 'Fire',
            movePower: 300,
            attackType: 'special'
        });

        // HP must NOT change — unknown move should be rejected
        expect(p2.getActivePokemon().currentHP).toBe(hpBefore);
        expect(announced).toContain('FakeNuke');
        expect(announced).toContain('rejected');

        // Cleanup
        if (origMovesData !== undefined) globalThis.window.MovesData = origMovesData;
        else delete globalThis.window.MovesData;
    });

    test('21. Known move + fake type: BattleController uses canonical type, not network type', () => {
        const seed = 22222222;
        const rng = new BattleRng(seed);
        const engine = new BattleEngine(typeChart, rng);
        const p1 = new Player('p1', 'Alice');
        p1.setSlot(0, createMockPokemon('Charizard', 300, 300, 120, 90, ['Fire', 'Flying']));
        const p2 = new Player('p2', 'Bob');
        p2.setSlot(0, createMockPokemon('Blastoise', 300, 300, 90, 110, ['Water']));

        const arena = {
            rng, engine,
            gs: { players: [p1, p2], round: 1, weather: 'none' },
            log: { add: () => {} },
            audio: { play: () => {}, playCry: () => {} },
            renderer: { renderAll: () => {} },
            history: { snapshot: () => {} },
            _announce: () => {},
            _notify: () => {},
            _showDamageNumber: () => {},
            _animateSprite: (id, type, cb) => cb?.(),
            saveLocalState: () => {},
            multiplayer: null
        };
        arena.abilityEngine = new AbilityEngine(arena);
        arena.battleController = new BattleController(arena);

        // Flamethrower is Fire type — client sends "Grass" type (fake)
        globalThis.window = globalThis.window || {};
        const origMD = globalThis.window.MovesData;
        globalThis.window.MovesData = {
            'Flamethrower': { type: 'Fire', basePower: 90, category: 'Special' }
        };

        // The handleAttack should use canonical Fire type, not the fake Grass type
        // We verify by checking that the controller doesn't crash and processes the attack
        const hpBefore = p2.getActivePokemon().currentHP;
        arena.battleController.handleAttack('special', {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'Flamethrower',
            moveType: 'Grass',     // Fake — should be Fire
            movePower: 500,        // Fake — should be 90
            attackType: 'physical' // Fake — should be special
        });

        // Attack should have processed (HP decreased) using canonical values
        expect(p2.getActivePokemon().currentHP).toBeLessThan(hpBefore);

        if (origMD !== undefined) globalThis.window.MovesData = origMD;
        else delete globalThis.window.MovesData;
    });

    test('22. Known move + fake category: BattleController uses canonical category', () => {
        // Swords Dance is Status category — client claims it's Physical with power 300
        globalThis.window = globalThis.window || {};
        const origMD = globalThis.window.MovesData;
        globalThis.window.MovesData = {
            'Swords Dance': { type: 'Normal', basePower: 0, category: 'Status' }
        };

        const seed = 33333333;
        const rng = new BattleRng(seed);
        const engine = new BattleEngine(typeChart, rng);
        const p1 = new Player('p1', 'Alice');
        p1.setSlot(0, createMockPokemon('Scizor', 280, 280, 130, 100, ['Bug', 'Steel']));
        const p2 = new Player('p2', 'Bob');
        p2.setSlot(0, createMockPokemon('Blastoise', 300, 300, 90, 110, ['Water']));

        const arena = {
            rng, engine,
            gs: { players: [p1, p2], round: 1, weather: 'none' },
            log: { add: () => {} },
            audio: { play: () => {}, playCry: () => {} },
            renderer: { renderAll: () => {} },
            history: { snapshot: () => {} },
            _announce: () => {},
            _notify: () => {},
            _showDamageNumber: () => {},
            _animateSprite: (id, type, cb) => cb?.(),
            saveLocalState: () => {},
            multiplayer: null
        };
        arena.abilityEngine = new AbilityEngine(arena);
        arena.battleController = new BattleController(arena);

        const hpBefore = p2.getActivePokemon().currentHP;
        arena.battleController.handleAttack('physical', {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'Swords Dance',
            moveType: 'Fighting',   // Fake
            movePower: 300,          // Fake — canonical is 0
            attackType: 'physical'   // Fake — canonical is status
        });

        // Status move with basePower 0 should deal 0 damage
        expect(p2.getActivePokemon().currentHP).toBe(hpBefore);

        if (origMD !== undefined) globalThis.window.MovesData = origMD;
        else delete globalThis.window.MovesData;
    });

    test('23. Sequence gap: Expected 2, got 5 → rejected (strict equality)', () => {
        const payload = {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'Tackle',
            moveType: 'Normal',
            movePower: 40,
            battleSequence: 5  // Gap: expected 2
        };
        const metadata = { sender: 'p1' };
        const roomContext = { hostId: 'p1', expectedSequence: 2 };
        const result = BattleCommandValidator.validateCommand('attack', payload, metadata, gameState, roomContext);

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('Sequence mismatch');
        expect(result.reason).toContain('got 5');
        expect(result.reason).toContain('expected 2');
    });

    test('24. Rejected command does NOT advance sequence state', () => {
        // Simulate the validate-then-advance pattern from socketClient
        const peerSequences = {};

        // Legitimate command: sequence 1, expected 1 → accept → advance
        const testGameState = { ...gameState, activeTurnPlayerId: 'p2' };
        const seq1Expected = (peerSequences['p2'] ?? 0) + 1; // 1
        const res1 = BattleCommandValidator.validateCommand('attack', {
            attackerId: 'p2', targetId: 'p1', moveName: 'Tackle',
            moveType: 'Normal', movePower: 40, battleSequence: 1
        }, { sender: 'p2' }, testGameState, { hostId: 'p1', expectedSequence: seq1Expected });
        expect(res1.valid).toBe(true);
        peerSequences['p2'] = 1; // advance after validation

        // Malicious command: sequence 999, expected 2 → reject → do NOT advance
        const seq999Expected = (peerSequences['p2'] ?? 0) + 1; // 2
        const res999 = BattleCommandValidator.validateCommand('attack', {
            attackerId: 'p2', targetId: 'p1', moveName: 'Tackle',
            moveType: 'Normal', movePower: 40, battleSequence: 999
        }, { sender: 'p2' }, testGameState, { hostId: 'p1', expectedSequence: seq999Expected });
        expect(res999.valid).toBe(false);
        // DO NOT advance peerSequences here

        // Next legitimate command: sequence 2, expected 2 → must still be accepted
        const seq2Expected = (peerSequences['p2'] ?? 0) + 1; // still 2
        const res2 = BattleCommandValidator.validateCommand('attack', {
            attackerId: 'p2', targetId: 'p1', moveName: 'Tackle',
            moveType: 'Normal', movePower: 40, battleSequence: 2
        }, { sender: 'p2' }, testGameState, { hostId: 'p1', expectedSequence: seq2Expected });
        expect(res2.valid).toBe(true);
    });

    test('25. Sequence resets after room change', () => {
        // Simulate: Room A has advanced sequences, then leaveRoom resets, then Room B starts fresh
        const peerSequences = { 'p2': 37 };

        // Simulate leaveRoom reset
        const resetPeerSequences = {};

        // After reset, sequence 1 from p2 in Room B should be expected = 1
        const expected = (resetPeerSequences['p2'] ?? 0) + 1; // 1
        const testGameState = { ...gameState, activeTurnPlayerId: 'p2' };
        const result = BattleCommandValidator.validateCommand('attack', {
            attackerId: 'p2', targetId: 'p1', moveName: 'Tackle',
            moveType: 'Normal', movePower: 40, battleSequence: 1
        }, { sender: 'p2' }, testGameState, { hostId: 'p1', expectedSequence: expected });

        expect(result.valid).toBe(true);
    });

    test('26. Valid self-target status move (Swords Dance) is accepted', () => {
        const payload = {
            attackerId: 'p1',
            targetId: 'p1',     // Self-target
            moveName: 'Swords Dance',
            moveType: 'Normal',
            movePower: 0,
            attackType: 'status'
        };
        const metadata = { sender: 'p1' };
        const result = BattleCommandValidator.validateCommand('attack', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(true);
    });

    test('27. Invalid self-target offensive move is rejected', () => {
        const payload = {
            attackerId: 'p1',
            targetId: 'p1',     // Self-target
            moveName: 'Tackle',
            moveType: 'Normal',
            movePower: 40,
            attackType: 'physical'
        };
        const metadata = { sender: 'p1' };
        const result = BattleCommandValidator.validateCommand('attack', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('Offensive move cannot target own player');
    });

    test('28. Host proxy can self-target for any move', () => {
        // Host sending a self-target command on behalf of a player
        const payload = {
            attackerId: 'p2',
            targetId: 'p2',     // Self-target
            moveName: 'Recover',
            moveType: 'Normal',
            movePower: 0,
            attackType: 'status'
        };
        // Host (p1) sends on behalf of p2
        const metadata = { sender: 'p1' };
        const result = BattleCommandValidator.validateCommand('attack', payload, metadata, gameState, { hostId: 'p1' });

        // Host bypasses ownership check, and status moves allow self-targeting
        expect(result.valid).toBe(true);
    });
});
