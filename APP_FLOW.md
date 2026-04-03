# Application Flow & Navigation

## 1. Entry Points
### Primary Entry Point
- **Lobby Modal Overlay**: Automatically mounts via `index.html` masking the main UI (`<div id="lobby-overlay">`).

## 2. Core User Flows

### Flow 1: Session Initialization (Lobby → Game)
**Goal**: Connect with an opponent to start a match.

#### Happy Path
1. **State: DOM Loaded**
   - `window.MergedPokemonData` and dependencies load. `script.js` invokes `init()`.
2. **Page: Lobby Modal**
   - Elements: Name Input, Room Code Input, Audio Toggle.
   - User Action: Submits credentials.
   - Trigger: `socketClient.joinRoom(roomId, playerName)` executes.
3. **Network**: Firebase checks `/rooms/$roomId`. If 404, creates room with `hostId: localPlayer`. Pushes user to `/rooms/$roomId/players`.
4. **State Transition**: Lobby `display: none`. Game UI `opacity: 1; pointer-events: auto`.
5. **System Action**: `UIRenderer.renderAll(state)` fires, painting the 6 empty player card slots.

### Flow 2: Live Battle Execution
**Goal**: Engage in turn-based combat.

#### Happy Path
1. **Page: Attack Command Panel**
   - User Action: Selects Attacker (Dropdown), Selects Target (Dropdown).
   - Dynamic Update: Move dropdown populates based on Attacker moveset.
2. **Page: Status & Stats Panel**
   - Trigger: User selects a Move.
   - UI: Pre-loads the selected Move's Base Power and Type into the display grid.
3. **Execution**:
   - User Action: Clicks Attack (Physical/Special depending on move).
   - System Action: `BattleEngine.executeAttack()` calculates RNG, STAB, Type Effectiveness, Weather modifiers.
   - Memory Update: Opponent HP decreases, Status applies.
4. **Network**: `socketClient.updateState()` broadcasts the changed memory objects array to Firebase.
5. **Visual Feedback**:
   - Opponent's circular SVG HP Gauge dynamically recalculates `stroke-dasharray` via CSS transitions.
   - Pokémon Sprite `transform: translateX` animation fires (shake effect).
   - Battle Log appends string: `[Attacker] used [Move]! It's super effective!`.

### Flow 3: Form Change / Evolution Handling
**Goal**: Swap a Pokémon to an alternate form or evolve mid-battle.

#### Happy Path
1. **Page: Management Controls Panel**
   - User Action: Selects Active Pokémon from dropdown.
   - System: Analyzes `db.getForms(fullName)` by resolving dataset strings (`node?.Name || node?.name`).
   - UI Update: Unlocks `[EVO]` or `[FORM]` buttons.
2. **Action: Mousedown `[FORM]`**
   - Trigger: `UIRenderer.openFormChangeModal()` fires.
3. **Page: Form Modal Overlay**
   - Display: Grid of form sprites (e.g., Alolan, Galarian).
   - User Action: Clicks Form.
   - System Action: `Pokemon._updateFormOrEvolution()` triggers. Recalculates MaxHP, retains current percentage HP ratio to prevent 0-division bugs. Merges new types.
4. **Network**: Local `pokemon` object pushed to Firebase. Peers seamlessly re-render the new form sprite immediately.

## 3. Navigation Map (DOM Hierarchy)
```text
body
├── #lobby-overlay (z-index: 100)
├── main-container (dynamic vmin scaling)
│   ├── #arena-header (Scores, Round Timer)
│   ├── .arena-grid (Active Pokémon Cards - 6 slots)
│   │   └── .player-card (Sprite, Types, Scaled SVG HP Gauge, Raw Stats)
│   └── footer-controls
│       ├── .panel-attack (Moves, Power, Types)
│       ├── .panel-status (Ailment Buttons, Weather Toggles)
│       ├── .panel-utility (RNG Roller 1-100)
│       ├── .panel-management (Form, Evo, Team Swapper)
│       ├── .panel-history (Undo / Redo buffers)
│       └── .panel-battlelog (Auto-scrolling terminal output)
```

## 4. Screen Inventory & States

### Screen: Main Battle Interface
- **State: Preparation (Pre-Battle)**
   - All panels locked except `.panel-management`.
   - Goal: Players construct their 6-mon team.
- **State: Active Combat**
   - All panels unlocked.
   - Goal: Perform actions.
- **State: Room Full / Disconnected**
   - Overlay blocks input. Message details connection loss. Re-attempts Firebase reconnection automatically.

## 5. Event Driven Micro-Interactions
- **SVG HP Gauge**: Relies on a CSS circumfrence calculation `getHPPercent()`. Guards against `maxHp === 0` to prevent `NaN` crashes on invalid spawns.
- **CSS Modals**: Use class-based `.hidden` toggle instead of DOM removal to maintain layout painting speed.
