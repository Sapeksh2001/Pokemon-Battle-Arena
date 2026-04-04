/**
 * PokemonPicker.jsx
 *
 * A ultra-minimal visual replacement for plain <select> dropdowns.
 * Only renders the active Pokémon's sprite for each player.
 */

import { useState, useCallback, useMemo } from 'react';
import { useArena } from '../context/ArenaContext';

// ─── Single card (Sprite Only) ───────────────────────────────────────────────

function PokemonCard({ pokemon, isSelected, isFainted, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={pokemon.fullName || 'Pokémon'}
      className="relative flex-shrink-0 flex items-center justify-center p-1 border-2 transition-all duration-150 cursor-pointer group"
      style={{
        background: isSelected ? 'rgba(250,204,21,0.2)' : 'rgba(13,22,45,0.7)',
        borderColor: isSelected ? '#facc15' : '#40485d',
        boxShadow: isSelected ? '0 0 10px 1px rgba(250,204,21,0.45)' : 'none',
        opacity: isFainted ? 0.4 : 1,
        width: 44,
        height: 44,
      }}
    >
      {/* Fainted overlay */}
      {isFainted && (
        <div className="absolute inset-0 bg-red-900/40 z-10 pointer-events-none flex items-center justify-center">
          <span className="text-[9px] font-bold text-red-400 uppercase rotate-[-20deg]">KO</span>
        </div>
      )}

      {/* Sprite */}
      <div className="w-full h-full flex items-center justify-center relative">
        {pokemon.sprite ? (
          <img
            src={pokemon.sprite}
            alt={pokemon.fullName}
            className="w-full h-full object-contain pixelated"
            style={{ imageRendering: 'pixelated' }}
            onError={e => { e.target.id = 'img-error'; e.target.style.display = 'none'; }}
          />
        ) : (
          <span className="material-symbols-outlined text-[20px] text-[#40485d]">catching_pokemon</span>
        )}
      </div>
    </button>
  );
}

// ─── Unified Picker ─────────────────────────────────────────────────────────

export default function PokemonPicker({ selectId }) {
  const { tick, getArena } = useArena();
  // Track the last value clicked so we can highlight it immediately on
  // click, before the next tick-driven re-render propagates the change.
  const [clickedValue, setClickedValue] = useState('');

  // Build entry list from arena game state (Active Pokémon ONLY).
  // `tick` is included in the dep array as an explicit refresh signal:
  // getArena() returns a stable ref whose *contents* mutate in-place, so
  // without tick the memo would never recalculate on arena state changes.
  const entries = useMemo(() => {
    const arena = getArena();
    if (!arena?.gs?.players) return [];

    return arena.gs.players.flatMap(player => {
      // Always get the active Pokémon
      const pk = player.getActivePokemon?.();
      if (!pk) return [];

      // Determine value for the select
      // Management select value is playerIdx-pkIdx
      let val;
      if (selectId === 'management-pokemon-select') {
        val = `${player.id}-${player.activePokemonIndex}`;
      } else {
        val = player.id.toString();
      }

      return [{
        value: val,
        pokemon: pk,
        isFainted: pk.isFainted?.() || (pk.currentHP <= 0),
      }];
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, getArena, selectId]);

  // Derive the currently-selected value from the hidden <select> DOM element
  // on every render. The hidden <select> elements are rendered by ArenaView
  // (same render tree), so they exist in the DOM before this component reads
  // them. The component re-renders on every tick so this stays in sync with
  // changes the legacy engine makes to the select value without needing a
  // separate useEffect → setState cycle (which would trigger a second render).
  const domSelected = document.getElementById(selectId)?.value ?? '';
  // Prefer the locally-clicked value so the highlight updates immediately;
  // fall back to the DOM value once the legacy engine acknowledges the change.
  const selected = entries.some(e => e.value === clickedValue) ? clickedValue : domSelected;

  const handleClick = useCallback((value) => {
    setClickedValue(value);
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.value = value;
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  }, [selectId]);

  if (entries.length === 0) return null;

  return (
    <div className="flex justify-between items-center w-full pb-1 mt-1 picker-scroll no-scrollbar">
      {entries.map(({ value, pokemon, isFainted }) => (
        <PokemonCard
          key={value}
          pokemon={pokemon}
          isSelected={selected === value}
          isFainted={isFainted}
          onClick={() => handleClick(value)}
        />
      ))}
    </div>
  );
}


