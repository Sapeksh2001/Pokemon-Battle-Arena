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

export class PokemonBattleArena {
    constructor() {
        // Services
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
    }

    // ── Bootstrap ─────────────────────────────────────────────────────────

    init() {
        if (Object.keys(this.db._raw).length === 0) {
            this._announce('Error: Pokémon data file not found or empty.', true);
            return;
        }

        document.body.addEventListener('click', () => Tone.start(), { once: true });
        document.body.addEventListener('click', () => this.audio.init(), { once: true });

        this.db.buildIndex();
        // gauge now generated dynamically per-render
        this.log.linkGameState(this.gs);

        this._registerModals();
        // this._prepopulate(); // Moved to MultiplayerManager.quickBattle()
        this._populateMoveTypeSelector();
        this._setupEventListeners();
        this._setupKeyboardShortcuts();
        this._setupMultiplayerUI();

        this.renderer.renderAll();
        lucide.createIcons();
        this._setArena('Normal');
        this.history._updateButtons();
        this.log.add('Battle arena initialised. 6 trainers ready!', 'system');

        // Expose callbacks used by inline HTML onclick attributes.
        window.openTeamManager = id => this.openTeamManager(id);
        window.handleTeamIconClick = (pid, sid) => this.handleTeamIconClick(pid, sid);
        window.editHP = id => this.editHP(id);
        window.removePlayer = id => this.removePlayer(id);
        // Expose switch-pokemon for the management section's Switch button.
        window.switchActivePokemonForMgmt = () => {
            const val = document.getElementById('management-pokemon-select')?.dataset?.value || document.getElementById('management-pokemon-select')?.value;
            if (!val) { this._announce('Select a Pokémon first.', true); return; }
            const [pid] = val.split('|');
            this.openTeamManager(pid);
        };
    }

    _setupMultiplayerUI() {
        // Expose methods to global scope for HTML buttons in index.html
        window.createMultiplayerRoom = () => {
            const name = prompt('Enter your trainer name (Host):');
            if (name) {
                this.multiplayer.connect();
                setTimeout(() => this.multiplayer.createRoom(name), 500);
            }
        };

        window.joinMultiplayerRoom = () => {
            const code = prompt('Enter the 6-digit room code:');
            const name = prompt('Enter your trainer name:');
            if (code && name) {
                this.multiplayer.connect();
                setTimeout(() => this.multiplayer.joinRoom(code.toUpperCase(), name), 500);
            }
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
    _applyHPChange(pokemon, playerId, newHP, source = '') {
        const clamped = Math.max(0, Math.min(pokemon.maxHp, newHP));
        const delta = clamped - pokemon.currentHP;
        pokemon.currentHP = clamped;

        if (delta === 0) { this.renderer.renderAll(); return; }

        const isHeal = delta > 0;
        const isFaint = clamped === 0 && delta < 0;
        const label = source ? ` (${source})` : '';

        this._showDamageNumber(playerId, Math.abs(delta), isHeal ? 'heal' : 'damage');
        this._notify(
            `${pokemon.fullName}: ${isHeal ? '+' : ''}${delta} HP${label} (${clamped}/${pokemon.maxHp})`,
            isHeal ? 'heal' : 'damage'
        );

        const animType = isFaint ? 'faint' : isHeal ? 'heal' : 'damage';
        if (isFaint) this.audio.playCry(pokemon);
        this._animateSprite(playerId, animType, () => this.renderer.renderAll());
    }

    // ── Player management ─────────────────────────────────────────────────

    addPlayer() {
        if (this.gs.players.length >= 6) {
            this._announce('Lobby Full: Maximum 6 trainers allowed.', true);
            return;
        }

        const input = document.getElementById('new-player-name');
        const name = input?.value.trim();
        if (!name) return;

        const player = new Player(Date.now(), name);
        this.gs.players.push(player);
        input.value = '';
        this.renderer.renderAll();
        this.openTeamManager(player.id);

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

                // Sync game state in multiplayer
                if (this.multiplayer && this.multiplayer.mode === 'playing') {
                    this.multiplayer.sendGameState();
                }
            }
        );
    }

    // ── Round ─────────────────────────────────────────────────────────────

