import { create } from 'zustand';

interface Player {
  id: number;
  name: string;
  activePokemonIndex: number;
  [key: string]: any;
}

interface GameState {
  players: Player[];
  round: number;
  weather: any;
  activeTurnPlayerId: number | null;
  selectedAttackTargetId: number | null;
  selectedStatusTargetId: number | null;
  currentHPEdit: any;
  _raw: any;
  _ver: number; // Version counter to force re-renders
}

interface LoadState {
  status: 'loading' | 'ready' | 'error';
  progress: number;
  label: string;
  error: string | null;
}

interface GameStore {
  loadState: LoadState;
  gameState: GameState | null;
  currentView: 'lobby' | 'arena';
  arena: any;
  setLoadState: (state: Partial<LoadState>) => void;
  setGameState: (gs: any) => void;
  setArena: (arena: any) => void;
  setView: (view: 'lobby' | 'arena') => void;
  dispatch: (action: string, ...args: any[]) => void;
}

function snapshotGs(gs: any): GameState | null {
  if (!gs) return null;
  return {
    players: (gs.players || []).map((p: any) => ({ 
      ...p,
      team: (p.team || []).map((pk: any) => pk ? { ...pk, stats: { ...pk.stats }, statModifiers: { ...pk.statModifiers }, statuses: { ...pk.statuses } } : null)
    })),
    round: gs.round,
    weather: gs.weather,
    activeTurnPlayerId: gs.activeTurnPlayerId,
    selectedAttackTargetId: gs.selectedAttackTargetId,
    selectedStatusTargetId: gs.selectedStatusTargetId,
    currentHPEdit: gs.currentHPEdit,
    _raw: gs,
    _ver: (Date.now()),
  };
}

export const useGameStore = create<GameStore>((set, get) => ({
  loadState: {
    status: 'loading',
    progress: 5,
    label: 'Loading game data...',
    error: null,
  },
  gameState: null,
  currentView: 'lobby',
  arena: null,

  setLoadState: (state) => set((prev) => ({ loadState: { ...prev.loadState, ...state } })),
  
  setGameState: (gs) => set({ gameState: snapshotGs(gs) }),
  
  setArena: (arena) => set({ arena }),

  setView: (view) => set({ currentView: view }),

  dispatch: (action, ...args) => {
    const arena = get().arena;
    if (!arena) return;

    try {
      const parts = action.split('.');
      if (parts.length === 1) {
        if (typeof arena[action] === 'function') {
          if (action === 'undo') {
            arena.history?.undo(arena.gs, arena.db);
          } else if (action === 'redo') {
            arena.history?.redo(arena.gs, arena.db);
          } else {
            arena[action](...args);
          }
        }
      } else {
        const [service, method] = parts;
        const svc = arena[service];
        if (svc && typeof svc[method] === 'function') {
          svc[method](...args);
        }
      }
    } catch (err) {
      console.error('[GameStore] dispatch error:', action, err);
    }

    // After dispatch, manually trigger sync if engine didn't
    const freshGs = get().arena?.gs;
    if (freshGs) set({ gameState: snapshotGs(freshGs) });
  },
}));
