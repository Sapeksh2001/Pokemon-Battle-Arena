import { useState } from 'react';
import { authManager } from '../engine/api/authManager.js';

export default function AuthView({ onAuthSuccess }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async (e) => {
    // Debug: Trace the event to see what triggered this click
    console.log('[AuthView] Google Login triggered', {
      type: e?.type,
      isTrusted: e?.isTrusted,
      timeStamp: e?.timeStamp
    });

    setError(null);
    setLoading(true);
    const result = await authManager.loginWithGoogle();
    setLoading(false);
    if (result.error) {
      if (result.error.includes('auth/popup-closed-by-user')) return;
      setError(result.error);
    } else if (result.user && onAuthSuccess) {
      onAuthSuccess();
    }
  };

  const handleGuest = async () => {
    setError(null);
    setLoading(true);
    const result = await authManager.loginAsGuest();
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else if (result.user && onAuthSuccess) {
      onAuthSuccess();
    }
  };

  return (
    <>
      {/* Animated Arena Backgrounds */}
      <div className="fixed inset-0 z-0 bg-arena-animated" />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="bg-cyber-grid" />
        <div className="bg-energy-glow" />
      </div>

      <div className="fixed inset-0 z-[1] pointer-events-none pixel-grid opacity-50" />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#060e20]/60 backdrop-blur-sm pointer-events-auto">
        <div className="bg-surface-container border-4 border-[#6d758c] p-8 max-w-sm w-full relative overflow-hidden step-animation hard-shadow-primary mx-4">
          <h2 className="text-2xl font-bold text-yellow-400 font-headline uppercase tracking-widest text-glow text-center mb-8">
          <span className="material-symbols-outlined align-middle mr-2 mt-[-4px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_locked</span>
          ARENA ACCESS
        </h2>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 text-xs p-3 mb-6 font-body">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-[#4285F4] hover:bg-[#357ae8] text-white font-bold py-3 px-4 text-sm uppercase tracking-wider step-animation hard-shadow-primary disabled:opacity-50"
          >
            <div className="bg-white p-1 rounded-sm flex-shrink-0">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <span>{loading ? 'Authenticating...' : 'Sign in with Google'}</span>
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-[1px] bg-slate-700/50"></div>
            <span className="text-[10px] uppercase font-bold text-slate-500">OR</span>
            <div className="flex-1 h-[1px] bg-slate-700/50"></div>
          </div>

          <button
            onClick={handleGuest}
            disabled={loading}
            className="w-full bg-surface-variant hover:bg-surface-bright text-white border-2 border-outline-variant font-bold p-3 text-sm uppercase tracking-widest step-animation disabled:opacity-50"
          >
            Play as Guest
          </button>
        </div>
        
        <p className="mt-8 text-[10px] text-slate-500 text-center uppercase tracking-[0.2em] leading-relaxed">
          Welcome to the Arena. <br/> Your progress will sync across devices via Google.
        </p>
      </div>
    </div>
    </>
  );
}
