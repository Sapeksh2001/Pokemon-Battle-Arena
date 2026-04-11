import { Player } from '../models/Player.js';
import { Pokemon } from '../models/Pokemon.js';
import { 
    ref, set, get, onValue, off, push, update, remove, 
    serverTimestamp, onDisconnect, query, limitToLast, onChildAdded 
} from "firebase/database";
import { db } from '../../firebase.js';
import { authManager } from './authManager.js';

function generateRoomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function generatePlayerId() {
    return Math.random().toString(36).substring(2, 9);
}

export class MultiplayerManager {
    constructor(arena) {
        this.arena = arena;
        this.roomCode = null;
        this.playerId = generatePlayerId();
        this.playerName = '';
        this.isHost = false;
        this.isConnected = true; 
        this.mode = 'offline'; 
        this.unsubscribes = [];

        // UI Helpers called via global scope from React components
        window.copyRoomCode = () => {
            if (!this.roomCode) return;
            navigator.clipboard.writeText(this.roomCode);
            this.showNotification('Room code copied!', 'success');
        };
        window.shareRoomLink = () => {
            if (!this.roomCode) return;
            const link = `${window.location.origin}?room=${this.roomCode}`;
            navigator.clipboard.writeText(link);
            this.showNotification('Share link copied!', 'success');
        };
    }

    /**
     * Instantly starts a local battle with 6 prepopulated teams (Ash, Misty, etc.)
     * This bypasses the multiplayer room creation for testing and quick play.
     */
    quickBattle() {
        console.log('[MULTIPLAYER] Starting Quick Battle...');
        this.mode = 'offline';
        
        // 1. Prepopulate the arena with dummy data
        if (typeof this.arena._prepopulate === 'function') {
            this.arena._prepopulate();
        } else {
            console.error('[MULTIPLAYER] Error: _prepopulate not found on arena instance.');
            return;
        }

        // 2. Switch from Lobby View to Arena View
        const lobby = document.getElementById('lobby-view');
        const arenaNode = document.getElementById('arena-view');
        
        if (lobby && arenaNode) {
            lobby.classList.add('hidden');
            arenaNode.classList.remove('hidden');
            console.log('[MULTIPLAYER] Transitioned to Arena View');
        } else {
            console.warn('[MULTIPLAYER] UI nodes not found for transition');
        }

        // 3. Initialize the battle and Render (delayed slightly for DOM synchronization)
        setTimeout(() => {
            if (this.arena.renderer) {
                this.arena.renderer.renderAll();
                console.log('[MULTIPLAYER] Quick Battle initialized and rendered');
            }
        }, 100);
        this.arena.audio.play('confirm');
        console.log('[MULTIPLAYER] Quick Battle initialized and rendered');
    }



    connect() {
        console.log('[MULTIPLAYER] Initialized Firebase connection');
        this.isConnected = true;
        this.listenToRecentRooms();
    }

    disconnect() {
        this.leaveRoom();
    }

    _getFlattenedPool() {
        if (typeof window.MergedPokemonData === 'undefined') return [];
        const flat = [];
        
        const recurse = (obj) => {
            // Data uses 'Name' (capital N)
            const name = obj.Name || obj.name;
            if (name) {
                if (!flat.some(p => (p.Name || p.name) === name)) {
                    flat.push(obj);
                }
            }
            if (obj.evolutions && Array.isArray(obj.evolutions)) {
                obj.evolutions.forEach(recurse);
            }
            if (obj.forms && Array.isArray(obj.forms)) {
                obj.forms.forEach(recurse);
            }
        };

        Object.values(window.MergedPokemonData).forEach(recurse);
        console.log('[Multiplayer] Pool size:', flat.length);
        return flat;
    }

    async createRoom(trainerName, settings = {}) {
        if (!trainerName) return;
        
        const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
        this.roomCode = roomCode;
        this.isHost = true;
        this.trainerName = trainerName;
        this.playerId = Math.random().toString(36).substring(2, 10);

        const roomRef = ref(db, `rooms/${roomCode}`);
        const playerRef = ref(db, `rooms/${roomCode}/players/${this.playerId}`);
        
        await set(roomRef, {
            createdAt: Date.now(),
            hostId: this.playerId,
            status: 'lobby',
            settings: {
                roomName: settings.roomName || 'Epic Battle Room',
                maxPlayers: settings.maxPlayers || 2,
                battleType: settings.battleType || 'singles',
                selectedTiers: settings.selectedTiers || ['Basic', 'Final']
            }
        });

        await set(playerRef, {
            name: trainerName,
            isHost: true,
            isReady: false
        });

        onDisconnect(playerRef).remove();
        onDisconnect(roomRef).update({ hostDisconnected: true });

        this.showNotification(`Room created: ${roomCode}`, 'success');
        this.saveRecentRoom(roomCode, 'host');
        this.showRoomLobby();
        this._listenToLobby();
    }

