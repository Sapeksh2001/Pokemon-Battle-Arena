import { Player } from '../models/Player';
import { Pokemon } from '../models/Pokemon';
import { escapeHTML } from '../utils/helpers';

export class PlayerManager {
    constructor(arena) {
        this.arena = arena;
    }

    addPlayer() {
        this.arena.audio.play('click');
        if (this.arena.gs.players.length >= 6) {
            this.arena._announce('Lobby Full: Maximum 6 trainers allowed.', true);
            return;
        }

        const input = document.getElementById('new-player-name') as HTMLInputElement | null;
        const name = input?.value.trim();
        if (!name) return;

        const player = new Player(String(Date.now()), name);
        this.arena.gs.players.push(player);
        if (input) input.value = '';
        this.arena.renderer.renderAll();
        this.arena.openTeamManager(player.id);

        if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
            this.arena.multiplayer.sendGameState();
        }
    }

    removePlayer(playerId: string) {
        if (this.arena.multiplayer && this.arena.multiplayer.mode !== 'offline' && !this.arena.multiplayer.isHost) {
            this.arena._notify('Only the host can remove players in multiplayer mode.', 'system', true);
            return;
        }

        const player = this.arena.gs.players.find(p => p.id === playerId);
        if (!player) return;

        this.arena.openConfirmModal(
            'Remove Trainer',
            `Are you sure you want to remove ${player.name} from the battle?`,
            () => {
                this.arena.history.snapshot(this.arena.gs);
                this.arena.gs.players = this.arena.gs.players.filter(p => p.id !== playerId);
                ['activeTurnPlayerId', 'selectedAttackTargetId', 'selectedStatusTargetId'].forEach(key => {
                    if (this.arena.gs[key] === playerId) this.arena.gs[key] = null;
                });
                this.arena._notify(`${player.name} has been removed from the battle.`, 'system');
                this.arena.renderer.renderAll();

                if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
                    this.arena.multiplayer.sendGameState();
                }
            }
        );
    }

    handleEvolve() {
        const val = (document.getElementById('management-pokemon-select') as HTMLSelectElement | null)?.dataset?.value || (document.getElementById('management-pokemon-select') as HTMLSelectElement | null)?.value;
        if (!val) { this.arena._announce('Select a Pokémon to evolve.', true); return; }
        const [pid, sid] = val.split('|');
        const player = this.arena.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[parseInt(sid)];
        if (!pokemon) return;
        const evos = this._resolveEvolutions(pokemon);
        if (evos.length === 0) { this.arena._announce(`${pokemon.fullName} cannot evolve further.`, true); return; }
        evos.length === 1
            ? this._confirmEvolution(evos[0].Name || evos[0].name)
            : this.arena.openSelectionModal(`Evolve ${pokemon.fullName} into...`, evos, (name) => this._confirmEvolution(name));
    }

    handleDevolve() {
        const val = (document.getElementById('management-pokemon-select') as HTMLSelectElement | null)?.dataset?.value || (document.getElementById('management-pokemon-select') as HTMLSelectElement | null)?.value;
        if (!val) { this.arena._announce('Select a Pokémon to devolve.', true); return; }
        const [pid, sid] = val.split('|');
        const player = this.arena.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[parseInt(sid)];
        if (!pokemon) return;

        const parents = this.arena.db.getPreEvolutions(pokemon.fullName);
        if (parents.length === 0) { this.arena._announce(`${pokemon.fullName} has no pre-evolution.`, true); return; }

        parents.length === 1
            ? this._confirmDevolution(parents[0])
            : this.arena.openSelectionModal(`Devolve ${pokemon.fullName} into...`, parents.map(n => ({ Name: n })), (name) => this._confirmDevolution(name));
    }

    _confirmEvolution(evolutionName: string) {
        const val = (document.getElementById('management-pokemon-select') as HTMLSelectElement | null)?.dataset?.value || (document.getElementById('management-pokemon-select') as HTMLSelectElement | null)?.value;
        if (!val) return;
        const [pid, sid] = val.split('|');
        const player = this.arena.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[parseInt(sid)];
        if (!player || !pokemon) return;

        this.arena.history.snapshot(this.arena.gs);
        const oldName = pokemon.fullName;
        this.arena._animateSprite(pid, 'evolve', () => {
            const result = this.arena.db.find(evolutionName);
            if (!result) return;
            player.team[parseInt(sid)] = new Pokemon(result.foundNode, result.baseNode);
            this.arena.modals.close('selection');
            this.arena._notify(`${oldName} evolved into ${evolutionName}!`, 'action');
            this.arena.renderer.renderAll();
            this.arena.audio.playCry(player.team[parseInt(sid)]);

            if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
                this.arena.multiplayer.sendGameState();
            }
        });
    }

    _confirmDevolution(parentName: string) {
        const val = (document.getElementById('management-pokemon-select') as HTMLSelectElement | null)?.dataset?.value || (document.getElementById('management-pokemon-select') as HTMLSelectElement | null)?.value;
        if (!val) return;
        const [pid, sid] = val.split('|');
        const player = this.arena.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[parseInt(sid)];
        if (!player || !pokemon) return;

        this.arena.history.snapshot(this.arena.gs);
        const oldName = pokemon.fullName;
        this.arena._animateSprite(pid, 'evolve', () => {
            const result = this.arena.db.find(parentName);
            if (!result) return;
            player.team[parseInt(sid)] = new Pokemon(result.foundNode, result.baseNode);
            this.arena.modals.close('selection');
            this.arena._notify(`${oldName} devolved into ${parentName}!`, 'action');
            this.arena.renderer.renderAll();
            this.arena.audio.playCry(player.team[parseInt(sid)]);

            if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
                this.arena.multiplayer.sendGameState();
            }
        });
    }

    _resolveEvolutions(pokemon: Pokemon) {
        const evoTargets = new Map();
        const root = pokemon.baseData;
        if (!root) return [];

        const addEvoBranch = (evo: any) => {
            const name = typeof evo === 'string' ? evo : (evo.Name || evo.name);
            if (!name) return;
            const targetEntry = this.arena.db.find(name);
            if (!targetEntry) return;
            const baseNode = targetEntry.foundNode;
            evoTargets.set(baseNode.Name || name, baseNode);
            const targetForms = targetEntry.baseNode?.forms || {};
            for (const f of Object.values(targetForms)) {
                if (f) evoTargets.set((f as any).Name || (f as any).name, f);
            }
        };

        if (root.evolutions) root.evolutions.forEach(addEvoBranch);
        const forms = root.forms || {};
        for (const f of Object.values(forms)) {
            if ((f as any).evolutions) (f as any).evolutions.forEach(addEvoBranch);
        }

        return Array.from(evoTargets.values());
    }

    handleRevive() {
        const val = (document.getElementById('management-pokemon-select') as HTMLSelectElement | null)?.dataset?.value || (document.getElementById('management-pokemon-select') as HTMLSelectElement | null)?.value;
        if (!val) { this.arena._announce('Select a fainted Pokémon to revive.', true); this.arena.audio.play('error'); return; }
        const [pid, sid] = val.split('|');
        const player = this.arena.gs.players.find(p => p.id === pid);
        const pokemon = player?.team[parseInt(sid)];
        if (!pokemon?.isFainted()) { this.arena._announce('This Pokémon is not fainted.', true); return; }

        this.arena.history.snapshot(this.arena.gs);
        const revivedHP = Math.floor(pokemon.maxHp / 2);
        this.arena.battle._applyHPChange(pokemon, pid, revivedHP, 'revive');
        this.arena._announce(`${pokemon.fullName} has been revived!`);

        if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
            this.arena.multiplayer.sendGameState();
        }
    assignPokemonToPlayer(playerId: string, slotIndex: number, pokemonName: string) {
        const player = this.arena.gs.players.find(p => p.id === playerId);
        if (!player) return;

        const result = this.arena.db.find(pokemonName);
        if (result) {
            player.team[slotIndex] = new Pokemon(result.foundNode, result.baseNode);
            this.arena.renderer.renderAll();
            this.arena._notify(`${player.name}'s Slot ${slotIndex + 1} updated to ${pokemonName}.`, 'system');
            
            if (this.arena.multiplayer && this.arena.multiplayer.mode === 'playing') {
                this.arena.multiplayer.sendGameState();
            }
        }
    }
}
