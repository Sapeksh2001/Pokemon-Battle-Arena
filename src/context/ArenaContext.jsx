/**
 * ArenaContext.jsx
 *
 * Bridges the legacy PokemonBattleArena engine (loaded via public/script.js)
 * with the React component tree.
 *
 * Boot sequence:
 *  1. index.html loads React entry (src/main.jsx) and legacy engine (script.js)
 *     both as <script type="module">. They run concurrently over the network,
 *     but script.js is deferred so React mounts first.
 *  2. script.js calls loadGameData() (dynamic <script> injection, no CORS issues
 *     because data files sit in public/ at the document origin), then instantiates
 *     PokemonBattleArena and sets window.arena.
 *  3. ArenaContext polls for window.arena (100 ms interval) and then patches the
 *     renderer to trigger React re-renders on every renderAll() call.
 *
 * This design requires zero changes to any file inside public/js/.
 */

import React, {
  createContext, useContext, useEffect, useState, useRef, useCallback,
} from 'react';

const ArenaContext = createContext(null);

/** How often (ms) we poll for window.arena to appear. */
const POLL_MS = 100;
/** Maximum time (ms) to wait before declaring an error. */
const TIMEOUT_MS = 30_000;

export function ArenaProvider({ children }) {
  const [loadState, setLoadState] = useState({
    status: 'loading',
    progress: 5,
    label: 'Loading game data…',
    error: null,
  });
  const [tick, setTick] = useState(0);
  const arenaRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let elapsed = 0;

    const interval = setInterval(() => {
      if (cancelled) return clearInterval(interval);

      elapsed += POLL_MS;

      // Reflect DataLoader progress if it exposes one
      if (window.__loadProgress !== undefined) {
        setLoadState(prev => ({
          ...prev,
          progress: Math.max(prev.progress, window.__loadProgress),
          label: window.__loadLabel || prev.label,
        }));
      }

      if (window.arena) {
        clearInterval(interval);
        const arena = window.arena;
        arenaRef.current = arena;

        // Patch renderer so React re-renders whenever the engine updates the UI
        if (arena.renderer?.renderAll) {
          const orig = arena.renderer.renderAll.bind(arena.renderer);
          arena.renderer.renderAll = () => {
            orig();
            if (!cancelled) setTick(t => t + 1);
          };
        }

        // Hydrate any lucide icons the engine may have injected
        if (window.lucide) window.lucide.createIcons();

        if (!cancelled) {
          setLoadState({ status: 'ready', progress: 100, label: '', error: null });
        }
        return;
      }

      if (elapsed >= TIMEOUT_MS) {
        clearInterval(interval);
        if (!cancelled) {
          setLoadState({
            status: 'error',
            progress: 0,
            label: '',
            error: 'Arena failed to initialise within 30 s. Check the browser console for details.',
          });
        }
      }
    }, POLL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const getArena = useCallback(() => arenaRef.current, []);

  return (
    <ArenaContext.Provider value={{ loadState, tick, getArena }}>
      {children}
    </ArenaContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useArena() {
  return useContext(ArenaContext);
}
