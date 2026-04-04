# Accessibility Guidelines

## 1. Visual Accessibility
- **Contrast**: UI elements exceed WCAG AA standards (4.5:1 ratio).
- **Text Scaling**: Core battle text (HP, Names) uses relative units (`em`) to ensure legibility on high-DPI displays.

## 2. Interaction
- **Keyboard Navigation**: All Battle Modals and Move Buttons are tabbable and triggered by `Enter/Space`.
- **Screen Readers**: Interactive elements include `aria-label` attributes (e.g., "Attack: Thunderbolt, Type: Electric").

## 3. Motion
## 4. Keyboard Shortcuts

A global event listener in `js/main.js` provides comprehensive keyboard access to the Battle Arena:

- **Battle Management**: `Space` (End Round), `P` (Physical), `S` (Special), `E` (Evolve), `F` (Form Change), `R` (Roll RNG).
- **Navigation**: `1-6` keys directly select player slots as the active attacker.
- **State Control**: `Ctrl+Z` (Undo), `Ctrl+Y` / `Ctrl+Shift+Z` (Redo), `Esc` (Close All Modals).
- **Timer**: `T` (Toggle Play/Pause), `Shift+T` (Reset).

### Focus Safety Feature
Shortcuts are context-aware. If a user is typing in a text field (e.g., editing HP, changing a player name), shortcuts are **automatically disabled** unless a modifier key (like `Ctrl`) is held. This prevents accidental move triggers while managing metadata.

---
**Last Updated**: 2026-04-03
