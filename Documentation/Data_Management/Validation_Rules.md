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