    async joinRoom(roomCode, playerName, role = 'player') {
        this.playerName = playerName;
        const roomRef = ref(db, `rooms/${roomCode}`);
        const snapshot = await get(roomRef);

        if (!snapshot.exists()) {
            this.showNotification('Room not found', 'error');
            return;
        }

        const roomData = snapshot.val();
        const selectedRole = role;

        // Allow wild card entries if game is started and player joins as 'player'
        if (roomData.status !== 'lobby' && selectedRole === 'player') {
            this.showNotification('Joining ongoing game...', 'info');
        }

        this.roomCode = roomCode;
        this.isHost = false;
        this.mode = 'joining';
        this.isSpectator = (selectedRole === 'spectator');

        // If the game is already running and the player is joining as a wildcard,
        // write them to /entryQueue instead of /players to avoid polluting live state.
        const isWildcard = (roomData.status === 'playing' && selectedRole === 'player');
        let path;
        if (this.isSpectator) {
            path = 'spectators';
        } else if (isWildcard) {
            path = 'entryQueue';
        } else {
            path = 'players';
        }

        this._entryPath = path; // remember for leaveRoom cleanup
        const playerRef = ref(db, `rooms/${roomCode}/${path}/${this.playerId}`);
        await set(playerRef, {
            name: playerName,
            isHost: false,
            isReady: false,
            joinedAt: Date.now()
        });

        onDisconnect(playerRef).remove();

        this.showNotification(`Joined room securely as ${selectedRole}`, 'success');
        this.saveRecentRoom(roomCode, selectedRole);

        if (roomData.status === 'playing') {
             this._listenToLobby();
             this._onGameStarted();
        } else {
             this.showRoomLobby();
             this._listenToLobby();
        }
    }

    leaveRoom() {
        if (this.roomCode) {
            // Clean up from whichever path we joined under
            const path = this._entryPath || (this.isSpectator ? 'spectators' : 'players');
            const playerRef = ref(db, `rooms/${this.roomCode}/${path}/${this.playerId}`);
            remove(playerRef);

            this.unsubscribes.forEach(unsub => unsub());
            this.unsubscribes = [];
        }
        this.roomCode = null;
        this.isHost = false;
        this.mode = 'offline';
        this.isSpectator = false;
        this._entryPath = null;
        // Dismiss lingering wildcard queue overlay if present
        const queueEl = document.getElementById('wildcard-queue');
        if (queueEl) queueEl.remove();
        this.arena.modals.close('multiplayerLobby');
    }

    toggleReady() {
        if (!this.roomCode) return;
        const playerRef = ref(db, `rooms/${this.roomCode}/players/${this.playerId}`);
        get(playerRef).then(snap => {
            if (snap.exists()) {
                const current = snap.val().isReady;
                update(playerRef, { isReady: !current });
            }
        });
    }

    async startGame() {
        if (!this.isHost || !this.roomCode) {
            this.showNotification('Only the host can start the game', 'error');
            return;
        }

        // Fetch all players from Lobby and populate gs.players first
        const playersRef = ref(db, `rooms/${this.roomCode}/players`);
        const snapshot = await get(playersRef);
        if (snapshot.exists()) {
            const players = [];
            snapshot.forEach(child => {
                const data = child.val();
                const p = new Player(child.key, data.name);
                if (data.assignedPokemonId && window.MergedPokemonData) {
                    const result = this.arena.db.find(data.assignedPokemonId);
                    if (result) {
                        p.team[0] = new Pokemon(result.foundNode, result.baseNode);
                    }
                }
                players.push(p);
            });
            this.arena.gs.players = players;
        }
        
        const stateRef = ref(db, `rooms/${this.roomCode}/state`);
        await set(stateRef, this.serializeGameState());
        
        const roomRef = ref(db, `rooms/${this.roomCode}`);
        await update(roomRef, { status: 'playing' });
    }

