import { typeChart } from '../data/constants';
import { PokemonDatabase } from '../services/PokemonDatabase';
import { AudioManager } from '../services/AudioManager';
import { BattleEngine } from '../services/BattleEngine';
import { BattleLog } from '../services/BattleLog';
import { HistoryManager } from '../services/HistoryManager';
import { ModalManager } from '../ui/ModalManager';
import { Timer } from '../ui/Timer';
import { UIRenderer } from '../ui/UIRenderer';
import { MultiplayerManager } from '../api/socketClient';

import { PlayerManager } from '../managers/PlayerManager';
import { RoundManager } from '../managers/RoundManager';
import { BattleManager } from '../managers/BattleManager';
import { StatusManager } from '../managers/StatusManager';
import { HPManager } from '../managers/HPManager';
import { UIManager } from '../managers/UIManager';

export class PokemonBattleArena {
    audio: AudioManager;
    db: PokemonDatabase;
    engine: BattleEngine;
    log: BattleLog;
    history: HistoryManager;
    modals: ModalManager;
    timer: Timer;
    multiplayer: MultiplayerManager;
    gs: any;
    renderer: UIRenderer;

    player: PlayerManager;
    round: RoundManager;
    battle: BattleManager;
    status: StatusManager;
    hp: HPManager;
    ui: UIManager;

    constructor() {
        this.audio = new AudioManager();
        this.db = new PokemonDatabase((window as any).MergedPokemonData || {});
        this.engine = new BattleEngine(typeChart);
        this.log = new BattleLog(200);
        this.history = new HistoryManager(30);
        this.modals = new ModalManager();
        this.timer = new Timer(120);
        this.multiplayer = new MultiplayerManager(this);

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

        this.renderer = new UIRenderer(this.gs, this);

        this.player = new PlayerManager(this);
        this.round = new RoundManager(this);
        this.battle = new BattleManager(this);
        this.status = new StatusManager(this);
        this.hp = new HPManager(this);
        this.ui = new UIManager(this);

        this.timer.onTimeout = () => (this as any)._handleTimeoutLegacy();
    }

    init() {
        if (Object.keys(this.db._raw).length === 0) {
            this._announce('Error: Pokémon data file not found or empty.', true);
            return;
        }

        document.body.addEventListener('click', () => (window as any).Tone?.start(), { once: true });
        document.body.addEventListener('click', () => this.audio.init(), { once: true });

        this.db.buildIndex();
        this.log.linkGameState(this.gs);

        this._registerModals();
        this.ui._populateMoveTypeSelector();
        this.ui._setupEventListeners();
        this.ui._setupKeyboardShortcuts();
        (this as any)._setupMultiplayerUI();

        this.renderer.renderAll();
        if ((window as any).lucide) (window as any).lucide.createIcons();
        this.ui._setArena('Normal');
        this.history._updateButtons();
        this.log.add('Battle arena initialised. Trainers ready!', 'system');

        this._exposeGlobals();
    }

    _exposeGlobals() {
        (window as any).openTeamManager = (id: string) => this.openTeamManager(id);
        (window as any).editHP = (id: string) => this.editHP(id);
        (window as any).removePlayer = (id: string) => this.removePlayer(id);
        (window as any).handleQuit = () => this.handleQuit();
        (window as any).handleAttack = (type: string) => this.handleAttack(type);
        (window as any).toggleStatus = (e: any) => this.toggleStatus(e);
        (window as any).handleStatUpdate = () => this.handleStatUpdate();
        (window as any).confirmHPEdit = () => this.confirmHPEdit();
        (window as any).endRound = () => this.endRound();
        (window as any).handleEvolve = () => this.player.handleEvolve();
        (window as any).handleDevolve = () => this.player.handleDevolve();
        (window as any).handleRevive = () => this.player.handleRevive();
        (window as any).cycleWeather = () => this.round.cycleWeather();
    }

    _announce(msg: string, isError: boolean = false) {
        this.ui._announce(msg, isError);
    }

    _notify(message: string, logType: string = 'action', isError: boolean = false) {
        this.log.add(message, logType);
        this._announce(message, isError);
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

    // Public Facade
    addPlayer() { this.player.addPlayer(); }
    removePlayer(id: string) { this.player.removePlayer(id); }
    endRound() { this.round.endRound(); }
    handleAttack(type: string) { this.battle.handleAttack(type); }
    editHP(id: string) { this.hp.editHP(id); }
    confirmHPEdit() { this.hp.confirmHPEdit(); }
    toggleStatus(e: any) { this.status.toggleStatus(e); }
    handleStatUpdate() { this.status.handleStatUpdate(); }

    // Internal Helpers
    _showDamageNumber(pid: string, amount: number, type: string) { (this.renderer as any).showDamageNumber(pid, amount, type); }
    _animateSprite(pid: string, type: string, cb: () => void) { (this.renderer as any).animateSprite(pid, type, cb); }
    openConfirmModal(title: string, msg: string, cb: () => void) { (this.modals as any).openConfirm(title, msg, cb); }
    updateAttackPreview() { this.ui.updateAttackPreview(); }

    // Modals
    openSelectionModal(title: string, items: any[], onSelect: (name: string) => void) {
        const titleEl = document.getElementById('selection-modal-title');
        if (titleEl) titleEl.textContent = title;
        (this as any)._populateSelectionGrid(items, onSelect);
        this.modals.open('selection');
    }

    // Stubs for remaining legacy logic
    _handleTimeoutLegacy() { (window as any).console.log('Timeout happened'); }
    openTeamManager(id: string) { (window as any).console.log('Open team manager', id); }
    handleQuit() { (window as any).console.log('Quit'); }
    _populateSelectionGrid(items: any[], onSelect: any) { (window as any).console.log('Populate grid'); }
}
