# Quick Reference

## Commands

**Local Development**
```bash
# Install dependencies
npm install

# Start development server (React + Vite)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Deployment**
```bash
# Push to GitHub
git add .
git commit -m "feat: your message"
git push origin main

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

## Keyboard Shortcuts (Arena)

| Key | Action | Context |
|-----|--------|---------|
| `Space` | End Round | Arena |
| `P` | Physical Attack | Arena |
| `S` | Special Attack | Arena |
| `E` | Evolve | Arena |
| `F` | Form Change | Arena |
| `R` | Random Number (RNG) | Arena |
| `T` | Toggle Timer (Start/Pause) | Arena |
| `Shift + T` | Reset Timer (02:00) | Arena |
| `1-6` | Select Player as Attacker | Arena |
| `Ctrl + Z` | Undo Action | Global |
| `Ctrl + Y` / `Ctrl + ⇧ + Z` | Redo Action | Global |
| `Esc` | Close All Modals | Global |

*Note: Shortcuts are disabled when an input field (Name, HP, Stat) is focused.*

## Important Files

**Frontend (React/Vite)**
- `src/components/ArenaView.jsx` (Main Arena UI)
- `src/components/LobbyView.jsx` (Room/Lobby UI)
- `js/main.js` (Legacy Engine & Keyboard Listeners)
- `public/Pokemon_NewDataset.js` (Core Pokémon Data)

**Infrastructure**
- `firebase.json` (Hosting configuration)
- `vite.config.js` (Build configuration)

## Troubleshooting

| Issue | Typical Cause |
|-------|---------------|
| `Firebase: Error (auth/...)` | Check your `.env` file for correct API keys. |
| Shortcuts not working | Ensure you are not focused on an input field. |
| Sprite/Cry missing | Check `Pokemon_NewDataset.js` for variant fallback logic. |
| Production sync lag | Ensure all players are on the same Firebase project. |

## Important Links
- [Firebase Console](https://console.firebase.google.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React 19 Docs](https://react.dev/blog/2024/12/05/react-19)
