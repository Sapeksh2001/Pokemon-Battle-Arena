# Application Flow & Navigation: Pokémon Battle Arena

## 1. Entry Points
### Primary Entry Points
- **Direct URL**: Users landing on the root domain see the "Welcome Invitation" overlay.
- **Deep Links**: URLs containing `?room=123456` parameters bypass the initial code entry and land directly in the name-entry screen.

### Secondary Entry Points
- **Social Media Invites**: Metadata-rich links (OpenGraph) that allow one-click entry into a lobby.

---

## 2. Core User Flows

### Flow 1: Room Lifecycle (Lobby)
**Goal**: Transition from a single user to a synchronized 6-player group.
**Entry Point**: Root Landing Page.

#### Happy Path
1. **Screen: Welcome Invitation**
   - Elements: Name Input, 6-Digit Code Input, Join/Create buttons.
   - User Action: Enters "Ash", enters "654321", clicks "Join".
   - System Action: Handshake with Firebase `rooms/654321`.
2. **Screen: Active Lobby**
   - Elements: Player slots (1-6), Sprite selectors, "Ready" toggle.
   - User Action: Selects "Pikachu" sprite, toggles "Ready".
   - Success State: All players show "Ready" checkmarks; Host clicks "Start Battle".

#### Error States
- **Invalid Name**: Alert "Name must be 2-12 characters".
- **Invalid Code**: Red border on input; "Room not found".
- **Room Full**: Modal "Arena is at capacity (6/6)".

---

### Flow 2: Turn Execution (Arena)
**Goal**: Synchronized move resolution across all clients.
**Entry Point**: Post-Lobby transition.

#### Happy Path
1. **Screen: Battle Arena**
   - Elements: Health bars, Move buttons, Battle log, Terrain indicator, Sprite Pickers.
2. **User Action: Execute Move**
   - User selects an Attacker sprite and a Target sprite from the horizontal pickers.
   - User clicks "Thunderbolt".
   - System Action: `BattleEngine` calculates damage vs target; updates Firebase `battle_state`.
3. **Remote Sync**
   - Other clients receive the `value` update from Firebase.
   - HP bars slide down; Log appends text.

#### Edge Cases
- **Simultaneous Action**: If two players click a move at the exact same millisecond, Firebase security rules/transactions process the first one and the second one is queued or rejected based on turn state.
- **Terrain Shift**: A move that changes terrain (e.g., "Electric Terrain") triggers an immediate background swap and particle effect across all 6 clients.

---

## 3. Navigation Map (DOM State)
```text
Root
└── BattleApp (React State)
    ├── Lobby (Overlay)
    │   ├── LoginView (Public)
    │   └── RoomView (Authenticated/Joined)
    └── Arena (Main)
        ├── HUD (Header: Timer, Terrain)
        ├── Battlefield (Grid: 1-6 Players)
        └── Terminal (Footer: Controls, Log)
```

---

## 4. Screen Inventory

### Screen: Lobby View
- **Route**: state `view: "lobby"`
- **Access**: Public (Joining) / Private (Inside Room)
- **Actions**: `joinRoom()`, `toggleReady()`, `selectSprite()`
- **States**: `Idle`, `Joining`, `Ready`, `Starting`

### Screen: Arena View
- **Route**: state `view: "arena"`
- **Access**: Room-Authenticated
- **Actions**: `useMove()`, `switchPokemon()`, `updateStat()`, `endRound()`, `selectFromPicker()`
- **States**: `Active`, `Resolving`, `Fainted`, `Victory`
- **Picker Interaction**:
  - `Attacker/Target/Status`: Select from horizontal strip of all active Pokémon sprites.
  - `Management`: Select from filtered strip showing only your current active Pokémon.

---

## 5. Decision Points (Engine Logic)

### Decision: User Joining
```text
IF player_count < 6
THEN add_player_to_firebase(room_id, player_data)
AND redirect_to_lobby(room_id)
ELSE
THEN show_modal("Arena Full")
AND block_entry()
```

### Decision: Damage Multipliers
```text
IF move_type == current_terrain_type
THEN apply_multiplier(damage, 1.2)
AND set_message_flag("TERRAIN_BOOST")
ELSE IF target_type == move_type.weakness
THEN apply_multiplier(damage, 2.0)
AND set_message_flag("SUPER_EFFECTIVE")
ELSE
THEN apply_multiplier(damage, 1.0)
```

### Decision: Turn Synchronization
```text
IF current_player_action == "move_selected"
THEN disable_buttons(current_player)
AND push_to_rtdb("battle_state/actions", move_data)
AND wait_for_resolution()
```

---

## 6. Error Handling

### 404 Room Missing
- **Display**: Custom Toast "The arena code you entered has expired or is invalid."
- **Action**: Reset state to `LoginView`.

### Network Desync
- **Display**: "DESYNC DETECTED" banner in the terminal.
- **Action**: Fetch `battle_state` snapshot and force React to re-render all HP bars/Status effects.

---

## 7. Responsive Behavior
- **Mobile**: Vertical stack. HP bars are slimmed to icons. Battle Log is 3 lines high.
- **Desktop**: 3x2 Grid. Full move names. 10-line scrolling Battle Log.
- **Touch Targets**: All interactive labels and buttons >= 48px height.

---

## 8. Animations & Transitions
- **Lobby to Arena**: `fade-in` (500ms) with `blur-out` on lobby elements.
- **HP Change**: `linear-slide` (800ms) for HP bars.
- **Terminal Output**: Typewriter effect (20ms/char) for log entries.
