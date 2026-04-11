import React, { useState } from 'react';
import EditPokemonSlot from './EditPokemonSlot';
import EditPokemonHP from './EditPokemonHP';
import './TeamManagement.css';

const INITIAL_TEAM = [
  { id: 1, name: 'Mewtwo',    type: 'psychic',  level: 70, currentHp: 350, maxHp: 350, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/150.png',  stats: { atk: 154, def: 90, spAtk: 194, spDef: 120, spd: 130 }, moves: ['Psystrike', 'Aura Sphere', 'Shadow Ball', 'Recover'] },
  { id: 2, name: 'Charizard', type: 'fire',     level: 60, currentHp: 266, maxHp: 360, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png',   stats: { atk: 84,  def: 78, spAtk: 109, spDef: 85,  spd: 100 }, moves: ['Flamethrower', 'Air Slash', 'Focus Blast', 'Dragon Claw'] },
  { id: 3, name: 'Gyarados',  type: 'water',    level: 52, currentHp: 180, maxHp: 394, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/130.png', stats: { atk: 125, def: 79, spAtk: 60,  spDef: 100, spd: 81 }, moves: ['Waterfall', 'Ice Fang', 'Earthquake', 'Dragon Dance'] },
  { id: 4, name: 'Gengar',    type: 'ghost',    level: 48, currentHp: 324, maxHp: 324, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/94.png',  stats: { atk: 65,  def: 60, spAtk: 130, spDef: 75,  spd: 110 }, moves: ['Shadow Ball', 'Sludge Bomb', 'Thunderbolt', 'Hypnosis'] },
  { id: 5, name: 'Zapdos',    type: 'electric', level: 55, currentHp: 340, maxHp: 380, sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/145.png', stats: { atk: 90,  def: 85, spAtk: 125, spDef: 90,  spd: 100 }, moves: ['Thunderbolt', 'Heat Wave', 'Roost', 'Agility'] },
  { id: 6, name: null }
];

/**
 * TeamManagement — full-page roster editor.
 * Composed of the 6-slot team grid, a detail panel, and dialogs
 * for EditPokemonSlot and EditPokemonHP.
 */
export default function TeamManagement({ onBack }) {
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [selectedId, setSelectedId] = useState(1);
  const [editingSlot, setEditingSlot] = useState(null);   // slot id being replaced
  const [editingHp, setEditingHp] = useState(null);       // slot being HP-edited

  const selected = team.find(p => p.id === selectedId);

  const handleSaveHP = (slotId, newHp) => {
    setTeam(prev => prev.map(p => p.id === slotId ? { ...p, currentHp: newHp } : p));
    setEditingHp(null);
  };

  const handleSaveSlot = (slotId, newPokemon) => {
    setTeam(prev => prev.map(p => p.id === slotId ? { ...newPokemon, id: slotId } : p));
    setEditingSlot(null);
  };

  return (
    <div className="team-mgmt">
      {/* Header */}
      <header className="team-mgmt__header glass">
        <button id="btn-back-lobby" className="btn-secondary team-mgmt__back-btn" onClick={onBack}>
          ← BACK
        </button>
        <h1 className="team-mgmt__title font-display">MANAGE TEAM</h1>
        <div className="team-mgmt__header-spacer" />
      </header>

      {/* Main two-col layout */}
      <div className="team-mgmt__body">
        {/* Left: 6-slot grid */}
        <div className="team-mgmt__grid-col">
          <h2 className="team-mgmt__section-label font-display">YOUR ROSTER</h2>
          <div className="team-mgmt__grid">
            {team.map((slot) => (
              slot.name ? (
                <button
                  key={slot.id}
                  id={`slot-${slot.id}`}
                  className={`team-mgmt__slot glass ${selectedId === slot.id ? 'team-mgmt__slot--active' : ''}`}
                  onClick={() => setSelectedId(slot.id)}
                >
                  <img src={slot.sprite} alt={slot.name} className="team-mgmt__slot-sprite" />
                  <div className="team-mgmt__slot-info">
                    <span className="team-mgmt__slot-name font-display">{slot.name.toUpperCase()}</span>
                    <span className={`type-badge type-badge--${slot.type}`}>{slot.type}</span>
                    <span className="team-mgmt__slot-level">Lv. {slot.level}</span>
                    <div className="hp-bar-track" style={{ marginTop: 4 }}>
                      <div
                        className={`hp-bar-fill ${slot.currentHp / slot.maxHp > 0.5 ? 'high' : slot.currentHp / slot.maxHp > 0.2 ? 'medium' : 'low'}`}
                        style={{ width: `${(slot.currentHp / slot.maxHp) * 100}%` }}
                      />
                    </div>
                    <span className="team-mgmt__slot-hp">{slot.currentHp}/{slot.maxHp}</span>
                  </div>
                </button>
              ) : (
                <button
                  key={slot.id}
                  id={`slot-empty-${slot.id}`}
                  className="team-mgmt__slot team-mgmt__slot--empty"
                  onClick={() => setEditingSlot(slot.id)}
                >
                  <span className="team-mgmt__empty-plus">＋</span>
                  <span className="team-mgmt__empty-label">ADD POKÉMON</span>
                </button>
              )
            ))}
          </div>
        </div>

        {/* Right: Detail panel */}
        {selected?.name ? (
          <aside className="team-mgmt__detail glass">
            <div className="team-mgmt__detail-hero">
              <img src={selected.sprite} alt={selected.name} className="team-mgmt__detail-sprite" />
              <div className="team-mgmt__detail-title">
                <span className="team-mgmt__detail-name font-display">{selected.name.toUpperCase()}</span>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span className={`type-badge type-badge--${selected.type}`}>{selected.type}</span>
                  <span className="team-mgmt__slot-level">Lv. {selected.level}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="team-mgmt__stats">
              <h3 className="team-mgmt__stats-label font-display">STATS</h3>
              {Object.entries(selected.stats).map(([key, val]) => (
                <div key={key} className="team-mgmt__stat-row">
                  <span className="team-mgmt__stat-key">{key.toUpperCase()}</span>
                  <div className="hp-bar-track" style={{ flex: 1, height: 6 }}>
                    <div className="hp-bar-fill high" style={{ width: `${Math.min(100, (val / 200) * 100)}%` }} />
                  </div>
                  <span className="team-mgmt__stat-val">{val}</span>
                </div>
              ))}
            </div>

            {/* Moveset */}
            <div className="team-mgmt__moveset">
              <h3 className="team-mgmt__stats-label font-display">MOVESET</h3>
              <div className="team-mgmt__moves">
                {selected.moves.map(m => (
                  <span key={m} className="team-mgmt__move-chip glass">{m}</span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="team-mgmt__actions">
              <button
                id="btn-edit-hp"
                className="btn-secondary"
                style={{ flex: 1 }}
                onClick={() => setEditingHp(selected.id)}
              >
                EDIT HP
              </button>
              <button
                id="btn-swap-slot"
                className="btn-secondary"
                style={{ flex: 1 }}
                onClick={() => setEditingSlot(selected.id)}
              >
                SWAP SLOT
              </button>
            </div>
          </aside>
        ) : (
          <aside className="team-mgmt__detail team-mgmt__detail--empty glass">
            <p className="team-mgmt__select-hint">Select a Pokémon from the roster</p>
          </aside>
        )}
      </div>

      {/* Sub-modals */}
      {editingHp !== null && (
        <EditPokemonHP
          pokemon={team.find(p => p.id === editingHp)}
          onSave={(newHp) => handleSaveHP(editingHp, newHp)}
          onCancel={() => setEditingHp(null)}
        />
      )}
      {editingSlot !== null && (
        <EditPokemonSlot
          slotId={editingSlot}
          onSave={(data) => handleSaveSlot(editingSlot, data)}
          onCancel={() => setEditingSlot(null)}
        />
      )}
    </div>
  );
}
