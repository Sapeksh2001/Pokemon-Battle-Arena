# Technology Stack: Pokémon Battle Arena

## 1. Stack Overview
**Last Updated**: 2026-04-03
**Version**: 1.1.0

### Architecture Pattern
- **Type**: Serverless Real-time Web App
- **Pattern**: Component-based UI with Global RTDB State Sync
- **Deployment**: Firebase Hosting (Primary) + GitHub Actions (CI/CD)

---

## 2. Frontend Stack

### Core Framework
- **Framework**: React 19
- **Version**: `19.0.0`
- **Reason**: Use of `useActionState`, `useFormStatus`, and better Concurrent Rendering.
- **Documentation**: https://react.dev

### Bundler & Runner
- **Tool**: Vite 8
- **Version**: `8.0.5`
- **Reason**: Sub-second Hot Module Replacement (HMR) for fast UI iteration.

### Styling System
- **Library**: Tailwind CSS 4
- **Version**: `4.0.0-beta.1`
- **Reason**: High-performance JIT engine with native CSS variable support for Indigo Plateau tokens.
- **Plugins**: `@tailwindcss/vite`

### Audio & Soundscape
- **Utility**: Tone.js
- **Version**: `15.1.22`
- **Reason**: Web Audio API wrapper for low-latency battle music and SFX synchronization.

---

## 3. Backend & Synchronization

### Real-time Data
- **Service**: Firebase Realtime Database
- **SDK Version**: `12.11.0`
- **Reason**: Sub-100ms latency for 6-player synchronized state updates.
- **Data Model**: NoSQL JSON Tree (Rooms > Players > BattleState).

### Persistence & Storage
- **Service**: Firebase Firestore (Optional/Future for Replays)
- **Service**: Firebase Authentication (Future - Anonymous login for tracking player count).

---

## 4. Dependencies Lock (package.json)
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "firebase": "^12.11.0",
    "tone": "^15.1.22",
    "lucide-react": "^1.7.0",
    "framer-motion": "^12.0.0"
  },
  "devDependencies": {
    "vite": "^8.0.5",
    "@tailwindcss/vite": "^4.0.0-beta.1",
    "@vitejs/plugin-react": "^4.3.4"
  }
}
```

---

## 5. Security & Governance

### Access Control (RTDB Rules)
```json
{
  "rules": {
    "rooms": {
      "$room_id": {
        ".read": "true",
        ".write": "!data.exists() || data.child('host').val() === auth.uid",
        "players": {
          ".read": "true",
          ".write": "auth != null && data.parent().exists()"
        }
      }
    }
  }
}
```

### Rate Limiting & Limits
- **Concurrent Connections**: Max 6 players per `room_id`.
- **Payload Size**: < 64KB for entire `battle_state` JSON tree.
- **Write Frequency**: Throttled at 200ms per player to prevent spamming moves.

---

## 6. Compatibility & Infrastructure

### Hardware/Browser Support
- **Desktop**: Chrome 120+, Firefox 115+, Safari 17+.
- **Mobile**: iOS 17+ (Safari), Android 14+ (Chrome).
- **Screens**: Responsive from 320px to 4K (using `vmin` scaling).

### CD/CI Pipeline
- **Branch Strategy**: `main` (Production), `develop` (Integration).
- **Automation**: GitHub Action for `npm run build` and `firebase deploy`.
- **Environments**: `development`, `staging`, `production`.
