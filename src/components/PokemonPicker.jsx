/**
 * PokemonPicker.jsx
 *
 * A ultra-minimal visual replacement for plain <select> dropdowns.
 * Only renders the active Pokémon's sprite for each player.
 */

import { useEffect, useState, useCallback } from 'react';
import { useArena } from '../context/ArenaContext';

// ─── Single card (Sprite Only) ───────────────────────────────────────────────

function PokemonCard({ pokemon, value, isSelected, isFainted, onClick }) {
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
  const [selected, setSelected] = useState('');
  const [entries, setEntries] = useState([]);

  // Build entry list from arena game state (Active Pokémon ONLY)
  const buildEntries = useCallback(() => {
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
        const playerIdx = arena.gs.players.indexOf(player);
        val = `${playerIdx}-${player.activePokemonIndex}`;
      } else {
        val = player.id.toString();
      }

      return [{
        value: val,
        pokemon: pk,
        isFainted: pk.isFainted?.() || (pk.currentHP <= 0),
      }];
    });
  }, [getArena, selectId]);

  useEffect(() => {
    setEntries(buildEntries());
    const sel = document.getElementById(selectId);
    if (sel) setSelected(sel.value);
  }, [tick, selectId, buildEntries]);

  const handleClick = useCallback((value) => {
    setSelected(value);
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.value = value;
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  }, [selectId]);

  if (entries.length === 0) return null;

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1 mt-1 picker-scroll no-scrollbar">
      {entries.map(({ value, pokemon, isFainted }) => (
        <PokemonCard
          key={value}
          pokemon={pokemon}
          value={value}
          isSelected={selected === value}
          isFainted={isFainted}
          onClick={() => handleClick(value)}
        />
      ))}
    </div>
  );
}


