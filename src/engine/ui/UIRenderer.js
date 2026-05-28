import { escapeHTML } from '../utils/helpers.js';

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

    _renderPlayerCards() {
        const grid = document.getElementById('player-grid');
        if (!grid) return;

        grid.innerHTML = '';
        this._gs.players.forEach(p => grid.appendChild(this._createPlayerCard(p)));
        // Commented out to satisfy dynamic scaling logic (Task 6)
        // for (let i = this._gs.players.length; i < 6; i++) {
        //     this._playerGrid.appendChild(this._createEmptyCard());
        // }
        lucide.createIcons();
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
            card.innerHTML = `
                <div class="flex flex-col items-center justify-center h-full text-center font-body">
                    <h3 class="font-bold text-2xl text-secondary font-headline">${escapeHTML(player.name)}</h3>
                    <p class="text-xs uppercase tracking-wider text-on-surface-variant mt-4">No active Pokémon.</p>
                    <button onclick="window.openTeamManager('${player.id}')"
                            class="w-full mt-4 bg-secondary-container hover:bg-[#699cff] text-white font-bold py-3 px-4 text-xs uppercase tracking-widest border border-[#003271] step-animation">
                        Manage Team
                    </button>
                </div>`;
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

        card.innerHTML = `
            <div class="entry-animation-container"></div>
            ${player.id === this._gs.activeTurnPlayerId
                ? '<div class="turn-indicator-arrow"><span class="material-symbols-outlined text-3xl">keyboard_double_arrow_down</span></div>'
                : ''}
            <div class="w-full flex-shrink-0">
                <div class="w-full flex justify-between items-start gap-2 min-w-0">
                    <h2 class="font-bold card-trainer-name" title="${escapeHTML(player.name)}">${escapeHTML(player.name)}</h2>
                    <div class="flex gap-2">
                        <button onclick="window.removePlayer('${player.id}')"
                                class="text-[#ff7351] hover:text-white transition-colors" title="Remove Player">
                            <span class="material-symbols-outlined text-[18px]">person_remove</span>
                        </button>
                        <button onclick="window.openTeamManager('${player.id}')"
                                class="text-secondary hover:text-white transition-colors" title="Manage Team">
                            <span class="material-symbols-outlined text-[20px]">settings</span>
                        </button>
                    </div>
                </div>
                <h3 class="font-bold card-pokemon-name">${escapeHTML(pokemon.fullName)}</h3>
                <p class="pokemon-tier">${pokemon.tier || 'Unknown'}</p>
                <div class="flex justify-center gap-2 mt-1">
                    ${this._renderTypeBadges(pokemon.types)}
                </div>
            </div>
            <div class="w-full flex-shrink-0 flex flex-col items-center justify-start relative mt-1" style="height: 150px;">
                <div class="flex items-center justify-center relative" style="height: 90px; width: 100%;">
                    <img src="${pokemon.sprite}"
                         onerror="if(!this.dataset.tried){this.dataset.tried=1;this.src=this.src.replace('/ani/','/gen5/').replace('.gif','.png');}else if(this.dataset.tried=='1'){this.dataset.tried=2;this.src=this.src.replace('/gen5/','/dex/');}else{this.onerror=null;this.src='https://placehold.co/96x96/000000/FFFFFF?text=?';}"
                         alt="${escapeHTML(pokemon.fullName)}"
                         class="pokemon-sprite ${pokemon.isFainted() ? 'grayscale' : ''}"
                         style="max-height: 90px; max-width: 100%; object-fit: contain;">
                    ${pokemon.isFainted()
                ? '<div class="absolute inset-0 flex items-center justify-center"><span class="text-red-500 text-2xl font-bold -rotate-12 bg-black/50 px-2">FAINTED</span></div>'
                : ''}
                </div>
                <!-- Dynamic Floating Text Container inserted locally in later features -->
                <div class="hp-bar-container w-full" onclick="window.editHP('${player.id}')" style="margin-top: 6px; margin-bottom: 0;">
                    <div class="hp-text-row">
                        <span class="hp-values">${pokemon.currentHP}/${pokemon.maxHp}</span>
                    </div>
                    <div class="hp-bar-track">
                        <div class="hp-bar-fill" style="width: ${pct * 100}%; background-color: ${this._getHPColor(pct)};"></div>
                    </div>
                </div>
                <div class="status-alignment-row w-full" style="margin-top: 4px; height: 18px;">
                    ${this._renderStatusIcons(pokemon)}
                </div>
            </div>
            <div class="flex-grow flex flex-col justify-end min-h-0 w-full">
                ${this._renderMovesAndAbilities(pokemon)}
            </div>
            <div class="grid grid-cols-5 grid-rows-2 text-center w-full card-stat-grid flex-shrink-0">
                ${this._renderStatHeaders(pokemon)}
                ${this._renderStatValues(pokemon)}
            </div>
            <div class="flex justify-evenly items-center w-full flex-shrink-0 card-team-row">
                ${this._renderTeamIcons(player)}
            </div>`;

        return card;
    }

    /** DRY: Renders type badge HTML — used by createPlayerCard. */
    _renderTypeBadges(types) {
        return types.map(t =>
            `<span class="type-badge" style="background-color:var(--type-${t.toLowerCase()})">${t.toUpperCase()}</span>`
        ).join('');
    }

    /** Render moves and abilities section. */
    _renderMovesAndAbilities(pokemon) {
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

            const moveDesc = moveData.effect ? `<span class="mc-tooltip-desc">${escapeHTML(moveData.effect)}</span>` : '';

            return `
                <tr class="${bgClass} text-slate-800 border-b border-gray-300 last:border-0 align-middle h-[21px]" style="height: 21px;">
                    <td class="p-0.5 pl-1 text-[#0f172a] text-[9px] sm:text-[10px] tracking-tight mc-tooltip align-middle">
                        <span class="truncate block max-w-[80px]" title="${escapeHTML(m)}">${escapeHTML(m)}</span>
                        <div class="mc-tooltip-content">
                            <span class="mc-tooltip-title">${escapeHTML(m)}</span>
                            <span>Type: ${escapeHTML(type)}</span><br>
                            <span>Power: ${escapeHTML(String(power))}</span><br>
                            <span>Accuracy: ${escapeHTML(displayAcc)}</span>
                            ${moveDesc}
                        </div>
                    </td>
                    <td class="p-0.5 text-center align-middle">
                        <span class="type-badge" style="background-color:var(--type-${type.toLowerCase()}); font-size: 8px; font-weight: 800; font-family: sans-serif; padding: 2px 4px; border-radius: 4px !important; border: 1px solid white; box-shadow: 0 0 0 1px black; display: inline-block; vertical-align: middle; line-height: 1; text-shadow: 1px 1px 0 rgba(0,0,0,0.5); letter-spacing: 0.5px; white-space: nowrap;">
                            ${escapeHTML(type.toUpperCase())}
                        </span>
                    </td>
                    <td class="p-0.5 text-center align-middle">${catIcon}</td>
                    <td class="p-0.5 text-center text-[9px] sm:text-[10px] align-middle">${escapeHTML(String(power))}</td>
                    <td class="p-0.5 text-center pr-1 text-[9px] sm:text-[10px] align-middle">${escapeHTML(displayAcc)}</td>
                </tr>
            `;
        }).join('');

        const noMovesRow = `<tr><td colspan="5" class="p-1 text-center text-gray-500 italic text-[10px]">No moves available</td></tr>`;

        const abilityData = pokemon.ability && window.AbilitiesData && window.AbilitiesData[pokemon.ability]
            ? window.AbilitiesData[pokemon.ability] : null;
        const abilityDesc = abilityData && abilityData.description ? abilityData.description : '';

        const hiddenAbilityData = pokemon.hiddenAbility && window.AbilitiesData && window.AbilitiesData[pokemon.hiddenAbility]
            ? window.AbilitiesData[pokemon.hiddenAbility] : null;
        const hiddenAbilityDesc = hiddenAbilityData && hiddenAbilityData.description ? hiddenAbilityData.description : '';

        return `
            <div class="w-full flex-shrink-0 mt-1 mb-1 bg-[#f8f9fa] text-black rounded-xl border-2 border-[#1e293b]" style="text-shadow: none;">
                <table class="w-full text-left border-collapse" style="table-layout: fixed;">
                    <thead>
                        <tr class="bg-black text-white text-[8px] sm:text-[9px] uppercase tracking-wider h-[18px]" style="height: 18px;">
                            <th class="p-0.5 pl-1 w-[35%] rounded-tl-[10px]">Move</th>
                            <th class="p-0.5 text-center w-[25%]">Type</th>
                            <th class="p-0.5 text-center w-[12%]">Cat.</th>
                            <th class="p-0.5 text-center w-[14%]">Power</th>
                            <th class="p-0.5 text-center pr-1 w-[14%] rounded-tr-[10px]">Acc.</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${moves.length > 0 ? movesRows : noMovesRow}
                    </tbody>
                </table>
                <div class="flex border-t-2 border-[#1e293b] bg-gray-300 p-0.5 gap-0.5 rounded-b-[10px] h-[36px]" style="height: 36px;">
                    <div class="w-1/2 bg-white rounded-bl-lg rounded-tl-sm rounded-r-sm border-2 border-[#1e293b] p-1 text-center flex flex-col justify-center items-center h-full ${pokemon.ability ? 'mc-tooltip' : ''}">
                        <div class="uppercase text-[8px] mb-0.5 text-[#334155] tracking-widest leading-none">Ability</div>
                        ${pokemon.ability ? `
                            <div class="text-[10px] sm:text-xs tracking-wide text-[#0f172a] leading-none font-bold">${escapeHTML(pokemon.ability)}</div>
                            <div class="mc-tooltip-content">
                                <span class="mc-tooltip-title">${escapeHTML(pokemon.ability)}</span>
                                <span class="mc-tooltip-desc">${escapeHTML(abilityDesc || 'No description available.')}</span>
                            </div>
                        ` : `<div class="text-gray-400 italic text-[9px] mt-0.5">None</div>`}
                    </div>
                    <div class="w-1/2 bg-white rounded-br-lg rounded-tr-sm rounded-l-sm border-2 border-[#1e293b] p-1 text-center flex flex-col justify-center items-center h-full ${pokemon.hiddenAbility ? 'mc-tooltip' : ''}">
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
        return Object.keys(pokemon.statuses)
            .filter(s => iconMap[s])
            .map(s => `<span class="material-symbols-outlined text-[20px] ${iconMap[s].color} status-icon-aura" style="font-variation-settings: 'FILL' 1;">${iconMap[s].icon}</span>`)
            .join('');
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

    /** Stat value row. Applies colour coding for modifiers. */
    _renderStatValues(pokemon) {
        const isParalyzed = pokemon.hasStatus('paralyze');
        return Object.entries(pokemon.stats)
            .filter(([key]) => key !== 'hp')
            .map(([key]) => {
                const mod = pokemon.statModifiers[key] || 0;
                let colorClass = mod > 0 ? 'text-green-400' : mod < 0 ? 'text-red-400' : '';
                if (key === 'speed' && isParalyzed) colorClass = 'stat-paralyzed';
                const effective = key === 'speed' && isParalyzed
                    ? Math.floor(pokemon.getEffectiveStat('speed') / 2)
                    : pokemon.getEffectiveStat(key);
                return `<div class="${colorClass}">${effective}</div>`;
            }).join('');
    }

    /** Team icon row — Pokéballs clickable to switch active Pokémon. */
    _renderTeamIcons(player) {
        return player.team.map((p, i) => {
            const isActive = i === player.activePokemonIndex;
            const isFainted = p && p.isFainted();
            const src = p ? p.sprite
                : (isFainted
                    ? 'https://img.pokemondb.net/sprites/items/luxury-ball.png'
                    : 'https://img.pokemondb.net/sprites/items/poke-ball.png');
            const border = isActive ? 'border-2 border-transparent' : 'border-2 border-transparent';
            return `<img src="${src}" title="${p ? escapeHTML(p.fullName) : 'Empty'}"
                         class="w-16 h-16 team-pokeball bg-transparent p-1 ${border} ${isFainted ? 'grayscale' : ''}"
                         onerror="if(!this.dataset.tried){this.dataset.tried=1;this.src=this.src.replace('/ani/','/gen5/').replace('.gif','.png');}else if(this.dataset.tried=='1'){this.dataset.tried=2;this.src=this.src.replace('/gen5/','/dex/');}"
                         onclick="window.handleTeamIconClick('${player.id}', ${i})">`;
        }).join('');
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
        const mgmtSel = document.getElementById('management-pokemon-select');

        // Enable/disable controls.
        [
            attackerSel, attackTargetSel, statusTargetSel,
            document.getElementById('end-round-btn'),
            document.getElementById('update-stat-btn')
        ].forEach(el => el && (el.disabled = !hasPlayers));
        if (mgmtSel) mgmtSel.disabled = allActive.length === 0;

        // DRY: four dropdowns built with the same helper.
        const pLabel = p => `${p.name} - ${p.getActivePokemon().fullName}`;
        this.populateDropdown(attackerSel, nonFainted, p => p.id, pLabel, '-- Attacker --');
        this.populateDropdown(attackTargetSel, nonFainted, p => p.id, pLabel, '-- Target --');
        this.populateDropdown(statusTargetSel, nonFainted, p => p.id, pLabel, '-- Player --');

        // Management: includes fainted Pokémon for revive.
        this.populateDropdown(mgmtSel, allActive,
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
    }

    _updateWeatherView() {
        const w = this._gs.weather;
        document.getElementById('sandstorm-overlay')?.classList.toggle('hidden', w !== 'sandstorm');
        document.getElementById('hail-overlay')?.classList.toggle('hidden', w !== 'hail');

        const btn = document.getElementById('weather-btn');
        if (btn) {
            const shortNames = { none: 'Wth: None', sun: 'Wth: Sun', rain: 'Wth: Rain', sandstorm: 'Wth: Sand', hail: 'Wth: Hail' };
            btn.textContent = shortNames[w] || 'Wth';

            btn.className = 'p-1 border border-outline-variant text-xs uppercase font-bold tracking-widest transition-colors step-animation ' +
                (w === 'none' ? 'bg-surface-variant hover:bg-surface-bright text-secondary' :
                    w === 'sun' ? 'bg-yellow-400 hover:bg-yellow-300 text-black' :
                        w === 'rain' ? 'bg-[#699cff] hover:bg-[#8bb3ff] text-white' :
                            w === 'sandstorm' ? 'bg-[#ca8a04] hover:bg-[#a16207] text-white' :
                                'bg-[#00e5ff] hover:bg-[#00b8d4] text-black');
        }
    }

    _updateStatusButtonStyles() {
        const targetId = parseInt(document.getElementById('status-target-select')?.value);
        const player = this._gs.players.find(p => p.id === targetId);
        const statuses = player?.getActivePokemon()?.statuses ?? {};
        document.querySelectorAll('.status-btn').forEach(btn => {
            if (btn.dataset.status) {
                btn.classList.toggle('status-button-active', !!statuses[btn.dataset.status]);
            }
        });
    }

    _updateManagementButtons() {
        const sel = document.getElementById('management-pokemon-select');
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
}
