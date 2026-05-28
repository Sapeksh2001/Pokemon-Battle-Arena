# Graph Report - .  (2026-05-29)

## Corpus Check
- 86 files · ~423,276 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 361 nodes · 680 edges · 15 communities detected
- Extraction: 75% EXTRACTED · 25% INFERRED · 0% AMBIGUOUS · INFERRED: 170 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Arena Battle State|Arena Battle State]]
- [[_COMMUNITY_Arena UI & Battle Controller|Arena UI & Battle Controller]]
- [[_COMMUNITY_Multiplayer Socket Client|Multiplayer Socket Client]]
- [[_COMMUNITY_Multiplayer Lobby Manager|Multiplayer Lobby Manager]]
- [[_COMMUNITY_Pokemon Model & Stats|Pokemon Model & Stats]]
- [[_COMMUNITY_UI Renderer Layout|UI Renderer Layout]]
- [[_COMMUNITY_Player Model & Serialization|Player Model & Serialization]]
- [[_COMMUNITY_History & State Rollbacks|History & State Rollbacks]]
- [[_COMMUNITY_Arena React Views & Context|Arena React Views & Context]]
- [[_COMMUNITY_Auth & Session Manager|Auth & Session Manager]]
- [[_COMMUNITY_UI Timer & Listeners|UI Timer & Listeners]]
- [[_COMMUNITY_DataLoader Service|DataLoader Service]]
- [[_COMMUNITY_Modal Manager Dialogs|Modal Manager Dialogs]]
- [[_COMMUNITY_Trie Autocomplete Search|Trie Autocomplete Search]]
- [[_COMMUNITY_Form Ingestion Scripts|Form Ingestion Scripts]]

## God Nodes (most connected - your core abstractions)
1. `PokemonBattleArena` - 53 edges
2. `PokemonBattleArena` - 47 edges
3. `MultiplayerManager` - 34 edges
4. `Pokemon` - 21 edges
5. `UIRenderer` - 20 edges
6. `escapeHTML()` - 15 edges
7. `HistoryManager` - 12 edges
8. `Player` - 11 edges
9. `PokemonDatabase` - 11 edges
10. `AuthManager` - 10 edges

## Surprising Connections (you probably didn't know these)
- `startApp()` --calls--> `loadGameData()`  [INFERRED]
  src/script.js → src/engine/services/DataLoader.js
- `GameRoot()` --calls--> `useArena()`  [INFERRED]
  src/App.jsx → src/contexts/ArenaContext.jsx
- `PokemonPicker()` --calls--> `useArena()`  [INFERRED]
  src/components/PokemonPicker.jsx → src/contexts/ArenaContext.jsx
- `ArenaView()` --calls--> `useArena()`  [INFERRED]
  src/components/ArenaView.jsx → src/contexts/ArenaContext.jsx

## Communities

### Community 0 - "Arena Battle State"
Cohesion: 0.1
Nodes (2): PokemonBattleArena, AudioManager

### Community 1 - "Arena UI & Battle Controller"
Cohesion: 0.08
Nodes (2): PokemonBattleArena, escapeHTML()

### Community 2 - "Multiplayer Socket Client"
Cohesion: 0.07
Nodes (10): getSlugs(), loadCsvMapping(), main(), scanDataset(), checkUrl(), traverse(), verifyAndFix(), BattleLog (+2 more)

### Community 3 - "Multiplayer Lobby Manager"
Cohesion: 0.11
Nodes (3): generatePlayerId(), generateRoomCode(), MultiplayerManager

### Community 4 - "Pokemon Model & Stats"
Cohesion: 0.08
Nodes (4): Pokemon, BattleEngine, applyModification(), normalizeTier()

### Community 5 - "UI Renderer Layout"
Cohesion: 0.16
Nodes (1): UIRenderer

### Community 6 - "Player Model & Serialization"
Cohesion: 0.17
Nodes (1): Player

### Community 7 - "History & State Rollbacks"
Cohesion: 0.27
Nodes (1): HistoryManager

### Community 8 - "Arena React Views & Context"
Cohesion: 0.17
Nodes (4): ArenaView(), PokemonPicker(), useArena(), GameRoot()

### Community 9 - "Auth & Session Manager"
Cohesion: 0.18
Nodes (1): AuthManager

### Community 10 - "UI Timer & Listeners"
Cohesion: 0.24
Nodes (1): Timer

### Community 11 - "DataLoader Service"
Cohesion: 0.29
Nodes (5): loadGameData(), loadScript(), hideLoadingOverlay(), startApp(), waitForReactAndStart()

### Community 12 - "Modal Manager Dialogs"
Cohesion: 0.25
Nodes (1): ModalManager

### Community 13 - "Trie Autocomplete Search"
Cohesion: 0.33
Nodes (1): Trie

### Community 14 - "Form Ingestion Scripts"
Cohesion: 0.7
Nodes (4): calculateLv100MaxStats(), fetchPokedex(), normalizeId(), run()

