# Technology Stack & Architecture

## 1. Core Stack
- **Frontend**: React 19 + Vite 8
- **Styling**: Tailwind CSS 4 (Vanilla CSS fallback for legacy components)
- **Backend/Networking**: Firebase Realtime Database
- **Audio**: Tone.js (Synthesized OSC chiptunes)

## 2. Key Dependencies
- `firebase`: Real-time state synchronization.
- `lucide-react`: Modern icon set.
- `react-dom`: UI rendering layer.
- `vite`: Fast development and optimized production builds.

## 3. Architecture Pattern
- **Adapter Pattern**: A thin React wrapper around a legacy Vanilla JS game engine.
- **Optimistic UI**: State updates are reflected locally immediately, then synced to Firebase.
- **Serverless**: No dedicated server; Firebase RTDB acts as the shared state bus.

## 4. Performance Optimizations
- **vmin Scaling**: Ensures the 16:9 layout never overflows, regardless of screen size.
- **Batched Rendering**: Minimizes DOM thrashing during high-frequency combat updates.
