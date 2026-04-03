import React, { useState, useRef, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import './Arena.css';

// ── Demo data ───────────────────────────────────────────────────────────────
const DEMO_PLAYER = {
  name: 'Ash', pokemon: {
    name: 'Mewtwo', level: 70, currentHp: 234, maxHp: 350,
    types: ['psychic'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/150.png',
  },
};

const DEMO_OPPONENT = {
  name: 'Rival', pokemon: {
    name: 'Lucario', level: 65, currentHp: 38, maxHp: 310,
    types: ['fighting', 'steel'],
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/448.png',
  },
};

const MOVE_TYPES = ['','normal','fire','water','grass','electric','psychic','ghost','dragon','dark','fighting','rock','ice','bug','poison','ground','flying','steel','fairy'];
const STATS = [{ v: 'hp', l: 'HP' }, { v: 'attack', l: 'Atk' }, { v: 'defence', l: 'Def' },
               { v: 'specialAttack', l: 'SpA' }, { v: 'specialDefence', l: 'SpD' }, { v: 'speed', l: 'Spe' }];
const STATUS_BTNS = [
  { id: 'curse', label: 'CRS', color: '#6e5f00' },
  { id: 'poison', label: 'PSN', color: '#9333ea' },
  { id: 'paralyze', label: 'PAR', color: '#eab308' },
  { id: 'weather', label: 'WTH', color: '#2563eb' },
  { id: 'burn', label: 'BRN', color: '#dc2626' },
  { id: 'bad_poison', label: 'TOX', color: '#581c87' },
];
// ────────────────────────────────────────────────────────────────────────────

function useTimer(initialSeconds = 120) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (running && seconds > 0) {
      ref.current = setInterval(() => setSeconds(s => s - 1), 1000);
    } else {
      clearInterval(ref.current);
      if (seconds === 0) setRunning(false);
    }
    return () => clearInterval(ref.current);
  }, [running, seconds]);

  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => { setRunning(false); setSeconds(initialSeconds); };
  return { display: fmt(seconds), start, pause, reset, running };
}

