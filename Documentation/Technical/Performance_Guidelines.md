# Performance Guidelines

## 1. Frame Management
- **RequestAnimationFrame**: All sprite animations and HP gauge sweeps are batched via `rAF` to ensure 60fps smoothness during combat.

## 2. Memory Optimization
- **Ring Buffers**: The Battle Log and Undo/Redo systems use fixed-size `RingBuffer.js` to ensure the app never leaks memory over long 100+ turn sessions.
- **Dataset Lazy Loading**: Large Move and Pokémon datasets are kept in a single read-only object in memory to avoid redundant object cloning.

## 3. Painting Efficiency
- **CSS Transitions**: Heavy lifting for HP bars is delegated to the browser's GPU via CSS `transition` on `stroke-dashoffset`.
- **Viewport Constraints**: Using `vmin` scaling prevents expensive browser re-layouts by keeping the arena dimensions fixed relative to a 16:9 box.
