import React from 'react';

/**
 * PlayerCard — displays one player's active Pokémon, HP bar, and sprite.
 * Props:
 *   playerName   — string
 *   pokemon      — { name, level, currentHp, maxHp, sprite, types: [] }
 *   side         — 'left' | 'right'  (mirrors layout for opponent)
 */
export default function PlayerCard({ playerName, pokemon, side = 'left' }) {
  const hpPercent = pokemon ? Math.max(0, Math.min(100, (pokemon.currentHp / pokemon.maxHp) * 100)) : 0;

  const hpClass =
    hpPercent > 50 ? 'high' :
    hpPercent > 20 ? 'medium' :
    'low';

  return (
    <div className={`player-card glass player-card--${side}`}>
      {/* Trainer + Pokémon name row */}
      <div className="player-card__header">
        <div className="player-card__trainer-tag">
          <div className="player-card__trainer-dot" />
          <span className="player-card__trainer-name font-display">{playerName}</span>
        </div>
        {pokemon && (
          <div className="player-card__pokemon-title">
            <span className="player-card__pokemon-name font-display">{pokemon.name.toUpperCase()}</span>
            <span className="player-card__pokemon-level">Lv. {pokemon.level}</span>
          </div>
        )}
      </div>

      {/* HP Bar */}
      {pokemon && (
        <div className="player-card__hp-row">
          <span className="player-card__hp-label">HP</span>
          <div className="hp-bar-track flex-1">
            <div
              className={`hp-bar-fill ${hpClass}`}
              style={{ width: `${hpPercent}%` }}
            />
          </div>
          <span className={`player-card__hp-numbers hp-text--${hpClass}`}>
            {pokemon.currentHp} / {pokemon.maxHp}
          </span>
        </div>
      )}

      {/* Type badges */}
      {pokemon?.types && (
        <div className="player-card__types">
          {pokemon.types.map(t => (
            <span key={t} className={`type-badge type-badge--${t.toLowerCase()}`}>{t}</span>
          ))}
        </div>
      )}

      {/* Sprite area */}
      <div className={`player-card__sprite-area player-card__sprite-area--${side}`}>
        {pokemon?.sprite ? (
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            className="player-card__sprite"
          />
        ) : (
          <div className="player-card__sprite-placeholder">?</div>
        )}
        {/* Glow ring */}
        <div className={`player-card__glow-ring hp-glow--${hpClass}`} />
      </div>
    </div>
  );
}
