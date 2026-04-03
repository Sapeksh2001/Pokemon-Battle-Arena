# Responsive Design

## 1. Scaling Strategy
The application employs an **Aspect Ratio Lock** at 16:9.

## 2. Breakpoints
- **Desktop (>1024px)**: Full interface with sidebar assistance for debug logs.
- **Tablet (768px - 1023px)**: Interface centers with letter-boxing to maintain aspect ratio integrity.
- **Mobile (<767px)**: Controls wrap to a vertical stack if the device is in Portrait mode, or scale down in Landscape mode.

## 3. UI Adaptations
- **Click Areas**: Minimum 44px hit-box on mobile to accommodate touch interactions.
- **Font-Size**: Scales via `calc(0.5rem + 1vmin)` to remain proportional to the overall UI scale.
