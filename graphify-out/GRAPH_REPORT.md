# Graph Report - Pokemon-Battle-Arena  (2026-09-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 503 nodes · 999 edges · 30 communities (15 shown, 12 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- PokemonBattleArena
- MultiplayerManager
- engine/main.js
- App.jsx
- package.json
- .constructor
- Pokemon
- AbilityEngine
- UIRenderer
- BattleLog
- devDependencies
- PokemonDatabase
- BattleController
- build_data.cjs
- HistoryManager
- verify_and_fix_forms.js
- script.js
- get_unmatched.js
- inject_missing_forms.js
- build_main.mjs
- fix_final_manual.js
- vercel.json
- fix_movesets.cjs
- scratch.cjs
- code-review-graph
- deploy.sh
- engine/api/firebase-config.example.js

## God Nodes (most connected - your core abstractions)
1. `PokemonBattleArena` - 60 edges
2. `MultiplayerManager` - 43 edges
3. `Pokemon` - 40 edges
4. `ref()` - 25 edges
5. `AbilityEngine` - 23 edges
6. `UIRenderer` - 23 edges
7. `Player` - 20 edges
8. `BattleController` - 17 edges
9. `AuthManager` - 15 edges
10. `HistoryManager` - 14 edges

## Surprising Connections (you probably didn't know these)
- `startApp()` --calls--> `PokemonBattleArena`  [EXTRACTED]
  src/script.js → src/engine/main.js
- `GameRoot()` --calls--> `useArena()`  [EXTRACTED]
  src/App.jsx → src/contexts/ArenaContext.jsx
- `ArenaView()` --calls--> `useArena()`  [EXTRACTED]
  src/components/ArenaView.jsx → src/contexts/ArenaContext.jsx
- `PokemonPicker()` --calls--> `useArena()`  [EXTRACTED]
  src/components/PokemonPicker.jsx → src/contexts/ArenaContext.jsx

## Import Cycles
- None detected.

## Communities (30 total, 12 thin omitted)

### Community 1 - "MultiplayerManager"
Cohesion: 0.11
Nodes (4): MultiplayerManager, ref(), setActiveRoom(), Player

### Community 2 - "engine/main.js"
Cohesion: 0.08
Nodes (29): generatePlayerId(), getObjectDiff(), compare(), arenaBackgrounds, typeChart, typeColors, spriteOverrides, getTerrainDefenseModifier() (+21 more)

### Community 3 - "App.jsx"
Cohesion: 0.08
Nodes (24): react, @reticlehq/core, App(), GameRoot(), ArenaView(), AuthView(), LoadingOverlay(), LobbyView() (+16 more)

### Community 4 - "package.json"
Cohesion: 0.06
Nodes (36): dependencies, firebase, lucide-react, react, react-dom, socket.io-client, @tailwindcss/vite, tone (+28 more)

### Community 5 - ".constructor"
Cohesion: 0.09
Nodes (3): AudioManager, ModalManager, Timer

### Community 10 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, firebase-tools, globals (+8 more)

### Community 13 - "build_data.cjs"
Cohesion: 0.23
Nodes (12): buildAbilitiesData(), enrichMoves(), fetchShowdownAbilities(), fetchShowdownMoves(), fetchText(), fs, https, parseAbilitiesXlsx() (+4 more)

### Community 15 - "verify_and_fix_forms.js"
Cohesion: 0.22
Nodes (10): checkUrl(), fs, https, jsonMatch, linkOriginMap, pokemonWithForms, raw, traverse() (+2 more)

### Community 16 - "script.js"
Cohesion: 0.33
Nodes (8): DATA_FILES, emitProgress(), loadGameData(), loadJson(), hideLoadingOverlay(), startApp(), updateLoadingOverlay(), waitForReactAndStart()

### Community 17 - "get_unmatched.js"
Cohesion: 0.33
Nodes (8): CSV_PATH, DATASET_PATH, __dirname, __filename, getSlugs(), loadCsvMapping(), main(), scanDataset()

### Community 18 - "inject_missing_forms.js"
Cohesion: 0.33
Nodes (8): calculateLv100MaxStats(), fetchPokedex(), fs, https, normalizeId(), run(), getAllPokemonInDataset(), traverse()

### Community 19 - "build_main.mjs"
Cohesion: 0.29
Nodes (6): arenaClass, arenaStartMatch, bottomScripts, escapeHTMLMatch, script, windowLoadMatch

### Community 20 - "fix_final_manual.js"
Cohesion: 0.33
Nodes (6): content, dataEnd, dataStart, jsonData, manualOverrides, processRecursive()

### Community 21 - "vercel.json"
Cohesion: 0.40
Nodes (4): builds, name, routes, version

### Community 23 - "scratch.cjs"
Cohesion: 0.67
Nodes (3): count(), fs, pokemon

## Knowledge Gaps
- **95 isolated node(s):** `autoprefixer`, `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` (+90 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 170 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `App.jsx` to `package.json`?**
  _High betweenness centrality (0.208) - this node is a cross-community bridge._
- **Why does `PokemonBattleArena` connect `PokemonBattleArena` to `script.js`, `engine/main.js`, `.constructor`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Why does `MultiplayerManager` connect `MultiplayerManager` to `engine/main.js`, `.constructor`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **What connects `autoprefixer`, `eslint`, `@eslint/js` to the rest of the system?**
  _95 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `PokemonBattleArena` be split into smaller, more focused modules?**
  _Cohesion score 0.10465819721718088 - nodes in this community are weakly interconnected._
- **Should `MultiplayerManager` be split into smaller, more focused modules?**
  _Cohesion score 0.11236802413273002 - nodes in this community are weakly interconnected._
- **Should `engine/main.js` be split into smaller, more focused modules?**
  _Cohesion score 0.0784313725490196 - nodes in this community are weakly interconnected._