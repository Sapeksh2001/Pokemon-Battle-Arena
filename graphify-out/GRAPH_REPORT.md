# Graph Report - .  (2026-05-24)

## Corpus Check
- 97 files · ~384,962 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 361 nodes · 680 edges · 15 communities detected
- Extraction: 75% EXTRACTED · 25% INFERRED · 0% AMBIGUOUS · INFERRED: 170 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_.Constructor() Audiomanager.Js|.Constructor() Audiomanager.Js]]
- [[_COMMUNITY_Pokemonbattlearena .Addplayer()|Pokemonbattlearena .Addplayer()]]
- [[_COMMUNITY_.Constructor() Battlelog.Js|.Constructor() Battlelog.Js]]
- [[_COMMUNITY_Socketclient.Js Generateplayerid()|Socketclient.Js Generateplayerid()]]
- [[_COMMUNITY_.Constructor() Pokemon.Js|.Constructor() Pokemon.Js]]
- [[_COMMUNITY_Uirenderer.Js .Hasstatus()|Uirenderer.Js .Hasstatus()]]
- [[_COMMUNITY_Player.Js Player|Player.Js Player]]
- [[_COMMUNITY_Historymanager.Js Historymanager|Historymanager.Js Historymanager]]
- [[_COMMUNITY_Arenaview() Pokemoncard()|Arenaview() Pokemoncard()]]
- [[_COMMUNITY_Authmanager.Js Authmanager|Authmanager.Js Authmanager]]
- [[_COMMUNITY_Timer.Js Setupeventlisteners()|Timer.Js Setupeventlisteners()]]
- [[_COMMUNITY_Dataloader.Js .Init()|Dataloader.Js .Init()]]
- [[_COMMUNITY_Modalmanager.Js Modalmanager|Modalmanager.Js Modalmanager]]
- [[_COMMUNITY_Trie.Js Trie|Trie.Js Trie]]
- [[_COMMUNITY_Calculatelv100Maxstats() Fetchpokedex()|Calculatelv100Maxstats() Fetchpokedex()]]

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

### Community 0 - ".Constructor() Audiomanager.Js"
Cohesion: 0.1
Nodes (2): PokemonBattleArena, AudioManager

### Community 1 - "Pokemonbattlearena .Addplayer()"
Cohesion: 0.08
Nodes (2): PokemonBattleArena, escapeHTML()

### Community 2 - ".Constructor() Battlelog.Js"
Cohesion: 0.07
Nodes (10): getSlugs(), loadCsvMapping(), main(), scanDataset(), checkUrl(), traverse(), verifyAndFix(), BattleLog (+2 more)

### Community 3 - "Socketclient.Js Generateplayerid()"
Cohesion: 0.11
Nodes (3): generatePlayerId(), generateRoomCode(), MultiplayerManager

### Community 4 - ".Constructor() Pokemon.Js"
Cohesion: 0.08
Nodes (4): Pokemon, BattleEngine, applyModification(), normalizeTier()

### Community 5 - "Uirenderer.Js .Hasstatus()"
Cohesion: 0.16
Nodes (1): UIRenderer

### Community 6 - "Player.Js Player"
Cohesion: 0.17
Nodes (1): Player

### Community 7 - "Historymanager.Js Historymanager"
Cohesion: 0.27
Nodes (1): HistoryManager

### Community 8 - "Arenaview() Pokemoncard()"
Cohesion: 0.17
Nodes (4): ArenaView(), PokemonPicker(), useArena(), GameRoot()

### Community 9 - "Authmanager.Js Authmanager"
Cohesion: 0.18
Nodes (1): AuthManager

### Community 10 - "Timer.Js Setupeventlisteners()"
Cohesion: 0.24
Nodes (1): Timer

### Community 11 - "Dataloader.Js .Init()"
Cohesion: 0.29
Nodes (5): loadGameData(), loadScript(), hideLoadingOverlay(), startApp(), waitForReactAndStart()

### Community 12 - "Modalmanager.Js Modalmanager"
Cohesion: 0.25
Nodes (1): ModalManager

### Community 13 - "Trie.Js Trie"
Cohesion: 0.33
Nodes (1): Trie

### Community 14 - "Calculatelv100Maxstats() Fetchpokedex()"
Cohesion: 0.7
Nodes (4): calculateLv100MaxStats(), fetchPokedex(), normalizeId(), run()

