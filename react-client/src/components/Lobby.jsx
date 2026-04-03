import React, { useState, useEffect } from 'react';
import './Lobby.css';

export default function Lobby({ onStartBattle, onManageTeam }) {
  const [trainerName, setTrainerName] = useState(() =>
    localStorage.getItem('trainerName') || ''
  );
  const [activeModal, setActiveModal] = useState(null); // 'create' | 'join' | 'settings'
  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('2');
  const [battleType, setBattleType] = useState('singles');
  const [roomCode, setRoomCode] = useState('');
  const [volume, setVolume] = useState(50);
  const [animSpeed, setAnimSpeed] = useState('1');
  const [autosave, setAutosave] = useState(true);
  const [damageNumbers, setDamageNumbers] = useState(true);

  useEffect(() => {
    if (trainerName) localStorage.setItem('trainerName', trainerName);
  }, [trainerName]);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="lobby">
      {/* ── Background layers ── */}
      <div className="lobby__crt" />
      <div className="lobby__pixel-grid" />
      <div className="lobby__gradient-bg" />

      <div className="lobby__layout">
        {/* ── Header ── */}
        <header className="lobby__header">
          <div className="lobby__brand">
            <span className="lobby__brand-bolt material-icon">⚡</span>
            <div>
              <h1 className="lobby__brand-title">POKÉMON BATTLE ARENA</h1>
              <p className="lobby__brand-sub">Competitive Battle Simulator</p>
            </div>
            <span className="lobby__brand-bolt material-icon">⚡</span>
          </div>
          <div className="lobby__header-right">
            <div className="lobby__trainer-badge">
              <span className="lobby__trainer-icon">👤</span>
              <span className="lobby__trainer-label">TRAINER</span>
            </div>
          </div>
        </header>

        {/* ── Main ── */}
        <main className="lobby__main">
          <div className="lobby__card">
            <div className="lobby__card-highlight" />

            <div className="lobby__welcome">
              <h2 className="lobby__welcome-title">Welcome, Trainer!</h2>
              <div className="lobby__welcome-divider" />
              <p className="lobby__welcome-desc">
                Prepare for intense Pokémon battles with up to 6 trainers.
                Build your team and prove your skills!
              </p>
            </div>

            {/* ── Action Buttons ── */}
            <div className="lobby__actions">
              <button
                id="btn-start-battle"
                className="lobby__action-btn lobby__action-btn--battle"
                onClick={onStartBattle}
              >
                <span className="lobby__action-icon">⚡</span>
                <div className="lobby__action-text">
                  <span className="lobby__action-label">QUICK BATTLE</span>
                  <span className="lobby__action-sub">Instant matchmaking</span>
                </div>
                <span className="lobby__action-arrow">›</span>
              </button>

              <button
                className="lobby__action-btn lobby__action-btn--create"
                onClick={() => setActiveModal('create')}
              >
                <span className="lobby__action-icon">＋</span>
                <div className="lobby__action-text">
                  <span className="lobby__action-label">CREATE ROOM</span>
                  <span className="lobby__action-sub">Host a private match</span>
                </div>
                <span className="lobby__action-arrow">›</span>
              </button>

              <button
                className="lobby__action-btn lobby__action-btn--join"
                onClick={() => setActiveModal('join')}
              >
                <span className="lobby__action-icon">👥</span>
                <div className="lobby__action-text">
                  <span className="lobby__action-label">JOIN ROOM</span>
                  <span className="lobby__action-sub">Enter room code</span>
                </div>
                <span className="lobby__action-arrow">›</span>
              </button>

              <button
                className="lobby__action-btn lobby__action-btn--settings"
                onClick={() => setActiveModal('settings')}
              >
                <span className="lobby__action-icon">⚙</span>
                <div className="lobby__action-text">
                  <span className="lobby__action-label">SETTINGS</span>
                  <span className="lobby__action-sub">Audio &amp; System config</span>
                </div>
              </button>
            </div>

            {/* ── Trainer Name Input ── */}
            <div className="lobby__name-section">
              <label className="lobby__name-label">Trainer Name</label>
              <div className="lobby__name-input-wrap">
                <input
                  id="trainer-name-input"
                  type="text"
                  className="lobby__name-input"
                  placeholder="ENTER_NAME..."
                  value={trainerName}
                  onChange={e => setTrainerName(e.target.value)}
                />
                <div className="lobby__name-cursor" />
              </div>
              <div className="lobby__name-hint">This will be your display name in battles</div>
            </div>
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="lobby__footer">
          <div className="lobby__audio-hint">
            <span>🔊</span>
            <span className="lobby__audio-text">Press any button to enable audio</span>
          </div>
          <p className="lobby__copyright">© 2025 Pokémon Battle Arena</p>
        </footer>

        {/* ── Bottom Nav ── */}
        <nav className="lobby__bottom-nav">
          <button id="btn-manage-team" className="lobby__nav-item lobby__nav-item--active" onClick={onStartBattle}>
            <span>⚔️</span>
            <span className="lobby__nav-label">BATTLE</span>
          </button>
          <button className="lobby__nav-item" onClick={() => setActiveModal('join')}>
            <span>👥</span>
            <span className="lobby__nav-label">ROOMS</span>
          </button>
          <button className="lobby__nav-item" onClick={onManageTeam}>
            <span>🧑</span>
            <span className="lobby__nav-label">TRAINER</span>
          </button>
          <button className="lobby__nav-item" onClick={() => setActiveModal('settings')}>
            <span>⚙️</span>
            <span className="lobby__nav-label">SYSTEM</span>
          </button>
        </nav>
      </div>

      {/* ── Modal: Create Room ── */}
      {activeModal === 'create' && (
        <div className="lobby__modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="lobby__modal">
            <div className="lobby__modal-highlight" />
            <div className="lobby__modal-header">
              <h2 className="lobby__modal-title">Create Battle Room</h2>
              <button className="lobby__modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="lobby__modal-body">
              <label className="lobby__field-label">Room Name:</label>
              <input className="lobby__field-input" placeholder="Epic Battle Room..." value={roomName} onChange={e => setRoomName(e.target.value)} />
              <label className="lobby__field-label">Max Players:</label>
              <select className="lobby__field-select" value={maxPlayers} onChange={e => setMaxPlayers(e.target.value)}>
                {['2','3','4','5','6'].map(n => <option key={n} value={n}>{n} Players</option>)}
              </select>
              <label className="lobby__field-label">Battle Type:</label>
              <select className="lobby__field-select" value={battleType} onChange={e => setBattleType(e.target.value)}>
                <option value="singles">Singles</option>
                <option value="doubles">Doubles</option>
                <option value="triples">Triples</option>
              </select>
              <button className="lobby__modal-confirm lobby__modal-confirm--green" onClick={closeModal}>
                ✓ CREATE ROOM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Join Room ── */}
      {activeModal === 'join' && (
        <div className="lobby__modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="lobby__modal">
            <div className="lobby__modal-highlight lobby__modal-highlight--purple" />
            <div className="lobby__modal-header">
              <h2 className="lobby__modal-title">Join Battle Room</h2>
              <button className="lobby__modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="lobby__modal-body">
              <label className="lobby__field-label">Enter Room Code:</label>
              <input
                className="lobby__field-input lobby__field-input--code"
                placeholder="123456"
                maxLength={6}
                value={roomCode}
                onChange={e => setRoomCode(e.target.value.toUpperCase())}
              />
              <div className="lobby__field-hint">6-digit code provided by room host</div>

              <p className="lobby__field-label" style={{ marginTop: '1rem' }}>Recent Rooms:</p>
              <div className="lobby__recent-rooms">
                {[{ code: '123456', host: 'Gary', count: '4/6' }, { code: '654321', host: 'Ash', count: '2/6' }].map(r => (
                  <button key={r.code} className="lobby__room-option" onClick={() => setRoomCode(r.code)}>
                    <div>
                      <div className="lobby__room-code">{r.code}</div>
                      <div className="lobby__room-host">Hosted by {r.host}</div>
                    </div>
                    <div className="lobby__room-count">{r.count}</div>
                  </button>
                ))}
              </div>

              <button className="lobby__modal-confirm lobby__modal-confirm--purple" onClick={closeModal}>
                👥 JOIN ROOM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Settings ── */}
      {activeModal === 'settings' && (
        <div className="lobby__modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="lobby__modal">
            <div className="lobby__modal-highlight" />
            <div className="lobby__modal-header">
              <h2 className="lobby__modal-title">Settings</h2>
              <button className="lobby__modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="lobby__modal-body">
              <label className="lobby__field-label lobby__field-label--row">
                <span>Volume</span>
                <span className="lobby__volume-val">{volume}%</span>
              </label>
              <input type="range" min={0} max={100} value={volume} onChange={e => setVolume(+e.target.value)} className="lobby__range" />

              <label className="lobby__field-label">Animation Speed</label>
              <select className="lobby__field-select" value={animSpeed} onChange={e => setAnimSpeed(e.target.value)}>
                <option value="0.5">Slow (0.5x)</option>
                <option value="1">Normal (1x)</option>
                <option value="1.5">Fast (1.5x)</option>
                <option value="2">Very Fast (2x)</option>
              </select>

              <div className="lobby__checkbox-row" onClick={() => setAutosave(v => !v)}>
                <input type="checkbox" checked={autosave} readOnly className="lobby__checkbox" />
                <label className="lobby__checkbox-label">Enable Autosave</label>
              </div>
              <div className="lobby__checkbox-row" onClick={() => setDamageNumbers(v => !v)}>
                <input type="checkbox" checked={damageNumbers} readOnly className="lobby__checkbox" />
                <label className="lobby__checkbox-label">Show Damage Numbers</label>
              </div>

              <button className="lobby__modal-confirm lobby__modal-confirm--green" onClick={() => {
                localStorage.setItem('gameSettings', JSON.stringify({ volume, animSpeed, autosave, damageNumbers }));
                closeModal();
              }}>
                💾 SAVE SETTINGS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
