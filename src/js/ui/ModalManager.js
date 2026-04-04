// ==========================================
// MODAL MANAGER
// ==========================================

export class ModalManager {
    constructor() {
        this._registry = new Map(); // name → HTMLElement
    }

    /** Register a modal by semantic name. */
    register(name, el) {
        if (el) this._registry.set(name, el);
    }

    open(name) { this._registry.get(name)?.classList.add('visible'); }
    close(name) { this._registry.get(name)?.classList.remove('visible'); }

    /** Close all open modals. Used by the Escape key handler. */
    closeAll() {
        for (const el of this._registry.values()) el.classList.remove('visible');
    }

    isOpen(name) { return this._registry.get(name)?.classList.contains('visible') ?? false; }
    anyOpen() { return [...this._registry.values()].some(el => el.classList.contains('visible')); }
}
