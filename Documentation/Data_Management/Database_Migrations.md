# Database Migrations

## 1. Schema Versioning
Every room node includes a `schemaVersion` field (Current: `1.0`).

## 2. Migration Flow
When the app connects to a room with an older `schemaVersion`:
1. **Detection**: Client identifies a version mismatch.
2. **Patching**: Client applies a transformation function to the local object (e.g., adding a new `isReady` field).
3. **Write-Back**: The Host client pushes the updated object back to Firebase.

## 3. Breaking Changes
If a `schemaVersion` is no longer supported, the app will force-redirect the user to the Lobby with a "Room version incompatible" message.
