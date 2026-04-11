# Phase 3: Firebase Save/Load - Walkthrough

## What was built

A per-user cloud save system backed entirely by Firebase Realtime Database. Each authenticated player can freeze the exact state of any active multiplayer match and restore it at any time — even if the original room has closed.

---

## Firebase data schema

```
/users
  /{uid}
    /recent_rooms/{roomCode}   ← existing (tracks joined rooms)
    /saved_games/{roomCode}    ← NEW per-user save
      snapshot: { players[], round, weather, logs, … }
      savedAt: 1712220000000
      roomCode: "183947"
      round: 4
      playerCount: 2
      playerNames: ["Ash", "Misty"]
      pokemonNames: ["Pikachu", "Starmie"]
      savedByName: "ash@trainer.com"
```

Each user's save is independent. Two players in the same room each own their own copy under their own `uid`.

---

## Changes made

### 1. `js/api/socketClient.js` + `public/js/api/socketClient.js`

Three new class methods:

| Method | What it does |
|---|---|
| `saveGameToFirebase()` | Serializes `this.arena.gs` → writes full snapshot + display metadata to `/users/{uid}/saved_games/{roomCode}` |
| `loadSavedGames()` | Attaches a `limitToLast(20)` Firebase listener on `/users/{uid}/saved_games` and renders rich save cards into `#load-game-list` |
| `loadAndResume(roomCode)` | Fetches the saved snapshot, checks if the live room still exists, then either rejoins + pushes state back (live mode) or restores locally (offline mode) |

`listenToRecentRooms()` now also calls `loadSavedGames()` on auth so the Load modal is pre-populated.

---

### 2. `src/components/ArenaView.jsx`

A **cloud upload** (`☁ ↑`) button was added to the Battle Log panel header, beside the existing Clear and Export buttons:

```
[☁↑] [🗑] [⬇]
```

Clicking it calls `saveGameToFirebase()` and shows a "Game saved to cloud!" toast. Any player in the match can save independently.

---

### 3. `src/components/LobbyView.jsx`

A new **LOAD GAME** button was inserted between JOIN ROOM and SETTINGS on the main lobby dashboard. It uses a `cloud_download` icon in the arena's green accent color (`#5bf083`) to visually distinguish it from the multiplayer join flow.

---

### 4. `src/components/Modals.jsx`

A new `#load-modal` was added. It contains:
- A 2-column responsive grid (`#load-game-list`) populated by the Firebase listener
- Each save card shows: room code, round number, players vs players, Pokémon names, and save timestamp
- Hovering a card reveals a **RESUME →** badge; clicking calls `loadAndResume(roomCode)`
- A footer note reminding users saves are personal (per account)

---

## User flow

```
[Arena] → click ☁↑ Save → snapshot written to Firebase → "Game saved to cloud!" toast
[Lobby] → click LOAD GAME → modal opens → 20 save cards appear
         → click a card:
              if room is still live  → rejoin + push snapshot back → arena resumes
              if room is gone        → restore locally → arena opens in offline mode
```

---

## How to test

1. Start the dev server: `npm run dev` from the project root.
2. Log in with any account.
3. Create a room and assign Pokémon. Start the game.
4. Change a Pokémon's HP using the HP editor.
5. Click the **☁↑** button in the Battle Log header. Check for the "Game saved to cloud!" notification.
6. Open Firebase Console → `/users/{your_uid}/saved_games` and verify the snapshot exists with the correct HP.
7. Close the tab (or return to lobby).
8. Click **LOAD GAME** on the lobby screen.
9. Verify the room card appears with the correct players, Pokémon names, round, and timestamp.
10. Click **RESUME →**. The arena should open and the HP should still be at the value you set in step 4.

> [!NOTE]
> If the original room has expired from Firebase (no players kept it alive), `loadAndResume` falls into offline mode — the snapshot is still restored perfectly locally, you just won't be syncing to other players.
