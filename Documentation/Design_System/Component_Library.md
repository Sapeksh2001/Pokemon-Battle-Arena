# Component Library

## 1. Core Fragments
### TrainerCard
- Displays Name, Pokéballs remaining, and current Status of the team.
- Located at top-left (Opponent) and bottom-right (Player).

### BattleLog
- A scrolling text window using a fixed-width pixel font.
- Features automatic truncation of old messages to preserve performance.

### MoveButton
- A high-contrast interactive element showing Move Name, Type Color, and remaining PP.

## 2. Interactive States
- **Hover**: Subtle brightness increase (+10%).
- **Active**: 1px downward shift to simulate a physical button press.
- **Disabled**: Greyscale filter applied to indicate insufficient PP.
