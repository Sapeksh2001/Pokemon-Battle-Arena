# Phase 3: Implement Firebase JSON Save/Load & Session Restore Feature

## Architecture

Each authenticated user will have their own game save stored in Firebase under:
```
/users/{uid}/saved_games/{roomCode}/snapshot
```
This is separate from the live game state at `/rooms/{code}/state`. The snapshot is an explicit save that persists indefinitely and can be loaded at any time—even after the live room closes—to resume a session and push that snapshot back as the active game state.

1. **Save Game:** The active game state (all Pokemon and live stats) is serialized to JSON and written to `/users/{uid}/saved_games/{roomCode}` in Firebase. Each user gets their own save file, so Player A and Player B can each independently "save" their view of the same room.
2. **Load Game:** A new "LOAD GAME" button in the Lobby opens a modal that fetches the last 20 entries from `/users/{uid}/saved_games`. Selecting one rejoins the room and pushes the saved snapshot back into the live Firebase state.

## Proposed Changes

---

### 1. `src/engine/api/socketClient.js`
Summary of changes:
- Add `saveGameToFirebase()` — serializes the current `gs` and writes to `/users/{uid}/saved_games/{roomCode}` with a timestamp, player names, and Pokemon names for display in the Load menu.
- Add `loadSavedGames()` — reads `/users/{uid}/saved_games`, sorts by timestamp, and populates `#load-game-list` in the Load modal.
- Add `loadAndResume(roomCode)` — fetches the saved snapshot from Firebase, then either rejoins the live room (if still open) or creates a new offline session and pushes the snapshot into it as the initial state.
- Modify `listenToRecentRooms()` to also call `loadSavedGames()` so the Load modal is populated on auth.

#### [MODIFY] socketClient.js
- `saveGameToFirebase()` — writes `serializeGameState()` to `/users/{uid}/saved_games/{roomCode}` alongside display metadata (savedAt, playerCount, pokemonNames).
- `loadSavedGames()` — attaches a `limitToLast(20)` firebase listener on `/users/{uid}/saved_games` and renders into `#load-game-list`.
- `loadAndResume(roomCode)` — fetches the `/users/{uid}/saved_games/{roomCode}` snapshot, reconnects to Firebase, pushes state back to the live room or starts a fresh arena session.

---

### 2. `src/components/ArenaView.jsx`
Summary of changes:
- Add a "SAVE GAME" button in the Battle Log panel header. It calls `saveGameToFirebase()`, which writes the entire game state JSON to Firebase under the current user's record. A success notification confirms the cloud upload.

#### [MODIFY] ArenaView.jsx
- Add `<button id="save-game-btn" onClick={() => window.arena?.multiplayer?.saveGameToFirebase()}>` next to the Export Log button in the Battle Log panel header.

---

### 3. `src/components/LobbyView.jsx`
Summary of changes:
- Add a new full-width "LOAD GAME" action button directly on the main lobby dashboard, beneath the "JOIN ROOM" button.

#### [MODIFY] LobbyView.jsx
- Insert new `<button id="load-game-btn">` that opens the `#load-modal`.

---

### 4. `src/components/Modals.jsx`
Summary of changes:
- Build a dedicated `#load-modal` displaying the 20 most recent database sessions directly tied to the user's Auth session.
- Clicking an entry triggers `window.arena.multiplayer.loadRecentRoomAndResume(roomCode)`.

#### [MODIFY] Modals.jsx
- Define `#load-modal`.
- The `listenToRecentRooms()` inside `socketClient.js` will be modified to populate BOTH the `#recent-rooms-list` in the Join modal, AND a new `#load-recent-rooms-grid` in the Load modal.



## Verification Plan

### Manual Verification
1. Join/Create a multiplayer match.
2. Alter a Pokemon's HP (e.g. from 100 to 50).
3. Click "Save Game". Verify the downloaded JSON accurately reflects the 50 HP.
4. Exit to the Lobby. Click "Load Game". Verify the 20 recent games populate.
5. Click the room just played. Verify you are thrown straight back into the match with HP still at 50.

---

## Phase 4: Quick Play, Lobby UX, and Card Renderer Enhancements

### 1. Quick Play Dynamic Match Configurations
- Allowed dynamic player counts (2 to 6) and Pokémon counts per player (1 to 6) directly in Quick Play Modal.
- Shared the yellow Allowed Tiers styling between Multiplayer and Quick Play Modals.

### 2. Team Editor Card Integration
- Renders only actual active team members on player cards in the battle arena (no empty placeholders).
- Clicking the "Manage Team" gear button opens the full-grid editor, supporting adding new Pokémon to the player's team (up to 6) in-game.
- Added card diffing fingerprint tracking for team lists to instantly display newly added Pokémon.

### 3. Multiplayer Battle Log Improvements
- Implemented battle log duplication filters when synchronizing `log_add` events between clients.
- Room code appended to the Battle Log panel header for quick access.

