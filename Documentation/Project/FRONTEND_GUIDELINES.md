# Frontend Guidelines: Indigo Plateau Design System

## 1. Aesthetic: Glassmorphism & Holographs
The "Indigo Plateau" theme is defined by deep indigo/violet gradients, high-blur glass panels, and cybernetic glowing accents (Cyan for health, Amber for logs, Magenta for status).

### Visual Hierarchy
1. **Background**: Radial Indigo/Violet Gradient (`hsl(260, 40%, 10%)`).
2. **Foreground Panels**: Glassmorphism with `backdrop-filter: blur(16px)`.
3. **Typography**: Inter (UI/Numbers) + Roboto Mono (Terminal/Logs).

---

## 2. Design Tokens (Tailwind CSS 4)

### Color Palette
```css
:root {
  --indigo-primary: hsl(265, 89%, 60%);
  --indigo-dark: hsl(265, 89%, 15%);
  --glass-bg: hsla(265, 89%, 10%, 0.4);
  --glass-border: hsla(265, 89%, 50%, 0.2);
  --neon-cyan: hsl(190, 100%, 50%);
  --neon-amber: hsl(45, 100%, 50%);
  --neon-magenta: hsl(300, 100%, 50%);
  --hp-green: hsl(140, 70%, 50%);
  --hp-red: hsl(0, 70%, 50%);
}
```

### Spacing & Units
- **Base Unit**: `0.25rem` (4px).
- **Responsive Sizing**: Use `vmin` for arena cards to ensure fit on all orientations.
- **Max Width**: `1200px` for desktop; `100%` for mobile.

---

## 3. Core Components

### Component: GlassCard
The foundational container for all UI elements.
```jsx
const GlassCard = ({ children, className }) => (
  <div className={`backdrop-blur-xl bg-glass-bg border border-glass-border rounded-2xl shadow-indigo-500/20 shadow-lg ${className}`}>
    {children}
  </div>
);
```

### Component: GlowingButton
Action buttons with hover-glow effects.
```jsx
const GlowingButton = ({ label, variant = "primary", onClick }) => {
  const colors = variant === "primary" ? "bg-indigo-600/30 border-neon-cyan text-neon-cyan shadow-cyan-500/10" : "bg-amber-600/30 border-neon-amber text-neon-amber shadow-amber-500/10";
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 border rounded-lg transition-all hover:scale-105 active:scale-95 ${colors}`}
    >
      {label}
    </button>
  );
};
```

### Component: HealthBar
Dynamic bar reflecting HP status.
```jsx
const HealthBar = ({ current, max }) => {
  const percent = (current / max) * 100;
  const color = percent > 50 ? "bg-hp-green" : percent > 20 ? "bg-neon-amber" : "bg-hp-red";
  return (
    <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
      <div 
        className={`h-full transition-all duration-700 ease-out shadow-lg ${color}`} 
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};
```

### Component: PokemonPicker
A visual, horizontal strip for selection across Attacker, Target, Status, and Management panels.
- **Sprite-Only**: Displays 44x44px Pokémon icons without text or HP bars.
- **Highlight**: Active selection indicated by a `ring-2 ring-yellow-400` border glow.
- **Filtered Mode**: In the Management panel, only displays the current player's active Pokémon.
- **No-Scrollbar**: Uses the `.no-scrollbar` utility for a clean interaction.
```jsx
const PokemonPicker = ({ pokemons, selectedId, onSelect }) => (
  <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 px-1">
    {pokemons.map(p => (
      <PokemonCard key={p.id} pokemon={p} isSelected={p.id === selectedId} onClick={() => onSelect(p.id)} />
    ))}
  </div>
);
```

### Component: HolographicTerminal
The scrolling log container.
```jsx
const Terminal = ({ logs }) => (
  <div className="font-mono text-xs overflow-y-auto h-48 scrollbar-hide text-neon-amber bg-black/20 p-4 border-t border-neon-amber/20 shadow-inner">
    {logs.map((log, i) => (
      <div key={i} className="mb-1 opacity-90 animate-fade-in">> {log}</div>
    ))}
  </div>
);
```

---

## 4. Interaction Patterns
- **Hover Transitions**: `scale(1.02)` and `brightness(1.1)`.
- **Loading State**: Pulse animation on health bars during sync.
- **Victory/Defeat**: Full-screen overlay with text shadow glow.

---

## 5. Responsive Strategy
- **Portrait (< 768px)**: 1-col battle grid; HP bars absolute-positioned over sprites.
- **Landscape (>= 768px)**: 3x2 Grid View; Full Stat sidebar visible.
- **Touch**: 48x48px hit areas for all interactive move buttons.

---

## 6. Accessibility & Performance
- **Contrast**: 4.5:1 ratio for all text on glass cards.
- **Motion**: Support `prefers-reduced-motion` by disabling glow-pulses.
- **Images**: Use lazy loading and WebP for all Pokémon sprites.
