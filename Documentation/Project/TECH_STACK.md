# Technology Stack & Architecture: Pokémon Battle Arena

## 1. Stack Overview
**Last Updated**: 2026-04-03
**Version**: 2.0.0 (React Migration Release)

### Architecture Pattern
- **Type**: Serverless Real-time State Synchronization.
- **Pattern**: Component-based UI (React) with decoupled Domain Services (ES6 Modules).
- **Deployment**: Firebase Hosting (Global CDN).

---

## 2. Frontend Stack

### Core Framework
- **Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Reason**: React 19 provides superior state management via concurrent rendering, essential for keeping 6-player battle states fluid and reactive.

### UI & Styling
- **CSS Framework**: Tailwind CSS 4.2.2 (Alpha/Vite Plugin)
- **Icons**: Lucide React (v1.7.0)
- **Design Tokens**: Standardized HSL values used for "Indigo Plateau" glassmorphism theme.
- **Responsiveness**: `vmin` and `clamp()` based container scaling to ensure a locked 16:9 aspect ratio across all devices.

### Domain Logic (Vanilla JS Utilities)
*While the UI is React, the core engine remains high-performance vanilla JS:*
- **Trie.js**: Custom prefix tree for `O(L)` autocomplete lookups of 1000+ Pokémon.
- **BattleEngine.js**: Pure function library for Gen 5 damage calculations.
- **DataLoader.js**: Parallel asset loader for sprites and move data.

### Audio Subsystem
- **Library**: Tone.js (v15.1.22)
- **Usage**: Web Audio API oscillator synthesis to recreate authentic GameBoy-era chiptunes without heavy audio files.

---

## 3. Backend & Infrastructure

### 3.1 Firebase Services (v12.11.0)
- **Realtime Database (RTDB)**: Low-latency JSON synchronization (<100ms).
- **Hosting**: Automated deployment from GitHub `main` branch.

### 3.2 State Sync Protocol
1. **Mutation**: User triggers action (e.g., uses `useBattleAction` hook).
2. **Local Update**: React state updates optimistically.
3. **Remote Sync**: `socketClient` pushes delta to `/rooms/$roomId/state`.
4. **Broadcast**: Opponents' `useEffect` hooks trigger on `onValue` change, re-rendering the updated HP/Status.

---

## 4. Data Management

### Datasets
- **Pokemon_NewDataset.js**: Comprehensive Gen 5+ stats (indexed by Trie).
- **Moves_data.js**: Move power, accuracy, and effect metadata.

### Storage Strategy
- All static meta-data is loaded into memory on initial boot (Lobby stage).
- Only dynamic state (HP, status, turn count) is synced via Firebase.

---

## 5. Deployment & CI/CD
- **Dev Environment**: `npm run dev` (Vite Hot Module Replacement).
- **Production CI**: GitHub Actions (planned) triggers `firebase deploy` on merge to `main`.
- **Environment Isolation**: `.env.local` for local dev; Secret environment variables managed via GitHub Actions/Firebase console.
