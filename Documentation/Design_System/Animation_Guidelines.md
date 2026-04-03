# Animation Guidelines

## 1. CSS Keyframes
- **HP Sweep**: `linear` transition on width/stroke, timed proportional to the % of HP lost.
- **Status Pulse**: 2s ease-in-out opacity change for status indicators (POISON, BURN).

## 2. JavaScript Particles
- **Damage Numbers**: Randomized X/Y float-up on hit.
- **Faint Sequence**: Linear downward translate + opacity fade over 600ms.

## 3. Engine Hooks
Animations can be chained via `onComplete` callbacks inside the `GraphicsManager.js` to ensure the Battle Log waits for a move animation to finish before proceeding to the next line.
