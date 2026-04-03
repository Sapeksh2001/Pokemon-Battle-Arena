/**
 * ArenaView
 * Pixel-perfect replica of #arena-view from the legacy index.html.
 * Contains the battle header, player grid, control panel, and battle log.
 * All IDs are preserved for legacy engine compatibility.
 */
import PokemonPicker from './PokemonPicker';

export default function ArenaView() {
  return (
    <div id="arena-view" className="hidden">
      {/* CRT & Pixel Grid */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
        style={{ background: 'linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,.25) 50%),linear-gradient(90deg,rgba(255,0,0,.06),rgba(0,255,0,.02),rgba(0,0,255,.06))', backgroundSize: '100% 2px,3px 100%' }} />
      <div className="fixed inset-0 z-[1] pointer-events-none pixel-grid" />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-surface-container-low via-[#060e20] to-surface-container-lowest opacity-80" />

      <div className="flex flex-col h-screen relative z-10">
        {/* Header */}
        <header className="bg-[#060e20]/95 backdrop-blur-xl border-b-4 border-[#6d758c] p-4 relative z-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-yellow-400" style={{ fontVariationSettings: "'FILL' 1" }}>swords</span>
              <h1 className="text-xl font-bold text-yellow-400 font-headline uppercase tracking-tighter text-glow">POKÉMON BATTLE ARENA</h1>
              <button id="end-round-btn"
                className="bg-[#b92902] text-[#ffd2c8] hover:bg-[#ff7351] px-4 py-2 border-2 border-[#450900] transition-colors font-label text-[8px] uppercase step-animation"
                style={{ boxShadow: '4px 4px 0px 0px #450900' }}>
                END ROUND 1
              </button>
            </div>
            {/* Timer */}
            <div className="flex items-center gap-2">
              <div id="timer-display" className="font-label text-xl bg-surface-container-lowest text-yellow-400 px-4 py-2 border-2 border-outline-variant text-glow">
                02:00
              </div>
              <button id="timer-start" className="bg-tertiary-container hover:bg-[#5bf083] text-on-tertiary-container px-3 py-2 border-2 border-white step-animation hard-shadow-tertiary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </button>
              <button id="timer-pause" className="bg-primary-container hover:bg-yellow-400 text-on-primary-container px-3 py-2 border-2 border-white step-animation" style={{ boxShadow: '4px 4px 0px 0px #685900' }}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>pause</span>
              </button>
              <button id="timer-reset" className="bg-surface-variant hover:bg-surface-bright text-[#699cff] px-3 py-2 border-2 border-[#699cff] step-animation">
                <span className="material-symbols-outlined">restart_alt</span>
              </button>
            </div>
          </div>
        </header>

        {/* Player Grid */}
        <main className="flex-1 relative flex overflow-auto p-4">
          <div id="player-grid" className="w-full h-full">
            {/* Populated dynamically by the engine */}
          </div>
        </main>

        {/* Control Panel / Footer */}
        <footer className="bg-surface-container-high/95 backdrop-blur-xl border-t-4 border-[#6d758c] p-4 relative z-20 arena-control-footer">
          <div className="flex gap-4 h-full w-full">

            {/* LEFT: Controls Grid */}
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 h-full">

                {/* Attack Command */}
                <div className="bg-surface-container border-2 border-outline-variant p-2 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
                  <h4 className="text-yellow-400 font-label text-[11px] mb-1.5 uppercase tracking-widest text-glow">Attack Command</h4>
                  <div className="space-y-1 text-xs font-body">

                    {/* Attacker Picker */}
                    <label className="text-on-surface-variant uppercase tracking-wider text-[10px] block">ATTACKER</label>
                    <select id="attacker-select" className="sr-only" aria-label="Select Attacker">
                      <option value="">Select Attacker</option>
                    </select>
                    <PokemonPicker selectId="attacker-select" />

                    {/* Target Picker */}
                    <label className="text-on-surface-variant uppercase tracking-wider text-[10px] block mt-1">TARGET</label>
                    <select id="attack-target-select" className="sr-only" aria-label="Select Target">
                      <option value="">Select Target</option>
                    </select>
                    <PokemonPicker selectId="attack-target-select" />

                    <div>
                      <label className="text-on-surface-variant uppercase tracking-wider text-[10px]">MOVE</label>
                    </div>
                    <div>
                      <select id="move-name-select" className="w-full bg-surface-container-lowest border border-outline-variant p-1 text-[11px] text-on-surface focus:border-yellow-400 focus:ring-0">
                        <option value="">-- Select Move --</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="text-on-surface-variant uppercase tracking-wider text-[10px]">POWER</label>
                      <label className="text-on-surface-variant uppercase tracking-wider text-[10px]">MOVE TYPE</label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input id="move-power-input" type="number"
                        className="w-full bg-surface-container-lowest border border-outline-variant p-1 text-[11px] text-on-surface placeholder:text-[#40485d] focus:border-yellow-400 focus:ring-0"
                        placeholder="e.g., 80" min="1" max="1000"
                        title="Enter move power between 1 and 1000" />
                      <select id="move-type-select" className="w-full bg-surface-container-lowest border border-outline-variant p-1 text-[11px] text-on-surface focus:border-yellow-400 focus:ring-0">
                        <option value="">Move Type</option>
                      </select>
                    </div>
                    <div id="type-effectiveness-display"
                      className="w-full text-center text-[11px] font-bold tracking-wider bg-surface-container-lowest p-1.5 border border-outline-variant text-[#a9c4ff]">
                      --
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button id="physical-attack-btn" className="w-full text-[11px] font-bold bg-[#b92902] text-white hover:bg-[#d53d18] border border-[#450900] py-1.5 step-animation transition-colors">PHYSICAL</button>
                      <button id="special-attack-btn" className="w-full text-[11px] font-bold bg-secondary-container text-white hover:bg-[#699cff] border border-[#003271] py-1.5 step-animation transition-colors">SPECIAL</button>
                    </div>
                  </div>
                </div>

                {/* Status & Stats */}
                <div className="bg-surface-container border-2 border-outline-variant p-2 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                  <h4 className="text-yellow-400 font-label text-sm mb-3 uppercase tracking-widest text-glow">Status &amp; Stats</h4>
                  <div className="space-y-2 text-sm font-body">
                    <div className="grid grid-cols-3 gap-1">
                      <button id="curse-btn" data-status="curse" className="status-btn bg-[#6e5f00] hover:bg-yellow-600 text-white p-2 border border-black font-bold uppercase step-animation transition-colors text-sm">CRS</button>
                      <button id="poison-btn" data-status="poison" className="status-btn bg-[#9333ea] hover:bg-purple-500 text-white p-2 border border-black font-bold uppercase step-animation transition-colors text-sm">PSN</button>
                      <button id="paralyze-btn" data-status="paralyze" className="status-btn bg-[#eab308] hover:bg-yellow-400 text-[#342c00] p-2 border border-black font-bold uppercase step-animation transition-colors text-sm">PAR</button>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <button id="weather-btn" className="bg-[#2563eb] hover:bg-blue-500 text-white p-2 border border-black font-bold uppercase step-animation transition-colors text-sm">WTH</button>
                      <button id="burn-btn" data-status="burn" className="status-btn bg-[#dc2626] hover:bg-red-500 text-white p-2 border border-black font-bold uppercase step-animation transition-colors text-sm">BRN</button>
                      <button id="toxic-btn" data-status="bad_poison" className="status-btn bg-[#581c87] hover:bg-purple-800 text-white p-2 border border-black font-bold uppercase step-animation transition-colors text-sm">TOX</button>
                    </div>
                    <div>
                      <label className="text-on-surface-variant uppercase tracking-wider block mb-1 text-sm">TARGET</label>
                      <select id="status-target-select" className="sr-only" aria-label="Select Status Target">
                        <option value="">Select Target</option>
                      </select>
                      <PokemonPicker selectId="status-target-select" />
                    </div>
                    {/* Stat Modification */}
                    <div className="space-y-1">
                      <div className="grid grid-cols-3 gap-1 mb-1">
                        <label className="text-on-surface-variant uppercase tracking-wider text-sm">STAT</label>
                        <label className="text-on-surface-variant uppercase tracking-wider text-sm">TYPE</label>
                        <label className="text-on-surface-variant uppercase tracking-wider text-sm">VAL</label>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <select id="stat-select" className="w-full bg-surface-container-lowest border border-outline-variant p-2 text-sm text-on-surface focus:border-yellow-400 focus:ring-0">
                          <option value="">Stat</option>
                          <option value="hp">HP</option>
                          <option value="attack">Atk</option>
                          <option value="defence">Def</option>
                          <option value="specialAttack">SpA</option>
                          <option value="specialDefence">SpD</option>
                          <option value="speed">Spe</option>
                        </select>
                        <select id="stat-mod-type" className="w-full bg-surface-container-lowest border border-outline-variant p-2 text-sm text-on-surface focus:border-yellow-400 focus:ring-0">
                          <option value="set">Set</option>
                          <option value="+">+</option>
                          <option value="-">-</option>
                          <option value="+%">+%</option>
                          <option value="-%">-%</option>
                        </select>
                        <input id="stat-value-input" type="number"
                          className="w-full bg-surface-container-lowest border border-outline-variant p-2 text-sm text-on-surface placeholder:text-[#40485d] focus:border-yellow-400 focus:ring-0"
                          placeholder="Val" />
                      </div>
                      <button id="update-stat-btn" className="w-full bg-secondary-container text-white hover:bg-[#004da8] p-2 border border-black font-bold uppercase step-animation transition-colors mt-1">
                        UPDATE
                      </button>
                    </div>
                  </div>
                </div>

                {/* Utility */}
                <div className="bg-surface-container border-2 border-outline-variant p-2 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
                  <h4 className="text-yellow-400 font-label text-sm mb-3 uppercase tracking-widest text-glow">Utility</h4>
                  <div className="space-y-2 text-sm font-body">
                    <div className="text-center">
                      <label className="text-on-surface-variant uppercase tracking-wider block mb-1 text-sm">RNG (1-100)</label>
                      <div id="random-number-display" className="w-full bg-surface-container-lowest border border-outline-variant p-2 text-2xl font-bold text-yellow-400 text-glow tracking-widest">--</div>
                      <button id="generate-number-btn" className="w-full bg-tertiary-container text-[#004a1d] hover:bg-[#5bf083] p-1 border border-white font-bold uppercase step-animation transition-colors mt-1">ROLL</button>
                    </div>
                    <div className="border-t border-outline-variant pt-2 mt-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-on-surface-variant uppercase tracking-wider block mb-1 text-sm">PLAYER</label>
                          <input id="new-player-name" type="text" placeholder="Name"
                            className="w-full bg-surface-container-lowest border border-outline-variant p-2 text-sm text-on-surface placeholder:text-[#40485d] focus:border-yellow-400 focus:ring-0" />
                        </div>
                        <div className="flex items-end">
                          <button id="add-player-btn" className="w-full bg-surface-variant text-secondary border border-secondary hover:bg-surface-bright p-2 font-bold uppercase step-animation transition-colors">ADD</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Management */}
                <div className="bg-surface-container border-2 border-outline-variant p-2 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                  <h4 className="text-yellow-400 font-label text-sm mb-3 uppercase tracking-widest text-glow">Management</h4>
                  <div className="space-y-2 text-sm font-body">
                    <div>
                      <label className="text-on-surface-variant uppercase tracking-wider block mb-1 text-sm">POKÉMON</label>
                      <select id="management-pokemon-select" className="sr-only" aria-label="Select Pokémon for Management">
                        <option value="">Select</option>
                      </select>
                      <PokemonPicker selectId="management-pokemon-select" />
                    </div>
                    <div className="grid grid-cols-3 gap-1 mt-2">
                      <button id="evolve-btn" className="bg-blue-600 hover:bg-blue-500 text-white p-2 border border-black font-bold uppercase step-animation transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm" disabled>EVO</button>
                      <button id="change-form-btn" className="bg-purple-600 hover:bg-purple-500 text-white p-2 border border-black font-bold uppercase step-animation transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm" disabled>FORM</button>
                      <button id="revive-btn" className="bg-[#dc2626] hover:bg-red-500 text-white p-2 border border-black font-bold uppercase step-animation transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm" disabled>REV</button>
                    </div>
                  </div>
                </div>

                {/* Round & History */}
                <div className="bg-surface-container border-2 border-outline-variant p-2 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
                  <h4 className="text-yellow-400 font-label text-sm mb-3 uppercase tracking-widest text-glow">Round &amp; History</h4>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button id="undo-btn"
                      className="bg-surface-variant text-yellow-400 hover:bg-surface-bright p-2 border border-[#40485d] font-bold uppercase step-animation transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled>
                      <span className="material-symbols-outlined text-[20px] align-middle" style={{ fontVariationSettings: "'FILL' 1" }}>undo</span> UNDO
                      <div className="text-[10px] text-on-surface-variant mt-0.5 tracking-wider">Ctrl+Z</div>
                    </button>
                    <button id="redo-btn"
                      className="bg-surface-variant text-yellow-400 hover:bg-surface-bright p-2 border border-[#40485d] font-bold uppercase step-animation transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled>
                      <span className="material-symbols-outlined text-[20px] align-middle" style={{ fontVariationSettings: "'FILL' 1" }}>redo</span> REDO
                      <div className="text-[10px] text-on-surface-variant mt-0.5 tracking-wider">Ctrl+⇧+Z / Ctrl+Y</div>
                    </button>
                  </div>
                  <div className="border-t-2 border-outline-variant pt-2">
                    <button id="toggle-shortcuts"
                      className="w-full text-left text-sm text-on-surface-variant hover:text-white transition-colors flex justify-between items-center uppercase tracking-wider font-bold">
                      <span><span className="material-symbols-outlined text-[18px] align-middle">keyboard</span> Shortcuts</span>
                      <span className="material-symbols-outlined text-[18px] transition-transform" id="shortcuts-chevron">expand_more</span>
                    </button>
                    <div id="shortcuts-list" className="hidden text-[10px] font-body text-slate-400 space-y-1 pl-2 border-l-2 border-yellow-600 mt-2">
                      <div><kbd className="bg-surface-variant px-1.5 py-0.5 rounded border border-outline-variant text-[9px] font-mono">1-6</kbd> Select Player</div>
                      <div><kbd className="bg-surface-variant px-1.5 py-0.5 rounded border border-outline-variant text-[9px] font-mono">Space</kbd> End Round</div>
                      <div><kbd className="bg-surface-variant px-1.5 py-0.5 rounded border border-outline-variant text-[9px] font-mono">P</kbd> Physical Atk</div>
                      <div><kbd className="bg-surface-variant px-1.5 py-0.5 rounded border border-outline-variant text-[9px] font-mono">S</kbd> Special Atk</div>
                      <div><kbd className="bg-surface-variant px-1.5 py-0.5 rounded border border-outline-variant text-[9px] font-mono">E</kbd> Evolve</div>
                      <div><kbd className="bg-surface-variant px-1.5 py-0.5 rounded border border-outline-variant text-[9px] font-mono">F</kbd> Form Change</div>
                      <div><kbd className="bg-surface-variant px-1.5 py-0.5 rounded border border-outline-variant text-[9px] font-mono">R</kbd> Random #</div>
                      <div><kbd className="bg-surface-variant px-1.5 py-0.5 rounded border border-outline-variant text-[9px] font-mono">T</kbd> Toggle Timer</div>
                      <div><kbd className="bg-surface-variant px-1.5 py-0.5 rounded border border-outline-variant text-[9px] font-mono">Shift+T</kbd> Reset Timer</div>
                      <div><kbd className="bg-surface-variant px-1.5 py-0.5 rounded border border-outline-variant text-[9px] font-mono">Esc</kbd> Close Modal</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT: Battle Log */}
            <div className="battle-log-panel h-full w-full lg:w-[600px] flex-shrink-0">
              <div className="bg-surface-container border-2 border-outline-variant h-full flex flex-col relative overflow-hidden">
                <div className="bg-surface-container-high px-3 py-2 border-b-2 border-outline-variant flex justify-between items-center flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-yellow-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>history_edu</span>
                    <span className="font-label text-sm text-yellow-400 uppercase tracking-widest text-glow">Battle Log</span>
                  </div>
                  <div className="flex gap-1">
                    <button id="clear-log-btn" className="text-xs bg-[#dc2626] hover:bg-red-500 text-white px-2 py-1 border border-[#450900] transition-colors step-animation flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                    <button id="export-log-btn" className="text-xs bg-secondary-container hover:bg-blue-500 text-white px-2 py-1 border border-[#003271] transition-colors step-animation flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px]">download</span>
                    </button>
                  </div>
                </div>
                <div id="battle-log" className="flex-1 bg-surface-container-lowest p-3 overflow-y-auto text-sm space-y-1 font-pixel leading-relaxed" style={{ fontSize: 10 }}>
                  <div className="text-[#a3aac4]">[SYSTEM] Battle arena initialized!</div>
                </div>
              </div>
            </div>

          </div>
        </footer>
      </div>
    </div>
  );
}
