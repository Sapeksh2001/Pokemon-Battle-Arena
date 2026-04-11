import { PokemonBattleArena } from './js/main.js';
import { escapeHTML } from './js/utils/helpers.js';
import { loadGameData } from './js/services/DataLoader.js';

window.escapeHTML = escapeHTML;

// ── Loading overlay helpers ──────────────────────────────────────────────────
function updateLoadingOverlay(loaded, total, label) {
    const msgEl  = document.getElementById('loading-message');
    const barEl  = document.getElementById('loading-bar-fill');
    const pctEl  = document.getElementById('loading-pct');
    const pct    = Math.round((loaded / total) * 100);
    if (msgEl)  msgEl.textContent  = `Loading ${label}… ${loaded}/${total}`;
    if (barEl)  barEl.style.width  = `${pct}%`;
    if (pctEl)  pctEl.textContent  = `${pct}%`;
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('data-loading-overlay');
    if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.4s ease';
        setTimeout(() => overlay.remove(), 450);
    }
}

// ── Main startup ─────────────────────────────────────────────────────────────
async function startApp() {
    try {
        await loadGameData(updateLoadingOverlay);
    } catch (err) {
        const msgEl = document.getElementById('loading-message');
        if (msgEl) msgEl.textContent = `⚠️ Failed to load data: ${err.message}`;
        console.error('[DataLoader]', err);
        return; // Don't start the game with missing data
    }

    hideLoadingOverlay();

    const arena = new PokemonBattleArena();
    window.arena = arena; // Expose globally for event handlers & callbacks
    arena.init();

    // Auto-join from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get('room');
    if (roomCode && roomCode.length === 6) {
        setTimeout(() => {
            const name = prompt(`Join room ${roomCode}?\nEnter your trainer name:`);
            if (name && name.trim()) {
                if (arena.multiplayer) {
                    arena.multiplayer.connect();
                    setTimeout(() => arena.multiplayer.joinRoom(roomCode, name.trim()), 1000);
                }
            }
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 2000);
    }
}

console.log('[App] script.js module execution started.');

// Do NOT boot on DOMContentLoaded — at that point React may still be gated
// on the AuthView (waiting for Google/email OAuth to resolve).
// Instead, poll for window.__reactReady, which is set by GameRoot's useEffect
// in App.jsx only after auth resolves and all game DOM elements are mounted.
function waitForReactAndStart() {
    if (window.__reactReady) {
        console.log('[App] React DOM ready — starting game engine.');
        startApp();
    } else {
        setTimeout(waitForReactAndStart, 50);
    }
}

waitForReactAndStart();

// Expose globals for onclicks
window.copyRoomCode = function() {
    const roomCode = document.getElementById('room-code-display')?.textContent?.trim();
    if (!roomCode) return;
    navigator.clipboard.writeText(roomCode).then(() => {
        const feedback = document.getElementById('copy-feedback');
        if (feedback) { feedback.textContent = '✅ Code copied!'; feedback.classList.remove('hidden'); setTimeout(() => feedback.classList.add('hidden'), 2000); }
        const btn = document.getElementById('copy-code-btn');
        if (btn) { btn.textContent = '✅ Copied!'; setTimeout(() => { btn.textContent = '📋 Copy Code'; }, 2000); }
    }).catch(() => {
        const codeEl = document.getElementById('room-code-display');
        if (codeEl) { const range = document.createRange(); range.selectNode(codeEl); window.getSelection().removeAllRanges(); window.getSelection().addRange(range); }
    });
};

window.shareRoomLink = function() {
    const roomCode = document.getElementById('room-code-display')?.textContent?.trim();
    if (!roomCode) return;
    const joinUrl = `${window.location.origin}${window.location.pathname}?room=${roomCode}`;
    const shareText = `Join my Pokémon Battle Arena! Room Code: ${roomCode}`;
    if (navigator.share) {
        navigator.share({ title: 'Pokémon Battle Arena - Join My Room!', text: shareText, url: joinUrl }).catch(() => window.copyToClipboardWithFeedback(joinUrl));
    } else {
        window.copyToClipboardWithFeedback(joinUrl);
    }
};

window.copyToClipboardWithFeedback = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        const feedback = document.getElementById('copy-feedback');
        if (feedback) { feedback.textContent = '🔗 Link copied to clipboard!'; feedback.classList.remove('hidden'); setTimeout(() => feedback.classList.add('hidden'), 3000); }
        const btn = document.getElementById('share-link-btn');
        if (btn) { btn.textContent = '✅ Link Copied!'; setTimeout(() => { btn.textContent = '🔗 Share Link'; }, 2000); }
    });
};