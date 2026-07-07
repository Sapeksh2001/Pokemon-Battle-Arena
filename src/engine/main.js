import { typeChart, typeColors, arenaBackgrounds } from './data/constants.js';
import { PokemonDatabase } from './services/PokemonDatabase.js';
import { Pokemon } from './models/Pokemon.js';
import { Player } from './models/Player.js';
import { applyModification, escapeHTML } from './utils/helpers.js';
import { AudioManager } from './services/AudioManager.js';
import { BattleEngine } from './services/BattleEngine.js';
import { BattleLog } from './services/BattleLog.js';
import { HistoryManager } from './services/HistoryManager.js';
import { ModalManager } from './ui/ModalManager.js';
import { Timer } from './ui/Timer.js';
import { UIRenderer } from './ui/UIRenderer.js';
import { MultiplayerManager } from './api/socketClient.js';
import { BattleController } from './services/BattleController.js';

export class PokemonBattleArena {
    constructor() {
        // Services
        this.battleController = new BattleController(this);
        this.audio = new AudioManager();
        this.db = new PokemonDatabase(window.MergedPokemonData || {});
        this.engine = new BattleEngine(typeChart);
        this.log = new BattleLog(200);
        this.history = new HistoryManager(30);
        this.modals = new ModalManager();
        this.timer = new Timer(120);
        this.multiplayer = new MultiplayerManager(this);

        // Game state — plain object so it remains JSON-serialisable by HistoryManager.
        this.gs = {
            players: [],
            round: 1,
            weather: 'none',
            activeTurnPlayerId: null,
            selectedAttackTargetId: null,
            selectedStatusTargetId: null,
            currentEditing: { playerId: null, slotId: null },
            currentHPEdit: null,
        };

        // Renderer (needs a reference back to arena for onclick callbacks).
        this.renderer = new UIRenderer(this.gs, this);

        // Hook up round timer timeout
        this.timer.onTimeout = () => this._handleTimeout();
    }

    // ── Bootstrap ─────────────────────────────────────────────────────────

    init() {
        // Try to load state from localStorage first
        const hasSavedState = this.loadLocalState();

        this.ensureDatabaseLoaded().then(() => this._initRemaining());
    }

    async ensureDatabaseLoaded() {
        if (Object.keys(this.db._raw).length > 0) {
            if (this.db._index.size === 0) {
                this.db.buildIndex();
                this._populateMoveTypeSelector();
                this._populateAbilitiesMap();
            }
            return;
        }

        this._toggleLoading(true, 'Loading database (one-time fetch)...');
        try {
            const { loadGameData } = await import('./services/DataLoader.js');
            await loadGameData();

            this.db._raw = window.MergedPokemonData || {};
            this.db.buildIndex();
            this._populateMoveTypeSelector();
            this._populateAbilitiesMap();

            console.log('[DATABASE] Lazy loaded successfully.');
        } catch (err) {
            this._announce('Failed to load database!', true);
            console.error(err);
        } finally {
            this._toggleLoading(false);
        }
    }

    _initRemaining() {
        document.body.addEventListener('click', () => Tone.start(), { once: true });
        document.body.addEventListener('click', () => this.audio.init(), { once: true });

        if (Object.keys(this.db._raw).length > 0) {
            this.db.buildIndex();
            this._populateMoveTypeSelector();
            this._populateAbilitiesMap();
        }

        this.log.linkGameState(this.gs);
        this._registerModals();
        this._setupEventListeners();
        this._setupKeyboardShortcuts();
        this._setupMultiplayerUI();

        this.renderer.renderAll();
        lucide.createIcons();
        this._setArena('Normal');
        this.history._updateButtons();

        if (this.gs.players.length === 0) {
            this.log.add('Battle arena initialised. Create rooms or start quick battle!', 'system');
        } else {
            this.log.add('Battle arena state restored from localStorage.', 'system');
        }

        // Expose callbacks used by inline HTML onclick attributes.
        window.openTeamManager = id => this.openTeamManager(id);
        window.handleTeamIconClick = (pid, sid) => this.handleTeamIconClick(pid, sid);
        window.editHP = id => this.editHP(id);
        window.removePlayer = id => this.removePlayer(id);
        window.handleQuit = () => this.handleQuit();
        // Expose switch-pokemon for the management section's Switch button.
        window.switchActivePokemonForMgmt = () => {
            const val = document.getElementById('status-target-select')?.dataset?.value || document.getElementById('status-target-select')?.value;
            if (!val) { this._announce('Select a Pokémon first.', true); return; }
            const [pid] = val.split('|');
            this.openTeamManager(pid);
        };

        // Signal to React (ArenaContext v3) that the engine is fully ready.
        // This replaces the 100ms polling loop in ArenaContext with a single event.
        window.dispatchEvent(new CustomEvent('arena:ready', { detail: { arena: this } }));
    }


    saveLocalState() {
        try {
            const state = {
                players: this.gs.players.map(p => p.toJSON()),
                round: this.gs.round,
                weather: this.gs.weather,
                activeTurnPlayerId: this.gs.activeTurnPlayerId,
                selectedAttackTargetId: this.gs.selectedAttackTargetId,
                selectedStatusTargetId: this.gs.selectedStatusTargetId,
                logs: this.log._buffer.toArray()
            };
            localStorage.setItem('pba_active_battle_state', JSON.stringify(state));
        } catch (err) {
            console.error('[Arena] Local save failed:', err);
        }
    }

    loadLocalState() {
        try {
            const saved = localStorage.getItem('pba_active_battle_state');
            if (!saved) return false;
            const state = JSON.parse(saved);
            this.gs.players = (state.players || []).map(p => Player.fromJSON(p, this.db));
            this.gs.round = state.round || 1;
            this.gs.weather = state.weather || 'none';
            this.gs.activeTurnPlayerId = state.activeTurnPlayerId || null;
            this.gs.selectedAttackTargetId = state.selectedAttackTargetId || null;
            this.gs.selectedStatusTargetId = state.selectedStatusTargetId || null;
            if (state.logs) this.log.loadLogs(state.logs);
            return true;
        } catch (err) {
            console.error('[Arena] Local load failed:', err);
            return false;
        }
    }

    _setupMultiplayerUI() {
        /**
         * window.createMultiplayerRoom(name)
         *
         * Called by the React "Create Room" modal's submit handler.
         * 'name' is provided as a parameter — no prompt() needed.
         */
        window.createMultiplayerRoom = (name, settings = {}) => {
            // Fallback: read from the auth display name if no name was passed
            const trainerName = name
                || document.getElementById('mp-host-name-input')?.value?.trim()
                || this.multiplayer?.playerName
                || 'Trainer';

            if (!trainerName) {
                this._announce('Enter a trainer name to create a room.', true);
                return;
            }

            this.multiplayer.connect();
            // Use setTimeout to allow Firebase connection to stabilise
            setTimeout(() => this.multiplayer.createRoom(trainerName, settings), 500);
        };

        /**
         * window.joinMultiplayerRoom(code, name)
         *
         * Called by the React "Join Room" modal's submit handler.
         * Parameters are provided directly — no prompt() needed.
         */
        window.joinMultiplayerRoom = (code, name) => {
            const roomCode = code
                || document.getElementById('mp-join-code-input')?.value?.trim();
            const trainerName = name
                || document.getElementById('mp-join-name-input')?.value?.trim()
                || this.multiplayer?.playerName
                || 'Trainer';

            if (!roomCode) {
                this._announce('Enter a room code to join.', true);
                return;
            }

            this.multiplayer.connect();
            setTimeout(() => this.multiplayer.joinRoom(roomCode.toUpperCase(), trainerName), 500);
        };
    }


    _registerModals() {
        [
            ['team', 'team-modal'],
            ['selection', 'selection-modal'],
            ['hpEdit', 'hp-edit-modal'],
            ['confirm', 'confirm-modal'],
            ['multiplayerLobby', 'multiplayer-lobby-modal'],
            ['settings', 'settings-modal'],
            ['trade', 'trade-modal'],
        ].forEach(([name, id]) => this.modals.register(name, document.getElementById(id)));
    }

    // ── DRY Helper: notify ────────────────────────────────────────────────
    /**
     * Single call to log AND announce. Eliminates the 10+ places that called
     * battleLog.add() + makeAnnouncement() separately.
     */
    _notify(message, logType = 'action', isError = false) {
        this.log.add(message, logType);
        this._announce(message, isError);
    }

    // ── DRY Helper: applyHPChange ─────────────────────────────────────────
    /**
     * Applies an HP change to a Pokémon, then handles all side-effects in one place:
     * damage numbers, battle log, announcement, and sprite animation.
     * Consolidates duplicate logic from: confirmHPEdit, handleStatUpdate,
     * handleRevive, and applyWeatherDamage.
     *
     * @param {Pokemon} pokemon
     * @param {number}  playerId
     * @param {number}  newHP     - The target HP value (will be clamped)
     * @param {string}  [source]  - Label for the log entry (e.g. "sandstorm")
     */
    _applyHPChange(pokemon, playerId, newHP, source = '', preventSync = false) {
        this.battleController._applyHPChange(pokemon, playerId, newHP, source, preventSync);
    }

