# Changelog

## 2026-08-20
- Implemented comprehensive type-based terrain system with 17 active terrains (Normal is neutral) applying Def/SpD modifiers based on type matchups (-20% to +20%).
- Integrated stackable move power boosts (1.2x boost for matching move type, 1.5x for Electric/Grassy/Psychic, and 0.5x dragon nerf for Misty/Fairy).
- Added manual Terrain selection dropdown in the Arena View UI.
- Expanded terrain-setting moves (fireterrain, waterterrain, etc.) and implemented Misty Surge ability.
- Corrected and fully aligned weather-based after-effects and ailment mappings (burn, severe burn, paralysis, neuro paralysis, sleep, deep sleep, frozen thaw logic, and confusion snap-out/self-damage checks).
- Solved fullscreen sprite distortion with crisp/pixelated interpolation filters.
- Resolved Burn visual button contrast bug in the ailments control pane.

## 2026-07-13
- Implemented comprehensive move effects: drain (Giga Drain, etc.) and recoil (Brave Bird, etc.) from moves.json.
- Added flinch volatile status effect blocking attacker turns.
- Implemented Destiny Bond linking KO effects.
- Added self-sacrifice move mechanics (Explosion, Memento, Healing Wish, etc.).
- Implemented attacker self-stat changes (Close Combat, Flame Charge, etc.).
- Added self-healing status moves (Recover, Roost, Moonlight, etc.).
- Implemented Protect/Endure shield and block mechanics.
- Added AOE/Multi-target support (Earthquake, Surf, etc.) hitting multiple foes or players.
- Added Multi-hit moves support (Double Kick, Bonemerang, etc.) hitting multiple times.
- Implemented decaying battlefield terrains (Electric Terrain).
- Added trapping and DoT status effects (Bind, Leech Seed, etc.).
- Allowed manual weather override from dropdown bypassing Delta Stream.
- Removed bottom navigation footer from lobby game menu.

## 2026-06-28
- Fixed moveset shuffle updates instantly.
- Handled ailment visual icons order.
- Set form change shortcut to Shift+F and fullscreen to F.
- Added tier selection to quick battle and room creation.
- Implemented load game history (last 20 games/5 starred).
- Enabled player count (2-6) and pokemon count (1-6) quick battle options.
- Cleaned up multiplayer lobby by removing global assignment mode and showing slot-level RNG/PICK/CLEAR controls.
- Enabled adding pokemon up to 6 in team editor.
- Fixed duplicate battle log replication in multiplayer.
- Added room code to battle log header.

## 2026-05-29
- Cleaned up move selector population.
- Moves match pokemon capability directly.
- Removed moveset refreshing feature.
- Improved evolution and devolution logic.
- Standardized database pre-loading procedures.
- Formatted abilities tooltips clearly.

## 2026-04-14
- Final sprite fallbacks and UI sync.
- Enhanced sprite quality by removing pixelated rendering and enabling smooth interpolation.
- Fixed form switching and selection grid visibility.
- Added transparent pokemon selector background and borders.
