import React, { useState } from 'react';
import './EditPokemonHP.css';

/**
 * EditPokemonHP — modal dialog for adjusting a Pokémon's current HP.
 */
export default function EditPokemonHP({ pokemon, onSave, onCancel }) {
  const [hp, setHp] = useState(pokemon?.currentHp ?? 0);

  if (!pokemon) return null;

  const pct = Math.max(0, Math.min(100, (hp / pokemon.maxHp) * 100));
  const hpClass = pct > 50 ? 'high' : pct > 20 ? 'medium' : 'low';

  return (
    <div className="edit-hp-overlay" role="dialog" aria-modal="true" aria-label="Edit HP">
      <div className="edit-hp-modal glass">
        <div className="edit-hp-header font-display">
          EDIT HP — {pokemon.name.toUpperCase()}
          <button className="edit-slot-close" onClick={onCancel} aria-label="Close">✕</button>
        </div>

        {/* Current display */}
        <div className="edit-hp-preview">
          <img src={pokemon.sprite} alt={pokemon.name} className="edit-hp-sprite" />
          <div className="edit-hp-bar-block">
            <div className="hp-bar-track edit-hp-track">
              <div className={`hp-bar-fill ${hpClass}`} style={{ width: `${pct}%` }} />
            </div>
            <div className="edit-hp-numbers">
              <span className={`hp-text--${hpClass}`}>{hp}</span>
              <span className="edit-hp-sep"> / </span>
              <span>{pokemon.maxHp}</span>
              <span className="edit-hp-pct">({Math.round(pct)}%)</span>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="edit-hp-slider-block">
          <label className="edit-hp-label font-display" htmlFor="hp-slider">ADJUST HP</label>
          <input
            id="hp-slider"
            type="range"
            min="0"
            max={pokemon.maxHp}
            value={hp}
            onChange={e => setHp(Number(e.target.value))}
            className="edit-hp-slider"
          />
        </div>

        {/* Number input */}
        <div className="edit-hp-input-block">
          <input
            id="input-hp-direct"
            type="number"
            min="0"
            max={pokemon.maxHp}
            value={hp}
            onChange={e => setHp(Math.max(0, Math.min(pokemon.maxHp, Number(e.target.value))))}
            className="edit-slot-input glass"
            style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 700 }}
          />
        </div>

        {/* Quick-set chips */}
        <div className="edit-hp-quick">
          {[100, 75, 50, 25, 1, 0].map(pctVal => (
            <button
              key={pctVal}
              className="edit-hp-quick-btn glass"
              onClick={() => setHp(Math.round((pctVal / 100) * pokemon.maxHp))}
            >
              {pctVal}%
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="edit-slot-footer">
          <button className="btn-secondary" onClick={onCancel}>CANCEL</button>
          <button
            id="btn-confirm-hp"
            className="btn-primary"
            onClick={() => onSave(hp)}
          >
            SAVE HP
          </button>
        </div>
      </div>
    </div>
  );
}