    // ── Player management ─────────────────────────────────────────────────

    addPlayer() {
        this.audio.play('click');
        if (this.gs.players.length >= 6) {
            this._announce('Lobby Full: Maximum 6 trainers allowed.', true);
            return;
        }

        const input = document.getElementById('new-player-name');
        const name = input?.value.trim();
        if (!name) return;

        const sizeInput = document.getElementById('new-player-team-size');
        const modeInput = document.getElementById('new-player-team-mode');
        const count = sizeInput ? parseInt(sizeInput.value) : 6;
        const mode = modeInput ? modeInput.value : 'manual';

        const player = new Player(String(Date.now()), name, count);

        if (mode === 'random') {
            let pool = this.db.filteredNames;
            if (!pool || pool.length === 0) pool = this.db.allNames || [];
            if (pool.length > 0) {
                for (let i = 0; i < count; i++) {
                    const randomName = pool[Math.floor(Math.random() * pool.length)];
                    const r = this.db.find(randomName);
                    if (r) {
                        player.setSlot(i, new Pokemon(r.foundNode, r.baseNode));
                    }
                }
            }
        }

        this.gs.players.push(player);
        input.value = '';
        this.renderer.renderAll();

        if (mode === 'manual') {
            this.openTeamManager(player.id);
        }

        // Autosave Local State
        this.saveLocalState();

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    removePlayer(playerId) {
        if (this.multiplayer && this.multiplayer.mode !== 'offline' && !this.multiplayer.isHost) {
            this._notify('Only the host can remove players in multiplayer mode.', 'system', true);
            return;
        }

        const player = this.gs.players.find(p => p.id === playerId);
        if (!player) return;

        this.openConfirmModal(
            'Remove Trainer',
            `Are you sure you want to remove ${player.name} from the battle?`,
            () => {
                this.history.snapshot(this.gs);
                this.gs.players = this.gs.players.filter(p => p.id !== playerId);
                // Clear any selections pointing to the removed player.
                ['activeTurnPlayerId', 'selectedAttackTargetId', 'selectedStatusTargetId'].forEach(key => {
                    if (this.gs[key] === playerId) this.gs[key] = null;
                });
                this._notify(`${player.name} has been removed from the battle.`, 'system');
                this.renderer.renderAll();

                // Autosave Local State
                this.saveLocalState();

                // Sync game state in multiplayer
                if (this.multiplayer && this.multiplayer.mode === 'playing') {
                    this.multiplayer.sendAction('player_remove', { playerId });
                    this.multiplayer.sendGameState();
                }
            }
        );
    }

    // ── Round ─────────────────────────────────────────────────────────────

    endRound() {
        this.battleController.endRound();
    }

    // ── Attack ────────────────────────────────────────────────────────────

    handleAttack(attackType) {
        this.battleController.handleAttack(attackType);
    }

    _handleTimeout() {
        const attackerId = document.getElementById('attacker-select')?.dataset?.value || document.getElementById('attacker-select')?.value;
        const targetId = document.getElementById('attack-target-select')?.dataset?.value || document.getElementById('attack-target-select')?.value;
        const isMultiPlayer = this.gs.players.length > 2;

        if (!attackerId) {
            this._notify('Round Timeout: No attacker selected!', 'system', true);
            return;
        }

        const attackerPlayer = this.gs.players.find(p => p.id === attackerId);
        const attackerPokemon = attackerPlayer?.getActivePokemon();
        if (!attackerPokemon || attackerPokemon.isFainted()) return;

        // Reset inputs to a 'timeout' state
        const powerInput = document.getElementById('move-power-input');
        const typeSel = document.getElementById('move-type-select');
        const nameSel = document.getElementById('move-name-select');

        if (isMultiPlayer && targetId) {
            // Target selected in 3+ player game -> Fire random move
            const moves = (typeof MovesetsData !== 'undefined') ? (MovesetsData[attackerPokemon.fullName] || MovesetsData[attackerPokemon.fullName.split(' ')[0]]) : null;
            const moveList = moves || Object.keys(MovesData);
            const randomMoveName = moveList[Math.floor(Math.random() * moveList.length)];
            const moveData = MovesData[randomMoveName];

            if (moveData && nameSel && typeSel && powerInput) {
                nameSel.value = randomMoveName;
                typeSel.value = moveData.type;
                powerInput.value = moveData.power || 50;
                this._notify(`Timeout: ${attackerPokemon.fullName} acted randomly!`, 'action');
                this.handleAttack(moveData.category || 'physical');
            }
        } else {
            // 2 Players OR No target in 3+ players -> Attack self with Struggle
            if (nameSel && typeSel && powerInput) {
                const targetSel = document.getElementById('attack-target-select');
                if (targetSel) {
                    // Set target to self
                    if (targetSel.dataset) targetSel.dataset.value = attackerId;
                    targetSel.value = attackerId;
                }

                nameSel.value = "Struggle";
                typeSel.value = "Normal";
                powerInput.value = 50;

                this._notify(`Timeout: ${attackerPokemon.fullName} hit itself in confusion!`, 'damage');
                this.handleAttack('physical');
            }
        }
    }

    handleQuit() {
        if (!confirm('Are you sure you want to quit the current battle?')) return;

        this.audio.play('click');
        this.timer.reset();

        // Hide arena, show lobby
        const arena = document.getElementById('arena-view');
        const lobby = document.getElementById('lobby-view');
        if (arena) arena.classList.add('hidden');
        if (lobby) lobby.classList.remove('hidden');

        // If in multiplayer, signal a disconnect or leave
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.disconnect();
        }

        this.log.add('Trainer quit the battle.', 'system');
        this._announce('Quitted Battle');
    }

    updateAttackPreview() {
        const typeSel = document.getElementById('move-type-select');
        const targetSel = document.getElementById('attack-target-select');
        const display = document.getElementById('type-effectiveness-display');
        if (!display) return;

        const moveType = typeSel?.value;
        const targetId = targetSel?.value;
        if (!moveType || !targetId) { display.textContent = '--'; return; }

        const player = this.gs.players.find(p => p.id === targetId);
        const pokemon = player?.getActivePokemon();
        if (!pokemon) { display.textContent = '--'; return; }

        const mult = this.engine.getTypeEffectiveness(moveType, pokemon.types);
        let label = `x${mult}`;
        if (mult >= 2) label += ' (Super effective!)';
        if (mult < 1 && mult > 0) label += ' (Not very effective...)';
        if (mult === 0) label += ' (No effect!)';
        display.textContent = label;
    }

    // ── Status & stats ────────────────────────────────────────────────────

    toggleStatus(event, remoteData = null) {
        this.audio.play('status');
        let status, targetId;

        if (remoteData) {
            status = remoteData.status;
            targetId = remoteData.playerId;
        } else {
            status = event.target.closest('button')?.dataset.status;
            const rawVal = document.getElementById('status-target-select')?.dataset?.value || document.getElementById('status-target-select')?.value;
            targetId = rawVal && rawVal.includes('|') ? rawVal.split('|')[0] : rawVal;
        }
        if (!status || !targetId) return;

        const numericId = parseInt(targetId);
        const player = this.gs.players.find(p => p.id === targetId || p.id === numericId);
        const pokemon = player?.getActivePokemon();
        if (!pokemon) return;

        this.history.snapshot(this.gs);
        const wasActive = pokemon.hasStatus(status);
        if (wasActive) {
            pokemon.removeStatus(status);
            this._notify(`${pokemon.fullName}'s ${status} was cured.`, 'status');
        } else {
            const applied = pokemon.applyStatus(status);
            if (applied === false) {
                this._notify(`${pokemon.fullName} is immune to ${status}!`, 'action');
            } else {
                this._notify(`${pokemon.fullName} was afflicted with ${status}.`, 'status');
            }
        }
        this.renderer.renderAll();

        // Autosave Local State
        this.saveLocalState();

        // Sync Action
        if (!remoteData && this.multiplayer && this.multiplayer.mode === 'playing') {
            const slot = player.team.indexOf(pokemon);
            this.multiplayer.sendAction('status_toggle', { playerId: targetId, slotId: slot, status, wasActive });
        }
    }