    _listenToLobby() {
        const playersRef = ref(db, `rooms/${this.roomCode}/players`);
        const unsubPlayers = onValue(playersRef, (snapshot) => {
            const players = [];
            snapshot.forEach(child => {
                players.push({ id: child.key, ...child.val() });
            });

            if (this.mode === 'playing' && this.isHost) {
                // Detect newly-promoted players (moved from entryQueue → players by assignRandomPokemon)
                let stateUpdated = false;
                players.forEach(p => {
                    if (p.assignedPokemonId) {
                        const exists = this.arena.gs.players.find(sp => sp.id === p.id);
                        if (!exists) {
                            const newPlayer = new Player(p.id, p.name);
                            const result = this.arena.db.find(p.assignedPokemonId);
                            if (result) {
                                newPlayer.team[0] = new Pokemon(result.foundNode, result.baseNode);
                            }
                            this.arena.gs.players.push(newPlayer);
                            stateUpdated = true;
                            this.arena.log.add(`⚡ Wildcard ${p.name} entered the battle!`, 'system');
                        }
                    }
                });
                if (stateUpdated) {
                    this.sendGameState();
                    this.arena.renderer.renderAll();
                }
            } else if (this.mode !== 'playing') {
                this.updateRoomUI({ players });
                // Host disconnected check (lobby phase only)
                if (players.length > 0 && !players.find(p => p.isHost)) {
                    this.showNotification('Host closed the room', 'error');
                    this.leaveRoom();
                }
            }
        });

        const statusRef = ref(db, `rooms/${this.roomCode}/status`);
        const unsubStatus = onValue(statusRef, (snapshot) => {
            if (snapshot.val() === 'playing' && this.mode !== 'playing') {
                this._onGameStarted();
            }
        });

        this.unsubscribes.push(unsubPlayers, unsubStatus);
    }

    /** Host-only: listens to /entryQueue and renders the wildcard assignment panel. */
    _listenToEntryQueue() {
        if (!this.isHost || !this.roomCode) return;
        const queueRef = ref(db, `rooms/${this.roomCode}/entryQueue`);
        const unsubQueue = onValue(queueRef, (snapshot) => {
            const waiting = [];
            snapshot.forEach(child => {
                waiting.push({ id: child.key, ...child.val() });
            });
            this.renderWildcardQueue(waiting);
        });
        this.unsubscribes.push(unsubQueue);
    }

    _onGameStarted() {
        this.mode = 'playing';
        this.arena.modals.close('multiplayerLobby');
        document.getElementById('multiplayer-lobby-modal')?.classList.remove('visible');
        document.getElementById('room-modal')?.classList.remove('visible');
        document.getElementById('join-modal')?.classList.remove('visible');

        const lobbyView = document.getElementById('lobby-view');
        const arenaView = document.getElementById('arena-view');
        const loadingScreen = document.getElementById('loading-screen');

        if (loadingScreen) loadingScreen.classList.remove('hidden');

        setTimeout(() => {
            if (lobbyView) lobbyView.classList.add('hidden');
            if (arenaView) arenaView.classList.remove('hidden');
            if (loadingScreen) loadingScreen.classList.add('hidden');

            this.arena.log.add('🎮 Multiplayer game started! All players connected.', 'system');
            this.arena.renderer.renderAll();
            this.showNotification('Game started! Battle begins!', 'success');
            
            if (this.isSpectator) {
                 const controls = document.getElementById('battle-controls');
                 if (controls) controls.classList.add('pointer-events-none', 'opacity-50');
            }

            this._listenToGameState();
            this._listenToEntryQueue(); // host watches for wildcard joiners
        }, 1500);
    }

    _listenToGameState() {
        const stateRef = ref(db, `rooms/${this.roomCode}/state`);
        const unsubState = onValue(stateRef, (snapshot) => {
            if (snapshot.exists()) {
                const state = snapshot.val();
                if (state._sender !== this.playerId) { 
                    this.receiveGameState(state);
                }
            }
        });

        const actionsRef = ref(db, `rooms/${this.roomCode}/actions`);
        const unsubActions = onChildAdded(actionsRef, (snapshot) => {
            const data = snapshot.val();
            if (data.sender !== this.playerId) {
                this.handleRemoteAction(data.action, data.payload);
            }
        });

        this.unsubscribes.push(unsubState, unsubActions);
    }

    sendGameState() {
        if (!this.roomCode || this.mode !== 'playing') return;
        try {
            const state = this.serializeGameState();
            state._sender = this.playerId; 
            const stateRef = ref(db, `rooms/${this.roomCode}/state`);
            set(stateRef, state);
        } catch (err) {
            console.error('[MULTIPLAYER] Error serializing game state:', err);
        }
    }

    receiveGameState(state) {
        try {
            this.deserializeGameState(state);
            this.arena.renderer.renderAll();
        } catch (err) {
            console.error('[MULTIPLAYER] Error deserializing game state:', err);
        }
    }

