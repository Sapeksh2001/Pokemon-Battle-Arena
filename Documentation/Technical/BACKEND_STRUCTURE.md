# Backend Structure & Data Architecture: Pokémon Battle Arena

## 1. Architectural Overview
The Pokémon Battle Arena operates on a **Serverless Real-time Synchronization** model. There is no traditional persistent backend storage (SQL/NoSQL); instead, the **Firebase Realtime Database (RTDB)** serves as a low-latency state bus. Logic is executed on the client-side, with the RTDB ensuring all peers reflect the same "Single Source of Truth."

---

## 2. Realtime Database Schema
All data is stored in an ephemeral tree under the `/rooms` node.

```json
{
  "rooms": {
    "$roomId": {
      "metadata": {
        "createdAt": 1712150400,
        "status": "lobby | active | finished",
        "hostId": "auth_uuid_1"
      },
      "players": {
        "$playerId": {
          "name": "Ash",
          "ready": true,
          "activePokemonIndex": 0,
          "team": [
            {
              "id": "p_001",
              "species": "Pikachu",
              "hp": 211,
              "maxHp": 211,
              "status": "none",
              "moves": ["Thunderbolt", "Quick Attack"]
            }
          ]
        }
      },
      "state": {
        "currentTurn": 1,
        "terrain": "Indigo_Plateau",
        "weather": "clear",
        "lastAction": {
          "type": "attack",
          "playerId": "$playerId",
          "details": "Pikachu used Thunderbolt"
        }
      },
      "logs": {
        "-Nxyz123": "Battle started!",
        "-Nxyz456": "Ash sent out Pikachu!"
      }
    }
  }
}
```

---

## 3. Data Integrity & State Transitions

### 3.1 State Update Flow
To prevent race conditions, updates to critical battle state (HP, Turn Count) must follow this protocol:
1. **Fetch**: Latest state from Firebase.
2. **Compute**: `BattleEngine.calculateDamage()` locally.
3. **Atomic Write**: Use Firebase `.transaction()` or targeted `.update()` on specific paths (e.g., `players/$id/team/0/hp`) to avoid overwriting sibling data.

### 3.2 Data Validation Rules
- **HP Safety**: HP must never exceed `maxHp` and never drop below `0`.
- **Turns**: `currentTurn` can only increment by `1`.
- **Rooms**: Room codes must be exactly 6 alphanumeric characters.

---

## 4. Firebase Security Rules (Proposed)
To prevent malicious players from modifying opponent data via the console.

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        "players": {
          "$playerId": {
            ".write": "auth != null && auth.uid == $playerId",
            ".read": "true"
          }
        },
        "state": {
          ".write": "data.parent().child('players').hasChild(auth.uid)",
          ".read": "true"
        }
      }
    }
  }
}
```

---

## 5. Domain Logic & Data Loading
### 5.1 Dataset Indexing
The `DataLoader` service fetches `Pokemon_NewDataset.js` and indexes it into a **Trie (Prefix Tree)**.
- **Lookup Complexity**: `O(L)` where L is the name length.
- **Form Resolution**: The system handles regional variants (Alolan, Galarian) by merging the base species with form-specific overrides during the lookup phase.

### 5.2 Terrain & Weather Engine
State transitions for field effects:
- **Terrain Duration**: Default 5 turns (8 with Terrain Extender).
- **Stat Boosts**: Calculated on-the-fly during move execution (not persisted in DB to minimize payload).

---

## 6. Connectivity & Presence
- **OnDisconnect**: When a client loses connection, Firebase automatically sets `rooms/$roomId/players/$playerId/status` to `offline`.
- **Reconnection**: Handled via `onAuthStateChanged`, re-binding the local React context to the existing room state in Firebase.
