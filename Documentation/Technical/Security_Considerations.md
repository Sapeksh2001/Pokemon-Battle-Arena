# Security Considerations

## 1. Trust Model
The current implementation uses a **Trusted Peer** architecture. Both clients trust each other's calculations.

## 2. Protection Layers
- **Room Code Entropy**: 6-digit alphanumeric codes (1 million+ permutations) guard against casual brute-forcing of private rooms.
- **XSS Prevention**: All player-generated strings (Names, Battle Logs) are escaped before DOM insertion.
- **API Key Scoping**: The Firebase API key is restricted to the specific domain `pokemon-1248.web.app`.

## 3. Future Hardening
- **Server-Side Validation**: Moving damage calculations to a Firebase Function or Cloud Run container to prevent client-side HP injection.
- **App Check**: Enforcing that only requests from the official web client can read/write to the database.
