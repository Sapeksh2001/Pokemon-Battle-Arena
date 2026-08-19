import { Player } from '../models/Player.js';
import { Pokemon } from '../models/Pokemon.js';
import { 
    ref as dbRef, set, get, onValue, off, push, update, remove, 
    serverTimestamp, onDisconnect, query, limitToLast, onChildAdded, orderByChild
} from "firebase/database";

let activeRoomCode = null;
let activeRoomId = null;

export function setActiveRoom(code, id) {
    activeRoomCode = code;
    activeRoomId = id;
}

function ref(db, path) {
    if (!path) return dbRef(db, path);
    let cleanPath = path.trim();
    if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1);
    }
    let resolvedPath = cleanPath;
    if (activeRoomCode && activeRoomId) {
        const codeStr = String(activeRoomCode);
        const idStr = String(activeRoomId);
        if (cleanPath.startsWith(`rooms/${codeStr}`)) {
            resolvedPath = cleanPath.replace(`rooms/${codeStr}`, `rooms/${idStr}`);
        }
    }
    return dbRef(db, resolvedPath);
}
import { db } from '../../firebase.js';
import { authManager } from './authManager.js';
import { normalizeTier } from '../utils/helpers.js';

function generateRoomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}



function generatePlayerId() {
    try {
        const saved = sessionStorage.getItem('pba_playerId');
        if (saved) return saved;
        const newId = Math.random().toString(36).substring(2, 10);
        sessionStorage.setItem('pba_playerId', newId);
        return newId;
    } catch (e) {
        console.warn('[Multiplayer] sessionStorage not available, using in-memory ID');
        return Math.random().toString(36).substring(2, 10);
    }
}

function getObjectDiff(oldObj, newObj, prefix = '') {
    const diff = {};
    
    function compare(oldVal, newVal, path) {
        if (oldVal === newVal) return;
        
        // If either is not an object or is null, it's a replacement
        if (oldVal === null || newVal === null || typeof oldVal !== 'object' || typeof newVal !== 'object') {
            diff[path] = newVal;
            return;
        }
        
        // Array comparison: if lengths differ or they are arrays of primitives, just replace.
        if (Array.isArray(oldVal) || Array.isArray(newVal)) {
            if (!Array.isArray(oldVal) || !Array.isArray(newVal) || oldVal.length !== newVal.length) {
                diff[path] = newVal;
            } else {
                for (let i = 0; i < newVal.length; i++) {
                    compare(oldVal[i], newVal[i], `${path}/${i}`);
                }
            }
            return;
        }
        
        // Object comparison
        const oldKeys = Object.keys(oldVal);
        const newKeys = Object.keys(newVal);
        
        for (const key of newKeys) {
            compare(oldVal[key], newVal[key], path ? `${path}/${key}` : key);
        }
        for (const key of oldKeys) {
            if (!(key in newVal)) {
                diff[path ? `${path}/${key}` : key] = null; // deleted
            }
        }
    }
    
    compare(oldObj, newObj, prefix);
    return diff;
}

export class MultiplayerManager {
    constructor(arena) {
        this.arena = arena;
        this.roomCode = null;
        this.roomId = null;
        this.playerId = generatePlayerId();
        this.playerName = '';
        this.isHost = false;
        this.isConnected = true; 
        this.mode = 'offline'; 
        this.unsubscribes = [];
        this.lastSentState = null;

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
        this.connect();
    }

    getRoomRef(subPath = '') {
        const id = this.roomId || this.roomCode;
        return ref(db, subPath ? `rooms/${id}/${subPath}` : `rooms/${id}`);
    }

