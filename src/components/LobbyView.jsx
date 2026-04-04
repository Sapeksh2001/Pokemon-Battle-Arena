import { useState, useEffect } from 'react';
import { authManager } from '../../js/api/authManager.js';

/**
 * LobbyView
 * Pixel-perfect replica of #lobby-view from the legacy index.html.
 * Renders the lobby screen with trainer name input and action buttons.
 */
export default function LobbyView() {
  const [user, setUser] = useState(authManager.currentUser);
  const [newName, setNewName] = useState(user?.displayName || '');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const unsub = authManager.subscribe((curr) => {
      setUser(curr);
      if (curr?.displayName && !newName) setNewName(curr.displayName);
    });
    return unsub;
  }, []);

  const handleUpdateName = async () => {
    if (!newName.trim() || isUpdating) return;
    setIsUpdating(true);
    const result = await authManager.updateTrainerName(newName.trim());
    setIsUpdating(false);
    if (result.error) {
      alert(result.error);
    }
  };

  return (
    <div id="lobby-view">
      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
        style={{ background: 'linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,.25) 50%),linear-gradient(90deg,rgba(255,0,0,.06),rgba(0,255,0,.02),rgba(0,0,255,.06))', backgroundSize: '100% 2px,3px 100%' }} />
      {/* Pixel Grid Background */}
      <div className="fixed inset-0 z-[1] pointer-events-none pixel-grid" />
      {/* Ambient Gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-surface-container-low via-[#060e20] to-surface-container-lowest opacity-80" />

      <div className="flex flex-col min-h-screen relative z-10">
        {/* Header */}
        <header className="bg-[#060e20] text-yellow-400 border-b-4 border-[#6d758c] flex justify-between items-center w-full px-6 py-4 z-50">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <div>
              <h1 className="text-2xl font-bold tracking-tighter text-yellow-400 uppercase font-headline">POKÉMON BATTLE ARENA</h1>
              <p className="font-label text-[8px] text-on-surface-variant tracking-wider">Competitive Battle Simulator</p>
            </div>
            <span className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-surface-container-lowest/50 border border-outline-variant p-2 md:px-4 step-animation">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-8 h-8 border-2 border-yellow-400 pixelated" />
              ) : (
                <span className="material-symbols-outlined text-on-surface-variant">account_circle</span>
              )}
              <div className="hidden md:block">
                <p className="font-label text-[8px] text-yellow-400 uppercase tracking-widest">{user?.isAnonymous ? 'GUEST TRAINER' : 'ELITE TRAINER'}</p>
                <p className="font-body text-[10px] text-white font-bold truncate max-w-[120px]">{user?.displayName || 'Anonymous'}</p>
              </div>
            </div>
            <button onClick={() => authManager.logout()} className="material-symbols-outlined text-on-surface-variant hover:text-red-400 transition-colors">logout</button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-surface-container-high/40 backdrop-blur-xl border-4 border-[#6d758c] p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

            <div className="text-center mb-8">
              <h2 className="font-label text-xl text-yellow-400 text-glow mb-2">Welcome Back, {user?.displayName?.split(' ')[0] || 'Trainer'}!</h2>
              <div className="h-1 w-24 bg-yellow-400 mx-auto mb-4" />
              <p className="text-sm font-body text-on-surface-variant leading-relaxed">
                Connect with up to 6 trainers for the ultimate showdown.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Quick Battle */}
              <button id="quick-battle-btn"
                className="w-full bg-tertiary-container text-on-tertiary-container p-4 border-2 border-white flex items-center gap-4 step-animation hover:bg-[#5bf083] transition-all hard-shadow-tertiary group">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <div className="text-left">
                  <span className="block font-label text-xs">QUICK BATTLE</span>
                  <span className="text-[10px] font-body font-bold opacity-70 uppercase tracking-widest">Instant matchmaking</span>
                </div>
                <span className="material-symbols-outlined ml-auto group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>

              {/* Create Room */}
              <button id="create-room-btn"
                className="w-full bg-secondary-container text-on-secondary-container p-4 border-2 border-white flex items-center gap-4 step-animation hover:bg-[#699cff] transition-all hard-shadow-secondary group">
                <span className="material-symbols-outlined text-2xl">add_box</span>
                <div className="text-left">
                  <span className="block font-label text-xs">CREATE ROOM</span>
                  <span className="text-[10px] font-body font-bold opacity-70 uppercase tracking-widest">Host a private match</span>
                </div>
                <span className="material-symbols-outlined ml-auto group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>

              {/* Join Room */}
              <button id="join-room-btn"
                className="w-full bg-surface-container text-[#699cff] p-4 border-2 border-[#699cff] flex items-center gap-4 step-animation hover:bg-surface-high transition-all group">
                <span className="material-symbols-outlined text-2xl">groups</span>
                <div className="text-left">
                  <span className="block font-label text-xs">JOIN ROOM</span>
                  <span className="text-[10px] font-body font-bold opacity-70 uppercase tracking-widest">Enter room code</span>
                </div>
                <span className="material-symbols-outlined ml-auto group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>

              {/* Load Game / Resume options remain as provided previously */}
              <div className="grid grid-cols-2 gap-4">
                 <button id="load-game-btn"
                    onClick={() => {
                      const modal = document.getElementById('load-modal');
                      if (modal) { modal.classList.add('active'); window.arena?.multiplayer?.loadSavedGames(); }
                    }}
                    className="bg-[#1e293b] text-[#5bf083] p-4 border-2 border-[#004a1d] flex flex-col items-start gap-2 step-animation hover:bg-[#004a1d]/30 transition-all group">
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_download</span>
                    <span className="block font-label text-[10px] uppercase">LOAD GAME</span>
                  </button>

                  <div className="relative group">
                    <input 
                      type="file" accept=".json" id="snapshot-upload" className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) window.arena?.multiplayer?.importSnapshot(file);
                      }}
                    />
                    <button 
                      onClick={() => document.getElementById('snapshot-upload').click()}
                      className="w-full bg-[#1e293b] text-yellow-400 p-4 border-2 border-yellow-900/50 flex flex-col items-start gap-2 step-animation hover:bg-yellow-900/20 transition-all group">
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>file_open</span>
                      <span className="block font-label text-[10px] uppercase">SNAPSHOT</span>
                    </button>
                  </div>
              </div>
            </div>

            {/* Trainer Name Input / Display Name sync */}
            <div className="mt-8 border-t-2 border-outline-variant pt-6">
              <label className="font-label text-[8px] text-on-surface-variant block mb-2 uppercase tracking-widest">Update Trainer Identity</label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <input 
                    id="trainer-name-input" 
                    type="text" 
                    placeholder="ENTER_NAME..."
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-surface-container-lowest border-2 border-outline-variant p-3 text-yellow-400 font-label text-[10px] focus:border-yellow-400 focus:outline-none transition-all placeholder:text-[#40485d]" />
                </div>
                <button 
                  onClick={handleUpdateName}
                  disabled={isUpdating || newName === user?.displayName}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 font-bold text-[10px] uppercase step-animation hard-shadow-primary disabled:opacity-30 disabled:grayscale"
                >
                  {isUpdating ? '...' : 'SAVE'}
                </button>
              </div>
              <div className="text-[8px] font-body text-on-surface-variant mt-2 uppercase tracking-wide opacity-60">
                Visible to all trainers in the lobby and battle arena.
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-2 bg-[#060e20]/90 backdrop-blur-xl border-t-4 border-[#6d758c]">
          <div className="flex flex-col items-center justify-center bg-yellow-400 text-[#060e20] p-2 border-2 border-white step-animation cursor-pointer min-w-[80px]">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>swords</span>
            <span className="font-label text-[8px] mt-1 uppercase">BATTLE</span>
          </div>
          <div className="flex flex-col items-center justify-center text-slate-400 p-2 hover:bg-slate-800 transition-colors cursor-pointer min-w-[80px]">
            <span className="material-symbols-outlined">groups</span>
            <span className="font-label text-[8px] mt-1 uppercase">ROOMS</span>
          </div>
          <div className="flex flex-col items-center justify-center text-slate-400 p-2 hover:bg-slate-800 transition-colors cursor-pointer min-w-[80px]">
            <span className="material-symbols-outlined">person_pin</span>
            <span className="font-label text-[8px] mt-1 uppercase">TRAINER</span>
          </div>
          <div className="flex flex-col items-center justify-center text-slate-400 p-2 hover:bg-slate-800 transition-colors cursor-pointer min-w-[80px]">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label text-[8px] mt-1 uppercase">SYSTEM</span>
          </div>
        </nav>
      </div>
    </div>
  );
}
