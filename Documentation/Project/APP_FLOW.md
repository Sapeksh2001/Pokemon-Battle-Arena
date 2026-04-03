# Application Flow & Navigation

## 1. Lifecycle Overview
The application follows a linear state progression from the Multiplayer Lobby to the Battle Arena.

## 2. Navigation Map
1. **Lobby (React)**: Home screen where users name themselves and initiate/join rooms.
2. **Modals (React)**: Specialized overlays for "Create Room" and "Join Room".
3. **Multiplayer Lobby (React/Legacy)**: A waiting area where player presence and "Ready" states are synced in real-time.
4. **Battle Arena (React/Legacy)**: The final combat view where turns are executed.

## 3. State Transitions
- **Lobby → Room**: Occurs upon successful Firebase room creation or code validation.
- **Room → Arena**: Triggered by the Host when all players have toggled "READY".
- **Arena → Lobby**: Triggered upon match conclusion or manual disconnect.

## 4. Event Flow
- `Lobby.js` handles early UI interactions.
- `MultiplayerManager.js` bridges React state to Firebase RTDB.
- `PokemonBattleArena.js` manages the core engine loop in the Arena view.