    endRound() {
        this.history.snapshot(this.gs);
        this.gs.round++;
        this._applyWeatherDamage();
        this._applyStatusDamage();
        this.renderer.renderAll();
        this._notify(`========== ROUND ${this.gs.round} BEGINS ==========`, 'round');

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    // ── Attack ────────────────────────────────────────────────────────────

    handleAttack(attackType) {
        this.audio.play('attack');
        const attackerSel = document.getElementById('attacker-select');
        const targetSel = document.getElementById('attack-target-select');
        const typeSel = document.getElementById('move-type-select');
        const powerInput = document.getElementById('move-power-input');

        const attackerId = attackerSel?.dataset?.value || attackerSel?.value;
        const targetId = targetSel?.dataset?.value || targetSel?.value;
        const moveType = typeSel?.value;
        let movePower = parseInt(powerInput?.value);

        if (movePower > 1000) { movePower = 1000; if (powerInput) powerInput.value = 1000; }
        if (movePower < 1) { movePower = 0; }

        if (!attackerId || !targetId || !moveType || isNaN(movePower)) {
            this._announce('Attacker, Target, Move Type, and Power are required!', true);
            this.audio.play('error');
            return;
        }

        const attackerPlayer = this.gs.players.find(p => p.id === attackerId);
        const targetPlayer = this.gs.players.find(p => p.id === targetId);
        if (!attackerPlayer || !targetPlayer) return;

        const attacker = attackerPlayer.getActivePokemon();
        const target = targetPlayer.getActivePokemon();

        if (attacker.isFainted()) {
            this._announce(`${attacker.fullName} is fainted and cannot attack!`, true);
            return;
        }
        if (target.isFainted()) {
            this._announce(`${target.fullName} is already fainted!`, true);
            return;
        }

        this.history.snapshot(this.gs);
        this.audio.playCry(attacker);

        const { damage, effectiveness } = this.engine.calculateDamage(
            attacker, target, movePower, moveType, attackType
        );

        // Build the announcement message.
        let msg = `${attacker.fullName} used a ${attackType} ${moveType} attack on ${target.fullName} for ${damage} damage!`;
        if (effectiveness > 1) msg += " It's super effective!";
        if (effectiveness < 1 && effectiveness > 0) msg += " It's not very effective...";
        if (effectiveness === 0) msg = `${target.fullName} is immune!`;

        this.log.add(msg, effectiveness === 0 ? 'action' : 'damage');
        this._announce(msg);

        if (damage > 0) {
            this._showDamageNumber(targetId, damage, effectiveness >= 2 ? 'critical' : 'damage');
        }

        const newHP = target.currentHP - damage;
        target.currentHP = Math.max(0, newHP);

        const onDone = () => {
            if (target.isFainted()) {
                this.audio.playCry(target);
                this._announce(`${target.fullName} fainted!`);
                this._animateSprite(targetId, 'faint', () => this.renderer.renderAll());
            } else {
                this.renderer.renderAll();
            }

            // Sync game state in multiplayer
            if (this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendGameState();
            }
        };
        damage > 0
            ? this._animateSprite(targetId, 'damage', onDone)
            : onDone();
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

    toggleStatus(event) {
        this.audio.play('status');
        const status = event.target.closest('button')?.dataset.status;
        const targetId = document.getElementById('status-target-select')?.dataset?.value || document.getElementById('status-target-select')?.value;
        if (!status || !targetId) return;

        const player = this.gs.players.find(p => p.id === targetId);
        const pokemon = player?.getActivePokemon();
        if (!pokemon) return;

        this.history.snapshot(this.gs);
        const wasActive = pokemon.hasStatus(status);
        if (wasActive) {
            pokemon.removeStatus(status);
            this._notify(`${pokemon.fullName}'s ${status} was cured.`, 'status');
        } else {
            pokemon.applyStatus(status);
            this._notify(`${pokemon.fullName} was afflicted with ${status}.`, 'status');
        }
        this.renderer.renderAll();

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    handleStatUpdate() {
        const statusTargetSel = document.getElementById('status-target-select');
        const statSel = document.getElementById('stat-select');
        const statValInput = document.getElementById('stat-value-input');
        const modTypeSel = document.getElementById('stat-mod-type');

        const targetId = statusTargetSel?.value;
        const statName = statSel?.value;
        const value = parseInt(statValInput?.value);
        const modType = modTypeSel?.value;

        if (!targetId || !statName || isNaN(value)) {
            this._announce('Please select a target, stat, and value.', true);
            return;
        }
        const player = this.gs.players.find(p => p.id === targetId);
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
        }
        this.audio.play('confirm');

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
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

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    // ── Team Management Modal ─────────────────────────────────────────────

    openTeamManager(playerId) {
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

        for (let i = 0; i < 6; i++) {
            const pokemon = player.team[i];
            const slot = document.createElement('div');
            slot.className = 'bg-slate-700 p-2 text-center cursor-pointer hover:bg-slate-600 relative overflow-hidden h-full flex flex-col items-center justify-between min-h-[120px] border border-outline-variant';
            slot.dataset.slotId = i;

            if (pokemon) {
                slot.innerHTML = `
                    ${player.activePokemonIndex === i
                        ? '<div class="absolute top-1 left-1 text-yellow-400 z-10 animate-pulse"><i data-lucide="star" class="w-4 h-4 fill-current"></i></div>'
                        : ''}
                    <div class="sprite-container flex-grow flex items-center justify-center p-2">
                        <img src="${pokemon.sprite}" alt="${escapeHTML(pokemon.fullName)}" class="h-16 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    </div>
                    <div class="name-tag w-full bg-black/40 py-1 px-1 mb-1">
                        <p class="font-bold text-[10px] uppercase truncate text-white">${escapeHTML(pokemon.fullName)}</p>
                    </div>
                    <div class="action-buttons flex justify-center gap-1 w-full mt-auto">
                        <button class="edit-pokemon-btn flex-1 bg-yellow-600 hover:bg-yellow-700 p-1 flex justify-center items-center h-7" title="Edit">
                            <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
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
                <label for="pokedex-search" class="text-xs">Search Pokémon</label>
                <input type="text" id="pokedex-search"
                       class="w-full bg-slate-900 p-2 mt-1 text-xs"
                       onclick="this.select()"
                       value="${pokemon ? escapeHTML(pokemon.fullName) : ''}">
                <div id="pokedex-search-results" class="bg-slate-900 border border-slate-600 mt-1"></div>
            </div>
            <div class="mb-2">
                <label for="ability-select" class="text-xs text-slate-300">Ability</label>
                <select id="ability-select" class="w-full bg-slate-900 border border-slate-600 p-2 mt-1 text-xs">
                    <option value="">-- Select Ability --</option>
                    ${abilityOptionsHTML}
                </select>
                <div id="ability-description" class="text-xs text-slate-400 mt-1 italic"></div>
            </div>
            <div class="flex gap-2 mt-4">
                <button id="confirm-pokemon-edit" class="bg-green-600 hover:bg-green-700 p-2 text-xs w-full">Confirm</button>
                <button id="cancel-pokemon-edit"  class="bg-gray-600  hover:bg-gray-700  p-2 text-xs w-full">Cancel</button>
            </div>`;
        form.classList.remove('hidden');

        const searchInput = document.getElementById('pokedex-search');
        const searchResults = document.getElementById('pokedex-search-results');
        const abilitySelect = document.getElementById('ability-select');
        const abilityDesc = document.getElementById('ability-description');

        // Trie-powered O(k) live search (replaces O(n) filter).
        searchInput.addEventListener('input', () => {
            const q = searchInput.value.trim();
            searchResults.innerHTML = '';
            if (q.length < 2) return;
            this.db.search(q, 5).forEach(name => {
                const div = document.createElement('div');
                div.className = 'p-2 cursor-pointer hover:bg-slate-700 text-xs';
                div.textContent = name;
                div.onclick = () => {
                    searchInput.value = name;
                    searchResults.innerHTML = '';
                    // Refresh ability options for the newly selected Pokémon
                    if (abilitySelect) {
                        abilitySelect.innerHTML =
                            '<option value="">-- Select Ability --</option>' +
                            this._buildAbilityOptionsHTML(name);
                    }
                    if (abilityDesc) abilityDesc.textContent = '';
                };
                searchResults.appendChild(div);
            });
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
            abilities = window.PokemonAbilitiesMap[pokemonName];
            if (!abilities) {
                // Try removing trailing forme word (e.g. "Charizard Mega X" → "Charizard Mega" → "Charizard")
                const parts = pokemonName.split(' ');
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
        const pokemon = new Pokemon(result.foundNode, result.baseNode);
        player.setSlot(slotId, pokemon);
        if (player.team.filter(p => p).length === 1) player.activePokemonIndex = slotId;
        this._renderTeamEditorGrid();
        document.getElementById('pokemon-editor-form')?.classList.add('hidden');

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

    _switchActivePokemon(playerId, slotId, fromModal = false) {
        const player = this.gs.players.find(p => p.id === playerId);
        const newPokemon = player?.team[slotId];
        if (!player || !newPokemon || newPokemon.isFainted()) return;
        if (player.activePokemonIndex === slotId) return;

        const doSwitch = () => {
            const old = player.getActivePokemon();
            const switched = player.switchTo(slotId);
            if (!switched) return;
            if (!fromModal) {
                this.log.add(`${player.name} switched from ${old?.fullName || 'none'} to ${newPokemon.fullName}`, 'action');
                this.renderer.renderAll();
                this.audio.playCry(newPokemon);
                this._playEntryAnimation(playerId, newPokemon.types[0]);
            } else {
                this._renderTeamEditorGrid();
            }

            // Sync game state in multiplayer
            if (this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendGameState();
            }
        };

        fromModal
            ? doSwitch()
            : this._animateSprite(playerId, 'switch-out', doSwitch);
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

    handleEvolve() {
        const val = document.getElementById('management-pokemon-select')?.dataset?.value || document.getElementById('management-pokemon-select')?.value;
        if (!val) { this._announce('Select a Pokémon to evolve.', true); return; }
        const [pid, sid] = val.split('|');
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon) return;
        const evos = (pokemon.data.evolutions || []).filter(e => e?.Name);
        if (evos.length === 0) { this._announce(`${pokemon.fullName} cannot evolve further.`, true); return; }
        evos.length === 1
            ? this._confirmEvolution(evos[0].Name)
            : this._openEvolutionChoiceModal(evos);
    }

    _openEvolutionChoiceModal(evolutions) {
        const val = document.getElementById('management-pokemon-select')?.dataset?.value || document.getElementById('management-pokemon-select')?.value;
        const [pid, sid] = val.split('|');
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        document.getElementById('selection-modal-title').textContent = `Evolve ${pokemon?.fullName} into...`;
        this._populateSelectionGrid(evolutions, name => this._confirmEvolution(name));
        this.modals.open('selection');
    }

    _confirmEvolution(evolutionName) {
        const val = document.getElementById('management-pokemon-select')?.dataset?.value || document.getElementById('management-pokemon-select')?.value;
        const [pid, sid] = val.split('|');
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

            // Sync game state in multiplayer
            if (this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendGameState();
            }
        });
    }

    openFormChangeModal() {
        const val = document.getElementById('management-pokemon-select')?.dataset?.value || document.getElementById('management-pokemon-select')?.value;
        if (!val) return;
        const [pid, sid] = val.split('|');
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon?.baseData) return;

        const forms = [pokemon.baseData, ...Object.values(pokemon.baseData.forms || {})]
            .filter(f => f?.Name && f.Name !== pokemon.fullName);

        if (forms.length === 0) {
            this._announce(`${pokemon.fullName} has no other forms.`, true);
            return;
        }
        document.getElementById('selection-modal-title').textContent = `Change ${pokemon.fullName}'s Form`;
        this._populateSelectionGrid(forms, name => this._confirmFormChange(name));
        this.modals.open('selection');
    }

    _confirmFormChange(formName) {
        const val = document.getElementById('management-pokemon-select')?.dataset?.value || document.getElementById('management-pokemon-select')?.value;
        if (!val) return;
        const [pid, sid] = val.split('|');
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

            // Sync game state in multiplayer
            if (this.multiplayer && this.multiplayer.mode === 'playing') {
                this.multiplayer.sendGameState();
            }
        });
    }

    /** DRY: Builds the generic selection grid used for both evolutions and forms. */
    _populateSelectionGrid(dataItems, onSelect) {
        const grid = document.getElementById('selection-grid');
        if (!grid) return;
        grid.innerHTML = '';
        dataItems.forEach(item => {
            if (!item?.Name) return;
            const div = document.createElement('div');
            div.className = 'bg-slate-700 p-2 text-center cursor-pointer hover:bg-slate-600';
            div.innerHTML = `<img src="${item.sprite || ''}" alt="${escapeHTML(item.Name)}" class="mx-auto h-16">
                             <p class="font-bold text-xs mt-1">${escapeHTML(item.Name)}</p>`;
            div.onclick = () => onSelect(item.Name);
            grid.appendChild(div);
        });
    }

    // ── Revive ────────────────────────────────────────────────────────────

    handleRevive() {
        const val = document.getElementById('management-pokemon-select')?.dataset?.value || document.getElementById('management-pokemon-select')?.value;
        if (!val) { this._announce('Select a fainted Pokémon to revive.', true); this.audio.play('error'); return; }
        const [pid, sid] = val.split('|');
        const player = this.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon?.isFainted()) { this._announce('This Pokémon is not fainted.', true); return; }

        this.history.snapshot(this.gs);
        const revivedHP = Math.floor(pokemon.maxHp / 2);
        this._applyHPChange(pokemon, pid, revivedHP, 'revive');
        this._announce(`${pokemon.fullName} has been revived!`);

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    // ── Weather ───────────────────────────────────────────────────────────

    cycleWeather() {
        this.history.snapshot(this.gs);
        const cycle = ['none', 'sandstorm', 'hail'];
        const next = cycle[(cycle.indexOf(this.gs.weather) + 1) % cycle.length];
        const old = this.gs.weather;
        this.gs.weather = next;
        this._notify(`Weather changed from ${old} to ${next}.`, 'action');
        this.renderer.renderAll();
        this.audio.play('click');

        // Sync game state in multiplayer
        if (this.multiplayer && this.multiplayer.mode === 'playing') {
            this.multiplayer.sendGameState();
        }
    }

    _applyStatusDamage() {
        const affected = [];
        this.gs.players.forEach(player => {
            const pokemon = player.getActivePokemon();
            if (!pokemon || pokemon.isFainted()) return;

            if (pokemon.hasStatus('poison') || pokemon.hasStatus('bad_poison') || pokemon.hasStatus('burn')) {
                const dmg = Math.max(1, Math.floor(pokemon.maxHp / 8));
                pokemon.takeDamage(dmg);
                affected.push(pokemon.fullName);
            }
        });
        if (affected.length > 0) {
            this._notify(
                `${affected.join(', ')} took damage from their status conditions!`,
                'damage'
            );
        }
    }

    _applyWeatherDamage() {
        if (this.gs.weather === 'none') return;
        const affected = [];
        this.gs.players.forEach(player => {
            const pokemon = player.getActivePokemon();
            if (!pokemon || pokemon.isFainted()) return;
            const immune = this.gs.weather === 'sandstorm'
                ? pokemon.types.some(t => ['Rock', 'Ground', 'Steel'].includes(t))
                : pokemon.types.includes('Ice'); // hail
            if (!immune) {
                const dmg = Math.floor(pokemon.maxHp / 16);
                pokemon.takeDamage(dmg);
                affected.push(pokemon.fullName);
            }
        });
        if (affected.length > 0) {
            this._notify(
                `${affected.join(', ')} ${affected.length === 1 ? 'is' : 'are'} buffeted by the ${this.gs.weather}!`,
                'damage'
            );
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

    _prepopulate() {
        this.gs.players = []; // Clear current players to avoid duplicates
        this._toggleLoading(true, 'Loading Pokémon teams...');
        const names = ['Ash', 'Misty', 'Brock', 'Gary', 'Jessie', 'James'];
        const pool = [...this.db.filteredNames].sort(() => 0.5 - Math.random());

        names.forEach((name, i) => {
            const teamNames = pool.splice(0, 6);
            if (pool.length < 6) pool.push(...this.db.filteredNames);

            const team = teamNames.map(n => {
                const r = this.db.find(n);
                return r ? new Pokemon(r.foundNode, r.baseNode) : null;
            }).filter(Boolean);
            while (team.length < 6) team.push(null);

            const player = new Player(Date.now() + i, name);
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

    /**
     * Populate the Move Name dropdown based on what moves a given Pokémon can learn.
     * Falls back to showing all moves (alphabetically) if the name isn't in MovesetsData.
     * @param {string|null} pokemonName
     */
    _populateMoveSelector(pokemonName) {
        const sel = document.getElementById('move-name-select');
        if (!sel) return;
        sel.innerHTML = '<option value="">-- Select Move --</option>';

        if (typeof MovesetsData === 'undefined' || typeof MovesData === 'undefined') return;

        // Retrieve the moveset: try exact name first, then base name without suffixes.
        let moves = MovesetsData[pokemonName];
        if (!moves && pokemonName) {
            // Try base name (e.g. 'Charizard' from 'Charizard Mega X')
            const baseName = pokemonName.split(' ')[0];
            moves = MovesetsData[baseName];
        }
        // If still nothing, fall back to all moves sorted
        const movelist = moves || Object.keys(MovesData).sort();

        movelist.forEach(moveName => {
            const md = MovesData[moveName];
            if (!md) return;
            const label = md.power > 0
                ? `${moveName} (${md.type} · ${md.category} · ${md.power})`
                : `${moveName} (${md.type} · ${md.category})`;
            sel.add(new Option(label, moveName));
        });
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
            const name = foundNode.Name;
            if (!name || window.PokemonAbilitiesMap[name]) continue;
            const types = (foundNode.types || []).flatMap(t => t.split(' '));
            const abilities = new Set();
            types.forEach(t => {
                (typeAbilityHints[t] || []).forEach(a => {
                    if (AbilitiesData[a]) abilities.add(a);
                });
            });
            window.PokemonAbilitiesMap[name] = [...abilities].slice(0, 4);
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
                    this._populateMoveSelector(pk.fullName);
                }
            } else {
                this._populateMoveSelector(null);
            }
            this.renderer.renderAll();
        });

        // Move name select — auto-fills power and type
        document.getElementById('move-name-select')?.addEventListener('change', e => {
            const moveName = e.target.value;
            if (!moveName) return;
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
        });

        // Attack target select
        document.getElementById('attack-target-select')?.addEventListener('change', e => {
            gs.selectedAttackTargetId = e.target.value || null;
            this.updateAttackPreview();
            this.renderer.renderAll();
        });

        // Status target select
        document.getElementById('status-target-select')?.addEventListener('change', e => {
            gs.selectedStatusTargetId = e.target.value || null;
            this.renderer._updateStatusButtonStyles();
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

        // Management
        document.getElementById('management-pokemon-select')?.addEventListener('change', () => this.renderer._updateManagementButtons());

        // Player management
        document.getElementById('add-player-btn')?.addEventListener('click', () => { this.audio.play('click'); this.addPlayer(); });
        document.getElementById('end-round-btn')?.addEventListener('click', () => { this.audio.play('confirm'); this.endRound(); });

        // Timer
        const timerDisplay = document.getElementById('timer-display');
        this.timer.linkDisplay(timerDisplay);
        document.getElementById('timer-start')?.addEventListener('click', () => { this.audio.play('click'); this.timer.start(); });
        document.getElementById('timer-pause')?.addEventListener('click', () => { this.audio.play('click'); this.timer.pause(); });
        document.getElementById('timer-reset')?.addEventListener('click', () => { this.audio.play('click'); this.timer.reset(); });

        // Undo / Redo
        document.getElementById('undo-btn')?.addEventListener('click', () => {
            if (this.history.undo(this.gs, this.db)) {
                this.audio.play('click');
                this.renderer.renderAll();
                this.log.add('[UNDO] Action undone', 'system');
                this._announce('Action undone');
            } else {
                this._announce('Nothing to undo!', true);
                this.audio.play('error');
            }
        });
        document.getElementById('redo-btn')?.addEventListener('click', () => {
            if (this.history.redo(this.gs, this.db)) {
                this.audio.play('click');
                this.renderer.renderAll();
                this.log.add('[REDO] Action redone', 'system');
                this._announce('Action redone');
            } else {
                this._announce('Nothing to redo!', true);
                this.audio.play('error');
            }
        });

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
                'f': 'change-form-btn',
                'r': 'generate-number-btn',
            };
            const key = e.key?.toLowerCase();
            if (shortcuts[key]) {
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

