# Architecture Overview

## 1. System Pattern
The Pokémon Battle Arena uses a **Serverless Peer-to-Peer State Sync** pattern.
- **Source of Truth**: Firebase Realtime Database (RTDB).
- **Resolver**: The client's local JS engine resolves damage formulas and state changes and patches the database.

## 2. Core Components
- **Lobby Service**: Manages room creation and player presence.
- **Battle Engine**: Pure logic layer calculating damage, RNG, and rule validation.
- **UI Renderer**: Batched DOM updates driven by React state and legacy CSS.
- **Sync Client**: Listens for RTDB changes and re-hydrates local state objects.

## 3. Data Flow
1. User Move Selection → Local Validation.
2. Calculation (Damage/Status) → Optimistic UI Update.
3. Firebase `.update()` → Remote State Broadcast.
4. Opponent `onValue` trigger → Remote UI Sync.
