# Error Handling Strategy

## 1. Connection Failures
- **Network Pulse**: If the Firebase socket disconnects, a specialized "Reconnecting..." overlay blocks interaction.
- **Graceful Retries**: UI attempts to re-establish a session at the last known room state before forcing a lobby redirect.

## 2. Battle State Logic
- **HP Guard**: Formula prevents negative HP values or `NaN` crashes if a dataset property is missing.
- **Move Validation**: If a move selected by the client is invalid (e.g. no Power in dataset), the engine defaults to a 10 Power "Struggle" type move to prevent turn locking.

## 3. Data Integrity
- **Fallback Recovery**: If a remote player object is corrupted, the local engine attempts to use its last cached copy of that player to continue the UI render.
