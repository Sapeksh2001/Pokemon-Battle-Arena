/**
 * App.jsx
 * Root component. Bootstraps the legacy engine via ArenaContext,
 * then renders the full HTML structure in its original form.
 *
 * Strategy:
 *   - ArenaProvider loads data and initialises PokemonBattleArena.
 *   - All views (Lobby, Arena) render simultaneously as hidden/shown divs,
 *     exactly as in the legacy HTML. The engine controls visibility via
 *     classList on #lobby-view / #arena-view.
 *   - Modals are permanently in the DOM so the engine can show/hide them.
 */
import { useEffect, useState } from 'react';
import { ArenaProvider, useArena } from './context/ArenaContext';
import LoadingOverlay from './components/LoadingOverlay';
import LobbyView from './components/LobbyView';
import ArenaView from './components/ArenaView';
import Modals from './components/Modals';
import AuthView from './components/AuthView';
import { authManager } from './js/api/authManager.js';

function GameRoot() {
  const { loadState } = useArena();

  // Signal the legacy engine (public/script.js) that React has mounted
  // and all DOM IDs are available. script.js polls for this flag.
  useEffect(() => {
    window.__reactReady = true;
  }, []);

  // Re-hydrate lucide icons when arena is ready
  useEffect(() => {
    if (loadState.status === 'ready' && window.lucide) {
      window.lucide.createIcons();
    }
  }, [loadState.status]);

  return (
    <>
      {/* Loading overlay — visible while status is 'loading' */}
      {loadState.status !== 'ready' && loadState.status !== 'error' && (
        <LoadingOverlay progress={loadState.progress} label={loadState.label} />
      )}

      {/* Error state — shown if bootstrap fails */}
      {loadState.status === 'error' && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0d0d1a', fontFamily: 'system-ui',
          }}
        >
          <div className="text-center p-8 bg-surface-container border-2 border-[#b92902] max-w-lg hard-shadow-primary relative overflow-hidden">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="material-symbols-outlined text-[#ff7351] text-[32px]">warning</span>
              <h2 className="text-3xl font-bold text-[#ff7351] font-headline uppercase tracking-tighter text-glow">Error</h2>
            </div>
            <p className="text-white text-sm font-body mb-4 text-left leading-relaxed">
              Failed to start the battle arena:
            </p>
            <code className="text-yellow-400 text-xs block bg-surface-container-lowest p-3 border border-outline-variant text-left">
              {loadState.error}
            </code>
          </div>
        </div>
      )}

      {/* Both views are always in the DOM; the engine toggles .hidden */}
      <LobbyView />
      <ArenaView />
      <Modals />
    </>
  );
}

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = authManager.subscribe((authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) {
      return <LoadingOverlay progress={100} label="Authenticating..." />;
  }

  if (user === null) {
      return <AuthView />;
  }

  return (
    <ArenaProvider>
      <GameRoot />
    </ArenaProvider>
  );
}
