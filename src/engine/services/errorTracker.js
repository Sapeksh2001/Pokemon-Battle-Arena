import { ref, push, set } from "firebase/database";
import { db } from "../../firebase.js";
import { authManager } from "../api/authManager.js";

/**
 * Initializes the global error listeners for uncaught exceptions and unhandled promise rejections.
 */
export function initErrorTracker() {
    if (typeof window === 'undefined') return;

    console.log('[ErrorTracker] Initializing lightweight global error handlers...');

    window.onerror = function (message, source, lineno, colno, error) {
        handleError({
            type: 'uncaught_exception',
            message: String(message),
            source: String(source),
            lineno,
            colno,
            stack: error ? String(error.stack) : null,
            time: Date.now()
        });
        return false; // Let browser handle it normally as well
    };

    window.onunhandledrejection = function (event) {
        handleError({
            type: 'unhandled_rejection',
            message: event.reason ? String(event.reason.message || event.reason) : 'Promise rejection',
            stack: event.reason ? String(event.reason.stack || '') : null,
            time: Date.now()
        });
    };
}

/**
 * Processes and reports the error payload to Firebase.
 */
async function handleError(payload) {
    try {
        const user = authManager?.currentUser;
        const info = {
            ...payload,
            userAgent: navigator.userAgent,
            url: window.location.href,
            userId: user ? user.uid : 'anonymous',
            userEmail: user ? user.email : null,
            roomCode: window.arena?.multiplayer?.roomCode || null,
            roomId: window.arena?.multiplayer?.roomId || null,
        };

        console.error('[ErrorTracker] Captured error:', info);

        // Safely push error details to Firebase Realtime Database
        if (db) {
            const errorRef = ref(db, 'errors');
            await set(push(errorRef), info);
        }
    } catch (e) {
        // Prevent recursive error loops
        console.warn('[ErrorTracker] Failed to push error log:', e);
    }
}
