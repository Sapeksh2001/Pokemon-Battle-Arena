# Backend Structure & Logic: Pokémon Battle Arena

## 1. Engine Architecture: Synchronized Turn-Based
The Pokémon Battle Arena uses a **Thick Client / Thin Server** architecture. 
- **Client (React)**: Executes all battle logic (damage, status, terrain).
- **Server (Firebase RTDB)**: Acts as the authoritative state container and event bus.

---

## 2. Database Schema (NoSQL RTDB)

### Node: `rooms/$room_id`
| Field | Type | Constraint | Description |
|-------|------|------------|-------------|
| `room_code` | `string` | 6-chars, unique | The join code (key). |
| `host_id` | `string` | Not null | User ID of the creator. |
| `status` | `string` | `lobby`, `active`, `ended` | Current flow state. |
| `terrain` | `string` | 1 of 18 types | Current active battle field. |

### Node: `rooms/$room_id/players/$player_id`
| Field | Type | Constraint | Description |
|-------|------|------------|-------------|
| `name` | `string` | 2-12 chars | Trainer display name. |
| `pokemon` | `object` | See Pokemon Model | Current active pokemon. |
| `isReady` | `boolean` | Default: `false` | Readiness for battle transition. |
| `lastAction` | `timestamp`| System time | Used for timeout detection. |

---

## 3. API & Event Contracts (Internal)

### Event: `join_room`
**Request (Firebase `set`)**
```json
{
  "name": "Ash",
  "sprite": "pikachu-25",
  "isReady": false,
  "joinedAt": 1712123456789
}
```

### Event: `commit_move`
**Request (Firebase `update`)**
```json
{
  "battle_state/current_turn": "player_1",
  "battle_state/actions": [{
    "playerId": "p1",
    "moveId": "thunderbolt",
    "targetId": "p2",
    "timestamp": 1712123456790
  }]
}
```

**Response (RTDB `value` Sync)**
All clients receive the updated `battle_state` snapshot and resolve the visual hit.

---

## 4. Logic Resolution (Sequence)

### Step 1: Pre-Turn Calculation
1. **Speed Tier Check**: Sort all `actions` by `speed` stat + move priority.
2. **Terrain Check**: Apply 20% boost to primary stats matching current terrain.

### Step 2: Damage Execution
```javascript
// Pseudo-code for resolveHit()
const multiplier = getTerrainMultiplier(move.type, terrain.type);
const damage = calculateDamage(attacker, defender, move) * multiplier;
updateLocalHP(defender, -damage);
pushToLog(`${attacker.name} used ${move.name}!`);
```

### Step 3: Cleanup & Sync
1. Sync local delta to Firebase `rooms/$room_id/players/$player_id/pokemon/hp`.
2. Check for fainted status; trigger `SwitchView` if HP <= 0.

---

## 5. Firebase Security Rules (production.json)
```json
{
  "rules": {
    "rooms": {
      "$room_id": {
        ".read": "true",
        ".write": "!data.exists() || data.child('host_id').val() === auth.uid",
        "players": {
          "$uid": {
            ".write": "$uid === auth.uid" // Only you can change your name/state
          }
        },
        "battle_state": {
          ".write": "data.parent().child('status').val() === 'active'"
        }
      }
    }
  }
}
```

---

## 6. Error & Conflict Resolution
- **Simultaneous Writes**: Use `transaction()` for move collisions. 
- **Inconsistent State**: On component mount, the app performs a `once('value')` fetch to reconcile any missed log entries or HP changes.
- **Player Dropout**: If `lastAction` > 30s ago, the player is marked `Disconnected` and their turn is skipped automatically.
