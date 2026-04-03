# Product Requirements Document (PRD)

## 1. Product Overview
- **Project Title**: Pokémon Battle Arena
- **Version**: 1.0.1
- **Last Updated**: 2026-03-22
- **Owner**: Sapeksh Sapeksh

## 2. Problem Statement
Existing Pokémon battle simulators are often feature-heavy, requiring account creation, complex team building sheets, or client downloads. There is a need for a lightweight, fast, zero-installation retro-style simulator that allows friends to jump right into real-time battles using a simple 6-digit room code.

## 3. Goals & Objectives
### Business Goals
- Deliver a stable multiplayer experience with minimal latency (<100ms sync) using Firebase RTDB.
- Achieve formulaic parity with core Pokémon battle mechanics (Generation 5 / Black & White era as a baseline).

### User Goals
- Quickly build a team of 6 from a dataset of 1000+ Pokémon.
- Connect to an opponent via a 6-digit room code with zero friction.
- Experience a nostalgic, pixel-art battle interface with dynamic audio.

## 4. Success Metrics
- **Connection Speed**: Time from entering room code to joining Lobby < 2 seconds.
- **Sync Reliability**: Complete parity of HP, stats, and weather states across peers during a continuous 20-turn battle.
- **Game Accuracy**: Damage calculations perfectly match authentic formulas (incorporating Level, Power, A/D scaling, STAB, Type Multipliers, and 85-100% RNG variance).

## 5. Target Users & Personas
### Primary Persona: Retro Gamer / Pokémon Fan
- **Demographics**: 15-35 years old.
- **Pain Points**: Existing simulators are too complex; lack of casual "instant play" options.
- **Goals**: Quick battles with faithful mechanics.
- **Technical Proficiency**: Moderate.

## 6. Features & Requirements
### Must-Have Features (P0)
1. **Real-Time Multiplayer Sync**
   - User Story: As a player, I want to see opponent moves instantly so the battle flows naturally.
   - Acceptance Criteria: Client-side engine resolves the turn and patches Firebase `/rooms/$roomId` synchronously.

2. **Core Battle Engine Mechanics**
   - User Story: As a competitive battler, I expect a super-effective STAB move to deal expected damage.
   - Acceptance Criteria: 
     - Formula: `((((2 * Level / 5) + 2) * Power * A / D) / 50 + 2) * Weather * STAB * Type * RNG`
     - Physical vs Special split is accurately respected.

3. **Team Management & Selection**
   - User Story: As a player, I want to customize my team before the battle starts.
   - Acceptance Criteria: `UIRenderer` builds a paginated/scrollable list of Pokémon indexed by a Trie for instant O(1) text search.

### Should-Have Features (P1)
1. **Form Changes & Evolutions (In-Battle)**
   - User Story: As a player, I want to use regional variants (e.g., Alolan Diglett) or perform mid-battle evolutions.
   - Acceptance Criteria: The FORM button accesses `db.getForms()` securely, swapping stats, types, and the sprite dynamically, retaining fractional HP ratio.

2. **Status and Weather Effects**
   - Acceptance Criteria:
     - **Weather**: Hail, Sandstorm (1/16th Max HP end-of-turn damage unless immune via type), Rain (Water dmg x1.5), Sun (Fire dmg x1.5).
     - **Status**: Burn (Atk x0.5), Paralyze (Spd x0.25).

### Nice-to-Have Features (P2)
1. **Undo/Redo System**
   - Description: Ability to rollback turns for RNG testing.
   - Acceptance Criteria: Utilizing `RingBuffer.js` to store the last 50 turns without memory leaks, seamlessly re-rendering previous states.

## 7. Explicitly OUT OF SCOPE
- 3D Graphics or Animations (Strict 2D Pixel Art enforced).
- Single-player AI Campaign Story Mode.
- Complex Item Management (Potions, Revives) in this iteration.
- Account Registration/OAuth (relying solely on ephemeral room codes).

## 8. User Scenarios
### Scenario 1: Quick Battle Setup
- **Context**: Two friends decide to battle.
- **Steps**: 
  1. Player A opens site, enters "123456", joins.
  2. Player B enters "123456", joins.
  3. Both select teams via dropdowns and click "Ready".
- **Expected Outcome**: They enter the synced battle arena simultaneously.

## 9. Dependencies & Constraints
- **Technical Constraints**: Firebase RTDB JSON node structure limits large array pushes. Arrays must be patched as objects where possible to avoid index collisions.
- **Data Dependencies**: `Pokemon_NewDataset.js`, `moves_data.js` must be pre-loaded fully before the app mounts. Memory constraint ~15MB for raw JSON objects.

## 10. Timeline & Milestones
- **MVP**: Combat logic, DOM rendering, UI shell.
- **V1.0**: Multiplayer sync, Weather, Statuses.
- **V1.1**: Responsive layout fixes, deep form change resolutions (Current).

## 11. Security & NFRs
- **Performance**: DOM updates batched using `requestAnimationFrame` where possible.
- **Security**: Prevent XSS by escaping player names in the Battle Log.
- **Accessibility**: 16:9 fixed ratio scaled via `vmin` to remain wholly visible on any monitor, high contrast pixel fonts.

## 12. Future Scope
- **Advanced Combat Mechanics**: Implementation of Held Items (e.g., Choice Band, Leftovers) and Abilities with mid-turn triggers.
- **Status & Field Hazards**: Integrating Stealth Rock, Spikes, and lingering field effects (Terrain) to deepen competitive viability.
- **Matchmaking & Accounts**: Optional Firebase Auth integration to store player Elo ratings, win/loss records, and saved custom teams across sessions.
- **VFX & Animations**: Transitioning from CSS DOM transforms to Canvas/WebGL-based particle effects for distinct move types (e.g., Fire Blast, Hydro Pump).
- **Spectator Mode**: Allowing non-combatants to join a room code simply to watch the battle sync in real-time.
