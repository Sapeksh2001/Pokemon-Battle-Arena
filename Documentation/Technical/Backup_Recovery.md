# Backup & Recovery

## 1. Persistence Model
- **Ephemeral Sessions**: Rooms are temporary. When both players disconnect, the room is slated for cleanup.
- **Match Auto-Resume**: If a player refreshes their browser mid-battle, the app checks `localStorage` for a `lastRoomId` and attempts to rejoin.

## 2. Data Backups
- **RTDB Snapshotting**: As a serverless app, backups rely on Firebase's automated daily snapshots (if enabled) or manual JSON exports from the console.

## 3. Disaster Recovery
- **Host Migration**: If the Host disconnects, the second Player can be promoted to Host to maintain the room's lifecycle if the Host Reconnection fails.
