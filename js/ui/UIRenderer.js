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
        this._playerGrid = document.getElementById('player-grid');
        this.settings = {
            damageNumbers: true,
            animationSpeed: '0.5s'
        };
    }

    // ── Gauge generation ─────────────────────────────────────────────

    /**
     * Generate 60 gauge-segment HTML with HP-aware dimming.
     * Segments at or below the active threshold render at full opacity;
     * segments above it (lost HP) render dim so the arc visually shrinks.
     * @param {number} pct - HP percentage 0.0 to 1.0
     */
    _buildGaugeHTML(pct) {
        const colors = [
            'var(--hp-color-red)', 'var(--hp-color-orange)', 'var(--hp-color-yellow-orange)',
            'var(--hp-color-yellow)', 'var(--hp-color-yellow-green)', 'var(--hp-color-green)'
        ];
        const total = 60, span = 270, start = -135;
        const activeCount = Math.max(1, Math.round(pct * total));
        let html = '';
        for (let i = 0; i < total; i++) {
            const color = colors[Math.floor(i / (total / colors.length))];
            const rotation = start + (i / (total - 1)) * span;
            const active = i < activeCount;
            const opacity = active ? '1' : '0.12';
            html += '<div class="hp-segment-rotator" style="transform:rotate(' + rotation + 'deg);">'
                + '<div class="hp-segment-visual" style="background-color:' + color + ';opacity:' + opacity + ';"></div>'
                + '</div>';
        }
        return html;
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
        this._playerGrid.innerHTML = '';
        this._gs.players.forEach(p => this._playerGrid.appendChild(this._createPlayerCard(p)));
        for (let i = this._gs.players.length; i < 6; i++) {
            this._playerGrid.appendChild(this._createEmptyCard());
        }
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
                    <button onclick="window.openTeamManager(${player.id})"
                            class="w-full mt-4 bg-secondary-container hover:bg-[#699cff] text-white font-bold py-3 px-4 text-xs uppercase tracking-widest border border-[#003271] step-animation">
                        Manage Team
                    </button>
                </div>`;
            return card;
        }

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
        const span = 270, startAngle = -135;
        const needleAngle = Math.max(startAngle, Math.min(startAngle + span, startAngle + pct * span));

        card.innerHTML = `
            <div class="entry-animation-container"></div>
            ${player.id === this._gs.activeTurnPlayerId
                ? '<div class="turn-indicator-arrow"><span class="material-symbols-outlined text-3xl">keyboard_double_arrow_down</span></div>'
                : ''}
            <div class="w-full flex-shrink-0">
                <div class="w-full flex justify-between items-start gap-2 min-w-0">
                    <h2 class="font-bold card-trainer-name" title="${escapeHTML(player.name)}">${escapeHTML(player.name)}</h2>
                    <div class="flex gap-2">
                        <button onclick="window.removePlayer(${player.id})"
                                class="text-[#ff7351] hover:text-white transition-colors" title="Remove Player">
                            <span class="material-symbols-outlined text-[18px]">person_remove</span>
                        </button>
                        <button onclick="window.openTeamManager(${player.id})"
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
            <div class="flex flex-col items-center justify-center flex-grow min-h-0 relative">
                <div class="relative">
                    <img src="${pokemon.sprite}"
                         onerror="this.onerror=null;this.src='https://placehold.co/96x96/000000/FFFFFF?text=?';"
                         alt="${escapeHTML(pokemon.fullName)}"
                         class="pokemon-sprite ${pokemon.isFainted() ? 'grayscale' : ''}">
                    ${pokemon.isFainted()
                ? '<div class="absolute inset-0 flex items-center justify-center"><span class="text-red-500 text-2xl font-bold -rotate-12 bg-black/50 px-2">FAINTED</span></div>'
                : ''}
                    <div class="absolute top-0 right-0 flex flex-col gap-1">
                        ${this._renderStatusIcons(pokemon)}
                    </div>
                </div>
                <!-- Dynamic Floating Text Container inserted locally in later features -->
                <div class="hp-gauge-container">
                    <div class="hp-gauge-segments-container">${this._buildGaugeHTML(pct)}</div>
                    <div class="hp-gauge-pivot"></div>
                    <div class="hp-gauge-needle" style="transform:rotate(${needleAngle}deg);"></div>
                    <div class="hp-gauge-center" onclick="window.editHP(${player.id})">
                        <div class="current-hp">${pokemon.currentHP}</div>
                        <div class="max-hp">${pokemon.maxHp}</div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 grid-rows-2 text-center w-full card-stat-grid flex-shrink-0">
                ${this._renderStatHeaders(pokemon)}
                ${this._renderStatValues(pokemon)}
            </div>
            <div class="grid grid-cols-6 gap-1 w-full flex-shrink-0 card-team-row">
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

    /** DRY: Renders status condition icons from the Pokemon's statuses object. */
    _renderStatusIcons(pokemon) {
        const iconMap = {
            poison: { icon: 'skull', color: 'text-purple-400' },
            bad_poison: { icon: 'skull', color: 'text-purple-400' },
            burn: { icon: 'local_fire_department', color: 'text-orange-400' },
            paralyze: { icon: 'bolt', color: 'text-yellow-400' },
            curse: { icon: 'cruelty', color: 'text-indigo-400' },
        };
        return Object.keys(pokemon.statuses)
            .filter(s => iconMap[s])
            .map(s => `<span class="material-symbols-outlined text-[20px] ${iconMap[s].color}" style="font-variation-settings: 'FILL' 1;">${iconMap[s].icon}</span>`)
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
            const border = isActive ? 'border-2 border-yellow-400' : 'border-2 border-outline-variant';
            return `<img src="${src}" title="${p ? escapeHTML(p.fullName) : 'Empty'}"
                         class="w-16 h-16 team-pokeball bg-surface-container-low p-1 ${border} ${isFainted ? 'grayscale' : ''}"
                         onclick="window.handleTeamIconClick(${player.id}, ${i})">`;
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
            p => `${p.id}-${p.activePokemonIndex}`,
            p => {
                const pk = p.getActivePokemon();
                return `${p.name} - ${pk.fullName}${pk.isFainted() ? ' (FNT)' : ''}`;
            },
            '-- Pokémon --'
        );

        this._updateStatusButtonStyles();
        this._updateManagementButtons();
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
        const formBtn = document.getElementById('change-form-btn');
        const reviveBtn = document.getElementById('revive-btn');
        if (!sel || !evolveBtn || !formBtn || !reviveBtn) return;

        evolveBtn.disabled = true;
        formBtn.disabled = true;
        reviveBtn.disabled = true;

        if (!sel.value) return;
        const [pid, sid] = sel.value.split('-').map(Number);
        const player = this._gs.players.find(p => p.id === pid);
        const pokemon = player?.team[sid];
        if (!pokemon) return;

        reviveBtn.disabled = !pokemon.isFainted();
        if (!pokemon.isFainted()) {
            evolveBtn.disabled = !(pokemon.data?.evolutions?.some(e => e?.Name));
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
