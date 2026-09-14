import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const env = (typeof import.meta !== 'undefined' && import.meta.env) || (typeof process !== 'undefined' && process.env) || {};

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'dummy-api-key',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'dummy.firebaseapp.com',
  databaseURL: env.VITE_FIREBASE_DATABASE_URL || 'https://dummy.firebaseio.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'dummy-project',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'dummy.appspot.com',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: env.VITE_FIREBASE_APP_ID || '1:123456789:web:abcdef',
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || 'G-DUMMY'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// VUL-02: App Check integration (if site key is configured)
if (typeof window !== 'undefined' && env.VITE_RECAPTCHA_SITE_KEY) {
  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(env.VITE_RECAPTCHA_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    });
  } catch (err) {
    console.warn('[Firebase] App Check initialization failed:', err);
  }
}

export default app;
