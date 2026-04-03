// ==========================================
// AUDIO MANAGER (Tone.js Wrapper)
// ==========================================

export class AudioManager {
    constructor() {
        this._ready = false;
        this._synth = null;
        this._noise = null;
        this._poly = null;
    }

    /** Lazy-initialise Tone.js on the first user interaction. */
    init() {
        if (this._ready) return;
        this._synth = new Tone.Synth().toDestination();
        this._noise = new Tone.NoiseSynth({
            noise: { type: 'pink' },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0 }
        }).toDestination();
        this._poly = new Tone.PolySynth(Tone.Synth).toDestination();
        this._ready = true;
    }

    /**
     * @param {'click'|'attack'|'status'|'confirm'|'error'|'heal'|'faint'|'evolve'} action
     */
    play(action) {
        if (!this._ready) return;
        const actions = {
            click: () => this._synth.triggerAttackRelease('C5', '8n'),
            attack: () => this._noise.triggerAttackRelease('0.1'),
            status: () => this._poly.triggerAttackRelease(['E5', 'G#5'], '16n'),
            confirm: () => this._poly.triggerAttackRelease(['C4', 'G4'], '8n'),
            error: () => this._synth.triggerAttackRelease('F#3', '8n'),
            heal: () => this._poly.triggerAttackRelease(['C5', 'E5', 'G5'], '8n'),
            faint: () => this._synth.triggerAttackRelease('C3', '4n'),
            evolve: () => this._poly.triggerAttackRelease(['C4', 'E4', 'G4', 'C5'], '4n'),
        };
        actions[action]?.();
    }

    /** Play a Pokémon's cry audio file. */
    playCry(pokemon) {
        if (!pokemon?.cry) return;
        const audio = new Audio(pokemon.cry);
        audio.volume = 0.4;
        audio.play().catch(e => console.warn('Cry audio failed:', e));
    }
}
