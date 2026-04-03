import { Player } from '../models/Player.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set, onValue, push, onDisconnect, remove, update, get, onChildAdded } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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
    }

    connect() {
        console.log('[MULTIPLAYER] Initialized Firebase connection');
        this.isConnected = true;
    }

    disconnect() {
        this.leaveRoom();
    }

    async createRoom(playerName) {
        this.playerName = playerName;
        const code = generateRoomCode();
        this.roomCode = code;
        this.isHost = true;
        this.mode = 'creating';

        const roomRef = ref(db, `rooms/${code}`);
        const playerRef = ref(db, `rooms/${code}/players/${this.playerId}`);
        
        await set(roomRef, {
            createdAt: Date.now(),
            hostId: this.playerId,
            status: 'lobby'
        });

        await set(playerRef, {
            name: playerName,
            isHost: true,
            isReady: false
        });

        onDisconnect(playerRef).remove();
        onDisconnect(roomRef).update({ hostDisconnected: true });

        this.showNotification(`Room created: ${code}`, 'success');
        this.showRoomLobby();
        this._listenToLobby();
    }

    async joinRoom(roomCode, playerName) {
        this.playerName = playerName;
        const roomRef = ref(db, `rooms/${roomCode}`);
        const snapshot = await get(roomRef);

        if (!snapshot.exists()) {
            this.showNotification('Room not found', 'error');
            return;
        }

        const roomData = snapshot.val();
        if (roomData.status !== 'lobby') {
            this.showNotification('Game already started', 'error');
            return;
        }

        this.roomCode = roomCode;
        this.isHost = false;
        this.mode = 'joining';

        const playerRef = ref(db, `rooms/${roomCode}/players/${this.playerId}`);
        await set(playerRef, {
            name: playerName,
            isHost: false,
            isReady: false
        });

        onDisconnect(playerRef).remove();

        this.showNotification('Joined room successfully', 'success');
        this.showRoomLobby();
        this._listenToLobby();
    }

    leaveRoom() {
        if (this.roomCode) {
            const playerRef = ref(db, `rooms/${this.roomCode}/players/${this.playerId}`);
            remove(playerRef);
            
            this.unsubscribes.forEach(unsub => unsub());
            this.unsubscribes = [];
        }
        this.roomCode = null;
        this.isHost = false;
        this.mode = 'offline';
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
                players.push({
                    id: child.key,
                    ...child.val()
                });
            });
            this.updateRoomUI({ players });
            
            if (players.length > 0 && !players.find(p => p.isHost)) {
                this.showNotification('Host closed the room', 'error');
                this.leaveRoom();
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
            
            this._listenToGameState();
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
    }

    updateRoomUI(data) {
        const playerList = document.getElementById('room-player-list');
        if (!playerList || !data.players) return;
        playerList.innerHTML = data.players.map(p => `
            <div class="player-item ${p.isHost ? 'host' : ''}">
                <span class="player-name">${p.name}</span>
                ${p.isHost ? '<span class="host-badge">HOST</span>' : ''}
                ${p.isReady ? '<span class="ready-badge">READY</span>' : ''}
            </div>
        `).join('');
        const startBtn = document.getElementById('start-game-btn');
        if (startBtn) startBtn.style.display = this.isHost ? 'block' : 'none';
    }

    showNotification(message, type = 'info') {
        this.arena._announce(message, type === 'error');
    }
}