## Knowledge Gaps
- **Thin community `Arena Battle State`** (60 nodes): `.sendGameState()`, `PokemonBattleArena`, `.addPlayer()`, `._animateSprite()`, `._announce()`, `._applyHPChange()`, `._applyStatusDamage()`, `._applyWeatherDamage()`, `._buildAbilityOptionsHTML()`, `._confirmEvolution()`, `._confirmFormChange()`, `.confirmHPEdit()`, `._confirmPokemonEdit()`, `.constructor()`, `.cycleWeather()`, `.editHP()`, `.endRound()`, `.handleAttack()`, `.handleEvolve()`, `.handleRevive()`, `.handleStatUpdate()`, `.handleTeamIconClick()`, `.init()`, `._notify()`, `.openConfirmModal()`, `._openEvolutionChoiceModal()`, `.openFormChangeModal()`, `._openPokemonEditor()`, `.openTeamManager()`, `._populateAbilitiesMap()`, `._populateMoveSelector()`, `._populateMoveTypeSelector()`, `._populateSelectionGrid()`, `._prepopulate()`, `._registerModals()`, `.removePlayer()`, `._removePokemonSlot()`, `._renderTeamEditorGrid()`, `._setArena()`, `._setupKeyboardShortcuts()`, `._setupMultiplayerUI()`, `._showDamageNumber()`, `._switchActivePokemon()`, `._toggleLoading()`, `.toggleStatus()`, `.updateAttackPreview()`, `.getActivePokemon()`, `.isFainted()`, `main.js`, `AudioManager.js`, `AudioManager`, `.constructor()`, `.play()`, `.playCry()`, `.linkGameState()`, `.snapshot()`, `.find()`, `AudioManager.js`, `.open()`, `.renderAll()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Arena UI & Battle Controller`** (55 nodes): `PokemonBattleArena`, `.addPlayer()`, `._animateSprite()`, `._announce()`, `._applyHPChange()`, `._applyStatusDamage()`, `._applyWeatherDamage()`, `._buildAbilityOptionsHTML()`, `._confirmDevolution()`, `._confirmEvolution()`, `._confirmFormChange()`, `.confirmHPEdit()`, `._confirmPokemonEdit()`, `.constructor()`, `.cycleWeather()`, `.editHP()`, `.endRound()`, `.handleAttack()`, `.handleDevolve()`, `.handleEvolve()`, `.handleQuit()`, `.handleRevive()`, `.handleStatUpdate()`, `.handleTeamIconClick()`, `._handleTimeout()`, `.init()`, `._notify()`, `.openConfirmModal()`, `._openDevolutionChoiceModal()`, `._openEvolutionChoiceModal()`, `.openFormChangeModal()`, `._openPokemonEditor()`, `.openTeamManager()`, `._playEntryAnimation()`, `._populateAbilitiesMap()`, `._populateMoveSelector()`, `._populateMoveTypeSelector()`, `._populateSelectionGrid()`, `._prepopulate()`, `._registerModals()`, `.removePlayer()`, `._removePokemonSlot()`, `._renderTeamEditorGrid()`, `._resolveEvolutions()`, `._setArena()`, `._setupEventListeners()`, `._setupKeyboardShortcuts()`, `._setupMultiplayerUI()`, `._showDamageNumber()`, `._switchActivePokemon()`, `._toggleLoading()`, `.toggleStatus()`, `.updateAttackPreview()`, `main.js`, `escapeHTML()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `UI Renderer Layout`** (21 nodes): `.hasStatus()`, `UIRenderer.js`, `UIRenderer.js`, `UIRenderer`, `._buildGaugeHTML()`, `.constructor()`, `._createEmptyCard()`, `._createPlayerCard()`, `._getHPColor()`, `.populateDropdown()`, `._renderMovesAndAbilities()`, `._renderPlayerCards()`, `._renderStatHeaders()`, `._renderStatusIcons()`, `._renderStatValues()`, `._renderTeamIcons()`, `._renderTypeBadges()`, `._updateControlPanel()`, `._updateManagementButtons()`, `._updateStatusButtonStyles()`, `._updateWeatherView()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Player Model & Serialization`** (12 nodes): `Player`, `.canSwitchTo()`, `.clearSlot()`, `.constructor()`, `.fromJSON()`, `.hasLivingPokemon()`, `.setSlot()`, `.switchTo()`, `.toJSON()`, `.clearStatuses()`, `Player.js`, `Player.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `History & State Rollbacks`** (12 nodes): `HistoryManager.js`, `HistoryManager`, `.canRedo()`, `.canUndo()`, `.clear()`, `.constructor()`, `.redo()`, `._restore()`, `._serialise()`, `.undo()`, `._updateButtons()`, `HistoryManager.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Auth & Session Manager`** (11 nodes): `AuthManager`, `.constructor()`, `.login()`, `.loginAsGuest()`, `.loginWithGoogle()`, `.logout()`, `.register()`, `.subscribe()`, `.updateTrainerName()`, `authManager.js`, `authManager.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `UI Timer & Listeners`** (10 nodes): `._setupEventListeners()`, `Timer.js`, `Timer.js`, `Timer`, `.constructor()`, `.linkDisplay()`, `.pause()`, `.reset()`, `.start()`, `._updateDisplay()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Modal Manager Dialogs`** (8 nodes): `ModalManager.js`, `ModalManager.js`, `ModalManager`, `.anyOpen()`, `.closeAll()`, `.constructor()`, `.isOpen()`, `.register()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Trie Autocomplete Search`** (7 nodes): `Trie.js`, `Trie.js`, `Trie`, `._collect()`, `.constructor()`, `.insert()`, `.search()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `escapeHTML()` connect `Arena UI & Battle Controller` to `Arena Battle State`, `Multiplayer Socket Client`, `Pokemon Model & Stats`, `UI Renderer Layout`?**
  _High betweenness centrality (0.158) - this node is a cross-community bridge._
- **Why does `PokemonBattleArena` connect `Arena Battle State` to `Multiplayer Socket Client`, `UI Timer & Listeners`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `Arena Battle State` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Arena UI & Battle Controller` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Multiplayer Socket Client` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Multiplayer Lobby Manager` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Pokemon Model & Stats` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._