    sendAction(action, payload) {
        if (!this.roomCode || this.mode !== 'playing') return;
        const actionsRef = ref(db, `rooms/${this.roomCode}/actions`);
        push(actionsRef, {
            sender: this.playerId,
            action,
            payload,
            timestamp: Date.now()
        });
    }

    handleRemoteAction(action, payload) {
        switch (action) {
            case 'log_add':
                if (payload) {
                    this.arena.log._buffer.push(payload);
                    this.arena.log._render();
                }
                break;
            default: console.warn('[MULTIPLAYER] Unknown action:', action);
        }
    }

    serializeGameState() {
        const gs = this.arena.gs;
        return {
            players: gs.players.map(p => p.toJSON()),
            round: gs.round,
            weather: gs.weather || null,
            activeTurnPlayerId: gs.activeTurnPlayerId || null,
            selectedAttackTargetId: gs.selectedAttackTargetId || null,
            selectedStatusTargetId: gs.selectedStatusTargetId || null,
            logs: this.arena.log._buffer.toArray() || []
        };
    }

    deserializeGameState(state) {
        const gs = this.arena.gs;
        gs.players = (state.players || []).map(p => Player.fromJSON(p, this.arena.db));
        gs.round = state.round || 1;
        gs.weather = state.weather || null;
        gs.activeTurnPlayerId = state.activeTurnPlayerId || null;
        gs.selectedAttackTargetId = state.selectedAttackTargetId || null;
        gs.selectedStatusTargetId = state.selectedStatusTargetId || null;
        if (state.logs && state.logs.length > 0) {
            this.arena.log.loadLogs(state.logs);
        }
    }

    showRoomLobby() {
        this.arena.modals.open('multiplayerLobby');
        const codeDisplay = document.getElementById('room-code-display');
        if (codeDisplay) codeDisplay.textContent = this.roomCode;

        // Expose assignment methods globally so inline onclick survives React re-renders
        window._mpRng = (pid) => {
            console.log('[Multiplayer] RNG clicked', pid);
            this.assignRandomPokemon(pid).catch(err => alert('RNG Error: ' + err.message));
        };
        window._mpPick = (pid) => {
            console.log('[Multiplayer] PICK clicked', pid);
            this.assignSpecificPokemon(pid).catch(err => alert('PICK Error: ' + err.message));
        };
    }

    async assignRandomPokemon(targetPlayerId) {
        console.log('[Multiplayer] assignRandomPokemon triggered', targetPlayerId, 'isHost:', this.isHost, 'room:', this.roomCode);
        if (!this.isHost || !this.roomCode) {
            console.log('[Multiplayer] Aborting RNG - Not host or no roomcode');
            return;
        }

        const fullPool = this._getFlattenedPool();
        if (fullPool.length === 0) {
            console.log('[Multiplayer] fullPool is empty');
            this.showNotification('Data loading... Please wait.', 'error');
            return;
        }

        // Read settings from Firebase for multi-tier selection
        const roomSnap = await get(ref(db, `rooms/${this.roomCode}`));
        const settings = roomSnap.exists() ? roomSnap.val().settings : null;
        const selectedTiers = settings?.selectedTiers || ['any'];

        console.log('[MULTIPLAYER] RNG Tiers:', selectedTiers);

        // Build filtered pool
        let pool = fullPool;
        if (selectedTiers.length > 0 && !selectedTiers.includes('any')) {
            pool = fullPool.filter(p => selectedTiers.includes(p.tier));
        }

        if (pool.length === 0) {
            this.showNotification('No Pokémon found for the selected tiers!', 'error');
            return;
        }

        // Gather already-assigned IDs across /players (prevent duplicates)
        const playersSnap = await get(ref(db, `rooms/${this.roomCode}/players`));
        const assignedIds = [];
        if (playersSnap.exists()) {
            playersSnap.forEach(snap => {
                const p = snap.val();
                if (p.pokemonId) assignedIds.push(p.pokemonId);
            });
        }

        // Filter out already assigned
        const availablePool = pool.filter(p => !assignedIds.includes(p.name));
        const selectionSource = availablePool.length > 0 ? availablePool : pool;
        
        const rolled = selectionSource[Math.floor(Math.random() * selectionSource.length)];
        const pokeId = rolled.Name || rolled.name;
        this.showNotification(`Assigned ${pokeId}!`, 'success');

        // Check if this player is in entryQueue (wildcard mid-game join) or lobby /players
        const queueSnap = await get(ref(db, `rooms/${this.roomCode}/entryQueue/${targetPlayerId}`));
        if (queueSnap.exists()) {
            // Wildcard mid-game join: promote from entryQueue → players
            const playerData = queueSnap.val();
            await set(ref(db, `rooms/${this.roomCode}/players/${targetPlayerId}`), {
                ...playerData,
                assignedPokemonId: pokeId,
                assignedPokemonName: rolled.Name || rolled.name,
                isReady: true
            });
            await remove(ref(db, `rooms/${this.roomCode}/entryQueue/${targetPlayerId}`));

            // Immediately add to local game state — don't wait for _listenToLobby callback
            const alreadyInGame = this.arena.gs.players.find(sp => sp.id === targetPlayerId);
            if (!alreadyInGame) {
                const newPlayer = new Player(targetPlayerId, playerData.name);
                const result = this.arena.db.find(pokeId);
                if (result) {
                    newPlayer.team[0] = new Pokemon(result.foundNode, result.baseNode);
                } else {
                    console.warn('[Multiplayer] db.find failed for pokeId:', pokeId);
                }
                this.arena.gs.players.push(newPlayer);
                this.arena.log.add(`⚡ ${playerData.name} joined as wildcard with ${rolled.Name || rolled.name}!`, 'system');
                this.arena.renderer.renderAll();
                this.sendGameState();
            }
        } else {
            // Lobby assignment — update the player's record in place and mark ready
            await update(ref(db, `rooms/${this.roomCode}/players/${targetPlayerId}`), {
                assignedPokemonId: pokeId,
                assignedPokemonName: rolled.Name || rolled.name,
                isReady: true
            });
        }
    }