    handleStatUpdate(remoteData = null) {
        let targetId, statName, value, modType;
        if (remoteData) {
            targetId = remoteData.targetId;
            statName = remoteData.statName;
            value = remoteData.value;
            modType = remoteData.modType;
        } else {
            const statusTargetSel = document.getElementById('status-target-select');
            const statSel = document.getElementById('stat-select');
            const statValInput = document.getElementById('stat-value-input');
            const modTypeSel = document.getElementById('stat-mod-type');

            const rawVal = statusTargetSel?.value;
            targetId = rawVal && rawVal.includes('|') ? rawVal.split('|')[0] : rawVal;
            statName = statSel?.value;
            value = parseInt(statValInput?.value);
            modType = modTypeSel?.value;
        }

        if (!targetId || !statName || isNaN(value)) {
            if (!remoteData) this._announce('Please select a target, stat, and value.', true);
            return;
        }
        const numericId = parseInt(targetId);
        const player = this.gs.players.find(p => p.id === targetId || p.id === numericId);
        const pokemon = player?.getActivePokemon();
        if (!pokemon) return;

        this.history.snapshot(this.gs);

        if (statName === 'hp') {
            // DRY: delegate to _applyHPChange for unified HP handling.
            const currentModded = applyModification(
                pokemon.currentHP, pokemon.maxHp, modType, value, pokemon.maxHp
            );
            this._applyHPChange(pokemon, targetId, currentModded, 'stat update');
        } else {
            const change = pokemon.modifyStat(statName, modType, value);
            const final = pokemon.getEffectiveStat(statName);
            if (change > 0) {
                this._notify(`${pokemon.fullName}'s ${statName.toUpperCase()} rose! (→ ${final})`, 'heal');
                this._animateSprite(targetId, 'heal', () => this.renderer.renderAll());
            } else if (change < 0) {
                this._notify(`${pokemon.fullName}'s ${statName.toUpperCase()} fell! (→ ${final})`, 'damage');
                this._animateSprite(targetId, 'damage', () => this.renderer.renderAll());
            } else {
                this.renderer.renderAll();
            }
            this.audio.play('confirm');

            // Autosave Local State
            this.saveLocalState();

            // Sync Action
            if (!remoteData && this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendAction('stat_update', { targetId, statName, modType, value });
            }
        }
    }

    // ── HP Edit Modal ─────────────────────────────────────────────────────

    editHP(playerId) {
        const player = this.gs.players.find(p => p.id === playerId);
        const pokemon = player?.getActivePokemon();
        if (!pokemon) return;

        this.gs.currentHPEdit = { playerId, pokemon };

        document.getElementById('hp-edit-title').textContent = `Edit ${pokemon.fullName}'s HP`;
        document.getElementById('hp-current-display').textContent = `${pokemon.currentHP} / ${pokemon.maxHp}`;
        const input = document.getElementById('hp-new-value');
        input.value = pokemon.currentHP;
        input.max = pokemon.maxHp;

        this.modals.open('hpEdit');
        this.audio.play('click');
        setTimeout(() => { input.focus(); input.select(); }, 100);
    }

    confirmHPEdit() {
        const { playerId, pokemon } = this.gs.currentHPEdit || {};
        if (!pokemon) return;
        const newHP = parseInt(document.getElementById('hp-new-value')?.value);
        if (isNaN(newHP)) { this._announce('Please enter a valid number!', true); this.audio.play('error'); return; }
        if (newHP < 0 || newHP > pokemon.maxHp) {
            this._announce(`HP must be between 0 and ${pokemon.maxHp}!`, true);
            this.audio.play('error');
            return;
        }
        this.history.snapshot(this.gs);
        this.modals.close('hpEdit');
        this.audio.play('confirm');
        // DRY: _applyHPChange handles logging, animating, and rendering.
        this._applyHPChange(pokemon, playerId, newHP, 'manual edit');
    }

    // ── Team Management Modal ─────────────────────────────────────────────

    async openTeamManager(playerId) {
        await this.ensureDatabaseLoaded();
        this.audio.play('click');
        this.gs.currentEditing.playerId = playerId;
        const player = this.gs.players.find(p => p.id === playerId);
        if (!player) return;
        document.getElementById('team-modal-title').textContent = `Manage ${escapeHTML(player.name)}'s Team`;
        this._renderTeamEditorGrid();
        document.getElementById('pokemon-editor-form')?.classList.add('hidden');
        this.modals.open('team');
    }

    _renderTeamEditorGrid() {
        const player = this.gs.players.find(p => p.id === this.gs.currentEditing.playerId);
        if (!player) return;
        const container = document.getElementById('team-editor-grid');
        if (!container) return;
        container.innerHTML = '';

        for (let i = 0; i < Math.max(6, player.team.length); i++) {
            const pokemon = player.team[i];
            const slot = document.createElement('div');
            slot.className = 'bg-transparent p-2 text-center cursor-pointer transition-all hover:scale-110 relative overflow-visible h-full flex flex-col items-center justify-between min-h-[120px] border border-transparent hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]';
            slot.dataset.slotId = i;

            if (pokemon) {
                slot.innerHTML = `
                    ${player.activePokemonIndex === i
                        ? '<div class="absolute top-1 left-1 text-yellow-400 z-10 animate-pulse"><i data-lucide="star" class="w-4 h-4 fill-current"></i></div>'
                        : ''}
                    <div class="sprite-container flex-grow flex items-center justify-center p-2">
                        <img src="${pokemon.sprite}" alt="${escapeHTML(pokemon.fullName)}"
                             onerror="if(!this.dataset.tried){this.dataset.tried=1;this.src=this.src.replace('/ani/','/gen5/').replace('.gif','.png');}else if(this.dataset.tried=='1'){this.dataset.tried=2;this.src=this.src.replace('/gen5/','/dex/');}"
                             class="h-16 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    </div>
                    <div class="name-tag w-full bg-black/40 py-1 px-1 mb-1">
                        <p class="font-bold text-[10px] uppercase truncate text-white">${escapeHTML(pokemon.fullName)}</p>
                    </div>
                    <div class="action-buttons flex justify-center gap-1 w-full mt-auto">
                        <button class="edit-pokemon-btn flex-1 bg-yellow-600 hover:bg-yellow-700 p-1 flex justify-center items-center h-7" title="Edit">
                            <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                        </button>
                        <button class="reshuffle-pokemon-btn flex-1 bg-blue-600 hover:bg-blue-700 p-1 flex justify-center items-center h-7" title="Reshuffle Moves/Ability">
                            <i data-lucide="shuffle" class="w-3.5 h-3.5"></i>
                        </button>
                        <button class="remove-pokemon-btn flex-1 bg-red-600 hover:bg-red-700 p-1 flex justify-center items-center h-7" title="Remove">
                            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                        </button>
                    </div>`;
            } else {
                slot.classList.add('flex', 'items-center', 'justify-center', 'border-2', 'border-dashed', 'border-slate-600');
                slot.innerHTML = `<button class="add-pokemon-btn text-slate-400 hover:text-white flex flex-col items-center gap-1">
                    <i data-lucide="plus-circle" class="w-8 h-8"></i>
                    <span class="text-[9px] uppercase font-bold">Add</span>
                </button>`;
            }
            container.appendChild(slot);
        }
        lucide.createIcons();

        // Attach slot event listeners with improved delegation
        container.querySelectorAll('div[data-slot-id]').forEach(slot => {
            slot.addEventListener('click', e => {
                const btn = e.target.closest('button');
                const slotId = parseInt(slot.dataset.slotId);

                if (btn?.classList.contains('edit-pokemon-btn')) {
                    this.audio.play('click');
                    this._openPokemonEditor(slotId);
                } else if (btn?.classList.contains('reshuffle-pokemon-btn')) {
                    this.audio.play('confirm');
                    this._reshufflePokemonSlot(slotId);
                } else if (btn?.classList.contains('remove-pokemon-btn')) {
                    this.audio.play('click');
                    this._removePokemonSlot(slotId);
                } else if (btn?.classList.contains('add-pokemon-btn')) {
                    this.audio.play('click');
                    this._openPokemonEditor(slotId);
                } else if (player.team[slotId]) {
                    // Clicked the slot itself - switch active
                    this.audio.play('click');
                    player.activePokemonIndex = slotId;
                    this._renderTeamEditorGrid();
                }
            });
        });
    }

