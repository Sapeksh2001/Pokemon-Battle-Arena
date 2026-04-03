# Backend Structure & Serverless Integration

## 1. Architectural Overview
This game runs completely serverless via the **Firebase Realtime Database (RTDB)**. The "backend" logic is executed locally on each peer client browser; Firebase acts strictly as a high-speed data-bus to synchronize JSON state arrays between players.

## 2. Realtime Database Schema

Data is partitioned per independent session under `/rooms`.

```json
{
  "rooms": {
    "1A2B3C": {
      "status": "waiting | battling",
      "hostId": "player_uuid_1",
      "weather": {
        "type": "none | hail | rain | sandstorm",
        "turnsRemaining": 0
      },
      "players": {
        "player_uuid_1": {
          "id": "player_uuid_1",
          "name": "Ash",
          "activePokemonIndex": 0,
          "team": [
            {
              "baseSpecies": "Pikachu",
              "fullName": "Pikachu",
              "hp": 211,
              "maxHp": 211,
              "status": "none | brn | psn",
              "statModifiers": { "atk": 0, "def": 0, "spe": 0 }
            }
          ]
        }
      },
      "logs": {
        "log_push_id_1": "Battle started!",
        "log_push_id_2": "Ash sent out Pikachu!"
      }
    }
  }
}
```

## 3. Core Sync Mechanics

### 3.1 Ephemeral Connection & "Presence"
- `socketClient.js` configures Firebase references (`ref(db, 'rooms/' + roomId)`).
- As users join, they push their distinct payload to `/players/$uuid`. 
- Firebase's `onDisconnect()` handler is used to mark players as inactive or remove them if they forcefully close the browser, preventing dead ghost-data from polluting active rooms.

### 3.2 Optimistic Updates & Patching
When a user clicks 'Attack':
1. `BattleEngine` calculates damage locally (e.g., Opponent `Pikachu` HP drops from 211 → 50).
2. The UI instantly updates (Optimistic UI) before network resolution.
3. The exact node is patched using `.update()` targeting `rooms/1A2B3C/players/player_uuid_B/team/0/hp: 50`.
4. The `.update()` payload is intentionally highly specific to avoid wiping out simultaneous events occurring on other peers' arrays.

### 3.3 Battle Log Appends
- The Battle Log is an asynchronous chat. It relies on the Firebase `.push()` command to generate unique, chronologically sortable keys (e.g., `logs/log_push_id_2`).
- A `child_added` event listener populates the DOM ring buffers sequentially.

## 4. Dataset Processing & Indexing Strategy
`Pokemon_NewDataset.js` is an offline "backend" dataset loaded directly into the browser.

### Data Normalization Layer
Because raw community datasets often contain inconsistent naming conventions (e.g., base specs using `Name: "Diglett"` while regional forms use `name: "Diglett-Alola"`), `PokemonDatabase.js` implements a rigorous indexing rule during `buildIndex()`:

```js
// Ensures downstream system stability
Object.keys(node.forms || {}).forEach(k => {
    let f = node.forms[k];
    if (f) {
        // Normalizes mismatched cases silently
        if (f.name && !f.Name) f.Name = f.name; 
        insertTrie(f.Name, f);
    }
});
```
*This defensive programming ensures `getForms()` executes robustly regardless of upstream raw JSON payload inconsistencies.*

## 5. Security Context
- Because this runs directly in browser environments with explicit API Web Keys embedded in `socketClient.js`, anyone inspecting the code can technically inject their own state via browser consoles.
- Security relies on obscurity (random 6-digit room codes) and mutual trust between friends.
- Production scaling will require transition to Firebase App Check and Realtime Database Rules matching validated JSON schemas to reject modified clients attempting to push invalid HP/stats.