    async assignSpecificPokemon(targetPlayerId) {
        console.log('[Multiplayer] assignSpecificPokemon triggered', targetPlayerId, 'isHost:', this.isHost, 'room:', this.roomCode);
        if (!this.isHost || !this.roomCode) {
            console.log('[Multiplayer] Aborting PICK - Not host or no roomcode');
            return;
        }
        
        const rawInput = prompt('Enter specific Pok\u00e9mon name (e.g. Charizard):');
        if (!rawInput) return;
        const name = rawInput.trim().toLowerCase();
        
        // MergedPokemonData is an object keyed by name, not an array
        const mergedData = window.MergedPokemonData;
        if (!mergedData) {
            this.showNotification('Data not loaded yet', 'error');
            return;
        }
        const pokemon = Object.values(mergedData).find(p => (p.Name || p.name || '').toLowerCase() === name);
        if (!pokemon) {
            this.showNotification(`Could not find Pokémon: ${rawInput}`, 'error');
            return;
        }

        const pokeName = pokemon.Name || pokemon.name;
        const pokeId = pokeName;
        this.showNotification(`Assigned ${pokeName}!`, 'success');

        const queueSnap = await get(ref(db, `rooms/${this.roomCode}/entryQueue/${targetPlayerId}`));
        if (queueSnap.exists()) {
            // Wildcard mid-game join: promote from entryQueue → players
            const playerData = queueSnap.val();
            await set(ref(db, `rooms/${this.roomCode}/players/${targetPlayerId}`), {
                ...playerData,
                assignedPokemonId: pokeId,
                assignedPokemonName: pokeName,
                isReady: true
            });
            await remove(ref(db, `rooms/${this.roomCode}/entryQueue/${targetPlayerId}`));

            // Immediately add to local game state
            const alreadyInGame = this.arena.gs.players.find(sp => sp.id === targetPlayerId);
            if (!alreadyInGame) {
                const newPlayer = new Player(targetPlayerId, playerData.name);
                const result = this.arena.db.find(pokeId);
                if (result) {
                    newPlayer.team[0] = new Pokemon(result.foundNode, result.baseNode);
                } else {
                    console.warn('[Multiplayer] PICK db.find failed for pokeId:', pokeId);
                }
                this.arena.gs.players.push(newPlayer);
                this.arena.log.add(`⚡ ${playerData.name} joined as wildcard with ${pokeName}!`, 'system');
                this.arena.renderer.renderAll();
                this.sendGameState();
            }
        } else {
            // Lobby assignment — update in place and mark ready
            await update(ref(db, `rooms/${this.roomCode}/players/${targetPlayerId}`), {
                assignedPokemonId: pokeId,
                assignedPokemonName: pokeName,
                isReady: true
            });
        }
    }

