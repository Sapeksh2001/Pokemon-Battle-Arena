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
        background: 'transparent',
        borderColor: 'transparent',
        transform: isSelected ? 'scale(1.15)' : 'scale(1)',
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
            key={pokemon.fullName}
            src={pokemon.sprite}
            alt={pokemon.fullName}
            className="w-full h-full object-contain pixelated transition-all duration-300"
            style={{ 
              imageRendering: 'pixelated',
              filter: isSelected ? 'drop-shadow(0 0 8px rgba(250,204,21,0.8))' : 'none'
            }}
            onError={e => {
              const target = e.target;
              if(!target.dataset.tried){
                target.dataset.tried = '1';
                if(target.src.includes('.gif')){
                  target.src = target.src.replace('/ani/', '/gen5/').replace('.gif', '.png');
                } else {
                  // If it was already a PNG, skip directly to dex directory
                  target.dataset.tried = '2';
                  const slug = (pokemon.fullName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                  target.src = `https://play.pokemonshowdown.com/sprites/dex/${slug}.png`;
                }
              } else if (target.dataset.tried === '1') {
                target.dataset.tried = '2';
                const slug = (pokemon.fullName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                target.src = `https://play.pokemonshowdown.com/sprites/dex/${slug}.png`;
              } else {
                target.id = 'img-error'; 
                target.style.display = 'none';
              }
            }}
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
  const { gameState, getArena } = useArena();
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
        val = `${player.id}|${player.activePokemonIndex}`;
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
  }, [gameState, selectId, buildEntries]);

  const handleClick = useCallback((value) => {
    setSelected(value);
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.setAttribute('data-value', value);
    sel.value = value;
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  }, [selectId]);

  if (entries.length === 0) return null;

  return (
    <div className="flex justify-evenly items-center w-full pb-1 mt-1 picker-scroll no-scrollbar">
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