    /**
     * Instantly starts a local battle with 6 prepopulated teams (Ash, Misty, etc.)
     * This bypasses the multiplayer room creation for testing and quick play.
     */
    async quickBattle(settings = {}) {
        console.log('[MULTIPLAYER] Starting Quick Battle...', settings);
        this.mode = 'offline';
        
        if (this.arena?.log) {
            this.arena.log.reset();
        }

        const headerEl = document.getElementById('battle-log-header');
        if (headerEl) {
            headerEl.textContent = 'Battle Log (Offline)';
        }

        // Ensure database is fully loaded before trying to prepopulate teams
        if (this.arena && typeof this.arena.ensureDatabaseLoaded === 'function') {
            await this.arena.ensureDatabaseLoaded();
        }

        const playerCount = settings.playerCount || 6;
        const pokemonCount = settings.pokemonCount || 6;

        // 1. Prepopulate the arena with dummy data
        if (typeof this.arena._prepopulate === 'function') {
            this.arena._prepopulate(settings.selectedTiers, playerCount, pokemonCount);
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
        authManager.subscribe((user) => {
            if (user) {
                this.listenToRecentRooms();
                this.loadSavedGames();
            }
        });
    }

    disconnect() {
        this.leaveRoom();
    }

    _getFlattenedPool() {
        if (typeof window.MergedPokemonData === 'undefined') return [];
        const flat = [];
        
        const recurse = (obj, parentTier) => {
            // Data uses 'Name' (capital N)
            const name = obj.Name || obj.name;
            const tier = normalizeTier(obj.Tier || obj.tier) || parentTier;
            if (name) {
                if (!flat.some(p => (p.Name || p.name) === name)) {
                    flat.push({ ...obj, _computedTier: tier });
                }
            }
            if (obj.evolutions && Array.isArray(obj.evolutions)) {
                obj.evolutions.forEach(e => recurse(e, tier));
            }
            if (obj.forms) {
                if (Array.isArray(obj.forms)) {
                    obj.forms.forEach(f => recurse(f, tier));
                } else if (typeof obj.forms === 'object') {
                    Object.values(obj.forms).forEach(f => recurse(f, tier));
                }
            }
        };

        Object.values(window.MergedPokemonData).forEach(p => recurse(p, p.Tier || p.tier));
        console.log('[Multiplayer] Pool size:', flat.length);
        return flat;
    }

    async createRoom(trainerName, settings = {}) {
        if (!trainerName) return;

        // Ensure Pokémon database is loaded before entering lobby
        if (this.arena && typeof this.arena.ensureDatabaseLoaded === 'function') {
            await this.arena.ensureDatabaseLoaded();
        }
        
        if (this.arena?.log) {
            this.arena.log.reset();
        }

        const roomCode = Math.floor(100000 + Math.random() * 900000).toString();
        const roomId = roomCode;

        this.roomCode = roomCode;
        this.roomId = roomId;
        this.isHost = true;
        this.trainerName = trainerName;
        this.lastPlayers = [];
        setActiveRoom(roomCode, roomId);

        const roomRef = ref(db, `rooms/${roomId}`);
        const playerRef = ref(db, `rooms/${roomId}/players/${this.playerId}`);
        const aliasRef = ref(db, `roomAliases/${roomCode}`);

        await set(aliasRef, roomId);

        await set(roomRef, {
            createdAt: Date.now(),
            hostId: this.playerId,
            hostUid: authManager.currentUser?.uid || null,
            status: 'lobby',
            aliasCode: roomCode,
            settings: {
                roomName: settings.roomName || 'Epic Battle Room',
                maxPlayers: settings.maxPlayers || 2,
                battleType: settings.battleType || 'singles',
                selectedTiers: settings.selectedTiers || ['Basic', 'Final'],
                initialPokemonCount: settings.initialPokemonCount || 6,
                teamAssignmentMode: settings.teamAssignmentMode || 'manual'
            }
        });

        await set(playerRef, {
            name: trainerName,
            uid: authManager.currentUser?.uid || null,
            isHost: true,
            isReady: false
        });

        onDisconnect(playerRef).remove();
        onDisconnect(aliasRef).remove();
        onDisconnect(roomRef).update({ hostDisconnected: true });

        this.showNotification(`Room created: ${roomCode}`, 'success');
        this.saveRecentRoom(roomCode, 'host');
        this._recordJoinedGame();
        this.isHost = true;
        this.mode = 'lobby';
        this.showRoomLobby();
        this._listenToLobby();
        return roomCode;
    }

    async joinRoom(roomCode, playerName, role = 'player') {
        this.playerName = playerName;
        this.lastPlayers = [];
        if (this.arena?.log) {
            this.arena.log.reset();
        }

        let roomId = roomCode;
        const aliasSnap = await get(ref(db, `roomAliases/${roomCode}`));
        if (aliasSnap.exists()) {
            roomId = aliasSnap.val();
        }

        this.roomId = roomId;
        this.roomCode = roomCode;
        setActiveRoom(roomCode, roomId);

        const roomRef = ref(db, `rooms/${roomId}`);
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

        if (roomData.hostId === this.playerId) {
            this.isHost = true;
            this.showNotification('Rejoined as Host', 'success');
        } else {
            this.isHost = false;
        }
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
        const playerRef = ref(db, `rooms/${roomId}/${path}/${this.playerId}`);
        await set(playerRef, {
            name: playerName,
            uid: authManager.currentUser?.uid || null,
            isHost: this.isHost,
            isReady: false,
            joinedAt: Date.now()
        });

        onDisconnect(playerRef).remove();

        this.showNotification(`Joined room securely as ${selectedRole}`, 'success');
        this.saveRecentRoom(roomCode, selectedRole);
        this._recordJoinedGame();

        if (roomData.status === 'playing') {
             this._listenToLobby();
             this._onGameStarted();
        } else {
             this.showRoomLobby();
             this._listenToLobby();
        }
    }

    leaveRoom() {
        const targetId = this.roomId || this.roomCode;
        if (targetId) {
            // Clean up from whichever path we joined under
            const path = this._entryPath || (this.isSpectator ? 'spectators' : 'players');
            const playerRef = ref(db, `rooms/${targetId}/${path}/${this.playerId}`);
            remove(playerRef);

            this.unsubscribes.forEach(unsub => unsub());
            this.unsubscribes = [];
        }
        this.roomCode = null;
        this.roomId = null;
        this.isHost = false;
        this.mode = 'offline';
        this.isSpectator = false;
        this._entryPath = null;
        setActiveRoom(null, null);
        // Dismiss lingering wildcard queue overlay if present
        const queueEl = document.getElementById('wildcard-queue');
        if (queueEl) queueEl.remove();
        this.arena.modals.close('multiplayerLobby');
        const event = new CustomEvent('arena:lobby', {
            detail: {
                open: false,
                players: [],
                roomCode: null,
                isHost: false
            }
        });
        window.dispatchEvent(event);
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

        const roomSnap = await get(ref(db, `rooms/${this.roomCode}`));
        const settings = roomSnap.exists() ? roomSnap.val().settings : null;
        const initialPokemonCount = settings?.initialPokemonCount || 6;
        const mode = settings?.teamAssignmentMode || 'random';

        // Fetch all players from Lobby and populate gs.players first
        const playersRef = ref(db, `rooms/${this.roomCode}/players`);
        const snapshot = await get(playersRef);
        if (snapshot.exists()) {
            const players = [];

            // Get full pool for rolling
            const fullPool = this._getFlattenedPool();
            const selectedTiers = settings?.selectedTiers || ['any'];
            let pool = fullPool;
            if (selectedTiers.length > 0 && !selectedTiers.includes('any')) {
                pool = fullPool.filter(p => selectedTiers.includes(p._computedTier));
            }
            if (pool.length === 0) pool = fullPool;

            snapshot.forEach(child => {
                const data = child.val();
                const p = new Player(child.key, data.name, initialPokemonCount);
                if (mode === 'random') {
                    const assignedPokemon = {};
                    for (let i = 0; i < initialPokemonCount; i++) {
                        const rolled = pool[Math.floor(Math.random() * pool.length)];
                        const pokeName = rolled.Name || rolled.name;
                        assignedPokemon[i] = pokeName;
                        const result = this.arena.db.find(pokeName);
                        if (result) {
                            p.team[i] = new Pokemon(result.foundNode, result.baseNode);
                        }
                    }
                    update(ref(db, `rooms/${this.roomCode}/players/${child.key}`), {
                        assignedPokemon,
                        isReady: true
                    });
                } else {
                    if (data.assignedPokemon && window.MergedPokemonData) {
                        for (let i = 0; i < initialPokemonCount; i++) {
                            const pokeId = data.assignedPokemon[i];
                            if (pokeId) {
                                const result = this.arena.db.find(pokeId);
                                if (result) {
                                    p.team[i] = new Pokemon(result.foundNode, result.baseNode);
                                }
                            }
                        }
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
        const settingsRef = ref(db, `rooms/${this.roomCode}/settings`);
        const unsubSettings = onValue(settingsRef, (snapshot) => {
            if (snapshot.exists()) {
                this.roomSettings = snapshot.val();
                this.initialPokemonCount = this.roomSettings.initialPokemonCount || 6;
                this.teamAssignmentMode = this.roomSettings.teamAssignmentMode || 'random';
                if (this.mode !== 'playing') {
                    this.updateRoomUI({ players: this.lastPlayers || [] });
                }
            }
        });

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
                    if (p.assignedPokemon) {
                        const exists = this.arena.gs.players.find(sp => sp.id === p.id);
                        if (!exists) {
                            const newPlayer = new Player(p.id, p.name, this.initialPokemonCount || 6);
                            for (let i = 0; i < (this.initialPokemonCount || 6); i++) {
                                const pokeId = p.assignedPokemon[i];
                                if (pokeId) {
                                    const result = this.arena.db.find(pokeId);
                                    if (result) {
                                        newPlayer.team[i] = new Pokemon(result.foundNode, result.baseNode);
                                    }
                                }
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

        this.unsubscribes.push(unsubPlayers, unsubStatus, unsubSettings);
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

        const event = new CustomEvent('arena:lobby', {
            detail: {
                open: false,
                players: [],
                roomCode: null,
                isHost: false
            }
        });
        window.dispatchEvent(event);

        const lobbyView = document.getElementById('lobby-view');
        const arenaView = document.getElementById('arena-view');
        const loadingScreen = document.getElementById('loading-screen');

        if (loadingScreen) loadingScreen.classList.remove('hidden');

        setTimeout(() => {
            if (lobbyView) lobbyView.classList.add('hidden');
            if (arenaView) arenaView.classList.remove('hidden');
            if (loadingScreen) loadingScreen.classList.add('hidden');

            const headerEl = document.getElementById('battle-log-header');
            if (headerEl && this.roomCode) {
                headerEl.textContent = `Battle Log (${this.roomCode})`;
            }

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
        this.hasLoadedInitialState = false;
        const unsubState = onValue(stateRef, (snapshot) => {
            if (snapshot.exists()) {
                const state = snapshot.val();
                if (state._sender === this.playerId) {
                    this.hasLoadedInitialState = true;
                } else {
                    this.receiveGameState(state);
                    this.hasLoadedInitialState = true;
                }
            }
        });

        const listenTime = Date.now();
        const actionsRef = ref(db, `rooms/${this.roomCode}/actions`);
        const unsubActions = onChildAdded(actionsRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.sender !== this.playerId && data.timestamp > listenTime) {
                this.handleRemoteAction(data.action, data.payload);
            }
        });

        this.unsubscribes.push(unsubState, unsubActions);
    }

    sendGameState() {
        const targetId = this.roomId || this.roomCode;
        if (!targetId || this.mode !== 'playing') return;
        try {
            const state = this.serializeGameState();
            state._sender = this.playerId; 
            const stateRef = ref(db, `rooms/${targetId}/state`);
            
            if (this.lastSentState) {
                const diff = getObjectDiff(this.lastSentState, state);
                if (Object.keys(diff).length > 0) {
                    diff["_sender"] = this.playerId;
                    update(stateRef, diff);
                }
            } else {
                set(stateRef, state);
            }
            this.lastSentState = state;
        } catch (err) {
            console.error('[MULTIPLAYER] Error serializing game state:', err);
        }
    }

    receiveGameState(state) {
        try {
            this.deserializeGameState(state);
            this.lastSentState = state;
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
                    const recentEntries = this.arena.log._buffer.toArray().slice(-5);
                    const alreadyExists = recentEntries.some(e => e.message === payload.message);
                    if (!alreadyExists) {
                        this.arena.log._buffer.push(payload);
                        this.arena.log._render();
                    }
                }
                break;
            case 'attack':
                if (payload) {
                    this.arena.battleController.handleAttack(payload.attackType, payload);
                }
                break;
            case 'hp_change':
                if (payload) {
                    const p = this.arena.gs.players.find(pl => pl.id === payload.playerId);
                    const poke = p?.team[payload.slotId];
                    if (poke) {
                        this.arena.battleController._applyHPChange(poke, payload.playerId, payload.newHP, payload.source, true);
                    }
                }
                break;
            case 'status_toggle':
                if (payload) {
                    this.arena.toggleStatus(null, payload);
                }
                break;
            case 'stat_update':
                if (payload) {
                    this.arena.handleStatUpdate(payload);
                }
                break;
            case 'switch_pokemon':
                if (payload) {
                    this.arena._switchActivePokemon(payload.playerId, payload.slotId, payload.fromModal, true);
                }
                break;
            case 'evolve':
                if (payload) {
                    this.arena._confirmEvolution(payload.evolutionName, payload.playerId, payload.slotId, true);
                }
                break;
            case 'devolve':
                if (payload) {
                    this.arena._confirmDevolution(payload.parentName, payload.playerId, payload.slotId, true);
                }
                break;
            case 'trade_pokemon':
                if (payload) {
                    const p = this.arena.gs.players.find(pl => pl.id === payload.playerId);
                    const result = this.arena.db.find(payload.newPokemonName);
                    if (p && result) {
                        const newPoke = new Pokemon(result.foundNode, result.baseNode);
                        p.setSlot(payload.slotId, newPoke);
                        this.arena.log.add(`${p.name} traded ${payload.oldPokemonName} for ${newPoke.fullName}!`, 'system');
                        this.arena.renderer.renderAll();
                    }
                }
                break;
            case 'form_change':
                if (payload) {
                    this.arena._confirmFormChange(payload.formName, payload.playerId, payload.slotId, true);
                }
                break;
            case 'cycle_weather':
                if (payload) {
                    this.arena.cycleWeather(true);
                }
                break;
            case 'end_round':
                this.arena.battleController.endRound(true);
                break;
            case 'player_add':
                if (payload) {
                    const alreadyInGame = this.arena.gs.players.find(sp => sp.id === payload.id);
                    if (!alreadyInGame) {
                        const newPlayer = new Player(payload.id, payload.name, payload.serializedTeam ? payload.serializedTeam.length : (payload.serializedPokemon ? 1 : 6));
                        if (payload.serializedTeam) {
                            payload.serializedTeam.forEach((t, i) => {
                                if (t) newPlayer.team[i] = Pokemon.fromJSON(t, this.arena.db);
                            });
                        } else if (payload.serializedPokemon) {
                            newPlayer.team[0] = Pokemon.fromJSON(payload.serializedPokemon, this.arena.db);
                        }
                        this.arena.gs.players.push(newPlayer);
                        this.arena.log.add(`⚡ ${payload.name} entered the battle!`, 'system');
                        this.arena.renderer.renderAll();
                    }
                }
                break;
            case 'player_remove':
                if (payload) {
                    const exists = this.arena.gs.players.find(sp => sp.id === payload.playerId);
                    if (exists) {
                        this.arena.gs.players = this.arena.gs.players.filter(sp => sp.id !== payload.playerId);
                        ['activeTurnPlayerId', 'selectedAttackTargetId', 'selectedStatusTargetId'].forEach(key => {
                            if (this.arena.gs[key] === payload.playerId) this.arena.gs[key] = null;
                        });
                        this.arena.log.add(`${exists.name} has been removed from the battle.`, 'system');
                        this.arena.renderer.renderAll();
                    }
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
            weather: gs.weather || 'none',
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
        gs.weather = state.weather || 'none';
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

        const event = new CustomEvent('arena:lobby', {
            detail: {
                open: true,
                players: this.lastPlayers || [],
                roomCode: this.roomCode,
                isHost: this.isHost,
                initialPokemonCount: this.initialPokemonCount || 6,
                teamAssignmentMode: this.teamAssignmentMode || 'random'
            }
        });
        window.dispatchEvent(event);

        // Expose assignment methods globally so inline onclick survives React re-renders
        window._mpRng = (pid) => {
            console.log('[Multiplayer] RNG clicked', pid);
            this.assignRandomPokemon(pid).catch(err => this.showNotification('RNG Error: ' + err.message, 'error'));
        };
        window._mpPick = (pid) => {
            console.log('[Multiplayer] PICK clicked', pid);
            this.assignSpecificPokemon(pid).catch(err => this.showNotification('PICK Error: ' + err.message, 'error'));
        };
        window._mpRngSlot = (pid, idx) => {
            console.log('[Multiplayer] RNG slot clicked', pid, idx);
            this.assignRandomPokemonSlot(pid, idx).catch(err => this.showNotification('RNG Slot Error: ' + err.message, 'error'));
        };
        window._mpPickSlot = (pid, idx) => {
            console.log('[Multiplayer] PICK slot clicked', pid, idx);
            this.assignSpecificPokemonSlot(pid, idx).catch(err => this.showNotification('PICK Slot Error: ' + err.message, 'error'));
        };
        window._mpClearSlot = (pid, idx) => {
            console.log('[Multiplayer] CLEAR slot clicked', pid, idx);
            this.clearPokemonSlot(pid, idx).catch(err => this.showNotification('CLEAR Slot Error: ' + err.message, 'error'));
        };
        window._mpSetAssignmentMode = (mode) => {
            console.log('[Multiplayer] Set assignment mode clicked', mode);
            this.setTeamAssignmentMode(mode).catch(err => this.showNotification('Set Mode Error: ' + err.message, 'error'));
        };
    }

    async setTeamAssignmentMode(mode) {
        if (!this.isHost || !this.roomCode) return;
        this.teamAssignmentMode = mode;
        const settingsRef = ref(db, `rooms/${this.roomCode}/settings`);
        await update(settingsRef, { teamAssignmentMode: mode });
        this.updateRoomUI({ players: this.lastPlayers || [] });
    }

    async assignRandomPokemon(targetPlayerId) {
        console.log('[Multiplayer] assignRandomPokemon triggered', targetPlayerId, 'isHost:', this.isHost, 'room:', this.roomCode);
        if (!this.isHost || !this.roomCode) {
            console.log('[Multiplayer] Aborting RNG - Not host or no roomcode');
            return;
        }

        // Ensure database is loaded before accessing pool
        if (this.arena && typeof this.arena.ensureDatabaseLoaded === 'function') {
            await this.arena.ensureDatabaseLoaded();
        }

        const fullPool = this._getFlattenedPool();
        if (fullPool.length === 0) {
            console.log('[Multiplayer] fullPool is empty even after ensureDatabaseLoaded');
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
            pool = fullPool.filter(p => selectedTiers.includes(p._computedTier));
        }

        if (pool.length === 0) {
            this.showNotification('No Pokémon found for the selected tiers!', 'error');
            return;
        }

        // Gather already-assigned IDs across all players
        const playersSnap = await get(ref(db, `rooms/${this.roomCode}/players`));
        const assignedIds = [];
        if (playersSnap.exists()) {
            playersSnap.forEach(snap => {
                const p = snap.val();
                if (p.assignedPokemon) {
                    Object.values(p.assignedPokemon).forEach(pokeId => {
                        if (pokeId) assignedIds.push(pokeId);
                    });
                }
            });
        }

        // Filter out already assigned
        const availablePool = pool.filter(p => !assignedIds.includes(p.Name || p.name));
        const selectionSource = availablePool.length > 0 ? availablePool : pool;
        
        const queueSnap = await get(ref(db, `rooms/${this.roomCode}/entryQueue/${targetPlayerId}`));
        if (queueSnap.exists()) {
            // Wildcard mid-game join: promote from entryQueue → players
            const playerData = queueSnap.val();

            // Calculate max team size of any existing player
            const existingPlayers = this.arena.gs.players;
            let maxPokeCount = 0;
            existingPlayers.forEach(p => {
                const count = p.team.filter(poke => poke !== null && poke !== undefined).length;
                if (count > maxPokeCount) {
                    maxPokeCount = count;
                }
            });
            if (maxPokeCount === 0) maxPokeCount = this.initialPokemonCount || 6;

            // Calculate average HP percent, floor any pokemon's HP percentage to min 30% (0.3)
            let totalPercentage = 0;
            let totalPokeCount = 0;
            existingPlayers.forEach(p => {
                p.team.forEach(poke => {
                    if (poke) {
                        let percent = poke.currentHP / poke.maxHp;
                        if (percent <= 0.3) {
                            percent = 0.3;
                        }
                        totalPercentage += percent;
                        totalPokeCount++;
                    }
                });
            });
            const avgPercent = totalPokeCount > 0 ? (totalPercentage / totalPokeCount) : 1.0;

            const assignedPokemon = {};
            for (let i = 0; i < maxPokeCount; i++) {
                const rolled = selectionSource[Math.floor(Math.random() * selectionSource.length)];
                assignedPokemon[i] = rolled.Name || rolled.name;
            }

            await set(ref(db, `rooms/${this.roomCode}/players/${targetPlayerId}`), {
                ...playerData,
                assignedPokemon,
                isReady: true
            });
            await remove(ref(db, `rooms/${this.roomCode}/entryQueue/${targetPlayerId}`));

            // Immediately add to local game state — don't wait for _listenToLobby callback
            const alreadyInGame = this.arena.gs.players.find(sp => sp.id === targetPlayerId);
            if (!alreadyInGame) {
                const newPlayer = new Player(targetPlayerId, playerData.name, maxPokeCount);
                for (let i = 0; i < maxPokeCount; i++) {
                    const pokeId = assignedPokemon[i];
                    const result = this.arena.db.find(pokeId);
                    if (result) {
                        const newPoke = new Pokemon(result.foundNode, result.baseNode);
                        newPoke.currentHP = Math.max(1, Math.floor(newPoke.maxHp * avgPercent));
                        newPlayer.team[i] = newPoke;
                    }
                }
                this.arena.gs.players.push(newPlayer);
                this.arena.log.add(`⚡ ${playerData.name} joined as wildcard!`, 'system');
                this.arena.renderer.renderAll();
                this.sendAction('player_add', {
                    id: targetPlayerId,
                    name: playerData.name,
                    serializedTeam: newPlayer.team.map(pt => pt ? pt.toJSON() : null)
                });
                this.sendGameState();
            }
        }
    }

    async assignSpecificPokemon(targetPlayerId) {
        console.log('[Multiplayer] assignSpecificPokemon triggered', targetPlayerId, 'isHost:', this.isHost, 'room:', this.roomCode);
        if (!this.isHost || !this.roomCode) {
            console.log('[Multiplayer] Aborting PICK - Not host or no roomcode');
            return;
        }

        // Ensure database is loaded before accessing pool
        if (this.arena && typeof this.arena.ensureDatabaseLoaded === 'function') {
            await this.arena.ensureDatabaseLoaded();
        }
        
        const titleEl = document.getElementById('selection-modal-title');
        if (titleEl) titleEl.textContent = 'Pick a Pokémon';
        
        const grid = document.getElementById('selection-grid');
        if (!grid) return;

        // Fetch tier filter from Firebase
        const roomSnap = await get(ref(db, `rooms/${this.roomCode}`));
        const settings = roomSnap.exists() ? roomSnap.val().settings : null;
        const selectedTiers = settings?.selectedTiers || [];
        const useTierFilter = selectedTiers.length > 0 && !selectedTiers.includes('any');
        const fullPool = this._getFlattenedPool();
        const filteredPool = useTierFilter ? fullPool.filter(p => selectedTiers.includes(p._computedTier)) : fullPool;
        const allowedNames = new Set(filteredPool.map(p => (p.Name || p.name)));
        const tierLabel = useTierFilter ? `Tiers: ${selectedTiers.join(', ')}` : 'All Tiers';

        // Build UI
        grid.innerHTML = `
            <div class="col-span-4 mb-3">
                <div style="font-size:9px;color:#facc15;text-transform:uppercase;letter-spacing:.12em;margin-bottom:6px;">${tierLabel}</div>
                <input type="text" id="pick-search-input"
                    style="width:100%;background:#0f172a;border:1px solid #334155;color:#fff;padding:8px 10px;font-size:11px;outline:none;letter-spacing:0.05em;box-sizing:border-box;"
                    placeholder="Search Pokémon...">
            </div>
            <div id="pick-grid-picker" class="col-span-4" style="
                display: none;
                grid-template-columns: repeat(4, 1fr);
                gap: 8px;
                max-height: 380px;
                overflow-y: auto;
                scrollbar-width: thin;
                scrollbar-color: #facc15 #0a1628;
                padding-right: 2px;
            "></div>
        `;
        
        this.arena.modals.open('selection');
        const searchInput = document.getElementById('pick-search-input');
        const gridPicker = document.getElementById('pick-grid-picker');
        
        setTimeout(() => searchInput.focus(), 100);
        
        const _refreshGrid = () => {
            const q = searchInput.value.trim();
            gridPicker.innerHTML = '';
            
            if (q.length === 0) {
                const allNamesArr = Array.from(allowedNames);
                const names = allNamesArr.slice(0, 500);
                if (names.length === 0) { gridPicker.style.display = 'none'; return; }
                gridPicker.style.display = 'grid';
                _renderCards(names);
                return;
            }

            if (q.length < 2) { gridPicker.style.display = 'none'; return; }
            const allMatches = this.arena.db.search(q, 200);
            const names = useTierFilter
                ? allMatches.filter(n => allowedNames.has(n)).slice(0, 40)
                : allMatches.slice(0, 40);
            if (names.length === 0) { gridPicker.style.display = 'none'; return; }
            gridPicker.style.display = 'grid';
            _renderCards(names);
        };

        const _renderCards = (names) => {
            names.forEach(name => {
                const item = this.arena.db.find(name);
                if (!item) return;
                const node = item.baseNode;
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
                    padding: 6px 4px 7px;
                    height: 88px;
                    transition: transform 0.2s, drop-shadow 0.2s;
                    overflow: visible;
                    width: 100%;
                    box-sizing: border-box;
                `;
                card.innerHTML = `
                    <img src="${node.sprite || ''}" alt="${name}"
                         style="width:52px;height:52px;object-fit:contain;image-rendering:pixelated;
                                filter:drop-shadow(0 0 3px rgba(250,204,21,0));transition:filter 0.15s;"
                         loading="lazy">
                    <span style="font-size:8px;color:#cbd5e1;text-align:center;width:100%;
                                  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
                                  line-height:1.2;margin-top:4px;font-family:monospace;">${name}</span>
                `;
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'scale(1.15)';
                    card.querySelector('img').style.filter = 'drop-shadow(0 0 10px rgba(250,204,21,0.8))';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'scale(1)';
                    card.querySelector('img').style.filter = 'drop-shadow(0 0 3px rgba(250,204,21,0))';
                });
                card.onclick = async () => {
                    this.arena.modals.close('selection');
                    const pokeName = name;
                    this.showNotification(`Assigned ${pokeName}!`, 'success');
                    
                    const queueSnap = await get(ref(db, `rooms/${this.roomCode}/entryQueue/${targetPlayerId}`));
                    if (queueSnap.exists()) {
                        const playerData = queueSnap.val();
                        const assignedPokemon = { 0: pokeName };
                        // Roll random for the remaining slots
                        for (let i = 1; i < (this.initialPokemonCount || 6); i++) {
                            const rolled = fullPool[Math.floor(Math.random() * fullPool.length)];
                            assignedPokemon[i] = rolled.Name || rolled.name;
                        }

                        await set(ref(db, `rooms/${this.roomCode}/players/${targetPlayerId}`), {
                            ...playerData,
                            assignedPokemon,
                            isReady: true
                        });
                        await remove(ref(db, `rooms/${this.roomCode}/entryQueue/${targetPlayerId}`));

                        const alreadyInGame = this.arena.gs.players.find(sp => sp.id === targetPlayerId);
                        if (!alreadyInGame) {
                            const newPlayer = new Player(targetPlayerId, playerData.name, this.initialPokemonCount || 6);
                            for (let i = 0; i < (this.initialPokemonCount || 6); i++) {
                                const pId = assignedPokemon[i];
                                const result = this.arena.db.find(pId);
                                if (result) {
                                    newPlayer.team[i] = new Pokemon(result.foundNode, result.baseNode);
                                }
                            }
                            this.arena.gs.players.push(newPlayer);
                            this.arena.log.add(`⚡ ${playerData.name} joined as wildcard with ${pokeName}!`, 'system');
                            this.arena.renderer.renderAll();
                            this.sendAction('player_add', {
                                id: targetPlayerId,
                                name: playerData.name,
                                serializedTeam: newPlayer.team.map(pt => pt ? pt.toJSON() : null)
                            });
                            this.sendGameState();
                        }
                    }
                };
                gridPicker.appendChild(card);
            });
        };

        searchInput.addEventListener('input', _refreshGrid);
        _refreshGrid();
    }

    async assignRandomPokemonSlot(targetPlayerId, slotIdx) {
        console.log('[Multiplayer] assignRandomPokemonSlot triggered', targetPlayerId, slotIdx, 'isHost:', this.isHost, 'room:', this.roomCode);
        if (!this.isHost || !this.roomCode) {
            console.log('[Multiplayer] Aborting RNG Slot - Not host or no roomcode');
            return;
        }

        // Ensure database is loaded before accessing pool
        if (this.arena && typeof this.arena.ensureDatabaseLoaded === 'function') {
            await this.arena.ensureDatabaseLoaded();
        }

        const fullPool = this._getFlattenedPool();
        if (fullPool.length === 0) {
            this.showNotification('Data loading... Please wait.', 'error');
            return;
        }

        // Read settings from Firebase for multi-tier selection
        const roomSnap = await get(ref(db, `rooms/${this.roomCode}`));
        const settings = roomSnap.exists() ? roomSnap.val().settings : null;
        const selectedTiers = settings?.selectedTiers || ['any'];

        // Build filtered pool
        let pool = fullPool;
        if (selectedTiers.length > 0 && !selectedTiers.includes('any')) {
            pool = fullPool.filter(p => selectedTiers.includes(p._computedTier));
        }

        if (pool.length === 0) {
            this.showNotification('No Pokémon found for the selected tiers!', 'error');
            return;
        }

        // Gather already-assigned IDs for this specific player to prevent duplicates in their own team
        const playerSnap = await get(ref(db, `rooms/${this.roomCode}/players/${targetPlayerId}`));
        const assignedIds = [];
        if (playerSnap.exists()) {
            const p = playerSnap.val();
            if (p.assignedPokemon) {
                Object.entries(p.assignedPokemon).forEach(([idx, pokeId]) => {
                    if (parseInt(idx) !== slotIdx && pokeId) {
                        assignedIds.push(pokeId);
                    }
                });
            }
        }

        // Filter out already assigned
        const availablePool = pool.filter(p => !assignedIds.includes(p.Name || p.name));
        const selectionSource = availablePool.length > 0 ? availablePool : pool;
        
        const rolled = selectionSource[Math.floor(Math.random() * selectionSource.length)];
        const pokeId = rolled.Name || rolled.name;
        this.showNotification(`Slot ${slotIdx + 1}: Assigned ${pokeId}!`, 'success');

        // Update Firebase
        const playerRef = ref(db, `rooms/${this.roomCode}/players/${targetPlayerId}`);
        const updatedSnap = await get(playerRef);
        if (updatedSnap.exists()) {
            const pData = updatedSnap.val();
            const assigned = pData.assignedPokemon ? { ...pData.assignedPokemon } : {};
            assigned[slotIdx] = pokeId;

            // Check if all slots are ready
            let allReady = true;
            if (this.teamAssignmentMode === 'manual') {
                allReady = !!assigned[0];
            } else {
                for (let i = 0; i < (this.initialPokemonCount || 6); i++) {
                    if (!assigned[i]) {
                        allReady = false;
                        break;
                    }
                }
            }

            await update(playerRef, {
                [`assignedPokemon/${slotIdx}`]: pokeId,
                isReady: allReady
            });
        }
    }

    async assignSpecificPokemonSlot(targetPlayerId, slotIdx) {
        console.log('[Multiplayer] assignSpecificPokemonSlot triggered', targetPlayerId, slotIdx, 'isHost:', this.isHost, 'room:', this.roomCode);
        if (!this.isHost || !this.roomCode) {
            console.log('[Multiplayer] Aborting PICK Slot - Not host or no roomcode');
            return;
        }

        // Ensure database is loaded before accessing pool
        if (this.arena && typeof this.arena.ensureDatabaseLoaded === 'function') {
            await this.arena.ensureDatabaseLoaded();
        }
        
        const titleEl = document.getElementById('selection-modal-title');
        if (titleEl) titleEl.textContent = `Pick Pokémon for Slot ${slotIdx + 1}`;
        
        const grid = document.getElementById('selection-grid');
        if (!grid) return;

        // Fetch tier filter from Firebase
        const roomSnap = await get(ref(db, `rooms/${this.roomCode}`));
        const settings = roomSnap.exists() ? roomSnap.val().settings : null;
        const selectedTiers = settings?.selectedTiers || [];
        const useTierFilter = selectedTiers.length > 0 && !selectedTiers.includes('any');
        const fullPool = this._getFlattenedPool();
        const filteredPool = useTierFilter ? fullPool.filter(p => selectedTiers.includes(p._computedTier)) : fullPool;
        const allowedNames = new Set(filteredPool.map(p => (p.Name || p.name)));
        const tierLabel = useTierFilter ? `Tiers: ${selectedTiers.join(', ')}` : 'All Tiers';

        // Build UI
        grid.innerHTML = `
            <div class="col-span-4 mb-3">
                <div style="font-size:9px;color:#facc15;text-transform:uppercase;letter-spacing:.12em;margin-bottom:6px;">${tierLabel}</div>
                <input type="text" id="pick-search-input"
                    style="width:100%;background:#0f172a;border:1px solid #334155;color:#fff;padding:8px 10px;font-size:11px;outline:none;letter-spacing:0.05em;box-sizing:border-box;"
                    placeholder="Search Pokémon...">
            </div>
            <div id="pick-grid-picker" class="col-span-4" style="
                display: none;
                grid-template-columns: repeat(4, 1fr);
                gap: 8px;
                max-height: 380px;
                overflow-y: auto;
                scrollbar-width: thin;
                scrollbar-color: #facc15 #0a1628;
                padding-right: 2px;
            "></div>
        `;
        
        this.arena.modals.open('selection');
        const searchInput = document.getElementById('pick-search-input');
        const gridPicker = document.getElementById('pick-grid-picker');
        
        setTimeout(() => searchInput.focus(), 100);
        
        const _refreshGrid = () => {
            const q = searchInput.value.trim();
            gridPicker.innerHTML = '';
            
            if (q.length === 0) {
                const allNamesArr = Array.from(allowedNames);
                const names = allNamesArr.slice(0, 500);
                if (names.length === 0) { gridPicker.style.display = 'none'; return; }
                gridPicker.style.display = 'grid';
                _renderCards(names);
                return;
            }

            if (q.length < 2) { gridPicker.style.display = 'none'; return; }
            const allMatches = this.arena.db.search(q, 200);
            const names = useTierFilter
                ? allMatches.filter(n => allowedNames.has(n)).slice(0, 40)
                : allMatches.slice(0, 40);
            if (names.length === 0) { gridPicker.style.display = 'none'; return; }
            gridPicker.style.display = 'grid';
            _renderCards(names);
        };

        const _renderCards = (names) => {
            names.forEach(name => {
                const item = this.arena.db.find(name);
                if (!item) return;
                const node = item.baseNode;
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
                    padding: 6px 4px 7px;
                    height: 88px;
                    transition: transform 0.2s, drop-shadow 0.2s;
                    overflow: visible;
                    width: 100%;
                    box-sizing: border-box;
                `;
                card.innerHTML = `
                    <img src="${node.sprite || ''}" alt="${name}"
                         style="width:52px;height:52px;object-fit:contain;image-rendering:pixelated;
                                filter:drop-shadow(0 0 3px rgba(250,204,21,0));transition:filter 0.15s;"
                         loading="lazy">
                    <span style="font-size:8px;color:#cbd5e1;text-align:center;width:100%;
                                  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
                                  line-height:1.2;margin-top:4px;font-family:monospace;">${name}</span>
                `;
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'scale(1.15)';
                    card.querySelector('img').style.filter = 'drop-shadow(0 0 10px rgba(250,204,21,0.8))';
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'scale(1)';
                    card.querySelector('img').style.filter = 'drop-shadow(0 0 3px rgba(250,204,21,0))';
                });
                card.onclick = async () => {
                    this.arena.modals.close('selection');
                    const pokeName = name;
                    this.showNotification(`Slot ${slotIdx + 1}: Assigned ${pokeName}!`, 'success');

                    const playerRef = ref(db, `rooms/${this.roomCode}/players/${targetPlayerId}`);
                    const updatedSnap = await get(playerRef);
                    if (updatedSnap.exists()) {
                        const pData = updatedSnap.val();
                        const assigned = pData.assignedPokemon ? { ...pData.assignedPokemon } : {};
                        assigned[slotIdx] = pokeName;

                        // Check if all slots are ready
                        let allReady = true;
                        if (this.teamAssignmentMode === 'manual') {
                            allReady = !!assigned[0];
                        } else {
                            for (let i = 0; i < (this.initialPokemonCount || 6); i++) {
                                if (!assigned[i]) {
                                    allReady = false;
                                    break;
                                }
                            }
                        }

                        await update(playerRef, {
                            [`assignedPokemon/${slotIdx}`]: pokeName,
                            isReady: allReady
                        });
                    }
                };
                gridPicker.appendChild(card);
            });
        };

        searchInput.addEventListener('input', _refreshGrid);
        _refreshGrid();
    }

    async clearPokemonSlot(targetPlayerId, slotIdx) {
        console.log('[Multiplayer] clearPokemonSlot triggered', targetPlayerId, slotIdx, 'isHost:', this.isHost, 'room:', this.roomCode);
        if (!this.isHost || !this.roomCode) {
            console.log('[Multiplayer] Aborting CLEAR Slot - Not host or no roomcode');
            return;
        }

        const playerRef = ref(db, `rooms/${this.roomCode}/players/${targetPlayerId}`);
        await update(playerRef, {
            [`assignedPokemon/${slotIdx}`]: null,
            isReady: false
        });
        this.showNotification(`Slot ${slotIdx + 1} cleared!`, 'info');
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
            ${waitingPlayers.map(p => `
                <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:6px 0;border-bottom:1px solid #1e293b;">
                    <span style="color:#fff;font-size:12px;">${p.name}</span>
                    <button onclick="window._mpRng('${p.id}')" class="wildcard-rng-btn"
                        style="background:#1e293b;border:1px solid #5bf083;color:#5bf083;font-size:9px;font-weight:700;letter-spacing:.08em;padding:3px 8px;cursor:pointer;text-transform:uppercase;"
                        onmouseover="this.style.background='#5bf083';this.style.color='#020617';"
                        onmouseout="this.style.background='#1e293b';this.style.color='#5bf083';"
                        data-pid="${p.id}">
                        RNG
                    </button>
                    <button onclick="window._mpPick('${p.id}')" class="wildcard-pick-btn"
                        style="background:#1e293b;border:1px solid #5bf083;color:#5bf083;font-size:9px;font-weight:700;letter-spacing:.08em;padding:3px 8px;cursor:pointer;text-transform:uppercase;margin-left:4px;"
                        onmouseover="this.style.background='#5bf083';this.style.color='#020617';"
                        onmouseout="this.style.background='#1e293b';this.style.color='#5bf083';"
                        data-pid="${p.id}">
                        PICK
                    </button>
                </div>
            `).join('')}
        `;

        // Use robust event delegation to bypass any DOM updates or re-render issues
        queueContainer.onclick = (e) => {
            const rngBtn = e.target.closest('.wildcard-rng-btn');
            const pickBtn = e.target.closest('.wildcard-pick-btn');
            if (rngBtn) {
                e.preventDefault();
                e.stopPropagation();
                const pid = rngBtn.getAttribute('data-pid');
                this.assignRandomPokemon(pid).catch(err => this.showNotification('RNG Error: ' + err.message, 'error'));
            } else if (pickBtn) {
                e.preventDefault();
                e.stopPropagation();
                const pid = pickBtn.getAttribute('data-pid');
                    this.assignSpecificPokemon(pid).catch(err => this.showNotification('PICK Error: ' + err.message, 'error'));
            }
        };
    }

    updateRoomUI(data) {
        this.lastPlayers = data.players || [];
        const event = new CustomEvent('arena:lobby', {
            detail: {
                open: true,
                players: this.lastPlayers,
                roomCode: this.roomCode,
                isHost: this.isHost,
                initialPokemonCount: this.initialPokemonCount || 6,
                teamAssignmentMode: this.teamAssignmentMode || 'random'
            }
        });
        window.dispatchEvent(event);

        const isManual = this.teamAssignmentMode === 'manual';
        
        const startBtn = document.getElementById('start-game-btn');
        if (startBtn) {
            startBtn.style.display = this.isHost ? 'block' : 'none';
            const minPlayers = data.players.length >= 2;
            let hasAllPokemon = true;
            if (isManual) {
                hasAllPokemon = data.players.every(p => p.assignedPokemon && p.assignedPokemon[0]);
            }
            if (!minPlayers || !hasAllPokemon) {
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
         
         const recentRoomsQuery = query(ref(db, `users/${user.uid}/recent_rooms`), orderByChild('joinedAt'), limitToLast(20));
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
    }

    async saveGameToFirebase() {
        const user = authManager.currentUser;
        if (!user) { this.showNotification('You must be logged in to save', 'error'); return; }
        if (!this.roomCode || this.mode !== 'playing') { this.showNotification('No active game to save', 'error'); return; }
        try {
            const state = this.serializeGameState();
            const gs = this.arena.gs;
            const playerNames = (gs.players || []).map(p => p.name).filter(Boolean);
            const pokemonNames = (gs.players || []).map(p => {
                const activeIndex = p.activePokemonIndex !== undefined ? p.activePokemonIndex : 0;
                const active = p.team?.[activeIndex] || p.team?.[0];
                return active?.name || active?.species || null;
            }).filter(Boolean);
            await set(ref(db, `users/${user.uid}/saved_games/${this.roomId || this.roomCode}`), {
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

    async _recordJoinedGame() {
        const user = authManager.currentUser;
        if (!user || !this.roomId) return;
        try {
            const saveRef = ref(db, `users/${user.uid}/saved_games/${this.roomId}`);
            const snap = await get(saveRef);
            const existing = snap.exists() ? snap.val() : {};
            await update(saveRef, {
                roomCode: this.roomCode || this.roomId,
                savedAt: Date.now(),
                isStarted: existing.isStarted || false,
                playerNames: existing.playerNames || [this.trainerName || this.playerName || user.displayName || 'Trainer']
            });
        } catch (e) {
            console.error('[MULTIPLAYER] Error recording joined game:', e);
        }
    }

    async toggleGameStarted(roomId, currentVal) {
        const user = authManager.currentUser;
        if (!user) return;
        try {
            if (!currentVal) {
                const savedSnap = await get(ref(db, `users/${user.uid}/saved_games`));
                if (savedSnap.exists()) {
                    let startedCount = 0;
                    savedSnap.forEach(child => {
                        if (child.val().isStarted) startedCount++;
                    });
                    if (startedCount >= 5) {
                        this.showNotification('You can only mark up to 5 rooms as started. Unmark one first.', 'error');
                        return;
                    }
                }
            }
            await update(ref(db, `users/${user.uid}/saved_games/${roomId}`), {
                isStarted: !currentVal
            });
            this.showNotification(!currentVal ? 'Room marked as started!' : 'Room unmarked.', 'success');
        } catch (e) {
            console.error('[MULTIPLAYER] Error toggling game started:', e);
        }
    }

    loadSavedGames() {
        const user = authManager.currentUser;
        if (!user) return;
        const savedQuery = query(ref(db, `users/${user.uid}/saved_games`), orderByChild('savedAt'));
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
            
            const startedGames = saves.filter(s => s.isStarted).slice(0, 5);
            const recentGames = saves.filter(s => !s.isStarted).slice(0, 20);

            let html = '';
            if (startedGames.length > 0) {
                html += `<div class="col-span-1 sm:col-span-2 mb-2">
                    <h3 class="text-xs font-bold text-[#5bf083] uppercase tracking-widest border-b border-outline-variant pb-1">Rooms Marked as Started (${startedGames.length}/5)</h3>
                </div>`;
                html += startedGames.map(s => this._renderSaveCard(s)).join('');
            }

            html += `<div class="col-span-1 sm:col-span-2 mt-4 mb-2">
                <h3 class="text-xs font-bold text-yellow-400 uppercase tracking-widest border-b border-outline-variant pb-1">Last 20 Multiplayer Games Joined</h3>
            </div>`;
            if (recentGames.length === 0) {
                html += '<div class="text-center text-[10px] text-slate-400 py-8 col-span-2">No recent games found</div>';
            } else {
                html += recentGames.map(s => this._renderSaveCard(s)).join('');
            }

            list.innerHTML = html;
        });
    }

    _renderSaveCard(s) {
        const date = new Date(s.savedAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        const pokemon = (s.pokemonNames || []).slice(0, 4).join(', ') || 'Team pending...';
        const players = (s.playerNames || []).join(' vs ') || 'Trainer';
        return `
            <div class="load-save-card w-full text-left bg-surface-container-low hover:bg-surface-variant border border-outline-variant p-4 step-animation transition-colors flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start mb-2">
                        <div class="font-headline text-[#5bf083] text-xl tracking-widest">${s.roomCode || s.key}</div>
                        <div class="flex gap-1">
                            <button onclick="window.arena?.multiplayer?.toggleGameStarted('${s.key}', ${!!s.isStarted})" class="text-[9px] font-bold ${s.isStarted ? 'bg-yellow-400 text-black border-white' : 'bg-surface-container text-slate-400 border-outline-variant hover:text-white'} border px-2 py-1 uppercase tracking-wider transition-all">
                                ${s.isStarted ? '★ STARTED' : 'MARK AS STARTED'}
                            </button>
                            <div class="text-[9px] text-slate-500 uppercase tracking-wider border border-outline-variant px-2 py-1">Round ${s.round || 1}</div>
                        </div>
                    </div>
                    <div class="text-[11px] font-bold text-white mb-1">${players}</div>
                    <div class="text-[10px] text-slate-400 mb-2">${pokemon}</div>
                </div>
                <div class="flex justify-between items-center mt-2 pt-2 border-t border-outline-variant/50">
                    <div class="text-[9px] text-slate-500 uppercase tracking-wider">${date}</div>
                    <button onclick="window.arena?.multiplayer?.loadAndResume('${s.roomCode || s.key}')" class="text-[9px] font-bold text-[#5bf083] uppercase tracking-wider border border-[#004a1d] bg-[#004a1d]/30 hover:bg-[#5bf083] hover:text-black px-3 py-1 transition-all">
                        RESUME →
                    </button>
                </div>
            </div>`;
    }

    async loadAndResume(roomCode) {
        const loadModal = document.getElementById('load-modal');
        if (loadModal) loadModal.classList.remove('active', 'visible');

        const user = authManager.currentUser;
        if (!user) { this.showNotification('You must be logged in to load', 'error'); return; }
        const name = this.playerName || user.displayName || user.email || 'Trainer';
        try {
            let roomId = roomCode;
            const aliasSnap = await get(dbRef(db, `roomAliases/${roomCode}`));
            if (aliasSnap.exists()) {
                roomId = aliasSnap.val();
            }

            const saveSnap = await get(dbRef(db, `users/${user.uid}/saved_games/${roomId}`));
            if (!saveSnap.exists()) { this.showNotification('Save data not found', 'error'); return; }
            const saveVal = saveSnap.val();
            const snapshot = saveVal.snapshot || {};
            const roomSnap = await get(dbRef(db, `rooms/${roomId}`));
            if (roomSnap.exists() && (roomSnap.val().status === 'playing' || roomSnap.val().status === 'lobby' || roomSnap.val().status === 'waiting')) {
                this.showNotification('Reconnecting to live room...', 'info');
                await this.joinRoom(roomCode, name);
                const headerEl = document.getElementById('battle-log-header');
                if (headerEl) {
                    headerEl.textContent = `Battle Log (${roomCode})`;
                }
                if (roomSnap.val().status === 'playing' && Object.keys(snapshot).length > 0) {
                    setTimeout(async () => {
                        try {
                            this.deserializeGameState(snapshot);
                            await set(dbRef(db, `rooms/${roomId}/state`), { ...snapshot, _sender: this.playerId });
                            this.arena.renderer.renderAll();
                            this.showNotification('Save loaded — continued from Round ' + (snapshot.round || 1), 'success');
                            this.arena.log.add(`💾 Resumed from save (Round ${snapshot.round || 1}).`, 'system');
                        } catch (e) { console.error('[MULTIPLAYER] Error pushing saved state:', e); }
                    }, 2000);
                }
            } else {
                this.showNotification('Room offline. Restoring last save locally...', 'info');
                this.mode = 'playing';
                this.roomId = roomId;
                this.roomCode = roomCode;
                setActiveRoom(roomCode, roomId);
                const lobbyView = document.getElementById('lobby-view');
                const arenaView = document.getElementById('arena-view');
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) loadingScreen.classList.remove('hidden');
                setTimeout(() => {
                    if (lobbyView) lobbyView.classList.add('hidden');
                    if (arenaView) arenaView.classList.remove('hidden');
                    if (loadingScreen) loadingScreen.classList.add('hidden');
                    const headerEl = document.getElementById('battle-log-header');
                    if (headerEl) {
                        headerEl.textContent = `Battle Log (${roomCode})`;
                    }
                    if (Object.keys(snapshot).length > 0) {
                        this.deserializeGameState(snapshot);
                        this.arena.renderer.renderAll();
                        this.arena.log.add(`💾 Loaded offline save from room ${roomCode} (Round ${snapshot.round || 1}).`, 'system');
                    }
                    this.showNotification('Save loaded (offline mode)!', 'success');
                }, 1500);
            }
        } catch (err) {
            console.error('[MULTIPLAYER] Error in loadAndResume:', err);
            this.showNotification('Load failed — see console', 'error');
        }
    }
}