## Knowledge Gaps
- **Thin community `.Constructor() Audiomanager.Js`** (60 nodes): `.sendGameState()`, `PokemonBattleArena`, `.addPlayer()`, `._animateSprite()`, `._announce()`, `._applyHPChange()`, `._applyStatusDamage()`, `._applyWeatherDamage()`, `._buildAbilityOptionsHTML()`, `._confirmEvolution()`, `._confirmFormChange()`, `.confirmHPEdit()`, `._confirmPokemonEdit()`, `.constructor()`, `.cycleWeather()`, `.editHP()`, `.endRound()`, `.handleAttack()`, `.handleEvolve()`, `.handleRevive()`, `.handleStatUpdate()`, `.handleTeamIconClick()`, `.init()`, `._notify()`, `.openConfirmModal()`, `._openEvolutionChoiceModal()`, `.openFormChangeModal()`, `._openPokemonEditor()`, `.openTeamManager()`, `._populateAbilitiesMap()`, `._populateMoveSelector()`, `._populateMoveTypeSelector()`, `._populateSelectionGrid()`, `._prepopulate()`, `._registerModals()`, `.removePlayer()`, `._removePokemonSlot()`, `._renderTeamEditorGrid()`, `._setArena()`, `._setupKeyboardShortcuts()`, `._setupMultiplayerUI()`, `._showDamageNumber()`, `._switchActivePokemon()`, `._toggleLoading()`, `.toggleStatus()`, `.updateAttackPreview()`, `.getActivePokemon()`, `.isFainted()`, `main.js`, `AudioManager.js`, `AudioManager`, `.constructor()`, `.play()`, `.playCry()`, `.linkGameState()`, `.snapshot()`, `.find()`, `AudioManager.js`, `.open()`, `.renderAll()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Pokemonbattlearena .Addplayer()`** (55 nodes): `PokemonBattleArena`, `.addPlayer()`, `._animateSprite()`, `._announce()`, `._applyHPChange()`, `._applyStatusDamage()`, `._applyWeatherDamage()`, `._buildAbilityOptionsHTML()`, `._confirmDevolution()`, `._confirmEvolution()`, `._confirmFormChange()`, `.confirmHPEdit()`, `._confirmPokemonEdit()`, `.constructor()`, `.cycleWeather()`, `.editHP()`, `.endRound()`, `.handleAttack()`, `.handleDevolve()`, `.handleEvolve()`, `.handleQuit()`, `.handleRevive()`, `.handleStatUpdate()`, `.handleTeamIconClick()`, `._handleTimeout()`, `.init()`, `._notify()`, `.openConfirmModal()`, `._openDevolutionChoiceModal()`, `._openEvolutionChoiceModal()`, `.openFormChangeModal()`, `._openPokemonEditor()`, `.openTeamManager()`, `._playEntryAnimation()`, `._populateAbilitiesMap()`, `._populateMoveSelector()`, `._populateMoveTypeSelector()`, `._populateSelectionGrid()`, `._prepopulate()`, `._registerModals()`, `.removePlayer()`, `._removePokemonSlot()`, `._renderTeamEditorGrid()`, `._resolveEvolutions()`, `._setArena()`, `._setupEventListeners()`, `._setupKeyboardShortcuts()`, `._setupMultiplayerUI()`, `._showDamageNumber()`, `._switchActivePokemon()`, `._toggleLoading()`, `.toggleStatus()`, `.updateAttackPreview()`, `main.js`, `escapeHTML()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Uirenderer.Js .Hasstatus()`** (21 nodes): `.hasStatus()`, `UIRenderer.js`, `UIRenderer.js`, `UIRenderer`, `._buildGaugeHTML()`, `.constructor()`, `._createEmptyCard()`, `._createPlayerCard()`, `._getHPColor()`, `.populateDropdown()`, `._renderMovesAndAbilities()`, `._renderPlayerCards()`, `._renderStatHeaders()`, `._renderStatusIcons()`, `._renderStatValues()`, `._renderTeamIcons()`, `._renderTypeBadges()`, `._updateControlPanel()`, `._updateManagementButtons()`, `._updateStatusButtonStyles()`, `._updateWeatherView()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Player.Js Player`** (12 nodes): `Player`, `.canSwitchTo()`, `.clearSlot()`, `.constructor()`, `.fromJSON()`, `.hasLivingPokemon()`, `.setSlot()`, `.switchTo()`, `.toJSON()`, `.clearStatuses()`, `Player.js`, `Player.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Historymanager.Js Historymanager`** (12 nodes): `HistoryManager.js`, `HistoryManager`, `.canRedo()`, `.canUndo()`, `.clear()`, `.constructor()`, `.redo()`, `._restore()`, `._serialise()`, `.undo()`, `._updateButtons()`, `HistoryManager.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Authmanager.Js Authmanager`** (11 nodes): `AuthManager`, `.constructor()`, `.login()`, `.loginAsGuest()`, `.loginWithGoogle()`, `.logout()`, `.register()`, `.subscribe()`, `.updateTrainerName()`, `authManager.js`, `authManager.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Timer.Js Setupeventlisteners()`** (10 nodes): `._setupEventListeners()`, `Timer.js`, `Timer.js`, `Timer`, `.constructor()`, `.linkDisplay()`, `.pause()`, `.reset()`, `.start()`, `._updateDisplay()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Modalmanager.Js Modalmanager`** (8 nodes): `ModalManager.js`, `ModalManager.js`, `ModalManager`, `.anyOpen()`, `.closeAll()`, `.constructor()`, `.isOpen()`, `.register()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Trie.Js Trie`** (7 nodes): `Trie.js`, `Trie.js`, `Trie`, `._collect()`, `.constructor()`, `.insert()`, `.search()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `escapeHTML()` connect `Pokemonbattlearena .Addplayer()` to `.Constructor() Audiomanager.Js`, `.Constructor() Battlelog.Js`, `.Constructor() Pokemon.Js`, `Uirenderer.Js .Hasstatus()`?**
  _High betweenness centrality (0.158) - this node is a cross-community bridge._
- **Why does `PokemonBattleArena` connect `.Constructor() Audiomanager.Js` to `.Constructor() Battlelog.Js`, `Timer.Js Setupeventlisteners()`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `.Constructor() Audiomanager.Js` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Pokemonbattlearena .Addplayer()` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `.Constructor() Battlelog.Js` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Socketclient.Js Generateplayerid()` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `.Constructor() Pokemon.Js` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._