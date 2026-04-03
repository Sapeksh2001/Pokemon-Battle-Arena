# Technology Stack & Architecture

## 1. Stack Overview
**Last Updated**: 2026-03-22
**Version**: 1.0.1

### Architecture Pattern
- **Type**: Serverless Peer-to-Peer State Sync Architecture.
- **Engine**: Monolithic vanilla JavaScript cleanly separated into ES6 modules (Domain, Service, UI).
- **Deployment**: Firebase Hosting edge CDN.

---

## 2. Frontend Constraints & Decisions

### Core Framework: Vanilla ES6 Modules
- **Why Vanilla?**: To maintain raw performance and precise DOM manipulation needed for high frequency SVG/CSS animation updates without the overhead of React's Virtual DOM reconciliation.
- **Data Structures**:
  - `Trie.js`: Custom implementation to index 1000+ Pokémon names (including forms). Allows instant `O(L)` autocomplete lookups in the management dropdowns where `L` is prefix length.
  - `RingBuffer.js`: Fixed-size circular array to handle History (Undo/Redo) without memory leaks. Caps at 50 turns.

### UI Styling & Layout
- **Responsiveness**: Everything is calculated in `vmin` (viewport minimum) tied via CSS `clamp()` functions. This guarantees the 16x9 arena never spawns scrollbars on any monitor size, preventing zoom-related layout breakage.
- **Retro Aesthetic Rules**:
  - `image-rendering: pixelated;` applied to all sprites.
  - Custom font loading (`Press Start 2P`).
  - No CSS box-shadow blurring—solid dropped pixel borders required.

### Audio Subsystem
- **Library**: `Tone.js`
- **Application**: Synthesizing raw oscillators (`square`, `sawtooth` waves) instead of loading heavy MP3 assets to perfectly emulate GameBoy/DS era Pokémon sound chips.

---

## 3. Backend Stack / Firebase Integration

### 3.1 Firebase Realtime Database
- **Role**: Sits as the central source of truth, but does *not* compute game logic.
- **Schema Key Binding**:
  - `/rooms/$room_id/players/$uuid`: User arrays are converted to localized objects to prevent Firebase index collision when array elements are swapped during gameplay.

### 3.2 State Synchronization Engine
The `socketClient.js` module handles all networking securely:
1. **Local Mutation**: User clicks attack. Local DOM updates immediately for zero-latency feel (Optimistic UI).
2. **Patch Broadcasting**: `.update(payload)` fires to Firebase updating precise JSON keys (e.g., `hp: 120`).
3. **Peer Listening**: `.onValue()` listener triggers on the opponent's client, re-hydrating their `Pokemon` instances with the new JSON data and calling `UIRenderer.renderAll()`.

### 3.3 Security Model
- **Current Trust Level**: "Trusted Peer". The clients do not challenge the RNG or damage calculations of the opponent.
- **Protection**: Room codes act as ephemeral passwords.
- **Data Safety**: No environment variables for database auth are exposed; uses Firebase Web Apps restricted by domain `pokemon-1248.web.app`.

---

## 4. Big Data Parsing Strategy
- Raw files `Pokemon_NewDataset.js` and `moves_data.js` total over 5MB.
- They are loaded via deferred scripts sequentially.
- `PokemonDatabase.js` immediately parses the raw JSON into memory.
- **Normalization Strategy**: The database handles edge cases where raw JSON keys differ in case sensitivity format (e.g., resolving `f.name` and `f.Name` equally inside `getForms()`) to ensure the client code never fails on case mismatch.
