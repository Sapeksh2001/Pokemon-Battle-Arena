# Frontend & Design Guidelines: Pokémon Battle Arena

## 1. Design System: "Indigo Plateau"
The Pokémon Battle Arena uses a premium, immersive **Indigo Plateau** aesthetic. This theme combines nostalgic pixel-art with modern **Glassmorphism** and **Holographic** UI elements to create a high-end, futuristic feel.

### Core Principles
1. **Glassmorphism**: UI panels use semi-transparent backgrounds with backdrop-blur and subtle borders.
2. **Holographic Accents**: Use neon cyans and magentas for active states, selection glows, and terminal text.
3. **Pixel Integrity**: Pokémon sprites MUST use `image-rendering: pixelated` to maintain their original art style.
4. **Motion First**: Every action (attack, switch, join) must have a visual or auditory feedback loop.

---

## 2. Design Tokens (Tailwind v4)
We use a centralized token system via `@theme` in Tailwind v4.

### Colors
- **Surface (Glass)**: `rgba(15, 23, 42, 0.7)` (Deep Slate with 70% opacity)
- **Primary (Electric)**: `hsl(199, 89%, 48%)` (Holographic Cyan)
- **Secondary (Psychic)**: `hsl(280, 67%, 60%)` (Neon Purple)
- **Status High**: `hsl(142, 71%, 45%)` (Emerald Green)
- **Status Low**: `hsl(0, 84%, 60%)` (Critical Red)

### Typography
- **Display**: `Press Start 2P` (For HP, Names, and Battle Log)
- **Interface**: `Inter` or `System UI` (For buttons, labels, and settings)
- **Sizing**: Use `clamp()` for fluid scaling (e.g., `text-[clamp(12px,1.5vmin,24px)]`).

---

## 3. Component Specifications

### 3.1 PlayerCard Component
- **Background**: Glassmorphic slate with a `1px` solid border (`border-white/10`).
- **HP Gauge**: Circular SVG path using `stroke-dasharray`. 
  - *Logic*: `circumference - (percent / 100) * circumference`.
  - *Feedback*: Color shifts from Green → Yellow → Red as HP drops.
- **Sprite**: Centered, 2x scale, `pixelated` rendering.

### 3.2 ControlPanel (Footer)
- **Style**: Fixed bottom bar with a holographic top glow.
- **Buttons**:
  - `Hover`: Scale `1.05`, border brightness pulses.
  - `Active`: Scale `0.95`, brief white flash overlay.
- **Disabled**: Grayscale filter + `pointer-events-none`.

### 3.3 BattleLog (Terminal)
- **Aesthetic**: Scrolling green/cyan text on a dark transparent background.
- **Font**: Monospace (`Press Start 2P`).
- **Experience**: Auto-scroll with a `smooth` behavior. New entries should "typewriter" in if performance permits.

---

## 4. Animation & Transitions
- **Damage Impact**: `shake` keyframe on the target's `.player-card` (±5px X-axis).
- **HP Depletion**: CSS `transition: stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)`.
- **View Transitions**: Use `opacity: 0` to `opacity: 1` over `400ms` when switching between Lobby and Arena.

---

## 5. Accessibility (A11y)
- **Contrast**: All status text must maintain a 4.5:1 ratio against the glass background.
- **Interactive**: All buttons must have `aria-label` providing full context (e.g., "Attack Pikachu with Thunderbolt").
- **Focus States**: Visible neon cyan border/glow for keyboard navigation.

---

## 6. Performance Constraints
- **Layering**: Limit `backdrop-filter` usage to core panels to prevent GPU lag on mobile.
- **SVG vs Image**: Use SVGs for UI elements (Gauges, Icons) to ensure sharpness at any resolution.
- **Rendering**: Avoid repeated React re-renders on the entire Battle Grid; use memoization for individual `PlayerCard` components.
