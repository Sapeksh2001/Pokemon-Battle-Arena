import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously, signOut, onAuthStateChanged, updateProfile, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { app } from './firebase-config.js';

let auth;
try {
    auth = getAuth(app);
} catch (e) {
    console.error("Firebase Auth initialization failed:", e);
    // Create a mock auth object to prevent crashing later, although the app won't function correctly.
    auth = { onAuthStateChanged: () => {} };
}


export class AuthManager {
    constructor() {
        this.currentUser = null;
        this.onAuthStateChangedCallbacks = [];

        onAuthStateChanged(auth, (user) => {
            this.currentUser = user;
            this.onAuthStateChangedCallbacks.forEach(cb => cb(user));
        });
    }

    subscribe(callback) {
        this.onAuthStateChangedCallbacks.push(callback);
        if (this.currentUser !== undefined) {
             callback(this.currentUser);
        }
        return () => {
            this.onAuthStateChangedCallbacks = this.onAuthStateChangedCallbacks.filter(cb => cb !== callback);
        };
    }

    async login(email, password) {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return { user: result.user, error: null };
        } catch (error) {
            return { user: null, error: error.message };
        }
    }

    async register(email, password, displayName = "") {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            if (displayName) {
                await updateProfile(result.user, { displayName });
                // Re-assign the updated user to force trigger or manually update local
                await auth.currentUser?.reload();
                this.currentUser = auth.currentUser;
            }
            return { user: auth.currentUser, error: null };
        } catch (error) {
            return { user: null, error: error.message };
        }
    }

    async loginAsGuest() {
        try {
            const result = await signInAnonymously(auth);
            return { user: result.user, error: null };
        } catch (error) {
            return { user: null, error: error.message };
        }
    }

    async loginWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            return { user: result.user, error: null };
        } catch (error) {
            return { user: null, error: error.message };
        }
    }

    async updateTrainerName(newName) {
        try {
            if (!auth.currentUser) throw new Error("No user logged in");
            await updateProfile(auth.currentUser, { displayName: newName });
            await auth.currentUser.reload();
            this.currentUser = auth.currentUser;
            this.onAuthStateChangedCallbacks.forEach(cb => cb(this.currentUser));
            return { success: true, error: null };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async logout() {
        await signOut(auth);
    }
}

export const authManager = new AuthManager();
