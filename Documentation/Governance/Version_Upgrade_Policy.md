# Version Upgrade Policy

## 1. Semantic Versioning
This project follows **SemVer** (MAJOR.MINOR.PATCH):
- **MAJOR**: Breaking changes to the Multiplayer Sync or Engine logic.
- **MINOR**: New features (New Pokémon, New Game Modes).
- **PATCH**: Bug fixes and documentation updates.

## 2. Release Cycle
- **Experimental**: Pushed to the `dev` branch for internal testing.
- **Stable**: Pushed to `main` and auto-deployed to Firebase/Vercel.

## 3. Deprecation
Older engine versions are supported for one Minor release cycle before requiring a full client refresh.
