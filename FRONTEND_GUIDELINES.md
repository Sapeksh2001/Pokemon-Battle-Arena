# Frontend & Design Guidelines

## 1. Design System Overview
Pokémon Battle Arena uses a strict "Retro Pixel Art" aesthetic meant to emulate the Generation 5 (Black/White) isometric battle style. The UI heavily leverages vanilla CSS to ensure absolute performance without relying on bulky CSS-in-JS frameworks or preprocessors.

## 2. Typography
- **Primary Font**: `Press Start 2P`, loaded locally or via Google Fonts.
- **Rules**:
  - `text-rendering: optimizeSpeed;`
  - `-webkit-font-smoothing: none;`
  - Text must always be perfectly sharp, avoiding fractional font sizes (`px` or integer `rem` only).

## 3. Colors & Theme
### 3.1 Base Palette
CSS Variable Root System configured in `style.css`:
```css
:root {
  --bg-dark: #0f172a;       /* Deep Navy */
  --accent-blue: #3b82f6;   /* Neon Blue */
  --accent-pink: #ec4899;   /* Neon Pink */
  --text-light: #f8fafc;    /* Off-White */
  
  /* Status Colors */
  --health-high: #22c55e;
  --health-med: #eab308;
  --health-low: #ef4444;
}
```

### 3.2 Dynamic Type Palette
Every Pokémon type has a specific standardized color pill in `style.css` (e.g., `.type-fire { background-color: #f08030 }`). These match Bulbapedia color hexes strictly.

## 4. Layout Constraints (The `vmin` Rule)
### Absolute Scaling
- **Philosophy**: The battle arena is locked to a 16:9 aspect ratio and scaled down to fit *any* monitor entirely within view (No scrolling).
- **Execution**: The `.main-container` uses CSS `clamp()` and `vmin` (viewport minimum) extensively.
  - `width: min(100vw, calc(100vh * 16 / 9));`
  - `font-size` on scaling headers uses relative scaling so text grows precisely proportionally with the box.

### Player Card Overflow Prevention
- Long strings like "Tauros-Paldea-Aqua" are handled with `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` locked to a fixed 140px pixel width inside the `.player-card` to prevent the flex grid from exploding horizontally.

## 5. UI Components

### 5.1 Player Cards
- **Structure**: Pokémon Sprite (center, `image-rendering: pixelated`), Name/Form (top), Type Badges (flex-row center), SVG Line Chart for Stats, Circular HP Gauge.
- **Behavior**: Drops opacity to `0.4` and grayscales when fainted.

### 5.2 Circular HP Gauge (SVG)
- **Mechanics**: Utilizes `stroke-dasharray` math relative to the circle's circumference (`2 * PI * r`). 
- **Bug Prevention Rule**: The UI calculating script (`UIRenderer.getHPPercent()`) guards against division by zero if `maxHp === 0` by returning a flat `100` instead of `NaN` to stop layout crashes.

### 5.3 Interaction Controls
- **Buttons**: All buttons must have a distinct `:active` state scaling to `transform: scale(0.95);` for tactile feedback.
- **Disabled State**: Buttons without valid targets (e.g., Form Change on a Pokémon with no forms) receive `.disabled` assigning `opacity: 0.5; filter: grayscale(1); pointer-events: none;`.

## 6. Animation Engine Rules
- Use CSS keyframes for deterministic events.
- **Evolution / Form Change**: `<div class="flash">` overlay spikes `opacity: 1` over `300ms ease-out` while the `img.src` swaps synchronously in JS.
- **Damage Taken**: `animation: shake 500ms;` translating the X-axis rapidly by 5 pixels left/right to simulate impact.

## 7. Global CSS Reset Rules
- `box-sizing: border-box;` everywhere.
- `user-select: none;` on game buttons to prevent accidental text-highlighting when spam clicking during attacks.
