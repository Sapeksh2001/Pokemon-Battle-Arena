/**
 * build_data.cjs
 * Enriches public/data/moves.json with Showdown data (priority, flags, secondary, drain, recoil)
 * Builds public/data/abilities_data.json from Abilities.xlsx + Showdown abilities.js
 */
const fs = require('fs');
const https = require('https');
const XLSX = require('xlsx');

const fetchText = (url) => new Promise((resolve, reject) => {
    https.get(url, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => resolve(d));
    }).on('error', reject);
});

const toId = (s) => s ? s.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

// ── STEP 1: Fetch Showdown move data ────────────────────────────────────────
async function fetchShowdownMoves() {
    console.log('Fetching Showdown moves.js...');
    const text = await fetchText('https://play.pokemonshowdown.com/data/moves.js');
    const sandbox = { exports: {} };
    require('vm').runInNewContext(text, sandbox);
    return sandbox.exports.BattleMovedex || sandbox.exports.BattleMoves || sandbox.exports.Moves || {};
}

// ── STEP 2: Fetch Showdown ability data ─────────────────────────────────────
async function fetchShowdownAbilities() {
    console.log('Fetching Showdown abilities.js...');
    const text = await fetchText('https://play.pokemonshowdown.com/data/abilities.js');
    const sandbox = { exports: {} };
    require('vm').runInNewContext(text, sandbox);
    return sandbox.exports.BattleAbilities || sandbox.exports.Abilities || {};
}