    _openPokemonEditor(slotId) {
        this.gs.currentEditing.slotId = slotId;
        const player = this.gs.players.find(p => p.id === this.gs.currentEditing.playerId);
        const pokemon = player?.team[slotId];
        const form = document.getElementById('pokemon-editor-form');
        if (!form) return;

        // Build ability selector HTML for the current pokemon
        const abilityOptionsHTML = this._buildAbilityOptionsHTML(pokemon?.fullName);

        form.innerHTML = `
            <h4 class="text-lg text-yellow-300 mb-3">${pokemon ? 'Edit' : 'Add'} Pokémon (Slot ${slotId + 1})</h4>
            <div class="mb-2">
                <label for="pokedex-search" class="text-xs text-slate-300 uppercase tracking-wider block mb-1">Search Pokémon</label>
                <input type="text" id="pokedex-search"
                       class="w-full bg-slate-900 border border-slate-600 p-2 mt-1 text-xs focus:border-yellow-400 outline-none text-white placeholder:text-slate-500"
                       onclick="this.select()"
                       placeholder="Search Pokémon..."
                       value="${pokemon ? escapeHTML(pokemon.fullName) : ''}">
                <div id="pokedex-search-results" style="display:none;"></div>
                <div id="pokedex-grid-picker" class="mt-2 hidden" style="
                    display: none;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 6px;
                    max-height: 380px;
                    overflow-y: auto;
                    background: transparent;
                    border: 1px solid transparent;
                    padding: 8px;
                    scrollbar-width: thin;
                    scrollbar-color: #facc15 transparent;
                "></div>
            </div>
            <div class="mb-2">
                <label for="ability-select" class="text-xs text-slate-300 uppercase tracking-wider block mb-1">Ability</label>
                <select id="ability-select" class="w-full bg-slate-900 border border-slate-600 p-2 mt-1 text-xs text-white focus:border-yellow-400 outline-none">
                    <option value="">-- Select Ability --</option>
                    ${abilityOptionsHTML}
                </select>
                <div id="ability-description" class="text-xs text-slate-400 mt-1 italic"></div>
            </div>
            <div class="flex gap-2 mt-4">
                <button id="confirm-pokemon-edit" class="bg-green-600 hover:bg-green-700 p-2 text-xs w-full font-bold uppercase tracking-wider border border-green-400">Confirm</button>
                ${pokemon ? `<button id="reshuffle-pokemon-edit" class="bg-blue-600 hover:bg-blue-700 p-2 text-xs w-full font-bold uppercase tracking-wider border border-blue-400">Reshuffle</button>` : ''}
                <button id="cancel-pokemon-edit"  class="bg-gray-600  hover:bg-gray-700  p-2 text-xs w-full font-bold uppercase tracking-wider border border-gray-500">Cancel</button>
            </div>`;
        form.classList.remove('hidden');

        const searchInput = document.getElementById('pokedex-search');
        const searchResults = document.getElementById('pokedex-search-results');
        const gridPicker = document.getElementById('pokedex-grid-picker');
        const abilitySelect = document.getElementById('ability-select');
        const abilityDesc = document.getElementById('ability-description');

        const _hideGrid = () => {
            gridPicker.style.display = 'none';
            gridPicker.innerHTML = '';
        };

        const _showGrid = (names) => {
            gridPicker.innerHTML = '';
            if (names.length === 0) { _hideGrid(); return; }
            gridPicker.style.display = 'grid';
            const fragment = document.createDocumentFragment();
            names.forEach(name => {
                const item = this.db.find(name);
                if (!item) return;
                const node = item.foundNode;
                const card = document.createElement('button');
                card.type = 'button';
                card.title = name;
                card.style.cssText = `
                    background: transparent;
                    border: 1px solid transparent;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-end;
                    padding: 4px 2px 5px;
                    height: 76px;
                    transition: transform 0.2s, drop-shadow 0.2s;
                    position: relative;
                    overflow: visible;
                `;
                card.innerHTML = `
                    <img src="${node.sprite || ''}" alt="${name}"
                         onerror="const name='${name.toLowerCase().replace(/[^a-z0-9]/g, '')}'; if(!this.dataset.tried){this.dataset.tried=1; if(this.src.includes('.gif')){this.src=this.src.replace('/ani/','/gen5/').replace('.gif','.png');}else{this.dataset.tried=2;this.src='https://play.pokemonshowdown.com/sprites/dex/'+name+'.png';}}else if(this.dataset.tried=='1'){this.dataset.tried=2;this.src='https://play.pokemonshowdown.com/sprites/dex/'+name+'.png';}"
                         style="width:46px;height:46px;object-fit:contain;image-rendering:pixelated;
                                filter:drop-shadow(0 0 3px rgba(250,204,21,0));transition:filter 0.15s;"
                         loading="lazy">
                    <span style="font-size:8px;color:#cbd5e1;text-align:center;width:100%;
                                  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
                                  line-height:1.1;margin-top:3px;font-family:monospace;">${name}</span>
                `;
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'scale(1.15)';
                    card.querySelector('img').style.filter = 'drop-shadow(0 0 10px rgba(250,204,21,0.8))';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'scale(1)';
                    card.querySelector('img').style.filter = 'drop-shadow(0 0 3px rgba(250,204,21,0))';
                });
                card.onclick = () => {
                    searchInput.value = name;
                    _hideGrid();
                    if (abilitySelect) {
                        abilitySelect.innerHTML =
                            '<option value="">-- Select Ability --</option>' +
                            this._buildAbilityOptionsHTML(name);
                    }
                    if (abilityDesc) abilityDesc.textContent = '';
                };
                fragment.appendChild(card);
            });
            gridPicker.appendChild(fragment);
        };

        // Trie-powered O(k) live search.
        const _refreshGrid = () => {
            const q = searchInput.value.trim();
            if (q.length === 0) {
                _showGrid(this.db.allNames);
                return;
            }
            if (q.length < 2) { _hideGrid(); return; }
            const names = this.db.search(q, 40);
            _showGrid(names);
        };

        searchInput.addEventListener('input', _refreshGrid);
        searchInput.addEventListener('focus', _refreshGrid);
        _refreshGrid(); // Show initial grid

        // Hide grid when clicking outside
        document.addEventListener('click', function _outsideClick(e) {
            if (!gridPicker.contains(e.target) && e.target !== searchInput) {
                _hideGrid();
                document.removeEventListener('click', _outsideClick);
            }
        });

        // Ability select — show description
        if (abilitySelect) {
            abilitySelect.addEventListener('change', () => {
                const chosen = abilitySelect.value;
                if (!chosen || typeof AbilitiesData === 'undefined') {
                    if (abilityDesc) abilityDesc.textContent = '';
                    return;
                }
                const info = AbilitiesData[chosen];
                if (abilityDesc) {
                    abilityDesc.textContent = info
                        ? `${info.description} (Gen ${info.generation})`
                        : '';
                }
            });
        }

        document.getElementById('confirm-pokemon-edit').addEventListener('click', () => {
            this.audio.play('confirm');
            this._confirmPokemonEdit();
        });
        const reshuffleBtn = document.getElementById('reshuffle-pokemon-edit');
        if (reshuffleBtn) {
            reshuffleBtn.addEventListener('click', () => {
                this.audio.play('confirm');
                if (pokemon) {
                    pokemon.shuffleMoves();
                    pokemon.shuffleAbility();
                    // Update form values
                    const abilitySelect = document.getElementById('ability-select');
                    if (abilitySelect) {
                        abilitySelect.value = pokemon.ability || '';
                        abilitySelect.dispatchEvent(new Event('change'));
                    }
                    this._notify(`Shuffled ${pokemon.fullName}'s moves and ability.`, 'status');
                }
            });
        }
        document.getElementById('cancel-pokemon-edit').addEventListener('click', () => {
            this.audio.play('click');
            form.classList.add('hidden');
        });
    }

    /**
     * Build <option> HTML for the ability selector for a given Pokémon name.
     * Reads from window.PokemonAbilitiesMap (pre-built in abilities_map.js).
     *
     * PokemonAbilitiesMap entries are arrays of {name: string, hidden: boolean}.
     * Falls back to trying the base name without forme suffixes.
     *
     * @param {string|null} pokemonName
     * @returns {string} HTML string of <option> elements
     */
    _buildAbilityOptionsHTML(pokemonName) {
        if (typeof window.PokemonAbilitiesMap === 'undefined') return '';

        // Try the exact name first, then shrink forme suffixes one word at a time
        let abilities = null;
        if (pokemonName) {
            const normalized = pokemonName.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
            abilities = window.PokemonAbilitiesMap[normalized] || window.PokemonAbilitiesMap[pokemonName];
            if (!abilities) {
                // Try removing trailing forme word (e.g. "Charizard Mega X" → "Charizard Mega" → "Charizard")
                const parts = normalized.split(' ');
                for (let i = parts.length - 1; i >= 1 && !abilities; i--) {
                    abilities = window.PokemonAbilitiesMap[parts.slice(0, i).join(' ')];
                }
            }
        }
        if (!abilities || !abilities.length) return '';

        return abilities.map(entry => {
            // Support both old string format and new {name, hidden} object format
            const abilityName = typeof entry === 'string' ? entry : entry.name;
            const isHidden = typeof entry === 'object' && entry.hidden;
            const label = isHidden ? `[H] ${abilityName}` : abilityName;
            return `<option value="${escapeHTML(abilityName)}" ${isHidden ? 'class="ability-hidden"' : ''}>${escapeHTML(label)}</option>`;
        }).join('');
    }

    _confirmPokemonEdit() {
        const player = this.gs.players.find(p => p.id === this.gs.currentEditing.playerId);
        const slotId = this.gs.currentEditing.slotId;
        if (!player || slotId === null) return;

        const name = document.getElementById('pokedex-search')?.value;
        const result = this.db.find(name);
        if (!result) {
            this._announce(`Invalid Pokémon: "${escapeHTML(name)}"`, true);
            this.audio.play('error');
            return;
        }

        const existing = player.team[slotId];
        let pokemon;
        if (existing && existing.fullName === name) {
            pokemon = existing;
        } else {
            pokemon = new Pokemon(result.foundNode, result.baseNode);
        }

        const abilitySelect = document.getElementById('ability-select');
        if (abilitySelect && abilitySelect.value) {
            pokemon.ability = abilitySelect.value;
        }

        player.setSlot(slotId, pokemon);
        if (player.team.filter(p => p).length === 1) player.activePokemonIndex = slotId;
        this._renderTeamEditorGrid();
        this.renderer.renderAll();
        document.getElementById('pokemon-editor-form')?.classList.add('hidden');

        // Autosave Local State
        this.saveLocalState();

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    _removePokemonSlot(slotId) {
        const player = this.gs.players.find(p => p.id === this.gs.currentEditing.playerId);
        if (player) {
            player.clearSlot(slotId);
            this._renderTeamEditorGrid();

            // Autosave Local State
            this.saveLocalState();

            // Sync game state in multiplayer
            if (this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendGameState();
            }
        }
    }

    _reshufflePokemonSlot(slotId) {
        const player = this.gs.players.find(p => p.id === this.gs.currentEditing.playerId);
        const pokemon = player?.team[slotId];
        if (pokemon) {
            this.history.snapshot(this.gs);
            pokemon.shuffleMoves();
            pokemon.shuffleAbility();
            this._notify(`Shuffled ${pokemon.fullName}'s moves and ability.`, 'status');
            this._renderTeamEditorGrid();
            this.renderer.renderAll();

            // Autosave Local State
            this.saveLocalState();

            // Sync game state in multiplayer
            if (this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendGameState();
            }
        }
    }

    // ── Team icon click (main arena view) ────────────────────────────────

    handleTeamIconClick(playerId, slotId) {
        this.audio.play('click');
        const player = this.gs.players.find(p => p.id === playerId);
        if (!player) return;
        const target = player.team[slotId];
        if (target && !target.isFainted()) {
            this._switchActivePokemon(playerId, slotId);
        } else if (target && target.isFainted()) {
            this._announce('Cannot switch to a fainted Pokémon!', true);
        } else {
            this.openTeamManager(playerId);
        }
    }

    _switchActivePokemon(playerId, slotId, fromModal = false, remote = false) {
        this.battleController._switchActivePokemon(playerId, slotId, fromModal, remote);
    }

    // ── Confirm Modal ─────────────────────────────────────────────────────

    openConfirmModal(title, message, onConfirm) {
        const titleEl = document.getElementById('confirm-modal-title');
        const messageEl = document.getElementById('confirm-modal-message');
        if (titleEl) titleEl.textContent = title;
        if (messageEl) messageEl.innerHTML = escapeHTML(message);

        const yesBtn = document.getElementById('confirm-modal-yes');
        const noBtn = document.getElementById('confirm-modal-no');

        if (yesBtn) {
            yesBtn.onclick = () => {
                this.audio.play('confirm');
                this.modals.close('confirm');
                onConfirm();
            };
        }

        if (noBtn) {
            noBtn.onclick = () => {
                this.audio.play('click');
                this.modals.close('confirm');
            };
        }

        this.modals.open('confirm');
        this.audio.play('click');
    }

    // ── Evolution & form change ───────────────────────────────────────────

    _resolveEvolutions(pokemon) {
        const evoTargets = new Map(); // Name -> node
        const root = pokemon.baseData;
        if (!root) return [];

        const addEvoBranch = (evo) => {
            const name = typeof evo === 'string' ? evo : (evo.Name || evo.name);
            if (!name) return;

            // 1. Find the target species in the database
            const targetEntry = this.db.find(name);
            if (!targetEntry) return;

            // 2. Add the base target species entry
            const baseNode = targetEntry.foundNode;
            if (!baseNode.Name) baseNode.Name = name;
            evoTargets.set(baseNode.Name, baseNode);

            // 3. Expansion: Include all forms of this target species as direct evolution options
            // This handles cases like Exeggcute -> Alolan Exeggutor or Pichu -> Pikachu (all caps)
            const targetForms = targetEntry.baseNode?.forms || {};
            for (const f of Object.values(targetForms)) {
                if (f && (f.Name || f.name)) {
                    const fName = f.Name || f.name;
                    // For regional variants, prefer the top-level node with full stats
                    const fullNode = this.db.find(fName)?.foundNode || f;
                    if (!fullNode.Name) fullNode.Name = fName;
                    evoTargets.set(fullNode.Name, fullNode);
                }
            }
        };

        // Aggregation Step: Look at ALL forms of the current species to find every possible evolution path
        // Root Species evolutions
        if (root.evolutions) root.evolutions.forEach(addEvoBranch);

        // Form-specific evolutions (handles regional branches like Perrserker or Alolan Persian)
        const forms = root.forms || {};
        for (const f of Object.values(forms)) {
            const fName = f.Name || f.name;
            const fullFormNode = this.db.find(fName)?.foundNode || f;
            if (fullFormNode.evolutions) fullFormNode.evolutions.forEach(addEvoBranch);
        }

        return Array.from(evoTargets.values());
    }

    async handleEvolve() {
        await this.ensureDatabaseLoaded();
        const val = document.getElementById('status-target-select')?.dataset?.value || document.getElementById('status-target-select')?.value;
        if (!val) { this._announce('Select a Pokémon to evolve.', true); return; }
        const [pid, sid] = val.split('|');
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon) return;
        // Resolve evolutions from the CURRENT FORM, falling back to top-level entry.
        // This ensures Galarian Meowth → Perrserker and Galarian Ponyta → Galarian Rapidash.
        const evos = this._resolveEvolutions(pokemon);
        if (evos.length === 0) { this._announce(`${pokemon.fullName} cannot evolve further.`, true); return; }
        evos.length === 1
            ? this._confirmEvolution(evos[0].Name || evos[0].name)
            : this._openEvolutionChoiceModal(evos);
    }

    _openEvolutionChoiceModal(evolutions) {
        const val = document.getElementById('status-target-select')?.dataset?.value || document.getElementById('status-target-select')?.value;
        const [pid, sid] = val.split('|');
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        document.getElementById('selection-modal-title').textContent = `Evolve ${pokemon?.fullName} into...`;
        this._populateSelectionGrid(evolutions, name => this._confirmEvolution(name));
        this.modals.open('selection');
    }

    _confirmEvolution(evolutionName, playerId = null, slotId = null, remote = false) {
        let pid = playerId;
        let sid = slotId;
        if (pid === null || sid === null) {
            const val = document.getElementById('status-target-select')?.dataset?.value || document.getElementById('status-target-select')?.value;
            if (!val) { this._announce(`Error evolving to ${evolutionName}.`, true); return; }
            [pid, sid] = val.split('|');
        }
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!player || !pokemon) { this._announce(`Error evolving to ${evolutionName}.`, true); return; }

        this.history.snapshot(this.gs);
        const oldName = pokemon.fullName;
        this._animateSprite(pid, 'evolve', () => {
            const result = this.db.find(evolutionName);
            if (!result) return;
            player.team[sid] = new Pokemon(result.foundNode, result.baseNode);
            this.modals.close('selection');
            this._notify(`${oldName} evolved into ${evolutionName}!`, 'action');
            this.renderer.renderAll();
            this.audio.playCry(player.team[sid]);

            // Autosave Local State
            this.saveLocalState();

            // Sync action in multiplayer
            if (!remote && this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendAction('evolve', { playerId: pid, slotId: sid, evolutionName });
            }
        });
    }

    async handleDevolve() {
        await this.ensureDatabaseLoaded();
        const val = document.getElementById('status-target-select')?.dataset?.value || document.getElementById('status-target-select')?.value;
        if (!val) { this._announce('Select a Pokémon to devolve.', true); return; }
        const [pid, sid] = val.split('|');
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon) return;

        const parents = this.db.getPreEvolutions(pokemon.fullName);
        if (parents.length === 0) { this._announce(`${pokemon.fullName} has no pre-evolution.`, true); return; }

        parents.length === 1
            ? this._confirmDevolution(parents[0])
            : this._openDevolutionChoiceModal(parents);
    }

    _openDevolutionChoiceModal(parents) {
        const val = document.getElementById('status-target-select')?.dataset?.value || document.getElementById('status-target-select')?.value;
        const [pid, sid] = val.split('|');
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        document.getElementById('selection-modal-title').textContent = `Devolve ${pokemon?.fullName} into...`;

        // Wrap parent names into nodes for the selection grid
        const parentNodes = parents.map(name => {
            const res = this.db.find(name);
            return res ? res.foundNode : { Name: name };
        });

        this._populateSelectionGrid(parentNodes, name => this._confirmDevolution(name));
        this.modals.open('selection');
    }

    _confirmDevolution(parentName, playerId = null, slotId = null, remote = false) {
        let pid = playerId;
        let sid = slotId;
        if (pid === null || sid === null) {
            const val = document.getElementById('status-target-select')?.dataset?.value || document.getElementById('status-target-select')?.value;
            if (!val) { this._announce(`Error devolving to ${parentName}.`, true); return; }
            [pid, sid] = val.split('|');
        }
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!player || !pokemon) { this._announce(`Error devolving to ${parentName}.`, true); return; }

        this.history.snapshot(this.gs);
        const oldName = pokemon.fullName;

        // Reuse evolve animation for devolution
        this._animateSprite(pid, 'evolve', () => {
            const result = this.db.find(parentName);
            if (!result) return;
            player.team[sid] = new Pokemon(result.foundNode, result.baseNode);
            this.modals.close('selection');
            this._notify(`${oldName} devolved into ${parentName}!`, 'action');
            this.renderer.renderAll();
            this.audio.playCry(player.team[sid]);

            // Autosave Local State
            this.saveLocalState();

            // Sync action in multiplayer
            if (!remote && this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendAction('devolve', { playerId: pid, slotId: sid, parentName });
            }
        });
    }

    async openFormChangeModal() {
        await this.ensureDatabaseLoaded();
        const val = document.getElementById('status-target-select')?.dataset?.value || document.getElementById('status-target-select')?.value;
        if (!val) return;
        const [pid, sid] = val.split('|');
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon?.baseData) return;

        const forms = [pokemon.baseData, ...Object.values(pokemon.baseData.forms || {})]
            .filter(f => (f?.Name || f?.name) && (f.Name || f.name) !== pokemon.fullName);

        if (forms.length === 0) {
            this._announce(`${pokemon.fullName} has no other forms.`, true);
            return;
        }
        document.getElementById('selection-modal-title').textContent = `Change ${pokemon.fullName}'s Form`;
        this._populateSelectionGrid(forms, name => this._confirmFormChange(name));
        this.modals.open('selection');
    }

    _confirmFormChange(formName, playerId = null, slotId = null, remote = false) {
        let pid = playerId;
        let sid = slotId;
        if (pid === null || sid === null) {
            const val = document.getElementById('status-target-select')?.dataset?.value || document.getElementById('status-target-select')?.value;
            if (!val) return;
            [pid, sid] = val.split('|');
        }
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon) return;

        this.history.snapshot(this.gs);
        const oldName = pokemon.fullName;
        this._animateSprite(pid, 'evolve', () => {
            const result = this.db.find(formName);
            if (!result) return;
            player.team[sid] = new Pokemon(result.foundNode, result.baseNode);
            this.modals.close('selection');
            this._notify(`${oldName} changed form to ${formName}!`, 'action');
            this.renderer.renderAll();
            this.audio.playCry(player.team[sid]);

            // Autosave Local State
            this.saveLocalState();

            // Sync action in multiplayer
            if (!remote && this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendAction('form_change', { playerId: pid, slotId: sid, formName });
            }
        });
    }

    /** DRY: Builds the generic selection grid used for both evolutions and forms. */
    _populateSelectionGrid(dataItems, onSelect) {
        const grid = document.getElementById('selection-grid');
        if (!grid) return;
        grid.innerHTML = '';
        dataItems.forEach(item => {
            const itemName = item?.Name || item?.name;
            if (!itemName) return;
            const div = document.createElement('div');
            div.className = 'bg-transparent p-2 text-center cursor-pointer transition-all hover:scale-115 group';
            div.innerHTML = `<img src="${item.sprite || ''}" alt="${escapeHTML(itemName)}"
                             onerror="const name='${itemName.toLowerCase().replace(/[^a-z0-9]/g, '')}'; if(!this.dataset.tried){this.dataset.tried=1; if(this.src.includes('.gif')){this.src=this.src.replace('/ani/','/gen5/').replace('.gif','.png');}else{this.dataset.tried=2;this.src='https://play.pokemonshowdown.com/sprites/dex/'+name+'.png';}}else if(this.dataset.tried=='1'){this.dataset.tried=2;this.src='https://play.pokemonshowdown.com/sprites/dex/'+name+'.png';}"
                             class="mx-auto h-16 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]">
                             <p class="font-bold text-xs mt-1 transition-colors group-hover:text-yellow-400">${escapeHTML(itemName)}</p>`;
            div.onclick = () => onSelect(itemName);
            grid.appendChild(div);
        });
    }

    // ── Revive ────────────────────────────────────────────────────────────

    handleRevive() {
        const val = document.getElementById('status-target-select')?.dataset?.value || document.getElementById('status-target-select')?.value;
        if (!val) { this._announce('Select a fainted Pokémon to revive.', true); this.audio.play('error'); return; }
        const [pid, sid] = val.split('|');
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon?.isFainted()) { this._announce('This Pokémon is not fainted.', true); return; }

        this.history.snapshot(this.gs);
        pokemon.shuffleMoves();
        const revivedHP = Math.floor(pokemon.maxHp / 2);
        this._applyHPChange(pokemon, pid, revivedHP, 'revive');
        this._announce(`${pokemon.fullName} has been revived!`);

        // Autosave Local State
        this.saveLocalState();

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    openTradeModal() {
        const val = document.getElementById('status-target-select')?.dataset?.value || document.getElementById('status-target-select')?.value;
        if (!val) { this._announce('Select a Pokémon to trade.', true); this.audio.play('error'); return; }
        const [pid, sid] = val.split('|');
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon) return;

        this.audio.play('click');
        const titleEl = document.getElementById('trade-modal-title');
        if (titleEl) {
            titleEl.textContent = `Trade ${pokemon.fullName}`;
        }
        this.modals.open('trade');
    }

    async confirmTrade(selectedTiers) {
        const val = document.getElementById('status-target-select')?.dataset?.value || document.getElementById('status-target-select')?.value;
        if (!val) return;
        const [pid, sid] = val.split('|');
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon) return;

        this.history.snapshot(this.gs);
        await this.ensureDatabaseLoaded();

        const tiersArray = Array.isArray(selectedTiers) ? selectedTiers : [selectedTiers];
        const flatPool = this.multiplayer._getFlattenedPool();
        const pool = flatPool.filter(p => tiersArray.includes(p._computedTier));

        if (pool.length === 0) {
            this._announce(`No Pokémon found in selected tiers!`, true);
            this.audio.play('error');
            return;
        }

        const rolled = pool[Math.floor(Math.random() * pool.length)];
        const rolledName = rolled.Name || rolled.name;

        const result = this.db.find(rolledName);
        if (!result) {
            this._announce(`Database error finding rolled Pokémon: ${rolledName}`, true);
            this.audio.play('error');
            return;
        }

        const newPoke = new Pokemon(result.foundNode, result.baseNode);
        
        player.setSlot(parseInt(sid), newPoke);
        this.audio.play('confirm');

        this._notify(`${player.name} traded ${pokemon.fullName} for ${newPoke.fullName}!`, 'system');

        this.renderer.renderAll();

        // Autosave Local State
        this.saveLocalState();

        // Sync Action for Multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendAction('trade_pokemon', { playerId: pid, slotId: parseInt(sid), newPokemonName: newPoke.fullName, oldPokemonName: pokemon.fullName });
            this.multiplayer.sendGameState();
        }
    }

    // ── Weather ───────────────────────────────────────────────────────────

    cycleWeather(remote = false) {
        this.history.snapshot(this.gs);
        const cycle = ['none', 'sandstorm', 'hail'];
        const next = cycle[(cycle.indexOf(this.gs.weather) + 1) % cycle.length];
        const old = this.gs.weather;
        this.gs.weather = next;
        this._notify(`Weather changed from ${old} to ${next}.`, 'action');
        this.renderer.renderAll();
        this.audio.play('click');

        // Autosave Local State
        this.saveLocalState();

        // Sync action in multiplayer
        if (!remote && this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendAction('cycle_weather', { weather: next, old });
        }
    }

    // ── Arena background ──────────────────────────────────────────────────

    _setArena(type) {
        const backgrounds = arenaBackgrounds[type] || arenaBackgrounds['Normal'];
        document.querySelectorAll('.parallax-layer').forEach((layer, i) => {
            if (backgrounds[i]) layer.style.backgroundImage = `url('${backgrounds[i]}')`;
        });
    }

    // ── Sprite animations ─────────────────────────────────────────────────

    _animateSprite(playerId, animationType, callback) {
        const card = document.getElementById(`player-card-${playerId}`);
        const sprite = card?.querySelector('.pokemon-sprite');
        if (!sprite) { callback?.(); return; }

        const allClasses = ['damage-animation', 'heal-animation', 'faint-animation',
            'evolve-animation', 'switch-out-animation', 'switch-in-animation'];
        sprite.classList.remove(...allClasses);
        void sprite.offsetHeight; // Force reflow to restart CSS animation.

        const durations = { damage: 300, heal: 800, faint: 800, evolve: 1000, 'switch-out': 400, 'switch-in': 400 };
        const soundMap = { damage: 'attack', heal: 'heal', faint: 'faint', evolve: 'evolve' };

        sprite.classList.add(`${animationType}-animation`);
        if (soundMap[animationType]) this.audio.play(soundMap[animationType]);

        setTimeout(() => {
            sprite.classList.remove(`${animationType}-animation`);
            callback?.();
        }, durations[animationType] ?? 800);
    }

    _playEntryAnimation(playerId, type) {
        const card = document.getElementById(`player-card-${playerId}`);
        const cont = card?.querySelector('.entry-animation-container');
        if (!cont) return;
        const effect = document.createElement('div');
        effect.className = 'entry-animation-effect';
        const typeClass = `entry-anim-${type.toLowerCase()}`;
        const exists = Array.from(document.styleSheets)
            .flatMap(s => { try { return Array.from(s.cssRules); } catch { return []; } })
            .some(r => r.selectorText === `.${typeClass}`);
        effect.classList.add(exists ? typeClass : 'entry-anim-default');
        cont.appendChild(effect);
        setTimeout(() => effect.remove(), 600);
    }

    // ── Damage number popup ───────────────────────────────────────────────

    _showDamageNumber(playerId, amount, type = 'damage') {
        const card = document.getElementById(`player-card-${playerId}`);
        const sprite = card?.querySelector('.pokemon-sprite');
        if (!card || !sprite) return;

        const el = document.createElement('div');
        el.className = `damage-number ${type}`;
        el.textContent = type === 'heal' ? `+${amount}` : `-${amount}`;

        const sr = sprite.getBoundingClientRect();
        const cr = card.getBoundingClientRect();
        el.style.left = `${sr.left - cr.left + sr.width / 2}px`;
        el.style.top = `${sr.top - cr.top + sr.height / 2}px`;

        card.appendChild(el);
        setTimeout(() => el.parentNode && el.remove(), 1200);
    }

    // ── Announcement banner ───────────────────────────────────────────────

    _announce(text, isError = false) {
        // Mirror original makeAnnouncement() which always played a sound.
        this.audio.play(isError ? 'error' : 'confirm');
        const banner = document.getElementById('announcement-banner');
        const textEl = document.getElementById('announcement-text');
        if (!banner || !textEl) return;
        textEl.textContent = text;
        banner.classList.toggle('border-red-500', isError);
        banner.classList.toggle('border-white', !isError);
        banner.classList.remove('hidden');
        banner.classList.add('announcement-enter');
        setTimeout(() => {
            banner.classList.replace('announcement-enter', 'announcement-exit');
            setTimeout(() => { banner.classList.add('hidden'); banner.classList.remove('announcement-exit'); }, 500);
        }, 2500);
    }

    // ── Prepopulate ───────────────────────────────────────────────────────

    _prepopulate(tiers = null, playerCount = 6, pokemonCount = 6) {
        this.gs.players = []; // Clear current players to avoid duplicates
        this._toggleLoading(true, 'Loading Pokémon teams...');
        const names = ['Ash', 'Misty', 'Brock', 'Gary', 'Jessie', 'James'].slice(0, playerCount);
        let filteredPool = tiers ? this.db._buildFiltered(tiers) : this.db.filteredNames;
        if (!filteredPool || filteredPool.length === 0) {
            console.warn('[DATABASE] Filtered pool empty, falling back to all names.');
            filteredPool = this.db.allNames || [];
        }
        const pool = [...filteredPool].sort(() => 0.5 - Math.random());

        names.forEach((name, i) => {
            const teamNames = pool.splice(0, pokemonCount);
            if (pool.length < pokemonCount) pool.push(...filteredPool);

            const team = teamNames.map(n => {
                const r = this.db.find(n);
                return r ? new Pokemon(r.foundNode, r.baseNode) : null;
            }).filter(Boolean);
            while (team.length < pokemonCount) team.push(null);

            const player = new Player(String(Date.now() + i), name, pokemonCount);
            team.forEach((pk, idx) => player.setSlot(idx, pk));
            this.gs.players.push(player);
        });
        this.renderer.renderAll(); // Ensure UI reflects new players immediately
        setTimeout(() => this._toggleLoading(false), 500);
    }

    // ── Move type dropdown ────────────────────────────────────────────────

    _populateMoveTypeSelector() {
        const sel = document.getElementById('move-type-select');
        if (!sel) return;
        sel.innerHTML = '<option value="">Select Type</option>';
        Object.keys(typeColors).forEach(type => {
            const cap = type.charAt(0).toUpperCase() + type.slice(1);
            sel.add(new Option(cap, cap));
        });
    }

    // ── Move name selector (populated from MovesetsData) ──────────────────

    _populateMoveSelector(pokemon) {
        const sel = document.getElementById('move-name-select');
        if (!sel) return;
        const saved = sel.value;
        sel.innerHTML = '<option value="">-- Select Move --</option>';

        if (typeof MovesData === 'undefined') return;

        let moves = [];
        if (pokemon && typeof pokemon === 'object' && Array.isArray(pokemon.moves)) {
            moves = pokemon.moves;
        } else if (typeof pokemon === 'string') {
            if (typeof MovesetsData !== 'undefined') {
                moves = MovesetsData[pokemon];
                if (!moves) {
                    const baseName = pokemon.split(' ')[0];
                    moves = MovesetsData[baseName];
                }
            }
        }

        const movelist = (moves && moves.length > 0) ? moves : Object.keys(MovesData).sort();

        movelist.forEach(moveName => {
            const md = MovesData[moveName];
            if (!md) return;
            const label = md.power > 0
                ? `${moveName} (${md.type} · ${md.category} · ${md.power})`
                : `${moveName} (${md.type} · ${md.category})`;
            sel.add(new Option(label, moveName));
        });

        if ([...sel.options].some(o => o.value === saved)) {
            sel.value = saved;
        }
    }

    // ── PokemonAbilitiesMap population ────────────────────────────────────

    /**
     * Populates window.PokemonAbilitiesMap (from abilities_map.js) with known
     * ability names sourced from AbilitiesData keys, keyed by Pokémon name.
     * Since pokemon_data.js has no built-in abilities list, we assign a small
     * curated set based on each Pokémon's types so the UI has something useful
     * to show. Real ability lookup still works via AbilitiesData.
     */
    _populateAbilitiesMap() {
        if (typeof window.PokemonAbilitiesMap === 'undefined' ||
            typeof AbilitiesData === 'undefined') return;

        // Map type → canonical abilities that typically appear for that type.
        const typeAbilityHints = {
            Fire: ['Blaze', 'Flash Fire', 'Drought', 'Flame Body'],
            Water: ['Torrent', 'Swift Swim', 'Drizzle', 'Water Absorb'],
            Grass: ['Overgrow', 'Chlorophyll', 'Leaf Guard', 'Grassy Surge'],
            Electric: ['Static', 'Motor Drive', 'Lightning Rod', 'Electric Surge'],
            Psychic: ['Synchronize', 'Trace', 'Magic Guard', 'Telepathy'],
            Normal: ['Intimidate', 'Guts', 'Adaptability', 'Hustle'],
            Flying: ['Keen Eye', 'Big Pecks', 'Gale Wings', 'No Guard'],
            Fighting: ['Guts', 'Iron Fist', 'Moxie', 'Defiant'],
            Ice: ['Ice Body', 'Slush Rush', 'Refrigerate', 'Thick Fat'],
            Dragon: ['Rough Skin', 'Multiscale', 'Mold Breaker', 'Unnerve'],
            Dark: ['Intimidate', 'Pickpocket', 'Unburden', 'Defiant'],
            Steel: ['Clear Body', 'Sturdy', 'Full Metal Body', 'Iron Barbs'],
            Rock: ['Sturdy', 'Sand Stream', 'Rock Head', 'Battle Armor'],
            Ground: ['Sand Rush', 'Sand Force', 'Arena Trap', 'Guts'],
            Bug: ['Compound Eyes', 'Shield Dust', 'Swarm', 'Wonder Skin'],
            Ghost: ['Levitate', 'Cursed Body', 'Frisk', 'No Guard'],
            Poison: ['Poison Point', 'Stench', 'Corrosion', 'Liquid Ooze'],
            Fairy: ['Cute Charm', 'Magic Guard', 'Fairy Aura', 'Pixilate'],
        };

        // Build map for every known Pokémon in the database.
        for (const { foundNode } of this.db._index.values()) {
            const name = foundNode.Name || foundNode.name;
            if (!name) continue;
            const normName = name.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
            if (window.PokemonAbilitiesMap[normName] || window.PokemonAbilitiesMap[name]) continue;
            const types = (foundNode.types || []).flatMap(t => t.split(' '));
            const abilities = new Set();
            types.forEach(t => {
                (typeAbilityHints[t] || []).forEach(a => {
                    if (AbilitiesData[a]) abilities.add(a);
                });
            });
            const mappedAbilities = [...abilities].slice(0, 4);
            window.PokemonAbilitiesMap[normName] = mappedAbilities;
            window.PokemonAbilitiesMap[name] = mappedAbilities;
        }
    }

    // ── Loading overlay ───────────────────────────────────────────────────

    _toggleLoading(show, msg = 'Processing...') {
        let overlay = document.getElementById('operation-loading-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'operation-loading-overlay';
            overlay.className = 'loading-overlay';
            overlay.innerHTML = `<div><div class="loading-spinner"></div>
                                  <div class="loading-text" id="loading-message">${msg}</div></div>`;
            document.body.appendChild(overlay);
        }
        const msgEl = document.getElementById('loading-message');
        if (msgEl) msgEl.textContent = msg;
        overlay.classList.toggle('active', show);
    }

    // ── Event listeners ───────────────────────────────────────────────────

    _setupEventListeners() {
        const gs = this.gs;

        // Attacker select — also repopulates move list
        document.getElementById('attacker-select')?.addEventListener('change', e => {
            gs.activeTurnPlayerId = e.target.value || null;
            this.updateAttackPreview();
            if (gs.activeTurnPlayerId) {
                const p = gs.players.find(p => p.id === gs.activeTurnPlayerId);
                const pk = p?.getActivePokemon();
                if (pk) {
                    this._setArena(pk.types[0]); // first type as primary
                    this._populateMoveSelector(pk);
                }
            } else {
                this._populateMoveSelector(null);
            }
            this.renderer.renderAll();
        });

        // Move name select — auto-fills power and type
        document.getElementById('move-name-select')?.addEventListener('change', e => {
            const moveName = e.target.value;
            if (!moveName) {
                const powerInput = document.getElementById('move-power-input');
                const typeSelect = document.getElementById('move-type-select');
                if (powerInput) powerInput.value = '';
                if (typeSelect) typeSelect.value = '';
                this.updateAttackPreview();
                this.renderer._updateAttackButtonsState();
                return;
            }
            const moveData = (typeof MovesData !== 'undefined') ? MovesData[moveName] : null;
            if (moveData) {
                const powerInput = document.getElementById('move-power-input');
                const typeSelect = document.getElementById('move-type-select');
                if (powerInput && moveData.power && moveData.power > 0) {
                    powerInput.value = moveData.power;
                } else if (powerInput) {
                    powerInput.value = '';
                }
                if (typeSelect && moveData.type) {
                    // Find matching option (case-insensitive)
                    const opt = [...typeSelect.options].find(
                        o => o.value.toLowerCase() === moveData.type.toLowerCase()
                    );
                    if (opt) typeSelect.value = opt.value;
                }
                this.updateAttackPreview();
            }
            this.renderer._updateAttackButtonsState();
        });

        // Attack target select
        document.getElementById('attack-target-select')?.addEventListener('change', e => {
            gs.selectedAttackTargetId = e.target.value || null;
            this.updateAttackPreview();
            this.renderer.renderAll();
        });

        // Status target select
        document.getElementById('status-target-select')?.addEventListener('change', e => {
            const val = e.target.value;
            const parsedId = val && val.includes('|') ? val.split('|')[0] : val;
            gs.selectedStatusTargetId = parsedId ? (isNaN(parseInt(parsedId)) ? parsedId : parseInt(parsedId)) : null;
            this.renderer._updateStatusButtonStyles();
            this.renderer._updateManagementButtons();
            this.renderer.renderAll();
        });

        document.getElementById('move-type-select')?.addEventListener('change', () => {
            this.updateAttackPreview();
            document.getElementById('announcement-banner')?.classList.add('hidden');
        });

        // Clear sticky errors when attack inputs change
        ['move-power-input'].forEach(id => {
            document.getElementById(id)?.addEventListener('input', () => {
                document.getElementById('announcement-banner')?.classList.add('hidden');
            });
        });
        ['attacker-select', 'attack-target-select'].forEach(id => {
            document.getElementById(id)?.addEventListener('change', () => {
                document.getElementById('announcement-banner')?.classList.add('hidden');
            });
        });

        // Status buttons
        document.querySelectorAll('.status-btn').forEach(btn => {
            if (btn.id !== 'weather-btn') btn.addEventListener('click', e => this.toggleStatus(e));
        });
        document.getElementById('weather-btn')?.addEventListener('click', () => this.cycleWeather());

        // Attack buttons
        // Stat update

        // Management listener merged above

        // Timer
        const timerDisplay = document.getElementById('timer-display');
        this.timer.linkDisplay(timerDisplay);

        // Battle log
        document.getElementById('clear-log-btn')?.addEventListener('click', () => this.log.clear());
        document.getElementById('export-log-btn')?.addEventListener('click', () => { this.log.export(); this.audio.play('confirm'); });

        // HP Edit modal
        document.getElementById('close-hp-edit-modal')?.addEventListener('click', () => { this.audio.play('click'); this.modals.close('hpEdit'); });
        document.getElementById('cancel-hp-edit')?.addEventListener('click', () => { this.audio.play('click'); this.modals.close('hpEdit'); });
        document.getElementById('confirm-hp-edit')?.addEventListener('click', () => this.confirmHPEdit());

        document.querySelectorAll('.hp-quick-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.audio.play('click');
                const pct = parseInt(btn.dataset.percent);
                const pokemon = this.gs.currentHPEdit?.pokemon;
                if (pokemon) document.getElementById('hp-new-value').value = Math.floor(pokemon.maxHp * pct / 100);
            });
        });
        document.querySelectorAll('.hp-adjust-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.audio.play('click');
                const change = parseInt(btn.dataset.change);
                const pokemon = this.gs.currentHPEdit?.pokemon;
                const input = document.getElementById('hp-new-value');
                if (pokemon && input) {
                    input.value = Math.max(0, Math.min(pokemon.maxHp, (parseInt(input.value) || 0) + change));
                }
            });
        });
        document.getElementById('hp-new-value')?.addEventListener('keydown', e => {
            if (e.key === 'Enter') this.confirmHPEdit();
            if (e.key === 'Escape') this.modals.close('hpEdit');
        });

        // Confirm modal
        document.getElementById('close-confirm-modal')?.addEventListener('click', () => {
            this.audio.play('click');
            this.modals.close('confirm');
        });

        // Team modal
        document.getElementById('close-team-modal')?.addEventListener('click', () => { this.audio.play('click'); this.modals.close('team'); });
        document.getElementById('confirm-team-btn')?.addEventListener('click', () => {
            this.audio.play('confirm');
            this.modals.close('team');
            this.renderer.renderAll();
        });

        // Selection modal
        document.getElementById('close-selection-modal')?.addEventListener('click', () => { this.audio.play('click'); this.modals.close('selection'); });

        // Settings modal
        document.getElementById('close-settings-modal')?.addEventListener('click', () => { this.audio.play('click'); this.modals.close('settings'); });
        document.getElementById('save-settings-btn')?.addEventListener('click', () => { this.audio.play('confirm'); this.modals.close('settings'); });

        // Management — Switch Pokémon button
        document.getElementById('switch-pokemon-btn')?.addEventListener('click', () => {
            this.audio.play('click');
            window.switchActivePokemonForMgmt?.();
        });

    }

    _setupKeyboardShortcuts() {
        document.addEventListener('keydown', e => {
            const active = document.activeElement;
            const inInput = active && ['INPUT', 'SELECT', 'TEXTAREA'].includes(active.tagName);
            const isMod = e.ctrlKey || e.metaKey;

            // Don't fire shortcuts if the user is typing in an input,
            // UNLESS it's a modifier shortcut (like Ctrl+Z).
            if (inInput && !isMod) return;

            // ── Undo / Redo ──────────────────────────────────────────────
            if (isMod && e.key?.toLowerCase() === 'z') {
                e.preventDefault();
                if (e.shiftKey) {
                    document.getElementById('redo-btn')?.click();
                } else {
                    document.getElementById('undo-btn')?.click();
                }
                return;
            }
            if (isMod && e.key?.toLowerCase() === 'y') {
                e.preventDefault();
                document.getElementById('redo-btn')?.click();
                return;
            }

            // ── Modals ──────────────────────────────────────────────────
            if (e.key === 'Escape') {
                if (this.modals.anyOpen()) {
                    this.modals.closeAll();
                    this.audio.play('click');
                    return;
                }
            }

            // Don't fire arena shortcuts when a modal is open.
            if (this.modals.anyOpen()) return;

            // ── Timer controls ───────────────────────────────────────────
            if (e.key?.toLowerCase() === 't') {
                e.preventDefault();
                if (e.shiftKey) {
                    document.getElementById('timer-reset')?.click();
                } else {
                    // Toggle: if running, pause; if paused, start.
                    if (this.timer.isRunning) {
                        document.getElementById('timer-pause')?.click();
                    } else {
                        document.getElementById('timer-start')?.click();
                    }
                }
                return;
            }

            // ── Battle Actions ───────────────────────────────────────────
            const shortcuts = {
                ' ': 'end-round-btn',
                'p': 'physical-attack-btn',
                's': 'special-attack-btn',
                'e': 'evolve-btn',
                'd': 'devolve-btn',
                'r': 'generate-number-btn',
            };
            const key = e.key?.toLowerCase();
            if (key === 'f' && e.shiftKey) {
                e.preventDefault();
                document.getElementById('change-form-btn')?.click();
                return;
            }
            if (shortcuts[key] && !e.shiftKey) {
                e.preventDefault();
                document.getElementById(shortcuts[key])?.click();
                return;
            }

            // ── Player Selection (1-6) ───────────────────────────────────
            if (e.key >= '1' && e.key <= '6') {
                e.preventDefault();
                const playerIndex = parseInt(e.key) - 1;
                const player = this.gs.players[playerIndex];
                const sel = document.getElementById('attacker-select');
                if (player && sel) {
                    sel.value = player.id;
                    sel.dispatchEvent(new Event('change'));
                    this.audio.play('click');
                }
            }
        });
    }


}


// Expose functions globally for inline HTML onclick handlers
window.escapeHTML = escapeHTML;

