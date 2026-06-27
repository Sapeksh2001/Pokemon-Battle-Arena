/**
 * ArenaContext.jsx  (React-native event bridge — v3)
 *
 * Architecture:
 *  1. Listens for the 'arena:ready' CustomEvent fired by the engine once it
 *     has fully initialised. ZERO polling — no setInterval wasted ticks.
 *  2. Once the event fires, installs window.__arenaNotify so the engine can
 *     ping React without any DOM coupling.
 *  3. On each notify, we shallow-copy arena.gs into React state (gameState).
 *  4. dispatch(action, ...args) is the React-facing API (unchanged from v2).
 *  5. A 30-second safety timeout surfaces an error if arena:ready never fires.
 *
 * UI/UX impact: ZERO — all visual components are unchanged.
 */

import React, {
  createContext, useContext, useEffect, useState, useRef, useCallback,
} from 'react';

const ArenaContext = createContext(null);

const READY_TIMEOUT_MS = 30_000;

// Shallow-clone the relevant slices of gs so React sees a new object reference.
function snapshotGs(gs) {
  if (!gs) return null;
  return {
    players:               (gs.players || []).map(p => ({ ...p })),
    round:                 gs.round,
    weather:               gs.weather,
    activeTurnPlayerId:    gs.activeTurnPlayerId,
    selectedAttackTargetId:gs.selectedAttackTargetId,
    selectedStatusTargetId:gs.selectedStatusTargetId,
    currentHPEdit:         gs.currentHPEdit,
    // expose raw ref for reads that need deep data
    _raw: gs,
  };
}

export function ArenaProvider({ children }) {
  const [loadState, setLoadState] = useState({
    status:   'loading',
    progress: 5,
    label:    'Loading game data…',
    error:    null,
  });

  const [gameState, setGameState] = useState(null);
  const arenaRef = useRef(null);

  // Called by engine after every state mutation.
  const notify = useCallback(() => {
    const arena = arenaRef.current;
    if (!arena) return;
    setGameState(snapshotGs(arena.gs));
  }, []);

  useEffect(() => {
    let cancelled = false;

    // Safety net: if engine never dispatches arena:ready, show an error after 30 s.
    const timeoutId = setTimeout(() => {
      if (!cancelled && !arenaRef.current) {
        setLoadState({
          status:   'error',
          progress: 0,
          label:    '',
          error:    'Arena failed to initialise within 30 s. Check the browser console.',
        });
      }
    }, READY_TIMEOUT_MS);

    // Listen for data-loader progress events from the engine bootstrap
    const handleProgress = (e) => {
      if (cancelled) return;
      const { loaded, total, label } = e.detail || {};
      if (typeof loaded === 'number' && typeof total === 'number') {
        const pct = Math.round((loaded / total) * 90) + 5; // 5←95%
        setLoadState(prev => ({
          ...prev,
          progress: Math.max(prev.progress, pct),
          label:    label || prev.label,
        }));
      }
    };
    window.addEventListener('arena:progress', handleProgress);

    // Primary hook: engine fires this exactly once after full init
    const handleReady = (e) => {
      if (cancelled) return;
      clearTimeout(timeoutId);

      const arena = e.detail?.arena || window.arena;
      if (!arena) return;
      arenaRef.current = arena;

      // Install notify hook — engine calls this after every state mutation
      window.__arenaNotify = () => {
        if (!cancelled) notify();
      };

      // Patch renderer so legacy renderAll() also pings React
      if (arena.renderer?.renderAll) {
        const orig = arena.renderer.renderAll.bind(arena.renderer);
        arena.renderer.renderAll = () => {
          orig();
          window.__arenaNotify?.();
        };
      }

      if (window.lucide) window.lucide.createIcons();

      setGameState(snapshotGs(arena.gs));
      setLoadState({ status: 'ready', progress: 100, label: '', error: null });
    };
    window.addEventListener('arena:ready', handleReady, { once: true });

    // Fallback: if arena is already on window when this effect runs
    // (e.g. hot-reload), fire immediately without waiting for the event.
    if (window.arena && !arenaRef.current) {
      handleReady({ detail: { arena: window.arena } });
    }

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      window.removeEventListener('arena:ready', handleReady);
      window.removeEventListener('arena:progress', handleProgress);
      if (window.__arenaNotify) delete window.__arenaNotify;
    };
  }, [notify]);

  const getArena = useCallback(() => arenaRef.current, []);

  /**
   * dispatch(action, ...args)
   *
   * Calls the matching method on the arena (or a sub-service) and then
   * fires __arenaNotify so React state syncs without waiting for the engine's
   * own renderAll() call.
   *
   * Supported dot-notation paths:
   *   'endRound'             → arena.endRound(...args)
   *   'handleAttack'         → arena.handleAttack(...args)
   *   'timer.start'          → arena.timer.start(...args)
   *   'history.undo'         → arena.history.undo(arena.gs, arena.db)
   *   'history.redo'         → arena.history.redo(arena.gs, arena.db)
   *   'multiplayer.saveGame' → arena.multiplayer.saveGameToFirebase()
   *
   * Any unknown action is a no-op (safe by default).
   */
  const dispatch = useCallback((action, ...args) => {
    const arena = arenaRef.current;
    if (!arena) return;

    try {
      const parts = action.split('.');
      if (parts.length === 1) {
        // Direct arena method
        if (typeof arena[action] === 'function') {
          // undo/redo need gs and db passed in
          if (action === 'undo') {
            arena.history?.undo(arena.gs, arena.db);
          } else if (action === 'redo') {
            arena.history?.redo(arena.gs, arena.db);
          } else {
            arena[action](...args);
          }
        }
      } else {
        // Sub-service method: e.g. 'timer.start' → arena.timer.start()
        const [service, method] = parts;
        const svc = arena[service];
        if (svc && typeof svc[method] === 'function') {
          svc[method](...args);
        }
      }
    } catch (err) {
      console.error('[ArenaContext] dispatch error:', action, err);
    }

    // Always sync state after dispatch, even if the method threw.
    window.__arenaNotify?.();
  }, []);

  return (
    <ArenaContext.Provider value={{ loadState, gameState, getArena, dispatch }}>
      {children}
    </ArenaContext.Provider>
  );
}

export function useArena() {
  return useContext(ArenaContext);
}
