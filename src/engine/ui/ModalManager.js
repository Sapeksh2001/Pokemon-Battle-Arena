// ==========================================
// MODAL MANAGER
// ==========================================

export class ModalManager {
    constructor() {
        this._registry = new Map(); // name → HTMLElement
        this._zCounter = 40; // base z-index; increments on every open()
    }

    /** Register a modal by semantic name. */
    register(name, el) {
        if (el) this._registry.set(name, el);
    }

    /** Open a modal, always bringing it to the front via an auto-incrementing z-index. */
    open(name) {
        const el = this._registry.get(name);
        if (!el) return;
        this._zCounter++;
        el.style.zIndex = this._zCounter;
        el.classList.add('visible');
    }

    close(name) { 
        this._registry.get(name)?.classList.remove('visible'); 
        if (name === 'confirm') {
            // Clean up to prevent double clicks or memory leaks
            document.getElementById('confirm-modal-yes').onclick = null;
        }
    }

    /** Close all open modals. Used by the Escape key handler. */
    closeAll() {
        for (const el of this._registry.values()) el.classList.remove('visible');
    }

    /** Specific helper for the Yes/No confirmation dialog */
    openConfirm(title, msg, onConfirm) {
        const titleEl = document.getElementById('confirm-modal-title');
        const msgEl = document.getElementById('confirm-modal-message');
        const yesBtn = document.getElementById('confirm-modal-yes');

        if (titleEl) titleEl.textContent = title;
        if (msgEl) msgEl.textContent = msg;
        if (yesBtn) {
            yesBtn.onclick = () => {
                onConfirm();
                this.close('confirm');
            };
        }
        this.open('confirm');
    }

    isOpen(name) { return this._registry.get(name)?.classList.contains('visible') ?? false; }
    anyOpen() { return [...this._registry.values()].some(el => el.classList.contains('visible')); }
}