    /**
     * Renders the GM's floating wildcard queue panel.
     * @param {Array} waitingPlayers - entries from /entryQueue, each has { id, name, … }
     */
    renderWildcardQueue(waitingPlayers) {
        let queueContainer = document.getElementById('wildcard-queue');

        if (waitingPlayers.length === 0) {
            if (queueContainer) queueContainer.remove();
            return;
        }

        if (!queueContainer) {
            queueContainer = document.createElement('div');
            queueContainer.id = 'wildcard-queue';
            queueContainer.className = 'fixed top-20 right-4 z-50 p-4 shadow-xl';
            queueContainer.style.cssText = 'background:#0f172a;border:1px solid #5bf083;border-radius:8px;min-width:240px;';
            document.body.appendChild(queueContainer);
        }

        const savedTier = this.selectedWildcardTier || 'any';

        queueContainer.innerHTML = `
            <div style="color:#5bf083;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">⚡ Wildcard Queue</div>
            <div style="margin-bottom:8px;font-size:10px;color:#94a3b8;">
                Tier:
                <select id="wildcard-tier"
                    style="background:#020617;border:1px solid #334155;color:#fff;padding:1px 4px;font-size:10px;"
                    onchange="window.arena.multiplayer.selectedWildcardTier=this.value;">
                    <option value="any"  ${savedTier==='any'?'selected':''}>Any</option>
                    <option value="OU"   ${savedTier==='OU'?'selected':''}>OU</option>
                    <option value="UU"   ${savedTier==='UU'?'selected':''}>UU</option>
                    <option value="Uber" ${savedTier==='Uber'?'selected':''}>Uber</option>
                </select>
            </div>
            ${waitingPlayers.map(p => `
                <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:6px 0;border-bottom:1px solid #1e293b;">
                    <span style="color:#fff;font-size:12px;">${p.name}</span>
                    <button
                        style="background:#1e293b;border:1px solid #5bf083;color:#5bf083;font-size:9px;font-weight:700;letter-spacing:.08em;padding:3px 8px;cursor:pointer;text-transform:uppercase;"
                        onmouseover="this.style.background='#5bf083';this.style.color='#020617';"
                        onmouseout="this.style.background='#1e293b';this.style.color='#5bf083';"
                        onclick="window._mpRng('${p.id}')">
                        RNG
                    </button>
                    <button
                        style="background:#1e293b;border:1px solid #5bf083;color:#5bf083;font-size:9px;font-weight:700;letter-spacing:.08em;padding:3px 8px;cursor:pointer;text-transform:uppercase;margin-left:4px;"
                        onmouseover="this.style.background='#5bf083';this.style.color='#020617';"
                        onmouseout="this.style.background='#1e293b';this.style.color='#5bf083';"
                        onclick="window._mpPick('${p.id}')">
                        PICK
                    </button>
                </div>
            `).join('')}
        `;

        queueContainer.onclick = null;
    }

    updateRoomUI(data) {
        const playerList = document.getElementById('room-player-list');
        if (!playerList || !data.players) return;
        
        // Also show tier selector if host
        const tierSelect = document.getElementById('rng-tier-select');
        if (tierSelect) {
            tierSelect.style.display = this.isHost ? 'block' : 'none';
        }

        playerList.innerHTML = data.players.map(p => `
            <div class="flex justify-between items-center bg-surface-container-lowest p-3 border border-outline-variant ${p.isHost ? 'host' : ''}">
                <div>
                   <span class="text-white text-sm font-bold">${p.name}</span>
                   ${p.isHost ? '<span class="text-yellow-400 text-[8px] ml-2 border border-yellow-400 px-1">HOST</span>' : ''}
                   <div class="text-[10px] text-slate-400 mt-1">${p.assignedPokemonName || 'Unassigned'}</div>
                </div>
                ${this.isHost ? `
                <div class="flex gap-2">
                    <button class="bg-surface-variant hover:bg-surface-bright text-white px-2 py-1 text-[8px] uppercase font-bold border border-secondary" onclick="window._mpRng('${p.id}')">RNG</button>
                    <button class="bg-surface-variant hover:bg-surface-bright text-white px-2 py-1 text-[8px] uppercase font-bold border border-secondary" onclick="window._mpPick('${p.id}')">PICK</button>
                    ${p.isReady ? '<span class="text-[#5bf083] text-[10px] uppercase tracking-wider border border-[#004a1d] bg-[#004a1d]/30 px-2 py-1 flex items-center">READY</span>' : ''}
                </div>
                ` : `
                   ${p.isReady ? '<span class="text-[#5bf083] text-[10px] uppercase tracking-wider border border-[#004a1d] bg-[#004a1d]/30 px-2 py-1">READY</span>' : ''}
                `}
            </div>
        `).join('');

        playerList.onclick = null;
        
        const startBtn = document.getElementById('start-game-btn');
        if (startBtn) {
            startBtn.style.display = this.isHost ? 'block' : 'none';
            // Start gating: Need >= 2 players, and everyone must have a Pokemon assigned
            const hasPokemon = data.players.every(p => p.assignedPokemonId);
            const minPlayers = data.players.length >= 2;
            if (!minPlayers || !hasPokemon) {
                startBtn.classList.add('opacity-50', 'pointer-events-none');
            } else {
                startBtn.classList.remove('opacity-50', 'pointer-events-none');
            }
        }
    }

