# Data Validation Rules

## 1. Input Sanitization
- **Room Codes**: Must be 6 alphanumeric characters.
- **Player Names**: Limited to 12 characters, stripped of HTML tags, and filtered for profanity.

## 2. Battle Logic Validation
- **HP Limits**: A Pokémon's HP can never exceed its `maxHp` or fall below `0`.
- **PP Consumption**: Moves cannot be executed if `pp <= 0`.
- **Status Stacking**: A Pokémon can only have one primary status ailment (PSN, BRN, PAR, FRZ, SLP) at a time.

## 3. Sync Consistency
- **Timestamping**: Every battle log entry include a `serverTimestamp` to resolve race conditions between players selecting moves at the exact same millisecond.

---

## 4. Asset Normalization Rules

To ensure a high-fidelity experience without visual "placeholders," the following rules apply to all Pokémon data:

1. **Sprite Fallback**: If a specific variant sprite (e.g., "Charizard-Mega-X") is missing, the engine MUST fall back to the base form sprite ("Charizard").
2. **Cry Normalization**: Regional forms and Mega Evolutions that share the base Pokémon's cry MUST point to the base `.mp3` to ensure functional audio across all 1600+ entries.
3. **Manual Verification**: All entries are cross-referenced with Pokémon Showdown's animation library using automated audit scripts.

![Data Verification Process](../Assets/data_verification.webp)

---
**Last Updated**: 2026-04-03
