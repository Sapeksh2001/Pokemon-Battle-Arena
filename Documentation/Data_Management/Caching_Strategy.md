# Caching Strategy

## 1. LocalStorage
The app caches the following to enhance performance and session persistence:
- `lastRoomId`: To facilitate auto-reconnection.
- `trainerName`: To prevent re-entry on every visit.
- `userTeam`: The last selected team for quick match-making.

## 2. In-Memory Cache
- **Master Dataset**: The 2.5MB JSON containing all Pokémon data is loaded once at boot and held in an immutable reference to avoid GC pauses.
- **Sound Buffers**: Tone.js samples are pre-rendered into buffers during the "Loading..." splash screen.

## 3. Firebase Cache
Firebase Persistence is enabled to allow the app to function (read-only) in offline mode, showing the user their last match results even without a connection.
