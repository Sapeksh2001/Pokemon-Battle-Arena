# Database Schema (Firebase RTDB)

## 1. Room Node Structure
Paths are indexed by 6-digit `roomId`.

```json
{
  "rooms": {
    "$roomId": {
      "status": "waiting | battling",
      "hostId": "$playerId",
      "players": {
        "$playerId": {
          "id": "$playerId",
          "name": "Trainer Name",
          "isReady": true,
          "activePokemon": 0,
          "team": [
            {
              "fullName": "Pikachu",
              "hp": 200,
              "maxHp": 200,
              "status": "none",
              "statMods": { "atk": 0, "def": 0 }
            }
          ]
        }
      },
      "logs": {
        "uniqueId": "Timestamped battle message string"
      }
    }
  }
}
```

## 2. Key Mapping Rules
- **Arrays vs Objects**: Player teams are stored as objects to prevent Firebase index collision during concurrent pushes.
- **Ephemeral State**: Disconnected players are removed via `onDisconnect()` to ensure room cleanup.
