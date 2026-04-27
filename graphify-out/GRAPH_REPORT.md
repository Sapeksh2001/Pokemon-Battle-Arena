# Graph Report - pokemon-battle-arena-main  (2026-04-28)

## Corpus Check
- 69 files · ~376,892 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 358 nodes · 804 edges · 16 communities detected
- Extraction: 63% EXTRACTED · 37% INFERRED · 0% AMBIGUOUS · INFERRED: 299 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]

## God Nodes (most connected - your core abstractions)
1. `PokemonBattleArena` - 53 edges
2. `PokemonBattleArena` - 47 edges
3. `MultiplayerManager` - 34 edges
4. `Pokemon` - 21 edges
5. `UIRenderer` - 18 edges
6. `escapeHTML()` - 14 edges
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

### Community 0 - "Community 0"
Cohesion: 0.05
Nodes (8): generatePlayerId(), generateRoomCode(), MultiplayerManager, checkUrl(), traverse(), verifyAndFix(), BattleLog, RingBuffer

### Community 1 - "Community 1"
Cohesion: 0.11
Nodes (1): PokemonBattleArena

### Community 2 - "Community 2"
Cohesion: 0.1
Nodes (1): PokemonBattleArena

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (3): Pokemon, BattleEngine, applyModification()

### Community 4 - "Community 4"
Cohesion: 0.15
Nodes (2): PokemonDatabase, escapeHTML()

### Community 5 - "Community 5"
Cohesion: 0.17
Nodes (1): UIRenderer

### Community 6 - "Community 6"
Cohesion: 0.19
Nodes (6): AudioManager, loadGameData(), loadScript(), hideLoadingOverlay(), startApp(), waitForReactAndStart()

### Community 7 - "Community 7"
Cohesion: 0.27
Nodes (1): HistoryManager

### Community 8 - "Community 8"
Cohesion: 0.17
Nodes (4): ArenaView(), PokemonPicker(), useArena(), GameRoot()

### Community 9 - "Community 9"
Cohesion: 0.24
Nodes (1): Timer

### Community 10 - "Community 10"
Cohesion: 0.2
Nodes (1): AuthManager

### Community 11 - "Community 11"
Cohesion: 0.25
Nodes (1): Player

### Community 12 - "Community 12"
Cohesion: 0.25
Nodes (1): ModalManager

### Community 13 - "Community 13"
Cohesion: 0.33
Nodes (1): Trie

### Community 14 - "Community 14"
Cohesion: 0.7
Nodes (4): getSlugs(), loadCsvMapping(), main(), scanDataset()

### Community 15 - "Community 15"
Cohesion: 0.7
Nodes (4): calculateLv100MaxStats(), fetchPokedex(), normalizeId(), run()

