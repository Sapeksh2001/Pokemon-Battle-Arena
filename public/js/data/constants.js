// ==========================================
// POKÉMON BATTLE ARENA — CONSTANTS
// ==========================================

export const typeChart = {
    Normal: { Rock: 0.5, Ghost: 0, Steel: 0.5 },
    Fighting: { Normal: 2, Flying: 0.5, Poison: 0.5, Rock: 2, Bug: 0.5, Ghost: 0, Steel: 2, Psychic: 0.5, Ice: 2, Dark: 2, Fairy: 0.5 },
    Flying: { Fighting: 2, Rock: 0.5, Bug: 2, Steel: 0.5, Grass: 2, Electric: 0.5 },
    Poison: { Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0, Grass: 2, Fairy: 2 },
    Ground: { Flying: 0, Poison: 2, Rock: 2, Bug: 0.5, Steel: 2, Fire: 2, Grass: 0.5, Electric: 2 },
    Rock: { Fighting: 0.5, Ground: 0.5, Flying: 2, Bug: 2, Steel: 0.5, Fire: 2, Ice: 2 },
    Bug: { Fighting: 0.5, Flying: 0.5, Poison: 0.5, Ghost: 0.5, Steel: 0.5, Fire: 0.5, Grass: 2, Psychic: 2, Dark: 2, Fairy: 0.5 },
    Ghost: { Normal: 0, Ghost: 2, Psychic: 2, Dark: 0.5 },
    Steel: { Rock: 2, Steel: 0.5, Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2, Fairy: 2 },
    Fire: { Rock: 0.5, Bug: 2, Steel: 2, Fire: 0.5, Water: 0.5, Grass: 2, Ice: 2, Dragon: 0.5 },
    Water: { Ground: 2, Rock: 2, Fire: 2, Water: 0.5, Grass: 0.5, Dragon: 0.5 },
    Grass: { Flying: 0.5, Poison: 0.5, Ground: 2, Rock: 2, Bug: 0.5, Steel: 0.5, Fire: 0.5, Water: 2, Grass: 0.5, Dragon: 0.5 },
    Electric: { Flying: 2, Ground: 0, Water: 2, Grass: 0.5, Electric: 0.5, Dragon: 0.5 },
    Psychic: { Fighting: 2, Poison: 2, Steel: 0.5, Psychic: 0.5, Dark: 0 },
    Ice: { Flying: 2, Ground: 2, Steel: 0.5, Fire: 0.5, Water: 0.5, Grass: 2, Ice: 0.5, Dragon: 2 },
    Dragon: { Steel: 0.5, Dragon: 2, Fairy: 0 },
    Dark: { Fighting: 0.5, Ghost: 2, Psychic: 2, Dark: 0.5, Fairy: 0.5 },
    Fairy: { Fighting: 2, Poison: 0.5, Steel: 0.5, Fire: 0.5, Dragon: 2, Dark: 2 }
};

export const typeColors = {
    normal: '#A8A77A', fire: '#EE8130', water: '#6390F0', electric: '#F7D02C',
    grass: '#7AC74C', ice: '#96D9D6', fighting: '#C22E28', poison: '#A33EA1',
    ground: '#E2BF65', flying: '#A98FF3', psychic: '#F95587', bug: '#A6B91A',
    rock: '#B6A136', ghost: '#735797', dragon: '#6F35FC', dark: '#705746',
    steel: '#B7B7CE', fairy: '#D685AD'
};

export const arenaBackgrounds = {
    Normal: [
        'https://raw.githubusercontent.com/Sapeksh2001/Prallax-Window/main/plx-1.png',
        'https://raw.githubusercontent.com/Sapeksh2001/Prallax-Window/main/plx-2.png',
        'https://raw.githubusercontent.com/Sapeksh2001/Prallax-Window/main/plx-3.png',
        'https://raw.githubusercontent.com/Sapeksh2001/Prallax-Window/main/plx-4.png',
        'https://raw.githubusercontent.com/Sapeksh2001/Prallax-Window/main/plx-5.png',
        'https://raw.githubusercontent.com/Sapeksh2001/Prallax-Window/main/ground.png'
    ],
    Fire: Array(6).fill('https://img.freepik.com/premium-vector/pixel-art-landscape-volcano-background_59146-121.jpg?w=1060'),
    Water: Array(6).fill('https://img.freepik.com/premium-vector/pixel-art-underwater-background-with-fish-coral-seaweed-vector-illustration_614533-289.jpg?w=1060')
};
