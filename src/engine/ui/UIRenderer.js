import { escapeHTML } from '../utils/helpers.js';
import { WEATHER_CONFIG } from '../data/weather.js';
import { getTerrainDefenseModifier, getTerrainMovePowerMultiplier } from '../data/terrain.js';

// ==========================================
// UI RENDERER (DOM Construction)
// ==========================================

export class UIRenderer {
    /**
     * @param {object}           gameState
     * @param {PokemonBattleArena} arena    - For callbacks (openTeamManager, editHP, etc.)
     */
    constructor(gameState, arena) {
        this._gs = gameState;
        this._arena = arena;
        this.settings = {
            damageNumbers: true,
            animationSpeed: '0.5s'
        };
    }

    _getHPColor(pct) {
        if (pct > 0.5) return 'var(--hp-color-green)';
        if (pct > 0.2) return 'var(--hp-color-yellow)';
        return 'var(--hp-color-red)';
    }

    // ── Full re-render ───────────────────────────────────────────────

    renderAll() {
        this._renderPlayerCards();
        this._updateControlPanel();
        this._updateWeatherView();
        const btn = document.getElementById('end-round-btn');
        if (btn) btn.textContent = `END ROUND ${this._gs.round}`;
    }

    // ── Player cards ─────────────────────────────────────────────────

    _getCardFingerprint(player) {
        const pokemon = player.getActivePokemon();
        const activeState = player.id === this._gs.activeTurnPlayerId;
        const selectedAttack = player.id === this._gs.selectedAttackTargetId;
        const selectedStatus = player.id === this._gs.selectedStatusTargetId;
        const teamStr = player.team.map(p => p ? p.fullName : 'empty').join(',');
        if (!pokemon) {
            return `no-pokemon:${player.id}:${activeState}:${selectedAttack}:${selectedStatus}:${teamStr}`;
        }
        const typesStr = pokemon.types ? pokemon.types.join(',') : '';
        const movesStr = pokemon.moves ? pokemon.moves.join(',') : '';
        const abilityStr = pokemon.ability?.name || '';
        const statusesStr = Object.keys(pokemon.statuses || {}).join(',');
        const weather = this._gs.weather || 'none';
        const terrain = this._gs.terrain ? (typeof this._gs.terrain === 'string' ? this._gs.terrain : this._gs.terrain.type) : 'none';
        return `${pokemon.fullName}:${pokemon.currentHP}:${pokemon.maxHp}:${statusesStr}:${activeState}:${selectedAttack}:${selectedStatus}:${typesStr}:${movesStr}:${abilityStr}:${teamStr}:${weather}:${terrain}`;
    }