## Knowledge Gaps
- **Thin community `Community 1`** (52 nodes): `.sendGameState()`, `.addPlayer()`, `._applyHPChange()`, `.confirmHPEdit()`, `.cycleWeather()`, `.handleRevive()`, `.toggleStatus()`, `PokemonBattleArena`, `.addPlayer()`, `._animateSprite()`, `._announce()`, `._applyHPChange()`, `._applyStatusDamage()`, `._applyWeatherDamage()`, `._confirmEvolution()`, `._confirmFormChange()`, `.confirmHPEdit()`, `.constructor()`, `.cycleWeather()`, `.editHP()`, `.endRound()`, `.handleAttack()`, `.handleEvolve()`, `.handleRevive()`, `.handleStatUpdate()`, `.handleTeamIconClick()`, `.init()`, `._notify()`, `.openConfirmModal()`, `._openEvolutionChoiceModal()`, `.openFormChangeModal()`, `._populateAbilitiesMap()`, `._populateMoveSelector()`, `._populateMoveTypeSelector()`, `._populateSelectionGrid()`, `._prepopulate()`, `._registerModals()`, `.removePlayer()`, `._setArena()`, `._setupKeyboardShortcuts()`, `._setupMultiplayerUI()`, `._showDamageNumber()`, `._switchActivePokemon()`, `._toggleLoading()`, `.toggleStatus()`, `.applyStatus()`, `.removeStatus()`, `main.js`, `.play()`, `.playCry()`, `.snapshot()`, `.renderAll()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 2`** (41 nodes): `PokemonBattleArena`, `._animateSprite()`, `._announce()`, `._applyStatusDamage()`, `._applyWeatherDamage()`, `._confirmDevolution()`, `._confirmEvolution()`, `._confirmFormChange()`, `.constructor()`, `.editHP()`, `.endRound()`, `.handleAttack()`, `.handleDevolve()`, `.handleEvolve()`, `.handleTeamIconClick()`, `._handleTimeout()`, `.init()`, `._notify()`, `._openDevolutionChoiceModal()`, `._openEvolutionChoiceModal()`, `.openFormChangeModal()`, `._playEntryAnimation()`, `._populateAbilitiesMap()`, `._populateMoveSelector()`, `._populateMoveTypeSelector()`, `._populateSelectionGrid()`, `._registerModals()`, `.removePlayer()`, `._resolveEvolutions()`, `._setArena()`, `._setupEventListeners()`, `._setupKeyboardShortcuts()`, `._setupMultiplayerUI()`, `._showDamageNumber()`, `._switchActivePokemon()`, `.getActivePokemon()`, `.switchTo()`, `.clearStatuses()`, `.isFainted()`, `.getPreEvolutions()`, `main.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 4`** (27 nodes): `._buildAbilityOptionsHTML()`, `._confirmPokemonEdit()`, `.openConfirmModal()`, `._openPokemonEditor()`, `.openTeamManager()`, `._removePokemonSlot()`, `._renderTeamEditorGrid()`, `._buildAbilityOptionsHTML()`, `._confirmPokemonEdit()`, `._openPokemonEditor()`, `.openTeamManager()`, `._playEntryAnimation()`, `._removePokemonSlot()`, `._renderTeamEditorGrid()`, `.clearSlot()`, `.setSlot()`, `PokemonDatabase.js`, `.add()`, `PokemonDatabase`, `.constructor()`, `.createPokemonInstance()`, `.find()`, `.getEvolutions()`, `.getForms()`, `PokemonDatabase.js`, `.open()`, `escapeHTML()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 5`** (19 nodes): `.hasStatus()`, `UIRenderer.js`, `UIRenderer.js`, `UIRenderer`, `._buildGaugeHTML()`, `.constructor()`, `._createEmptyCard()`, `._createPlayerCard()`, `.populateDropdown()`, `._renderPlayerCards()`, `._renderStatHeaders()`, `._renderStatusIcons()`, `._renderStatValues()`, `._renderTeamIcons()`, `._renderTypeBadges()`, `._updateControlPanel()`, `._updateManagementButtons()`, `._updateStatusButtonStyles()`, `._updateWeatherView()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (12 nodes): `HistoryManager.js`, `HistoryManager`, `.canRedo()`, `.canUndo()`, `.clear()`, `.constructor()`, `.redo()`, `._restore()`, `._serialise()`, `.undo()`, `._updateButtons()`, `HistoryManager.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (10 nodes): `._setupEventListeners()`, `Timer.js`, `Timer.js`, `Timer`, `.constructor()`, `.linkDisplay()`, `.pause()`, `.reset()`, `.start()`, `._updateDisplay()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (10 nodes): `AuthManager`, `.constructor()`, `.login()`, `.loginAsGuest()`, `.loginWithGoogle()`, `.logout()`, `.register()`, `.updateTrainerName()`, `authManager.js`, `authManager.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (8 nodes): `Player`, `.canSwitchTo()`, `.constructor()`, `.fromJSON()`, `.hasLivingPokemon()`, `.toJSON()`, `Player.js`, `Player.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (8 nodes): `ModalManager.js`, `ModalManager.js`, `ModalManager`, `.anyOpen()`, `.closeAll()`, `.constructor()`, `.isOpen()`, `.register()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (7 nodes): `Trie.js`, `Trie.js`, `Trie`, `._collect()`, `.constructor()`, `.insert()`, `.search()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PokemonBattleArena` connect `Community 2` to `Community 0`, `Community 1`, `Community 3`, `Community 4`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `MultiplayerManager` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `PokemonBattleArena` connect `Community 1` to `Community 9`, `Community 3`, `Community 4`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._