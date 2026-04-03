# React Migration Plan: Pokémon Battle Arena (Visual Parity)

Based on your clarification, the goal is a **1:1 visual recreation** using React. The user should not notice *any* visual changes; the migration is purely an architectural upgrade ("under-the-hood") to make the codebase manageable, scalable, and modern. I have explored the game and captured all screens (Lobby, Settings, Battle UI, Team Management) to serve as our visual targets.

## Proposed Strategy: "Lift and Shift" to React

Because the underlying engine handles extensive logic (HP calculations, turn resolutions, weather), our safest strategy is to encapsulate the existing `PokemonBattleArena` class and wrap it in React context, instead of immediately rewriting the game engine itself.

### Phase 1: Vite + React Scaffolding
1.  **Initialize Project:** Create a standard React project using Vite (`npx create-vite@latest frontend --template react`).
2.  **Tailwind Configuration:** Copy the custom Tailwind configuration from `index.html` (fonts `Press Start 2P`, `Space Grotesk`, and custom theme colors) directly into `tailwind.config.js`.
3.  **Static Assets:** Move the global CSS (`style.css`), background parallax images, datasets (`Pokemon_NewDataset.js`, `moves_data.js`, etc.), and script dependencies into the `public/` directory so they are loaded as before.

### Phase 2: Game Engine Encapsulation (Context API)
1.  **Engine Wrapper:** Create a React Context (`ArenaContext.jsx`) that initializes `window.arena = new PokemonBattleArena()`.
2.  **State Sync Hook:** Build a custom hook (`useArenaState()`) that subscribes to game engine events. When the legacy code does something like `updateHPBar()`, the hook will instead intercept this and trigger a React state setter, causing the React UI to re-render naturally.

### Phase 3: Componentizing the UI
Using the captured screenshots as a guide, we will break the massive monolithic HTML into React components, literally copying the HTML structural classes into `className` attributes:
*   **App.jsx**: Handles routing between `<Lobby />` and `<BattleArena />`.
*   **Lobby Views**: `<LobbyLayout>`, `<CreateRoomModal>`, `<JoinRoomModal>`, and `<SettingsModal>`.
*   **Battle Interface**:
    *   **`<TrainerCard>`**: Renders the 3D-effect div with HP, Energy, Status, and selected Pokémon sprite.
    *   **`<CommandPanel>`**: The bottom interface for Move Selection, Target Selection, and executing actions.
    *   **`<BattleLog>`**: The scrolling text box that records history.
    *   **`<ManageTeamOverlay>`**: Replicates the complex multi-tab trainer management screen.
*   **Overlays**: Ensure `<LoadingOverlay>` and Weather Effects (Sandstorm/Hail) are preserved.

## Verification Plan

1.  **Pixel-Perfect Audit**: Compare side-by-side screenshots of the old `index.html` with the new React dev server (`localhost:5173`) to ensure padding, margins, and the CRT-overlay are identical.
2.  **Functional Sync Check**: Start a Quick Battle in the React version and execute a move. Verify that HP depletes exactly as it did in the vanilla version without DOM mismatches.
3.  **Multiplayer Validation**: Ensure Socket.io connections are maintained across component re-renders.

> [!NOTE]
> Since we want a completely identical transition, I will immediately begin Phase 1 (Scaffolding the Vite project) and Phase 2 (Tailwind configuration) utilizing the same color classes and layout structures currently in your `index.html`. 

## User Review Required
> [!IMPORTANT]
> Because you currently have the application in `pokemon-battle-arena-main-backup`, I recommend generating the new Vite React app in a subfolder named `react-migrated` inside this current directory (so you still have the backup scripts running side-by-side during the transition). 
> 
> **Are you okay with me scaffolding the project inside `./react-migrated`?** If yes, please approve and I will begin the build process!