    _renderPlayerCards() {
        const grid = document.getElementById('player-grid');
        if (!grid) return;

        const rendered = new Set();
        this._gs.players.forEach(player => {
            rendered.add(player.id);
            const fingerprint = this._getCardFingerprint(player);
            let card = document.getElementById(`player-card-${player.id}`);
            if (!card) {
                card = this._createPlayerCard(player);
                card.dataset.fingerprint = fingerprint;
                grid.appendChild(card);
            } else if (card.dataset.fingerprint !== fingerprint) {
                const newCard = this._createPlayerCard(player);
                newCard.dataset.fingerprint = fingerprint;
                grid.replaceChild(newCard, card);
            }
        });

        // Remove cards for removed players
        const childrenArray = Array.from(grid.children);
        childrenArray.forEach(child => {
            if (child.dataset.playerId && !rendered.has(child.dataset.playerId)) {
                child.remove();
            }
        });

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    _createEmptyCard() {
        const card = document.createElement('div');
        card.className = 'player-card p-4 flex flex-col items-center justify-center h-full text-secondary border-dashed border-2 border-outline-variant bg-surface-container-lowest/50';
        card.innerHTML = `<div class="text-center">
            <span class="material-symbols-outlined text-6xl mx-auto opacity-50">person_add</span>
            <p class="mt-2 text-xs uppercase tracking-widest font-bold">EMPTY SLOT</p>
        </div>`;
        return card;
    }

    _createPlayerCard(player) {
        const card = document.createElement('div');
        card.className = 'player-card p-4 flex flex-col items-center justify-between h-full';
        card.id = `player-card-${player.id}`;
        card.dataset.playerId = player.id;

        card.classList.toggle('active-turn', player.id === this._gs.activeTurnPlayerId);
        card.classList.toggle('selected-target', player.id === this._gs.selectedAttackTargetId);
        card.classList.toggle('selected-status-target', player.id === this._gs.selectedStatusTargetId);

        const pokemon = player.getActivePokemon();
        if (!pokemon) {
            const inner = document.createElement('div');
            inner.className = 'flex flex-col items-center justify-center h-full text-center font-body';

            const h3 = document.createElement('h3');
            h3.className = 'font-bold text-2xl text-secondary font-headline';
            h3.textContent = player.name;
            inner.appendChild(h3);

            const p = document.createElement('p');
            p.className = 'text-xs uppercase tracking-wider text-on-surface-variant mt-4';
            p.textContent = 'No active Pokémon.';
            inner.appendChild(p);

            const btn = document.createElement('button');
            btn.className = 'w-full mt-4 bg-secondary-container hover:bg-[#699cff] text-white font-bold py-3 px-4 text-xs uppercase tracking-widest border border-[#003271] step-animation';
            btn.textContent = 'Manage Team';
            // Safe: closed-over variable, never injected into HTML string
            btn.addEventListener('click', () => window.openTeamManager(player.id));
            inner.appendChild(btn);

            card.appendChild(inner);
            return card;
        }

        // Set type colors as CSS variables for the dynamic gradients
        if (pokemon.types && pokemon.types.length > 0) {
            const type1 = pokemon.types[0].toLowerCase();
            const type2 = pokemon.types[1] ? pokemon.types[1].toLowerCase() : type1;

            card.style.setProperty('--type-1-color', `var(--type-${type1})`);
            card.style.setProperty('--type-2-color', `var(--type-${type2})`);
        }

        // Handle flip animation if pokemon changed
        const lastPokemon = card.dataset.lastPokemon;
        if (lastPokemon && lastPokemon !== pokemon.fullName) {
            card.classList.add('flipping');
            setTimeout(() => card.classList.remove('flipping'), 2000);
        }
        card.dataset.lastPokemon = pokemon.fullName;

        const tier = (pokemon.tier || '').toLowerCase();
        if (tier.includes('legendary') || tier.includes('mythical') ||
            tier.includes('ultra beast') || tier.includes('mega') || tier.includes('gmax')) {
            card.classList.add('holo-gold');
        } else if (tier === 'final') {
            card.classList.add('holo-silver');
        }
        card.classList.add(`tier-border-${tier.replace(/ /g, '-')}`);
        if (pokemon.isFainted()) card.classList.add('opacity-50', 'bg-red-900/30');

        const pct = pokemon.getHPPercent();

        // ── Build card body safely using DOM APIs (no innerHTML with onclick) ────
        const entryAnim = document.createElement('div');
        entryAnim.className = 'entry-animation-container';
        card.appendChild(entryAnim);

        if (player.id === this._gs.activeTurnPlayerId) {
            const arrow = document.createElement('div');
            arrow.className = 'turn-indicator-arrow';
            arrow.innerHTML = '<span class="material-symbols-outlined text-3xl">keyboard_double_arrow_down</span>';
            card.appendChild(arrow);
        }

        // Header: trainer name + buttons
        const headerWrap = document.createElement('div');
        headerWrap.className = 'w-full flex-shrink-0';

        const nameRow = document.createElement('div');
        nameRow.className = 'w-full flex justify-between items-start gap-2 min-w-0';

        const h2 = document.createElement('h2');
        h2.className = 'font-bold card-trainer-name';
        h2.title = player.name;
        h2.textContent = player.name; // textContent — safe from XSS
        nameRow.appendChild(h2);

        const btnsDiv = document.createElement('div');
        btnsDiv.className = 'flex gap-2';

        const removeBtn = document.createElement('button');
        removeBtn.className = 'text-[#ff7351] hover:text-white transition-colors';
        removeBtn.title = 'Remove Player';
        removeBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">person_remove</span>';
        removeBtn.addEventListener('click', () => window.removePlayer(player.id));
        btnsDiv.appendChild(removeBtn);

        const manageBtn = document.createElement('button');
        manageBtn.className = 'text-secondary hover:text-white transition-colors';
        manageBtn.title = 'Manage Team';
        manageBtn.innerHTML = '<span class="material-symbols-outlined text-[20px]">settings</span>';
        manageBtn.addEventListener('click', () => window.openTeamManager(player.id));
        btnsDiv.appendChild(manageBtn);

        nameRow.appendChild(btnsDiv);
        headerWrap.appendChild(nameRow);

        const pokemonNameH3 = document.createElement('h3');
        pokemonNameH3.className = 'font-bold card-pokemon-name';
        pokemonNameH3.textContent = pokemon.fullName;
        headerWrap.appendChild(pokemonNameH3);

        const tierP = document.createElement('p');
        tierP.className = 'pokemon-tier';
        tierP.textContent = pokemon.tier || 'Unknown';
        headerWrap.appendChild(tierP);

        const typesDiv = document.createElement('div');
        typesDiv.className = 'flex justify-center gap-2 mt-1';
        typesDiv.innerHTML = this._renderTypeBadges(pokemon.types); // safe — types come from dataset, not user input
        headerWrap.appendChild(typesDiv);

        card.appendChild(headerWrap);

        // Sprite + HP section
        const spriteSection = document.createElement('div');
        spriteSection.className = 'flex flex-col items-center justify-center flex-grow min-h-0 relative';

        const spriteWrap = document.createElement('div');
        spriteWrap.className = 'relative';

        const img = document.createElement('img');
        img.src = pokemon.sprite;
        img.alt = pokemon.fullName;
        img.className = `pokemon-sprite ${pokemon.isFainted() ? 'grayscale' : ''}`;
        img.onerror = function() {
            if (!this.dataset.tried) {
                this.dataset.tried = '1';
                this.src = this.src.replace('/ani/', '/gen5/').replace('.gif', '.png');
            } else if (this.dataset.tried === '1') {
                this.dataset.tried = '2';
                this.src = this.src.replace('/gen5/', '/dex/');
            } else {
                this.onerror = null;
                this.src = 'https://placehold.co/96x96/000000/FFFFFF?text=?';
            }
        };
        spriteWrap.appendChild(img);

        if (pokemon.isFainted()) {
            const faintOverlay = document.createElement('div');
            faintOverlay.className = 'absolute inset-0 flex items-center justify-center';
            faintOverlay.innerHTML = '<span class="text-red-500 text-2xl font-bold -rotate-12 bg-black/50 px-2">FAINTED</span>';
            spriteWrap.appendChild(faintOverlay);
        }
        spriteSection.appendChild(spriteWrap);

        // HP bar — click opens HP editor
        const hpBar = document.createElement('div');
        hpBar.className = 'hp-bar-container';
        hpBar.addEventListener('click', () => window.editHP(player.id));
        hpBar.innerHTML = `
            <div class="hp-text-row">
                <span class="hp-values">${pokemon.currentHP}/${pokemon.maxHp}</span>
            </div>
            <div class="hp-bar-track">
                <div class="hp-bar-fill" style="width: ${pct * 100}%; background-color: ${this._getHPColor(pct)};"></div>
            </div>`;
        spriteSection.appendChild(hpBar);

        const statusRow = document.createElement('div');
        statusRow.className = 'status-alignment-row';
        statusRow.innerHTML = this._renderStatusIcons(pokemon);
        spriteSection.appendChild(statusRow);

        card.appendChild(spriteSection);

        // Moves & abilities (data from trusted dataset — innerHTML acceptable here)
        const movesEl = document.createElement('div');
        movesEl.innerHTML = this._renderMovesAndAbilities(pokemon, player);
        card.appendChild(movesEl.firstElementChild || movesEl);

        // Stat grid
        const statGrid = document.createElement('div');
        statGrid.className = 'grid grid-cols-5 grid-rows-2 text-center w-full card-stat-grid flex-shrink-0';
        statGrid.innerHTML = this._renderStatHeaders(pokemon) + this._renderStatValues(pokemon);
        card.appendChild(statGrid);

        // Team icons row — built safely
        const teamRow = document.createElement('div');
        teamRow.className = 'flex justify-evenly items-center w-full flex-shrink-0 card-team-row';
        teamRow.appendChild(this._buildTeamIcons(player));
        card.appendChild(teamRow);

        return card;
    }

    /** DRY: Renders type badge HTML — used by createPlayerCard. */
    _renderTypeBadges(types) {
        return types.map(t =>
            `<span class="type-badge" style="background-color:var(--type-${t.toLowerCase()})">${t.toUpperCase()}</span>`
        ).join('');
    }

    /** Render moves and abilities section. */
    _renderMovesAndAbilities(pokemon, player) {
        const escapeHTML = window.escapeHTML || (str => String(str).replace(/[&<>'"]/g, match => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[match])));

        const moves = pokemon.moves || [];
        const movesRows = moves.map((m, i) => {
            const moveData = window.MovesData && window.MovesData[m] ? window.MovesData[m] : {};
            const type = moveData.type || 'NORMAL';
            const cat = moveData.category || 'Physical';
            const power = moveData.power || '—';
            
            const rawAcc = moveData.accuracy;
            let displayAcc = '—';
            if (rawAcc !== undefined && rawAcc !== null) {
                const accStr = String(rawAcc);
                if (rawAcc === true || rawAcc === 'true' || accStr.toLowerCase().includes('infin') || accStr.includes('∞')) {
                    displayAcc = '∞';
                } else {
                    displayAcc = accStr;
                }
            }

            const bgClass = i % 2 === 0 ? 'bg-[#f1f5f9]' : 'bg-[#e2e8f0]';

            let catIcon = '';
            if (cat === 'Special') {
                catIcon = `<svg width="20" height="14" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" class="inline-block"><g transform="translate(12,8) rotate(-20)"><ellipse cx="0" cy="0" rx="9" ry="4.5" fill="none" stroke="#1d4ed8" stroke-width="1.5"/><ellipse cx="0" cy="0" rx="4.5" ry="2" fill="none" stroke="#1d4ed8" stroke-width="1.5"/><circle cx="0" cy="0" r="1" fill="#1d4ed8"/></g></svg>`;
            } else if (cat === 'Status') {
                catIcon = `<svg width="20" height="14" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" class="inline-block"><g transform="translate(12,8) scale(1.1, 0.9)"><circle cx="0" cy="0" r="7" fill="none" stroke="#71717a" stroke-width="1.5"/><path d="M 0 -7 A 3.5 3.5 0 0 1 0 0 A 3.5 3.5 0 0 0 0 7 A 7 7 0 0 0 0 -7 Z" fill="#71717a"/><circle cx="0" cy="-3.5" r="1.2" fill="#fff"/><circle cx="0" cy="3.5" r="1.2" fill="#71717a"/></g></svg>`;
            } else {
                catIcon = `<svg width="20" height="14" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" class="inline-block"><path d="M12 1 L15 5 L21 3 L17 8 L22 13 L15 12 L13 17 L10 12 L3 13 L8 8 L2 3 L9 5 Z" fill="#fff" stroke="#ea580c" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
            }

            let powerColor = 'text-[#0f172a]';
            let powerLabel = String(power);
            const w = this._gs.weather || 'none';
            const wCfg = WEATHER_CONFIG[w] || {};

            if (power > 0) {
                let mult = 1.0;
                let isNullified = false;

                // Weather modifiers
                if (wCfg.moveModifiers && wCfg.moveModifiers[type] !== undefined) {
                    mult *= wCfg.moveModifiers[type];
                }
                if (wCfg.nullified && wCfg.nullified.includes(type)) {
                    isNullified = true;
                }
                if (wCfg.nonFlyingHalved && type !== 'Flying') {
                    mult *= 0.5;
                }

                // Terrain modifiers
                const terrain = this._gs.terrain;
                const terrainType = terrain ? (typeof terrain === 'string' ? terrain : terrain.type) : 'none';
                if (terrainType && terrainType !== 'none') {
                    mult *= getTerrainMovePowerMultiplier(terrainType, type);
                }

                if (isNullified || mult === 0) {
                    powerColor = 'text-red-700 line-through font-bold';
                    powerLabel = '0 🚫';
                } else if (mult > 1) {
                    powerColor = 'text-green-600 font-bold';
                    powerLabel = `${Math.floor(power * mult)} ↑`;
                } else if (mult < 1) {
                    powerColor = 'text-red-500 font-bold';
                    powerLabel = `${Math.floor(power * mult)} ↓`;
                }
            }

            const effectText = moveData.gameEffect || moveData.effect || '';
            const moveDesc = effectText ? `<span class="mc-tooltip-desc">${escapeHTML(effectText)}</span>` : '';

            return `
                <tr class="${bgClass} text-slate-800 border-b border-gray-300 last:border-0 align-middle">
                    <td class="p-0.5 pl-1 text-[#0f172a] text-[9px] sm:text-[10px] tracking-tight mc-tooltip align-middle">
                        <span class="truncate block" title="${escapeHTML(moveData.name || m)}">${escapeHTML(moveData.name || m)}</span>
                        <div class="mc-tooltip-content">
                            <span class="mc-tooltip-title">${escapeHTML(moveData.name || m)}</span>
                            <span>Type: ${escapeHTML(type)}</span><br>
                            <span>Power: ${escapeHTML(String(power))}</span><br>
                            <span>Accuracy: ${escapeHTML(displayAcc)}</span>
                            ${moveDesc}
                        </div>
                    </td>
                    <td class="p-0.5 text-center align-middle">
                        <span class="type-badge" style="background-color:var(--type-${type.toLowerCase()}); font-size: 10px; font-weight: 800; font-family: sans-serif; padding: 3px 8px; border-radius: 4px !important; border: 1.5px solid white; box-shadow: 0 0 0 1px black; display: inline-block; vertical-align: middle; line-height: 1; text-shadow: 1px 1px 0 rgba(0,0,0,0.5); letter-spacing: 0.5px;">
                             ${escapeHTML(type.toUpperCase())}
                        </span>
                    </td>
                    <td class="p-0.5 text-center align-middle">${catIcon}</td>
                    <td class="p-0.5 text-center text-[9px] sm:text-[10px] align-middle ${powerColor}">${escapeHTML(powerLabel)}</td>
                    <td class="p-0.5 text-center pr-1 text-[9px] sm:text-[10px] align-middle">${escapeHTML(displayAcc)}</td>
                </tr>
            `;
        }).join('');

        const noMovesRow = `<tr><td colspan="5" class="p-1 text-center text-gray-500 italic text-[10px]">No moves available</td></tr>`;

        const abilityData = pokemon.ability && window.AbilitiesData && window.AbilitiesData[pokemon.ability]
            ? window.AbilitiesData[pokemon.ability] : null;
        const abilityDesc = abilityData ? (abilityData.gameDesc || abilityData.description || abilityData.desc || '') : '';

        const hiddenAbilityData = pokemon.hiddenAbility && window.AbilitiesData && window.AbilitiesData[pokemon.hiddenAbility]
            ? window.AbilitiesData[pokemon.hiddenAbility] : null;
        const hiddenAbilityDesc = hiddenAbilityData ? (hiddenAbilityData.gameDesc || hiddenAbilityData.description || hiddenAbilityData.desc || '') : '';

        return `
            <div class="w-full flex-shrink-0 mt-1 mb-1 bg-[#f8f9fa] text-black rounded-xl border-2 border-[#1e293b]" style="text-shadow: none;">
                <table class="w-full text-left border-collapse" style="table-layout: fixed;">
                    <thead>
                        <tr class="bg-black text-white text-[8px] sm:text-[9px] uppercase tracking-wider">
                            <th class="p-0.5 pl-1 w-[40%] rounded-tl-[10px]">Move</th>
                            <th class="p-0.5 text-center w-[22%]">Type</th>
                            <th class="p-0.5 text-center w-[10%]">Cat.</th>
                            <th class="p-0.5 text-center w-[14%]">Power</th>
                            <th class="p-0.5 text-center pr-1 w-[14%] rounded-tr-[10px]">Acc.</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${moves.length > 0 ? movesRows : noMovesRow}
                    </tbody>
                </table>
                <div class="flex border-t-2 border-[#1e293b] bg-gray-300 p-0.5 gap-0.5 rounded-b-[10px]">
                    <div class="w-1/2 bg-white rounded-bl-lg rounded-tl-sm rounded-r-sm border-2 border-[#1e293b] p-1 text-center flex flex-col justify-center items-center cursor-pointer hover:bg-slate-100 transition-colors ${pokemon.ability ? 'mc-tooltip' : ''}" onclick="window.triggerAbilityManual('${player.id}', '${escapeHTML(pokemon.ability || '')}', false)">
                        <div class="uppercase text-[8px] mb-0.5 text-[#334155] tracking-widest leading-none">Ability</div>
                        ${pokemon.ability ? `
                            <div class="text-[10px] sm:text-xs tracking-wide text-[#0f172a] leading-none font-bold">${escapeHTML(pokemon.ability)}</div>
                            <div class="mc-tooltip-content">
                                <span class="mc-tooltip-title">${escapeHTML(pokemon.ability)}</span>
                                <span class="mc-tooltip-desc">${escapeHTML(abilityDesc || 'No description available.')}</span>
                            </div>
                        ` : `<div class="text-gray-400 italic text-[9px] mt-0.5">None</div>`}
                    </div>
                    <div class="w-1/2 bg-white rounded-br-lg rounded-tr-sm rounded-l-sm border-2 border-[#1e293b] p-1 text-center flex flex-col justify-center items-center cursor-pointer hover:bg-slate-100 transition-colors ${pokemon.hiddenAbility ? 'mc-tooltip' : ''}" onclick="window.triggerAbilityManual('${player.id}', '${escapeHTML(pokemon.hiddenAbility || '')}', true)">
                        <div class="uppercase text-[8px] mb-0.5 text-[#334155] tracking-widest leading-none">Hidden Ability</div>
                        ${pokemon.hiddenAbility ? `
                            <div class="text-[10px] sm:text-xs tracking-wide text-[#0f172a] leading-none font-bold">${escapeHTML(pokemon.hiddenAbility)}</div>
                            <div class="mc-tooltip-content">
                                <span class="mc-tooltip-title">${escapeHTML(pokemon.hiddenAbility)} (Hidden)</span>
                                <span class="mc-tooltip-desc">${escapeHTML(hiddenAbilityDesc || 'No description available.')}</span>
                            </div>
                        ` : `<div class="text-gray-400 italic text-[9px] mt-0.5">None</div>`}
                    </div>
                </div>
            </div>
        `;
    }


    /** DRY: Renders status condition icons from the Pokemon's statuses object. */
    _renderStatusIcons(pokemon) {
        const iconMap = {
            poison: { icon: 'science', color: 'text-purple-400' },
            bad_poison: { icon: 'coronavirus', color: 'text-purple-400' },
            burn: { icon: 'local_fire_department', color: 'text-orange-400' },
            paralyze: { icon: 'bolt', color: 'text-yellow-400' },
            curse: { icon: 'skull', color: 'text-indigo-400' },
        };
        const active = Object.keys(pokemon.statuses).filter(s => iconMap[s]);
        if (active.length === 0) {
            return `<div class="w-full h-full"></div>`;
        }
        return active.map(s => `<span class="material-symbols-outlined text-[20px] ${iconMap[s].color} status-icon-aura" style="font-variation-settings: 'FILL' 1;">${iconMap[s].icon}</span>`).join('');
    }

    /** Stat header row icons (Attack, Defense, SpA, SpD, Speed). */
    _renderStatHeaders(pokemon) {
        const isParalyzed = pokemon.hasStatus('paralyze');
        return [
            `<div class="flex justify-center items-center" title="Attack"><span class="material-symbols-outlined text-[22px]">swords</span></div>`,
            `<div class="flex justify-center items-center" title="Defense"><span class="material-symbols-outlined text-[22px]">shield</span></div>`,
            `<div class="flex justify-center items-center" title="Special Attack"><span class="material-symbols-outlined text-[22px]">local_fire_department</span></div>`,
            `<div class="flex justify-center items-center" title="Special Defense"><span class="material-symbols-outlined text-[22px]">health_and_safety</span></div>`,
            `<div class="flex justify-center items-center ${isParalyzed ? 'stat-paralyzed' : ''}" title="Speed"><span class="material-symbols-outlined text-[22px]">bolt</span></div>`,
        ].join('');
    }

    /** Stat value row. Applies colour coding and arrows for active modifiers (stat mods, weather, terrain, and status ailments). */
    _renderStatValues(pokemon) {
        const isParalyzed = pokemon.hasStatus('paralyze') || pokemon.hasStatus('paralysis') || pokemon.hasStatus('neuro_paralysis') || pokemon.hasStatus('neuro-paralysis') || pokemon.hasStatus('neuroparalysis');
        const w = this._gs.weather || 'none';
        const wCfg = WEATHER_CONFIG[w] || {};
        const terrain = this._gs.terrain;
        const terrainType = terrain ? (typeof terrain === 'string' ? terrain : terrain.type) : 'none';

        return Object.entries(pokemon.stats)
            .filter(([key]) => key !== 'hp')
            .map(([key]) => {
                const baseVal = pokemon.stats[key];
                let val = baseVal + (pokemon.statModifiers[key] || 0);

                // Apply status effects
                if (key === 'attack') {
                    if (pokemon.hasStatus('severe_burn') || pokemon.hasStatus('severe-burn') || pokemon.hasStatus('severeburn')) {
                        val = Math.floor(val * 0.5);
                    } else if (pokemon.hasStatus('burn')) {
                        val = Math.floor(val * 0.8);
                    }
                }
                if (key === 'speed') {
                    if (isParalyzed) {
                        val = Math.floor(val * 0.5);
                    }
                    if (wCfg.flyingSpeedDouble && pokemon.types.includes('Flying')) {
                        val = val * 2;
                    }
                }

                // Apply weather effects (Rock SpDef boost in sandstorm)
                if (key === 'specialDefence' && wCfg.rockSpDefBoost && pokemon.types.includes('Rock')) {
                    val = Math.floor(val * 1.5);
                }

                // Apply terrain-based defense/SpDef modifiers
                if (terrainType && terrainType !== 'none') {
                    if (key === 'defence' || key === 'specialDefence') {
                        const terrainDefMod = getTerrainDefenseModifier(terrainType, pokemon.types);
                        val = Math.floor(val * terrainDefMod);
                    }
                }

                const effective = Math.max(1, val);

                let colorClass = '';
                if (effective > baseVal) {
                    colorClass = 'text-green-400 font-bold';
                } else if (effective < baseVal) {
                    colorClass = 'text-red-400 font-bold';
                }

                return `<div class="${colorClass}">${effective}</div>`;
            }).join('');
    }

    /** Team icon row — Pokéballs clickable to switch active Pokémon (safe DOM version). */
    _renderTeamIcons(player) {
        // Kept for legacy callers. New code uses _buildTeamIcons.
        return this._buildTeamIcons(player).innerHTML;
    }

    _buildTeamIcons(player) {
        const frag = document.createDocumentFragment();
        player.team.forEach((p, i) => {
            if (!p) return;
            const isFainted = p.isFainted();
            const img = document.createElement('img');
            img.src = p.sprite;
            img.title = p.fullName;
            img.className = `w-16 h-16 team-pokeball bg-transparent p-1 border-2 border-transparent ${isFainted ? 'grayscale' : ''}`;
            img.onerror = function() {
                if (!this.dataset.tried) {
                    this.dataset.tried = '1';
                    this.src = this.src.replace('/ani/', '/gen5/').replace('.gif', '.png');
                } else if (this.dataset.tried === '1') {
                    this.dataset.tried = '2';
                    this.src = this.src.replace('/gen5/', '/dex/');
                }
            };
            img.addEventListener('click', () => window.handleTeamIconClick(player.id, i));
            frag.appendChild(img);
        });
        const wrapper = document.createElement('div');
        wrapper.className = 'contents';
        wrapper.appendChild(frag);
        return wrapper;
    }

    // ── Control panel ──────────────────────────────────────────────────

    /**
     * DRY: Populates any <select> element without copy-paste.
     * Replaces the original's four nearly-identical dropdown rebuild blocks.
     *
     * @param {HTMLSelectElement} selectEl
     * @param {any[]}             items
     * @param {Function}          valueFn   - item → option value
     * @param {Function}          labelFn   - item → option label
     * @param {string}            placeholder
     */
    populateDropdown(selectEl, items, valueFn, labelFn, placeholder) {
        const saved = selectEl.value;
        selectEl.innerHTML = `<option value="">${placeholder}</option>`;
        items.forEach(item => selectEl.add(new Option(labelFn(item), valueFn(item))));
        // Reapply the previously selected value if it's still valid.
        if ([...selectEl.options].some(o => o.value === saved)) selectEl.value = saved;
    }

    _updateControlPanel() {
        const gs = this._gs;
        const allActive = gs.players.filter(p => p.getActivePokemon());
        const nonFainted = allActive.filter(p => !p.getActivePokemon().isFainted());
        const hasPlayers = nonFainted.length > 0;

        const attackerSel = document.getElementById('attacker-select');
        const attackTargetSel = document.getElementById('attack-target-select');
        const statusTargetSel = document.getElementById('status-target-select');

        // Enable/disable controls.
        [
            attackerSel, attackTargetSel, statusTargetSel,
            document.getElementById('end-round-btn'),
            document.getElementById('update-stat-btn')
        ].forEach(el => el && (el.disabled = !hasPlayers));

        // DRY: dropdowns built with the same helper.
        const pLabel = p => `${p.name} - ${p.getActivePokemon().fullName}`;
        this.populateDropdown(attackerSel, nonFainted, p => p.id, pLabel, '-- Attacker --');
        this.populateDropdown(attackTargetSel, nonFainted, p => p.id, pLabel, '-- Target --');

        // Merged selector for status/stats & management: includes fainted Pokémon.
        this.populateDropdown(statusTargetSel, allActive,
            p => `${p.id}|${p.activePokemonIndex}`,
            p => {
                const pk = p.getActivePokemon();
                return `${p.name} - ${pk.fullName}${pk.isFainted() ? ' (FNT)' : ''}`;
            },
            '-- Pokémon --'
        );

        this._updateStatusButtonStyles();
        this._updateManagementButtons();

        // Keep the Move Name dropdown in sync with currently selected attacker's active Pokémon moves
        if (attackerSel && attackerSel.value) {
            const p = gs.players.find(p => p.id === attackerSel.value);
            const pk = p?.getActivePokemon();
            if (pk) {
                this._arena._populateMoveSelector(pk);
            } else {
                this._arena._populateMoveSelector(null);
            }
        } else {
            this._arena._populateMoveSelector(null);
        }

        this._updateAttackButtonsState();
    }

    _updateWeatherView() {
        const w = this._gs.weather || 'none';

        // Toggle all weather overlays
        const overlays = {
            sandstorm: 'sandstorm-overlay',
            hail: 'hail-overlay',
            rain: 'rain-overlay',
            'harsh-sunlight': 'sun-overlay',
            'heavy-rain': 'heavy-rain-overlay',
            'extreme-sunlight': 'extreme-sun-overlay',
            'snow-storm': 'snow-storm-overlay',
            'dune-storm': 'dune-storm-overlay',
            'delta-stream': 'delta-stream-overlay',
        };

        Object.entries(overlays).forEach(([key, id]) => {
            document.getElementById(id)?.classList.toggle('hidden', w !== key);
        });

        const sel = document.getElementById('weather-select');
        if (sel) {
            sel.value = w;
        }

        // Sync terrain selector
        const terrain = this._gs.terrain;
        const tSel = document.getElementById('terrain-select');
        if (tSel) {
            const tVal = terrain ? (typeof terrain === 'string' ? terrain : terrain.type) : 'none';
            tSel.value = tVal || 'none';
        }
    }

    _updateStatusButtonStyles() {
        const rawVal = document.getElementById('status-target-select')?.value;
        const targetId = rawVal && rawVal.includes('|') ? rawVal.split('|')[0] : rawVal;
        const numericId = parseInt(targetId);
        const player = this._gs.players.find(p => p.id === targetId || p.id === numericId);
        const statuses = player?.getActivePokemon()?.statuses ?? {};
        document.querySelectorAll('.status-btn').forEach(btn => {
            if (btn.dataset.status) {
                btn.classList.toggle('status-button-active', !!statuses[btn.dataset.status]);
            }
        });
    }

    _updateManagementButtons() {
        const sel = document.getElementById('status-target-select');
        const evolveBtn = document.getElementById('evolve-btn');
        const devolveBtn = document.getElementById('devolve-btn');
        const formBtn = document.getElementById('change-form-btn');
        const reviveBtn = document.getElementById('revive-btn');
        const tradeBtn = document.getElementById('trade-btn');
        if (!sel || !evolveBtn || !devolveBtn || !formBtn || !reviveBtn || !tradeBtn) return;

        evolveBtn.disabled = true;
        devolveBtn.disabled = true;
        formBtn.disabled = true;
        reviveBtn.disabled = true;
        tradeBtn.disabled = true;

        const rawVal = sel.dataset.value || sel.value;
        if (!rawVal) return;
        const [pid, sidStr] = rawVal.split('|');
        const sid = parseInt(sidStr);
        const player = this._gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon) return;
        tradeBtn.disabled = false;

        // Safety: ensure data and baseData are linked (important for Quick Play)
        if (!pokemon.data || !pokemon.baseData) {
            const r = this._arena.db.find(pokemon.fullName);
            if (r) {
                pokemon.data = r.foundNode;
                pokemon.baseData = r.baseNode;
            }
        }

        reviveBtn.disabled = !pokemon.isFainted();
        if (!pokemon.isFainted()) {
            // Species-wide evolution check: enable if ANY form in the family has an evolution branch.
            const root = pokemon.baseData;
            let canEvolve = (root.evolutions || []).length > 0;

            if (!canEvolve && root.forms) {
                for (const f of Object.values(root.forms)) {
                    if (!f) continue;
                    const fName = f.Name || f.name;
                    const fullNode = this._arena.db.find(fName)?.foundNode || f;
                    if (fullNode.evolutions?.length > 0) {
                        canEvolve = true;
                        break;
                    }
                }
            }
            evolveBtn.disabled = !canEvolve;

            // Devolution check
            const preEvolutions = this._arena.db.getPreEvolutions(pokemon.fullName);
            devolveBtn.disabled = preEvolutions.length === 0;

            const base = pokemon.baseData || pokemon.data;
            // Form entries in the dataset use lowercase `name` (not `Name`).
            // Check both to correctly detect forms like Diglett-Alola, Meowth-Alola, etc.
            const otherForms = [base, ...Object.values(base.forms || {})]
                .filter(f => {
                    const fname = f?.Name || f?.name;
                    return fname && fname !== pokemon.fullName;
                });
            formBtn.disabled = otherForms.length === 0;
        }
    }

    _updateAttackButtonsState() {
        const nameSel = document.getElementById('move-name-select');
        const physicalBtn = document.getElementById('physical-attack-btn');
        const specialBtn = document.getElementById('special-attack-btn');
        if (!physicalBtn || !specialBtn) return;

        if (!nameSel || !nameSel.value) {
            physicalBtn.disabled = false;
            specialBtn.disabled = false;
            return;
        }

        const moveName = nameSel.value;
        const moveData = (typeof MovesData !== 'undefined') ? MovesData[moveName] : null;
        if (!moveData) {
            physicalBtn.disabled = false;
            specialBtn.disabled = false;
            return;
        }

        const category = (moveData.category || '').toLowerCase();
        if (category === 'physical') {
            physicalBtn.disabled = false;
            specialBtn.disabled = true;
        } else if (category === 'special') {
            physicalBtn.disabled = true;
            specialBtn.disabled = false;
        } else if (category === 'status') {
            physicalBtn.disabled = true;
            specialBtn.disabled = true;
        } else {
            physicalBtn.disabled = false;
            specialBtn.disabled = false;
        }
    }
}
