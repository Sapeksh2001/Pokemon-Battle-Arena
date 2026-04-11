import React, { useState } from 'react';
import './EditPokemonSlot.css';

/**
 * EditPokemonSlot — modal dialog for assigning/swapping a Pokémon in a roster slot.
 * Searches the PokeAPI for a Pokémon by name/ID.
 */
export default function EditPokemonSlot({ slotId, onSave, onCancel }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.trim().toLowerCase()}`);
      if (!res.ok) throw new Error('Pokémon not found');
      const data = await res.json();
      setResult({
        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
        type: data.types[0].type.name,
        level: 50,
        currentHp: data.stats.find(s => s.stat.name === 'hp')?.base_stat ?? 100,
        maxHp: data.stats.find(s => s.stat.name === 'hp')?.base_stat ?? 100,
        sprite: data.sprites?.other?.home?.front_default ?? data.sprites?.front_default,
        stats: {
          atk:   data.stats.find(s => s.stat.name === 'attack')?.base_stat ?? 0,
          def:   data.stats.find(s => s.stat.name === 'defense')?.base_stat ?? 0,
          spAtk: data.stats.find(s => s.stat.name === 'special-attack')?.base_stat ?? 0,
          spDef: data.stats.find(s => s.stat.name === 'special-defense')?.base_stat ?? 0,
          spd:   data.stats.find(s => s.stat.name === 'speed')?.base_stat ?? 0,
        },
        moves: data.moves.slice(0, 4).map(m =>
          m.move.name.replace(/-/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        ),
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-slot-overlay" role="dialog" aria-modal="true" aria-label="Edit Pokémon Slot">
      <div className="edit-slot-modal glass">
        <div className="edit-slot-header font-display">
          EDIT SLOT {slotId}
          <button className="edit-slot-close" onClick={onCancel} aria-label="Close">✕</button>
        </div>

        {/* Search */}
        <div className="edit-slot-search">
          <input
            id="input-pokemon-search"
            className="edit-slot-input glass"
            placeholder="Search Pokémon name or ID..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            autoFocus
          />
          <button
            id="btn-search-pokemon"
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.8rem' }}
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? '...' : 'SEARCH'}
          </button>
        </div>

        {error && <p className="edit-slot-error">{error}</p>}

        {/* Result Preview */}
        {result && (
          <div className="edit-slot-result glass">
            <img src={result.sprite} alt={result.name} className="edit-slot-sprite" />
            <div className="edit-slot-result-info">
              <span className="edit-slot-result-name font-display">{result.name.toUpperCase()}</span>
              <span className={`type-badge type-badge--${result.type}`}>{result.type}</span>
              <div className="edit-slot-stats">
                {Object.entries(result.stats).map(([k, v]) => (
                  <span key={k} className="edit-slot-stat-chip">{k.toUpperCase()}: {v}</span>
                ))}
              </div>
              <div className="edit-slot-moves-preview">
                {result.moves.map(m => <span key={m} className="team-mgmt__move-chip glass">{m}</span>)}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="edit-slot-footer">
          <button className="btn-secondary" onClick={onCancel}>CANCEL</button>
          {result && (
            <button id="btn-confirm-slot" className="btn-primary" onClick={() => onSave(result)}>
              CONFIRM
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
