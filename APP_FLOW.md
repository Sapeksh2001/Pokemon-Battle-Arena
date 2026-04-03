# Application Flow & Navigation: Pokémon Battle Arena

## 1. Entry Points
### Primary Entry Points
- **Landing Page (Direct URL)**: The starting point where users enter their trainer name and a join code.
- **Deep Links (Room Invitations)**: Direct access to a specific room via `?room=[CODE]` parameters (planned).

### Secondary Entry Points
- **Social Shares**: Standard links shared via Discord/Twitter that land on the lobby overlay.

---

## 2. Core User Flows

### Flow 1: Room Initialization (Lobby)
**Goal**: Establish a synchronized session with up to 5 other players.
**Entry Point**: Landing Page overlay.

#### Happy Path
1. **Screen: Welcome Overlay**
   - Elements: Name Input, 6-Digit Code Input, Audio Toggle.
   - User Action: Enters "Ash" and code "123456", clicks "Join Room".
   - Trigger: `socketClient.joinRoom()` initiates Firebase handshake.
2. **Screen: Active Lobby**
   - Elements: Participant List (Sprites + Names), Ready Toggle, Room Code Display.
   - System Action: `players/` node in Firebase updates; all clients re-render list.
   - User Action: Clicks "Ready".
3. **Trigger**: Once all players are "Ready", the host (first player) clicks "Start Battle".
4. **Transition**: CSS Fade transition (300ms) from Lobby Overlay to Battle Arena.

#### Error States
- **Invalid Room Code**: Red inline message "Room code must be 6 digits".
- **Room Full**: Modal popup "This arena is at capacity (6/6)".
- **Connection Lost**: Banner at top "Reconnecting to Firebase..." with automatic retry logic.

---

### Flow 2: Battle Execution (Arena)
**Goal**: Defeat opponents through turn-based combat.
**Entry Point**: Battle Arena (Post-Lobby).

#### Happy Path
1. **Screen: Arena Dashboard**
   - Elements: 6 Player Cards (HP Gauges, Status Icons), Battle Log, Control Panel.
2. **User Action: Select Move**
   - Action: User clicks a move (e.g., "Thunderbolt") in the Attack Panel.
   - System Action: `BattleEngine` calculates damage vs target.
3. **Execution & Sync**
   - System Action: Local state updates → Pushed to Firebase → Remote clients pull change.
   - Visual: HP bar slides down; Battle Log appends "Pikachu used Thunderbolt!".
4. **Success State**: Opponent HP reaches 0; "Fainted" status applied.

#### Edge Cases
- **Simultaneous Moves**: Firebase Transactions ensure the first turn processed is the one recorded.
- **Player Leaves**: "Player Ash has disconnected" logged; their Pokémon becomes inactive.

---

## 3. Navigation Map (DOM Hierarchy)
```text
Root
└── index.html
    ├── #lobby-overlay (Z-Index: 1000)
    │   ├── .welcome-screen (Login/Join)
    │   └── .lobby-screen (Room Management)
    └── #main-arena (Z-Index: 1)
        ├── .arena-header (Global Stats/Timer)
        ├── .battle-grid (6 Player Cards)
        │   └── .pokemon-card (Sprite, HP, Status)
        └── .control-footer (Action Panels)
            ├── .panel-attack (Moves)
            ├── .panel-management (Switch/Evo)
            └── .panel-battlelog (Holographic terminal)
```

---

## 4. Screen Inventory

### Screen: Lobby Overlay
- **Route**: `/` (Overlay state)
- **Purpose**: Identity and room association.
- **Key Actions**: `Join`, `Create`, `Toggle Audio`, `Ready`.

### Screen: Battle Arena
- **Route**: `/` (Main UI state)
- **Purpose**: Core gameplay loop.
- **Key Actions**: `Attack`, `Switch`, `Evolve`, `Change Terrain`.
- **Variants**: `Loading`, `Active Turn`, `Game Over`.

---

## 5. Decision Points

### Decision: User Authentication
```text
IF localName is empty
THEN show: Welcome Screen
ELSE IF roomCode is valid
THEN show: Lobby Screen
AND initialize: Firebase Listener
```

### Decision: Turn Resolution
```text
IF moveType matches currentTerrain
THEN apply: 20% Power Boost
AND log: "Terrain increased move power!"
```

---

## 6. Error Handling Flows

### 404 Room Not Found
- **Display**: Redirect to Welcome Screen with "Room does not exist" toast.

### 500 Firebase Sync Error
- **Display**: Persistent "Sync Error" icon in header.
- **Action**: Pause input until state parity is restored.

---

## 7. Responsive Behavior
- **Desktop**: Full grid (3x2 or 6x1) visible with large Battle Log on the right.
- **Mobile**: Single-column focus; Battle Log becomes a collapsible overlay to save space.
- **Touch**: All buttons have a minimum 44px hit target for mobile play.
