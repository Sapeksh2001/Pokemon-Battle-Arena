/**
 * MultiplayerModals.jsx
 *
 * Provides two proper React modals that replace the old browser prompt() calls:
 *  - CreateRoomModal — opened when LobbyView shows #room-modal
 *  - JoinRoomModal   — opened when LobbyView shows #join-modal
 *
 * Both modals use controlled inputs, proper UX affordances, and call the
 * engine's global window.createMultiplayerRoom(name) / window.joinMultiplayerRoom(code, name)
 * with parameters — no prompt() needed.
 */

import { useState, useCallback, useEffect, useRef } from 'react';

// ─── Shared modal backdrop ──────────────────────────────────────────────────

function ModalBackdrop({ onClose, children }) {
  // Close on backdrop click
  return (
    <div
      className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-[#060e20] border-4 border-[#6d758c] w-full max-w-md shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Create Room Modal ───────────────────────────────────────────────────────

export function CreateRoomModal({ defaultName = '', onClose }) {
  const [name, setName] = useState(defaultName);
  const [selectedTiers, setSelectedTiers] = useState(['Basic', 'Mid', 'Final', 'Legendary', 'Mythical', 'Ultra Beast']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const toggleTier = (tier) => {
    setSelectedTiers(prev => 
      prev.includes(tier) 
        ? prev.filter(t => t !== tier) 
        : [...prev, tier]
    );
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) { setError('Trainer name is required.'); return; }
    if (trimmed.length > 64) { setError('Name must be 64 characters or fewer.'); return; }
    if (selectedTiers.length === 0) { setError('Select at least one tier.'); return; }

    setLoading(true);
    setError('');
    try {
      window.createMultiplayerRoom?.(trimmed, { selectedTiers });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create room.');
    } finally {
      setLoading(false);
    }
  }, [name, selectedTiers, onClose]);

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="p-6 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-label text-lg text-yellow-400 uppercase tracking-widest">Create Room</h2>
            <p className="font-body text-[10px] text-slate-400 mt-1">Host a private battle. Share the code with up to 5 friends.</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-label text-[8px] text-on-surface-variant block mb-2 uppercase tracking-widest">
              Your Trainer Name
            </label>
            <input
              ref={inputRef}
              id="mp-host-name-input"
              type="text"
              placeholder="ASH_KETCHUM..."
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={64}
              className="w-full bg-surface-container-lowest border-2 border-outline-variant p-3 text-yellow-400 font-label text-[10px] focus:border-yellow-400 focus:outline-none transition-all placeholder:text-[#40485d]"
            />
          </div>

          <div>
            <label className="font-label text-[8px] text-on-surface-variant block mb-2 uppercase tracking-widest">
              Allowed Tiers
            </label>
            <div className="grid grid-cols-3 gap-2 bg-surface-container-low p-3 border border-outline-variant">
              {['Basic', 'Mid', 'Final', 'Legendary', 'Mythical', 'Ultra Beast'].map(tier => (
                <button
                  type="button"
                  key={tier}
                  onClick={() => toggleTier(tier)}
                  className={`text-[9px] font-bold uppercase tracking-widest p-2 border transition-all ${
                    selectedTiers.includes(tier)
                      ? 'bg-yellow-400 text-black border-white shadow-[0_0_10px_rgba(250,204,21,0.5)]'
                      : 'bg-surface-container-lowest text-slate-400 border-outline-variant hover:border-yellow-400/50'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <button 
                type="button"
                onClick={() => setSelectedTiers(['Basic', 'Mid', 'Final', 'Legendary', 'Mythical', 'Ultra Beast'])}
                className="text-[8px] text-yellow-400/70 hover:text-yellow-400 uppercase tracking-tighter font-body"
              >
                Select All
              </button>
              <button 
                type="button"
                onClick={() => setSelectedTiers([])}
                className="text-[8px] text-slate-500 hover:text-slate-300 uppercase tracking-tighter font-body"
              >
                Clear
              </button>
            </div>
          </div>

          {error && (
            <p className="font-body text-xs text-red-400">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-surface-container text-slate-400 p-3 border-2 border-outline-variant font-label text-[10px] uppercase step-animation hover:bg-surface-high transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-secondary-container text-white p-3 border-2 border-white font-label text-[10px] uppercase step-animation hover:bg-[#699cff] transition-all hard-shadow-secondary disabled:opacity-50 disabled:grayscale"
            >
              {loading ? 'Creating…' : 'Create Room'}
            </button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  );
}

// ─── Join Room Modal ─────────────────────────────────────────────────────────

export function JoinRoomModal({ defaultName = '', onClose }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState(defaultName);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => {
    codeRef.current?.focus();
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const trimmedCode = code.trim().toUpperCase();
    const trimmedName = name.trim();

    if (!/^\d{6}$/.test(trimmedCode)) {
      setError('Room code must be exactly 6 digits.');
      return;
    }
    if (!trimmedName) {
      setError('Trainer name is required.');
      return;
    }
    if (trimmedName.length > 64) {
      setError('Name must be 64 characters or fewer.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      window.joinMultiplayerRoom?.(trimmedCode, trimmedName);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to join room.');
    } finally {
      setLoading(false);
    }
  }, [code, name, onClose]);

  return (
    <ModalBackdrop onClose={onClose}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-label text-lg text-yellow-400 uppercase tracking-widest">Join Room</h2>
            <p className="font-body text-[10px] text-slate-400 mt-1">Enter the 6-digit code from the host.</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-label text-[8px] text-on-surface-variant block mb-2 uppercase tracking-widest">
              Room Code
            </label>
            <input
              ref={codeRef}
              id="mp-join-code-input"
              type="text"
              inputMode="numeric"
              pattern="\d{6}"
              placeholder="123456"
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              className="w-full bg-surface-container-lowest border-2 border-outline-variant p-3 text-yellow-400 font-label text-xl tracking-[0.5em] focus:border-yellow-400 focus:outline-none transition-all placeholder:text-[#40485d] placeholder:tracking-[0.5em]"
            />
          </div>

          <div>
            <label className="font-label text-[8px] text-on-surface-variant block mb-2 uppercase tracking-widest">
              Your Trainer Name
            </label>
            <input
              id="mp-join-name-input"
              type="text"
              placeholder="ASH_KETCHUM..."
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={64}
              className="w-full bg-surface-container-lowest border-2 border-outline-variant p-3 text-yellow-400 font-label text-[10px] focus:border-yellow-400 focus:outline-none transition-all placeholder:text-[#40485d]"
            />
          </div>

          {error && (
            <p className="font-body text-xs text-red-400">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-surface-container text-slate-400 p-3 border-2 border-outline-variant font-label text-[10px] uppercase step-animation hover:bg-surface-high transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="flex-1 bg-tertiary-container text-on-tertiary-container p-3 border-2 border-white font-label text-[10px] uppercase step-animation hover:bg-[#5bf083] transition-all hard-shadow-tertiary disabled:opacity-50 disabled:grayscale"
            >
              {loading ? 'Joining…' : 'Join Room'}
            </button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  );
}
