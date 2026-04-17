import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';

const POLL_MS = 100;
const TIMEOUT_MS = 30000;

export default function GameBridge() {
  const { setArena, setGameState, setLoadState } = useGameStore();

  useEffect(() => {
    let cancelled = false;
    let elapsed = 0;

    const interval = setInterval(() => {
      if (cancelled) return clearInterval(interval);

      elapsed += POLL_MS;

      // Update loading progress from DataLoader
      if ((window as any).__loadProgress !== undefined) {
        setLoadState({
          progress: Math.max(0, (window as any).__loadProgress),
          label: (window as any).__loadLabel || 'Loading game data...',
        });
      }

      const arena = (window as any).arena;
      if (arena) {
        clearInterval(interval);
        setArena(arena);
        setGameState(arena.gs);
        setLoadState({ status: 'ready', progress: 100, label: '' });

        // Install notify hook for engine-to-react communication
        (window as any).__arenaNotify = () => {
          if (!cancelled) {
            setGameState(arena.gs);
          }
        };

        // Patch renderer for legacy renderAll() support
        if (arena.renderer?.renderAll) {
          const orig = arena.renderer.renderAll.bind(arena.renderer);
          arena.renderer.renderAll = () => {
            orig();
            (window as any).__arenaNotify?.();
          };
        }

        // Initialize Lucide icons
        if ((window as any).lucide) (window as any).lucide.createIcons();
        return;
      }

      if (elapsed >= TIMEOUT_MS) {
        clearInterval(interval);
        setLoadState({
          status: 'error',
          error: 'Arena failed to initialize within 30s. Check console.',
        });
      }
    }, POLL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
      if ((window as any).__arenaNotify) delete (window as any).__arenaNotify;
    };
  }, [setArena, setGameState, setLoadState]);

  return null;
}