export default function Arena({ onForfeit }) {
  const [round, setRound] = useState(1);
  const [log, setLog] = useState([
    { turn: 1, text: '[SYSTEM] Battle arena initialized!', type: 'system' },
  ]);
  const [attacker, setAttacker] = useState('');
  const [atkTarget, setAtkTarget] = useState('');
  const [moveName, setMoveName] = useState('');
  const [movePower, setMovePower] = useState('');
  const [moveType, setMoveType] = useState('');
  const [statusTarget, setStatusTarget] = useState('');
  const [rng, setRng] = useState('--');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [mgmtPokemon, setMgmtPokemon] = useState('');
  const [statStat, setStatStat] = useState('');
  const [statModType, setStatModType] = useState('set');
  const [statValue, setStatValue] = useState('');
  const [showShortcuts, setShowShortcuts] = useState(false);

  const logRef = useRef(null);
  const timer = useTimer(120);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const addLog = (text, type = 'system') =>
    setLog(prev => [...prev, { turn: round, text, type }]);

  const handleAttack = (kind) => {
    if (!attacker || !atkTarget || !moveName) return;
    addLog(`[T${round}] ${attacker} used ${moveName} on ${atkTarget}! (${kind}, Power: ${movePower || '?'})`, 'player');
  };

  const handleStatus = (status) => {
    if (!statusTarget) return;
    addLog(`[T${round}] ${statusTarget} was inflicted with ${status}!`, 'info');
  };

  const handleRoll = () => {
    const n = Math.floor(Math.random() * 100) + 1;
    setRng(n);
    addLog(`[T${round}] RNG Roll: ${n}`, 'system');
  };

  const handleUpdateStat = () => {
    if (!attacker || !statStat || !statValue) return;
    addLog(`[T${round}] ${attacker}'s ${statStat} ${statModType} ${statValue}`, 'info');
  };

  const handleEndRound = () => {
    addLog(`[T${round}] ── Round ${round} ended ──`, 'system');
    setRound(r => r + 1);
  };

  const playerOptions = [DEMO_PLAYER.pokemon.name, DEMO_OPPONENT.pokemon.name];

  return (
    <div className="arena">
      {/* ── CRT / pixel overlays ── */}
      <div className="arena__crt" />
      <div className="arena__pixel-grid" />
      <div className="arena__gradient-bg" />

      <div className="arena__layout">
        {/* ── Header ── */}
        <header className="arena__header">
          <div className="arena__header-left">
            <span className="arena__header-icon">⚔️</span>
            <h1 className="arena__header-title">POKÉMON BATTLE ARENA</h1>
            <button className="arena__end-round-btn" onClick={handleEndRound}>
              END ROUND {round}
            </button>
          </div>
          <div className="arena__timer-row">
            <div className="arena__timer-display">{timer.display}</div>
            <button className="arena__timer-btn arena__timer-btn--green" onClick={timer.start} title="Start">▶</button>
            <button className="arena__timer-btn arena__timer-btn--yellow" onClick={timer.pause} title="Pause">⏸</button>
            <button className="arena__timer-btn arena__timer-btn--blue" onClick={timer.reset} title="Reset">↺</button>
          </div>
        </header>

        {/* ── Player cards grid ── */}
        <main className="arena__player-area">
          <div className="arena__player-grid">
            <PlayerCard playerName={DEMO_PLAYER.name} pokemon={DEMO_PLAYER.pokemon} side="left" />
            <PlayerCard playerName={DEMO_OPPONENT.name} pokemon={DEMO_OPPONENT.pokemon} side="right" />
          </div>
        </main>

        {/* ── Control Footer ── */}
        <footer className="arena__footer">
          <div className="arena__footer-inner">

            {/* ── LEFT: 5-panel controls grid ── */}
            <div className="arena__controls-grid">

              {/* Panel 1: Attack Command */}
              <div className="arena__panel">
                <div className="arena__panel-highlight arena__panel-highlight--red" />
                <h4 className="arena__panel-title">Attack Command</h4>

                <div className="arena__field-row">
                  <div className="arena__field-group">
                    <label className="arena__field-label">ATTACKER</label>
                    <select className="arena__select" value={attacker} onChange={e => setAttacker(e.target.value)}>
                      <option value="">Select</option>
                      {playerOptions.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="arena__field-group">
                    <label className="arena__field-label">TARGET</label>
                    <select className="arena__select" value={atkTarget} onChange={e => setAtkTarget(e.target.value)}>
                      <option value="">Select</option>
                      {playerOptions.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <label className="arena__field-label">MOVE</label>
                <select className="arena__select" value={moveName} onChange={e => setMoveName(e.target.value)}>
                  <option value="">-- Select Move --</option>
                </select>

                <div className="arena__field-row">
                  <div className="arena__field-group">
                    <label className="arena__field-label">POWER</label>
                    <input className="arena__input" type="number" placeholder="e.g. 80" min={1} max={1000}
                      value={movePower} onChange={e => setMovePower(e.target.value)} />
                  </div>
                  <div className="arena__field-group">
                    <label className="arena__field-label">MOVE TYPE</label>
                    <select className="arena__select" value={moveType} onChange={e => setMoveType(e.target.value)}>
                      {MOVE_TYPES.map(t => <option key={t} value={t}>{t || 'Move Type'}</option>)}
                    </select>
                  </div>
                </div>

                <div className="arena__effectiveness">--</div>

                <div className="arena__field-row" style={{ marginTop: '.25rem' }}>
                  <button className="arena__atk-btn arena__atk-btn--physical" onClick={() => handleAttack('Physical')}>PHYSICAL</button>
                  <button className="arena__atk-btn arena__atk-btn--special" onClick={() => handleAttack('Special')}>SPECIAL</button>
                </div>
              </div>

              {/* Panel 2: Status & Stats */}
              <div className="arena__panel">
                <div className="arena__panel-highlight arena__panel-highlight--purple" />
                <h4 className="arena__panel-title">Status &amp; Stats</h4>

                <div className="arena__status-grid">
                  {STATUS_BTNS.map(s => (
                    <button key={s.id} className="arena__status-btn"
                      style={{ background: s.color }}
                      onClick={() => handleStatus(s.id)}>
                      {s.label}
                    </button>
                  ))}
                </div>

                <label className="arena__field-label">TARGET</label>
                <select className="arena__select" value={statusTarget} onChange={e => setStatusTarget(e.target.value)}>
                  <option value="">Select Target</option>
                  {playerOptions.map(p => <option key={p}>{p}</option>)}
                </select>

                <div className="arena__field-row arena__field-row--3col">
                  <div>
                    <label className="arena__field-label">STAT</label>
                    <select className="arena__select" value={statStat} onChange={e => setStatStat(e.target.value)}>
                      <option value="">Stat</option>
                      {STATS.map(s => <option key={s.v} value={s.v}>{s.l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="arena__field-label">TYPE</label>
                    <select className="arena__select" value={statModType} onChange={e => setStatModType(e.target.value)}>
                      {['set', '+', '-', '+%', '-%'].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="arena__field-label">VAL</label>
                    <input className="arena__input" type="number" placeholder="Val"
                      value={statValue} onChange={e => setStatValue(e.target.value)} />
                  </div>
                </div>
                <button className="arena__update-btn" onClick={handleUpdateStat}>UPDATE</button>
              </div>

              {/* Panel 3: Utility */}
              <div className="arena__panel">
                <div className="arena__panel-highlight arena__panel-highlight--green" />
                <h4 className="arena__panel-title">Utility</h4>

                <label className="arena__field-label" style={{ textAlign: 'center' }}>RNG (1–100)</label>
                <div className="arena__rng-display">{rng}</div>
                <button className="arena__roll-btn" onClick={handleRoll}>ROLL</button>

                <div className="arena__divider" />

                <div className="arena__field-row">
                  <div className="arena__field-group">
                    <label className="arena__field-label">PLAYER</label>
                    <input className="arena__input" placeholder="Name"
                      value={newPlayerName} onChange={e => setNewPlayerName(e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button className="arena__add-btn" onClick={() => {
                      if (newPlayerName) { addLog(`[SYSTEM] ${newPlayerName} joined!`, 'system'); setNewPlayerName(''); }
                    }}>ADD</button>
                  </div>
                </div>
              </div>

              {/* Panel 4: Management */}
              <div className="arena__panel">
                <div className="arena__panel-highlight arena__panel-highlight--blue" />
                <h4 className="arena__panel-title">Management</h4>

                <label className="arena__field-label">POKÉMON</label>
                <select className="arena__select" value={mgmtPokemon} onChange={e => setMgmtPokemon(e.target.value)}>
                  <option value="">Select</option>
                  {playerOptions.map(p => <option key={p}>{p}</option>)}
                </select>

                <div className="arena__mgmt-grid">
                  <button className="arena__mgmt-btn arena__mgmt-btn--blue" disabled={!mgmtPokemon}
                    onClick={() => addLog(`[T${round}] ${mgmtPokemon} evolved!`, 'info')}>EVO</button>
                  <button className="arena__mgmt-btn arena__mgmt-btn--purple" disabled={!mgmtPokemon}
                    onClick={() => addLog(`[T${round}] ${mgmtPokemon} changed form!`, 'info')}>FORM</button>
                  <button className="arena__mgmt-btn arena__mgmt-btn--red" disabled={!mgmtPokemon}
                    onClick={() => addLog(`[T${round}] ${mgmtPokemon} was revived!`, 'player')}>REV</button>
                </div>
              </div>

              {/* Panel 5: Round & History */}
              <div className="arena__panel">
                <div className="arena__panel-highlight arena__panel-highlight--yellow" />
                <h4 className="arena__panel-title">Round &amp; History</h4>

                <div className="arena__field-row">
                  <button className="arena__undo-btn" disabled>↩ UNDO<br /><span className="arena__kbd-hint">Ctrl+Z</span></button>
                  <button className="arena__undo-btn" disabled>↪ REDO<br /><span className="arena__kbd-hint">Ctrl+⇧+Z</span></button>
                </div>

                <div className="arena__divider" />

                <button className="arena__shortcuts-toggle" onClick={() => setShowShortcuts(v => !v)}>
                  ⌨ Shortcuts <span>{showShortcuts ? '▲' : '▼'}</span>
                </button>

                {showShortcuts && (
                  <div className="arena__shortcuts-list">
                    {[['1–6','Select Player'],['Space','End Round'],['P','Physical Atk'],['S','Special Atk'],['E','Evolve'],['F','Form Change'],['R','Random #'],['Esc','Close Modal']].map(([k,v]) => (
                      <div key={k}><kbd className="arena__kbd">{k}</kbd> {v}</div>
                    ))}
                  </div>
                )}
              </div>

            </div>
            {/* ── end controls grid ── */}

            {/* ── RIGHT: Battle Log ── */}
            <div className="arena__log-panel">
              <div className="arena__log-inner">
                <div className="arena__log-header">
                  <div className="arena__log-title-row">
                    <span>📜</span>
                    <span className="arena__log-title">Battle Log</span>
                  </div>
                  <div className="arena__log-btns">
                    <button className="arena__log-action arena__log-action--red" onClick={() => setLog([])}>🗑</button>
                    <button className="arena__log-action arena__log-action--blue" onClick={() => {
                      const text = log.map(e => e.text).join('\n');
                      const a = document.createElement('a');
                      a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
                      a.download = 'battle-log.txt'; a.click();
                    }}>⬇</button>
                  </div>
                </div>
                <div className="arena__log-entries" ref={logRef}>
                  {log.map((entry, i) => (
                    <div key={i} className={`arena__log-entry arena__log-entry--${entry.type}`}>
                      {entry.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </footer>

      </div>
    </div>
  );
}
