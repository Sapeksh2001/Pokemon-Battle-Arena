# Accessibility Guidelines

## 1. Visual Accessibility
- **Contrast**: UI elements exceed WCAG AA standards (4.5:1 ratio).
- **Text Scaling**: Core battle text (HP, Names) uses relative units (`em`) to ensure legibility on high-DPI displays.

## 2. Interaction
- **Keyboard Navigation**: All Battle Modals and Move Buttons are tabbable and triggered by `Enter/Space`.
- **Screen Readers**: Interactive elements include `aria-label` attributes (e.g., "Attack: Thunderbolt, Type: Electric").

## 3. Motion
- **Prefer Reduced Motion**: All heavy animations (Screen Shake, Sprite Flash) check the `@media (prefers-reduced-motion)` query to toggle off jarring effects.
