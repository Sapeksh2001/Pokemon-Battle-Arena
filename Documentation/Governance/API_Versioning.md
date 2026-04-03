# API Versioning

## 1. Internal Protocol
The "API" between the React UI and the Legacy Engine is versioned via the `window.arena.version` string.

## 2. Firebase Schema Version
Located at the root of every room node.
- **v1.0**: Standard 1v1 Battle support.
- **v1.1 (Planned)**: Spectator mode and 2v2 support.

## 3. Compatibility Matrix
- Clients on `v1.0.x` can battle each other.
- Clients on `v1.1.x` will require all participants to be on the same minor version to ensure synchronized animations.