    showNotification(message, type = 'info') {
        this.arena._announce(message, type === 'error');
    }

    async saveRecentRoom(roomCode, role = 'player') {
        const user = authManager.currentUser;
        if (!user) return;
        try {
            const recentRef = ref(db, `users/${user.uid}/recent_rooms/${roomCode}`);
            const roomSnap = await get(ref(db, `rooms/${roomCode}`));
            let hostName = 'Unknown';
            if (roomSnap.exists()) {
                const roomData = roomSnap.val();
                if (roomData.players && roomData.hostId && roomData.players[roomData.hostId]) {
                    hostName = roomData.players[roomData.hostId].name;
                }
            }
            await set(recentRef, {
                joinedAt: Date.now(),
                role: role,
                hostName: hostName
            });
            this.enforceRecentRoomsLimit(user.uid);
        } catch (e) {
            console.error('[MULTIPLAYER] Error saving recent room:', e);
        }
    }

    async enforceRecentRoomsLimit(uid) {
        // Keep only last 20
        const recentRef = ref(db, `users/${uid}/recent_rooms`);
        const snapshot = await get(recentRef);
        if (snapshot.exists()) {
            const rooms = [];
            snapshot.forEach(child => {
                rooms.push({ key: child.key, ...child.val() });
            });
            if (rooms.length > 20) {
                rooms.sort((a, b) => b.joinedAt - a.joinedAt);
                for (let i = 20; i < rooms.length; i++) {
                    remove(ref(db, `users/${uid}/recent_rooms/${rooms[i].key}`));
                }
            }
        }
    }

    listenToRecentRooms() {
         const user = authManager.currentUser;
         if (!user) return;
         
         const recentRoomsQuery = query(ref(db, `users/${user.uid}/recent_rooms`), limitToLast(20));
         onValue(recentRoomsQuery, (snapshot) => {
             const list = document.getElementById('recent-rooms-list');
             if (!list) return;

             if (snapshot.exists()) {
                 const rooms = [];
                 snapshot.forEach(child => {
                     rooms.push({ code: child.key, ...child.val() });
                 });
                 rooms.sort((a, b) => b.joinedAt - a.joinedAt);

                 list.innerHTML = rooms.map(r => `
                  <button onclick="document.getElementById('room-code-input').value = '${r.code}'" class="room-option w-full bg-surface-container-low hover:bg-surface-variant p-3 text-left border border-outline-variant transition-colors step-animation flex justify-between items-center">
                    <div>
                      <div class="font-bold text-[#5bf083] font-headline tracking-widest text-lg">${r.code}</div>
                      <div class="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Hosted by ${r.hostName || 'Unknown'}</div>
                    </div>
                    <div class="text-[10px] text-secondary border border-secondary px-2 py-1 uppercase">${r.role || 'Player'}</div>
                  </button>
                 `).join('');
             } else {
                 list.innerHTML = '<div class="text-center text-[10px] text-slate-400 py-4">No recent rooms</div>';
             }
         });

         // Also populate the Load Game modal whenever auth is available
         this.loadSavedGames();
    }

    async saveGameToFirebase() {
        const user = authManager.currentUser;
        if (!user) { this.showNotification('You must be logged in to save', 'error'); return; }
        if (!this.roomCode || this.mode !== 'playing') { this.showNotification('No active game to save', 'error'); return; }
        try {
            const state = this.serializeGameState();
            const gs = this.arena.gs;
            const playerNames = (gs.players || []).map(p => p.name).filter(Boolean);
            const pokemonNames = (gs.players || []).map(p => p.team?.[0]?.name || p.team?.[0]?.species || null).filter(Boolean);
            await set(ref(db, `users/${user.uid}/saved_games/${this.roomCode}`), {
                snapshot: state,
                savedAt: Date.now(),
                roomCode: this.roomCode,
                round: gs.round || 1,
                playerCount: (gs.players || []).length,
                playerNames,
                pokemonNames,
                savedByName: user.displayName || user.email || 'Trainer'
            });
            this.showNotification('Game saved to cloud!', 'success');
            this.arena.log.add('💾 Game state saved to cloud.', 'system');
        } catch (err) {
            console.error('[MULTIPLAYER] Error saving game to Firebase:', err);
            this.showNotification('Save failed — see console', 'error');
        }
    }

