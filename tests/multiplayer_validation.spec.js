import { test, expect } from '@playwright/test';
import { BattleCommandValidator } from '../src/engine/services/BattleCommandValidator.js';
import { BattleController } from '../src/engine/services/BattleController.js';
import { BattleEngine } from '../src/engine/services/BattleEngine.js';
import { AbilityEngine } from '../src/engine/services/AbilityEngine.js';
import { BattleRng } from '../src/engine/utils/BattleRng.js';
import { Player } from '../src/engine/models/Player.js';
import { Pokemon } from '../src/engine/models/Pokemon.js';
import { typeChart } from '../src/engine/data/constants.js';

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
            attackerId: 'p1', // Owned by Alice
            targetId: 'p2',
            moveName: 'Thunderbolt',
            moveType: 'Electric',
            movePower: 90
        };
        const metadata = { sender: 'p2', isHost: false }; // Sent by Bob
        const result = BattleCommandValidator.validateCommand('attack', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('does not own');
    });

    test('2. Attack targeting self / own Pokémon is rejected', () => {
        const payload = {
            attackerId: 'p1',
            targetId: 'p1', // Attacking self
            moveName: 'Tackle',
            moveType: 'Normal',
            movePower: 40
        };
        const metadata = { sender: 'p1', isHost: false };
        const result = BattleCommandValidator.validateCommand('attack', payload, metadata, gameState, { hostId: 'p1' });

        expect(result.valid).toBe(false);
        expect(result.reason).toContain('cannot target itself or own player');
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
        playerB.getActivePokemon().currentHP = 0; // Fainted Blastoise
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
        const metadata = { sender: 'p1', isHost: true };
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

    test('10. Unified Combat Simulation Parity: Multi-hit attack produces identical damage on both clients with shared BattleRng', () => {
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
                saveLocalState: () => {}
            };
            arena.abilityEngine = new AbilityEngine(arena);
            arena.battleController = new BattleController(arena);
            return arena;
        }

        const arenaClientA = createTestArena(seed);
        const arenaClientB = createTestArena(seed);

        // Multi-hit move Bullet Seed (Grass, 25 power, Physical)
        const moveAction = {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'Bullet Seed',
            moveType: 'Grass',
            movePower: 25,
            attackType: 'physical'
        };

        // Client A runs as local attack
        arenaClientA.battleController.handleAttack('physical', moveAction);

        // Client B runs as remote attack received from Client A
        arenaClientB.battleController.handleAttack('physical', moveAction);

        const defenderA = arenaClientA.gs.players[1].getActivePokemon();
        const defenderB = arenaClientB.gs.players[1].getActivePokemon();

        // With shared seeded RNG and unified pipeline, defender HP must match exactly!
        expect(defenderA.currentHP).toBe(defenderB.currentHP);
        expect(defenderA.currentHP).toBeLessThan(350);
    });

    test('11. Unified Combat Simulation Parity: Secondary effect rolls evaluate identically on both clients with shared BattleRng', () => {
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
                saveLocalState: () => {}
            };
            arena.abilityEngine = new AbilityEngine(arena);
            arena.battleController = new BattleController(arena);
            return arena;
        }

        const arenaA = createTestArena(seed);
        const arenaB = createTestArena(seed);

        const moveAction = {
            attackerId: 'p1',
            targetId: 'p2',
            moveName: 'Thunderbolt',
            moveType: 'Electric',
            movePower: 90,
            attackType: 'special'
        };

        arenaA.battleController.handleAttack('special', moveAction);
        arenaB.battleController.handleAttack('special', moveAction);

        const defenderA = arenaA.gs.players[1].getActivePokemon();
        const defenderB = arenaB.gs.players[1].getActivePokemon();

        expect(defenderA.currentHP).toBe(defenderB.currentHP);
        expect(defenderA.hasStatus('paralysis')).toBe(defenderB.hasStatus('paralysis'));
    });
});
