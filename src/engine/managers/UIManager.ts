import { arenaBackgrounds, typeColors } from '../data/constants';
import { escapeHTML } from '../utils/helpers';

export class UIManager {
    constructor(arena) {
        this.arena = arena;
    }

    _setupEventListeners() {
        const gs = this.arena.gs;

        document.getElementById('attacker-select')?.addEventListener('change', (e: any) => {
            gs.activeTurnPlayerId = e.target.value || null;
            this.arena.updateAttackPreview();
            if (gs.activeTurnPlayerId) {
                const p = gs.players.find(p => p.id === gs.activeTurnPlayerId);
                const pk = p?.getActivePokemon();
                if (pk) {
                    this._setArena(pk.types[0]);
                    this._populateMoveSelector(pk.fullName);
                }
            } else {
                this._populateMoveSelector(null);
            }
            this.arena.renderer.renderAll();
        });

        document.getElementById('move-name-select')?.addEventListener('change', (e: any) => {
            const moveName = e.target.value;
            if (!moveName || typeof (window as any).MovesData === 'undefined') return;
            const moveData = (window as any).MovesData[moveName];
            if (moveData) {
                const powerInput = document.getElementById('move-power-input') as HTMLInputElement | null;
                const typeSelect = document.getElementById('move-type-select') as HTMLSelectElement | null;
                if (powerInput && moveData.power && moveData.power > 0) {
                    powerInput.value = moveData.power;
                } else if (powerInput) {
                    powerInput.value = '';
                }
                if (typeSelect && moveData.type) {
                    const opt = [...typeSelect.options].find(
                        o => o.value.toLowerCase() === moveData.type.toLowerCase()
                    );
                    if (opt) typeSelect.value = opt.value;
                }
                this.arena.updateAttackPreview();
            }
        });

        document.getElementById('attack-target-select')?.addEventListener('change', (e: any) => {
            gs.selectedAttackTargetId = e.target.value || null;
            this.arena.updateAttackPreview();
            this.arena.renderer.renderAll();
        });

        document.getElementById('status-target-select')?.addEventListener('change', (e: any) => {
            gs.selectedStatusTargetId = e.target.value || null;
            this.arena.renderer._updateStatusButtonStyles();
            this.arena.renderer.renderAll();
        });

        document.getElementById('move-type-select')?.addEventListener('change', () => {
            this.arena.updateAttackPreview();
            document.getElementById('announcement-banner')?.classList.add('hidden');
        });

        document.querySelectorAll('.status-btn').forEach(btn => {
            if (btn.id !== 'weather-btn') btn.addEventListener('click', e => this.arena.toggleStatus(e));
        });
        document.getElementById('weather-btn')?.addEventListener('click', () => this.arena.round.cycleWeather());
    }

    _setArena(type: string) {
        const backgrounds = arenaBackgrounds[type] || arenaBackgrounds['Normal'];
        document.querySelectorAll('.parallax-layer').forEach((layer: any, i) => {
            if (backgrounds[i]) layer.style.backgroundImage = `url('${backgrounds[i]}')`;
        });
    }

    _populateMoveTypeSelector() {
        const sel = document.getElementById('move-type-select') as HTMLSelectElement | null;
        if (!sel) return;
        sel.innerHTML = '<option value="">Select Type</option>';
        Object.keys(typeColors).forEach(type => {
            const cap = type.charAt(0).toUpperCase() + type.slice(1);
            sel.add(new Option(cap, cap));
        });
    }

    _populateMoveSelector(pokemonName: string | null) {
        const sel = document.getElementById('move-name-select') as HTMLSelectElement | null;
        if (!sel) return;
        sel.innerHTML = '<option value="">-- Select Move --</option>';

        if (typeof (window as any).MovesetsData === 'undefined' || typeof (window as any).MovesData === 'undefined') return;

        let moves = (window as any).MovesetsData[pokemonName || ''];
        if (!moves && pokemonName) {
            const baseName = pokemonName.split(' ')[0];
            moves = (window as any).MovesetsData[baseName];
        }
        const movelist = moves || Object.keys((window as any).MovesData).sort();

        movelist.forEach(moveName => {
            const md = (window as any).MovesData[moveName];
            if (!md) return;
            const label = md.power > 0
                ? `${moveName} (${md.type} · ${md.category} · ${md.power})`
                : `${moveName} (${md.type} · ${md.category})`;
            sel.add(new Option(label, moveName));
        });
    }

    _setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            if (e.key === 'r') this.arena.endRound();
            if (e.key === 'Escape') this.arena.modals.closeAll();
        });
    }

    _toggleLoading(show: boolean, msg = 'Processing...') {
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

    updateAttackPreview() {
        const typeSel = document.getElementById('move-type-select') as HTMLSelectElement | null;
        const targetSel = document.getElementById('attack-target-select') as HTMLSelectElement | null;
        const display = document.getElementById('type-effectiveness-display');
        if (!display) return;

        const moveType = typeSel?.value;
        const targetId = targetSel?.value;
        if (!moveType || !targetId) { display.textContent = '--'; return; }

        const player = this.arena.gs.players.find(p => p.id === targetId);
        const pokemon = player?.getActivePokemon();
        if (!pokemon) { display.textContent = '--'; return; }

        const mult = this.arena.engine.getTypeEffectiveness(moveType, pokemon.types);
        let label = `x${mult}`;
        if (mult >= 2) label += ' (Super effective!)';
        if (mult < 1 && mult > 0) label += ' (Not very effective...)';
        if (mult === 0) label += ' (No effect!)';
        display.textContent = label;
    }

    _announce(text: string, isError = false) {
        this.arena.audio.play(isError ? 'error' : 'confirm');
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
}