// ── STEP 3: Parse local xlsx files ──────────────────────────────────────────
function parseAbilitiesXlsx() {
    console.log('Parsing Abilities.xlsx...');
    const wb = XLSX.readFile('data/Abilities.xlsx');
    const ws = wb.Sheets[wb.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
    // headers: Ability, Desc
    const result = {};
    rows.forEach(r => {
        const name = r['Ability']?.trim();
        const desc = r['Desc']?.trim();
        if (name && desc) result[toId(name)] = { name, desc };
    });
    return result;
}

function parseAttackChartXlsx() {
    console.log('Parsing Attack Chart.xlsx...');
    const wb = XLSX.readFile('data/Attack Chart.xlsx');
    const ws = wb.Sheets['Sheet1'];
    const raw = XLSX.utils.sheet_to_json(ws, { defval: '', header: 1 });
    // Row 0 is ['Absorb', 'Heals 20% of damage dealt'] — first row is a move entry
    // Format: [moveName, effect]
    const result = {};
    raw.forEach(row => {
        const name = String(row[0] || '').trim();
        const effect = String(row[1] || '').trim();
        if (name) result[toId(name)] = { name, effect };
    });
    return result;
}

// ── STEP 4: Build enriched moves.json ───────────────────────────────────────
function enrichMoves(showdownMoves, attackChart) {
    console.log('Loading existing moves.json...');
    const existing = JSON.parse(fs.readFileSync('public/data/moves.json', 'utf8'));
    let enriched = 0;

    const enrichedMoves = {};
    for (const [moveName, moveData] of Object.entries(existing)) {
        const id = toId(moveName);
        const sd = showdownMoves[id];
        const ac = attackChart[id];

        const entry = { ...moveData };

        if (sd) {
            // Priority
            if (sd.priority !== undefined && sd.priority !== 0) {
                entry.priority = sd.priority;
            }
            // Flags (only relevant game flags, not all)
            const relevantFlags = ['contact', 'protect', 'sound', 'punch', 'bite', 'heal', 'bullet', 'wind', 'slicing', 'distance'];
            const flags = {};
            if (sd.flags) {
                relevantFlags.forEach(f => { if (sd.flags[f]) flags[f] = 1; });
            }
            if (Object.keys(flags).length > 0) entry.flags = flags;

            // Secondary effect (status, stat drops, etc.)
            if (sd.secondary && sd.secondary.chance) {
                const sec = { chance: sd.secondary.chance };
                if (sd.secondary.status) sec.status = sd.secondary.status;
                if (sd.secondary.boosts) sec.boosts = sd.secondary.boosts;
                if (sd.secondary.volatileStatus) sec.volatileStatus = sd.secondary.volatileStatus;
                entry.secondary = sec;
            }

            // Drain (heal portion of damage dealt)
            if (sd.drain) entry.drain = sd.drain; // e.g. [1, 2] = 50%

            // Recoil
            if (sd.recoil) entry.recoil = sd.recoil; // e.g. [1, 3] = 33%

            // Self-stat boost (like Fiery Dance)
            if (sd.self && sd.self.boosts) entry.selfBoosts = sd.self.boosts;

            enriched++;
        }

        // Override/supplement with game-specific attack chart effect
        if (ac && ac.effect) {
            entry.gameEffect = ac.effect;
        }

        enrichedMoves[moveName] = entry;
    }

    console.log(`Enriched ${enriched} / ${Object.keys(existing).length} moves with Showdown data.`);
    return enrichedMoves;
}

// ── STEP 5: Build abilities_data.json ───────────────────────────────────────
function buildAbilitiesData(xlsxAbilities, showdownAbilities, attackChart) {
    console.log('Building abilities_data.json...');

    // Custom ability descriptions from your xlsx (game-specific overrides)
    // Skip purely custom/hidden abilities that have no standard counterpart
    const SKIP_CUSTOM = new Set([
        'levitize','phyzone','hypnomania','poisonpuppeteer','libero','tangledfoot',
        'guarddown','multibooth','clawedarmor','teravolt','quarkdrive','snowstorm',
        'dunestorm','therianation','incarnation','illusive mist','spiritsnow',
        'fasterfocus','fasted focus','pixietrace','inner justice','innerjustice'
    ]);

    const result = {};

    // Start with Showdown abilities as base (complete coverage)
    for (const [id, sdAbility] of Object.entries(showdownAbilities)) {
        if (sdAbility.isNonstandard && sdAbility.isNonstandard !== 'Gigantamax') continue;
        result[id] = {
            name: sdAbility.name || id,
            desc: sdAbility.desc || sdAbility.shortDesc || '',
            rating: sdAbility.rating || 0,
            num: sdAbility.num || 0,
        };
    }

    // Override/add from xlsx (game-specific descriptions take priority)
    for (const [id, xlsxAbility] of Object.entries(xlsxAbilities)) {
        const cleanId = toId(xlsxAbility.name);
        if (SKIP_CUSTOM.has(cleanId)) {
            // Still add custom abilities with a 'custom' flag
            result[cleanId] = {
                name: xlsxAbility.name,
                desc: xlsxAbility.desc,
                custom: true,
                gameDesc: xlsxAbility.desc,
            };
            continue;
        }
        if (result[cleanId]) {
            result[cleanId].gameDesc = xlsxAbility.desc; // game-specific override description
        } else {
            result[cleanId] = {
                name: xlsxAbility.name,
                desc: xlsxAbility.desc,
                custom: true,
                gameDesc: xlsxAbility.desc,
            };
        }
    }

    console.log(`Total abilities in database: ${Object.keys(result).length}`);
    return result;
}

// ── MAIN ────────────────────────────────────────────────────────────────────
(async () => {
    try {
        const [showdownMoves, showdownAbilities] = await Promise.all([
            fetchShowdownMoves(),
            fetchShowdownAbilities()
        ]);

        const xlsxAbilities = parseAbilitiesXlsx();
        const attackChart = parseAttackChartXlsx();

        // Enrich moves
        const enrichedMoves = enrichMoves(showdownMoves, attackChart);
        fs.writeFileSync('public/data/moves.json', JSON.stringify(enrichedMoves, null, 2));
        console.log('✓ Saved enriched moves.json');

        // Build abilities data
        const abilitiesData = buildAbilitiesData(xlsxAbilities, showdownAbilities, attackChart);
        fs.writeFileSync('public/data/abilities_data.json', JSON.stringify(abilitiesData, null, 2));
        console.log('✓ Saved abilities_data.json');

        // Build attack chart json for game use
        const attackChartJson = {};
        for (const [id, entry] of Object.entries(attackChart)) {
            if (entry.name && entry.effect) attackChartJson[entry.name] = entry.effect;
        }
        fs.writeFileSync('public/data/attack_chart.json', JSON.stringify(attackChartJson, null, 2));
        console.log('✓ Saved attack_chart.json');

        console.log('\nAll data built successfully!');
    } catch (e) {
        console.error('Error:', e);
        process.exit(1);
    }
})();
