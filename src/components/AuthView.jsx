import { useState, useEffect } from 'react';
import { authManager } from '../../js/api/authManager.js';

export default function AuthView({ onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login', 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let result;
    if (mode === 'login') {
      result = await authManager.login(email, password);
    } else {
      result = await authManager.register(email, password, displayName);
    }

    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else if (result.user) {
      // User is logged in, no need to do anything here because App.jsx will listen to auth state changes
      if (onAuthSuccess) onAuthSuccess();
    }
  };

  const handleGuest = async () => {
    setError(null);
    setLoading(true);
    const result = await authManager.loginAsGuest();
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else if (result.user) {
      if (onAuthSuccess) onAuthSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#060e20] bg-opacity-95 backdrop-blur-sm pixel-grid pointer-events-auto">
      <div className="bg-surface-container border-4 border-[#6d758c] p-6 max-w-md w-full relative overflow-hidden step-animation hard-shadow-primary mx-4">
        <h2 className="text-2xl font-bold text-yellow-400 font-headline uppercase tracking-widest text-glow text-center mb-6">
          <span className="material-symbols-outlined align-middle mr-2 mt-[-4px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_locked</span>
          ARENA ACCESS
        </h2>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 text-xs p-3 mb-4 font-body">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-on-surface-variant text-[10px] uppercase tracking-wider mb-1">Trainer Name</label>
              <input
                type="text"
                required
                disabled={loading}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-surface-container-lowest border-2 border-outline-variant p-3 text-sm text-white focus:border-yellow-400 focus:outline-none placeholder:text-slate-500"
                placeholder="Ash Ketchum"
              />
            </div>
          )}

          <div>
            <label className="block text-on-surface-variant text-[10px] uppercase tracking-wider mb-1">Email</label>
            <input
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-lowest border-2 border-outline-variant p-3 text-sm text-white focus:border-yellow-400 focus:outline-none placeholder:text-slate-500"
              placeholder="trainer@pallettown.com"
            />
          </div>

          <div>
            <label className="block text-on-surface-variant text-[10px] uppercase tracking-wider mb-1">Password</label>
            <input
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-lowest border-2 border-outline-variant p-3 text-sm text-white focus:border-yellow-400 focus:outline-none placeholder:text-slate-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black border-2 border-yellow-600 font-bold p-3 text-sm uppercase tracking-widest step-animation mt-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : (mode === 'login' ? 'Login' : 'Register')}
          </button>
        </form>

        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null); }}
            disabled={loading}
            className="text-xs text-[#699cff] hover:text-white uppercase tracking-wider h-8 step-animation font-bold"
          >
            {mode === 'login' ? 'Need an account? Register' : 'Have an account? Login'}
          </button>
          
          <div className="flex items-center gap-4 my-2">
            <div className="flex-1 h-[1px] bg-outline-variant"></div>
            <span className="text-on-surface-variant text-[10px] uppercase">OR</span>
            <div className="flex-1 h-[1px] bg-outline-variant"></div>
          </div>

          <button
            type="button"
            onClick={handleGuest}
            disabled={loading}
            className="w-full bg-surface-variant hover:bg-surface-bright text-white border-2 border-outline-variant font-bold p-3 text-sm uppercase tracking-widest step-animation disabled:opacity-50"
          >
            Play as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
