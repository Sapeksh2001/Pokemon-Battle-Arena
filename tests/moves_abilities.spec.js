import { test, expect } from '@playwright/test';
import { Pokemon } from '../src/engine/models/Pokemon.js';
import { Player } from '../src/engine/models/Player.js';
import { BattleEngine, applyMoveEffect, applyStatusCondition, applyStatStage } from '../src/engine/services/BattleEngine.js';
import { AbilityEngine } from '../src/engine/services/AbilityEngine.js';
import { BattleController } from '../src/engine/services/BattleController.js';
import { PokemonBattleArena } from '../src/engine/main.js';

// Helper to create test Pokémon
function createPokemon(config = {}) {
    const rawData = {
        name: config.name || 'Pikachu',
        stats: {
            hp: config.hp || 160,
            atk: 100,
            def: 100,
            spa: 100,
            spd: 100,
            spe: 100,
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

// Helper to create a minimal simulated arena
function createSimulatedArena() {
    const arena = {
        gs: {
            round: 1,
            weather: 'none',
            weatherTurnsLeft: 0,
            terrain: null,
            players: [],
            log: [],
            delayedEffects: [],
        },
        log: {
            add: (msg, type) => arena.gs.log.push(typeof msg === 'string' ? msg : msg?.msg || String(msg))
        },
        _notify: (msg, type) => arena.gs.log.push(typeof msg === 'string' ? msg : msg?.msg || String(msg)),
        _showDamageNumber: () => {},
        _animateSprite: (id, type, cb) => cb?.(),
        _announce: () => {},
        saveLocalState: () => {},
        renderer: { renderAll: () => {} },
        audio: { play: () => {}, playCry: () => {} }
    };
    arena.gs.arena = arena;
    arena.engine = new BattleEngine();
    arena.abilityEngine = new AbilityEngine(arena);
    arena.battleController = new BattleController(arena);
    return arena;
}

test.describe('Phase 6: Move & Ability Effects Dispatch Chain Verification', () => {

    test('1. Thunder Punch applies paralysis status condition and logs correctly', () => {
        const arena = createSimulatedArena();
        const user = createPokemon({ name: 'Electabuzz', types: ['Electric'] });
        const target = createPokemon({ name: 'WaterPoke', types: ['Water'] });

        const move = {
            name: 'Thunder Punch',
            type: 'Electric',
            category: 'Physical',
            power: 75,
            secondary: { status: 'par', chance: 100 }
        };

        applyMoveEffect(move, user, target, 50, arena.gs);

        expect(target.hasStatus('paralysis')).toBe(true);
        expect(target.status).toBe('paralysis');
        const parLog = arena.gs.log.find(l => (typeof l === 'string' ? l : l.msg || '').includes('paralyzed'));
        expect(parLog).toBeDefined();
    });

    test('2. Flamethrower applies burn status condition and deals 1/16 max HP tick damage at end of turn', () => {
        const arena = createSimulatedArena();
        const p1 = new Player(1, 'Trainer 1');
        const p2 = new Player(2, 'Trainer 2');
        const user = createPokemon({ name: 'Charizard', types: ['Fire', 'Flying'] });
        const target = createPokemon({ name: 'GrassPoke', types: ['Grass'], hp: 160 });

        p1.setSlot(0, user);
        p2.setSlot(0, target);
        arena.gs.players = [p1, p2];

        const move = {
            name: 'Flamethrower',
            type: 'Fire',
            category: 'Special',
            power: 90,
            secondary: { status: 'brn', chance: 100 }
        };

        applyMoveEffect(move, user, target, 60, arena.gs);
        expect(target.hasStatus('burn')).toBe(true);

        const hpBefore = target.currentHP; // 160
        arena.battleController.resolveEndOfTurn(arena.gs);

        // 160 * 1/16 = 10 damage
        expect(target.currentHP).toBe(hpBefore - 10);
    });

    test('3. Drain Punch heals attacker for 50% of damage dealt', () => {
        const arena = createSimulatedArena();
        const user = createPokemon({ name: 'Hitmonchan', types: ['Fighting'], hp: 100, currentHP: 40 });
        const target = createPokemon({ name: 'Snorlax', types: ['Normal'], hp: 200 });

        const move = {
            name: 'Drain Punch',
            type: 'Fighting',
            category: 'Physical',
            power: 75,
            drain: [1, 2] // 50% drain
        };

        const damageDealt = 60;
        applyMoveEffect(move, user, target, damageDealt, arena.gs);

        // User started at 40 HP, healed 50% of 60 = 30 HP -> 70 HP
        expect(user.currentHP).toBe(70);
    });

    test('4. Brave Bird deals 33% recoil damage to user based on damage dealt', () => {
        const arena = createSimulatedArena();
        const user = createPokemon({ name: 'Staraptor', types: ['Normal', 'Flying'], hp: 120, currentHP: 120 });
        const target = createPokemon({ name: 'Machamp', types: ['Fighting'], hp: 150 });

        const move = {
            name: 'Brave Bird',
            type: 'Flying',
            category: 'Physical',
            power: 120,
            recoil: [33, 100] // 33% recoil
        };

        const damageDealt = 90;
        applyMoveEffect(move, user, target, damageDealt, arena.gs);

        // 90 * 0.33 = 29 recoil damage -> 120 - 29 = 91 HP
        expect(user.currentHP).toBe(120 - Math.floor(90 * 0.33));
    });

    test('5. Swords Dance increases user Attack stages by +2', () => {
        const arena = createSimulatedArena();
        const user = createPokemon({ name: 'Garchomp', types: ['Dragon', 'Ground'] });
        const target = createPokemon({ name: 'Opponent', types: ['Normal'] });

        const move = {
            name: 'Swords Dance',
            type: 'Normal',
            category: 'Status',
            power: 0,
            target: 'self',
            statChanges: [{ stat: 'atk', change: 2 }]
        };

        applyMoveEffect(move, user, target, 0, arena.gs);

        const atkStage = user.statStages.atk ?? user.statStages.attack;
        expect(atkStage).toBe(2);
        expect(user.statModifiers.atk ?? user.statModifiers.attack).toBeGreaterThan(0);
    });

    test('6. Flame Body burns attacker upon making contact', () => {
        const arena = createSimulatedArena();
        const attacker = createPokemon({ name: 'Lucario', types: ['Fighting', 'Steel'] });
        const defender = createPokemon({ name: 'Magmortar', types: ['Fire'], ability: 'Flame Body' });

        const contactMove = {
            name: 'Close Combat',
            type: 'Fighting',
            category: 'Physical',
            flags: { contact: 1 }
        };

        arena.abilityEngine.onHit(attacker, defender, contactMove, 50, arena.gs, { forceTrigger: true });

        expect(attacker.hasStatus('burn')).toBe(true);
    });

    test('7. Speed Boost raises Speed by +1 stage at end of turn', () => {
        const arena = createSimulatedArena();
        const user = createPokemon({ name: 'Ninjask', types: ['Bug', 'Flying'], ability: 'Speed Boost' });

        arena.abilityEngine.onEndOfTurn(user, arena.gs);

        const speStage = user.statStages.spe ?? user.statStages.speed;
        expect(speStage).toBe(1);
        expect(user.statModifiers.spe ?? user.statModifiers.speed).toBeGreaterThan(0);
    });

    test('8. Intimidate lowers opponent Attack stage by -1 on switch-in', () => {
        const arena = createSimulatedArena();
        const user = createPokemon({ name: 'Gyarados', types: ['Water', 'Flying'], ability: 'Intimidate' });
        const opponent = createPokemon({ name: 'Tyranitar', types: ['Rock', 'Dark'] });

        arena.abilityEngine.onSwitchIn(user, opponent, arena.gs);

        const oppAtkStage = opponent.statStages.atk ?? opponent.statStages.attack;
        expect(oppAtkStage).toBe(-1);
        expect(opponent.statModifiers.atk ?? opponent.statModifiers.attack).toBeLessThan(0);
    });

    test('9. Sandstorm deals 1/16 max HP tick damage per turn to non-immune Pokémon for 2 turns', () => {
        const arena = createSimulatedArena();
        const p1 = new Player(1, 'Trainer 1');
        const p2 = new Player(2, 'Trainer 2');

        const normalPoke = createPokemon({ name: 'Pikachu', types: ['Electric'], hp: 160 });
        const steelPoke = createPokemon({ name: 'Steelix', types: ['Steel', 'Ground'], hp: 200 });

        p1.setSlot(0, normalPoke);
        p2.setSlot(0, steelPoke);
        arena.gs.players = [p1, p2];
        arena.gs.weather = 'sandstorm';
        arena.gs.weatherTurnsLeft = 5;

        // Turn 1
        arena.battleController.resolveEndOfTurn(arena.gs);
        expect(normalPoke.currentHP).toBe(160 - 10); // 160 - 10 = 150
        expect(steelPoke.currentHP).toBe(200);        // Steel immune to Sandstorm

        // Turn 2
        arena.battleController.resolveEndOfTurn(arena.gs);
        expect(normalPoke.currentHP).toBe(150 - 10); // 150 - 10 = 140
        expect(steelPoke.currentHP).toBe(200);        // Steel still immune
    });

    test('10. Toxic status damage escalates over 3 turns (1/16, 2/16, 3/16 max HP)', () => {
        const arena = createSimulatedArena();
        const p1 = new Player(1, 'Trainer 1');
        const target = createPokemon({ name: 'Blissey', types: ['Normal'], hp: 160 });

        p1.setSlot(0, target);
        arena.gs.players = [p1];

        applyStatusCondition(target, 'toxic', arena.gs);
        expect(target.hasStatus('toxic')).toBe(true);

        // Turn 1: 1/16 of 160 = 10 dmg -> 150 HP
        arena.battleController.resolveEndOfTurn(arena.gs);
        expect(target.currentHP).toBe(150);

        // Turn 2: 2/16 of 160 = 20 dmg -> 130 HP
        arena.battleController.resolveEndOfTurn(arena.gs);
        expect(target.currentHP).toBe(130);

        // Turn 3: 3/16 of 160 = 30 dmg -> 100 HP
        arena.battleController.resolveEndOfTurn(arena.gs);
        expect(target.currentHP).toBe(100);
    });

    test('11. Status immunities: Fire type immune to burn, Steel type immune to poison', () => {
        const arena = createSimulatedArena();
        const firePoke = createPokemon({ name: 'Arcanine', types: ['Fire'] });
        const steelPoke = createPokemon({ name: 'Metagross', types: ['Steel', 'Psychic'] });

        const burnApplied = applyStatusCondition(firePoke, 'burn', arena.gs);
        expect(burnApplied).toBe(false);
        expect(firePoke.hasStatus('burn')).toBe(false);

        const poisonApplied = applyStatusCondition(steelPoke, 'poison', arena.gs);
        expect(poisonApplied).toBe(false);
        expect(steelPoke.hasStatus('poison')).toBe(false);
    });

    test('12. Ability status immunity: Limber prevents paralysis, Water Veil prevents burn', () => {
        const arena = createSimulatedArena();
        const limberPoke = createPokemon({ name: 'Ditto', ability: 'Limber', types: ['Normal'] });
        const waterVeilPoke = createPokemon({ name: 'Wailord', ability: 'Water Veil', types: ['Water'] });

        expect(AbilityEngine.checkStatusImmunity('Limber', 'paralysis')).toBe(true);
        expect(AbilityEngine.checkStatusImmunity('Water Veil', 'burn')).toBe(true);

        const parApplied = applyStatusCondition(limberPoke, 'paralysis', arena.gs);
        expect(parApplied).toBe(false);

        const burnApplied = applyStatusCondition(waterVeilPoke, 'burn', arena.gs);
        expect(burnApplied).toBe(false);
    });

    test('13. resolveEndOfTurn notifies UI through window.__arenaNotify', () => {
        const arena = createSimulatedArena();
        let notifiedState = null;
        globalThis.window = globalThis.window || {};
        globalThis.window.__arenaNotify = (gs) => { notifiedState = gs; };

        arena.battleController.resolveEndOfTurn(arena.gs);

        expect(notifiedState).toBe(arena.gs);
    });
});
