/**
 * ArenaContext.jsx  (React-native event bridge — v2)
 *
 * Architecture:
 *  1. Polls for window.arena as before (100 ms, 30 s timeout).
 *  2. Once found, installs window.__arenaNotify so the engine can ping React
 *     without any DOM coupling. The engine calls this after every renderAll().
 *  3. On each notify, we shallow-copy arena.gs into React state (gameState).
 *     Components consume gameState directly instead of a blind tick counter.
 *  4. dispatch(action, ...args) is the new React-facing API:
 *       dispatch('handleAttack', 'physical')
 *       dispatch('endRound')
 *       dispatch('timer.start')       ← dot-notation for sub-objects
 *     It resolves the method on the arena/timer/history/multiplayer object,
 *     calls it, then fires __arenaNotify so React state syncs immediately.
 *  5. getArena() still works for raw access (multiplayer, modals, etc.).
 *
 * UI/UX impact: ZERO — all visual components are unchanged.
 */

import React, {
  createContext, useContext, useEffect, useState, useRef, useCallback,
} from 'react';

const ArenaContext = createContext(null);

const POLL_MS    = 100;
const TIMEOUT_MS = 30_000;

// Shallow-clone the relevant slices of gs so React sees a new object reference.
function snapshotGs(gs) {
  if (!gs) return null;
  return {
    players:               [...(gs.players || [])],
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
    let elapsed   = 0;

    const interval = setInterval(() => {
      if (cancelled) return clearInterval(interval);

      elapsed += POLL_MS;

      // Mirror DataLoader progress if exposed
      if (window.__loadProgress !== undefined) {
        setLoadState(prev => ({
          ...prev,
          progress: Math.max(prev.progress, window.__loadProgress),
          label:    window.__loadLabel || prev.label,
        }));
      }

      if (window.arena) {
        clearInterval(interval);
        const arena = window.arena;
        arenaRef.current = arena;

        // ── Install notify hook ──────────────────────────────────────────
        // The engine calls window.__arenaNotify() after renderAll().
        // This is the only coupling point between engine and React.
        window.__arenaNotify = () => {
          if (!cancelled) notify();
        };

        // ── Patch renderer so legacy renderAll() also pings React ────────
        // This handles any renderAll() calls that happen before a given
        // component has wired up its own dispatch() call.
        if (arena.renderer?.renderAll) {
          const orig = arena.renderer.renderAll.bind(arena.renderer);
          arena.renderer.renderAll = () => {
            orig();
            window.__arenaNotify?.();
          };
        }

        // Lucide icons (engine may inject them into dynamic HTML)
        if (window.lucide) window.lucide.createIcons();

        if (!cancelled) {
          setGameState(snapshotGs(arena.gs));
          setLoadState({ status: 'ready', progress: 100, label: '', error: null });
        }
        return;
      }

      if (elapsed >= TIMEOUT_MS) {
        clearInterval(interval);
        if (!cancelled) {
          setLoadState({
            status:   'error',
            progress: 0,
            label:    '',
            error:    'Arena failed to initialise within 30 s. Check the browser console.',
          });
        }
      }
    }, POLL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
      // Clean up global hook on unmount
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
