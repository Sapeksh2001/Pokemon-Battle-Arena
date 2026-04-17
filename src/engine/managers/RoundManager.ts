export class RoundManager {
    constructor(arena) {
        this.arena = arena;
    }

    endRound() {
        this.arena.audio.play('confirm');
        this.arena.history.snapshot(this.arena.gs);
        this.arena.gs.round++;
        this._applyWeatherDamage();
        this._applyStatusDamage();
        this.arena.renderer.renderAll();
        this.arena._notify(`========== ROUND ${this.arena.gs.round} BEGINS ==========`, 'round');

        if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
            this.arena.multiplayer.sendGameState();
        }
    }

    _applyStatusDamage() {
        const affected = [];
        const cured = [];
        this.arena.gs.players.forEach(player => {
            const pokemon = player.getActivePokemon();
            if (!pokemon || pokemon.isFainted()) return;

            let totalDmg = 0;
            let curedStatus = [];

            if (pokemon.hasStatus('poison')) {
                const rounds = pokemon.statuses['poison'].duration;
                const mult = rounds >= 2 ? 0.15 : (rounds === 1 ? 0.10 : 0.05);
                totalDmg += Math.max(1, Math.floor(pokemon.maxHp * mult));
                pokemon.statuses['poison'].duration++;
                if (pokemon.statuses['poison'].duration >= 3) curedStatus.push('poison');
            }

            if (pokemon.hasStatus('bad_poison') || pokemon.hasStatus('toxic')) {
                const sName = pokemon.hasStatus('bad_poison') ? 'bad_poison' : 'toxic';
                const rounds = pokemon.statuses[sName].duration;
                const mult = 0.10 + (0.02 * rounds);
                totalDmg += Math.max(1, Math.floor(pokemon.maxHp * mult));
                pokemon.statuses[sName].duration++;
            }

            if (pokemon.hasStatus('burn')) {
                totalDmg += Math.max(1, Math.floor(pokemon.maxHp * 0.10));
                pokemon.statuses['burn'].duration++;
                if (pokemon.statuses['burn'].duration >= 3) curedStatus.push('burn');
            }

            if (pokemon.hasStatus('curse')) {
                totalDmg += Math.max(1, Math.floor(pokemon.maxHp * 0.30));
                pokemon.statuses['curse'].duration++;
            }

            if (totalDmg > 0) {
                pokemon.takeDamage(totalDmg);
                affected.push(pokemon.fullName);
            }

            curedStatus.forEach(s => pokemon.removeStatus(s));
            if (curedStatus.length > 0) cured.push(pokemon.fullName);
        });

        if (affected.length > 0) {
            this.arena._notify(`${affected.join(', ')} took damage from status conditions!`, 'damage');
        }
        if (cured.length > 0) {
            this.arena._notify(`${cured.join(', ')} recovered from status conditions!`, 'heal');
        }
    }

    _applyWeatherDamage() {
        if (this.arena.gs.weather === 'none') return;
        const affected = [];
        this.arena.gs.players.forEach(player => {
            const pokemon = player.getActivePokemon();
            if (!pokemon || pokemon.isFainted()) return;
            const immune = this.arena.gs.weather === 'sandstorm'
                ? pokemon.types.some(t => ['Rock', 'Ground', 'Steel'].includes(t))
                : pokemon.types.includes('Ice');
            if (!immune) {
                const dmg = Math.floor(pokemon.maxHp / 16);
                pokemon.takeDamage(dmg);
                affected.push(pokemon.fullName);
            }
        });
        if (affected.length > 0) {
            this.arena._notify(
                `${affected.join(', ')} buffeted by ${this.arena.gs.weather}!`,
                'damage'
            );
        }
    }

    cycleWeather() {
        this.arena.history.snapshot(this.arena.gs);
        const cycle = ['none', 'sandstorm', 'hail'];
        const next = cycle[(cycle.indexOf(this.arena.gs.weather) + 1) % cycle.length];
        const old = this.arena.gs.weather;
        this.arena.gs.weather = next;
        this.arena._notify(`Weather changed from ${old} to ${next}.`, 'action');
        this.arena.renderer.renderAll();
        this.arena.audio.play('click');

        if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
            this.arena.multiplayer.sendGameState();
        }
    }
}