    loadSavedGames() {
        const user = authManager.currentUser;
        if (!user) return;
        const savedQuery = query(ref(db, `users/${user.uid}/saved_games`), limitToLast(20));
        onValue(savedQuery, (snapshot) => {
            const list = document.getElementById('load-game-list');
            if (!list) return;
            if (!snapshot.exists()) {
                list.innerHTML = '<div class="text-center text-[10px] text-slate-400 py-8 col-span-2">No saved games found</div>';
                return;
            }
            const saves = [];
            snapshot.forEach(child => saves.push({ key: child.key, ...child.val() }));
            saves.sort((a, b) => b.savedAt - a.savedAt);
            list.innerHTML = saves.map(s => {
                const date = new Date(s.savedAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                const pokemon = (s.pokemonNames || []).slice(0, 4).join(', ') || 'Unknown team';
                const players = (s.playerNames || []).join(' vs ') || 'Unknown players';
                return `
                    <button onclick="window.arena?.multiplayer?.loadAndResume('${s.roomCode}')"
                        class="load-save-card w-full text-left bg-surface-container-low hover:bg-surface-variant border border-outline-variant p-4 step-animation transition-colors group">
                        <div class="flex justify-between items-start mb-2">
                            <div class="font-headline text-[#5bf083] text-xl tracking-widest">${s.roomCode}</div>
                            <div class="text-[9px] text-slate-500 uppercase tracking-wider border border-outline-variant px-2 py-1">Round ${s.round || 1}</div>
                        </div>
                        <div class="text-[11px] font-bold text-white mb-1">${players}</div>
                        <div class="text-[10px] text-slate-400 mb-2">${pokemon}</div>
                        <div class="flex justify-between items-center">
                            <div class="text-[9px] text-slate-500 uppercase tracking-wider">${date}</div>
                            <div class="text-[9px] text-[#5bf083] uppercase tracking-wider border border-[#004a1d] bg-[#004a1d]/30 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">RESUME →</div>
                        </div>
                    </button>`;
            }).join('');
        });
    }

    async loadAndResume(roomCode) {
        const user = authManager.currentUser;
        if (!user) { this.showNotification('You must be logged in to load', 'error'); return; }
        const name = this.playerName || user.displayName || user.email || 'Trainer';
        try {
            const saveSnap = await get(ref(db, `users/${user.uid}/saved_games/${roomCode}`));
            if (!saveSnap.exists()) { this.showNotification('Save data not found', 'error'); return; }
            const snapshot = saveSnap.val().snapshot;
            const roomSnap = await get(ref(db, `rooms/${roomCode}`));
            if (roomSnap.exists() && roomSnap.val().status === 'playing') {
                this.showNotification('Reconnecting to live room...', 'info');
                await this.joinRoom(roomCode, name);
                setTimeout(async () => {
                    try {
                        this.deserializeGameState(snapshot);
                        await set(ref(db, `rooms/${roomCode}/state`), { ...snapshot, _sender: this.playerId });
                        this.arena.renderer.renderAll();
                        this.showNotification('Save loaded — continued from Round ' + (snapshot.round || 1), 'success');
                        this.arena.log.add(`💾 Resumed from save (Round ${snapshot.round || 1}).`, 'system');
                    } catch (e) { console.error('[MULTIPLAYER] Error pushing saved state:', e); }
                }, 2000);
            } else {
                this.showNotification('Room offline. Restoring last save locally...', 'info');
                this.mode = 'playing';
                this.roomCode = roomCode;
                document.getElementById('load-modal')?.classList.remove('visible');
                const lobbyView = document.getElementById('lobby-view');
                const arenaView = document.getElementById('arena-view');
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) loadingScreen.classList.remove('hidden');
                setTimeout(() => {
                    if (lobbyView) lobbyView.classList.add('hidden');
                    if (arenaView) arenaView.classList.remove('hidden');
                    if (loadingScreen) loadingScreen.classList.add('hidden');
                    this.deserializeGameState(snapshot);
                    this.arena.renderer.renderAll();
                    this.arena.log.add(`💾 Loaded offline save from room ${roomCode} (Round ${snapshot.round || 1}).`, 'system');
                    this.showNotification('Save loaded (offline mode)!', 'success');
                }, 1500);
            }
        } catch (err) {
            console.error('[MULTIPLAYER] Error in loadAndResume:', err);
            this.showNotification('Load failed — see console', 'error');
        }
    }
}

