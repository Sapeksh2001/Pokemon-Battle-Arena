# Layout System

## 1. Viewport Scaling
The application uses a **vmin-based grid system**.
- **Container**: Fixed 16:9 aspect ratio.
- **Constraints**: Layout is capped at `95vmin` to ensure it never touches browser edges, providing a "safe zone" for UI.

## 2. Arena Grid
The battle view is split into three vertical sections:
- **Top (40%)**: Environment background and Opponent Sprite.
- **Middle (30%)**: Player Sprite and Battle Log.
- **Bottom (30%)**: Control Panel (Moves, Items, Switch).

## 3. Z-Index Stack
- **Layer 0**: Environment/Background.
- **Layer 10**: Sprites & Particles.
- **Layer 20**: HP Bars & Status Windows.
- **Layer 100**: Modals & Overlays.
