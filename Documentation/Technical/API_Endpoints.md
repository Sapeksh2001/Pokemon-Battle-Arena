# API & State Event Endpoints

The system does not use REST endpoints but relies on **Event Triggers** via the Firebase SDK.

## 1. Connection Events
- `roomId`: Joined via `ref(db, 'rooms/' + roomId)`.
- `presence`: Triggered on `players` node write.

## 2. State Actions
- **Move Submission**: PATCH `rooms/$roomId/players/$playerId/team/$index/hp`.
- **Status Application**: PATCH `rooms/$roomId/players/$playerId/team/$index/status`.
- **Weather Change**: UPDATE `rooms/$roomId/weather`.

## 3. Data Feed
- **Battle Log**: Listen to `child_added` on `rooms/$roomId/logs`.
- **Opponent HP**: Listen to `onValue` on the opponent's player node.
