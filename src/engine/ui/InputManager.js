/**
 * InputManager
 * Handles keyboard shortcuts for battle actions, timer controls,
 * modal dismissing, undo/redo, and player selection.
 */
export class InputManager {
    constructor(arena) {
        this.arena = arena;
        this._handler = (e) => this._handleKeyDown(e);
        this._isBound = false;
    }

    bind() {
        if (typeof window === 'undefined' || this._isBound) return;
        window.addEventListener('keydown', this._handler);
        this._isBound = true;
    }

    unbind() {
        if (typeof window === 'undefined' || !this._isBound) return;
        window.removeEventListener('keydown', this._handler);
        this._isBound = false;
    }

    _handleKeyDown(e) {
        // Ignore if user is currently typing in an input, textarea, or select element
        const active = document.activeElement;
        const isEditable = active && (
            active.tagName === 'INPUT' ||
            active.tagName === 'TEXTAREA' ||
            active.tagName === 'SELECT' ||
            active.isContentEditable
        );
        if (isEditable) return;

        const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
        const isMod = isMac ? e.metaKey : e.ctrlKey;

        // ── Undo / Redo ─────────────────────────────────────────────
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
            if (this.arena.modals?.anyOpen()) {
                this.arena.modals.closeAll();
                this.arena.audio?.play('click');
                return;
            }
        }

        // Don't fire arena shortcuts when a modal is open.
        if (this.arena.modals?.anyOpen()) return;

        // ── Timer controls ───────────────────────────────────────────
        if (e.key?.toLowerCase() === 't') {
            e.preventDefault();
            if (e.shiftKey) {
                document.getElementById('timer-reset')?.click();
            } else {
                // Toggle: if running, pause; if paused, start.
                if (this.arena.timer?.isRunning) {
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
            const player = this.arena.gs?.players?.[playerIndex];
            const sel = document.getElementById('attacker-select');
            if (player && sel) {
                sel.value = player.id;
                sel.dispatchEvent(new Event('change'));
                this.arena.audio?.play('click');
            }
        }
    }
}
