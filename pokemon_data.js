const MergedPokemonData = {
  Bulbasaur: {
    Name: "Bulbasaur",
    stats: {
      hp: 294, attack: 216, defence: 216, specialAttack: 251, specialDefence: 251, speed: 207
    },
    types: ["Grass Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bulbasaur.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/bulbasaur.mp3",
    evolutions: [
      {
        Name: "Ivysaur",
        stats: {
          hp: 324, attack: 245, defence: 247, specialAttack: 284, specialDefence: 284, speed: 240
        },
        types: ["Grass Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/ivysaur.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/ivysaur.mp3",
        evolutions: [
          {
            Name: "Venusaur",
            stats: {
              hp: 364, attack: 289, defence: 291, specialAttack: 328, specialDefence: 328, speed: 284
            },
            types: ["Grass Poison"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/venusaur.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/venusaur.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 364, attack: 289, defence: 291, specialAttack: 328, specialDefence: 328, speed: 284
                },
                types: ["Grass Poison"],
                sprite: "https://play.pokemonshowdown.com/sprites/gen5/venusaur-gmax.png",
                cry: "https://play.pokemonshowdown.com/audio/cries/venusaur-mega.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              },
              Mega: {
                stats: {
                  hp: 364, attack: 328, defence: 379, specialAttack: 377, specialDefence: 372, speed: 284
                },
                types: ["Grass Poison"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/venusaur-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/venusaur-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Charmander: {
    Name: "Charmander",
    stats: {
      hp: 282, attack: 223, defence: 203, specialAttack: 240, specialDefence: 218, speed: 251
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/charmander.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/charmander.mp3",
    evolutions: [
      {
        Name: "Charmeleon",
        stats: {
          hp: 320, attack: 249, defence: 236, specialAttack: 284, specialDefence: 251, speed: 284
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/charmeleon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/charmeleon.mp3",
        evolutions: [
          {
            Name: "Charizard",
            stats: {
              hp: 360, attack: 293, defence: 280, specialAttack: 348, specialDefence: 295, speed: 328
            },
            types: ["Fire Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/charizard.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/charizard.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 360, attack: 293, defence: 280, specialAttack: 348, specialDefence: 295, speed: 328
                },
                types: ["Fire Flying"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/charizard-gmax.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/charizard-gmax.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              },
              MegaX: {
                Name: "Charizard Mega X",
                stats: {
                  hp: 360, attack: 394, defence: 353, specialAttack: 394, specialDefence: 295, speed: 328
                },
                types: ["Fire Dragon"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/charizard-megax.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/charizard-megax.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              },
              MegaY: {
                Name: "Charizard Mega Y",
                stats: {
                  hp: 360, attack: 337, defence: 280, specialAttack: 458, specialDefence: 361, speed: 328
                },
                types: ["Fire Flying"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/charizard-megay.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/charizard-megay.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Squirtle: {
    Name: "Squirtle",
    stats: {
      hp: 292, attack: 214, defence: 251, specialAttack: 218, specialDefence: 249, speed: 203
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/squirtle.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/squirtle.mp3",
    evolutions: [
      {
        Name: "Wartortle",
        stats: {
          hp: 322, attack: 247, defence: 284, specialAttack: 251, specialDefence: 284, speed: 236
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/wartortle.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/wartortle.mp3",
        evolutions: [
          {
            Name: "Blastoise",
            stats: {
              hp: 362, attack: 291, defence: 328, specialAttack: 295, specialDefence: 339, speed: 280
            },
            types: ["Water"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/blastoise.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/blastoise.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 362, attack: 291, defence: 328, specialAttack: 295, specialDefence: 339, speed: 280
                },
                types: ["Water"],
                sprite: "https://play.pokemonshowdown.com/sprites/gen5/blastoise-gmax.png",
                cry: "https://play.pokemonshowdown.com/audio/cries/blastoise-mega.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              },
              Mega: {
                stats: {
                  hp: 362, attack: 335, defence: 372, specialAttack: 405, specialDefence: 361, speed: 280
                },
                types: ["Water"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/blastoise-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/blastoise-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Caterpie: {
    Name: "Caterpie",
    stats: {
      hp: 294, attack: 174, defence: 185, specialAttack: 152, specialDefence: 152, speed: 207
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/caterpie.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/caterpie.mp3",
    evolutions: [
      {
        Name: "Metapod",
        stats: {
          hp: 304, attack: 152, defence: 229, specialAttack: 163, specialDefence: 163, speed: 174
        },
        types: ["Bug"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/metapod.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/metapod.mp3",
        evolutions: [
          {
            Name: "Butterfree",
            stats: {
              hp: 324, attack: 207, defence: 218, specialAttack: 306, specialDefence: 284, speed: 262
            },
            types: ["Bug Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/butterfree.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/butterfree.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 324, attack: 207, defence: 218, specialAttack: 306, specialDefence: 284, speed: 262
                },
                types: ["Bug Flying"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/butterfree-gmax.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/butterfree-gmax.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Weedle: {
    Name: "Weedle",
    stats: {
      hp: 284, attack: 185, defence: 174, specialAttack: 152, specialDefence: 152, speed: 218
    },
    types: ["Bug Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/weedle.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/weedle.mp3",
    evolutions: [
      {
        Name: "Kakuna",
        stats: {
          hp: 294, attack: 163, defence: 218, specialAttack: 163, specialDefence: 163, speed: 185
        },
        types: ["Bug Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/kakuna.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/kakuna.mp3",
        evolutions: [
          {
            Name: "Beedrill",
            stats: {
              hp: 334, attack: 306, defence: 196, specialAttack: 207, specialDefence: 284, speed: 273
            },
            types: ["Bug Poison"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/beedrill.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/beedrill.mp3",
            evolutions: [],
            forms: {
              Mega: {
                stats: {
                  hp: 334, attack: 438, defence: 196, specialAttack: 141, specialDefence: 284, speed: 427
                },
                types: ["Bug Poison"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/beedrill-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/beedrill-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Pidgey: {
    Name: "Pidgey",
    stats: {
      hp: 284, attack: 207, defence: 196, specialAttack: 185, specialDefence: 185, speed: 232
    },
    types: ["Normal Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pidgey.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pidgey.mp3",
    evolutions: [
      {
        Name: "Pidgeot",
        stats: {
          hp: 370, attack: 284, defence: 273, specialAttack: 262, specialDefence: 262, speed: 331
        },
        types: ["Normal Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/pidgeot.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/pidgeot.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 370, attack: 284, defence: 284, specialAttack: 405, specialDefence: 284, speed: 375
            },
            types: ["Normal Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/pidgeot-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/pidgeot-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          },
          to: {
            Name: "Pidgeotto",
            stats: {
              hp: 330, attack: 240, defence: 229, specialAttack: 218, specialDefence: 218, speed: 265
            },
            types: ["Normal Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/pidgeotto.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/pidgeotto.mp3",
            evolutions: ["Pidgeot"],
            forms: {

            },
            tier: "Mid"
          }
        },
        tier: "Final"
      },
      { Name: "to" }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Rattata: {
    Name: "Rattata",
    stats: {
      hp: 264, attack: 232, defence: 185, specialAttack: 163, specialDefence: 185, speed: 267
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/rattata.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/rattata.mp3",
    evolutions: [
      {
        Name: "Raticate",
        stats: {
          hp: 314, attack: 287, defence: 240, specialAttack: 218, specialDefence: 262, speed: 322
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/raticate.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/raticate.mp3",
        evolutions: [],
        forms: {
          Alola: {
            stats: {
              hp: 314, attack: 287, defence: 240, specialAttack: 218, specialDefence: 262, speed: 322
            },
            types: ["Normal"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Raticate_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Alola: {
            Name: "Raticate Alola",
            stats: {
              hp: 354, attack: 265, defence: 262, specialAttack: 196, specialDefence: 284, speed: 278
            },
            types: ["Dark Normal"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/raticate-alola.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/raticate-alola.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Alola: {
        stats: {
          hp: 264, attack: 232, defence: 185, specialAttack: 163, specialDefence: 185, speed: 267
        },
        types: ["Normal"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Rattata_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Alola: {
        Name: "Rattata Alola",
        stats: {
          hp: 264, attack: 232, defence: 185, specialAttack: 163, specialDefence: 185, speed: 267
        },
        types: ["Dark Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/rattata-alola.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/rattata-alola.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  spearow: {
    Name: "Spearow",
    stats: {
      hp: 284, attack: 240, defence: 174, specialAttack: 177, specialDefence: 177, speed: 262
    },
    types: ["Normal Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/spearow.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/spearow.mp3",
    evolutions: [
      {
        Name: "Fearow",
        stats: {
          hp: 334, attack: 306, defence: 251, specialAttack: 243, specialDefence: 243, speed: 328
        },
        types: ["Normal Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/fearow.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/fearow.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Ekans: {
    Name: "Ekans",
    stats: {
      hp: 274, attack: 240, defence: 205, specialAttack: 196, specialDefence: 227, speed: 229
    },
    types: ["Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/ekans.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/ekans.mp3",
    evolutions: [
      {
        Name: "Arbok",
        stats: {
          hp: 324, attack: 317, defence: 260, specialAttack: 251, specialDefence: 282, speed: 284
        },
        types: ["Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arbok.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arbok.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Sandshrew: {
    Name: "Sandshrew",
    stats: {
      hp: 304, attack: 273, defence: 295, specialAttack: 152, specialDefence: 174, speed: 196
    },
    types: ["Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sandshrew.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sandshrew.mp3",
    evolutions: [
      {
        Name: "Sandslash",
        stats: {
          hp: 354, attack: 328, defence: 350, specialAttack: 207, specialDefence: 229, speed: 251
        },
        types: ["Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sandslash.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sandslash.mp3",
        evolutions: [],
        forms: {
          Alola: {
            stats: {
              hp: 354, attack: 328, defence: 350, specialAttack: 207, specialDefence: 229, speed: 251
            },
            types: ["Ground"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Sandslash_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Alola: {
            Name: "Sandslash Alola",
            stats: {
              hp: 354, attack: 328, defence: 372, specialAttack: 163, specialDefence: 251, speed: 251
            },
            types: ["Ice Steel"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/sandslash-alola.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/sandslash-alola.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Alola: {
        Name: "Sandshrew Alola",
        stats: {
          hp: 304, attack: 273, defence: 306, specialAttack: 130, specialDefence: 185, speed: 196
        },
        types: ["Ice Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sandshrew-alola.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sandshrew-alola.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Nidorina: {
    Name: "Nidorina",
    stats: {
      hp: 344, attack: 245, defence: 256, specialAttack: 229, specialDefence: 229, speed: 232
    },
    types: ["Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/nidorina.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/nidorina.mp3",
    evolutions: [
      {
        Name: "Nidoqueen",
        stats: {
          hp: 384, attack: 311, defence: 300, specialAttack: 273, specialDefence: 295, speed: 276
        },
        types: ["Poison Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/nidoqueen.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/nidoqueen.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Mid"
  },

  Vulpix: {
    Name: "Vulpix",
    stats: {
      hp: 280, attack: 199, defence: 196, specialAttack: 218, specialDefence: 251, speed: 251
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/vulpix.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/vulpix.mp3",
    evolutions: [
      {
        Name: "Ninetales",
        stats: {
          hp: 350, attack: 276, defence: 273, specialAttack: 287, specialDefence: 328, speed: 328
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/ninetales.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/ninetales.mp3",
        evolutions: [],
        forms: {
          Alola: {
            stats: {
              hp: 350, attack: 276, defence: 273, specialAttack: 287, specialDefence: 328, speed: 328
            },
            types: ["Fire"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Ninetales_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Alola: {
            Name: "Ninetales Alola",
            stats: {
              hp: 350, attack: 256, defence: 273, specialAttack: 287, specialDefence: 328, speed: 348
            },
            types: ["Ice Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/ninetales-alola.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/ninetales-alola.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Alola: {
        stats: {
          hp: 280, attack: 199, defence: 196, specialAttack: 218, specialDefence: 251, speed: 251
        },
        types: ["Fire"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Vulpix_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Alola: {
        Name: "Vulpix Alola",
        stats: {
          hp: 280, attack: 199, defence: 196, specialAttack: 218, specialDefence: 251, speed: 251
        },
        types: ["Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/vulpix-alola.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/vulpix-alola.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Zubat: {
    Name: "Zubat",
    stats: {
      hp: 284, attack: 207, defence: 185, specialAttack: 174, specialDefence: 196, speed: 229
    },
    types: ["Poison Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/zubat.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/zubat.mp3",
    evolutions: [
      {
        Name: "Golbat",
        stats: {
          hp: 354, attack: 284, defence: 262, specialAttack: 251, specialDefence: 273, speed: 306
        },
        types: ["Poison Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/golbat.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/golbat.mp3",
        evolutions: [
          {
            Name: "Crobat",
            stats: {
              hp: 374, attack: 306, defence: 284, specialAttack: 262, specialDefence: 284, speed: 394
            },
            types: ["Poison Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/crobat.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/crobat.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Oddish: {
    Name: "Oddish",
    stats: {
      hp: 294, attack: 218, defence: 229, specialAttack: 273, specialDefence: 251, speed: 174
    },
    types: ["Grass Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/oddish.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/oddish.mp3",
    evolutions: [
      {
        Name: "Gloom",
        stats: {
          hp: 324, attack: 251, defence: 262, specialAttack: 295, specialDefence: 273, speed: 196
        },
        types: ["Grass Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/gloom.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/gloom.mp3",
        evolutions: [
          {
            Name: "Vileplume",
            stats: {
              hp: 354, attack: 284, defence: 295, specialAttack: 350, specialDefence: 306, speed: 218
            },
            types: ["Grass Poison"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/vileplume.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/vileplume.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          { Name: "bellossom" }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Venonat: {
    Name: "Venonat",
    stats: {
      hp: 324, attack: 229, defence: 218, specialAttack: 196, specialDefence: 229, speed: 207
    },
    types: ["Bug Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/venonat.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/venonat.mp3",
    evolutions: [
      {
        Name: "Venomoth",
        stats: {
          hp: 344, attack: 251, defence: 240, specialAttack: 306, specialDefence: 273, speed: 306
        },
        types: ["Bug Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/venomoth.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/venomoth.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Diglett: {
    Name: "Diglett",
    stats: {
      hp: 224, attack: 229, defence: 163, specialAttack: 185, specialDefence: 207, speed: 317
    },
    types: ["Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/diglett.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/diglett.mp3",
    evolutions: [
      {
        Name: "Dugtrio",
        stats: {
          hp: 274, attack: 328, defence: 218, specialAttack: 218, specialDefence: 262, speed: 372
        },
        types: ["Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/dugtrio.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/dugtrio.mp3",
        evolutions: [],
        forms: {
          Alola: {
            stats: {
              hp: 274, attack: 328, defence: 218, specialAttack: 218, specialDefence: 262, speed: 372
            },
            types: ["Ground"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Dugtrio_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Alola: {
            Name: "Dugtrio Alola",
            stats: {
              hp: 274, attack: 328, defence: 240, specialAttack: 218, specialDefence: 262, speed: 350
            },
            types: ["Ground Steel"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/dugtrio-alola.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/dugtrio-alola.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Alola: {
        stats: {
          hp: 224, attack: 229, defence: 163, specialAttack: 185, specialDefence: 207, speed: 317
        },
        types: ["Ground"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Diglett_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Alola: {
        Name: "Diglett Alola",
        stats: {
          hp: 224, attack: 229, defence: 174, specialAttack: 185, specialDefence: 207, speed: 306
        },
        types: ["Ground Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/diglett-alola.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/diglett-alola.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Meowth: {
    Name: "Meowth",
    stats: {
      hp: 284, attack: 207, defence: 185, specialAttack: 196, specialDefence: 196, speed: 306
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/meowth.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/meowth.mp3",
    evolutions: [
      {
        Name: "Persian",
        stats: {
          hp: 334, attack: 262, defence: 240, specialAttack: 251, specialDefence: 251, speed: 361
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/persian.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/persian.mp3",
        evolutions: [],
        forms: {
          Alola: {
            stats: {
              hp: 334, attack: 262, defence: 240, specialAttack: 251, specialDefence: 251, speed: 361
            },
            types: ["Normal"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Persian_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Alola: {
            Name: "Persian Alola",
            stats: {
              hp: 334, attack: 240, defence: 240, specialAttack: 273, specialDefence: 251, speed: 361
            },
            types: ["Dark"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/persian-alola.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/persian-alola.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      },
      {
        Name: "Perrserker",
        stats: {
          hp: 344, attack: 350, defence: 328, specialAttack: 218, specialDefence: 240, speed: 218
        },
        types: ["Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/perrserker.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/perrserker.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {
      Gmax: {
        stats: {
          hp: 284, attack: 207, defence: 185, specialAttack: 196, specialDefence: 196, speed: 306
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/meowth-gmax.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/meowth-gmax.mp3",
        tier: "Gmax",
        source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
        isSeparateEntry: false
      },
      Alola: {
        stats: {
          hp: 284, attack: 207, defence: 185, specialAttack: 196, specialDefence: 196, speed: 306
        },
        types: ["Normal"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Meowth_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Galar: {
        stats: {
          hp: 284, attack: 207, defence: 185, specialAttack: 196, specialDefence: 196, speed: 306
        },
        types: ["Normal"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Meowth_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Alola: {
        Name: "Meowth Alola",
        stats: {
          hp: 284, attack: 185, defence: 185, specialAttack: 218, specialDefence: 196, speed: 306
        },
        types: ["Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/meowth-alola.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/meowth-alola.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Galar: {
        Name: "Meowth Galar",
        stats: {
          hp: 304, attack: 251, defence: 229, specialAttack: 196, specialDefence: 196, speed: 196
        },
        types: ["Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/meowth-galar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/meowth-galar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Psyduck: {
    Name: "Psyduck",
    stats: {
      hp: 304, attack: 223, defence: 214, specialAttack: 251, specialDefence: 218, speed: 229
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/psyduck.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/psyduck.mp3",
    evolutions: [
      {
        Name: "Golduck",
        stats: {
          hp: 364, attack: 289, defence: 280, specialAttack: 317, specialDefence: 284, speed: 295
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/golduck.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/golduck.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Mankey: {
    Name: "Mankey",
    stats: {
      hp: 284, attack: 284, defence: 185, specialAttack: 185, specialDefence: 207, speed: 262
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/mankey.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/mankey.mp3",
    evolutions: [
      {
        Name: "Primeape",
        stats: {
          hp: 334, attack: 339, defence: 240, specialAttack: 240, specialDefence: 262, speed: 317
        },
        types: ["Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/primeape.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/primeape.mp3",
        evolutions: [
          {
            Name: "Annihilape",
            stats: {
              hp: 424, attack: 361, defence: 284, specialAttack: 218, specialDefence: 306, speed: 306
            },
            types: ["Fighting Ghost"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/annihilape.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/annihilape.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Growlithe: {
    Name: "Growlithe",
    stats: {
      hp: 314, attack: 262, defence: 207, specialAttack: 262, specialDefence: 218, speed: 240
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/growlithe.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/growlithe.mp3",
    evolutions: [
      {
        Name: "Arcanine",
        stats: {
          hp: 384, attack: 350, defence: 284, specialAttack: 328, specialDefence: 284, speed: 317
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arcanine.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arcanine.mp3",
        evolutions: [],
        forms: {
          Hisui: {
            stats: {
              hp: 384, attack: 350, defence: 284, specialAttack: 328, specialDefence: 284, speed: 317
            },
            types: ["Fire"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Arcanine_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Hisui: {
            Name: "Arcanine Hisui",
            stats: {
              hp: 394, attack: 361, defence: 284, specialAttack: 317, specialDefence: 284, speed: 306
            },
            types: ["Fire Rock"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/arcanine-hisui.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/arcanine-hisui.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Hisui: {
        stats: {
          hp: 314, attack: 262, defence: 207, specialAttack: 262, specialDefence: 218, speed: 240
        },
        types: ["Fire"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Growlithe_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Hisui: {
        Name: "Growlithe Hisui",
        stats: {
          hp: 324, attack: 273, defence: 207, specialAttack: 251, specialDefence: 218, speed: 229
        },
        types: ["Fire Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/growlithe-hisui.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/growlithe-hisui.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Poliwag: {
    Name: "Poliwag",
    stats: {
      hp: 284, attack: 218, defence: 196, specialAttack: 196, specialDefence: 196, speed: 306
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/poliwag.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/poliwag.mp3",
    evolutions: [
      {
        Name: "Poliwhirl",
        stats: {
          hp: 334, attack: 251, defence: 251, specialAttack: 218, specialDefence: 218, speed: 306
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/poliwhirl.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/poliwhirl.mp3",
        evolutions: [
          {
            Name: "Poliwrath",
            stats: {
              hp: 384, attack: 317, defence: 317, specialAttack: 262, specialDefence: 306, speed: 262
            },
            types: ["Water Fighting"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/poliwrath.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/poliwrath.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          { Name: "politoed" }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Abra: {
    Name: "Abra",
    stats: {
      hp: 254, attack: 152, defence: 141, specialAttack: 339, specialDefence: 229, speed: 306
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/abra.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/abra.mp3",
    evolutions: [
      {
        Name: "Kadabra",
        stats: {
          hp: 284, attack: 185, defence: 174, specialAttack: 372, specialDefence: 262, speed: 339
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/kadabra.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/kadabra.mp3",
        evolutions: [
          {
            Name: "Alakazam",
            stats: {
              hp: 314, attack: 218, defence: 207, specialAttack: 405, specialDefence: 317, speed: 372
            },
            types: ["Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/alakazam.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/alakazam.mp3",
            evolutions: [],
            forms: {
              Mega: {
                stats: {
                  hp: 314, attack: 218, defence: 251, specialAttack: 493, specialDefence: 339, speed: 438
                },
                types: ["Psychic"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/alakazam-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/alakazam-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Machop: {
    Name: "Machop",
    stats: {
      hp: 344, attack: 284, defence: 218, specialAttack: 185, specialDefence: 185, speed: 185
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/machop.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/machop.mp3",
    evolutions: [
      {
        Name: "Machoke",
        stats: {
          hp: 364, attack: 328, defence: 262, specialAttack: 218, specialDefence: 240, speed: 207
        },
        types: ["Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/machoke.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/machoke.mp3",
        evolutions: [
          {
            Name: "Machamp",
            stats: {
              hp: 384, attack: 394, defence: 284, specialAttack: 251, specialDefence: 295, speed: 229
            },
            types: ["Fighting"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/machamp.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/machamp.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 384, attack: 394, defence: 284, specialAttack: 251, specialDefence: 295, speed: 229
                },
                types: ["Fighting"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/machamp-gmax.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/machamp-gmax.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Bellsprout: {
    Name: "Bellsprout",
    stats: {
      hp: 304, attack: 273, defence: 185, specialAttack: 262, specialDefence: 174, speed: 196
    },
    types: ["Grass Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bellsprout.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/bellsprout.mp3",
    evolutions: [
      {
        Name: "Weepinbell",
        stats: {
          hp: 334, attack: 306, defence: 218, specialAttack: 295, specialDefence: 207, speed: 229
        },
        types: ["Grass Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/weepinbell.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/weepinbell.mp3",
        evolutions: [
          {
            Name: "Victreebel",
            stats: {
              hp: 364, attack: 339, defence: 251, specialAttack: 328, specialDefence: 262, speed: 262
            },
            types: ["Grass Poison"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/victreebel.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/victreebel.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Tentacool: {
    Name: "Tentacool",
    stats: {
      hp: 284, attack: 196, defence: 185, specialAttack: 218, specialDefence: 328, speed: 262
    },
    types: ["Water Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tentacool.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tentacool.mp3",
    evolutions: [
      {
        Name: "Tentacruel",
        stats: {
          hp: 364, attack: 262, defence: 251, specialAttack: 284, specialDefence: 372, speed: 328
        },
        types: ["Water Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/tentacruel.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/tentacruel.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Geodude: {
    Name: "Geodude",
    stats: {
      hp: 284, attack: 284, defence: 328, specialAttack: 174, specialDefence: 174, speed: 152
    },
    types: ["Rock Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/geodude.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/geodude.mp3",
    evolutions: [
      {
        Name: "Graveler",
        stats: {
          hp: 314, attack: 317, defence: 361, specialAttack: 207, specialDefence: 207, speed: 185
        },
        types: ["Rock Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/graveler.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/graveler.mp3",
        evolutions: [
          {
            Name: "Golem",
            stats: {
              hp: 364, attack: 372, defence: 394, specialAttack: 229, specialDefence: 251, speed: 207
            },
            types: ["Rock Ground"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/golem.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/golem.mp3",
            evolutions: [],
            forms: {
              Alola: {
                stats: {
                  hp: 364, attack: 372, defence: 394, specialAttack: 229, specialDefence: 251, speed: 207
                },
                types: ["Rock Ground"],
                sprite: "",
                cry: "",
                tier: "Final",
                source: "https://bulbapedia.bulbagarden.net/wiki/Golem_%28Pok%C3%A9mon%29",
                isSeparateEntry: false
              },
              Alola: {
                Name: "Golem Alola",
                stats: {
                  hp: 364, attack: 372, defence: 394, specialAttack: 229, specialDefence: 251, speed: 207
                },
                types: ["Rock Electric"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/golem-alola.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/golem-alola.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              }
            },
            tier: "Final"
          }
        ],
        forms: {
          Alola: {
            stats: {
              hp: 314, attack: 317, defence: 361, specialAttack: 207, specialDefence: 207, speed: 185
            },
            types: ["Rock Ground"],
            sprite: "",
            cry: "",
            tier: "Mid",
            source: "https://bulbapedia.bulbagarden.net/wiki/Graveler_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Alola: {
            Name: "Graveler Alola",
            stats: {
              hp: 314, attack: 317, defence: 361, specialAttack: 207, specialDefence: 207, speed: 185
            },
            types: ["Rock Electric"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/graveler-alola.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/graveler-alola.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Mid"
      }
    ],
    forms: {
      Alola: {
        stats: {
          hp: 284, attack: 284, defence: 328, specialAttack: 174, specialDefence: 174, speed: 152
        },
        types: ["Rock Ground"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Geodude_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Alola: {
        Name: "Geodude Alola",
        stats: {
          hp: 284, attack: 284, defence: 328, specialAttack: 174, specialDefence: 174, speed: 152
        },
        types: ["Rock Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/geodude-alola.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/geodude-alola.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Ponyta: {
    Name: "Ponyta",
    stats: {
      hp: 304, attack: 295, defence: 229, specialAttack: 251, specialDefence: 251, speed: 306
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/ponyta.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/ponyta.mp3",
    evolutions: [
      {
        Name: "Rapidash",
        stats: {
          hp: 334, attack: 328, defence: 262, specialAttack: 284, specialDefence: 284, speed: 339
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/rapidash.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/rapidash.mp3",
        evolutions: [],
        forms: {
          Galar: {
            stats: {
              hp: 334, attack: 328, defence: 262, specialAttack: 284, specialDefence: 284, speed: 339
            },
            types: ["Fire"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Rapidash_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Galar: {
            Name: "Rapidash Galar",
            stats: {
              hp: 334, attack: 328, defence: 262, specialAttack: 284, specialDefence: 284, speed: 339
            },
            types: ["Psychic Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/rapidash-galar.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/rapidash-galar.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Galar: {
        stats: {
          hp: 304, attack: 295, defence: 229, specialAttack: 251, specialDefence: 251, speed: 306
        },
        types: ["Fire"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Ponyta_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Galar: {
        Name: "Ponyta Galar",
        stats: {
          hp: 304, attack: 295, defence: 229, specialAttack: 251, specialDefence: 251, speed: 306
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/ponyta-galar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/ponyta-galar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Slowpoke: {
    Name: "Slowpoke",
    stats: {
      hp: 384, attack: 251, defence: 251, specialAttack: 196, specialDefence: 196, speed: 141
    },
    types: ["Water Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/slowpoke.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/slowpoke.mp3",
    evolutions: [
      {
        Name: "Slowbro",
        stats: {
          hp: 394, attack: 273, defence: 350, specialAttack: 328, specialDefence: 284, speed: 174
        },
        types: ["Water Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/slowbro.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/slowbro.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 394, attack: 273, defence: 504, specialAttack: 394, specialDefence: 284, speed: 174
            },
            types: ["Water Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/slowbro-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/slowbro-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          },
          Galar: {
            stats: {
              hp: 394, attack: 273, defence: 350, specialAttack: 328, specialDefence: 284, speed: 174
            },
            types: ["Water Psychic"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Slowbro_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Galar: {
            Name: "Slowbro Galar",
            stats: {
              hp: 394, attack: 328, defence: 317, specialAttack: 328, specialDefence: 262, speed: 174
            },
            types: ["Poison Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/slowbro-galar.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/slowbro-galar.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      },
      {
        Name: "Slowking",
        stats: {
          hp: 394, attack: 273, defence: 284, specialAttack: 328, specialDefence: 350, speed: 174
        },
        types: ["Water Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/slowking.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/slowking.mp3",
        evolutions: [],
        forms: {
          Galar: {
            stats: {
              hp: 394, attack: 273, defence: 284, specialAttack: 328, specialDefence: 350, speed: 174
            },
            types: ["Water Psychic"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Slowking_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Galar: {
            Name: "Slowking Galar",
            stats: {
              hp: 394, attack: 251, defence: 284, specialAttack: 350, specialDefence: 350, speed: 174
            },
            types: ["Poison Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/slowking-galar.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/slowking-galar.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Galar: {
        stats: {
          hp: 384, attack: 251, defence: 251, specialAttack: 196, specialDefence: 196, speed: 141
        },
        types: ["Water Psychic"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Slowpoke_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Galar: {
        Name: "Slowpoke Galar",
        stats: {
          hp: 384, attack: 251, defence: 251, specialAttack: 196, specialDefence: 196, speed: 141
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/slowpoke-galar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/slowpoke-galar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Magnemite: {
    Name: "Magnemite",
    stats: {
      hp: 254, attack: 185, defence: 262, specialAttack: 317, specialDefence: 229, speed: 207
    },
    types: ["Electric Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/magnemite.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/magnemite.mp3",
    evolutions: [
      {
        Name: "Magneton",
        stats: {
          hp: 304, attack: 240, defence: 317, specialAttack: 372, specialDefence: 262, speed: 262
        },
        types: ["Electric Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/magneton.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/magneton.mp3",
        evolutions: [
          {
            Name: "Magnezone",
            stats: {
              hp: 344, attack: 262, defence: 361, specialAttack: 394, specialDefence: 306, speed: 240
            },
            types: ["Electric Steel"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/magnezone.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/magnezone.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  FarfetchD: {
    Name: "Farfetch\u2019D",
    stats: {
      hp: 308, attack: 306, defence: 229, specialAttack: 236, specialDefence: 245, speed: 240
    },
    types: ["Normal Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/farfetchd.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/farfetchd.mp3",
    evolutions: [
      {
        Name: "Sirfetch\u2019D",
        stats: {
          hp: 328, attack: 405, defence: 317, specialAttack: 258, specialDefence: 289, speed: 251
        },
        types: ["Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sirfetchd.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sirfetchd.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {
      Galar: {
        stats: {
          hp: 308, attack: 306, defence: 229, specialAttack: 236, specialDefence: 245, speed: 240
        },
        types: ["Normal Flying"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Farfetch%E2%80%99D_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Galar: {
        Name: "Farfetch\u2019D Galar",
        stats: {
          hp: 308, attack: 317, defence: 229, specialAttack: 236, specialDefence: 245, speed: 229
        },
        types: ["Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/farfetchd-galar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/farfetchd-galar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Doduo: {
    Name: "Doduo",
    stats: {
      hp: 274, attack: 295, defence: 207, specialAttack: 185, specialDefence: 185, speed: 273
    },
    types: ["Normal Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/doduo.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/doduo.mp3",
    evolutions: [
      {
        Name: "Dodrio",
        stats: {
          hp: 324, attack: 350, defence: 262, specialAttack: 240, specialDefence: 240, speed: 350
        },
        types: ["Normal Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/dodrio.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/dodrio.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Seel: {
    Name: "Seel",
    stats: {
      hp: 334, attack: 207, defence: 229, specialAttack: 207, specialDefence: 262, speed: 207
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/seel.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/seel.mp3",
    evolutions: [
      {
        Name: "Dewgong",
        stats: {
          hp: 384, attack: 262, defence: 284, specialAttack: 262, specialDefence: 317, speed: 262
        },
        types: ["Water Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/dewgong.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/dewgong.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Grimer: {
    Name: "Grimer",
    stats: {
      hp: 364, attack: 284, defence: 218, specialAttack: 196, specialDefence: 218, speed: 163
    },
    types: ["Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/grimer.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/grimer.mp3",
    evolutions: [
      {
        Name: "Muk",
        stats: {
          hp: 414, attack: 339, defence: 273, specialAttack: 251, specialDefence: 328, speed: 218
        },
        types: ["Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/muk.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/muk.mp3",
        evolutions: [],
        forms: {
          Alola: {
            stats: {
              hp: 414, attack: 339, defence: 273, specialAttack: 251, specialDefence: 328, speed: 218
            },
            types: ["Poison"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Muk_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Alola: {
            Name: "Muk Alola",
            stats: {
              hp: 414, attack: 339, defence: 273, specialAttack: 251, specialDefence: 328, speed: 218
            },
            types: ["Poison Dark"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/muk-alola.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/muk-alola.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Alola: {
        stats: {
          hp: 364, attack: 284, defence: 218, specialAttack: 196, specialDefence: 218, speed: 163
        },
        types: ["Poison"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Grimer_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Alola: {
        Name: "Grimer Alola",
        stats: {
          hp: 364, attack: 284, defence: 218, specialAttack: 196, specialDefence: 218, speed: 163
        },
        types: ["Poison Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/grimer-alola.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/grimer-alola.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Shellder: {
    Name: "Shellder",
    stats: {
      hp: 264, attack: 251, defence: 328, specialAttack: 207, specialDefence: 163, speed: 196
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/shellder.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/shellder.mp3",
    evolutions: [
      {
        Name: "Cloyster",
        stats: {
          hp: 304, attack: 317, defence: 504, specialAttack: 295, specialDefence: 207, speed: 262
        },
        types: ["Water Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/cloyster.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/cloyster.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Gastly: {
    Name: "Gastly",
    stats: {
      hp: 264, attack: 185, defence: 174, specialAttack: 328, specialDefence: 185, speed: 284
    },
    types: ["Ghost Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/gastly.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/gastly.mp3",
    evolutions: [
      {
        Name: "Haunter",
        stats: {
          hp: 294, attack: 218, defence: 207, specialAttack: 361, specialDefence: 229, speed: 317
        },
        types: ["Ghost Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/haunter.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/haunter.mp3",
        evolutions: [
          {
            Name: "Gengar",
            stats: {
              hp: 324, attack: 251, defence: 240, specialAttack: 394, specialDefence: 273, speed: 350
            },
            types: ["Ghost Poison"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/gengar.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/gengar.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 324, attack: 251, defence: 240, specialAttack: 394, specialDefence: 273, speed: 350
                },
                types: ["Ghost Poison"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/gengar-gmax.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/gengar-gmax.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              },
              Mega: {
                stats: {
                  hp: 324, attack: 251, defence: 284, specialAttack: 482, specialDefence: 317, speed: 394
                },
                types: ["Ghost Poison"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/gengar-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/gengar-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Onix: {
    Name: "Onix",
    stats: {
      hp: 274, attack: 207, defence: 460, specialAttack: 174, specialDefence: 207, speed: 262
    },
    types: ["Rock Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/onix.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/onix.mp3",
    evolutions: [
      {
        Name: "Steelix",
        stats: {
          hp: 354, attack: 295, defence: 548, specialAttack: 229, specialDefence: 251, speed: 174
        },
        types: ["Steel Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/steelix.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/steelix.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 354, attack: 383, defence: 614, specialAttack: 229, specialDefence: 317, speed: 174
            },
            types: ["Steel Ground"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/steelix-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/steelix-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Drowzee: {
    Name: "Drowzee",
    stats: {
      hp: 324, attack: 214, defence: 207, specialAttack: 203, specialDefence: 306, speed: 201
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/drowzee.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/drowzee.mp3",
    evolutions: [
      {
        Name: "Hypno",
        stats: {
          hp: 374, attack: 269, defence: 262, specialAttack: 269, specialDefence: 361, speed: 256
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/hypno.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/hypno.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Krabby: {
    Name: "Krabby",
    stats: {
      hp: 264, attack: 339, defence: 306, specialAttack: 163, specialDefence: 163, speed: 218
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/krabby.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/krabby.mp3",
    evolutions: [
      {
        Name: "Kingler",
        stats: {
          hp: 314, attack: 394, defence: 361, specialAttack: 218, specialDefence: 218, speed: 273
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/kingler.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/kingler.mp3",
        evolutions: [],
        forms: {
          Gmax: {
            stats: {
              hp: 314, attack: 394, defence: 361, specialAttack: 218, specialDefence: 218, speed: 273
            },
            types: ["Water"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/kingler-gmax.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/kingler-gmax.mp3",
            tier: "Gmax",
            source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Voltorb: {
    Name: "Voltorb",
    stats: {
      hp: 284, attack: 174, defence: 218, specialAttack: 229, specialDefence: 229, speed: 328
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/voltorb.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/voltorb.mp3",
    evolutions: [
      {
        Name: "Electrode",
        stats: {
          hp: 324, attack: 218, defence: 262, specialAttack: 284, specialDefence: 284, speed: 438
        },
        types: ["Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/electrode.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/electrode.mp3",
        evolutions: [],
        forms: {
          Hisui: {
            stats: {
              hp: 324, attack: 218, defence: 262, specialAttack: 284, specialDefence: 284, speed: 438
            },
            types: ["Electric"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Electrode_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Hisui: {
            Name: "Electrode Hisui",
            stats: {
              hp: 324, attack: 218, defence: 262, specialAttack: 284, specialDefence: 284, speed: 438
            },
            types: ["Electric Grass"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/electrode-hisui.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/electrode-hisui.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Hisui: {
        stats: {
          hp: 284, attack: 174, defence: 218, specialAttack: 229, specialDefence: 229, speed: 328
        },
        types: ["Electric"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Voltorb_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Hisui: {
        Name: "Voltorb Hisui",
        stats: {
          hp: 284, attack: 174, defence: 218, specialAttack: 229, specialDefence: 229, speed: 328
        },
        types: ["Electric Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/voltorb-hisui.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/voltorb-hisui.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Exeggcute: {
    Name: "Exeggcute",
    stats: {
      hp: 324, attack: 196, defence: 284, specialAttack: 240, specialDefence: 207, speed: 196
    },
    types: ["Grass Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/exeggcute.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/exeggcute.mp3",
    evolutions: [
      {
        Name: "Exeggutor",
        stats: {
          hp: 394, attack: 317, defence: 295, specialAttack: 383, specialDefence: 273, speed: 229
        },
        types: ["Grass Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/exeggutor.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/exeggutor.mp3",
        evolutions: [],
        forms: {
          Alola: {
            stats: {
              hp: 394, attack: 317, defence: 295, specialAttack: 383, specialDefence: 273, speed: 229
            },
            types: ["Grass Psychic"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Exeggutor_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Alola: {
            Name: "Exeggutor Alola",
            stats: {
              hp: 394, attack: 339, defence: 295, specialAttack: 383, specialDefence: 273, speed: 207
            },
            types: ["Grass Dragon"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/exeggutor-alola.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/exeggutor-alola.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Cubone: {
    Name: "Cubone",
    stats: {
      hp: 304, attack: 218, defence: 317, specialAttack: 196, specialDefence: 218, speed: 185
    },
    types: ["Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cubone.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cubone.mp3",
    evolutions: [
      {
        Name: "Marowak",
        stats: {
          hp: 324, attack: 284, defence: 350, specialAttack: 218, specialDefence: 284, speed: 207
        },
        types: ["Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/marowak.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/marowak.mp3",
        evolutions: [],
        forms: {
          Alola: {
            stats: {
              hp: 324, attack: 284, defence: 350, specialAttack: 218, specialDefence: 284, speed: 207
            },
            types: ["Ground"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Marowak_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Alola: {
            Name: "Marowak Alola",
            stats: {
              hp: 324, attack: 284, defence: 350, specialAttack: 218, specialDefence: 284, speed: 207
            },
            types: ["Fire Ghost"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/marowak-alola.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/marowak-alola.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Lickitung: {
    Name: "Lickitung",
    stats: {
      hp: 384, attack: 229, defence: 273, specialAttack: 240, specialDefence: 273, speed: 174
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/lickitung.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/lickitung.mp3",
    evolutions: [
      {
        Name: "Lickilicky",
        stats: {
          hp: 424, attack: 295, defence: 317, specialAttack: 284, specialDefence: 317, speed: 218
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/lickilicky.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/lickilicky.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Koffing: {
    Name: "Koffing",
    stats: {
      hp: 284, attack: 251, defence: 317, specialAttack: 240, specialDefence: 207, speed: 185
    },
    types: ["Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/koffing.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/koffing.mp3",
    evolutions: [
      {
        Name: "Weezing",
        stats: {
          hp: 334, attack: 306, defence: 372, specialAttack: 295, specialDefence: 262, speed: 240
        },
        types: ["Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/weezing.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/weezing.mp3",
        evolutions: [],
        forms: {
          Galar: {
            stats: {
              hp: 334, attack: 306, defence: 372, specialAttack: 295, specialDefence: 262, speed: 240
            },
            types: ["Poison"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Weezing_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Galar: {
            Name: "Weezing Galar",
            stats: {
              hp: 334, attack: 306, defence: 372, specialAttack: 295, specialDefence: 262, speed: 240
            },
            types: ["Poison Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/weezing-galar.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/weezing-galar.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Rhyhorn: {
    Name: "Rhyhorn",
    stats: {
      hp: 364, attack: 295, defence: 317, specialAttack: 174, specialDefence: 174, speed: 163
    },
    types: ["Ground Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/rhyhorn.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/rhyhorn.mp3",
    evolutions: [
      {
        Name: "Rhydon",
        stats: {
          hp: 414, attack: 394, defence: 372, specialAttack: 207, specialDefence: 207, speed: 196
        },
        types: ["Ground Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/rhydon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/rhydon.mp3",
        evolutions: [
          {
            Name: "Rhyperior",
            stats: {
              hp: 434, attack: 416, defence: 394, specialAttack: 229, specialDefence: 229, speed: 196
            },
            types: ["Ground Rock"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/rhyperior.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/rhyperior.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Tangela: {
    Name: "Tangela",
    stats: {
      hp: 334, attack: 229, defence: 361, specialAttack: 328, specialDefence: 196, speed: 240
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tangela.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tangela.mp3",
    evolutions: [
      {
        Name: "Tangrowth",
        stats: {
          hp: 404, attack: 328, defence: 383, specialAttack: 350, specialDefence: 218, speed: 218
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/tangrowth.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/tangrowth.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Kangaskhan: {
    Name: "Kangaskhan",
    stats: {
      hp: 414, attack: 317, defence: 284, specialAttack: 196, specialDefence: 284, speed: 306
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/kangaskhan.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/kangaskhan.mp3",
    evolutions: [],
    forms: {
      Mega: {
        stats: {
          hp: 414, attack: 383, defence: 328, specialAttack: 240, specialDefence: 328, speed: 328
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/kangaskhan-mega.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/kangaskhan-mega.mp3",
        tier: "Mega",
        source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
        isSeparateEntry: false
      }
    },
    tier: "Final"
  },

  Horsea: {
    Name: "Horsea",
    stats: {
      hp: 264, attack: 196, defence: 262, specialAttack: 262, specialDefence: 163, speed: 240
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/horsea.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/horsea.mp3",
    evolutions: [
      {
        Name: "Seadra",
        stats: {
          hp: 314, attack: 251, defence: 317, specialAttack: 317, specialDefence: 207, speed: 295
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/seadra.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/seadra.mp3",
        evolutions: [
          {
            Name: "Kingdra",
            stats: {
              hp: 354, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 295
            },
            types: ["Water Dragon"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/kingdra.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/kingdra.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Goldeen: {
    Name: "Goldeen",
    stats: {
      hp: 294, attack: 256, defence: 240, specialAttack: 185, specialDefence: 218, speed: 247
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/goldeen.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/goldeen.mp3",
    evolutions: [
      {
        Name: "Seaking",
        stats: {
          hp: 364, attack: 311, defence: 251, specialAttack: 251, specialDefence: 284, speed: 258
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/seaking.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/seaking.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Staryu: {
    Name: "Staryu",
    stats: {
      hp: 264, attack: 207, defence: 229, specialAttack: 262, specialDefence: 229, speed: 295
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/staryu.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/staryu.mp3",
    evolutions: [
      {
        Name: "Starmie",
        stats: {
          hp: 324, attack: 273, defence: 295, specialAttack: 328, specialDefence: 295, speed: 361
        },
        types: ["Water Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/starmie.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/starmie.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Scyther: {
    Name: "Scyther",
    stats: {
      hp: 344, attack: 350, defence: 284, specialAttack: 229, specialDefence: 284, speed: 339
    },
    types: ["Bug Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/scyther.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/scyther.mp3",
    evolutions: [
      {
        Name: "Scizor",
        stats: {
          hp: 344, attack: 394, defence: 328, specialAttack: 229, specialDefence: 284, speed: 251
        },
        types: ["Bug Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/scizor.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/scizor.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 344, attack: 438, defence: 416, specialAttack: 251, specialDefence: 328, speed: 273
            },
            types: ["Bug Steel"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/scizor-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/scizor-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      },
      {
        Name: "Kleavor",
        stats: {
          hp: 344, attack: 405, defence: 317, specialAttack: 207, specialDefence: 262, speed: 295
        },
        types: ["Bug Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/kleavor.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/kleavor.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Pinsir: {
    Name: "Pinsir",
    stats: {
      hp: 334, attack: 383, defence: 328, specialAttack: 229, specialDefence: 262, speed: 295
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pinsir.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pinsir.mp3",
    evolutions: [],
    forms: {
      Mega: {
        stats: {
          hp: 334, attack: 449, defence: 372, specialAttack: 251, specialDefence: 306, speed: 339
        },
        types: ["Bug Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/pinsir-mega.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/pinsir-mega.mp3",
        tier: "Mega",
        source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
        isSeparateEntry: false
      }
    },
    tier: "Final"
  },

  Tauros: {
    Name: "Tauros",
    stats: {
      hp: 354, attack: 328, defence: 317, specialAttack: 196, specialDefence: 262, speed: 350
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tauros.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tauros.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  TaurspatkldeaAqua: {
    Name: "Tauros Paldea Aqua",
    stats: {
      hp: 354, attack: 350, defence: 339, specialAttack: 174, specialDefence: 262, speed: 328
    },
    types: ["Fighting Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tauros-paldeaaqua.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tauros.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  TaurspatkldeaBlaze: {
    Name: "Tauros Paldea Blaze",
    stats: {
      hp: 354, attack: 350, defence: 339, specialAttack: 174, specialDefence: 262, speed: 328
    },
    types: ["Fighting Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tauros-paldeablaze.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tauros.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  TaurspatkldeaCombat: {
    Name: "Tauros Paldea Combat",
    stats: {
      hp: 354, attack: 350, defence: 339, specialAttack: 174, specialDefence: 262, speed: 328
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tauros-paldeacombat.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tauros.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Magikarp: {
    Name: "Magikarp",
    stats: {
      hp: 244, attack: 130, defence: 229, specialAttack: 141, specialDefence: 152, speed: 284
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/magikarp.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/magikarp.mp3",
    evolutions: [
      {
        Name: "Gyarados",
        stats: {
          hp: 394, attack: 383, defence: 282, specialAttack: 240, specialDefence: 328, speed: 287
        },
        types: ["Water Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/gyarados.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/gyarados.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 394, attack: 449, defence: 348, specialAttack: 262, specialDefence: 394, speed: 287
            },
            types: ["Water Dark"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/gyarados-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/gyarados-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Lapras: {
    Name: "Lapras",
    stats: {
      hp: 464, attack: 295, defence: 284, specialAttack: 295, specialDefence: 317, speed: 240
    },
    types: ["Water Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/lapras.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/lapras.mp3",
    evolutions: [],
    forms: {
      Gmax: {
        stats: {
          hp: 464, attack: 295, defence: 284, specialAttack: 295, specialDefence: 317, speed: 240
        },
        types: ["Water Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/lapras-gmax.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/lapras-gmax.mp3",
        tier: "Gmax",
        source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
        isSeparateEntry: false
      }
    },
    tier: "Final"
  },

  Ditto: {
    Name: "Ditto",
    stats: {
      hp: 300, attack: 214, defence: 214, specialAttack: 214, specialDefence: 214, speed: 214
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/ditto.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/ditto.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Eevee: {
    Name: "Eevee",
    stats: {
      hp: 314, attack: 229, defence: 218, specialAttack: 207, specialDefence: 251, speed: 229
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/eevee.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/eevee.mp3",
    evolutions: [
      {
        Name: "Vaporeon",
        stats: {
          hp: 464, attack: 251, defence: 240, specialAttack: 350, specialDefence: 317, speed: 251
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/vaporeon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/vaporeon.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      {
        Name: "Jolteon",
        stats: {
          hp: 334, attack: 251, defence: 240, specialAttack: 350, specialDefence: 317, speed: 394
        },
        types: ["Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/jolteon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/jolteon.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      {
        Name: "Flareon",
        stats: {
          hp: 334, attack: 394, defence: 240, specialAttack: 317, specialDefence: 350, speed: 251
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/flareon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/flareon.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      {
        Name: "Espeon",
        stats: {
          hp: 334, attack: 251, defence: 240, specialAttack: 394, specialDefence: 317, speed: 350
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/espeon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/espeon.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      {
        Name: "Umbreon",
        stats: {
          hp: 394, attack: 251, defence: 350, specialAttack: 240, specialDefence: 394, speed: 251
        },
        types: ["Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/umbreon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/umbreon.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      {
        Name: "Leafeon",
        stats: {
          hp: 334, attack: 350, defence: 394, specialAttack: 240, specialDefence: 251, speed: 317
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/leafeon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/leafeon.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      {
        Name: "Glaceon",
        stats: {
          hp: 334, attack: 240, defence: 350, specialAttack: 394, specialDefence: 317, speed: 251
        },
        types: ["Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/glaceon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/glaceon.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      {
        Name: "Sylveon",
        stats: {
          hp: 394, attack: 251, defence: 251, specialAttack: 350, specialDefence: 394, speed: 240
        },
        types: ["Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sylveon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sylveon.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {
      Gmax: {
        stats: {
          hp: 314, attack: 229, defence: 218, specialAttack: 207, specialDefence: 251, speed: 229
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/eevee-gmax.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/eevee-gmax.mp3",
        tier: "Gmax",
        source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
        isSeparateEntry: false
      },
      Starter: {
        Name: "Eevee Starter",
        stats: {
          hp: 334, attack: 273, defence: 262, specialAttack: 251, specialDefence: 295, speed: 273
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/eevee-starter.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/eevee-starter.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Omanyte: {
    Name: "Omanyte",
    stats: {
      hp: 274, attack: 196, defence: 328, specialAttack: 306, specialDefence: 229, speed: 185
    },
    types: ["Rock Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/omanyte.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/omanyte.mp3",
    evolutions: [
      {
        Name: "Omastar",
        stats: {
          hp: 344, attack: 240, defence: 383, specialAttack: 361, specialDefence: 262, speed: 229
        },
        types: ["Rock Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/omastar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/omastar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Aerodactyl: {
    Name: "Aerodactyl",
    stats: {
      hp: 364, attack: 339, defence: 251, specialAttack: 240, specialDefence: 273, speed: 394
    },
    types: ["Rock Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/aerodactyl.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/aerodactyl.mp3",
    evolutions: [],
    forms: {
      Mega: {
        stats: {
          hp: 364, attack: 405, defence: 295, specialAttack: 262, specialDefence: 317, speed: 438
        },
        types: ["Rock Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/aerodactyl-mega.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/aerodactyl-mega.mp3",
        tier: "Mega",
        source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
        isSeparateEntry: false
      }
    },
    tier: "Final"
  },

  Articuno: {
    Name: "Articuno",
    stats: {
      hp: 384, attack: 295, defence: 328, specialAttack: 317, specialDefence: 383, speed: 295
    },
    types: ["Ice Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/articuno.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/articuno.mp3",
    evolutions: [],
    forms: {
      Galar: {
        stats: {
          hp: 384, attack: 295, defence: 328, specialAttack: 317, specialDefence: 383, speed: 295
        },
        types: ["Ice Flying"],
        sprite: "",
        cry: "",
        tier: "Legendary",
        source: "https://bulbapedia.bulbagarden.net/wiki/Articuno_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Galar: {
        Name: "Articuno Galar",
        stats: {
          hp: 384, attack: 295, defence: 295, specialAttack: 383, specialDefence: 328, speed: 317
        },
        types: ["Psychic Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/articuno-galar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/articuno-galar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Zapdos: {
    Name: "Zapdos",
    stats: {
      hp: 384, attack: 306, defence: 295, specialAttack: 383, specialDefence: 306, speed: 328
    },
    types: ["Electric Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/zapdos.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/zapdos.mp3",
    evolutions: [],
    forms: {
      Galar: {
        stats: {
          hp: 384, attack: 306, defence: 295, specialAttack: 383, specialDefence: 306, speed: 328
        },
        types: ["Electric Flying"],
        sprite: "",
        cry: "",
        tier: "Legendary",
        source: "https://bulbapedia.bulbagarden.net/wiki/Zapdos_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Galar: {
        Name: "Zapdos Galar",
        stats: {
          hp: 384, attack: 383, defence: 306, specialAttack: 295, specialDefence: 306, speed: 328
        },
        types: ["Fighting Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/zapdos-galar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/zapdos-galar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Moltres: {
    Name: "Moltres",
    stats: {
      hp: 384, attack: 328, defence: 306, specialAttack: 383, specialDefence: 295, speed: 306
    },
    types: ["Fire Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/moltres.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/moltres.mp3",
    evolutions: [],
    forms: {
      Galar: {
        stats: {
          hp: 384, attack: 328, defence: 306, specialAttack: 383, specialDefence: 295, speed: 306
        },
        types: ["Fire Flying"],
        sprite: "",
        cry: "",
        tier: "Legendary",
        source: "https://bulbapedia.bulbagarden.net/wiki/Moltres_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Galar: {
        Name: "Moltres Galar",
        stats: {
          hp: 384, attack: 295, defence: 306, specialAttack: 328, specialDefence: 383, speed: 306
        },
        types: ["Dark Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/moltres-galar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/moltres-galar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Dratini: {
    Name: "Dratini",
    stats: {
      hp: 286, attack: 249, defence: 207, specialAttack: 218, specialDefence: 218, speed: 218
    },
    types: ["Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/dratini.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/dratini.mp3",
    evolutions: [
      {
        Name: "Dragonair",
        stats: {
          hp: 326, attack: 293, defence: 251, specialAttack: 262, specialDefence: 262, speed: 262
        },
        types: ["Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/dragonair.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/dragonair.mp3",
        evolutions: [
          {
            Name: "Dragonite",
            stats: {
              hp: 386, attack: 403, defence: 317, specialAttack: 328, specialDefence: 328, speed: 284
            },
            types: ["Dragon Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/dragonite.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/dragonite.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Mew: {
    Name: "Mew",
    stats: {
      hp: 404, attack: 328, defence: 328, specialAttack: 328, specialDefence: 328, speed: 328
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/mew.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/mew.mp3",
    evolutions: [],
    forms: {
      two: {
        Name: "Mewtwo",
        stats: {
          hp: 416, attack: 350, defence: 306, specialAttack: 447, specialDefence: 306, speed: 394
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/mewtwo.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/mewtwo.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Legendary"
      }
    },
    tier: "Mythical"
  },

  Chikorita: {
    Name: "Chikorita",
    stats: {
      hp: 294, attack: 216, defence: 251, specialAttack: 216, specialDefence: 251, speed: 207
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/chikorita.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/chikorita.mp3",
    evolutions: [
      {
        Name: "Bayleef",
        stats: {
          hp: 324, attack: 245, defence: 284, specialAttack: 247, specialDefence: 284, speed: 240
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/bayleef.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/bayleef.mp3",
        evolutions: [
          {
            Name: "Meganium",
            stats: {
              hp: 364, attack: 289, defence: 328, specialAttack: 291, specialDefence: 328, speed: 284
            },
            types: ["Grass"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/meganium.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/meganium.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Cyndaquil: {
    Name: "Cyndaquil",
    stats: {
      hp: 282, attack: 223, defence: 203, specialAttack: 240, specialDefence: 218, speed: 251
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cyndaquil.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cyndaquil.mp3",
    evolutions: [
      {
        Name: "Quilava",
        stats: {
          hp: 320, attack: 249, defence: 236, specialAttack: 284, specialDefence: 251, speed: 284
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/quilava.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/quilava.mp3",
        evolutions: [
          {
            Name: "Typhlosion",
            stats: {
              hp: 360, attack: 293, defence: 280, specialAttack: 348, specialDefence: 295, speed: 328
            },
            types: ["Fire"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/typhlosion.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/typhlosion.mp3",
            evolutions: [],
            forms: {
              Hisui: {
                stats: {
                  hp: 360, attack: 293, defence: 280, specialAttack: 348, specialDefence: 295, speed: 328
                },
                types: ["Fire"],
                sprite: "",
                cry: "",
                tier: "Final",
                source: "https://bulbapedia.bulbagarden.net/wiki/Typhlosion_%28Pok%C3%A9mon%29",
                isSeparateEntry: false
              },
              Hisui: {
                Name: "Typhlosion Hisui",
                stats: {
                  hp: 350, attack: 293, defence: 280, specialAttack: 370, specialDefence: 295, speed: 317
                },
                types: ["Fire Ghost"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/typhlosion-hisui.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/typhlosion-hisui.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Totodile: {
    Name: "Totodile",
    stats: {
      hp: 304, attack: 251, defence: 249, specialAttack: 205, specialDefence: 214, speed: 203
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/totodile.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/totodile.mp3",
    evolutions: [
      {
        Name: "Croconaw",
        stats: {
          hp: 334, attack: 284, defence: 284, specialAttack: 238, specialDefence: 247, speed: 236
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/croconaw.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/croconaw.mp3",
        evolutions: [
          {
            Name: "Feraligatr",
            stats: {
              hp: 374, attack: 339, defence: 328, specialAttack: 282, specialDefence: 291, speed: 280
            },
            types: ["Water"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/feraligatr.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/feraligatr.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Sentret: {
    Name: "Sentret",
    stats: {
      hp: 274, attack: 210, defence: 183, specialAttack: 185, specialDefence: 207, speed: 152
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sentret.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sentret.mp3",
    evolutions: [
      {
        Name: "Furret",
        stats: {
          hp: 374, attack: 276, defence: 249, specialAttack: 207, specialDefence: 229, speed: 306
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/furret.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/furret.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Hoothoot: {
    Name: "Hoothoot",
    stats: {
      hp: 324, attack: 174, defence: 174, specialAttack: 188, specialDefence: 232, speed: 218
    },
    types: ["Normal Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/hoothoot.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/hoothoot.mp3",
    evolutions: [
      {
        Name: "Noctowl",
        stats: {
          hp: 404, attack: 218, defence: 218, specialAttack: 298, specialDefence: 320, speed: 262
        },
        types: ["Normal Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/noctowl.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/noctowl.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Ledyba: {
    Name: "Ledyba",
    stats: {
      hp: 284, attack: 152, defence: 174, specialAttack: 196, specialDefence: 284, speed: 229
    },
    types: ["Bug Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/ledyba.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/ledyba.mp3",
    evolutions: [
      {
        Name: "Ledian",
        stats: {
          hp: 314, attack: 185, defence: 218, specialAttack: 229, specialDefence: 350, speed: 295
        },
        types: ["Bug Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/ledian.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/ledian.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Spinarak: {
    Name: "Spinarak",
    stats: {
      hp: 284, attack: 240, defence: 196, specialAttack: 196, specialDefence: 196, speed: 174
    },
    types: ["Bug Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/spinarak.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/spinarak.mp3",
    evolutions: [
      {
        Name: "Ariados",
        stats: {
          hp: 344, attack: 306, defence: 262, specialAttack: 240, specialDefence: 262, speed: 196
        },
        types: ["Bug Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/ariados.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/ariados.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Chinchou: {
    Name: "Chinchou",
    stats: {
      hp: 354, attack: 192, defence: 192, specialAttack: 232, specialDefence: 232, speed: 256
    },
    types: ["Water Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/chinchou.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/chinchou.mp3",
    evolutions: [
      {
        Name: "Lanturn",
        stats: {
          hp: 454, attack: 236, defence: 236, specialAttack: 276, specialDefence: 276, speed: 256
        },
        types: ["Water Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/lanturn.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/lanturn.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Pichu: {
    Name: "Pichu",
    stats: {
      hp: 244, attack: 196, defence: 141, specialAttack: 185, specialDefence: 185, speed: 240
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pichu.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pichu.mp3",
    evolutions: [
      {
        Name: "Pikachu",
        stats: {
          hp: 274, attack: 229, defence: 196, specialAttack: 218, specialDefence: 218, speed: 306
        },
        types: ["Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/pikachu.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/pikachu.mp3",
        evolutions: [
          {
            Name: "Raichu",
            stats: {
              hp: 324, attack: 306, defence: 229, specialAttack: 306, specialDefence: 284, speed: 350
            },
            types: ["Electric"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/raichu.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/raichu.mp3",
            evolutions: [],
            forms: {
              Alola: {
                stats: {
                  hp: 324, attack: 306, defence: 229, specialAttack: 306, specialDefence: 284, speed: 350
                },
                types: ["Electric"],
                sprite: "",
                cry: "",
                tier: "Final",
                source: "https://bulbapedia.bulbagarden.net/wiki/Raichu_%28Pok%C3%A9mon%29",
                isSeparateEntry: false
              },
              Alola: {
                Name: "Raichu Alola",
                stats: {
                  hp: 324, attack: 295, defence: 218, specialAttack: 317, specialDefence: 295, speed: 350
                },
                types: ["Electric Psychic"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/raichu-alola.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/raichu-alola.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              }
            },
            tier: "Final"
          }
        ],
        forms: {
          Alola: {
            Name: "Pikachu Alola",
            stats: {
              hp: 274, attack: 229, defence: 196, specialAttack: 218, specialDefence: 218, speed: 306
            },
            types: ["Electric"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/pikachu-alola.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/pikachu-alola.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Cleffa: {
    Name: "Cleffa",
    stats: {
      hp: 304, attack: 163, defence: 170, specialAttack: 207, specialDefence: 229, speed: 141
    },
    types: ["Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cleffa.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cleffa.mp3",
    evolutions: [
      {
        Name: "Clefairy",
        stats: {
          hp: 344, attack: 207, defence: 214, specialAttack: 240, specialDefence: 251, speed: 185
        },
        types: ["Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/clefairy.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/clefairy.mp3",
        evolutions: [
          {
            Name: "Clefable",
            stats: {
              hp: 394, attack: 262, defence: 269, specialAttack: 317, specialDefence: 306, speed: 240
            },
            types: ["Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/clefable.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/clefable.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Igglybuff: {
    Name: "Igglybuff",
    stats: {
      hp: 384, attack: 174, defence: 141, specialAttack: 196, specialDefence: 152, speed: 141
    },
    types: ["Normal Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/igglybuff.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/igglybuff.mp3",
    evolutions: [
      {
        Name: "Jigglypuff",
        stats: {
          hp: 434, attack: 207, defence: 152, specialAttack: 207, specialDefence: 163, speed: 152
        },
        types: ["Normal Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/jigglypuff.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/jigglypuff.mp3",
        evolutions: [
          {
            Name: "Wigglytuff",
            stats: {
              hp: 484, attack: 262, defence: 207, specialAttack: 295, specialDefence: 218, speed: 207
            },
            types: ["Normal Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/wigglytuff.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/wigglytuff.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Togepi: {
    Name: "Togepi",
    stats: {
      hp: 274, attack: 152, defence: 251, specialAttack: 196, specialDefence: 251, speed: 152
    },
    types: ["Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/togepi.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/togepi.mp3",
    evolutions: [
      {
        Name: "Togetic",
        stats: {
          hp: 314, attack: 196, defence: 295, specialAttack: 284, specialDefence: 339, speed: 196
        },
        types: ["Fairy Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/togetic.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/togetic.mp3",
        evolutions: [
          {
            Name: "Togekiss",
            stats: {
              hp: 374, attack: 218, defence: 317, specialAttack: 372, specialDefence: 361, speed: 284
            },
            types: ["Fairy Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/togekiss.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/togekiss.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Natu: {
    Name: "Natu",
    stats: {
      hp: 284, attack: 218, defence: 207, specialAttack: 262, specialDefence: 207, speed: 262
    },
    types: ["Psychic Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/natu.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/natu.mp3",
    evolutions: [
      {
        Name: "Xatu",
        stats: {
          hp: 334, attack: 273, defence: 262, specialAttack: 317, specialDefence: 262, speed: 317
        },
        types: ["Psychic Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/xatu.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/xatu.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Mareep: {
    Name: "Mareep",
    stats: {
      hp: 314, attack: 196, defence: 196, specialAttack: 251, specialDefence: 207, speed: 185
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/mareep.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/mareep.mp3",
    evolutions: [
      {
        Name: "Flaaffy",
        stats: {
          hp: 344, attack: 229, defence: 229, specialAttack: 284, specialDefence: 240, speed: 207
        },
        types: ["Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/flaaffy.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/flaaffy.mp3",
        evolutions: [
          {
            Name: "Ampharos",
            stats: {
              hp: 384, attack: 273, defence: 295, specialAttack: 361, specialDefence: 306, speed: 229
            },
            types: ["Electric"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/ampharos.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/ampharos.mp3",
            evolutions: [],
            forms: {
              Mega: {
                stats: {
                  hp: 384, attack: 317, defence: 339, specialAttack: 471, specialDefence: 350, speed: 207
                },
                types: ["Electric Dragon"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/ampharos-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/ampharos-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Bellossom: {
    Name: "Bellossom",
    stats: {
      hp: 354, attack: 284, defence: 317, specialAttack: 306, specialDefence: 328, speed: 218
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bellossom.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/bellossom.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Politoed: {
    Name: "Politoed",
    stats: {
      hp: 384, attack: 273, defence: 273, specialAttack: 306, specialDefence: 328, speed: 262
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/politoed.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/politoed.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Hoppip: {
    Name: "Hoppip",
    stats: {
      hp: 274, attack: 185, defence: 196, specialAttack: 185, specialDefence: 229, speed: 218
    },
    types: ["Grass Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/hoppip.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/hoppip.mp3",
    evolutions: [
      {
        Name: "Skiploom",
        stats: {
          hp: 314, attack: 207, defence: 218, specialAttack: 207, specialDefence: 251, speed: 284
        },
        types: ["Grass Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/skiploom.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/skiploom.mp3",
        evolutions: [
          {
            Name: "Jumpluff",
            stats: {
              hp: 354, attack: 229, defence: 262, specialAttack: 229, specialDefence: 317, speed: 350
            },
            types: ["Grass Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/jumpluff.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/jumpluff.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Aipom: {
    Name: "Aipom",
    stats: {
      hp: 314, attack: 262, defence: 229, specialAttack: 196, specialDefence: 229, speed: 295
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/aipom.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/aipom.mp3",
    evolutions: [
      {
        Name: "Ambipom",
        stats: {
          hp: 354, attack: 328, defence: 254, specialAttack: 240, specialDefence: 254, speed: 361
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/ambipom.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/ambipom.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Sunkern: {
    Name: "Sunkern",
    stats: {
      hp: 264, attack: 174, defence: 174, specialAttack: 174, specialDefence: 174, speed: 174
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sunkern.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sunkern.mp3",
    evolutions: [
      {
        Name: "Sunflora",
        stats: {
          hp: 354, attack: 273, defence: 229, specialAttack: 339, specialDefence: 295, speed: 174
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sunflora.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sunflora.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Yanma: {
    Name: "Yanma",
    stats: {
      hp: 334, attack: 251, defence: 207, specialAttack: 273, specialDefence: 207, speed: 317
    },
    types: ["Bug Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/yanma.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/yanma.mp3",
    evolutions: [
      {
        Name: "Yanmega",
        stats: {
          hp: 376, attack: 276, defence: 298, specialAttack: 364, specialDefence: 232, speed: 317
        },
        types: ["Bug Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/yanmega.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/yanmega.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Wooper: {
    Name: "Wooper",
    stats: {
      hp: 314, attack: 207, defence: 207, specialAttack: 163, specialDefence: 163, speed: 141
    },
    types: ["Water Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/wooper.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/wooper.mp3",
    evolutions: [
      {
        Name: "Quagsire",
        stats: {
          hp: 394, attack: 295, defence: 295, specialAttack: 251, specialDefence: 251, speed: 185
        },
        types: ["Water Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/quagsire.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/quagsire.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      { Name: "clodsire" }
    ],
    forms: {
      Paldea: {
        Name: "Wooper Paldea",
        stats: {
          hp: 314, attack: 207, defence: 207, specialAttack: 163, specialDefence: 163, speed: 141
        },
        types: ["Poison Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/wooper-paldea.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/wooper-paldea.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Murkrow: {
    Name: "Murkrow",
    stats: {
      hp: 324, attack: 295, defence: 201, specialAttack: 295, specialDefence: 201, speed: 309
    },
    types: ["Dark Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/murkrow.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/murkrow.mp3",
    evolutions: [
      {
        Name: "Honchkrow",
        stats: {
          hp: 404, attack: 383, defence: 223, specialAttack: 339, specialDefence: 223, speed: 265
        },
        types: ["Dark Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/honchkrow.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/honchkrow.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Misdreavus: {
    Name: "Misdreavus",
    stats: {
      hp: 324, attack: 240, defence: 240, specialAttack: 295, specialDefence: 295, speed: 295
    },
    types: ["Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/misdreavus.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/misdreavus.mp3",
    evolutions: [
      {
        Name: "Mismagius",
        stats: {
          hp: 324, attack: 240, defence: 240, specialAttack: 339, specialDefence: 339, speed: 339
        },
        types: ["Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/mismagius.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/mismagius.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Unown: {
    Name: "Unown",
    stats: {
      hp: 300, attack: 267, defence: 214, specialAttack: 267, specialDefence: 214, speed: 214
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/unown.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/unown.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Girafarig: {
    Name: "Girafarig",
    stats: {
      hp: 344, attack: 284, defence: 251, specialAttack: 306, specialDefence: 251, speed: 295
    },
    types: ["Normal Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/girafarig.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/girafarig.mp3",
    evolutions: [
      {
        Name: "Farigiraf",
        stats: {
          hp: 444, attack: 306, defence: 262, specialAttack: 350, specialDefence: 262, speed: 240
        },
        types: ["Normal Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/farigiraf.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/farigiraf.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Pineco: {
    Name: "Pineco",
    stats: {
      hp: 304, attack: 251, defence: 306, specialAttack: 185, specialDefence: 185, speed: 141
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pineco.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pineco.mp3",
    evolutions: [
      {
        Name: "Forretress",
        stats: {
          hp: 354, attack: 306, defence: 416, specialAttack: 240, specialDefence: 240, speed: 196
        },
        types: ["Bug Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/forretress.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/forretress.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Dunsparce: {
    Name: "Dunsparce",
    stats: {
      hp: 404, attack: 262, defence: 262, specialAttack: 251, specialDefence: 251, speed: 207
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/Dunsparce.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/Dunsparce.mp3",
    evolutions: [
      {
        Name: "Dunsparce",
        stats: {
          hp: 454, attack: 328, defence: 284, specialAttack: 295, specialDefence: 273, speed: 229
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/Dunsparce.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/Dunsparce.mp3",
        evolutions: [],
        forms: {
          ThreeSegment: {
            Name: "Dunsparce Three Segment",
            stats: {
              hp: 454, attack: 328, defence: 284, specialAttack: 295, specialDefence: 273, speed: 229
            },
            types: ["Normal"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/Dunsparce-threesegment.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/Dunsparce.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Gligar: {
    Name: "Gligar",
    stats: {
      hp: 334, attack: 273, defence: 339, specialAttack: 185, specialDefence: 251, speed: 295
    },
    types: ["Ground Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/gligar.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/gligar.mp3",
    evolutions: [
      {
        Name: "Gliscor",
        stats: {
          hp: 354, attack: 317, defence: 383, specialAttack: 207, specialDefence: 273, speed: 317
        },
        types: ["Ground Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/gliscor.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/gliscor.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Snubbull: {
    Name: "Snubbull",
    stats: {
      hp: 324, attack: 284, defence: 218, specialAttack: 196, specialDefence: 196, speed: 174
    },
    types: ["Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/snubbull.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/snubbull.mp3",
    evolutions: [
      {
        Name: "Granbull",
        stats: {
          hp: 384, attack: 372, defence: 273, specialAttack: 240, specialDefence: 240, speed: 207
        },
        types: ["Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/granbull.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/granbull.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Qwilfish: {
    Name: "Qwilfish",
    stats: {
      hp: 334, attack: 317, defence: 295, specialAttack: 229, specialDefence: 229, speed: 295
    },
    types: ["Water Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/qwilfish.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/qwilfish.mp3",
    evolutions: [
      {
        Name: "Overqwil",
        stats: {
          hp: 374, attack: 361, defence: 317, specialAttack: 251, specialDefence: 251, speed: 295
        },
        types: ["Dark Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/overqwil.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/overqwil.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {
      Hisui: {
        stats: {
          hp: 334, attack: 317, defence: 295, specialAttack: 229, specialDefence: 229, speed: 295
        },
        types: ["Water Poison"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Qwilfish_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Hisui: {
        Name: "Qwilfish Hisui",
        stats: {
          hp: 334, attack: 317, defence: 295, specialAttack: 229, specialDefence: 229, speed: 295
        },
        types: ["Dark Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/qwilfish-hisui.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/qwilfish-hisui.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Shuckle: {
    Name: "Shuckle",
    stats: {
      hp: 244, attack: 130, defence: 614, specialAttack: 130, specialDefence: 614, speed: 119
    },
    types: ["Bug Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/shuckle.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/shuckle.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Heracross: {
    Name: "Heracross",
    stats: {
      hp: 364, attack: 383, defence: 273, specialAttack: 196, specialDefence: 317, speed: 295
    },
    types: ["Bug Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/heracross.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/heracross.mp3",
    evolutions: [],
    forms: {
      Mega: {
        stats: {
          hp: 364, attack: 515, defence: 361, specialAttack: 196, specialDefence: 339, speed: 273
        },
        types: ["Bug Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/heracross-mega.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/heracross-mega.mp3",
        tier: "Mega",
        source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
        isSeparateEntry: false
      }
    },
    tier: "Final"
  },

  Sneasel: {
    Name: "Sneasel",
    stats: {
      hp: 314, attack: 317, defence: 229, specialAttack: 185, specialDefence: 273, speed: 361
    },
    types: ["Dark Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sneasel.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sneasel.mp3",
    evolutions: [
      {
        Name: "Weavile",
        stats: {
          hp: 344, attack: 372, defence: 251, specialAttack: 207, specialDefence: 295, speed: 383
        },
        types: ["Dark Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/weavile.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/weavile.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      { Name: "sneasler" }
    ],
    forms: {
      Hisui: {
        stats: {
          hp: 314, attack: 317, defence: 229, specialAttack: 185, specialDefence: 273, speed: 361
        },
        types: ["Dark Ice"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Sneasel_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Hisui: {
        Name: "Sneasel Hisui",
        stats: {
          hp: 314, attack: 317, defence: 229, specialAttack: 185, specialDefence: 273, speed: 361
        },
        types: ["Fighting Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sneasel-hisui.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sneasel-hisui.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Teddiursa: {
    Name: "Teddiursa",
    stats: {
      hp: 324, attack: 284, defence: 218, specialAttack: 218, specialDefence: 218, speed: 196
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/teddiursa.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/teddiursa.mp3",
    evolutions: [
      {
        Name: "Ursaring",
        stats: {
          hp: 384, attack: 394, defence: 273, specialAttack: 273, specialDefence: 273, speed: 229
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/ursaring.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/ursaring.mp3",
        evolutions: [
          {
            Name: "Ursaluna",
            stats: {
              hp: 464, attack: 416, defence: 339, specialAttack: 207, specialDefence: 284, speed: 218
            },
            types: ["Ground Normal"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/ursaluna.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/ursaluna.mp3",
            evolutions: [],
            forms: {
              Bloodmoon: {
                Name: "Ursaluna Bloodmoon",
                stats: {
                  hp: 430, attack: 262, defence: 372, specialAttack: 405, specialDefence: 251, speed: 223
                },
                types: ["Ground Normal"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/ursaluna-bloodmoon.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/ursaluna-bloodmoon.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Slugma: {
    Name: "Slugma",
    stats: {
      hp: 284, attack: 196, defence: 196, specialAttack: 262, specialDefence: 196, speed: 152
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/slugma.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/slugma.mp3",
    evolutions: [
      {
        Name: "Magcargo",
        stats: {
          hp: 324, attack: 218, defence: 372, specialAttack: 306, specialDefence: 284, speed: 174
        },
        types: ["Fire Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/magcargo.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/magcargo.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Swinub: {
    Name: "Swinub",
    stats: {
      hp: 304, attack: 218, defence: 196, specialAttack: 174, specialDefence: 174, speed: 218
    },
    types: ["Ice Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/swinub.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/swinub.mp3",
    evolutions: [
      {
        Name: "Piloswine",
        stats: {
          hp: 404, attack: 328, defence: 284, specialAttack: 240, specialDefence: 240, speed: 218
        },
        types: ["Ice Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/piloswine.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/piloswine.mp3",
        evolutions: [
          {
            Name: "Mamoswine",
            stats: {
              hp: 424, attack: 394, defence: 284, specialAttack: 262, specialDefence: 240, speed: 284
            },
            types: ["Ice Ground"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/mamoswine.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/mamoswine.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Corsola: {
    Name: "Corsola",
    stats: {
      hp: 334, attack: 229, defence: 317, specialAttack: 251, specialDefence: 317, speed: 185
    },
    types: ["Water Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/corsola.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/corsola.mp3",
    evolutions: [
      {
        Name: "Cursola",
        stats: {
          hp: 324, attack: 317, defence: 218, specialAttack: 427, specialDefence: 394, speed: 174
        },
        types: ["Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/cursola.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/cursola.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {
      Galar: {
        stats: {
          hp: 334, attack: 229, defence: 317, specialAttack: 251, specialDefence: 317, speed: 185
        },
        types: ["Water Rock"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Corsola_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Galar: {
        Name: "Corsola Galar",
        stats: {
          hp: 324, attack: 229, defence: 328, specialAttack: 251, specialDefence: 328, speed: 174
        },
        types: ["Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/corsola-galar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/corsola-galar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Remoraid: {
    Name: "Remoraid",
    stats: {
      hp: 274, attack: 251, defence: 185, specialAttack: 251, specialDefence: 185, speed: 251
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/remoraid.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/remoraid.mp3",
    evolutions: [
      {
        Name: "Octillery",
        stats: {
          hp: 354, attack: 339, defence: 273, specialAttack: 339, specialDefence: 273, speed: 207
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/octillery.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/octillery.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Delibird: {
    Name: "Delibird",
    stats: {
      hp: 294, attack: 229, defence: 207, specialAttack: 251, specialDefence: 207, speed: 273
    },
    types: ["Ice Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/delibird.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/delibird.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Skarmory: {
    Name: "Skarmory",
    stats: {
      hp: 334, attack: 284, defence: 416, specialAttack: 196, specialDefence: 262, speed: 262
    },
    types: ["Steel Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/skarmory.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/skarmory.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Houndour: {
    Name: "Houndour",
    stats: {
      hp: 294, attack: 240, defence: 174, specialAttack: 284, specialDefence: 218, speed: 251
    },
    types: ["Dark Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/houndour.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/houndour.mp3",
    evolutions: [
      {
        Name: "Houndoom",
        stats: {
          hp: 354, attack: 306, defence: 218, specialAttack: 350, specialDefence: 284, speed: 317
        },
        types: ["Dark Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/houndoom.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/houndoom.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 354, attack: 306, defence: 306, specialAttack: 416, specialDefence: 306, speed: 361
            },
            types: ["Dark Fire"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/houndoom-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/houndoom-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Phanpy: {
    Name: "Phanpy",
    stats: {
      hp: 384, attack: 240, defence: 240, specialAttack: 196, specialDefence: 196, speed: 196
    },
    types: ["Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/phanpy.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/phanpy.mp3",
    evolutions: [
      {
        Name: "Donphan",
        stats: {
          hp: 384, attack: 372, defence: 372, specialAttack: 240, specialDefence: 240, speed: 218
        },
        types: ["Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/donphan.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/donphan.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Stantler: {
    Name: "Stantler",
    stats: {
      hp: 350, attack: 317, defence: 245, specialAttack: 295, specialDefence: 251, speed: 295
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/stantler.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/stantler.mp3",
    evolutions: [
      {
        Name: "Wyrdeer",
        stats: {
          hp: 410, attack: 339, defence: 267, specialAttack: 339, specialDefence: 273, speed: 251
        },
        types: ["Normal Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/wyrdeer.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/wyrdeer.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Smeargle: {
    Name: "Smeargle",
    stats: {
      hp: 314, attack: 152, defence: 185, specialAttack: 152, specialDefence: 207, speed: 273
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/smeargle.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/smeargle.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Tyrogue: {
    Name: "Tyrogue",
    stats: {
      hp: 274, attack: 185, defence: 185, specialAttack: 185, specialDefence: 185, speed: 185
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tyrogue.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tyrogue.mp3",
    evolutions: [
      {
        Name: "Hitmonlee",
        stats: {
          hp: 304, attack: 372, defence: 225, specialAttack: 185, specialDefence: 350, speed: 300
        },
        types: ["Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/hitmonlee.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/hitmonlee.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      {
        Name: "Hitmonchan",
        stats: {
          hp: 304, attack: 339, defence: 282, specialAttack: 185, specialDefence: 350, speed: 276
        },
        types: ["Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/hitmonchan.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/hitmonchan.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      {
        Name: "Hitmontop",
        stats: {
          hp: 304, attack: 317, defence: 317, specialAttack: 185, specialDefence: 350, speed: 262
        },
        types: ["Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/hitmontop.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/hitmontop.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Smoochum: {
    Name: "Smoochum",
    stats: {
      hp: 294, attack: 174, defence: 141, specialAttack: 295, specialDefence: 251, speed: 251
    },
    types: ["Ice Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/smoochum.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/smoochum.mp3",
    evolutions: [
      {
        Name: "Jynx",
        stats: {
          hp: 334, attack: 218, defence: 185, specialAttack: 361, specialDefence: 317, speed: 317
        },
        types: ["Ice Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/jynx.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/jynx.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Elekid: {
    Name: "Elekid",
    stats: {
      hp: 294, attack: 247, defence: 190, specialAttack: 251, specialDefence: 229, speed: 317
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/elekid.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/elekid.mp3",
    evolutions: [
      {
        Name: "Electabuzz",
        stats: {
          hp: 334, attack: 291, defence: 234, specialAttack: 317, specialDefence: 295, speed: 339
        },
        types: ["Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/electabuzz.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/electabuzz.mp3",
        evolutions: [
          {
            Name: "Electivire",
            stats: {
              hp: 354, attack: 379, defence: 256, specialAttack: 317, specialDefence: 295, speed: 317
            },
            types: ["Electric"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/electivire.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/electivire.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Magby: {
    Name: "Magby",
    stats: {
      hp: 294, attack: 273, defence: 190, specialAttack: 262, specialDefence: 229, speed: 291
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/magby.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/magby.mp3",
    evolutions: [
      {
        Name: "Magmar",
        stats: {
          hp: 334, attack: 317, defence: 234, specialAttack: 328, specialDefence: 295, speed: 313
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/magmar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/magmar.mp3",
        evolutions: [
          {
            Name: "Magmortar",
            stats: {
              hp: 354, attack: 317, defence: 256, specialAttack: 383, specialDefence: 317, speed: 291
            },
            types: ["Fire"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/magmortar.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/magmortar.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Miltank: {
    Name: "Miltank",
    stats: {
      hp: 394, attack: 284, defence: 339, specialAttack: 196, specialDefence: 262, speed: 328
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/miltank.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/miltank.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Raikou: {
    Name: "Raikou",
    stats: {
      hp: 384, attack: 295, defence: 273, specialAttack: 361, specialDefence: 328, speed: 361
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/raikou.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/raikou.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Entei: {
    Name: "Entei",
    stats: {
      hp: 434, attack: 361, defence: 295, specialAttack: 306, specialDefence: 273, speed: 328
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/entei.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/entei.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Suicune: {
    Name: "Suicune",
    stats: {
      hp: 404, attack: 273, defence: 361, specialAttack: 306, specialDefence: 361, speed: 295
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/suicune.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/suicune.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Larvitar: {
    Name: "Larvitar",
    stats: {
      hp: 304, attack: 249, defence: 218, specialAttack: 207, specialDefence: 218, speed: 199
    },
    types: ["Rock Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/larvitar.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/larvitar.mp3",
    evolutions: [
      {
        Name: "Pupitar",
        stats: {
          hp: 344, attack: 293, defence: 262, specialAttack: 251, specialDefence: 262, speed: 221
        },
        types: ["Rock Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/pupitar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/pupitar.mp3",
        evolutions: [
          {
            Name: "Tyranitar",
            stats: {
              hp: 404, attack: 403, defence: 350, specialAttack: 317, specialDefence: 328, speed: 243
            },
            types: ["Rock Dark"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/tyranitar.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/tyranitar.mp3",
            evolutions: [],
            forms: {
              Mega: {
                stats: {
                  hp: 404, attack: 469, defence: 438, specialAttack: 317, specialDefence: 372, speed: 265
                },
                types: ["Rock Dark"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/tyranitar-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/tyranitar-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Lugia: {
    Name: "Lugia",
    stats: {
      hp: 416, attack: 306, defence: 394, specialAttack: 306, specialDefence: 447, speed: 350
    },
    types: ["Psychic Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/lugia.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/lugia.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  HoOh: {
    Name: "Ho Oh",
    stats: {
      hp: 416, attack: 394, defence: 306, specialAttack: 350, specialDefence: 447, speed: 306
    },
    types: ["Fire Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/hooh.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/hooh.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Celebi: {
    Name: "Celebi",
    stats: {
      hp: 404, attack: 328, defence: 328, specialAttack: 328, specialDefence: 328, speed: 328
    },
    types: ["Psychic Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/celebi.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/celebi.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Mythical"
  },

  Treecko: {
    Name: "Treecko",
    stats: {
      hp: 284, attack: 207, defence: 185, specialAttack: 251, specialDefence: 229, speed: 262
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/treecko.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/treecko.mp3",
    evolutions: [
      {
        Name: "Grovyle",
        stats: {
          hp: 304, attack: 251, defence: 207, specialAttack: 295, specialDefence: 251, speed: 317
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/grovyle.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/grovyle.mp3",
        evolutions: [
          {
            Name: "Sceptile",
            stats: {
              hp: 344, attack: 295, defence: 251, specialAttack: 339, specialDefence: 295, speed: 372
            },
            types: ["Grass"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/sceptile.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/sceptile.mp3",
            evolutions: [],
            forms: {
              Mega: {
                stats: {
                  hp: 344, attack: 350, defence: 273, specialAttack: 427, specialDefence: 295, speed: 427
                },
                types: ["Grass Dragon"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/sceptile-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/sceptile-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Torchic: {
    Name: "Torchic",
    stats: {
      hp: 294, attack: 240, defence: 196, specialAttack: 262, specialDefence: 218, speed: 207
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/torchic.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/torchic.mp3",
    evolutions: [
      {
        Name: "Combusken",
        stats: {
          hp: 324, attack: 295, defence: 240, specialAttack: 295, specialDefence: 240, speed: 229
        },
        types: ["Fire Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/combusken.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/combusken.mp3",
        evolutions: [
          {
            Name: "Blaziken",
            stats: {
              hp: 364, attack: 372, defence: 262, specialAttack: 350, specialDefence: 262, speed: 284
            },
            types: ["Fire Fighting"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/blaziken.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/blaziken.mp3",
            evolutions: [],
            forms: {
              Mega: {
                stats: {
                  hp: 364, attack: 460, defence: 284, specialAttack: 394, specialDefence: 284, speed: 328
                },
                types: ["Fire Fighting"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/blaziken-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/blaziken-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Mudkip: {
    Name: "Mudkip",
    stats: {
      hp: 304, attack: 262, defence: 218, specialAttack: 218, specialDefence: 218, speed: 196
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/mudkip.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/mudkip.mp3",
    evolutions: [
      {
        Name: "Marshtomp",
        stats: {
          hp: 344, attack: 295, defence: 262, specialAttack: 240, specialDefence: 262, speed: 218
        },
        types: ["Water Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/marshtomp.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/marshtomp.mp3",
        evolutions: [
          {
            Name: "Swampert",
            stats: {
              hp: 404, attack: 350, defence: 306, specialAttack: 295, specialDefence: 306, speed: 240
            },
            types: ["Water Ground"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/swampert.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/swampert.mp3",
            evolutions: [],
            forms: {
              Mega: {
                stats: {
                  hp: 404, attack: 438, defence: 350, specialAttack: 317, specialDefence: 350, speed: 262
                },
                types: ["Water Ground"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/swampert-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/swampert-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Poochyena: {
    Name: "Poochyena",
    stats: {
      hp: 274, attack: 229, defence: 185, specialAttack: 174, specialDefence: 174, speed: 185
    },
    types: ["Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/poochyena.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/poochyena.mp3",
    evolutions: [
      {
        Name: "Mightyena",
        stats: {
          hp: 344, attack: 306, defence: 262, specialAttack: 240, specialDefence: 240, speed: 262
        },
        types: ["Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/mightyena.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/mightyena.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Zigzagoon: {
    Name: "Zigzagoon",
    stats: {
      hp: 280, attack: 174, defence: 199, specialAttack: 174, specialDefence: 199, speed: 240
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/zigzagoon.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/zigzagoon.mp3",
    evolutions: [
      {
        Name: "Linoone",
        stats: {
          hp: 360, attack: 262, defence: 243, specialAttack: 218, specialDefence: 243, speed: 328
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/linoone.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/linoone.mp3",
        evolutions: [
          {
            Name: "Obstagoon",
            stats: {
              hp: 390, attack: 306, defence: 331, specialAttack: 240, specialDefence: 287, speed: 317
            },
            types: ["Dark Normal"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/obstagoon.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/obstagoon.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {
          Galar: {
            stats: {
              hp: 360, attack: 262, defence: 243, specialAttack: 218, specialDefence: 243, speed: 328
            },
            types: ["Normal"],
            sprite: "",
            cry: "",
            tier: "Mid",
            source: "https://bulbapedia.bulbagarden.net/wiki/Linoone_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Galar: {
            Name: "Linoone Galar",
            stats: {
              hp: 360, attack: 262, defence: 243, specialAttack: 218, specialDefence: 243, speed: 328
            },
            types: ["Dark Normal"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/linoone-galar.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/linoone-galar.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Mid"
      }
    ],
    forms: {
      Galar: {
        stats: {
          hp: 280, attack: 174, defence: 199, specialAttack: 174, specialDefence: 199, speed: 240
        },
        types: ["Normal"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Zigzagoon_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Galar: {
        Name: "Zigzagoon Galar",
        stats: {
          hp: 280, attack: 174, defence: 199, specialAttack: 174, specialDefence: 199, speed: 240
        },
        types: ["Dark Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/zigzagoon-galar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/zigzagoon-galar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Wurmple: {
    Name: "Wurmple",
    stats: {
      hp: 294, attack: 207, defence: 185, specialAttack: 152, specialDefence: 174, speed: 152
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/wurmple.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/wurmple.mp3",
    evolutions: [
      {
        Name: "Silcoon",
        stats: {
          hp: 304, attack: 185, defence: 229, specialAttack: 163, specialDefence: 163, speed: 141
        },
        types: ["Bug"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/silcoon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/silcoon.mp3",
        evolutions: [],
        forms: {
          cascoon: {
            Name: "SilcoonCascoon",
            stats: null,
            types: [],
            sprite: "",
            cry: "",
            evolutions: ["Beautiflydustox"],
            forms: {

            },
            tier: "Mid"
          }
        },
        tier: "Final"
      },
      { Name: "cascoon" }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Beautifly: {
    Name: "Beautifly",
    stats: {
      hp: 324, attack: 262, defence: 218, specialAttack: 328, specialDefence: 218, speed: 251
    },
    types: ["Bug Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/beautifly.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/beautifly.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Cascoon: {
    Name: "Cascoon",
    stats: {
      hp: 304, attack: 185, defence: 229, specialAttack: 163, specialDefence: 163, speed: 141
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cascoon.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cascoon.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Dustox: {
    Name: "Dustox",
    stats: {
      hp: 324, attack: 218, defence: 262, specialAttack: 218, specialDefence: 306, speed: 251
    },
    types: ["Bug Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/dustox.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/dustox.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Lotad: {
    Name: "Lotad",
    stats: {
      hp: 284, attack: 174, defence: 174, specialAttack: 196, specialDefence: 218, speed: 174
    },
    types: ["Water Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/lotad.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/lotad.mp3",
    evolutions: [
      {
        Name: "Lombre",
        stats: {
          hp: 324, attack: 218, defence: 218, specialAttack: 240, specialDefence: 262, speed: 218
        },
        types: ["Water Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/lombre.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/lombre.mp3",
        evolutions: [
          {
            Name: "Ludicolo",
            stats: {
              hp: 364, attack: 262, defence: 262, specialAttack: 306, specialDefence: 328, speed: 262
            },
            types: ["Water Grass"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/ludicolo.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/ludicolo.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Seedot: {
    Name: "Seedot",
    stats: {
      hp: 284, attack: 196, defence: 218, specialAttack: 174, specialDefence: 174, speed: 174
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/seedot.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/seedot.mp3",
    evolutions: [
      {
        Name: "Nuzleaf",
        stats: {
          hp: 344, attack: 262, defence: 196, specialAttack: 240, specialDefence: 196, speed: 240
        },
        types: ["Grass Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/nuzleaf.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/nuzleaf.mp3",
        evolutions: [
          {
            Name: "Shiftry",
            stats: {
              hp: 384, attack: 328, defence: 240, specialAttack: 306, specialDefence: 240, speed: 284
            },
            types: ["Grass Dark"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/shiftry.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/shiftry.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Taillow: {
    Name: "Taillow",
    stats: {
      hp: 284, attack: 229, defence: 174, specialAttack: 174, specialDefence: 174, speed: 295
    },
    types: ["Normal Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/taillow.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/taillow.mp3",
    evolutions: [
      {
        Name: "Swellow",
        stats: {
          hp: 324, attack: 295, defence: 240, specialAttack: 273, specialDefence: 218, speed: 383
        },
        types: ["Normal Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/swellow.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/swellow.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Wingull: {
    Name: "Wingull",
    stats: {
      hp: 284, attack: 174, defence: 174, specialAttack: 229, specialDefence: 174, speed: 295
    },
    types: ["Water Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/wingull.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/wingull.mp3",
    evolutions: [
      {
        Name: "Pelipper",
        stats: {
          hp: 324, attack: 218, defence: 328, specialAttack: 317, specialDefence: 262, speed: 251
        },
        types: ["Water Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/pelipper.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/pelipper.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Ralts: {
    Name: "Ralts",
    stats: {
      hp: 260, attack: 163, defence: 163, specialAttack: 207, specialDefence: 185, speed: 196
    },
    types: ["Psychic Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/ralts.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/ralts.mp3",
    evolutions: [
      {
        Name: "Kirlia",
        stats: {
          hp: 280, attack: 185, defence: 185, specialAttack: 251, specialDefence: 229, speed: 218
        },
        types: ["Psychic Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/kirlia.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/kirlia.mp3",
        evolutions: [
          {
            Name: "Gardevoir",
            stats: {
              hp: 340, attack: 251, defence: 251, specialAttack: 383, specialDefence: 361, speed: 284
            },
            types: ["Psychic Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/gardevoir.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/gardevoir.mp3",
            evolutions: [],
            forms: {
              Mega: {
                stats: {
                  hp: 340, attack: 295, defence: 251, specialAttack: 471, specialDefence: 405, speed: 328
                },
                types: ["Psychic Fairy"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/gardevoir-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/gardevoir-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          },
          { Name: "gallade" }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Surskit: {
    Name: "Surskit",
    stats: {
      hp: 284, attack: 174, defence: 179, specialAttack: 218, specialDefence: 223, speed: 251
    },
    types: ["Bug Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/surskit.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/surskit.mp3",
    evolutions: [
      {
        Name: "Masquerain",
        stats: {
          hp: 344, attack: 240, defence: 245, specialAttack: 328, specialDefence: 289, speed: 284
        },
        types: ["Bug Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/masquerain.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/masquerain.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Shroomish: {
    Name: "Shroomish",
    stats: {
      hp: 324, attack: 196, defence: 240, specialAttack: 196, specialDefence: 240, speed: 185
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/shroomish.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/shroomish.mp3",
    evolutions: [
      {
        Name: "Breloom",
        stats: {
          hp: 324, attack: 394, defence: 284, specialAttack: 240, specialDefence: 240, speed: 262
        },
        types: ["Grass Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/breloom.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/breloom.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Slakoth: {
    Name: "Slakoth",
    stats: {
      hp: 324, attack: 240, defence: 240, specialAttack: 185, specialDefence: 185, speed: 174
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/slakoth.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/slakoth.mp3",
    evolutions: [
      {
        Name: "Vigoroth",
        stats: {
          hp: 364, attack: 284, defence: 284, specialAttack: 229, specialDefence: 229, speed: 306
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/vigoroth.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/vigoroth.mp3",
        evolutions: [
          {
            Name: "Slaking",
            stats: {
              hp: 504, attack: 460, defence: 328, specialAttack: 317, specialDefence: 251, speed: 328
            },
            types: ["Normal"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/slaking.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/slaking.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Nincada: {
    Name: "Nincada",
    stats: {
      hp: 266, attack: 207, defence: 306, specialAttack: 174, specialDefence: 174, speed: 196
    },
    types: ["Bug Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/nincada.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/nincada.mp3",
    evolutions: [
      {
        Name: "Ninjask",
        stats: {
          hp: 326, attack: 306, defence: 207, specialAttack: 218, specialDefence: 218, speed: 460
        },
        types: ["Bug Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/ninjask.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/ninjask.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      { Name: "shedinja" }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Shedinja: {
    Name: "Shedinja",
    stats: {
      hp: 1, attack: 306, defence: 207, specialAttack: 174, specialDefence: 174, speed: 196
    },
    types: ["Bug Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/shedinja.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/shedinja.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Whismur: {
    Name: "Whismur",
    stats: {
      hp: 332, attack: 221, defence: 159, specialAttack: 221, specialDefence: 159, speed: 170
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/whismur.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/whismur.mp3",
    evolutions: [
      {
        Name: "Loudred",
        stats: {
          hp: 372, attack: 265, defence: 203, specialAttack: 265, specialDefence: 203, speed: 214
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/loudred.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/loudred.mp3",
        evolutions: [
          {
            Name: "Exploud",
            stats: {
              hp: 412, attack: 309, defence: 247, specialAttack: 309, specialDefence: 269, speed: 258
            },
            types: ["Normal"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/exploud.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/exploud.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Makuhita: {
    Name: "Makuhita",
    stats: {
      hp: 348, attack: 240, defence: 174, specialAttack: 152, specialDefence: 174, speed: 163
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/makuhita.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/makuhita.mp3",
    evolutions: [
      {
        Name: "Hariyama",
        stats: {
          hp: 492, attack: 372, defence: 240, specialAttack: 196, specialDefence: 240, speed: 218
        },
        types: ["Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/hariyama.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/hariyama.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Azurill: {
    Name: "Azurill",
    stats: {
      hp: 304, attack: 152, defence: 196, specialAttack: 152, specialDefence: 196, speed: 152
    },
    types: ["Normal Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/azurill.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/azurill.mp3",
    evolutions: [
      {
        Name: "Marill",
        stats: {
          hp: 344, attack: 152, defence: 218, specialAttack: 152, specialDefence: 218, speed: 196
        },
        types: ["Water Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/marill.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/marill.mp3",
        evolutions: [
          {
            Name: "Azumarill",
            stats: {
              hp: 404, attack: 218, defence: 284, specialAttack: 240, specialDefence: 284, speed: 218
            },
            types: ["Water Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/azumarill.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/azumarill.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Nosepass: {
    Name: "Nosepass",
    stats: {
      hp: 264, attack: 207, defence: 405, specialAttack: 207, specialDefence: 306, speed: 174
    },
    types: ["Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/nosepass.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/nosepass.mp3",
    evolutions: [
      {
        Name: "Probopass",
        stats: {
          hp: 324, attack: 229, defence: 427, specialAttack: 273, specialDefence: 438, speed: 196
        },
        types: ["Rock Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/probopass.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/probopass.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Skitty: {
    Name: "Skitty",
    stats: {
      hp: 304, attack: 207, defence: 207, specialAttack: 185, specialDefence: 185, speed: 218
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/skitty.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/skitty.mp3",
    evolutions: [
      {
        Name: "Delcatty",
        stats: {
          hp: 344, attack: 251, defence: 251, specialAttack: 229, specialDefence: 229, speed: 306
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/delcatty.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/delcatty.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Sableye: {
    Name: "Sableye",
    stats: {
      hp: 304, attack: 273, defence: 273, specialAttack: 251, specialDefence: 251, speed: 218
    },
    types: ["Dark Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sableye.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sableye.mp3",
    evolutions: [],
    forms: {
      Mega: {
        stats: {
          hp: 304, attack: 295, defence: 383, specialAttack: 295, specialDefence: 361, speed: 152
        },
        types: ["Dark Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sableye-mega.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sableye-mega.mp3",
        tier: "Mega",
        source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
        isSeparateEntry: false
      }
    },
    tier: "Final"
  },

  Mawile: {
    Name: "Mawile",
    stats: {
      hp: 304, attack: 295, defence: 295, specialAttack: 229, specialDefence: 229, speed: 218
    },
    types: ["Steel Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/mawile.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/mawile.mp3",
    evolutions: [],
    forms: {
      Mega: {
        stats: {
          hp: 304, attack: 339, defence: 383, specialAttack: 229, specialDefence: 317, speed: 218
        },
        types: ["Steel Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/mawile-mega.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/mawile-mega.mp3",
        tier: "Mega",
        source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
        isSeparateEntry: false
      }
    },
    tier: "Final"
  },

  Aron: {
    Name: "Aron",
    stats: {
      hp: 304, attack: 262, defence: 328, specialAttack: 196, specialDefence: 196, speed: 174
    },
    types: ["Steel Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/aron.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/aron.mp3",
    evolutions: [
      {
        Name: "Lairon",
        stats: {
          hp: 324, attack: 306, defence: 416, specialAttack: 218, specialDefence: 218, speed: 196
        },
        types: ["Steel Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/lairon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/lairon.mp3",
        evolutions: [
          {
            Name: "Aggron",
            stats: {
              hp: 344, attack: 350, defence: 504, specialAttack: 240, specialDefence: 240, speed: 218
            },
            types: ["Steel Rock"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/aggron.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/aggron.mp3",
            evolutions: [],
            forms: {
              Mega: {
                stats: {
                  hp: 344, attack: 416, defence: 614, specialAttack: 240, specialDefence: 284, speed: 218
                },
                types: ["Steel"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/aggron-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/aggron-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Meditite: {
    Name: "Meditite",
    stats: {
      hp: 264, attack: 196, defence: 229, specialAttack: 196, specialDefence: 229, speed: 240
    },
    types: ["Fighting Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/meditite.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/meditite.mp3",
    evolutions: [
      {
        Name: "Medicham",
        stats: {
          hp: 324, attack: 240, defence: 273, specialAttack: 240, specialDefence: 273, speed: 284
        },
        types: ["Fighting Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/medicham.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/medicham.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 324, attack: 328, defence: 295, specialAttack: 284, specialDefence: 295, speed: 328
            },
            types: ["Fighting Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/medicham-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/medicham-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Electrike: {
    Name: "Electrike",
    stats: {
      hp: 284, attack: 207, defence: 196, specialAttack: 251, specialDefence: 196, speed: 251
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/electrike.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/electrike.mp3",
    evolutions: [
      {
        Name: "Manectric",
        stats: {
          hp: 344, attack: 273, defence: 240, specialAttack: 339, specialDefence: 240, speed: 339
        },
        types: ["Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/manectric.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/manectric.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 344, attack: 273, defence: 284, specialAttack: 405, specialDefence: 284, speed: 405
            },
            types: ["Electric"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/manectric-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/manectric-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Plusle: {
    Name: "Plusle",
    stats: {
      hp: 324, attack: 218, defence: 196, specialAttack: 295, specialDefence: 273, speed: 317
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/plusle.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/plusle.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Minun: {
    Name: "Minun",
    stats: {
      hp: 324, attack: 196, defence: 218, specialAttack: 273, specialDefence: 295, speed: 317
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/minun.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/minun.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Volbeat: {
    Name: "Volbeat",
    stats: {
      hp: 334, attack: 269, defence: 273, specialAttack: 212, specialDefence: 295, speed: 295
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/volbeat.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/volbeat.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Illumise: {
    Name: "Illumise",
    stats: {
      hp: 334, attack: 212, defence: 273, specialAttack: 269, specialDefence: 295, speed: 295
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/illumise.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/illumise.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Gulpin: {
    Name: "Gulpin",
    stats: {
      hp: 344, attack: 203, defence: 225, specialAttack: 203, specialDefence: 225, speed: 196
    },
    types: ["Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/gulpin.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/gulpin.mp3",
    evolutions: [
      {
        Name: "Swalot",
        stats: {
          hp: 404, attack: 269, defence: 291, specialAttack: 269, specialDefence: 291, speed: 229
        },
        types: ["Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/swalot.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/swalot.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Carvanha: {
    Name: "Carvanha",
    stats: {
      hp: 294, attack: 306, defence: 152, specialAttack: 251, specialDefence: 152, speed: 251
    },
    types: ["Water Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/carvanha.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/carvanha.mp3",
    evolutions: [
      {
        Name: "Sharpedo",
        stats: {
          hp: 344, attack: 372, defence: 196, specialAttack: 317, specialDefence: 196, speed: 317
        },
        types: ["Water Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sharpedo.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sharpedo.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 344, attack: 416, defence: 262, specialAttack: 350, specialDefence: 251, speed: 339
            },
            types: ["Water Dark"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/sharpedo-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/sharpedo-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Wailmer: {
    Name: "Wailmer",
    stats: {
      hp: 464, attack: 262, defence: 185, specialAttack: 262, specialDefence: 185, speed: 240
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/wailmer.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/wailmer.mp3",
    evolutions: [
      {
        Name: "Wailord",
        stats: {
          hp: 544, attack: 306, defence: 207, specialAttack: 306, specialDefence: 207, speed: 240
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/wailord.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/wailord.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Numel: {
    Name: "Numel",
    stats: {
      hp: 324, attack: 240, defence: 196, specialAttack: 251, specialDefence: 207, speed: 185
    },
    types: ["Fire Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/numel.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/numel.mp3",
    evolutions: [
      {
        Name: "Camerupt",
        stats: {
          hp: 344, attack: 328, defence: 262, specialAttack: 339, specialDefence: 273, speed: 196
        },
        types: ["Fire Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/camerupt.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/camerupt.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 344, attack: 372, defence: 328, specialAttack: 427, specialDefence: 339, speed: 152
            },
            types: ["Fire Ground"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/camerupt-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/camerupt-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Torkoal: {
    Name: "Torkoal",
    stats: {
      hp: 344, attack: 295, defence: 416, specialAttack: 295, specialDefence: 262, speed: 152
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/torkoal.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/torkoal.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Spoink: {
    Name: "Spoink",
    stats: {
      hp: 324, attack: 163, defence: 185, specialAttack: 262, specialDefence: 284, speed: 240
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/spoink.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/spoink.mp3",
    evolutions: [
      {
        Name: "Grumpig",
        stats: {
          hp: 364, attack: 207, defence: 251, specialAttack: 306, specialDefence: 350, speed: 284
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/grumpig.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/grumpig.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Spinda: {
    Name: "Spinda",
    stats: {
      hp: 324, attack: 240, defence: 240, specialAttack: 240, specialDefence: 240, speed: 240
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/spinda.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/spinda.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Trapinch: {
    Name: "Trapinch",
    stats: {
      hp: 294, attack: 328, defence: 207, specialAttack: 207, specialDefence: 207, speed: 130
    },
    types: ["Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/trapinch.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/trapinch.mp3",
    evolutions: [
      {
        Name: "Vibrava",
        stats: {
          hp: 304, attack: 262, defence: 218, specialAttack: 218, specialDefence: 218, speed: 262
        },
        types: ["Ground Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/vibrava.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/vibrava.mp3",
        evolutions: [
          {
            Name: "Flygon",
            stats: {
              hp: 364, attack: 328, defence: 284, specialAttack: 284, specialDefence: 284, speed: 328
            },
            types: ["Ground Dragon"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/flygon.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/flygon.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Cacnea: {
    Name: "Cacnea",
    stats: {
      hp: 304, attack: 295, defence: 196, specialAttack: 295, specialDefence: 196, speed: 185
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cacnea.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cacnea.mp3",
    evolutions: [
      {
        Name: "Cacturne",
        stats: {
          hp: 344, attack: 361, defence: 240, specialAttack: 361, specialDefence: 240, speed: 229
        },
        types: ["Grass Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/cacturne.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/cacturne.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Swablu: {
    Name: "Swablu",
    stats: {
      hp: 294, attack: 196, defence: 240, specialAttack: 196, specialDefence: 273, speed: 218
    },
    types: ["Normal Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/swablu.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/swablu.mp3",
    evolutions: [
      {
        Name: "Altaria",
        stats: {
          hp: 354, attack: 262, defence: 306, specialAttack: 262, specialDefence: 339, speed: 284
        },
        types: ["Dragon Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/altaria.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/altaria.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 354, attack: 350, defence: 350, specialAttack: 350, specialDefence: 339, speed: 284
            },
            types: ["Dragon Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/altaria-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/altaria-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Zangoose: {
    Name: "Zangoose",
    stats: {
      hp: 350, attack: 361, defence: 240, specialAttack: 240, specialDefence: 240, speed: 306
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/zangoose.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/zangoose.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Seviper: {
    Name: "Seviper",
    stats: {
      hp: 350, attack: 328, defence: 240, specialAttack: 328, specialDefence: 240, speed: 251
    },
    types: ["Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/seviper.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/seviper.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Lunatone: {
    Name: "Lunatone",
    stats: {
      hp: 384, attack: 229, defence: 251, specialAttack: 317, specialDefence: 295, speed: 262
    },
    types: ["Rock Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/lunatone.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/lunatone.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Solrock: {
    Name: "Solrock",
    stats: {
      hp: 384, attack: 317, defence: 295, specialAttack: 229, specialDefence: 251, speed: 262
    },
    types: ["Rock Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/solrock.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/solrock.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Barboach: {
    Name: "Barboach",
    stats: {
      hp: 304, attack: 214, defence: 203, specialAttack: 210, specialDefence: 199, speed: 240
    },
    types: ["Water Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/barboach.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/barboach.mp3",
    evolutions: [
      {
        Name: "Whiscash",
        stats: {
          hp: 424, attack: 280, defence: 269, specialAttack: 276, specialDefence: 265, speed: 240
        },
        types: ["Water Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/whiscash.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/whiscash.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Corphish: {
    Name: "Corphish",
    stats: {
      hp: 290, attack: 284, defence: 251, specialAttack: 218, specialDefence: 185, speed: 185
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/corphish.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/corphish.mp3",
    evolutions: [
      {
        Name: "Crawdaunt",
        stats: {
          hp: 330, attack: 372, defence: 295, specialAttack: 306, specialDefence: 229, speed: 229
        },
        types: ["Water Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/crawdaunt.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/crawdaunt.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Baltoy: {
    Name: "Baltoy",
    stats: {
      hp: 284, attack: 196, defence: 229, specialAttack: 196, specialDefence: 262, speed: 229
    },
    types: ["Ground Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/baltoy.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/baltoy.mp3",
    evolutions: [
      {
        Name: "Claydol",
        stats: {
          hp: 324, attack: 262, defence: 339, specialAttack: 262, specialDefence: 372, speed: 273
        },
        types: ["Ground Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/claydol.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/claydol.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Lileep: {
    Name: "Lileep",
    stats: {
      hp: 336, attack: 199, defence: 278, specialAttack: 243, specialDefence: 300, speed: 159
    },
    types: ["Rock Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/lileep.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/lileep.mp3",
    evolutions: [
      {
        Name: "Cradily",
        stats: {
          hp: 376, attack: 287, defence: 322, specialAttack: 287, specialDefence: 344, speed: 203
        },
        types: ["Rock Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/cradily.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/cradily.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Anorith: {
    Name: "Anorith",
    stats: {
      hp: 294, attack: 317, defence: 218, specialAttack: 196, specialDefence: 218, speed: 273
    },
    types: ["Rock Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/anorith.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/anorith.mp3",
    evolutions: [
      {
        Name: "Armaldo",
        stats: {
          hp: 354, attack: 383, defence: 328, specialAttack: 262, specialDefence: 284, speed: 207
        },
        types: ["Rock Bug"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/armaldo.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/armaldo.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Feebas: {
    Name: "Feebas",
    stats: {
      hp: 244, attack: 141, defence: 152, specialAttack: 130, specialDefence: 229, speed: 284
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/feebas.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/feebas.mp3",
    evolutions: [
      {
        Name: "Milotic",
        stats: {
          hp: 394, attack: 240, defence: 282, specialAttack: 328, specialDefence: 383, speed: 287
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/milotic.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/milotic.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Castform: {
    Name: "Castform",
    stats: {
      hp: 344, attack: 262, defence: 262, specialAttack: 262, specialDefence: 262, speed: 262
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/castform.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/castform.mp3",
    evolutions: [],
    forms: {
      Rainy: {
        Name: "Castform Rainy",
        stats: {
          hp: 344, attack: 262, defence: 262, specialAttack: 262, specialDefence: 262, speed: 262
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/castform-rainy.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/castform-rainy.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Snowy: {
        Name: "Castform Snowy",
        stats: {
          hp: 344, attack: 262, defence: 262, specialAttack: 262, specialDefence: 262, speed: 262
        },
        types: ["Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/castform-snowy.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/castform-snowy.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Sunny: {
        Name: "Castform Sunny",
        stats: {
          hp: 344, attack: 262, defence: 262, specialAttack: 262, specialDefence: 262, speed: 262
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/castform-sunny.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/castform-sunny.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Final"
  },

  Kecleon: {
    Name: "Kecleon",
    stats: {
      hp: 324, attack: 306, defence: 262, specialAttack: 240, specialDefence: 372, speed: 196
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/kecleon.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/kecleon.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Shuppet: {
    Name: "Shuppet",
    stats: {
      hp: 292, attack: 273, defence: 185, specialAttack: 247, specialDefence: 181, speed: 207
    },
    types: ["Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/shuppet.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/shuppet.mp3",
    evolutions: [
      {
        Name: "Banette",
        stats: {
          hp: 332, attack: 361, defence: 251, specialAttack: 291, specialDefence: 247, speed: 251
        },
        types: ["Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/banette.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/banette.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 332, attack: 471, defence: 273, specialAttack: 313, specialDefence: 291, speed: 273
            },
            types: ["Ghost"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/banette-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/banette-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Duskull: {
    Name: "Duskull",
    stats: {
      hp: 244, attack: 196, defence: 306, specialAttack: 174, specialDefence: 306, speed: 163
    },
    types: ["Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/duskull.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/duskull.mp3",
    evolutions: [
      {
        Name: "Dusclops",
        stats: {
          hp: 284, attack: 262, defence: 394, specialAttack: 240, specialDefence: 394, speed: 163
        },
        types: ["Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/dusclops.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/dusclops.mp3",
        evolutions: [
          {
            Name: "Dusknoir",
            stats: {
              hp: 294, attack: 328, defence: 405, specialAttack: 251, specialDefence: 405, speed: 207
            },
            types: ["Ghost"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/dusknoir.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/dusknoir.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Tropius: {
    Name: "Tropius",
    stats: {
      hp: 402, attack: 258, defence: 291, specialAttack: 267, specialDefence: 300, speed: 221
    },
    types: ["Grass Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tropius.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tropius.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Absol: {
    Name: "Absol",
    stats: {
      hp: 334, attack: 394, defence: 240, specialAttack: 273, specialDefence: 240, speed: 273
    },
    types: ["Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/absol.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/absol.mp3",
    evolutions: [],
    forms: {
      Mega: {
        stats: {
          hp: 334, attack: 438, defence: 240, specialAttack: 361, specialDefence: 240, speed: 361
        },
        types: ["Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/absol-mega.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/absol-mega.mp3",
        tier: "Mega",
        source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
        isSeparateEntry: false
      }
    },
    tier: "Final"
  },

  Wynaut: {
    Name: "Wynaut",
    stats: {
      hp: 394, attack: 159, defence: 214, specialAttack: 159, specialDefence: 214, speed: 159
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/wynaut.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/wynaut.mp3",
    evolutions: [
      {
        Name: "Wobbuffet",
        stats: {
          hp: 584, attack: 181, defence: 236, specialAttack: 181, specialDefence: 236, speed: 181
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/wobbuffet.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/wobbuffet.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Snorunt: {
    Name: "Snorunt",
    stats: {
      hp: 304, attack: 218, defence: 218, specialAttack: 218, specialDefence: 218, speed: 218
    },
    types: ["Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/snorunt.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/snorunt.mp3",
    evolutions: [
      {
        Name: "Glalie",
        stats: {
          hp: 364, attack: 284, defence: 284, specialAttack: 284, specialDefence: 284, speed: 284
        },
        types: ["Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/glalie.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/glalie.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 364, attack: 372, defence: 284, specialAttack: 372, specialDefence: 284, speed: 328
            },
            types: ["Ice"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/glalie-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/glalie-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      },
      { Name: "froslass" }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Spheal: {
    Name: "Spheal",
    stats: {
      hp: 344, attack: 196, defence: 218, specialAttack: 229, specialDefence: 218, speed: 163
    },
    types: ["Ice Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/spheal.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/spheal.mp3",
    evolutions: [
      {
        Name: "Sealeo",
        stats: {
          hp: 384, attack: 240, defence: 262, specialAttack: 273, specialDefence: 262, speed: 207
        },
        types: ["Ice Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sealeo.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sealeo.mp3",
        evolutions: [
          {
            Name: "Walrein",
            stats: {
              hp: 424, attack: 284, defence: 306, specialAttack: 317, specialDefence: 306, speed: 251
            },
            types: ["Ice Water"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/walrein.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/walrein.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Clamperl: {
    Name: "Clamperl",
    stats: {
      hp: 274, attack: 249, defence: 295, specialAttack: 271, specialDefence: 229, speed: 179
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/clamperl.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/clamperl.mp3",
    evolutions: [
      {
        Name: "Huntail",
        stats: {
          hp: 314, attack: 337, defence: 339, specialAttack: 315, specialDefence: 273, speed: 223
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/huntail.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/huntail.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      { Name: "gorebyss" }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Gorebyss: {
    Name: "Gorebyss",
    stats: {
      hp: 314, attack: 293, defence: 339, specialAttack: 359, specialDefence: 273, speed: 223
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/gorebyss.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/gorebyss.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Relicanth: {
    Name: "Relicanth",
    stats: {
      hp: 404, attack: 306, defence: 394, specialAttack: 207, specialDefence: 251, speed: 229
    },
    types: ["Water Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/relicanth.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/relicanth.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Luvdisc: {
    Name: "Luvdisc",
    stats: {
      hp: 290, attack: 174, defence: 229, specialAttack: 196, specialDefence: 251, speed: 322
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/luvdisc.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/luvdisc.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Bagon: {
    Name: "Bagon",
    stats: {
      hp: 294, attack: 273, defence: 240, specialAttack: 196, specialDefence: 174, speed: 218
    },
    types: ["Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bagon.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/bagon.mp3",
    evolutions: [
      {
        Name: "Shelgon",
        stats: {
          hp: 334, attack: 317, defence: 328, specialAttack: 240, specialDefence: 218, speed: 218
        },
        types: ["Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/shelgon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/shelgon.mp3",
        evolutions: [
          {
            Name: "Salamence",
            stats: {
              hp: 394, attack: 405, defence: 284, specialAttack: 350, specialDefence: 284, speed: 328
            },
            types: ["Dragon Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/salamence.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/salamence.mp3",
            evolutions: [],
            forms: {
              Mega: {
                stats: {
                  hp: 394, attack: 427, defence: 394, specialAttack: 372, specialDefence: 306, speed: 372
                },
                types: ["Dragon Flying"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/salamence-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/salamence-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Beldum: {
    Name: "Beldum",
    stats: {
      hp: 284, attack: 229, defence: 284, specialAttack: 185, specialDefence: 240, speed: 174
    },
    types: ["Steel Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/beldum.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/beldum.mp3",
    evolutions: [
      {
        Name: "Metang",
        stats: {
          hp: 324, attack: 273, defence: 328, specialAttack: 229, specialDefence: 284, speed: 218
        },
        types: ["Steel Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/metang.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/metang.mp3",
        evolutions: [
          {
            Name: "Metagross",
            stats: {
              hp: 364, attack: 405, defence: 394, specialAttack: 317, specialDefence: 306, speed: 262
            },
            types: ["Steel Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/metagross.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/metagross.mp3",
            evolutions: [],
            forms: {
              Mega: {
                stats: {
                  hp: 364, attack: 427, defence: 438, specialAttack: 339, specialDefence: 350, speed: 350
                },
                types: ["Steel Psychic"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/metagross-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/metagross-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Regirock: {
    Name: "Regirock",
    stats: {
      hp: 364, attack: 328, defence: 548, specialAttack: 218, specialDefence: 328, speed: 218
    },
    types: ["Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/regirock.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/regirock.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Regice: {
    Name: "Regice",
    stats: {
      hp: 364, attack: 218, defence: 328, specialAttack: 328, specialDefence: 548, speed: 218
    },
    types: ["Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/regice.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/regice.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Registeel: {
    Name: "Registeel",
    stats: {
      hp: 364, attack: 273, defence: 438, specialAttack: 273, specialDefence: 438, speed: 218
    },
    types: ["Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/registeel.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/registeel.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Latias: {
    Name: "Latias",
    stats: {
      hp: 364, attack: 284, defence: 306, specialAttack: 350, specialDefence: 394, speed: 350
    },
    types: ["Dragon Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/latias.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/latias.mp3",
    evolutions: [],
    forms: {
      Mega: {
        stats: {
          hp: 364, attack: 328, defence: 372, specialAttack: 416, specialDefence: 438, speed: 350
        },
        types: ["Dragon Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/latias-mega.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/latias-mega.mp3",
        tier: "Mega",
        source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
        isSeparateEntry: false
      }
    },
    tier: "Legendary"
  },

  Latios: {
    Name: "Latios",
    stats: {
      hp: 364, attack: 306, defence: 284, specialAttack: 394, specialDefence: 350, speed: 350
    },
    types: ["Dragon Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/latios.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/latios.mp3",
    evolutions: [],
    forms: {
      Mega: {
        stats: {
          hp: 364, attack: 394, defence: 328, specialAttack: 460, specialDefence: 372, speed: 350
        },
        types: ["Dragon Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/latios-mega.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/latios-mega.mp3",
        tier: "Mega",
        source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
        isSeparateEntry: false
      }
    },
    tier: "Legendary"
  },

  Kyogre: {
    Name: "Kyogre",
    stats: {
      hp: 404, attack: 328, defence: 306, specialAttack: 438, specialDefence: 416, speed: 306
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/kyogre.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/kyogre.mp3",
    evolutions: [],
    forms: {
      Primal: {
        Name: "Kyogre Primal",
        stats: {
          hp: 404, attack: 438, defence: 306, specialAttack: 504, specialDefence: 460, speed: 306
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/kyogre-primal.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/kyogre-primal.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Groudon: {
    Name: "Groudon",
    stats: {
      hp: 404, attack: 438, defence: 416, specialAttack: 328, specialDefence: 306, speed: 306
    },
    types: ["Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/groudon.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/groudon.mp3",
    evolutions: [],
    forms: {
      Primal: {
        Name: "Groudon Primal",
        stats: {
          hp: 404, attack: 504, defence: 460, specialAttack: 438, specialDefence: 306, speed: 306
        },
        types: ["Ground Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/groudon-primal.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/groudon-primal.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Rayquaza: {
    Name: "Rayquaza",
    stats: {
      hp: 414, attack: 438, defence: 306, specialAttack: 438, specialDefence: 306, speed: 317
    },
    types: ["Dragon Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/rayquaza.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/rayquaza.mp3",
    evolutions: [],
    forms: {
      Mega: {
        stats: {
          hp: 414, attack: 504, defence: 328, specialAttack: 504, specialDefence: 328, speed: 361
        },
        types: ["Dragon Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/rayquaza-mega.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/rayquaza-mega.mp3",
        tier: "Mega",
        source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
        isSeparateEntry: false
      }
    },
    tier: "Legendary"
  },

  Jirachi: {
    Name: "Jirachi",
    stats: {
      hp: 404, attack: 328, defence: 328, specialAttack: 328, specialDefence: 328, speed: 328
    },
    types: ["Steel Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/jirachi.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/jirachi.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Mythical"
  },

  Deoxys: {
    Name: "Deoxys",
    stats: {
      hp: 304, attack: 438, defence: 218, specialAttack: 438, specialDefence: 218, speed: 438
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/deoxys.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/deoxys.mp3",
    evolutions: [],
    forms: {
      Attack: {
        Name: "Deoxys Attack",
        stats: {
          hp: 304, attack: 504, defence: 152, specialAttack: 504, specialDefence: 152, speed: 438
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/deoxys-attack.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/deoxys-attack.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Defense: {
        Name: "Deoxys Defense",
        stats: {
          hp: 304, attack: 262, defence: 460, specialAttack: 262, specialDefence: 460, speed: 306
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/deoxys-defense.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/deoxys-defense.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      speed: {
        Name: "Deoxys speed",
        stats: {
          hp: 304, attack: 317, defence: 306, specialAttack: 317, specialDefence: 306, speed: 504
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/deoxys-speed.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/deoxys-speed.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Mythical"
  },

  Turtwig: {
    Name: "Turtwig",
    stats: {
      hp: 314, attack: 258, defence: 249, specialAttack: 207, specialDefence: 229, speed: 177
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/turtwig.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/turtwig.mp3",
    evolutions: [
      {
        Name: "Grotle",
        stats: {
          hp: 354, attack: 304, defence: 295, specialAttack: 229, specialDefence: 251, speed: 188
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/grotle.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/grotle.mp3",
        evolutions: [
          {
            Name: "Torterra",
            stats: {
              hp: 394, attack: 348, defence: 339, specialAttack: 273, specialDefence: 295, speed: 232
            },
            types: ["Grass Ground"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/torterra.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/torterra.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Chimchar: {
    Name: "Chimchar",
    stats: {
      hp: 292, attack: 236, defence: 205, specialAttack: 236, specialDefence: 205, speed: 243
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/chimchar.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/chimchar.mp3",
    evolutions: [
      {
        Name: "Monferno",
        stats: {
          hp: 332, attack: 280, defence: 223, specialAttack: 280, specialDefence: 223, speed: 287
        },
        types: ["Fire Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/monferno.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/monferno.mp3",
        evolutions: [
          {
            Name: "Infernape",
            stats: {
              hp: 356, attack: 337, defence: 265, specialAttack: 337, specialDefence: 265, speed: 346
            },
            types: ["Fire Fighting"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/infernape.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/infernape.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Piplup: {
    Name: "Piplup",
    stats: {
      hp: 310, attack: 221, defence: 225, specialAttack: 243, specialDefence: 232, speed: 196
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/piplup.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/piplup.mp3",
    evolutions: [
      {
        Name: "Prinplup",
        stats: {
          hp: 332, attack: 254, defence: 258, specialAttack: 287, specialDefence: 276, speed: 218
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/prinplup.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/prinplup.mp3",
        evolutions: [
          {
            Name: "Empoleon",
            stats: {
              hp: 372, attack: 298, defence: 302, specialAttack: 353, specialDefence: 331, speed: 240
            },
            types: ["Water Steel"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/empoleon.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/empoleon.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Starly: {
    Name: "Starly",
    stats: {
      hp: 284, attack: 229, defence: 174, specialAttack: 174, specialDefence: 174, speed: 240
    },
    types: ["Normal Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/starly.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/starly.mp3",
    evolutions: [
      {
        Name: "Staravia",
        stats: {
          hp: 314, attack: 273, defence: 218, specialAttack: 196, specialDefence: 196, speed: 284
        },
        types: ["Normal Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/staravia.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/staravia.mp3",
        evolutions: [
          {
            Name: "Staraptor",
            stats: {
              hp: 374, attack: 372, defence: 262, specialAttack: 218, specialDefence: 240, speed: 328
            },
            types: ["Normal Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/staraptor.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/staraptor.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Bidoof: {
    Name: "Bidoof",
    stats: {
      hp: 322, attack: 207, defence: 196, specialAttack: 185, specialDefence: 196, speed: 177
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bidoof.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/bidoof.mp3",
    evolutions: [
      {
        Name: "Bibarel",
        stats: {
          hp: 362, attack: 295, defence: 240, specialAttack: 229, specialDefence: 240, speed: 265
        },
        types: ["Normal Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/bibarel.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/bibarel.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Kricketot: {
    Name: "Kricketot",
    stats: {
      hp: 278, attack: 163, defence: 199, specialAttack: 163, specialDefence: 199, speed: 163
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/kricketot.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/kricketot.mp3",
    evolutions: [
      {
        Name: "Kricketune",
        stats: {
          hp: 358, attack: 295, defence: 221, specialAttack: 229, specialDefence: 221, speed: 251
        },
        types: ["Bug"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/kricketune.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/kricketune.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Shinx: {
    Name: "Shinx",
    stats: {
      hp: 294, attack: 251, defence: 183, specialAttack: 196, specialDefence: 183, speed: 207
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/shinx.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/shinx.mp3",
    evolutions: [
      {
        Name: "Luxio",
        stats: {
          hp: 324, attack: 295, defence: 216, specialAttack: 240, specialDefence: 216, speed: 240
        },
        types: ["Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/luxio.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/luxio.mp3",
        evolutions: [
          {
            Name: "Luxray",
            stats: {
              hp: 364, attack: 372, defence: 282, specialAttack: 317, specialDefence: 282, speed: 262
            },
            types: ["Electric"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/luxray.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/luxray.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Budew: {
    Name: "Budew",
    stats: {
      hp: 284, attack: 174, defence: 185, specialAttack: 218, specialDefence: 262, speed: 229
    },
    types: ["Grass Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/budew.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/budew.mp3",
    evolutions: [
      {
        Name: "Roselia",
        stats: {
          hp: 304, attack: 240, defence: 207, specialAttack: 328, specialDefence: 284, speed: 251
        },
        types: ["Grass Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/roselia.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/roselia.mp3",
        evolutions: [
          {
            Name: "Roserade",
            stats: {
              hp: 324, attack: 262, defence: 251, specialAttack: 383, specialDefence: 339, speed: 306
            },
            types: ["Grass Poison"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/roserade.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/roserade.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Cranidos: {
    Name: "Cranidos",
    stats: {
      hp: 338, attack: 383, defence: 196, specialAttack: 174, specialDefence: 174, speed: 236
    },
    types: ["Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cranidos.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cranidos.mp3",
    evolutions: [
      {
        Name: "Rampardos",
        stats: {
          hp: 398, attack: 471, defence: 240, specialAttack: 251, specialDefence: 218, speed: 236
        },
        types: ["Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/rampardos.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/rampardos.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Shieldon: {
    Name: "Shieldon",
    stats: {
      hp: 264, attack: 201, defence: 368, specialAttack: 201, specialDefence: 302, speed: 174
    },
    types: ["Rock Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/shieldon.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/shieldon.mp3",
    evolutions: [
      {
        Name: "Bastiodon",
        stats: {
          hp: 324, attack: 223, defence: 478, specialAttack: 212, specialDefence: 412, speed: 174
        },
        types: ["Rock Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/bastiodon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/bastiodon.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Burmy: {
    Name: "Burmy",
    stats: {
      hp: 284, attack: 172, defence: 207, specialAttack: 172, specialDefence: 207, speed: 188
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/burmy.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/burmy.mp3",
    evolutions: [
      {
        Name: "Wormadam",
        stats: {
          hp: 324, attack: 238, defence: 295, specialAttack: 282, specialDefence: 339, speed: 188
        },
        types: ["Bug Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/wormadam.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/wormadam.mp3",
        evolutions: [],
        forms: {
          Sandy: {
            Name: "Wormadam Sandy",
            stats: {
              hp: 324, attack: 282, defence: 339, specialAttack: 238, specialDefence: 295, speed: 188
            },
            types: ["Bug Ground"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/wormadam-sandy.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/wormadam-sandy.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Trash: {
            Name: "Wormadam Trash",
            stats: {
              hp: 324, attack: 260, defence: 317, specialAttack: 260, specialDefence: 317, speed: 188
            },
            types: ["Bug Steel"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/wormadam-trash.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/wormadam-trash.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      },
      { Name: "mothim" }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Mothim: {
    Name: "Mothim",
    stats: {
      hp: 344, attack: 315, defence: 218, specialAttack: 315, specialDefence: 218, speed: 254
    },
    types: ["Bug Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/mothim.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/mothim.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Combee: {
    Name: "Combee",
    stats: {
      hp: 264, attack: 174, defence: 201, specialAttack: 174, specialDefence: 201, speed: 262
    },
    types: ["Bug Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/combee.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/combee.mp3",
    evolutions: [
      {
        Name: "Vespiquen",
        stats: {
          hp: 344, attack: 284, defence: 333, specialAttack: 284, specialDefence: 333, speed: 196
        },
        types: ["Bug Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/vespiquen.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/vespiquen.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Pachirisu: {
    Name: "Pachirisu",
    stats: {
      hp: 324, attack: 207, defence: 262, specialAttack: 207, specialDefence: 306, speed: 317
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pachirisu.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pachirisu.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Buizel: {
    Name: "Buizel",
    stats: {
      hp: 314, attack: 251, defence: 185, specialAttack: 240, specialDefence: 174, speed: 295
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/buizel.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/buizel.mp3",
    evolutions: [
      {
        Name: "Floatzel",
        stats: {
          hp: 374, attack: 339, defence: 229, specialAttack: 295, specialDefence: 218, speed: 361
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/floatzel.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/floatzel.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Cherubi: {
    Name: "Cherubi",
    stats: {
      hp: 294, attack: 185, defence: 207, specialAttack: 245, specialDefence: 225, speed: 185
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cherubi.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cherubi.mp3",
    evolutions: [
      {
        Name: "Cherrim",
        stats: {
          hp: 344, attack: 240, defence: 262, specialAttack: 300, specialDefence: 280, speed: 295
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/cherrim.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/cherrim.mp3",
        evolutions: [],
        forms: {
          Sunshine: {
            Name: "Cherrim Sunshine",
            stats: {
              hp: 344, attack: 240, defence: 262, specialAttack: 300, specialDefence: 280, speed: 295
            },
            types: ["Grass"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/cherrim-sunshine.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/cherrim-sunshine.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Shellos: {
    Name: "Shellos",
    stats: {
      hp: 356, attack: 214, defence: 214, specialAttack: 234, specialDefence: 245, speed: 183
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/shellos.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/shellos.mp3",
    evolutions: [
      {
        Name: "Gastrodon",
        stats: {
          hp: 426, attack: 291, defence: 258, specialAttack: 311, specialDefence: 289, speed: 194
        },
        types: ["Water Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/gastrodon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/gastrodon.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Drifloon: {
    Name: "Drifloon",
    stats: {
      hp: 384, attack: 218, defence: 183, specialAttack: 240, specialDefence: 205, speed: 262
    },
    types: ["Ghost Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/drifloon.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/drifloon.mp3",
    evolutions: [
      {
        Name: "Drifblim",
        stats: {
          hp: 504, attack: 284, defence: 205, specialAttack: 306, specialDefence: 227, speed: 284
        },
        types: ["Ghost Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/drifblim.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/drifblim.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Buneary: {
    Name: "Buneary",
    stats: {
      hp: 314, attack: 254, defence: 205, specialAttack: 205, specialDefence: 232, speed: 295
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/buneary.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/buneary.mp3",
    evolutions: [
      {
        Name: "Lopunny",
        stats: {
          hp: 334, attack: 276, defence: 293, specialAttack: 227, specialDefence: 320, speed: 339
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/lopunny.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/lopunny.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 334, attack: 408, defence: 315, specialAttack: 227, specialDefence: 320, speed: 405
            },
            types: ["Normal Fighting"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/lopunny-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/lopunny-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Glameow: {
    Name: "Glameow",
    stats: {
      hp: 302, attack: 229, defence: 201, specialAttack: 201, specialDefence: 190, speed: 295
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/glameow.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/glameow.mp3",
    evolutions: [
      {
        Name: "Purugly",
        stats: {
          hp: 346, attack: 289, defence: 249, specialAttack: 249, specialDefence: 238, speed: 355
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/purugly.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/purugly.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Chingling: {
    Name: "Chingling",
    stats: {
      hp: 294, attack: 174, defence: 218, specialAttack: 251, specialDefence: 218, speed: 207
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/chingling.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/chingling.mp3",
    evolutions: [
      {
        Name: "Chimecho",
        stats: {
          hp: 354, attack: 218, defence: 284, specialAttack: 317, specialDefence: 306, speed: 251
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/chimecho.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/chimecho.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Stunky: {
    Name: "Stunky",
    stats: {
      hp: 330, attack: 247, defence: 212, specialAttack: 199, specialDefence: 199, speed: 271
    },
    types: ["Poison Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/stunky.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/stunky.mp3",
    evolutions: [
      {
        Name: "Skuntank",
        stats: {
          hp: 410, attack: 313, defence: 256, specialAttack: 265, specialDefence: 243, speed: 293
        },
        types: ["Poison Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/skuntank.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/skuntank.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Bronzor: {
    Name: "Bronzor",
    stats: {
      hp: 318, attack: 161, defence: 298, specialAttack: 161, specialDefence: 298, speed: 159
    },
    types: ["Steel Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bronzor.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/bronzor.mp3",
    evolutions: [
      {
        Name: "Bronzong",
        stats: {
          hp: 338, attack: 304, defence: 364, specialAttack: 282, specialDefence: 364, speed: 181
        },
        types: ["Steel Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/bronzong.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/bronzong.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Bonsly: {
    Name: "Bonsly",
    stats: {
      hp: 304, attack: 284, defence: 317, specialAttack: 130, specialDefence: 207, speed: 130
    },
    types: ["Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bonsly.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/bonsly.mp3",
    evolutions: [
      {
        Name: "Sudowoodo",
        stats: {
          hp: 344, attack: 328, defence: 361, specialAttack: 174, specialDefence: 251, speed: 174
        },
        types: ["Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sudowoodo.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sudowoodo.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  MimeJr: {
    Name: "Mime Jr.",
    stats: {
      hp: 244, attack: 163, defence: 207, specialAttack: 262, specialDefence: 306, speed: 240
    },
    types: ["Psychic Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/mimejr.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/mimejr.mp3",
    evolutions: [
      {
        Name: "Mr. Mime",
        stats: {
          hp: 284, attack: 207, defence: 251, specialAttack: 328, specialDefence: 372, speed: 306
        },
        types: ["Psychic Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/mrmime.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/mrmime.mp3",
        evolutions: [
          {
            Name: "Mr. Rime",
            stats: {
              hp: 364, attack: 295, defence: 273, specialAttack: 350, specialDefence: 328, speed: 262
            },
            types: ["Ice Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/mrrime.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/mrrime.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {
          Galar: {
            stats: {
              hp: 284, attack: 207, defence: 251, specialAttack: 328, specialDefence: 372, speed: 306
            },
            types: ["Psychic Fairy"],
            sprite: "",
            cry: "",
            tier: "Mid",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mr._Mime_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Galar: {
            Name: "Mr. Mime Galar",
            stats: {
              hp: 304, attack: 251, defence: 251, specialAttack: 306, specialDefence: 306, speed: 328
            },
            types: ["Ice Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/mrmime-galar.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/mrmime.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Happiny: {
    Name: "Happiny",
    stats: {
      hp: 404, attack: 119, defence: 119, specialAttack: 141, specialDefence: 251, speed: 174
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/happiny.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/happiny.mp3",
    evolutions: [
      {
        Name: "Chansey",
        stats: {
          hp: 704, attack: 119, defence: 119, specialAttack: 185, specialDefence: 339, speed: 218
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/chansey.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/chansey.mp3",
        evolutions: [
          {
            Name: "Blissey",
            stats: {
              hp: 714, attack: 130, defence: 130, specialAttack: 273, specialDefence: 405, speed: 229
            },
            types: ["Normal"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/blissey.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/blissey.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Chatot: {
    Name: "Chatot",
    stats: {
      hp: 356, attack: 251, defence: 207, specialAttack: 311, specialDefence: 201, speed: 309
    },
    types: ["Normal Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/chatot.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/chatot.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Spiritomb: {
    Name: "Spiritomb",
    stats: {
      hp: 304, attack: 311, defence: 346, specialAttack: 311, specialDefence: 346, speed: 185
    },
    types: ["Ghost Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/spiritomb.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/spiritomb.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Gible: {
    Name: "Gible",
    stats: {
      hp: 320, attack: 262, defence: 207, specialAttack: 196, specialDefence: 207, speed: 201
    },
    types: ["Dragon Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/gible.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/gible.mp3",
    evolutions: [
      {
        Name: "Gabite",
        stats: {
          hp: 340, attack: 306, defence: 251, specialAttack: 218, specialDefence: 229, speed: 289
        },
        types: ["Dragon Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/gabite.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/gabite.mp3",
        evolutions: [
          {
            Name: "Garchomp",
            stats: {
              hp: 420, attack: 394, defence: 317, specialAttack: 284, specialDefence: 295, speed: 333
            },
            types: ["Dragon Ground"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/garchomp.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/garchomp.mp3",
            evolutions: [],
            forms: {
              Mega: {
                stats: {
                  hp: 420, attack: 482, defence: 361, specialAttack: 372, specialDefence: 317, speed: 311
                },
                types: ["Dragon Ground"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/garchomp-mega.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/garchomp-mega.mp3",
                tier: "Mega",
                source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Munchlax: {
    Name: "Munchlax",
    stats: {
      hp: 474, attack: 295, defence: 196, specialAttack: 196, specialDefence: 295, speed: 119
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/munchlax.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/munchlax.mp3",
    evolutions: [
      {
        Name: "Snorlax",
        stats: {
          hp: 524, attack: 350, defence: 251, specialAttack: 251, specialDefence: 350, speed: 174
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/snorlax.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/snorlax.mp3",
        evolutions: [],
        forms: {
          Gmax: {
            stats: {
              hp: 524, attack: 350, defence: 251, specialAttack: 251, specialDefence: 350, speed: 174
            },
            types: ["Normal"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/snorlax-gmax.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/snorlax-gmax.mp3",
            tier: "Gmax",
            source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Riolu: {
    Name: "Riolu",
    stats: {
      hp: 284, attack: 262, defence: 196, specialAttack: 185, specialDefence: 196, speed: 240
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/riolu.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/riolu.mp3",
    evolutions: [
      {
        Name: "Lucario",
        stats: {
          hp: 344, attack: 350, defence: 262, specialAttack: 361, specialDefence: 262, speed: 306
        },
        types: ["Fighting Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/lucario.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/lucario.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 344, attack: 427, defence: 302, specialAttack: 416, specialDefence: 262, speed: 355
            },
            types: ["Fighting Steel"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/lucario-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/lucario-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Hippopotas: {
    Name: "Hippopotas",
    stats: {
      hp: 340, attack: 267, defence: 280, specialAttack: 192, specialDefence: 201, speed: 179
    },
    types: ["Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/hippopotas.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/hippopotas.mp3",
    evolutions: [
      {
        Name: "Hippowdon",
        stats: {
          hp: 420, attack: 355, defence: 368, specialAttack: 258, specialDefence: 267, speed: 212
        },
        types: ["Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/hippowdon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/hippowdon.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Skorupi: {
    Name: "Skorupi",
    stats: {
      hp: 284, attack: 218, defence: 306, specialAttack: 174, specialDefence: 229, speed: 251
    },
    types: ["Poison Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/skorupi.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/skorupi.mp3",
    evolutions: [
      {
        Name: "Drapion",
        stats: {
          hp: 344, attack: 306, defence: 350, specialAttack: 240, specialDefence: 273, speed: 317
        },
        types: ["Poison Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/drapion.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/drapion.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Croagunk: {
    Name: "Croagunk",
    stats: {
      hp: 300, attack: 243, defence: 196, specialAttack: 243, specialDefence: 196, speed: 218
    },
    types: ["Poison Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/croagunk.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/croagunk.mp3",
    evolutions: [
      {
        Name: "Toxicroak",
        stats: {
          hp: 370, attack: 342, defence: 251, specialAttack: 298, specialDefence: 251, speed: 295
        },
        types: ["Poison Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/toxicroak.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/toxicroak.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Carnivine: {
    Name: "Carnivine",
    stats: {
      hp: 352, attack: 328, defence: 267, specialAttack: 306, specialDefence: 267, speed: 210
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/carnivine.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/carnivine.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Finneon: {
    Name: "Finneon",
    stats: {
      hp: 302, attack: 216, defence: 232, specialAttack: 216, specialDefence: 243, speed: 254
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/finneon.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/finneon.mp3",
    evolutions: [
      {
        Name: "Lumineon",
        stats: {
          hp: 342, attack: 260, defence: 276, specialAttack: 260, specialDefence: 298, speed: 309
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/lumineon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/lumineon.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Mantyke: {
    Name: "Mantyke",
    stats: {
      hp: 294, attack: 152, defence: 218, specialAttack: 240, specialDefence: 372, speed: 218
    },
    types: ["Water Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/mantyke.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/mantyke.mp3",
    evolutions: [
      {
        Name: "Mantine",
        stats: {
          hp: 374, attack: 196, defence: 262, specialAttack: 284, specialDefence: 416, speed: 262
        },
        types: ["Water Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/mantine.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/mantine.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Snover: {
    Name: "Snover",
    stats: {
      hp: 324, attack: 245, defence: 218, specialAttack: 245, specialDefence: 240, speed: 196
    },
    types: ["Grass Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/snover.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/snover.mp3",
    evolutions: [
      {
        Name: "Abomasnow",
        stats: {
          hp: 384, attack: 311, defence: 273, specialAttack: 311, specialDefence: 295, speed: 240
        },
        types: ["Grass Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/abomasnow.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/abomasnow.mp3",
        evolutions: [],
        forms: {
          Mega: {
            stats: {
              hp: 384, attack: 399, defence: 339, specialAttack: 399, specialDefence: 339, speed: 174
            },
            types: ["Grass Ice"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/abomasnow-mega.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/abomasnow-mega.mp3",
            tier: "Mega",
            source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Gallade: {
    Name: "Gallade",
    stats: {
      hp: 340, attack: 383, defence: 251, specialAttack: 251, specialDefence: 361, speed: 284
    },
    types: ["Psychic Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/gallade.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/gallade.mp3",
    evolutions: [],
    forms: {
      Mega: {
        stats: {
          hp: 340, attack: 471, defence: 317, specialAttack: 251, specialDefence: 361, speed: 350
        },
        types: ["Psychic Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/gallade-mega.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/gallade-mega.mp3",
        tier: "Mega",
        source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
        isSeparateEntry: false
      }
    },
    tier: "Final"
  },

  Froslass: {
    Name: "Froslass",
    stats: {
      hp: 344, attack: 284, defence: 262, specialAttack: 284, specialDefence: 262, speed: 350
    },
    types: ["Ice Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/froslass.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/froslass.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Rotom: {
    Name: "Rotom",
    stats: {
      hp: 304, attack: 218, defence: 278, specialAttack: 317, specialDefence: 278, speed: 309
    },
    types: ["Electric Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/rotom.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/rotom.mp3",
    evolutions: [],
    forms: {
      Fan: {
        Name: "Rotom Fan",
        stats: {
          hp: 304, attack: 251, defence: 344, specialAttack: 339, specialDefence: 344, speed: 298
        },
        types: ["Electric Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/rotom-fan.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/rotom-fan.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Frost: {
        Name: "Rotom Frost",
        stats: {
          hp: 304, attack: 251, defence: 344, specialAttack: 339, specialDefence: 344, speed: 298
        },
        types: ["Electric Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/rotom-frost.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/rotom-frost.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Heat: {
        Name: "Rotom Heat",
        stats: {
          hp: 304, attack: 251, defence: 344, specialAttack: 339, specialDefence: 344, speed: 298
        },
        types: ["Electric Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/rotom-heat.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/rotom-heat.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Mow: {
        Name: "Rotom Mow",
        stats: {
          hp: 304, attack: 251, defence: 344, specialAttack: 339, specialDefence: 344, speed: 298
        },
        types: ["Electric Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/rotom-mow.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/rotom-mow.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Wash: {
        Name: "Rotom Wash",
        stats: {
          hp: 304, attack: 251, defence: 344, specialAttack: 339, specialDefence: 344, speed: 298
        },
        types: ["Electric Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/rotom-wash.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/rotom-wash.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Final"
  },

  Uxie: {
    Name: "Uxie",
    stats: {
      hp: 354, attack: 273, defence: 394, specialAttack: 273, specialDefence: 394, speed: 317
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/uxie.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/uxie.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Mesprit: {
    Name: "Mesprit",
    stats: {
      hp: 364, attack: 339, defence: 339, specialAttack: 339, specialDefence: 339, speed: 284
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/mesprit.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/mesprit.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Azelf: {
    Name: "Azelf",
    stats: {
      hp: 354, attack: 383, defence: 262, specialAttack: 383, specialDefence: 262, speed: 361
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/azelf.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/azelf.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Dialga: {
    Name: "Dialga",
    stats: {
      hp: 404, attack: 372, defence: 372, specialAttack: 438, specialDefence: 328, speed: 306
    },
    types: ["Steel Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/dialga.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/dialga.mp3",
    evolutions: [],
    forms: {
      Origin: {
        Name: "Dialga Origin",
        stats: {
          hp: 404, attack: 328, defence: 372, specialAttack: 438, specialDefence: 372, speed: 306
        },
        types: ["Steel Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/gen5/dialga-origin.png",
        cry: "https://play.pokemonshowdown.com/audio/cries/dialga.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Palkia: {
    Name: "Palkia",
    stats: {
      hp: 384, attack: 372, defence: 328, specialAttack: 438, specialDefence: 372, speed: 328
    },
    types: ["Water Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/palkia.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/palkia.mp3",
    evolutions: [],
    forms: {
      Origin: {
        Name: "Palkia Origin",
        stats: {
          hp: 384, attack: 328, defence: 328, specialAttack: 438, specialDefence: 372, speed: 372
        },
        types: ["Water Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/gen5/palkia-origin.png",
        cry: "https://play.pokemonshowdown.com/audio/cries/palkia.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Heatran: {
    Name: "Heatran",
    stats: {
      hp: 386, attack: 306, defence: 342, specialAttack: 394, specialDefence: 342, speed: 278
    },
    types: ["Fire Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/heatran.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/heatran.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Regigigas: {
    Name: "Regigigas",
    stats: {
      hp: 424, attack: 460, defence: 350, specialAttack: 284, specialDefence: 350, speed: 328
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/regigigas.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/regigigas.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Giratina: {
    Name: "Giratina",
    stats: {
      hp: 504, attack: 328, defence: 372, specialAttack: 328, specialDefence: 372, speed: 306
    },
    types: ["Ghost Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/giratina.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/giratina.mp3",
    evolutions: [],
    forms: {
      Origin: {
        Name: "Giratina Origin",
        stats: {
          hp: 504, attack: 372, defence: 328, specialAttack: 372, specialDefence: 328, speed: 306
        },
        types: ["Ghost Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/giratina-origin.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/giratina-origin.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Cresselia: {
    Name: "Cresselia",
    stats: {
      hp: 444, attack: 262, defence: 350, specialAttack: 273, specialDefence: 372, speed: 295
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cresselia.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cresselia.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Phione: {
    Name: "Phione",
    stats: {
      hp: 364, attack: 284, defence: 284, specialAttack: 284, specialDefence: 284, speed: 284
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/phione.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/phione.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Mythical"
  },

  Manaphy: {
    Name: "Manaphy",
    stats: {
      hp: 404, attack: 328, defence: 328, specialAttack: 328, specialDefence: 328, speed: 328
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/manaphy.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/manaphy.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Mythical"
  },

  Darkrai: {
    Name: "Darkrai",
    stats: {
      hp: 344, attack: 306, defence: 306, specialAttack: 405, specialDefence: 306, speed: 383
    },
    types: ["Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/darkrai.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/darkrai.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Mythical"
  },

  Shaymin: {
    Name: "Shaymin",
    stats: {
      hp: 404, attack: 328, defence: 328, specialAttack: 328, specialDefence: 328, speed: 328
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/shaymin.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/shaymin.mp3",
    evolutions: [],
    forms: {
      Sky: {
        Name: "Shaymin Sky",
        stats: {
          hp: 404, attack: 335, defence: 273, specialAttack: 372, specialDefence: 273, speed: 388
        },
        types: ["Grass Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/shaymin-sky.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/shaymin-sky.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Mythical"
  },

  Arceus: {
    Name: "Arceus",
    stats: {
      hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/arceus.mp3",
    evolutions: [],
    forms: {
      Bug: {
        Name: "Arceus Bug",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Bug"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-bug.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-bug.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Dark: {
        Name: "Arceus Dark",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-dark.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-dark.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Dragon: {
        Name: "Arceus Dragon",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-dragon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-dragon.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Electric: {
        Name: "Arceus Electric",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-electric.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-electric.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Fairy: {
        Name: "Arceus Fairy",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-fairy.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-fairy.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Fighting: {
        Name: "Arceus Fighting",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-fighting.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-fighting.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Fire: {
        Name: "Arceus Fire",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-fire.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-fire.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Flying: {
        Name: "Arceus Flying",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-flying.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-flying.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Ghost: {
        Name: "Arceus Ghost",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-ghost.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-ghost.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Grass: {
        Name: "Arceus Grass",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-grass.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-grass.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Ground: {
        Name: "Arceus Ground",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-ground.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-ground.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Ice: {
        Name: "Arceus Ice",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-ice.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-ice.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Poison: {
        Name: "Arceus Poison",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-poison.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-poison.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Psychic: {
        Name: "Arceus Psychic",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-psychic.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-psychic.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Rock: {
        Name: "Arceus Rock",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-rock.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-rock.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Steel: {
        Name: "Arceus Steel",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-steel.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-steel.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Water: {
        Name: "Arceus Water",
        stats: {
          hp: 444, attack: 372, defence: 372, specialAttack: 372, specialDefence: 372, speed: 372
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arceus-water.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arceus-water.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Mythical"
  },

  Victini: {
    Name: "Victini",
    stats: {
      hp: 404, attack: 328, defence: 328, specialAttack: 328, specialDefence: 328, speed: 328
    },
    types: ["Psychic Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/victini.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/victini.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Mythical"
  },

  Snivy: {
    Name: "Snivy",
    stats: {
      hp: 294, attack: 207, defence: 229, specialAttack: 207, specialDefence: 229, speed: 247
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/snivy.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/snivy.mp3",
    evolutions: [
      {
        Name: "Servine",
        stats: {
          hp: 324, attack: 240, defence: 273, specialAttack: 240, specialDefence: 273, speed: 291
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/servine.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/servine.mp3",
        evolutions: [
          {
            Name: "Serperior",
            stats: {
              hp: 354, attack: 273, defence: 317, specialAttack: 273, specialDefence: 317, speed: 357
            },
            types: ["Grass"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/serperior.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/serperior.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Tepig: {
    Name: "Tepig",
    stats: {
      hp: 334, attack: 247, defence: 207, specialAttack: 207, specialDefence: 207, speed: 207
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tepig.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tepig.mp3",
    evolutions: [
      {
        Name: "Pignite",
        stats: {
          hp: 384, attack: 313, defence: 229, specialAttack: 262, specialDefence: 229, speed: 229
        },
        types: ["Fire Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/pignite.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/pignite.mp3",
        evolutions: [
          {
            Name: "Emboar",
            stats: {
              hp: 424, attack: 379, defence: 251, specialAttack: 328, specialDefence: 251, speed: 251
            },
            types: ["Fire Fighting"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/emboar.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/emboar.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Oshawott: {
    Name: "Oshawott",
    stats: {
      hp: 314, attack: 229, defence: 207, specialAttack: 247, specialDefence: 207, speed: 207
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/oshawott.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/oshawott.mp3",
    evolutions: [
      {
        Name: "Dewott",
        stats: {
          hp: 354, attack: 273, defence: 240, specialAttack: 291, specialDefence: 240, speed: 240
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/dewott.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/dewott.mp3",
        evolutions: [
          {
            Name: "Samurott",
            stats: {
              hp: 394, attack: 328, defence: 295, specialAttack: 346, specialDefence: 262, speed: 262
            },
            types: ["Water"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/samurott.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/samurott.mp3",
            evolutions: [],
            forms: {
              Hisui: {
                stats: {
                  hp: 394, attack: 328, defence: 295, specialAttack: 346, specialDefence: 262, speed: 262
                },
                types: ["Water"],
                sprite: "",
                cry: "",
                tier: "Final",
                source: "https://bulbapedia.bulbagarden.net/wiki/Samurott_%28Pok%C3%A9mon%29",
                isSeparateEntry: false
              },
              Hisui: {
                Name: "Samurott Hisui",
                stats: {
                  hp: 384, attack: 346, defence: 284, specialAttack: 328, specialDefence: 251, speed: 295
                },
                types: ["Water Dark"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/samurott-hisui.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/samurott-hisui.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Patrat: {
    Name: "Patrat",
    stats: {
      hp: 294, attack: 229, defence: 194, specialAttack: 185, specialDefence: 194, speed: 201
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/patrat.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/patrat.mp3",
    evolutions: [
      {
        Name: "Watchog",
        stats: {
          hp: 324, attack: 295, defence: 260, specialAttack: 240, specialDefence: 260, speed: 278
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/watchog.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/watchog.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Lillipup: {
    Name: "Lillipup",
    stats: {
      hp: 294, attack: 240, defence: 207, specialAttack: 163, specialDefence: 207, speed: 229
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/lillipup.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/lillipup.mp3",
    evolutions: [
      {
        Name: "Herdier",
        stats: {
          hp: 334, attack: 284, defence: 251, specialAttack: 185, specialDefence: 251, speed: 240
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/herdier.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/herdier.mp3",
        evolutions: [
          {
            Name: "Stoutland",
            stats: {
              hp: 374, attack: 350, defence: 306, specialAttack: 207, specialDefence: 306, speed: 284
            },
            types: ["Normal"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/stoutland.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/stoutland.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Purrloin: {
    Name: "Purrloin",
    stats: {
      hp: 286, attack: 218, defence: 190, specialAttack: 218, specialDefence: 190, speed: 254
    },
    types: ["Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/purrloin.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/purrloin.mp3",
    evolutions: [
      {
        Name: "Liepard",
        stats: {
          hp: 332, attack: 302, defence: 218, specialAttack: 302, specialDefence: 218, speed: 342
        },
        types: ["Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/liepard.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/liepard.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Pansage: {
    Name: "Pansage",
    stats: {
      hp: 304, attack: 225, defence: 214, specialAttack: 225, specialDefence: 214, speed: 249
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pansage.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pansage.mp3",
    evolutions: [
      {
        Name: "Simisage",
        stats: {
          hp: 354, attack: 324, defence: 247, specialAttack: 324, specialDefence: 247, speed: 331
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/simisage.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/simisage.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Pansear: {
    Name: "Pansear",
    stats: {
      hp: 304, attack: 225, defence: 214, specialAttack: 225, specialDefence: 214, speed: 249
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pansear.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pansear.mp3",
    evolutions: [
      {
        Name: "Simisear",
        stats: {
          hp: 354, attack: 324, defence: 247, specialAttack: 324, specialDefence: 247, speed: 331
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/simisear.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/simisear.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Panpour: {
    Name: "Panpour",
    stats: {
      hp: 304, attack: 225, defence: 214, specialAttack: 225, specialDefence: 214, speed: 249
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/panpour.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/panpour.mp3",
    evolutions: [
      {
        Name: "Simipour",
        stats: {
          hp: 354, attack: 324, defence: 247, specialAttack: 324, specialDefence: 247, speed: 331
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/simipour.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/simipour.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Munna: {
    Name: "Munna",
    stats: {
      hp: 356, attack: 163, defence: 207, specialAttack: 256, specialDefence: 229, speed: 161
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/munna.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/munna.mp3",
    evolutions: [
      {
        Name: "Musharna",
        stats: {
          hp: 436, attack: 229, defence: 295, specialAttack: 344, specialDefence: 317, speed: 172
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/musharna.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/musharna.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Pidove: {
    Name: "Pidove",
    stats: {
      hp: 304, attack: 229, defence: 218, specialAttack: 188, specialDefence: 174, speed: 203
    },
    types: ["Normal Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pidove.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pidove.mp3",
    evolutions: [
      {
        Name: "Tranquill",
        stats: {
          hp: 328, attack: 278, defence: 245, specialAttack: 218, specialDefence: 201, speed: 251
        },
        types: ["Normal Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/tranquill.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/tranquill.mp3",
        evolutions: [
          {
            Name: "Unfezant",
            stats: {
              hp: 364, attack: 361, defence: 284, specialAttack: 251, specialDefence: 229, speed: 313
            },
            types: ["Normal Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/unfezant.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/unfezant.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Blitzle: {
    Name: "Blitzle",
    stats: {
      hp: 294, attack: 240, defence: 179, specialAttack: 218, specialDefence: 179, speed: 276
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/blitzle.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/blitzle.mp3",
    evolutions: [
      {
        Name: "Zebstrika",
        stats: {
          hp: 354, attack: 328, defence: 247, specialAttack: 284, specialDefence: 247, speed: 364
        },
        types: ["Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/zebstrika.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/zebstrika.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Roggenrola: {
    Name: "Roggenrola",
    stats: {
      hp: 314, attack: 273, defence: 295, specialAttack: 163, specialDefence: 163, speed: 141
    },
    types: ["Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/roggenrola.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/roggenrola.mp3",
    evolutions: [
      {
        Name: "Boldore",
        stats: {
          hp: 344, attack: 339, defence: 339, specialAttack: 218, specialDefence: 196, speed: 152
        },
        types: ["Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/boldore.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/boldore.mp3",
        evolutions: [
          {
            Name: "Gigalith",
            stats: {
              hp: 374, attack: 405, defence: 394, specialAttack: 240, specialDefence: 284, speed: 163
            },
            types: ["Rock"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/gigalith.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/gigalith.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Woobat: {
    Name: "Woobat",
    stats: {
      hp: 334, attack: 207, defence: 203, specialAttack: 229, specialDefence: 203, speed: 267
    },
    types: ["Psychic Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/woobat.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/woobat.mp3",
    evolutions: [
      {
        Name: "Swoobat",
        stats: {
          hp: 338, attack: 234, defence: 229, specialAttack: 278, specialDefence: 229, speed: 359
        },
        types: ["Psychic Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/swoobat.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/swoobat.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Drilbur: {
    Name: "Drilbur",
    stats: {
      hp: 324, attack: 295, defence: 196, specialAttack: 174, specialDefence: 207, speed: 258
    },
    types: ["Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/drilbur.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/drilbur.mp3",
    evolutions: [
      {
        Name: "Excadrill",
        stats: {
          hp: 424, attack: 405, defence: 240, specialAttack: 218, specialDefence: 251, speed: 302
        },
        types: ["Ground Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/excadrill.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/excadrill.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Audino: {
    Name: "Audino",
    stats: {
      hp: 410, attack: 240, defence: 298, specialAttack: 240, specialDefence: 298, speed: 218
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/audino.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/audino.mp3",
    evolutions: [],
    forms: {
      Mega: {
        stats: {
          hp: 410, attack: 240, defence: 386, specialAttack: 284, specialDefence: 386, speed: 218
        },
        types: ["Normal Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/audino-mega.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/audino-mega.mp3",
        tier: "Mega",
        source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
        isSeparateEntry: false
      }
    },
    tier: "Final"
  },

  Timburr: {
    Name: "Timburr",
    stats: {
      hp: 354, attack: 284, defence: 229, specialAttack: 163, specialDefence: 185, speed: 185
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/timburr.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/timburr.mp3",
    evolutions: [
      {
        Name: "Gurdurr",
        stats: {
          hp: 374, attack: 339, defence: 295, specialAttack: 196, specialDefence: 218, speed: 196
        },
        types: ["Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/gurdurr.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/gurdurr.mp3",
        evolutions: [
          {
            Name: "Conkeldurr",
            stats: {
              hp: 414, attack: 416, defence: 317, specialAttack: 229, specialDefence: 251, speed: 207
            },
            types: ["Fighting"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/conkeldurr.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/conkeldurr.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Tympole: {
    Name: "Tympole",
    stats: {
      hp: 304, attack: 218, defence: 196, specialAttack: 218, specialDefence: 196, speed: 249
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tympole.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tympole.mp3",
    evolutions: [
      {
        Name: "Palpitoad",
        stats: {
          hp: 354, attack: 251, defence: 229, specialAttack: 251, specialDefence: 229, speed: 260
        },
        types: ["Water Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/palpitoad.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/palpitoad.mp3",
        evolutions: [
          {
            Name: "Seismitoad",
            stats: {
              hp: 414, attack: 317, defence: 273, specialAttack: 295, specialDefence: 273, speed: 271
            },
            types: ["Water Ground"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/seismitoad.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/seismitoad.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Throh: {
    Name: "Throh",
    stats: {
      hp: 444, attack: 328, defence: 295, specialAttack: 174, specialDefence: 295, speed: 207
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/throh.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/throh.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Sawk: {
    Name: "Sawk",
    stats: {
      hp: 354, attack: 383, defence: 273, specialAttack: 174, specialDefence: 273, speed: 295
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sawk.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sawk.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Sewaddle: {
    Name: "Sewaddle",
    stats: {
      hp: 294, attack: 225, defence: 262, specialAttack: 196, specialDefence: 240, speed: 201
    },
    types: ["Bug Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sewaddle.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sewaddle.mp3",
    evolutions: [
      {
        Name: "Swadloon",
        stats: {
          hp: 314, attack: 247, defence: 306, specialAttack: 218, specialDefence: 284, speed: 201
        },
        types: ["Bug Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/swadloon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/swadloon.mp3",
        evolutions: [
          {
            Name: "Leavanny",
            stats: {
              hp: 354, attack: 335, defence: 284, specialAttack: 262, specialDefence: 284, speed: 311
            },
            types: ["Bug Grass"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/leavanny.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/leavanny.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Venipede: {
    Name: "Venipede",
    stats: {
      hp: 264, attack: 207, defence: 238, specialAttack: 174, specialDefence: 194, speed: 234
    },
    types: ["Bug Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/venipede.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/venipede.mp3",
    evolutions: [
      {
        Name: "Whirlipede",
        stats: {
          hp: 284, attack: 229, defence: 326, specialAttack: 196, specialDefence: 282, speed: 212
        },
        types: ["Bug Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/whirlipede.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/whirlipede.mp3",
        evolutions: [
          {
            Name: "Scolipede",
            stats: {
              hp: 324, attack: 328, defence: 304, specialAttack: 229, specialDefence: 260, speed: 355
            },
            types: ["Bug Poison"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/scolipede.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/scolipede.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Cottonee: {
    Name: "Cottonee",
    stats: {
      hp: 284, attack: 168, defence: 240, specialAttack: 190, specialDefence: 218, speed: 254
    },
    types: ["Grass Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cottonee.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cottonee.mp3",
    evolutions: [
      {
        Name: "Whimsicott",
        stats: {
          hp: 324, attack: 256, defence: 295, specialAttack: 278, specialDefence: 273, speed: 364
        },
        types: ["Grass Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/whimsicott.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/whimsicott.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Petilil: {
    Name: "Petilil",
    stats: {
      hp: 294, attack: 185, defence: 218, specialAttack: 262, specialDefence: 218, speed: 174
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/petilil.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/petilil.mp3",
    evolutions: [
      {
        Name: "Lilligant",
        stats: {
          hp: 344, attack: 240, defence: 273, specialAttack: 350, specialDefence: 273, speed: 306
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/lilligant.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/lilligant.mp3",
        evolutions: [],
        forms: {
          Hisui: {
            stats: {
              hp: 344, attack: 240, defence: 273, specialAttack: 350, specialDefence: 273, speed: 306
            },
            types: ["Grass"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Lilligant_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Hisui: {
            Name: "Lilligant Hisui",
            stats: {
              hp: 344, attack: 339, defence: 273, specialAttack: 218, specialDefence: 273, speed: 339
            },
            types: ["Grass Fighting"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/lilligant-hisui.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/lilligant-hisui.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Basculin: {
    Name: "Basculin",
    stats: {
      hp: 344, attack: 311, defence: 251, specialAttack: 284, specialDefence: 229, speed: 324
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/basculin.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/basculin.mp3",
    evolutions: [
      {
        Name: "Basculegion",
        stats: {
          hp: 444, attack: 355, defence: 251, specialAttack: 284, specialDefence: 273, speed: 280
        },
        types: ["Water Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/basculegion.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/basculegion.mp3",
        evolutions: [],
        forms: {
          F: {
            Name: "Basculegion F",
            stats: {
              hp: 444, attack: 311, defence: 251, specialAttack: 328, specialDefence: 273, speed: 280
            },
            types: ["Water Ghost"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/basculegion-f.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/basculegion-f.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      BlueStriped: {
        Name: "Basculin Blue Striped",
        stats: {
          hp: 344, attack: 311, defence: 251, specialAttack: 284, specialDefence: 229, speed: 324
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/basculin-bluestriped.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/basculin.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      WhiteStriped: {
        Name: "Basculin White Striped",
        stats: {
          hp: 344, attack: 311, defence: 251, specialAttack: 284, specialDefence: 229, speed: 324
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/basculin-whitestriped.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/basculin.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Sandile: {
    Name: "Sandile",
    stats: {
      hp: 304, attack: 267, defence: 185, specialAttack: 185, specialDefence: 185, speed: 251
    },
    types: ["Ground Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sandile.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sandile.mp3",
    evolutions: [
      {
        Name: "Krokorok",
        stats: {
          hp: 324, attack: 289, defence: 207, specialAttack: 207, specialDefence: 207, speed: 271
        },
        types: ["Ground Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/krokorok.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/krokorok.mp3",
        evolutions: [
          {
            Name: "Krookodile",
            stats: {
              hp: 394, attack: 366, defence: 284, specialAttack: 251, specialDefence: 262, speed: 311
            },
            types: ["Ground Dark"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/krookodile.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/krookodile.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Darumaka: {
    Name: "Darumaka",
    stats: {
      hp: 344, attack: 306, defence: 207, specialAttack: 141, specialDefence: 207, speed: 218
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/darumaka.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/darumaka.mp3",
    evolutions: [
      {
        Name: "Darmanitan",
        stats: {
          hp: 414, attack: 416, defence: 229, specialAttack: 174, specialDefence: 229, speed: 317
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/darmanitan.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/darmanitan.mp3",
        evolutions: [],
        forms: {
          Galar: {
            Name: "Darmanitan Galar",
            stats: {
              hp: 414, attack: 416, defence: 229, specialAttack: 174, specialDefence: 229, speed: 317
            },
            types: ["Ice"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/darmanitan-galar.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/darmanitan-galar.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Zen: {
            Name: "Darmanitan Zen",
            stats: {
              hp: 414, attack: 174, defence: 339, specialAttack: 416, specialDefence: 339, speed: 229
            },
            types: ["Fire Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/darmanitan-zen.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/darmanitan-zen.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Galar: {
        Name: "Darumaka Galar",
        stats: {
          hp: 344, attack: 306, defence: 207, specialAttack: 141, specialDefence: 207, speed: 218
        },
        types: ["Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/darumaka-galar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/darumaka-galar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Maractus: {
    Name: "Maractus",
    stats: {
      hp: 354, attack: 298, defence: 256, specialAttack: 342, specialDefence: 256, speed: 240
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/maractus.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/maractus.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Dwebble: {
    Name: "Dwebble",
    stats: {
      hp: 304, attack: 251, defence: 295, specialAttack: 185, specialDefence: 185, speed: 229
    },
    types: ["Bug Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/dwebble.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/dwebble.mp3",
    evolutions: [
      {
        Name: "Crustle",
        stats: {
          hp: 344, attack: 339, defence: 383, specialAttack: 251, specialDefence: 273, speed: 207
        },
        types: ["Bug Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/crustle.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/crustle.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Scraggy: {
    Name: "Scraggy",
    stats: {
      hp: 304, attack: 273, defence: 262, specialAttack: 185, specialDefence: 262, speed: 214
    },
    types: ["Dark Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/scraggy.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/scraggy.mp3",
    evolutions: [
      {
        Name: "Scrafty",
        stats: {
          hp: 334, attack: 306, defence: 361, specialAttack: 207, specialDefence: 361, speed: 236
        },
        types: ["Dark Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/scrafty.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/scrafty.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Sigilyph: {
    Name: "Sigilyph",
    stats: {
      hp: 348, attack: 236, defence: 284, specialAttack: 335, specialDefence: 284, speed: 322
    },
    types: ["Psychic Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sigilyph.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sigilyph.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Yamask: {
    Name: "Yamask",
    stats: {
      hp: 280, attack: 174, defence: 295, specialAttack: 229, specialDefence: 251, speed: 174
    },
    types: ["Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/yamask.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/yamask.mp3",
    evolutions: [
      {
        Name: "Cofagrigus",
        stats: {
          hp: 320, attack: 218, defence: 427, specialAttack: 317, specialDefence: 339, speed: 174
        },
        types: ["Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/cofagrigus.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/cofagrigus.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      { Name: "runerigus" }
    ],
    forms: {
      Galar: {
        stats: {
          hp: 280, attack: 174, defence: 295, specialAttack: 229, specialDefence: 251, speed: 174
        },
        types: ["Ghost"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Yamask_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Galar: {
        Name: "Yamask Galar",
        stats: {
          hp: 280, attack: 229, defence: 295, specialAttack: 174, specialDefence: 251, speed: 174
        },
        types: ["Ground Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/yamask-galar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/yamask-galar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Tirtouga: {
    Name: "Tirtouga",
    stats: {
      hp: 312, attack: 280, defence: 335, specialAttack: 225, specialDefence: 207, speed: 157
    },
    types: ["Water Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tirtouga.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tirtouga.mp3",
    evolutions: [
      {
        Name: "Carracosta",
        stats: {
          hp: 352, attack: 346, defence: 401, specialAttack: 291, specialDefence: 251, speed: 179
        },
        types: ["Water Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/carracosta.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/carracosta.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Archen: {
    Name: "Archen",
    stats: {
      hp: 314, attack: 355, defence: 207, specialAttack: 271, specialDefence: 207, speed: 262
    },
    types: ["Rock Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/archen.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/archen.mp3",
    evolutions: [
      {
        Name: "Archeops",
        stats: {
          hp: 354, attack: 416, defence: 251, specialAttack: 355, specialDefence: 251, speed: 350
        },
        types: ["Rock Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/archeops.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/archeops.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Trubbish: {
    Name: "Trubbish",
    stats: {
      hp: 304, attack: 218, defence: 245, specialAttack: 196, specialDefence: 245, speed: 251
    },
    types: ["Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/trubbish.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/trubbish.mp3",
    evolutions: [
      {
        Name: "Garbodor",
        stats: {
          hp: 364, attack: 317, defence: 289, specialAttack: 240, specialDefence: 289, speed: 273
        },
        types: ["Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/garbodor.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/garbodor.mp3",
        evolutions: [],
        forms: {
          Gmax: {
            stats: {
              hp: 364, attack: 317, defence: 289, specialAttack: 240, specialDefence: 289, speed: 273
            },
            types: ["Poison"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/garbodor-gmax.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/garbodor-gmax.mp3",
            tier: "Gmax",
            source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Zorua: {
    Name: "Zorua",
    stats: {
      hp: 284, attack: 251, defence: 196, specialAttack: 284, specialDefence: 196, speed: 251
    },
    types: ["Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/zorua.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/zorua.mp3",
    evolutions: [
      {
        Name: "Zoroark",
        stats: {
          hp: 324, attack: 339, defence: 240, specialAttack: 372, specialDefence: 240, speed: 339
        },
        types: ["Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/zoroark.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/zoroark.mp3",
        evolutions: [],
        forms: {
          Hisui: {
            stats: {
              hp: 324, attack: 339, defence: 240, specialAttack: 372, specialDefence: 240, speed: 339
            },
            types: ["Dark"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Zoroark_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Hisui: {
            Name: "Zoroark Hisui",
            stats: {
              hp: 314, attack: 328, defence: 240, specialAttack: 383, specialDefence: 240, speed: 350
            },
            types: ["Normal Ghost"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/zoroark-hisui.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/zoroark-hisui.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Hisui: {
        stats: {
          hp: 284, attack: 251, defence: 196, specialAttack: 284, specialDefence: 196, speed: 251
        },
        types: ["Dark"],
        sprite: "",
        cry: "",
        tier: "Basic",
        source: "https://bulbapedia.bulbagarden.net/wiki/Zorua_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Hisui: {
        Name: "Zorua Hisui",
        stats: {
          hp: 274, attack: 240, defence: 196, specialAttack: 295, specialDefence: 196, speed: 262
        },
        types: ["Normal Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/zorua-hisui.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/zorua-hisui.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Minccino: {
    Name: "Minccino",
    stats: {
      hp: 314, attack: 218, defence: 196, specialAttack: 196, specialDefence: 196, speed: 273
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/minccino.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/minccino.mp3",
    evolutions: [
      {
        Name: "Cinccino",
        stats: {
          hp: 354, attack: 317, defence: 240, specialAttack: 251, specialDefence: 240, speed: 361
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/cinccino.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/cinccino.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Gothita: {
    Name: "Gothita",
    stats: {
      hp: 294, attack: 174, defence: 218, specialAttack: 229, specialDefence: 251, speed: 207
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/gothita.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/gothita.mp3",
    evolutions: [
      {
        Name: "Gothorita",
        stats: {
          hp: 324, attack: 207, defence: 262, specialAttack: 273, specialDefence: 295, speed: 229
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/gothorita.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/gothorita.mp3",
        evolutions: [
          {
            Name: "Gothitelle",
            stats: {
              hp: 344, attack: 229, defence: 317, specialAttack: 317, specialDefence: 350, speed: 251
            },
            types: ["Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/gothitelle.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/gothitelle.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Solosis: {
    Name: "Solosis",
    stats: {
      hp: 294, attack: 174, defence: 196, specialAttack: 339, specialDefence: 218, speed: 152
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/solosis.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/solosis.mp3",
    evolutions: [
      {
        Name: "Duosion",
        stats: {
          hp: 334, attack: 196, defence: 218, specialAttack: 383, specialDefence: 240, speed: 174
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/duosion.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/duosion.mp3",
        evolutions: [
          {
            Name: "Reuniclus",
            stats: {
              hp: 424, attack: 251, defence: 273, specialAttack: 383, specialDefence: 295, speed: 174
            },
            types: ["Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/reuniclus.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/reuniclus.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Ducklett: {
    Name: "Ducklett",
    stats: {
      hp: 328, attack: 205, defence: 218, specialAttack: 205, specialDefence: 218, speed: 229
    },
    types: ["Water Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/ducklett.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/ducklett.mp3",
    evolutions: [
      {
        Name: "Swanna",
        stats: {
          hp: 354, attack: 300, defence: 247, specialAttack: 300, specialDefence: 247, speed: 324
        },
        types: ["Water Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/swanna.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/swanna.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Vanillite: {
    Name: "Vanillite",
    stats: {
      hp: 276, attack: 218, defence: 218, specialAttack: 251, specialDefence: 240, speed: 205
    },
    types: ["Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/vanillite.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/vanillite.mp3",
    evolutions: [
      {
        Name: "Vanillish",
        stats: {
          hp: 306, attack: 251, defence: 251, specialAttack: 284, specialDefence: 273, speed: 238
        },
        types: ["Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/vanillish.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/vanillish.mp3",
        evolutions: [
          {
            Name: "Vanilluxe",
            stats: {
              hp: 346, attack: 317, defence: 295, specialAttack: 350, specialDefence: 317, speed: 282
            },
            types: ["Ice"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/vanilluxe.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/vanilluxe.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Deerling: {
    Name: "Deerling",
    stats: {
      hp: 324, attack: 240, defence: 218, specialAttack: 196, specialDefence: 218, speed: 273
    },
    types: ["Normal Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/deerling.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/deerling.mp3",
    evolutions: [
      {
        Name: "Sawsbuck",
        stats: {
          hp: 364, attack: 328, defence: 262, specialAttack: 240, specialDefence: 262, speed: 317
        },
        types: ["Normal Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sawsbuck.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sawsbuck.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Emolga: {
    Name: "Emolga",
    stats: {
      hp: 314, attack: 273, defence: 240, specialAttack: 273, specialDefence: 240, speed: 335
    },
    types: ["Electric Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/emolga.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/emolga.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Karrablast: {
    Name: "Karrablast",
    stats: {
      hp: 304, attack: 273, defence: 207, specialAttack: 196, specialDefence: 207, speed: 240
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/karrablast.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/karrablast.mp3",
    evolutions: [
      {
        Name: "Escavalier",
        stats: {
          hp: 344, attack: 405, defence: 339, specialAttack: 240, specialDefence: 339, speed: 152
        },
        types: ["Bug Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/escavalier.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/escavalier.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Foongus: {
    Name: "Foongus",
    stats: {
      hp: 342, attack: 229, defence: 207, specialAttack: 229, specialDefence: 229, speed: 141
    },
    types: ["Grass Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/foongus.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/foongus.mp3",
    evolutions: [
      {
        Name: "Amoonguss",
        stats: {
          hp: 432, attack: 295, defence: 262, specialAttack: 295, specialDefence: 284, speed: 174
        },
        types: ["Grass Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/amoonguss.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/amoonguss.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Frillish: {
    Name: "Frillish",
    stats: {
      hp: 314, attack: 196, defence: 218, specialAttack: 251, specialDefence: 295, speed: 196
    },
    types: ["Water Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/frillish.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/frillish.mp3",
    evolutions: [
      {
        Name: "Jellicent",
        stats: {
          hp: 404, attack: 240, defence: 262, specialAttack: 295, specialDefence: 339, speed: 240
        },
        types: ["Water Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/jellicent.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/jellicent.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Alomomola: {
    Name: "Alomomola",
    stats: {
      hp: 534, attack: 273, defence: 284, specialAttack: 196, specialDefence: 207, speed: 251
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/alomomola.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/alomomola.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Joltik: {
    Name: "Joltik",
    stats: {
      hp: 304, attack: 212, defence: 218, specialAttack: 234, specialDefence: 218, speed: 251
    },
    types: ["Bug Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/joltik.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/joltik.mp3",
    evolutions: [
      {
        Name: "Galvantula",
        stats: {
          hp: 344, attack: 278, defence: 240, specialAttack: 322, specialDefence: 240, speed: 346
        },
        types: ["Bug Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/galvantula.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/galvantula.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Ferroseed: {
    Name: "Ferroseed",
    stats: {
      hp: 292, attack: 218, defence: 309, specialAttack: 161, specialDefence: 298, speed: 130
    },
    types: ["Grass Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/ferroseed.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/ferroseed.mp3",
    evolutions: [
      {
        Name: "Ferrothorn",
        stats: {
          hp: 352, attack: 315, defence: 397, specialAttack: 227, specialDefence: 364, speed: 152
        },
        types: ["Grass Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/ferrothorn.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/ferrothorn.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Tynamo: {
    Name: "Tynamo",
    stats: {
      hp: 274, attack: 229, defence: 196, specialAttack: 207, specialDefence: 196, speed: 240
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tynamo.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tynamo.mp3",
    evolutions: [
      {
        Name: "Eelektrik",
        stats: {
          hp: 334, attack: 295, defence: 262, specialAttack: 273, specialDefence: 262, speed: 196
        },
        types: ["Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/eelektrik.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/eelektrik.mp3",
        evolutions: [
          {
            Name: "Eelektross",
            stats: {
              hp: 374, attack: 361, defence: 284, specialAttack: 339, specialDefence: 284, speed: 218
            },
            types: ["Electric"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/eelektross.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/eelektross.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Elgyem: {
    Name: "Elgyem",
    stats: {
      hp: 314, attack: 229, defence: 229, specialAttack: 295, specialDefence: 229, speed: 174
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/elgyem.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/elgyem.mp3",
    evolutions: [
      {
        Name: "Beheeyem",
        stats: {
          hp: 354, attack: 273, defence: 273, specialAttack: 383, specialDefence: 317, speed: 196
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/beheeyem.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/beheeyem.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Litwick: {
    Name: "Litwick",
    stats: {
      hp: 304, attack: 174, defence: 229, specialAttack: 251, specialDefence: 229, speed: 152
    },
    types: ["Ghost Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/litwick.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/litwick.mp3",
    evolutions: [
      {
        Name: "Lampent",
        stats: {
          hp: 324, attack: 196, defence: 240, specialAttack: 317, specialDefence: 240, speed: 229
        },
        types: ["Ghost Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/lampent.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/lampent.mp3",
        evolutions: [
          {
            Name: "Chandelure",
            stats: {
              hp: 324, attack: 229, defence: 306, specialAttack: 427, specialDefence: 306, speed: 284
            },
            types: ["Ghost Fire"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/chandelure.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/chandelure.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Axew: {
    Name: "Axew",
    stats: {
      hp: 296, attack: 300, defence: 240, specialAttack: 174, specialDefence: 196, speed: 234
    },
    types: ["Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/axew.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/axew.mp3",
    evolutions: [
      {
        Name: "Fraxure",
        stats: {
          hp: 336, attack: 366, defence: 262, specialAttack: 196, specialDefence: 218, speed: 256
        },
        types: ["Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/fraxure.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/fraxure.mp3",
        evolutions: [
          {
            Name: "Haxorus",
            stats: {
              hp: 356, attack: 432, defence: 306, specialAttack: 240, specialDefence: 262, speed: 322
            },
            types: ["Dragon"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/haxorus.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/haxorus.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Cubchoo: {
    Name: "Cubchoo",
    stats: {
      hp: 314, attack: 262, defence: 196, specialAttack: 240, specialDefence: 196, speed: 196
    },
    types: ["Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cubchoo.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cubchoo.mp3",
    evolutions: [
      {
        Name: "Beartic",
        stats: {
          hp: 394, attack: 394, defence: 284, specialAttack: 262, specialDefence: 284, speed: 218
        },
        types: ["Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/beartic.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/beartic.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Cryogonal: {
    Name: "Cryogonal",
    stats: {
      hp: 364, attack: 218, defence: 218, specialAttack: 317, specialDefence: 405, speed: 339
    },
    types: ["Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cryogonal.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cryogonal.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Shelmet: {
    Name: "Shelmet",
    stats: {
      hp: 304, attack: 196, defence: 295, specialAttack: 196, specialDefence: 251, speed: 163
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/shelmet.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/shelmet.mp3",
    evolutions: [
      {
        Name: "Accelgor",
        stats: {
          hp: 364, attack: 262, defence: 196, specialAttack: 328, specialDefence: 240, speed: 427
        },
        types: ["Bug"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/accelgor.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/accelgor.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Stunfisk: {
    Name: "Stunfisk",
    stats: {
      hp: 422, attack: 254, defence: 293, specialAttack: 287, specialDefence: 326, speed: 179
    },
    types: ["Ground Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/stunfisk.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/stunfisk.mp3",
    evolutions: [],
    forms: {
      Galar: {
        stats: {
          hp: 422, attack: 254, defence: 293, specialAttack: 287, specialDefence: 326, speed: 179
        },
        types: ["Ground Electric"],
        sprite: "",
        cry: "",
        tier: "Final",
        source: "https://bulbapedia.bulbagarden.net/wiki/Stunfisk_%28Pok%C3%A9mon%29",
        isSeparateEntry: false
      },
      Galar: {
        Name: "Stunfisk Galar",
        stats: {
          hp: 422, attack: 287, defence: 326, specialAttack: 254, specialDefence: 293, speed: 179
        },
        types: ["Ground Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/stunfisk-galar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/stunfisk-galar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Final"
  },

  Mienfoo: {
    Name: "Mienfoo",
    stats: {
      hp: 294, attack: 295, defence: 218, specialAttack: 229, specialDefence: 218, speed: 251
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/mienfoo.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/mienfoo.mp3",
    evolutions: [
      {
        Name: "Mienshao",
        stats: {
          hp: 334, attack: 383, defence: 240, specialAttack: 317, specialDefence: 240, speed: 339
        },
        types: ["Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/mienshao.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/mienshao.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Druddigon: {
    Name: "Druddigon",
    stats: {
      hp: 358, attack: 372, defence: 306, specialAttack: 240, specialDefence: 306, speed: 214
    },
    types: ["Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/druddigon.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/druddigon.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Golett: {
    Name: "Golett",
    stats: {
      hp: 322, attack: 271, defence: 218, specialAttack: 185, specialDefence: 218, speed: 185
    },
    types: ["Ground Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/golett.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/golett.mp3",
    evolutions: [
      {
        Name: "Golurk",
        stats: {
          hp: 382, attack: 381, defence: 284, specialAttack: 229, specialDefence: 284, speed: 229
        },
        types: ["Ground Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/golurk.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/golurk.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Pawniard: {
    Name: "Pawniard",
    stats: {
      hp: 294, attack: 295, defence: 262, specialAttack: 196, specialDefence: 196, speed: 240
    },
    types: ["Dark Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pawniard.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pawniard.mp3",
    evolutions: [
      {
        Name: "Bisharp",
        stats: {
          hp: 334, attack: 383, defence: 328, specialAttack: 240, specialDefence: 262, speed: 262
        },
        types: ["Dark Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/bisharp.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/bisharp.mp3",
        evolutions: [
          {
            Name: "Kingambit",
            stats: {
              hp: 404, attack: 405, defence: 372, specialAttack: 240, specialDefence: 295, speed: 218
            },
            types: ["Dark Steel"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/kingambit.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/kingambit.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Bouffalant: {
    Name: "Bouffalant",
    stats: {
      hp: 394, attack: 350, defence: 317, specialAttack: 196, specialDefence: 317, speed: 229
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bouffalant.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/bouffalant.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Rufflet: {
    Name: "Rufflet",
    stats: {
      hp: 344, attack: 291, defence: 218, specialAttack: 190, specialDefence: 218, speed: 240
    },
    types: ["Normal Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/rufflet.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/rufflet.mp3",
    evolutions: [
      {
        Name: "Braviary",
        stats: {
          hp: 404, attack: 379, defence: 273, specialAttack: 234, specialDefence: 273, speed: 284
        },
        types: ["Normal Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/braviary.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/braviary.mp3",
        evolutions: [],
        forms: {
          Hisui: {
            stats: {
              hp: 404, attack: 379, defence: 273, specialAttack: 234, specialDefence: 273, speed: 284
            },
            types: ["Normal Flying"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Braviary_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Hisui: {
            Name: "Braviary Hisui",
            stats: {
              hp: 424, attack: 291, defence: 262, specialAttack: 355, specialDefence: 262, speed: 251
            },
            types: ["Psychic Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/braviary-hisui.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/braviary-hisui.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Vullaby: {
    Name: "Vullaby",
    stats: {
      hp: 344, attack: 229, defence: 273, specialAttack: 207, specialDefence: 251, speed: 240
    },
    types: ["Dark Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/vullaby.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/vullaby.mp3",
    evolutions: [
      {
        Name: "Mandibuzz",
        stats: {
          hp: 424, attack: 251, defence: 339, specialAttack: 229, specialDefence: 317, speed: 284
        },
        types: ["Dark Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/mandibuzz.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/mandibuzz.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Heatmor: {
    Name: "Heatmor",
    stats: {
      hp: 374, attack: 322, defence: 254, specialAttack: 339, specialDefence: 254, speed: 251
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/heatmor.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/heatmor.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Durant: {
    Name: "Durant",
    stats: {
      hp: 320, attack: 348, defence: 355, specialAttack: 214, specialDefence: 214, speed: 348
    },
    types: ["Bug Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/durant.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/durant.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Deino: {
    Name: "Deino",
    stats: {
      hp: 308, attack: 251, defence: 218, specialAttack: 207, specialDefence: 218, speed: 192
    },
    types: ["Dark Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/deino.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/deino.mp3",
    evolutions: [
      {
        Name: "Zweilous",
        stats: {
          hp: 348, attack: 295, defence: 262, specialAttack: 251, specialDefence: 262, speed: 236
        },
        types: ["Dark Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/zweilous.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/zweilous.mp3",
        evolutions: [
          {
            Name: "Hydreigon",
            stats: {
              hp: 388, attack: 339, defence: 306, specialAttack: 383, specialDefence: 306, speed: 324
            },
            types: ["Dark Dragon"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/hydreigon.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/hydreigon.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Larvesta: {
    Name: "Larvesta",
    stats: {
      hp: 314, attack: 295, defence: 229, specialAttack: 218, specialDefence: 229, speed: 240
    },
    types: ["Bug Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/larvesta.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/larvesta.mp3",
    evolutions: [
      {
        Name: "Volcarona",
        stats: {
          hp: 374, attack: 240, defence: 251, specialAttack: 405, specialDefence: 339, speed: 328
        },
        types: ["Bug Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/volcarona.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/volcarona.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Cobalion: {
    Name: "Cobalion",
    stats: {
      hp: 386, attack: 306, defence: 392, specialAttack: 306, specialDefence: 267, speed: 346
    },
    types: ["Steel Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cobalion.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cobalion.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Terrakion: {
    Name: "Terrakion",
    stats: {
      hp: 386, attack: 392, defence: 306, specialAttack: 267, specialDefence: 306, speed: 346
    },
    types: ["Rock Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/terrakion.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/terrakion.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Virizion: {
    Name: "Virizion",
    stats: {
      hp: 386, attack: 306, defence: 267, specialAttack: 306, specialDefence: 392, speed: 346
    },
    types: ["Grass Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/virizion.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/virizion.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Tornadus: {
    Name: "Tornadus",
    stats: {
      hp: 362, attack: 361, defence: 262, specialAttack: 383, specialDefence: 284, speed: 353
    },
    types: ["Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tornadus.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tornadus.mp3",
    evolutions: [],
    forms: {
      Therian: {
        Name: "Tornadus Therian",
        stats: {
          hp: 362, attack: 328, defence: 284, specialAttack: 350, specialDefence: 306, speed: 375
        },
        types: ["Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/tornadus-therian.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/tornadus-therian.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Thundurus: {
    Name: "Thundurus",
    stats: {
      hp: 362, attack: 361, defence: 262, specialAttack: 383, specialDefence: 284, speed: 353
    },
    types: ["Electric Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/thundurus.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/thundurus.mp3",
    evolutions: [],
    forms: {
      Therian: {
        Name: "Thundurus Therian",
        stats: {
          hp: 362, attack: 339, defence: 262, specialAttack: 427, specialDefence: 284, speed: 331
        },
        types: ["Electric Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/thundurus-therian.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/thundurus-therian.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Reshiram: {
    Name: "Reshiram",
    stats: {
      hp: 404, attack: 372, defence: 328, specialAttack: 438, specialDefence: 372, speed: 306
    },
    types: ["Dragon Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/reshiram.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/reshiram.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Zekrom: {
    Name: "Zekrom",
    stats: {
      hp: 404, attack: 438, defence: 372, specialAttack: 372, specialDefence: 328, speed: 306
    },
    types: ["Dragon Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/zekrom.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/zekrom.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Landorus: {
    Name: "Landorus",
    stats: {
      hp: 382, attack: 383, defence: 306, specialAttack: 361, specialDefence: 284, speed: 331
    },
    types: ["Ground Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/landorus.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/landorus.mp3",
    evolutions: [],
    forms: {
      Therian: {
        Name: "Landorus Therian",
        stats: {
          hp: 382, attack: 427, defence: 306, specialAttack: 339, specialDefence: 284, speed: 309
        },
        types: ["Ground Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/landorus-therian.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/landorus-therian.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Kyurem: {
    Name: "Kyurem",
    stats: {
      hp: 454, attack: 394, defence: 306, specialAttack: 394, specialDefence: 306, speed: 317
    },
    types: ["Dragon Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/kyurem.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/kyurem.mp3",
    evolutions: [],
    forms: {
      Black: {
        Name: "Kyurem Black",
        stats: {
          hp: 454, attack: 482, defence: 328, specialAttack: 372, specialDefence: 306, speed: 317
        },
        types: ["Dragon Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/kyurem-black.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/kyurem-black.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      White: {
        Name: "Kyurem White",
        stats: {
          hp: 454, attack: 372, defence: 306, specialAttack: 482, specialDefence: 328, speed: 317
        },
        types: ["Dragon Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/kyurem-white.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/kyurem-white.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Keldeo: {
    Name: "Keldeo",
    stats: {
      hp: 386, attack: 267, defence: 306, specialAttack: 392, specialDefence: 306, speed: 346
    },
    types: ["Water Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/keldeo.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/keldeo.mp3",
    evolutions: [],
    forms: {
      Resolute: {
        Name: "Keldeo Resolute",
        stats: {
          hp: 386, attack: 267, defence: 306, specialAttack: 392, specialDefence: 306, speed: 346
        },
        types: ["Water Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/keldeo-resolute.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/keldeo-resolute.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Mythical"
  },

  Meloetta: {
    Name: "Meloetta",
    stats: {
      hp: 404, attack: 278, defence: 278, specialAttack: 390, specialDefence: 390, speed: 306
    },
    types: ["Normal Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/meloetta.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/meloetta.mp3",
    evolutions: [],
    forms: {
      Pirouette: {
        Name: "Meloetta Pirouette",
        stats: {
          hp: 404, attack: 390, defence: 306, specialAttack: 278, specialDefence: 278, speed: 390
        },
        types: ["Normal Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/meloetta-pirouette.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/meloetta-pirouette.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Mythical"
  },

  Genesect: {
    Name: "Genesect",
    stats: {
      hp: 346, attack: 372, defence: 317, specialAttack: 372, specialDefence: 317, speed: 326
    },
    types: ["Bug Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/genesect.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/genesect.mp3",
    evolutions: [],
    forms: {
      Burn: {
        Name: "Genesect Burn",
        stats: {
          hp: 346, attack: 372, defence: 317, specialAttack: 372, specialDefence: 317, speed: 326
        },
        types: ["Bug Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/genesect-burn.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/genesect-burn.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Chill: {
        Name: "Genesect Chill",
        stats: {
          hp: 346, attack: 372, defence: 317, specialAttack: 372, specialDefence: 317, speed: 326
        },
        types: ["Bug Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/genesect-chill.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/genesect-chill.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Douse: {
        Name: "Genesect Douse",
        stats: {
          hp: 346, attack: 372, defence: 317, specialAttack: 372, specialDefence: 317, speed: 326
        },
        types: ["Bug Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/genesect-douse.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/genesect-douse.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Shock: {
        Name: "Genesect Shock",
        stats: {
          hp: 346, attack: 372, defence: 317, specialAttack: 372, specialDefence: 317, speed: 326
        },
        types: ["Bug Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/genesect-shock.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/genesect-shock.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Mythical"
  },

  Chespin: {
    Name: "Chespin",
    stats: {
      hp: 316, attack: 243, defence: 251, specialAttack: 214, specialDefence: 207, speed: 192
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/chespin.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/chespin.mp3",
    evolutions: [
      {
        Name: "Quilladin",
        stats: {
          hp: 326, attack: 280, defence: 317, specialAttack: 232, specialDefence: 236, speed: 234
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/quilladin.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/quilladin.mp3",
        evolutions: [
          {
            Name: "Chesnaught",
            stats: {
              hp: 380, attack: 344, defence: 377, specialAttack: 271, specialDefence: 273, speed: 249
            },
            types: ["Grass Fighting"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/chesnaught.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/chesnaught.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Fennekin: {
    Name: "Fennekin",
    stats: {
      hp: 284, attack: 207, defence: 196, specialAttack: 245, specialDefence: 240, speed: 240
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/fennekin.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/fennekin.mp3",
    evolutions: [
      {
        Name: "Braixen",
        stats: {
          hp: 322, attack: 238, defence: 236, specialAttack: 306, specialDefence: 262, speed: 269
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/braixen.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/braixen.mp3",
        evolutions: [
          {
            Name: "Delphox",
            stats: {
              hp: 354, attack: 260, defence: 267, specialAttack: 359, specialDefence: 328, speed: 337
            },
            types: ["Fire Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/delphox.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/delphox.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Froakie: {
    Name: "Froakie",
    stats: {
      hp: 286, attack: 232, defence: 196, specialAttack: 245, specialDefence: 205, speed: 265
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/froakie.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/froakie.mp3",
    evolutions: [
      {
        Name: "Frogadier",
        stats: {
          hp: 312, attack: 247, defence: 223, specialAttack: 291, specialDefence: 232, speed: 322
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/frogadier.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/frogadier.mp3",
        evolutions: [
          {
            Name: "Greninja",
            stats: {
              hp: 348, attack: 317, defence: 256, specialAttack: 335, specialDefence: 265, speed: 377
            },
            types: ["Water Dark"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/greninja.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/greninja.mp3",
            evolutions: [],
            forms: {
              Ash: {
                Name: "Greninja Ash",
                stats: {
                  hp: 348, attack: 427, defence: 256, specialAttack: 445, specialDefence: 265, speed: 399
                },
                types: ["Water Dark"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/greninja-ash.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/greninja-ash.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              },
              Bond: {
                Name: "Greninja Bond",
                stats: {
                  hp: 348, attack: 317, defence: 256, specialAttack: 335, specialDefence: 265, speed: 377
                },
                types: ["Water Dark"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/greninja.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/greninja.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Bunnelby: {
    Name: "Bunnelby",
    stats: {
      hp: 280, attack: 188, defence: 192, specialAttack: 179, specialDefence: 188, speed: 234
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bunnelby.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/bunnelby.mp3",
    evolutions: [
      {
        Name: "Diggersby",
        stats: {
          hp: 374, attack: 232, defence: 278, specialAttack: 218, specialDefence: 278, speed: 280
        },
        types: ["Normal Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/diggersby.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/diggersby.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Fletchling: {
    Name: "Fletchling",
    stats: {
      hp: 294, attack: 218, defence: 203, specialAttack: 196, specialDefence: 192, speed: 245
    },
    types: ["Normal Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/fletchling.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/fletchling.mp3",
    evolutions: [
      {
        Name: "Fletchinder",
        stats: {
          hp: 328, attack: 269, defence: 229, specialAttack: 232, specialDefence: 223, speed: 293
        },
        types: ["Fire Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/fletchinder.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/fletchinder.mp3",
        evolutions: [
          {
            Name: "Talonflame",
            stats: {
              hp: 360, attack: 287, defence: 265, specialAttack: 271, specialDefence: 260, speed: 386
            },
            types: ["Fire Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/talonflame.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/talonflame.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Scatterbug: {
    Name: "Scatterbug",
    stats: {
      hp: 280, attack: 185, defence: 196, specialAttack: 168, specialDefence: 163, speed: 185
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/scatterbug.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/scatterbug.mp3",
    evolutions: [
      {
        Name: "spdwpa",
        stats: {
          hp: 294, attack: 157, defence: 240, specialAttack: 168, specialDefence: 174, speed: 172
        },
        types: ["Bug"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/spdwpa.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/spdwpa.mp3",
        evolutions: [
          {
            Name: "Vivillon",
            stats: {
              hp: 364, attack: 223, defence: 218, specialAttack: 306, specialDefence: 218, speed: 304
            },
            types: ["Bug Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/vivillon.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/vivillon.mp3",
            evolutions: [],
            forms: {
              Fancy: {
                Name: "Vivillon Fancy",
                stats: {
                  hp: 364, attack: 223, defence: 218, specialAttack: 306, specialDefence: 218, speed: 304
                },
                types: ["Bug Flying"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/vivillon-fancy.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/vivillon-fancy.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              },
              Pokeball: {
                Name: "Vivillon Pokeball",
                stats: {
                  hp: 364, attack: 223, defence: 218, specialAttack: 306, specialDefence: 218, speed: 304
                },
                types: ["Bug Flying"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/vivillon-pokeball.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/vivillon-pokeball.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Litleo: {
    Name: "Litleo",
    stats: {
      hp: 328, attack: 218, defence: 236, specialAttack: 269, specialDefence: 227, speed: 267
    },
    types: ["Fire Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/litleo.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/litleo.mp3",
    evolutions: [
      {
        Name: "Pyroar",
        stats: {
          hp: 376, attack: 258, defence: 267, specialAttack: 348, specialDefence: 254, speed: 342
        },
        types: ["Fire Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/pyroar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/pyroar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  FlabeBe: {
    Name: "Flabe\u0301Be\u0301",
    stats: {
      hp: 292, attack: 192, defence: 194, specialAttack: 243, specialDefence: 282, speed: 201
    },
    types: ["Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/flabebe.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/flabebe.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Skiddo: {
    Name: "Skiddo",
    stats: {
      hp: 336, attack: 251, defence: 214, specialAttack: 245, specialDefence: 234, speed: 223
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/skiddo.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/skiddo.mp3",
    evolutions: [
      {
        Name: "Gogoat",
        stats: {
          hp: 450, attack: 328, defence: 245, specialAttack: 322, specialDefence: 287, speed: 258
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/gogoat.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/gogoat.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Pancham: {
    Name: "Pancham",
    stats: {
      hp: 338, attack: 289, defence: 245, specialAttack: 210, specialDefence: 214, speed: 203
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pancham.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pancham.mp3",
    evolutions: [
      {
        Name: "Pangoro",
        stats: {
          hp: 394, attack: 381, defence: 280, specialAttack: 260, specialDefence: 265, speed: 236
        },
        types: ["Fighting Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/pangoro.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/pangoro.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Furfrou: {
    Name: "Furfrou",
    stats: {
      hp: 354, attack: 284, defence: 240, specialAttack: 251, specialDefence: 306, speed: 333
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/furfrou.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/furfrou.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Espurr: {
    Name: "Espurr",
    stats: {
      hp: 328, attack: 214, defence: 227, specialAttack: 247, specialDefence: 240, speed: 258
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/espurr.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/espurr.mp3",
    evolutions: [
      {
        Name: "Meowstic",
        stats: {
          hp: 352, attack: 214, defence: 276, specialAttack: 291, specialDefence: 287, speed: 337
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/meowstic.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/meowstic.mp3",
        evolutions: [],
        forms: {
          F: {
            Name: "Meowstic F",
            stats: {
              hp: 352, attack: 214, defence: 276, specialAttack: 291, specialDefence: 287, speed: 337
            },
            types: ["Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/meowstic-f.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/meowstic-f.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Honedge: {
    Name: "Honedge",
    stats: {
      hp: 294, attack: 284, defence: 328, specialAttack: 185, specialDefence: 190, speed: 170
    },
    types: ["Steel Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/honedge.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/honedge.mp3",
    evolutions: [
      {
        Name: "Doublade",
        stats: {
          hp: 322, attack: 350, defence: 438, specialAttack: 207, specialDefence: 216, speed: 185
        },
        types: ["Steel Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/doublade.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/doublade.mp3",
        evolutions: [
          {
            Name: "Aegislash",
            stats: {
              hp: 324, attack: 218, defence: 416, specialAttack: 218, specialDefence: 416, speed: 240
            },
            types: ["Steel Ghost"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/aegislash.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/aegislash.mp3",
            evolutions: [],
            forms: {
              Blade: {
                Name: "Aegislash Blade",
                stats: {
                  hp: 324, attack: 416, defence: 218, specialAttack: 416, specialDefence: 218, speed: 240
                },
                types: ["Steel Ghost"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/aegislash-blade.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/aegislash-blade.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Spritzee: {
    Name: "Spritzee",
    stats: {
      hp: 360, attack: 223, defence: 240, specialAttack: 247, specialDefence: 251, speed: 159
    },
    types: ["Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/spritzee.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/spritzee.mp3",
    evolutions: [
      {
        Name: "Aromatisse",
        stats: {
          hp: 406, attack: 267, defence: 267, specialAttack: 326, specialDefence: 304, speed: 172
        },
        types: ["Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/aromatisse.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/aromatisse.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Swirlix: {
    Name: "Swirlix",
    stats: {
      hp: 328, attack: 214, defence: 254, specialAttack: 238, specialDefence: 234, speed: 216
    },
    types: ["Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/swirlix.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/swirlix.mp3",
    evolutions: [
      {
        Name: "Slurpuff",
        stats: {
          hp: 368, attack: 284, defence: 298, specialAttack: 295, specialDefence: 273, speed: 267
        },
        types: ["Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/slurpuff.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/slurpuff.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Inkay: {
    Name: "Inkay",
    stats: {
      hp: 310, attack: 227, defence: 225, specialAttack: 190, specialDefence: 210, speed: 207
    },
    types: ["Dark Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/inkay.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/inkay.mp3",
    evolutions: [
      {
        Name: "Malamar",
        stats: {
          hp: 376, attack: 311, defence: 302, specialAttack: 258, specialDefence: 273, speed: 269
        },
        types: ["Dark Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/malamar.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/malamar.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Binacle: {
    Name: "Binacle",
    stats: {
      hp: 288, attack: 223, defence: 256, specialAttack: 194, specialDefence: 232, speed: 218
    },
    types: ["Rock Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/binacle.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/binacle.mp3",
    evolutions: [
      {
        Name: "Barbaracle",
        stats: {
          hp: 348, attack: 339, defence: 361, specialAttack: 227, specialDefence: 298, speed: 258
        },
        types: ["Rock Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/barbaracle.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/barbaracle.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Skrelp: {
    Name: "Skrelp",
    stats: {
      hp: 304, attack: 240, defence: 240, specialAttack: 240, specialDefence: 240, speed: 174
    },
    types: ["Poison Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/skrelp.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/skrelp.mp3",
    evolutions: [
      {
        Name: "Dragalge",
        stats: {
          hp: 334, attack: 273, defence: 306, specialAttack: 322, specialDefence: 379, speed: 205
        },
        types: ["Poison Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/dragalge.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/dragalge.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Clauncher: {
    Name: "Clauncher",
    stats: {
      hp: 304, attack: 225, defence: 245, specialAttack: 236, specialDefence: 247, speed: 205
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/clauncher.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/clauncher.mp3",
    evolutions: [
      {
        Name: "Clawitzer",
        stats: {
          hp: 346, attack: 269, defence: 302, specialAttack: 372, specialDefence: 304, speed: 238
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/clawitzer.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/clawitzer.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Helioptile: {
    Name: "Helioptile",
    stats: {
      hp: 292, attack: 192, defence: 181, specialAttack: 243, specialDefence: 203, speed: 262
    },
    types: ["Electric Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/helioptile.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/helioptile.mp3",
    evolutions: [
      {
        Name: "Heliolisk",
        stats: {
          hp: 328, attack: 229, defence: 223, specialAttack: 348, specialDefence: 315, speed: 348
        },
        types: ["Electric Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/heliolisk.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/heliolisk.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Tyrunt: {
    Name: "Tyrunt",
    stats: {
      hp: 320, attack: 304, defence: 278, specialAttack: 207, specialDefence: 207, speed: 214
    },
    types: ["Rock Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tyrunt.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tyrunt.mp3",
    evolutions: [
      {
        Name: "Tyrantrum",
        stats: {
          hp: 368, attack: 375, defence: 370, specialAttack: 260, specialDefence: 238, speed: 265
        },
        types: ["Rock Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/tyrantrum.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/tyrantrum.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Amaura: {
    Name: "Amaura",
    stats: {
      hp: 358, attack: 238, defence: 218, specialAttack: 256, specialDefence: 247, speed: 210
    },
    types: ["Rock Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/amaura.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/amaura.mp3",
    evolutions: [
      {
        Name: "Aurorus",
        stats: {
          hp: 450, attack: 278, defence: 267, specialAttack: 326, specialDefence: 311, speed: 236
        },
        types: ["Rock Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/aurorus.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/aurorus.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Hawlucha: {
    Name: "Hawlucha",
    stats: {
      hp: 360, attack: 311, defence: 273, specialAttack: 271, specialDefence: 247, speed: 368
    },
    types: ["Fighting Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/hawlucha.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/hawlucha.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Dedenne: {
    Name: "Dedenne",
    stats: {
      hp: 338, attack: 236, defence: 234, specialAttack: 287, specialDefence: 256, speed: 331
    },
    types: ["Electric Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/dedenne.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/dedenne.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Carbink: {
    Name: "Carbink",
    stats: {
      hp: 304, attack: 218, defence: 438, specialAttack: 218, specialDefence: 438, speed: 218
    },
    types: ["Rock Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/carbink.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/carbink.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Goomy: {
    Name: "Goomy",
    stats: {
      hp: 294, attack: 218, defence: 185, specialAttack: 229, specialDefence: 273, speed: 196
    },
    types: ["Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/goomy.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/goomy.mp3",
    evolutions: [
      {
        Name: "Sliggoo",
        stats: {
          hp: 340, attack: 273, defence: 225, specialAttack: 291, specialDefence: 357, speed: 240
        },
        types: ["Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sliggoo.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sliggoo.mp3",
        evolutions: [
          {
            Name: "Goodra",
            stats: {
              hp: 384, attack: 328, defence: 262, specialAttack: 350, specialDefence: 438, speed: 284
            },
            types: ["Dragon"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/goodra.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/goodra.mp3",
            evolutions: [],
            forms: {
              Hisui: {
                stats: {
                  hp: 384, attack: 328, defence: 262, specialAttack: 350, specialDefence: 438, speed: 284
                },
                types: ["Dragon"],
                sprite: "",
                cry: "",
                tier: "Final",
                source: "https://bulbapedia.bulbagarden.net/wiki/Goodra_%28Pok%C3%A9mon%29",
                isSeparateEntry: false
              },
              Hisui: {
                Name: "Goodra Hisui",
                stats: {
                  hp: 364, attack: 328, defence: 328, specialAttack: 350, specialDefence: 438, speed: 240
                },
                types: ["Steel Dragon"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/goodra-hisui.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/goodra-hisui.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              }
            },
            tier: "Final"
          }
        ],
        forms: {
          Hisui: {
            stats: {
              hp: 340, attack: 273, defence: 225, specialAttack: 291, specialDefence: 357, speed: 240
            },
            types: ["Dragon"],
            sprite: "",
            cry: "",
            tier: "Mid",
            source: "https://bulbapedia.bulbagarden.net/wiki/Sliggoo_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Hisui: {
            Name: "Sliggoo Hisui",
            stats: {
              hp: 320, attack: 273, defence: 291, specialAttack: 291, specialDefence: 357, speed: 196
            },
            types: ["Steel Dragon"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/sliggoo-hisui.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/sliggoo-hisui.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Klefki: {
    Name: "Klefki",
    stats: {
      hp: 318, attack: 284, defence: 309, specialAttack: 284, specialDefence: 300, speed: 273
    },
    types: ["Steel Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/klefki.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/klefki.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Phantump: {
    Name: "Phantump",
    stats: {
      hp: 290, attack: 262, defence: 214, specialAttack: 218, specialDefence: 240, speed: 192
    },
    types: ["Ghost Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/phantump.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/phantump.mp3",
    evolutions: [
      {
        Name: "Trevenant",
        stats: {
          hp: 374, attack: 350, defence: 276, specialAttack: 251, specialDefence: 289, speed: 232
        },
        types: ["Ghost Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/trevenant.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/trevenant.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Pumpkaboo: {
    Name: "Pumpkaboo",
    stats: {
      hp: 302, attack: 254, defence: 262, specialAttack: 205, specialDefence: 229, speed: 221
    },
    types: ["Ghost Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pumpkaboo.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pumpkaboo.mp3",
    evolutions: [
      {
        Name: "Gourgeist",
        stats: {
          hp: 334, attack: 306, defence: 377, specialAttack: 236, specialDefence: 273, speed: 293
        },
        types: ["Ghost Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/gourgeist.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/gourgeist.mp3",
        evolutions: [],
        forms: {
          Large: {
            Name: "Gourgeist Large",
            stats: {
              hp: 354, attack: 317, defence: 377, specialAttack: 236, specialDefence: 273, speed: 260
            },
            types: ["Ghost Grass"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/gourgeist-large.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/gourgeist-large.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Small: {
            Name: "Gourgeist Small",
            stats: {
              hp: 314, attack: 295, defence: 377, specialAttack: 236, specialDefence: 273, speed: 326
            },
            types: ["Ghost Grass"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/gourgeist-small.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/gourgeist-small.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Super: {
            Name: "Gourgeist Super",
            stats: {
              hp: 374, attack: 328, defence: 377, specialAttack: 236, specialDefence: 273, speed: 227
            },
            types: ["Ghost Grass"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/gourgeist-super.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/gourgeist-super.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Large: {
        Name: "Pumpkaboo Large",
        stats: {
          hp: 312, attack: 254, defence: 262, specialAttack: 205, specialDefence: 229, speed: 210
        },
        types: ["Ghost Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/pumpkaboo-large.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/pumpkaboo-large.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Small: {
        Name: "Pumpkaboo Small",
        stats: {
          hp: 292, attack: 254, defence: 262, specialAttack: 205, specialDefence: 229, speed: 232
        },
        types: ["Ghost Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/pumpkaboo-small.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/pumpkaboo-small.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Super: {
        Name: "Pumpkaboo Super",
        stats: {
          hp: 322, attack: 254, defence: 262, specialAttack: 205, specialDefence: 229, speed: 199
        },
        types: ["Ghost Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/pumpkaboo-super.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/pumpkaboo-super.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Bergmite: {
    Name: "Bergmite",
    stats: {
      hp: 314, attack: 260, defence: 295, specialAttack: 179, specialDefence: 185, speed: 170
    },
    types: ["Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bergmite.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/bergmite.mp3",
    evolutions: [
      {
        Name: "Avalugg",
        stats: {
          hp: 394, attack: 366, defence: 513, specialAttack: 205, specialDefence: 210, speed: 170
        },
        types: ["Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/avalugg.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/avalugg.mp3",
        evolutions: [],
        forms: {
          Hisui: {
            stats: {
              hp: 394, attack: 366, defence: 513, specialAttack: 205, specialDefence: 210, speed: 170
            },
            types: ["Ice"],
            sprite: "",
            cry: "",
            tier: "Final",
            source: "https://bulbapedia.bulbagarden.net/wiki/Avalugg_%28Pok%C3%A9mon%29",
            isSeparateEntry: false
          },
          Hisui: {
            Name: "Avalugg Hisui",
            stats: {
              hp: 394, attack: 388, defence: 513, specialAttack: 183, specialDefence: 188, speed: 192
            },
            types: ["Ice Rock"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/avalugg-hisui.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/avalugg-hisui.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Noibat: {
    Name: "Noibat",
    stats: {
      hp: 284, attack: 174, defence: 185, specialAttack: 207, specialDefence: 196, speed: 229
    },
    types: ["Flying Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/noibat.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/noibat.mp3",
    evolutions: [
      {
        Name: "Noivern",
        stats: {
          hp: 374, attack: 262, defence: 284, specialAttack: 322, specialDefence: 284, speed: 379
        },
        types: ["Flying Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/noivern.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/noivern.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Xerneas: {
    Name: "Xerneas",
    stats: {
      hp: 456, attack: 397, defence: 317, specialAttack: 397, specialDefence: 324, speed: 326
    },
    types: ["Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/xerneas.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/xerneas.mp3",
    evolutions: [],
    forms: {
      Neutral: {
        Name: "Xerneas Neutral",
        stats: {
          hp: 456, attack: 397, defence: 317, specialAttack: 397, specialDefence: 324, speed: 326
        },
        types: ["Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/xerneas-neutral.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/xerneas-neutral.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Yveltal: {
    Name: "Yveltal",
    stats: {
      hp: 456, attack: 397, defence: 317, specialAttack: 397, specialDefence: 324, speed: 326
    },
    types: ["Dark Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/yveltal.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/yveltal.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Zygarde: {
    Name: "Zygarde",
    stats: {
      hp: 420, attack: 328, defence: 375, specialAttack: 287, specialDefence: 317, speed: 317
    },
    types: ["Dragon Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/zygarde.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/zygarde.mp3",
    evolutions: [],
    forms: {
      10: {
        Name: "Zygarde 10%",
        stats: {
          hp: 312, attack: 328, defence: 265, specialAttack: 243, specialDefence: 295, speed: 361
        },
        types: ["Dragon Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/zygarde-10.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/zygarde-10.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Complete: {
        Name: "Zygarde Complete",
        stats: {
          hp: 636, attack: 328, defence: 375, specialAttack: 309, specialDefence: 317, speed: 295
        },
        types: ["Dragon Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/zygarde-complete.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/zygarde-complete.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Diancie: {
    Name: "Diancie",
    stats: {
      hp: 304, attack: 328, defence: 438, specialAttack: 328, specialDefence: 438, speed: 218
    },
    types: ["Rock Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/diancie.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/diancie.mp3",
    evolutions: [],
    forms: {
      Mega: {
        stats: {
          hp: 304, attack: 460, defence: 350, specialAttack: 460, specialDefence: 350, speed: 350
        },
        types: ["Rock Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/diancie-mega.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/diancie-mega.mp3",
        tier: "Mega",
        source: "https://bulbapedia.bulbagarden.net/wiki/Mega_Evolution",
        isSeparateEntry: false
      }
    },
    tier: "Mythical"
  },

  Hoopa: {
    Name: "Hoopa",
    stats: {
      hp: 364, attack: 350, defence: 240, specialAttack: 438, specialDefence: 394, speed: 262
    },
    types: ["Psychic Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/hoopa.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/hoopa.mp3",
    evolutions: [],
    forms: {
      Unbound: {
        Name: "Hoopa Unbound",
        stats: {
          hp: 364, attack: 460, defence: 240, specialAttack: 482, specialDefence: 394, speed: 284
        },
        types: ["Psychic Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/hoopa-unbound.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/hoopa-unbound.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Mythical"
  },

  Volcanion: {
    Name: "Volcanion",
    stats: {
      hp: 364, attack: 350, defence: 372, specialAttack: 394, specialDefence: 306, speed: 262
    },
    types: ["Fire Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/volcanion.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/volcanion.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Mythical"
  },

  Rowlet: {
    Name: "Rowlet",
    stats: {
      hp: 340, attack: 229, defence: 229, specialAttack: 218, specialDefence: 218, speed: 201
    },
    types: ["Grass Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/rowlet.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/rowlet.mp3",
    evolutions: [
      {
        Name: "Dartrix",
        stats: {
          hp: 360, attack: 273, defence: 273, specialAttack: 262, specialDefence: 262, speed: 223
        },
        types: ["Grass Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/dartrix.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/dartrix.mp3",
        evolutions: [
          {
            Name: "Decidueye",
            stats: {
              hp: 360, attack: 344, defence: 273, specialAttack: 328, specialDefence: 328, speed: 262
            },
            types: ["Grass Ghost"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/decidueye.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/decidueye.mp3",
            evolutions: [],
            forms: {
              Hisui: {
                stats: {
                  hp: 360, attack: 344, defence: 273, specialAttack: 328, specialDefence: 328, speed: 262
                },
                types: ["Grass Ghost"],
                sprite: "",
                cry: "",
                tier: "Final",
                source: "https://bulbapedia.bulbagarden.net/wiki/Decidueye_%28Pok%C3%A9mon%29",
                isSeparateEntry: false
              },
              Hisui: {
                Name: "Decidueye Hisui",
                stats: {
                  hp: 380, attack: 355, defence: 284, specialAttack: 317, specialDefence: 317, speed: 240
                },
                types: ["Grass Fighting"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/decidueye-hisui.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/decidueye-hisui.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Litten: {
    Name: "Litten",
    stats: {
      hp: 294, attack: 251, defence: 196, specialAttack: 240, specialDefence: 196, speed: 262
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/litten.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/litten.mp3",
    evolutions: [
      {
        Name: "Torracat",
        stats: {
          hp: 334, attack: 295, defence: 218, specialAttack: 284, specialDefence: 218, speed: 306
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/torracat.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/torracat.mp3",
        evolutions: [
          {
            Name: "Incineroar",
            stats: {
              hp: 394, attack: 361, defence: 306, specialAttack: 284, specialDefence: 306, speed: 240
            },
            types: ["Fire Dark"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/incineroar.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/incineroar.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Popplio: {
    Name: "Popplio",
    stats: {
      hp: 304, attack: 227, defence: 227, specialAttack: 254, specialDefence: 232, speed: 196
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/popplio.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/popplio.mp3",
    evolutions: [
      {
        Name: "Brionne",
        stats: {
          hp: 324, attack: 260, defence: 260, specialAttack: 309, specialDefence: 287, speed: 218
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/brionne.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/brionne.mp3",
        evolutions: [
          {
            Name: "Primarina",
            stats: {
              hp: 364, attack: 271, defence: 271, specialAttack: 386, specialDefence: 364, speed: 240
            },
            types: ["Water Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/primarina.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/primarina.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Pikipek: {
    Name: "Pikipek",
    stats: {
      hp: 274, attack: 273, defence: 174, specialAttack: 174, specialDefence: 174, speed: 251
    },
    types: ["Normal Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pikipek.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pikipek.mp3",
    evolutions: [
      {
        Name: "Trumbeak",
        stats: {
          hp: 314, attack: 295, defence: 218, specialAttack: 196, specialDefence: 218, speed: 273
        },
        types: ["Normal Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/trumbeak.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/trumbeak.mp3",
        evolutions: [
          {
            Name: "Toucannon",
            stats: {
              hp: 364, attack: 372, defence: 273, specialAttack: 273, specialDefence: 273, speed: 240
            },
            types: ["Normal Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/toucannon.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/toucannon.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Yungoos: {
    Name: "Yungoos",
    stats: {
      hp: 300, attack: 262, defence: 174, specialAttack: 174, specialDefence: 174, speed: 207
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/yungoos.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/yungoos.mp3",
    evolutions: [
      {
        Name: "Gumshoos",
        stats: {
          hp: 380, attack: 350, defence: 240, specialAttack: 229, specialDefence: 240, speed: 207
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/gumshoos.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/gumshoos.mp3",
        evolutions: [],
        forms: {
          Totem: {
            Name: "Gumshoos Totem",
            stats: {
              hp: 380, attack: 350, defence: 240, specialAttack: 229, specialDefence: 240, speed: 207
            },
            types: ["Normal"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/gumshoos-totem.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/gumshoos-totem.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Grubbin: {
    Name: "Grubbin",
    stats: {
      hp: 298, attack: 245, defence: 207, specialAttack: 229, specialDefence: 207, speed: 210
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/grubbin.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/grubbin.mp3",
    evolutions: [
      {
        Name: "Charjabug",
        stats: {
          hp: 318, attack: 289, defence: 317, specialAttack: 229, specialDefence: 273, speed: 188
        },
        types: ["Bug Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/charjabug.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/charjabug.mp3",
        evolutions: [
          {
            Name: "Vikavolt",
            stats: {
              hp: 358, attack: 262, defence: 306, specialAttack: 427, specialDefence: 273, speed: 203
            },
            types: ["Bug Electric"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/vikavolt.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/vikavolt.mp3",
            evolutions: [],
            forms: {
              Totem: {
                Name: "Vikavolt Totem",
                stats: {
                  hp: 358, attack: 262, defence: 306, specialAttack: 427, specialDefence: 273, speed: 203
                },
                types: ["Bug Electric"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/vikavolt-totem.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/vikavolt-totem.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Crabrawler: {
    Name: "Crabrawler",
    stats: {
      hp: 298, attack: 289, defence: 234, specialAttack: 201, specialDefence: 212, speed: 247
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/crabrawler.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/crabrawler.mp3",
    evolutions: [
      {
        Name: "Crabominable",
        stats: {
          hp: 398, attack: 399, defence: 278, specialAttack: 245, specialDefence: 256, speed: 203
        },
        types: ["Fighting Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/crabominable.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/crabominable.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Oricorio: {
    Name: "Oricorio",
    stats: {
      hp: 354, attack: 262, defence: 262, specialAttack: 324, specialDefence: 262, speed: 313
    },
    types: ["Fire Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/oricorio.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/oricorio.mp3",
    evolutions: [],
    forms: {
      PaU: {
        Name: "Oricorio Pa'U",
        stats: {
          hp: 354, attack: 262, defence: 262, specialAttack: 324, specialDefence: 262, speed: 313
        },
        types: ["Psychic Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/oricorio-pau.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/oricorio-pau.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      PomPom: {
        Name: "Oricorio Pom Pom",
        stats: {
          hp: 354, attack: 262, defence: 262, specialAttack: 324, specialDefence: 262, speed: 313
        },
        types: ["Electric Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/oricorio-pompom.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/oricorio-pompom.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Sensu: {
        Name: "Oricorio Sensu",
        stats: {
          hp: 354, attack: 262, defence: 262, specialAttack: 324, specialDefence: 262, speed: 313
        },
        types: ["Ghost Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/oricorio-sensu.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/oricorio-sensu.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Final"
  },

  Cutiefly: {
    Name: "Cutiefly",
    stats: {
      hp: 284, attack: 207, defence: 196, specialAttack: 229, specialDefence: 196, speed: 293
    },
    types: ["Bug Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cutiefly.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cutiefly.mp3",
    evolutions: [
      {
        Name: "Ribombee",
        stats: {
          hp: 324, attack: 229, defence: 240, specialAttack: 317, specialDefence: 262, speed: 381
        },
        types: ["Bug Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/ribombee.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/ribombee.mp3",
        evolutions: [],
        forms: {
          Totem: {
            Name: "Ribombee Totem",
            stats: {
              hp: 324, attack: 229, defence: 240, specialAttack: 317, specialDefence: 262, speed: 381
            },
            types: ["Bug Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/ribombee.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/ribombee.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Rockruff: {
    Name: "Rockruff",
    stats: {
      hp: 294, attack: 251, defence: 196, specialAttack: 174, specialDefence: 196, speed: 240
    },
    types: ["Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/rockruff.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/rockruff.mp3",
    evolutions: [
      {
        Name: "Lycanroc",
        stats: {
          hp: 354, attack: 361, defence: 251, specialAttack: 229, specialDefence: 251, speed: 355
        },
        types: ["Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/lycanroc.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/lycanroc.mp3",
        evolutions: [],
        forms: {
          Dusk: {
            Name: "Lycanroc Dusk",
            stats: {
              hp: 354, attack: 366, defence: 251, specialAttack: 229, specialDefence: 251, speed: 350
            },
            types: ["Rock"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/lycanroc-dusk.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/lycanroc-dusk.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Midnight: {
            Name: "Lycanroc Midnight",
            stats: {
              hp: 374, attack: 361, defence: 273, specialAttack: 229, specialDefence: 273, speed: 289
            },
            types: ["Rock"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/lycanroc-midnight.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/lycanroc-midnight.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Dusk: {
        Name: "Rockruff Dusk",
        stats: {
          hp: 294, attack: 251, defence: 196, specialAttack: 174, specialDefence: 196, speed: 240
        },
        types: ["Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/rockruff.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/rockruff.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Wishiwashi: {
    Name: "Wishiwashi",
    stats: {
      hp: 294, attack: 152, defence: 152, specialAttack: 163, specialDefence: 163, speed: 196
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/wishiwashi.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/wishiwashi.mp3",
    evolutions: [],
    forms: {
      School: {
        Name: "Wishiwashi School",
        stats: {
          hp: 294, attack: 416, defence: 394, specialAttack: 416, specialDefence: 405, speed: 174
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/wishiwashi-school.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/wishiwashi-school.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Final"
  },

  Mareanie: {
    Name: "Mareanie",
    stats: {
      hp: 304, attack: 225, defence: 245, specialAttack: 203, specialDefence: 223, speed: 207
    },
    types: ["Poison Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/mareanie.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/mareanie.mp3",
    evolutions: [
      {
        Name: "Toxapex",
        stats: {
          hp: 304, attack: 247, defence: 443, specialAttack: 225, specialDefence: 421, speed: 185
        },
        types: ["Poison Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/toxapex.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/toxapex.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Mudbray: {
    Name: "Mudbray",
    stats: {
      hp: 344, attack: 328, defence: 262, specialAttack: 207, specialDefence: 229, speed: 207
    },
    types: ["Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/mudbray.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/mudbray.mp3",
    evolutions: [
      {
        Name: "Mudsdale",
        stats: {
          hp: 404, attack: 383, defence: 328, specialAttack: 229, specialDefence: 295, speed: 185
        },
        types: ["Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/mudsdale.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/mudsdale.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Dewpider: {
    Name: "Dewpider",
    stats: {
      hp: 280, attack: 196, defence: 223, specialAttack: 196, specialDefence: 267, speed: 168
    },
    types: ["Water Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/dewpider.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/dewpider.mp3",
    evolutions: [
      {
        Name: "Araquanid",
        stats: {
          hp: 340, attack: 262, defence: 311, specialAttack: 218, specialDefence: 399, speed: 201
        },
        types: ["Water Bug"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/araquanid.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/araquanid.mp3",
        evolutions: [],
        forms: {
          Totem: {
            Name: "Araquanid Totem",
            stats: {
              hp: 340, attack: 262, defence: 311, specialAttack: 218, specialDefence: 399, speed: 201
            },
            types: ["Water Bug"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/araquanid-totem.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/araquanid-totem.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Fomantis: {
    Name: "Fomantis",
    stats: {
      hp: 284, attack: 229, defence: 185, specialAttack: 218, specialDefence: 185, speed: 185
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/fomantis.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/fomantis.mp3",
    evolutions: [
      {
        Name: "Lurantis",
        stats: {
          hp: 344, attack: 339, defence: 306, specialAttack: 284, specialDefence: 306, speed: 207
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/lurantis.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/lurantis.mp3",
        evolutions: [],
        forms: {
          Totem: {
            Name: "Lurantis Totem",
            stats: {
              hp: 344, attack: 339, defence: 306, specialAttack: 284, specialDefence: 306, speed: 207
            },
            types: ["Grass"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/lurantis-totem.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/lurantis-totem.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Morelull: {
    Name: "Morelull",
    stats: {
      hp: 284, attack: 185, defence: 229, specialAttack: 251, specialDefence: 273, speed: 141
    },
    types: ["Grass Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/morelull.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/morelull.mp3",
    evolutions: [
      {
        Name: "Shiinotic",
        stats: {
          hp: 324, attack: 207, defence: 284, specialAttack: 306, specialDefence: 328, speed: 174
        },
        types: ["Grass Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/shiinotic.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/shiinotic.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Salandit: {
    Name: "Salandit",
    stats: {
      hp: 300, attack: 205, defence: 196, specialAttack: 265, specialDefence: 196, speed: 278
    },
    types: ["Poison Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/salandit.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/salandit.mp3",
    evolutions: [
      {
        Name: "Salazzle",
        stats: {
          hp: 340, attack: 249, defence: 240, specialAttack: 353, specialDefence: 240, speed: 366
        },
        types: ["Poison Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/salazzle.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/salazzle.mp3",
        evolutions: [],
        forms: {
          Totem: {
            Name: "Salazzle Totem",
            stats: {
              hp: 340, attack: 249, defence: 240, specialAttack: 353, specialDefence: 240, speed: 366
            },
            types: ["Poison Fire"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/salazzle-totem.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/salazzle-totem.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Stufful: {
    Name: "Stufful",
    stats: {
      hp: 344, attack: 273, defence: 218, specialAttack: 207, specialDefence: 218, speed: 218
    },
    types: ["Normal Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/stufful.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/stufful.mp3",
    evolutions: [
      {
        Name: "Bewear",
        stats: {
          hp: 444, attack: 383, defence: 284, specialAttack: 229, specialDefence: 240, speed: 240
        },
        types: ["Normal Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/bewear.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/bewear.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Bounsweet: {
    Name: "Bounsweet",
    stats: {
      hp: 288, attack: 174, defence: 192, specialAttack: 174, specialDefence: 192, speed: 179
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bounsweet.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/bounsweet.mp3",
    evolutions: [
      {
        Name: "Steenee",
        stats: {
          hp: 308, attack: 196, defence: 214, specialAttack: 196, specialDefence: 214, speed: 245
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/steenee.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/steenee.mp3",
        evolutions: [
          {
            Name: "Tsareena",
            stats: {
              hp: 348, attack: 372, defence: 324, specialAttack: 218, specialDefence: 324, speed: 267
            },
            types: ["Grass"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/tsareena.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/tsareena.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Comfey: {
    Name: "Comfey",
    stats: {
      hp: 306, attack: 223, defence: 306, specialAttack: 289, specialDefence: 350, speed: 328
    },
    types: ["Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/comfey.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/comfey.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Oranguru: {
    Name: "Oranguru",
    stats: {
      hp: 384, attack: 240, defence: 284, specialAttack: 306, specialDefence: 350, speed: 240
    },
    types: ["Normal Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/oranguru.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/oranguru.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Passimian: {
    Name: "Passimian",
    stats: {
      hp: 404, attack: 372, defence: 306, specialAttack: 196, specialDefence: 240, speed: 284
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/passimian.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/passimian.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Wimpod: {
    Name: "Wimpod",
    stats: {
      hp: 254, attack: 185, defence: 196, specialAttack: 152, specialDefence: 174, speed: 284
    },
    types: ["Bug Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/wimpod.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/wimpod.mp3",
    evolutions: [
      {
        Name: "Golisopod",
        stats: {
          hp: 354, attack: 383, defence: 416, specialAttack: 240, specialDefence: 306, speed: 196
        },
        types: ["Bug Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/golisopod.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/golisopod.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Sandygast: {
    Name: "Sandygast",
    stats: {
      hp: 314, attack: 229, defence: 284, specialAttack: 262, specialDefence: 207, speed: 141
    },
    types: ["Ghost Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sandygast.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sandygast.mp3",
    evolutions: [
      {
        Name: "Palossand",
        stats: {
          hp: 374, attack: 273, defence: 350, specialAttack: 328, specialDefence: 273, speed: 185
        },
        types: ["Ghost Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/palossand.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/palossand.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Pyukumuku: {
    Name: "Pyukumuku",
    stats: {
      hp: 314, attack: 240, defence: 394, specialAttack: 174, specialDefence: 394, speed: 119
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pyukumuku.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pyukumuku.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  TypeNull: {
    Name: "Type: Null",
    stats: {
      hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 238
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/typenull.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/typenull.mp3",
    evolutions: [
      {
        Name: "Silvally",
        stats: {
          hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/silvally.mp3",
        evolutions: [],
        forms: {
          Bug: {
            Name: "Silvally Bug",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Bug"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-bug.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-bug.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Dark: {
            Name: "Silvally Dark",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Dark"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-dark.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-dark.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Dragon: {
            Name: "Silvally Dragon",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Dragon"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-dragon.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-dragon.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Electric: {
            Name: "Silvally Electric",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Electric"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-electric.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-electric.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Fairy: {
            Name: "Silvally Fairy",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-fairy.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-fairy.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Fighting: {
            Name: "Silvally Fighting",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Fighting"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-fighting.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-fighting.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Fire: {
            Name: "Silvally Fire",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Fire"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-fire.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-fire.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Flying: {
            Name: "Silvally Flying",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Flying"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-flying.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-flying.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Ghost: {
            Name: "Silvally Ghost",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Ghost"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-ghost.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-ghost.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Grass: {
            Name: "Silvally Grass",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Grass"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-grass.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-grass.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Ground: {
            Name: "Silvally Ground",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Ground"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-ground.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-ground.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Ice: {
            Name: "Silvally Ice",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Ice"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-ice.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-ice.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Poison: {
            Name: "Silvally Poison",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Poison"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-poison.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-poison.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Psychic: {
            Name: "Silvally Psychic",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-psychic.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-psychic.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Rock: {
            Name: "Silvally Rock",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Rock"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-rock.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-rock.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Steel: {
            Name: "Silvally Steel",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Steel"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-steel.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-steel.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          },
          Water: {
            Name: "Silvally Water",
            stats: {
              hp: 394, attack: 317, defence: 317, specialAttack: 317, specialDefence: 317, speed: 317
            },
            types: ["Water"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/silvally-water.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/silvally-water.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Legendary"
      }
    ],
    forms: {

    },
    tier: "Legendary"
  },

  Minior: {
    Name: "Minior",
    stats: {
      hp: 324, attack: 328, defence: 240, specialAttack: 328, specialDefence: 240, speed: 372
    },
    types: ["Rock Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/minior.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/minior.mp3",
    evolutions: [],
    forms: {
      Meteor: {
        Name: "Minior Meteor",
        stats: {
          hp: 324, attack: 240, defence: 328, specialAttack: 240, specialDefence: 328, speed: 240
        },
        types: ["Rock Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/minior-meteor.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/minior-meteor.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Final"
  },

  Komala: {
    Name: "Komala",
    stats: {
      hp: 334, attack: 361, defence: 251, specialAttack: 273, specialDefence: 317, speed: 251
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/komala.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/komala.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Turtonator: {
    Name: "Turtonator",
    stats: {
      hp: 324, attack: 280, defence: 405, specialAttack: 309, specialDefence: 295, speed: 188
    },
    types: ["Fire Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/turtonator.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/turtonator.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Togedemaru: {
    Name: "Togedemaru",
    stats: {
      hp: 334, attack: 324, defence: 247, specialAttack: 196, specialDefence: 269, speed: 320
    },
    types: ["Electric Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/togedemaru.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/togedemaru.mp3",
    evolutions: [],
    forms: {
      Totem: {
        Name: "Togedemaru Totem",
        stats: {
          hp: 334, attack: 324, defence: 247, specialAttack: 196, specialDefence: 269, speed: 320
        },
        types: ["Electric Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/togedemaru-totem.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/togedemaru-totem.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Final"
  },

  Mimikyu: {
    Name: "Mimikyu",
    stats: {
      hp: 314, attack: 306, defence: 284, specialAttack: 218, specialDefence: 339, speed: 320
    },
    types: ["Ghost Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/mimikyu.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/mimikyu.mp3",
    evolutions: [],
    forms: {
      Busted: {
        Name: "Mimikyu Busted",
        stats: {
          hp: 314, attack: 306, defence: 284, specialAttack: 218, specialDefence: 339, speed: 320
        },
        types: ["Ghost Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/mimikyu-busted.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/mimikyu-busted.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Totem: {
        Name: "Mimikyu Totem",
        stats: {
          hp: 314, attack: 306, defence: 284, specialAttack: 218, specialDefence: 339, speed: 320
        },
        types: ["Ghost Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/mimikyu-totem.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/mimikyu-totem.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Final"
  },

  Bruxish: {
    Name: "Bruxish",
    stats: {
      hp: 340, attack: 339, defence: 262, specialAttack: 262, specialDefence: 262, speed: 311
    },
    types: ["Water Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bruxish.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/bruxish.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Drampa: {
    Name: "Drampa",
    stats: {
      hp: 360, attack: 240, defence: 295, specialAttack: 405, specialDefence: 309, speed: 188
    },
    types: ["Normal Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/drampa.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/drampa.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Dhelmise: {
    Name: "Dhelmise",
    stats: {
      hp: 344, attack: 397, defence: 328, specialAttack: 298, specialDefence: 306, speed: 196
    },
    types: ["Ghost Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/dhelmise.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/dhelmise.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  JangmoO: {
    Name: "Jangmo O",
    stats: {
      hp: 294, attack: 229, defence: 251, specialAttack: 207, specialDefence: 207, speed: 207
    },
    types: ["Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/jangmoo.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/jangmoo.mp3",
    evolutions: [
      {
        Name: "Hakamo O",
        stats: {
          hp: 314, attack: 273, defence: 306, specialAttack: 251, specialDefence: 262, speed: 251
        },
        types: ["Dragon Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/hakamoo.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/hakamoo.mp3",
        evolutions: [
          {
            Name: "Kommo O",
            stats: {
              hp: 354, attack: 350, defence: 383, specialAttack: 328, specialDefence: 339, speed: 295
            },
            types: ["Dragon Fighting"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/kommoo.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/kommoo.mp3",
            evolutions: [],
            forms: {
              Totem: {
                Name: "Kommo O Totem",
                stats: {
                  hp: 354, attack: 350, defence: 383, specialAttack: 328, specialDefence: 339, speed: 295
                },
                types: ["Dragon Fighting"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/kommoo.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/kommoo.mp3",
                evolutions: [],
                forms: {

                },
                tier: "Final"
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Basic"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  TapuKoko: {
    Name: "Tapu Koko",
    stats: {
      hp: 344, attack: 361, defence: 295, specialAttack: 317, specialDefence: 273, speed: 394
    },
    types: ["Electric Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tapukoko.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tapukoko.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  TapuLele: {
    Name: "Tapu Lele",
    stats: {
      hp: 344, attack: 295, defence: 273, specialAttack: 394, specialDefence: 361, speed: 317
    },
    types: ["Psychic Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tapulele.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tapulele.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  TapuBulu: {
    Name: "Tapu Bulu",
    stats: {
      hp: 344, attack: 394, defence: 361, specialAttack: 295, specialDefence: 317, speed: 273
    },
    types: ["Grass Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tapubulu.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tapubulu.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  TapuFini: {
    Name: "Tapu Fini",
    stats: {
      hp: 344, attack: 273, defence: 361, specialAttack: 317, specialDefence: 394, speed: 295
    },
    types: ["Water Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tapufini.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tapufini.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Cosmog: {
    Name: "Cosmog",
    stats: {
      hp: 290, attack: 172, defence: 177, specialAttack: 172, specialDefence: 177, speed: 190
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cosmog.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cosmog.mp3",
    evolutions: [
      {
        Name: "Cosmoem",
        stats: {
          hp: 290, attack: 172, defence: 397, specialAttack: 172, specialDefence: 397, speed: 190
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/cosmoem.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/cosmoem.mp3",
        evolutions: [
          {
            Name: "Solgaleo",
            stats: {
              hp: 478, attack: 410, defence: 344, specialAttack: 357, specialDefence: 304, speed: 322
            },
            types: ["Psychic Steel"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/solgaleo.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/solgaleo.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Legendary"
          },
          { Name: "lunala" }
        ],
        forms: {

        },
        tier: "Legendary"
      }
    ],
    forms: {

    },
    tier: "Legendary"
  },

  Lunala: {
    Name: "Lunala",
    stats: {
      hp: 478, attack: 357, defence: 304, specialAttack: 410, specialDefence: 344, speed: 322
    },
    types: ["Psychic Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/lunala.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/lunala.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Nihilego: {
    Name: "Nihilego",
    stats: {
      hp: 422, attack: 225, defence: 212, specialAttack: 388, specialDefence: 397, speed: 335
    },
    types: ["Rock Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/nihilego.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/nihilego.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Ultra Beast"
  },

  Buzzwole: {
    Name: "Buzzwole",
    stats: {
      hp: 418, attack: 414, defence: 414, specialAttack: 225, specialDefence: 225, speed: 282
    },
    types: ["Bug Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/buzzwole.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/buzzwole.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Ultra Beast"
  },

  Pheromosa: {
    Name: "Pheromosa",
    stats: {
      hp: 346, attack: 410, defence: 190, specialAttack: 410, specialDefence: 190, speed: 441
    },
    types: ["Bug Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pheromosa.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pheromosa.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Ultra Beast"
  },

  Xurkitree: {
    Name: "Xurkitree",
    stats: {
      hp: 370, attack: 304, defence: 265, specialAttack: 489, specialDefence: 265, speed: 291
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/xurkitree.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/xurkitree.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Ultra Beast"
  },

  Celesteela: {
    Name: "Celesteela",
    stats: {
      hp: 398, attack: 331, defence: 335, specialAttack: 344, specialDefence: 331, speed: 243
    },
    types: ["Steel Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/celesteela.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/celesteela.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Ultra Beast"
  },

  Kartana: {
    Name: "Kartana",
    stats: {
      hp: 322, attack: 507, defence: 397, specialAttack: 238, specialDefence: 177, speed: 348
    },
    types: ["Grass Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/kartana.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/kartana.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Ultra Beast"
  },

  Guzzlord: {
    Name: "Guzzlord",
    stats: {
      hp: 650, attack: 331, defence: 225, specialAttack: 322, specialDefence: 225, speed: 203
    },
    types: ["Dark Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/guzzlord.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/guzzlord.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Ultra Beast"
  },

  Necrozma: {
    Name: "Necrozma",
    stats: {
      hp: 398, attack: 344, defence: 331, specialAttack: 388, specialDefence: 304, speed: 282
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/necrozma.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/necrozma.mp3",
    evolutions: [],
    forms: {
      DawnWings: {
        Name: "Necrozma Dawn Wings",
        stats: {
          hp: 398, attack: 357, defence: 348, specialAttack: 454, specialDefence: 388, speed: 278
        },
        types: ["Psychic Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/necrozma-dawnwings.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/necrozma-dawnwings.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      DuskMane: {
        Name: "Necrozma Dusk Mane",
        stats: {
          hp: 398, attack: 454, defence: 388, specialAttack: 357, specialDefence: 348, speed: 278
        },
        types: ["Psychic Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/necrozma-duskmane.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/necrozma-duskmane.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Ultra: {
        Name: "Necrozma Ultra",
        stats: {
          hp: 398, attack: 476, defence: 322, specialAttack: 476, specialDefence: 322, speed: 392
        },
        types: ["Psychic Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/necrozma-ultra.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/necrozma-ultra.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Final"
  },

  Magearna: {
    Name: "Magearna",
    stats: {
      hp: 364, attack: 317, defence: 361, specialAttack: 394, specialDefence: 361, speed: 251
    },
    types: ["Steel Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/magearna.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/magearna.mp3",
    evolutions: [],
    forms: {
      Original: {
        Name: "Magearna Original",
        stats: {
          hp: 364, attack: 317, defence: 361, specialAttack: 394, specialDefence: 361, speed: 251
        },
        types: ["Steel Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/magearna-original.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/magearna-original.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Mythical"
  },

  Marshadow: {
    Name: "Marshadow",
    stats: {
      hp: 384, attack: 383, defence: 284, specialAttack: 306, specialDefence: 306, speed: 383
    },
    types: ["Fighting Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/marshadow.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/marshadow.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Mythical"
  },

  Poipole: {
    Name: "Poipole",
    stats: {
      hp: 338, attack: 269, defence: 256, specialAttack: 269, specialDefence: 256, speed: 269
    },
    types: ["Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/poipole.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/poipole.mp3",
    evolutions: [
      {
        Name: "Naganadel",
        stats: {
          hp: 350, attack: 269, defence: 269, specialAttack: 388, specialDefence: 269, speed: 375
        },
        types: ["Poison Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/naganadel.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/naganadel.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Ultra Beast"
      }
    ],
    forms: {

    },
    tier: "Ultra Beast"
  },

  Stakataka: {
    Name: "Stakataka",
    stats: {
      hp: 326, attack: 397, defence: 573, specialAttack: 225, specialDefence: 331, speed: 137
    },
    types: ["Rock Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/stakataka.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/stakataka.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Ultra Beast"
  },

  Blacephalon: {
    Name: "Blacephalon",
    stats: {
      hp: 310, attack: 388, defence: 225, specialAttack: 441, specialDefence: 282, speed: 344
    },
    types: ["Fire Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/blacephalon.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/blacephalon.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Ultra Beast"
  },

  Zeraora: {
    Name: "Zeraora",
    stats: {
      hp: 380, attack: 355, defence: 273, specialAttack: 333, specialDefence: 284, speed: 423
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/zeraora.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/zeraora.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Mythical"
  },

  Meltan: {
    Name: "Meltan",
    stats: {
      hp: 296, attack: 251, defence: 251, specialAttack: 229, specialDefence: 185, speed: 183
    },
    types: ["Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/meltan.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/meltan.mp3",
    evolutions: [
      {
        Name: "Melmetal",
        stats: {
          hp: 474, attack: 423, defence: 423, specialAttack: 284, specialDefence: 251, speed: 183
        },
        types: ["Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/melmetal.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/melmetal.mp3",
        evolutions: [],
        forms: {
          Gmax: {
            stats: {
              hp: 474, attack: 423, defence: 423, specialAttack: 284, specialDefence: 251, speed: 183
            },
            types: ["Steel"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/melmetal-gmax.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/melmetal-gmax.mp3",
            tier: "Gmax",
            source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
            isSeparateEntry: false
          }
        },
        tier: "Mythical"
      }
    ],
    forms: {

    },
    tier: "Mythical"
  },

  Grookey: {
    Name: "Grookey",
    stats: {
      hp: 304, attack: 251, defence: 218, specialAttack: 196, specialDefence: 196, speed: 251
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/grookey.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/grookey.mp3",
    evolutions: [
      {
        Name: "Thwackey",
        stats: {
          hp: 344, attack: 295, defence: 262, specialAttack: 229, specialDefence: 240, speed: 284
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/thwackey.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/thwackey.mp3",
        evolutions: [
          {
            Name: "Rillaboom",
            stats: {
              hp: 404, attack: 383, defence: 306, specialAttack: 240, specialDefence: 262, speed: 295
            },
            types: ["Grass"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/rillaboom.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/rillaboom.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 404, attack: 383, defence: 306, specialAttack: 240, specialDefence: 262, speed: 295
                },
                types: ["Grass"],
                sprite: "https://play.pokemonshowdown.com/sprites/gen5/rillaboom-gmax.png",
                cry: "https://play.pokemonshowdown.com/audio/cries/rillaboom.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Scorbunny: {
    Name: "Scorbunny",
    stats: {
      hp: 304, attack: 265, defence: 196, specialAttack: 196, specialDefence: 196, speed: 260
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/scorbunny.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/scorbunny.mp3",
    evolutions: [
      {
        Name: "Raboot",
        stats: {
          hp: 334, attack: 298, defence: 240, specialAttack: 229, specialDefence: 240, speed: 315
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/raboot.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/raboot.mp3",
        evolutions: [
          {
            Name: "Cinderace",
            stats: {
              hp: 364, attack: 364, defence: 273, specialAttack: 251, specialDefence: 273, speed: 370
            },
            types: ["Fire"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/cinderace.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/cinderace.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 364, attack: 364, defence: 273, specialAttack: 251, specialDefence: 273, speed: 370
                },
                types: ["Fire"],
                sprite: "https://play.pokemonshowdown.com/sprites/gen5/cinderace-gmax.png",
                cry: "https://play.pokemonshowdown.com/audio/cries/cinderace.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Sobble: {
    Name: "Sobble",
    stats: {
      hp: 304, attack: 196, defence: 196, specialAttack: 262, specialDefence: 196, speed: 262
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sobble.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sobble.mp3",
    evolutions: [
      {
        Name: "Drizzile",
        stats: {
          hp: 334, attack: 240, defence: 229, specialAttack: 317, specialDefence: 229, speed: 306
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/drizzile.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/drizzile.mp3",
        evolutions: [
          {
            Name: "Inteleon",
            stats: {
              hp: 344, attack: 295, defence: 251, specialAttack: 383, specialDefence: 251, speed: 372
            },
            types: ["Water"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/inteleon.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/inteleon.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 344, attack: 295, defence: 251, specialAttack: 383, specialDefence: 251, speed: 372
                },
                types: ["Water"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/inteleon-gmax.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/inteleon-gmax.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Skwovet: {
    Name: "Skwovet",
    stats: {
      hp: 344, attack: 229, defence: 229, specialAttack: 185, specialDefence: 185, speed: 163
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/skwovet.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/skwovet.mp3",
    evolutions: [
      {
        Name: "Greedent",
        stats: {
          hp: 444, attack: 317, defence: 317, specialAttack: 229, specialDefence: 273, speed: 152
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/greedent.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/greedent.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Rookidee: {
    Name: "Rookidee",
    stats: {
      hp: 280, attack: 212, defence: 185, specialAttack: 181, specialDefence: 185, speed: 234
    },
    types: ["Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/rookidee.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/rookidee.mp3",
    evolutions: [
      {
        Name: "Corvisquire",
        stats: {
          hp: 340, attack: 256, defence: 229, specialAttack: 203, specialDefence: 229, speed: 278
        },
        types: ["Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/corvisquire.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/corvisquire.mp3",
        evolutions: [
          {
            Name: "Corviknight",
            stats: {
              hp: 400, attack: 300, defence: 339, specialAttack: 225, specialDefence: 295, speed: 256
            },
            types: ["Flying Steel"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/corviknight.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/corviknight.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 400, attack: 300, defence: 339, specialAttack: 225, specialDefence: 295, speed: 256
                },
                types: ["Flying Steel"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/corviknight-gmax.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/corviknight-gmax.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Blipbug: {
    Name: "Blipbug",
    stats: {
      hp: 254, attack: 152, defence: 152, specialAttack: 163, specialDefence: 207, speed: 207
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/blipbug.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/blipbug.mp3",
    evolutions: [
      {
        Name: "Dottler",
        stats: {
          hp: 304, attack: 185, defence: 284, specialAttack: 218, specialDefence: 306, speed: 174
        },
        types: ["Bug Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/dottler.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/dottler.mp3",
        evolutions: [
          {
            Name: "Orbeetle",
            stats: {
              hp: 324, attack: 207, defence: 350, specialAttack: 284, specialDefence: 372, speed: 306
            },
            types: ["Bug Psychic"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/orbeetle.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/orbeetle.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 324, attack: 207, defence: 350, specialAttack: 284, specialDefence: 372, speed: 306
                },
                types: ["Bug Psychic"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/orbeetle-gmax.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/orbeetle-gmax.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Nickit: {
    Name: "Nickit",
    stats: {
      hp: 284, attack: 170, defence: 170, specialAttack: 212, specialDefence: 223, speed: 218
    },
    types: ["Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/nickit.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/nickit.mp3",
    evolutions: [
      {
        Name: "Thievul",
        stats: {
          hp: 344, attack: 236, defence: 236, specialAttack: 300, specialDefence: 311, speed: 306
        },
        types: ["Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/thievul.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/thievul.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Gossifleur: {
    Name: "Gossifleur",
    stats: {
      hp: 284, attack: 196, defence: 240, specialAttack: 196, specialDefence: 240, speed: 130
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/gossifleur.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/gossifleur.mp3",
    evolutions: [
      {
        Name: "Eldegoss",
        stats: {
          hp: 324, attack: 218, defence: 306, specialAttack: 284, specialDefence: 372, speed: 240
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/eldegoss.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/eldegoss.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Wooloo: {
    Name: "Wooloo",
    stats: {
      hp: 288, attack: 196, defence: 229, specialAttack: 196, specialDefence: 207, speed: 214
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/wooloo.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/wooloo.mp3",
    evolutions: [
      {
        Name: "Dubwool",
        stats: {
          hp: 348, attack: 284, defence: 328, specialAttack: 240, specialDefence: 306, speed: 302
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/dubwool.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/dubwool.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Chewtle: {
    Name: "Chewtle",
    stats: {
      hp: 304, attack: 249, defence: 218, specialAttack: 192, specialDefence: 192, speed: 205
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/chewtle.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/chewtle.mp3",
    evolutions: [
      {
        Name: "Drednaw",
        stats: {
          hp: 384, attack: 361, defence: 306, specialAttack: 214, specialDefence: 258, speed: 271
        },
        types: ["Water Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/drednaw.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/drednaw.mp3",
        evolutions: [],
        forms: {
          Gmax: {
            stats: {
              hp: 384, attack: 361, defence: 306, specialAttack: 214, specialDefence: 258, speed: 271
            },
            types: ["Water Rock"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/drednaw-gmax.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/drednaw-gmax.mp3",
            tier: "Gmax",
            source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Yamper: {
    Name: "Yamper",
    stats: {
      hp: 322, attack: 207, defence: 218, specialAttack: 196, specialDefence: 218, speed: 166
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/yamper.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/yamper.mp3",
    evolutions: [
      {
        Name: "Boltund",
        stats: {
          hp: 342, attack: 306, defence: 240, specialAttack: 306, specialDefence: 240, speed: 375
        },
        types: ["Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/boltund.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/boltund.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Rolycoly: {
    Name: "Rolycoly",
    stats: {
      hp: 264, attack: 196, defence: 218, specialAttack: 196, specialDefence: 218, speed: 174
    },
    types: ["Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/rolycoly.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/rolycoly.mp3",
    evolutions: [
      {
        Name: "Carkol",
        stats: {
          hp: 364, attack: 240, defence: 306, specialAttack: 240, specialDefence: 262, speed: 218
        },
        types: ["Rock Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/carkol.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/carkol.mp3",
        evolutions: [
          {
            Name: "Coalossal",
            stats: {
              hp: 424, attack: 284, defence: 372, specialAttack: 284, specialDefence: 306, speed: 174
            },
            types: ["Rock Fire"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/coalossal.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/coalossal.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 424, attack: 284, defence: 372, specialAttack: 284, specialDefence: 306, speed: 174
                },
                types: ["Rock Fire"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/coalossal-gmax.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/coalossal-gmax.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Applin: {
    Name: "Applin",
    stats: {
      hp: 284, attack: 196, defence: 284, specialAttack: 196, specialDefence: 196, speed: 152
    },
    types: ["Grass Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/applin.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/applin.mp3",
    evolutions: [
      {
        Name: "Flapple",
        stats: {
          hp: 344, attack: 350, defence: 284, specialAttack: 317, specialDefence: 240, speed: 262
        },
        types: ["Grass Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/flapple.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/flapple.mp3",
        evolutions: [],
        forms: {
          Gmax: {
            stats: {
              hp: 344, attack: 350, defence: 284, specialAttack: 317, specialDefence: 240, speed: 262
            },
            types: ["Grass Dragon"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/flapple-gmax.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/flapple-gmax.mp3",
            tier: "Gmax",
            source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
            isSeparateEntry: false
          },
          AppletunDipplin: {
            Name: "Flapple Appletun Dipplin",
            stats: null,
            types: [],
            sprite: "",
            cry: "",
            evolutions: ["Hydrapple"],
            forms: {

            },
            tier: "Mid"
          }
        },
        tier: "Final"
      },
      {
        Name: "Appletun",
        stats: {
          hp: 424, attack: 295, defence: 284, specialAttack: 328, specialDefence: 284, speed: 174
        },
        types: ["Grass Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/appletun.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/appletun.mp3",
        evolutions: [],
        forms: {
          Gmax: {
            stats: {
              hp: 424, attack: 295, defence: 284, specialAttack: 328, specialDefence: 284, speed: 174
            },
            types: ["Grass Dragon"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/appletun-gmax.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/appletun-gmax.mp3",
            tier: "Gmax",
            source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      },
      {
        Name: "Dipplin",
        stats: {
          hp: 364, attack: 284, defence: 350, specialAttack: 317, specialDefence: 284, speed: 196
        },
        types: ["Grass Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/dipplin.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/dipplin.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Silicobra: {
    Name: "Silicobra",
    stats: {
      hp: 308, attack: 234, defence: 273, specialAttack: 185, specialDefence: 218, speed: 210
    },
    types: ["Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/silicobra.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/silicobra.mp3",
    evolutions: [
      {
        Name: "Sandaconda",
        stats: {
          hp: 348, attack: 344, defence: 383, specialAttack: 251, specialDefence: 262, speed: 265
        },
        types: ["Ground"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sandaconda.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sandaconda.mp3",
        evolutions: [],
        forms: {
          Gmax: {
            stats: {
              hp: 348, attack: 344, defence: 383, specialAttack: 251, specialDefence: 262, speed: 265
            },
            types: ["Ground"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/sandaconda-gmax.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/sandaconda-gmax.mp3",
            tier: "Gmax",
            source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Cramorant: {
    Name: "Cramorant",
    stats: {
      hp: 344, attack: 295, defence: 229, specialAttack: 295, specialDefence: 317, speed: 295
    },
    types: ["Flying Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cramorant.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cramorant.mp3",
    evolutions: [],
    forms: {
      Gorging: {
        Name: "Cramorant Gorging",
        stats: {
          hp: 344, attack: 295, defence: 229, specialAttack: 295, specialDefence: 317, speed: 295
        },
        types: ["Flying Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/cramorant-gorging.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/cramorant-gorging.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Gulping: {
        Name: "Cramorant Gulping",
        stats: {
          hp: 344, attack: 295, defence: 229, specialAttack: 295, specialDefence: 317, speed: 295
        },
        types: ["Flying Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/cramorant-gulping.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/cramorant-gulping.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Final"
  },

  Arrokuda: {
    Name: "Arrokuda",
    stats: {
      hp: 286, attack: 247, defence: 196, specialAttack: 196, specialDefence: 174, speed: 254
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/arrokuda.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/arrokuda.mp3",
    evolutions: [
      {
        Name: "Barraskewda",
        stats: {
          hp: 326, attack: 379, defence: 240, specialAttack: 240, specialDefence: 218, speed: 408
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/barraskewda.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/barraskewda.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Toxel: {
    Name: "Toxel",
    stats: {
      hp: 284, attack: 192, defence: 185, specialAttack: 227, specialDefence: 185, speed: 196
    },
    types: ["Electric Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/toxel.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/toxel.mp3",
    evolutions: [
      {
        Name: "Toxtricity",
        stats: {
          hp: 354, attack: 324, defence: 262, specialAttack: 359, specialDefence: 262, speed: 273
        },
        types: ["Electric Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/toxtricity.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/toxtricity.mp3",
        evolutions: [],
        forms: {
          Gmax: {
            stats: {
              hp: 354, attack: 324, defence: 262, specialAttack: 359, specialDefence: 262, speed: 273
            },
            types: ["Electric Poison"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/toxtricity-gmax.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/toxtricity-gmax.mp3",
            tier: "Gmax",
            source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
            isSeparateEntry: false
          },
          LowKey: {
            Name: "Toxtricity Low Key",
            stats: {
              hp: 354, attack: 324, defence: 262, specialAttack: 359, specialDefence: 262, speed: 273
            },
            types: ["Electric Poison"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/toxtricity-lowkey.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/toxtricity-lowkey.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Sizzlipede: {
    Name: "Sizzlipede",
    stats: {
      hp: 304, attack: 251, defence: 207, specialAttack: 218, specialDefence: 218, speed: 207
    },
    types: ["Fire Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sizzlipede.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sizzlipede.mp3",
    evolutions: [
      {
        Name: "Centiskorch",
        stats: {
          hp: 404, attack: 361, defence: 251, specialAttack: 306, specialDefence: 306, speed: 251
        },
        types: ["Fire Bug"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/centiskorch.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/centiskorch.mp3",
        evolutions: [],
        forms: {
          Gmax: {
            stats: {
              hp: 404, attack: 361, defence: 251, specialAttack: 306, specialDefence: 306, speed: 251
            },
            types: ["Fire Bug"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/centiskorch-gmax.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/centiskorch-gmax.mp3",
            tier: "Gmax",
            source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Clobbopus: {
    Name: "Clobbopus",
    stats: {
      hp: 304, attack: 258, defence: 240, specialAttack: 218, specialDefence: 218, speed: 179
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/clobbopus.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/clobbopus.mp3",
    evolutions: [
      {
        Name: "Grapploct",
        stats: {
          hp: 364, attack: 368, defence: 306, specialAttack: 262, specialDefence: 284, speed: 201
        },
        types: ["Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/grapploct.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/grapploct.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Sinistea: {
    Name: "Sinistea",
    stats: {
      hp: 284, attack: 207, defence: 207, specialAttack: 271, specialDefence: 227, speed: 218
    },
    types: ["Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sinistea.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sinistea.mp3",
    evolutions: [
      {
        Name: "Polteageist",
        stats: {
          hp: 324, attack: 251, defence: 251, specialAttack: 403, specialDefence: 359, speed: 262
        },
        types: ["Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/polteageist.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/polteageist.mp3",
        evolutions: [],
        forms: {
          Antique: {
            Name: "Polteageist Antique",
            stats: {
              hp: 324, attack: 251, defence: 251, specialAttack: 403, specialDefence: 359, speed: 262
            },
            types: ["Ghost"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/polteageist-antique.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/polteageist-antique.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Antique: {
        Name: "Sinistea Antique",
        stats: {
          hp: 284, attack: 207, defence: 207, specialAttack: 271, specialDefence: 227, speed: 218
        },
        types: ["Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sinistea-antique.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sinistea-antique.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Hatenna: {
    Name: "Hatenna",
    stats: {
      hp: 288, attack: 174, defence: 207, specialAttack: 232, specialDefence: 225, speed: 194
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/hatenna.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/hatenna.mp3",
    evolutions: [
      {
        Name: "Hattrem",
        stats: {
          hp: 318, attack: 196, defence: 251, specialAttack: 298, specialDefence: 269, speed: 216
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/hattrem.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/hattrem.mp3",
        evolutions: [
          {
            Name: "Hatterene",
            stats: {
              hp: 318, attack: 306, defence: 317, specialAttack: 408, specialDefence: 335, speed: 172
            },
            types: ["Psychic Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/hatterene.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/hatterene.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 318, attack: 306, defence: 317, specialAttack: 408, specialDefence: 335, speed: 172
                },
                types: ["Psychic Fairy"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/hatterene-gmax.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/hatterene-gmax.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Impidimp: {
    Name: "Impidimp",
    stats: {
      hp: 294, attack: 207, defence: 174, specialAttack: 229, specialDefence: 196, speed: 218
    },
    types: ["Dark Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/impidimp.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/impidimp.mp3",
    evolutions: [
      {
        Name: "Morgrem",
        stats: {
          hp: 334, attack: 240, defence: 207, specialAttack: 273, specialDefence: 229, speed: 262
        },
        types: ["Dark Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/morgrem.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/morgrem.mp3",
        evolutions: [
          {
            Name: "Grimmsnarl",
            stats: {
              hp: 394, attack: 372, defence: 251, specialAttack: 317, specialDefence: 273, speed: 240
            },
            types: ["Dark Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/grimmsnarl.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/grimmsnarl.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 394, attack: 372, defence: 251, specialAttack: 317, specialDefence: 273, speed: 240
                },
                types: ["Dark Fairy"],
                sprite: "https://play.pokemonshowdown.com/sprites/ani/grimmsnarl-gmax.gif",
                cry: "https://play.pokemonshowdown.com/audio/cries/grimmsnarl-gmax.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Runerigus: {
    Name: "Runerigus",
    stats: {
      hp: 320, attack: 317, defence: 427, specialAttack: 218, specialDefence: 339, speed: 174
    },
    types: ["Ground Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/runerigus.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/runerigus.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Milcery: {
    Name: "Milcery",
    stats: {
      hp: 294, attack: 196, defence: 196, specialAttack: 218, specialDefence: 243, speed: 183
    },
    types: ["Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/milcery.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/milcery.mp3",
    evolutions: [
      {
        Name: "Alcremie",
        stats: {
          hp: 334, attack: 240, defence: 273, specialAttack: 350, specialDefence: 375, speed: 249
        },
        types: ["Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/alcremie.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/alcremie.mp3",
        evolutions: [],
        forms: {
          Gmax: {
            stats: {
              hp: 334, attack: 240, defence: 273, specialAttack: 350, specialDefence: 375, speed: 249
            },
            types: ["Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/alcremie-gmax.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/alcremie-gmax.mp3",
            tier: "Gmax",
            source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Falinks: {
    Name: "Falinks",
    stats: {
      hp: 334, attack: 328, defence: 328, specialAttack: 262, specialDefence: 240, speed: 273
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/falinks.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/falinks.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Pincurchin: {
    Name: "Pincurchin",
    stats: {
      hp: 300, attack: 331, defence: 317, specialAttack: 309, specialDefence: 295, speed: 141
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pincurchin.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pincurchin.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Snom: {
    Name: "Snom",
    stats: {
      hp: 264, attack: 163, defence: 185, specialAttack: 207, specialDefence: 174, speed: 152
    },
    types: ["Ice Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/snom.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/snom.mp3",
    evolutions: [
      {
        Name: "Frosmoth",
        stats: {
          hp: 344, attack: 251, defence: 240, specialAttack: 383, specialDefence: 306, speed: 251
        },
        types: ["Ice Bug"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/frosmoth.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/frosmoth.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Stonjourner: {
    Name: "Stonjourner",
    stats: {
      hp: 404, attack: 383, defence: 405, specialAttack: 152, specialDefence: 152, speed: 262
    },
    types: ["Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/stonjourner.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/stonjourner.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Eiscue: {
    Name: "Eiscue",
    stats: {
      hp: 354, attack: 284, defence: 350, specialAttack: 251, specialDefence: 306, speed: 218
    },
    types: ["Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/eiscue.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/eiscue.mp3",
    evolutions: [],
    forms: {
      Noice: {
        Name: "Eiscue Noice",
        stats: {
          hp: 354, attack: 284, defence: 262, specialAttack: 251, specialDefence: 218, speed: 394
        },
        types: ["Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/eiscue-noice.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/eiscue-noice.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Final"
  },

  Indeedee: {
    Name: "Indeedee",
    stats: {
      hp: 324, attack: 251, defence: 229, specialAttack: 339, specialDefence: 317, speed: 317
    },
    types: ["Psychic Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/indeedee.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/indeedee.mp3",
    evolutions: [],
    forms: {
      F: {
        Name: "Indeedee F",
        stats: {
          hp: 344, attack: 229, defence: 251, specialAttack: 317, specialDefence: 339, speed: 295
        },
        types: ["Psychic Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/indeedee-f.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/indeedee-f.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Final"
  },

  Morpeko: {
    Name: "Morpeko",
    stats: {
      hp: 320, attack: 317, defence: 236, specialAttack: 262, specialDefence: 236, speed: 322
    },
    types: ["Electric Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/morpeko.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/morpeko.mp3",
    evolutions: [],
    forms: {
      Hangry: {
        Name: "Morpeko Hangry",
        stats: {
          hp: 320, attack: 317, defence: 236, specialAttack: 262, specialDefence: 236, speed: 322
        },
        types: ["Electric Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/morpeko-hangry.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/morpeko-hangry.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Final"
  },

  Cufant: {
    Name: "Cufant",
    stats: {
      hp: 348, attack: 284, defence: 216, specialAttack: 196, specialDefence: 216, speed: 196
    },
    types: ["Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cufant.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cufant.mp3",
    evolutions: [
      {
        Name: "Copperajah",
        stats: {
          hp: 448, attack: 394, defence: 260, specialAttack: 284, specialDefence: 260, speed: 174
        },
        types: ["Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/copperajah.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/copperajah.mp3",
        evolutions: [],
        forms: {
          Gmax: {
            stats: {
              hp: 448, attack: 394, defence: 260, specialAttack: 284, specialDefence: 260, speed: 174
            },
            types: ["Steel"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/copperajah-gmax.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/copperajah-gmax.mp3",
            tier: "Gmax",
            source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
            isSeparateEntry: false
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Dracozolt: {
    Name: "Dracozolt",
    stats: {
      hp: 384, attack: 328, defence: 306, specialAttack: 284, specialDefence: 262, speed: 273
    },
    types: ["Electric Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/dracozolt.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/dracozolt.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Arctozolt: {
    Name: "Arctozolt",
    stats: {
      hp: 384, attack: 328, defence: 306, specialAttack: 306, specialDefence: 284, speed: 229
    },
    types: ["Electric Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/arctozolt.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/arctozolt.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Dracovish: {
    Name: "Dracovish",
    stats: {
      hp: 384, attack: 306, defence: 328, specialAttack: 262, specialDefence: 284, speed: 273
    },
    types: ["Water Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/dracovish.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/dracovish.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Arctovish: {
    Name: "Arctovish",
    stats: {
      hp: 384, attack: 306, defence: 328, specialAttack: 284, specialDefence: 306, speed: 229
    },
    types: ["Water Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/arctovish.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/arctovish.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Duraludon: {
    Name: "Duraludon",
    stats: {
      hp: 344, attack: 317, defence: 361, specialAttack: 372, specialDefence: 218, speed: 295
    },
    types: ["Steel Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/duraludon.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/duraludon.mp3",
    evolutions: [
      {
        Name: "Archaludon",
        stats: {
          hp: 384, attack: 339, defence: 394, specialAttack: 383, specialDefence: 251, speed: 295
        },
        types: ["Steel Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/archaludon.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/archaludon.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {
      Gmax: {
        stats: {
          hp: 344, attack: 317, defence: 361, specialAttack: 372, specialDefence: 218, speed: 295
        },
        types: ["Steel Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/duraludon-gmax.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/duraludon-gmax.mp3",
        tier: "Gmax",
        source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
        isSeparateEntry: false
      }
    },
    tier: "Basic"
  },

  Dreepy: {
    Name: "Dreepy",
    stats: {
      hp: 260, attack: 240, defence: 174, specialAttack: 196, specialDefence: 174, speed: 289
    },
    types: ["Dragon Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/dreepy.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/dreepy.mp3",
    evolutions: [
      {
        Name: "Drakloak",
        stats: {
          hp: 340, attack: 284, defence: 218, specialAttack: 240, specialDefence: 218, speed: 333
        },
        types: ["Dragon Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/drakloak.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/drakloak.mp3",
        evolutions: [
          {
            Name: "Dragapult",
            stats: {
              hp: 380, attack: 372, defence: 273, specialAttack: 328, specialDefence: 273, speed: 421
            },
            types: ["Dragon Ghost"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/dragapult.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/dragapult.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Zacian: {
    Name: "Zacian",
    stats: {
      hp: 388, attack: 372, defence: 361, specialAttack: 284, specialDefence: 361, speed: 412
    },
    types: ["Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/zacian.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/zacian.mp3",
    evolutions: [],
    forms: {
      Crowned: {
        Name: "Zacian Crowned",
        stats: {
          hp: 388, attack: 438, defence: 361, specialAttack: 284, specialDefence: 361, speed: 434
        },
        types: ["Fairy Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/zacian-crowned.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/zacian-crowned.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Zamazenta: {
    Name: "Zamazenta",
    stats: {
      hp: 388, attack: 372, defence: 361, specialAttack: 284, specialDefence: 361, speed: 412
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/zamazenta.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/zamazenta.mp3",
    evolutions: [],
    forms: {
      Crowned: {
        Name: "Zamazenta Crowned",
        stats: {
          hp: 388, attack: 372, defence: 416, specialAttack: 284, specialDefence: 416, speed: 390
        },
        types: ["Fighting Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/zamazenta-crowned.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/zamazenta-crowned.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Eternatus: {
    Name: "Eternatus",
    stats: {
      hp: 484, attack: 295, defence: 317, specialAttack: 427, specialDefence: 317, speed: 394
    },
    types: ["Poison Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/eternatus.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/eternatus.mp3",
    evolutions: [],
    forms: {
      Eternamax: {
        Name: "Eternatus Eternamax",
        stats: {
          hp: 714, attack: 361, defence: 658, specialAttack: 383, specialDefence: 658, speed: 394
        },
        types: ["Poison Dragon"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/eternatus-eternamax.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/eternatus-eternamax.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Kubfu: {
    Name: "Kubfu",
    stats: {
      hp: 324, attack: 306, defence: 240, specialAttack: 225, specialDefence: 218, speed: 267
    },
    types: ["Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/kubfu.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/kubfu.mp3",
    evolutions: [
      {
        Name: "Urshifu",
        stats: {
          hp: 404, attack: 394, defence: 328, specialAttack: 247, specialDefence: 240, speed: 322
        },
        types: ["Fighting Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/urshifu.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/urshifu.mp3",
        evolutions: [],
        forms: {
          Gmax: {
            stats: {
              hp: 404, attack: 394, defence: 328, specialAttack: 247, specialDefence: 240, speed: 322
            },
            types: ["Fighting Dark"],
            sprite: "https://play.pokemonshowdown.com/sprites/gen5/urshifu-gmax.png",
            cry: "https://play.pokemonshowdown.com/audio/cries/urshifu.mp3",
            tier: "Gmax",
            source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
            isSeparateEntry: false
          },
          RapidStrike: {
            Name: "Urshifu Rapid Strike",
            stats: {
              hp: 404, attack: 394, defence: 328, specialAttack: 247, specialDefence: 240, speed: 322
            },
            types: ["Fighting Water"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/urshifu-rapidstrike.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/urshifu-rapidstrike.mp3",
            evolutions: [],
            forms: {
              Gmax: {
                stats: {
                  hp: 404, attack: 394, defence: 328, specialAttack: 247, specialDefence: 240, speed: 322
                },
                types: ["Fighting Water"],
                sprite: "https://play.pokemonshowdown.com/sprites/gen5/urshifu-rapidstrikegmax.png",
                cry: "https://play.pokemonshowdown.com/audio/cries/urshifu-rapidstrike.mp3",
                tier: "Gmax",
                source: "https://bulbapedia.bulbagarden.net/wiki/Gigantamax",
                isSeparateEntry: false
              }
            },
            tier: "Final"
          }
        },
        tier: "Legendary"
      }
    ],
    forms: {

    },
    tier: "Legendary"
  },

  Zarude: {
    Name: "Zarude",
    stats: {
      hp: 414, attack: 372, defence: 339, specialAttack: 262, specialDefence: 317, speed: 339
    },
    types: ["Dark Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/zarude.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/zarude.mp3",
    evolutions: [],
    forms: {
      Dada: {
        Name: "Zarude Dada",
        stats: {
          hp: 414, attack: 372, defence: 339, specialAttack: 262, specialDefence: 317, speed: 339
        },
        types: ["Dark Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/zarude-dada.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/zarude-dada.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Mythical"
  },

  Regieleki: {
    Name: "Regieleki",
    stats: {
      hp: 364, attack: 328, defence: 218, specialAttack: 328, specialDefence: 218, speed: 548
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/regieleki.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/regieleki.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Regidrago: {
    Name: "Regidrago",
    stats: {
      hp: 604, attack: 328, defence: 218, specialAttack: 328, specialDefence: 218, speed: 284
    },
    types: ["Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/regidrago.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/regidrago.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Glastrier: {
    Name: "Glastrier",
    stats: {
      hp: 404, attack: 427, defence: 394, specialAttack: 251, specialDefence: 350, speed: 174
    },
    types: ["Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/glastrier.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/glastrier.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Spectrier: {
    Name: "Spectrier",
    stats: {
      hp: 404, attack: 251, defence: 240, specialAttack: 427, specialDefence: 284, speed: 394
    },
    types: ["Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/spectrier.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/spectrier.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Calyrex: {
    Name: "Calyrex",
    stats: {
      hp: 404, attack: 284, defence: 284, specialAttack: 284, specialDefence: 284, speed: 284
    },
    types: ["Psychic Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/calyrex.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/calyrex.mp3",
    evolutions: [],
    forms: {
      Ice: {
        Name: "Calyrex Ice",
        stats: {
          hp: 404, attack: 471, defence: 438, specialAttack: 295, specialDefence: 394, speed: 218
        },
        types: ["Psychic Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/calyrex-ice.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/calyrex-ice.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Shadow: {
        Name: "Calyrex Shadow",
        stats: {
          hp: 404, attack: 295, defence: 284, specialAttack: 471, specialDefence: 328, speed: 438
        },
        types: ["Psychic Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/calyrex-shadow.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/calyrex-shadow.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Sneasler: {
    Name: "Sneasler",
    stats: {
      hp: 364, attack: 394, defence: 240, specialAttack: 196, specialDefence: 284, speed: 372
    },
    types: ["Fighting Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sneasler.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sneasler.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Enamorus: {
    Name: "Enamorus",
    stats: {
      hp: 352, attack: 361, defence: 262, specialAttack: 405, specialDefence: 284, speed: 342
    },
    types: ["Fairy Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/enamorus.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/enamorus.mp3",
    evolutions: [],
    forms: {
      Therian: {
        Name: "Enamorus Therian",
        stats: {
          hp: 352, attack: 361, defence: 350, specialAttack: 405, specialDefence: 328, speed: 210
        },
        types: ["Fairy Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/enamorus-therian.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/enamorus-therian.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Sprigatito: {
    Name: "Sprigatito",
    stats: {
      hp: 284, attack: 243, defence: 227, specialAttack: 207, specialDefence: 207, speed: 251
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/sprigatito.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/sprigatito.mp3",
    evolutions: [
      {
        Name: "Floragato",
        stats: {
          hp: 326, attack: 284, defence: 247, specialAttack: 240, specialDefence: 247, speed: 291
        },
        types: ["Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/floragato.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/floragato.mp3",
        evolutions: [
          {
            Name: "Meowscarada",
            stats: {
              hp: 356, attack: 350, defence: 262, specialAttack: 287, specialDefence: 262, speed: 379
            },
            types: ["Grass Dark"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/meowscarada.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/meowscarada.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Fuecoco: {
    Name: "Fuecoco",
    stats: {
      hp: 338, attack: 207, defence: 238, specialAttack: 247, specialDefence: 196, speed: 188
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/fuecoco.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/fuecoco.mp3",
    evolutions: [
      {
        Name: "Crocalor",
        stats: {
          hp: 366, attack: 229, defence: 280, specialAttack: 306, specialDefence: 236, speed: 216
        },
        types: ["Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/crocalor.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/crocalor.mp3",
        evolutions: [
          {
            Name: "Skeledirge",
            stats: {
              hp: 412, attack: 273, defence: 328, specialAttack: 350, specialDefence: 273, speed: 254
            },
            types: ["Fire Ghost"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/skeledirge.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/skeledirge.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Quaxly: {
    Name: "Quaxly",
    stats: {
      hp: 314, attack: 251, defence: 207, specialAttack: 218, specialDefence: 207, speed: 218
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/quaxly.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/quaxly.mp3",
    evolutions: [
      {
        Name: "Quaxwell",
        stats: {
          hp: 344, attack: 295, defence: 251, specialAttack: 251, specialDefence: 240, speed: 251
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/quaxwell.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/quaxwell.mp3",
        evolutions: [
          {
            Name: "Quaquaval",
            stats: {
              hp: 374, attack: 372, defence: 284, specialAttack: 295, specialDefence: 273, speed: 295
            },
            types: ["Water Fighting"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/quaquaval.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/quaquaval.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Lechonk: {
    Name: "Lechonk",
    stats: {
      hp: 312, attack: 207, defence: 196, specialAttack: 185, specialDefence: 207, speed: 185
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/lechonk.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/lechonk.mp3",
    evolutions: [
      {
        Name: "Oinkologne",
        stats: {
          hp: 424, attack: 328, defence: 273, specialAttack: 238, specialDefence: 284, speed: 251
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/oinkologne.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/oinkologne.mp3",
        evolutions: [],
        forms: {
          F: {
            Name: "Oinkologne F",
            stats: {
              hp: 434, attack: 306, defence: 262, specialAttack: 238, specialDefence: 306, speed: 251
            },
            types: ["Normal"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/oinkologne-f.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/oinkologne-f.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Tarountula: {
    Name: "Tarountula",
    stats: {
      hp: 274, attack: 199, defence: 207, specialAttack: 172, specialDefence: 196, speed: 152
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tarountula.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tarountula.mp3",
    evolutions: [
      {
        Name: "Spidops",
        stats: {
          hp: 324, attack: 282, defence: 311, specialAttack: 223, specialDefence: 298, speed: 185
        },
        types: ["Bug"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/spidops.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/spidops.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Nymble: {
    Name: "Nymble",
    stats: {
      hp: 270, attack: 210, defence: 196, specialAttack: 155, specialDefence: 163, speed: 207
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/nymble.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/nymble.mp3",
    evolutions: [
      {
        Name: "Lokix",
        stats: {
          hp: 346, attack: 333, defence: 280, specialAttack: 223, specialDefence: 229, speed: 311
        },
        types: ["Bug Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/lokix.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/lokix.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Pawmi: {
    Name: "Pawmi",
    stats: {
      hp: 294, attack: 218, defence: 152, specialAttack: 196, specialDefence: 163, speed: 240
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/pawmi.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/pawmi.mp3",
    evolutions: [
      {
        Name: "Pawmo",
        stats: {
          hp: 324, attack: 273, defence: 196, specialAttack: 218, specialDefence: 196, speed: 295
        },
        types: ["Electric Fighting"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/pawmo.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/pawmo.mp3",
        evolutions: [
          { Name: "Pawmo" },
          { Name: "t" }
        ],
        forms: {
          t: {
            Name: "Pawmot",
            stats: {
              hp: 344, attack: 361, defence: 262, specialAttack: 262, specialDefence: 240, speed: 339
            },
            types: ["Electric Fighting"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/pawmot.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/pawmot.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Tandemaus: {
    Name: "Tandemaus",
    stats: {
      hp: 304, attack: 218, defence: 207, specialAttack: 196, specialDefence: 207, speed: 273
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tandemaus.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tandemaus.mp3",
    evolutions: [
      {
        Name: "Maushold",
        stats: {
          hp: 352, attack: 273, defence: 262, specialAttack: 251, specialDefence: 273, speed: 353
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/maushold.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/maushold.mp3",
        evolutions: [],
        forms: {
          Four: {
            Name: "Maushold Four",
            stats: {
              hp: 352, attack: 273, defence: 262, specialAttack: 251, specialDefence: 273, speed: 353
            },
            types: ["Normal"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/maushold-four.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/maushold-four.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Fidough: {
    Name: "Fidough",
    stats: {
      hp: 278, attack: 229, defence: 262, specialAttack: 174, specialDefence: 229, speed: 251
    },
    types: ["Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/fidough.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/fidough.mp3",
    evolutions: [
      {
        Name: "Dachsbun",
        stats: {
          hp: 318, attack: 284, defence: 361, specialAttack: 218, specialDefence: 284, speed: 317
        },
        types: ["Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/dachsbun.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/dachsbun.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Smoliv: {
    Name: "Smoliv",
    stats: {
      hp: 286, attack: 185, defence: 207, specialAttack: 236, specialDefence: 221, speed: 174
    },
    types: ["Grass Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/smoliv.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/smoliv.mp3",
    evolutions: [
      {
        Name: "Dolliv",
        stats: {
          hp: 308, attack: 225, defence: 240, specialAttack: 280, specialDefence: 280, speed: 181
        },
        types: ["Grass Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/dolliv.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/dolliv.mp3",
        evolutions: [
          {
            Name: "Arboliva",
            stats: {
              hp: 360, attack: 260, defence: 306, specialAttack: 383, specialDefence: 348, speed: 194
            },
            types: ["Grass Normal"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/arboliva.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/arboliva.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Squawkabilly: {
    Name: "Squawkabilly",
    stats: {
      hp: 368, attack: 320, defence: 221, specialAttack: 207, specialDefence: 221, speed: 311
    },
    types: ["Normal Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/squawkabilly.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/squawkabilly.mp3",
    evolutions: [],
    forms: {
      Blue: {
        Name: "Squawkabilly Blue",
        stats: {
          hp: 368, attack: 320, defence: 221, specialAttack: 207, specialDefence: 221, speed: 311
        },
        types: ["Normal Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/squawkabilly-blue.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/squawkabilly-blue.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      White: {
        Name: "Squawkabilly White",
        stats: {
          hp: 368, attack: 320, defence: 221, specialAttack: 207, specialDefence: 221, speed: 311
        },
        types: ["Normal Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/squawkabilly-white.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/squawkabilly-white.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Yellow: {
        Name: "Squawkabilly Yellow",
        stats: {
          hp: 368, attack: 320, defence: 221, specialAttack: 207, specialDefence: 221, speed: 311
        },
        types: ["Normal Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/squawkabilly-yellow.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/squawkabilly-yellow.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Final"
  },

  Nacli: {
    Name: "Nacli",
    stats: {
      hp: 314, attack: 229, defence: 273, specialAttack: 185, specialDefence: 185, speed: 163
    },
    types: ["Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/nacli.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/nacli.mp3",
    evolutions: [
      {
        Name: "Naclstack",
        stats: {
          hp: 324, attack: 240, defence: 328, specialAttack: 185, specialDefence: 251, speed: 185
        },
        types: ["Rock"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/naclstack.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/naclstack.mp3",
        evolutions: [
          {
            Name: "Garganacl",
            stats: {
              hp: 404, attack: 328, defence: 394, specialAttack: 207, specialDefence: 306, speed: 185
            },
            types: ["Rock"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/garganacl.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/garganacl.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Charcadet: {
    Name: "Charcadet",
    stats: {
      hp: 284, attack: 218, defence: 196, specialAttack: 218, specialDefence: 196, speed: 185
    },
    types: ["Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/charcadet.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/charcadet.mp3",
    evolutions: [
      {
        Name: "Armarouge",
        stats: {
          hp: 374, attack: 240, defence: 328, specialAttack: 383, specialDefence: 284, speed: 273
        },
        types: ["Fire Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/armarouge.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/armarouge.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      {
        Name: "Ceruledge",
        stats: {
          hp: 354, attack: 383, defence: 284, specialAttack: 240, specialDefence: 328, speed: 295
        },
        types: ["Fire Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/ceruledge.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/ceruledge.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Tadbulb: {
    Name: "Tadbulb",
    stats: {
      hp: 326, attack: 177, defence: 199, specialAttack: 238, specialDefence: 185, speed: 207
    },
    types: ["Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tadbulb.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tadbulb.mp3",
    evolutions: [
      {
        Name: "Bellibolt",
        stats: {
          hp: 422, attack: 249, defence: 309, specialAttack: 335, specialDefence: 291, speed: 207
        },
        types: ["Electric"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/bellibolt.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/bellibolt.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Wattrel: {
    Name: "Wattrel",
    stats: {
      hp: 284, attack: 196, defence: 185, specialAttack: 229, specialDefence: 196, speed: 262
    },
    types: ["Electric Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/wattrel.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/wattrel.mp3",
    evolutions: [
      {
        Name: "Kilowattrel",
        stats: {
          hp: 344, attack: 262, defence: 240, specialAttack: 339, specialDefence: 240, speed: 383
        },
        types: ["Electric Flying"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/kilowattrel.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/kilowattrel.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Maschiff: {
    Name: "Maschiff",
    stats: {
      hp: 324, attack: 280, defence: 240, specialAttack: 196, specialDefence: 221, speed: 221
    },
    types: ["Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/maschiff.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/maschiff.mp3",
    evolutions: [
      {
        Name: "Mabosstiff",
        stats: {
          hp: 364, attack: 372, defence: 306, specialAttack: 240, specialDefence: 262, speed: 295
        },
        types: ["Dark"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/mabosstiff.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/mabosstiff.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Shroodle: {
    Name: "Shroodle",
    stats: {
      hp: 284, attack: 251, defence: 185, specialAttack: 196, specialDefence: 185, speed: 273
    },
    types: ["Poison Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/shroodle.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/shroodle.mp3",
    evolutions: [
      {
        Name: "Grafaiai",
        stats: {
          hp: 330, attack: 317, defence: 251, specialAttack: 284, specialDefence: 267, speed: 350
        },
        types: ["Poison Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/grafaiai.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/grafaiai.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Bramblin: {
    Name: "Bramblin",
    stats: {
      hp: 284, attack: 251, defence: 174, specialAttack: 207, specialDefence: 185, speed: 240
    },
    types: ["Grass Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bramblin.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/bramblin.mp3",
    evolutions: [
      {
        Name: "Brambleghast",
        stats: {
          hp: 314, attack: 361, defence: 262, specialAttack: 284, specialDefence: 262, speed: 306
        },
        types: ["Grass Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/brambleghast.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/brambleghast.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Toedscool: {
    Name: "Toedscool",
    stats: {
      hp: 284, attack: 196, defence: 185, specialAttack: 218, specialDefence: 328, speed: 262
    },
    types: ["Ground Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/toedscool.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/toedscool.mp3",
    evolutions: [
      {
        Name: "Toedscruel",
        stats: {
          hp: 364, attack: 262, defence: 251, specialAttack: 284, specialDefence: 372, speed: 328
        },
        types: ["Ground Grass"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/toedscruel.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/toedscruel.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Klawf: {
    Name: "Klawf",
    stats: {
      hp: 344, attack: 328, defence: 361, specialAttack: 185, specialDefence: 229, speed: 273
    },
    types: ["Rock"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/klawf.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/klawf.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Capsakid: {
    Name: "Capsakid",
    stats: {
      hp: 304, attack: 245, defence: 196, specialAttack: 245, specialDefence: 196, speed: 218
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/capsakid.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/capsakid.mp3",
    evolutions: [
      {
        Name: "Scovillain",
        stats: {
          hp: 334, attack: 346, defence: 251, specialAttack: 346, specialDefence: 251, speed: 273
        },
        types: ["Grass Fire"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/scovillain.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/scovillain.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Rellor: {
    Name: "Rellor",
    stats: {
      hp: 286, attack: 218, defence: 240, specialAttack: 177, specialDefence: 236, speed: 174
    },
    types: ["Bug"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/rellor.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/rellor.mp3",
    evolutions: [
      {
        Name: "Rabsca",
        stats: {
          hp: 354, attack: 218, defence: 295, specialAttack: 361, specialDefence: 328, speed: 207
        },
        types: ["Bug Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/rabsca.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/rabsca.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Flittle: {
    Name: "Flittle",
    stats: {
      hp: 264, attack: 185, defence: 174, specialAttack: 229, specialDefence: 174, speed: 273
    },
    types: ["Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/flittle.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/flittle.mp3",
    evolutions: [
      {
        Name: "spatkthra",
        stats: {
          hp: 394, attack: 240, defence: 240, specialAttack: 331, specialDefence: 240, speed: 339
        },
        types: ["Psychic"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/spatkthra.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/spatkthra.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Tinkatink: {
    Name: "Tinkatink",
    stats: {
      hp: 304, attack: 207, defence: 207, specialAttack: 185, specialDefence: 249, speed: 236
    },
    types: ["Fairy Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tinkatink.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tinkatink.mp3",
    evolutions: [
      {
        Name: "Tinkatuff",
        stats: {
          hp: 334, attack: 229, defence: 229, specialAttack: 207, specialDefence: 289, speed: 280
        },
        types: ["Fairy Steel"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/tinkatuff.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/tinkatuff.mp3",
        evolutions: [
          {
            Name: "Tinkaton",
            stats: {
              hp: 374, attack: 273, defence: 278, specialAttack: 262, specialDefence: 339, speed: 315
            },
            types: ["Fairy Steel"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/tinkaton.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/tinkaton.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Wiglett: {
    Name: "Wiglett",
    stats: {
      hp: 224, attack: 229, defence: 163, specialAttack: 185, specialDefence: 163, speed: 317
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/wiglett.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/wiglett.mp3",
    evolutions: [
      {
        Name: "Wugtrio",
        stats: {
          hp: 274, attack: 328, defence: 218, specialAttack: 218, specialDefence: 262, speed: 372
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/wugtrio.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/wugtrio.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Bombirdier: {
    Name: "Bombirdier",
    stats: {
      hp: 344, attack: 335, defence: 295, specialAttack: 240, specialDefence: 295, speed: 289
    },
    types: ["Flying Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/bombirdier.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/bombirdier.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Finizen: {
    Name: "Finizen",
    stats: {
      hp: 344, attack: 207, defence: 196, specialAttack: 207, specialDefence: 196, speed: 273
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/finizen.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/finizen.mp3",
    evolutions: [
      {
        Name: "Palafin",
        stats: {
          hp: 404, attack: 262, defence: 267, specialAttack: 225, specialDefence: 245, speed: 328
        },
        types: ["Water"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/palafin.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/palafin.mp3",
        evolutions: [],
        forms: {
          Hero: {
            Name: "Palafin Hero",
            stats: {
              hp: 404, attack: 460, defence: 322, specialAttack: 342, specialDefence: 300, speed: 328
            },
            types: ["Water"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/palafin-hero.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/palafin-hero.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Varoom: {
    Name: "Varoom",
    stats: {
      hp: 294, attack: 262, defence: 247, specialAttack: 174, specialDefence: 207, speed: 212
    },
    types: ["Steel Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/varoom.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/varoom.mp3",
    evolutions: [
      {
        Name: "Revavroom",
        stats: {
          hp: 364, attack: 370, defence: 306, specialAttack: 227, specialDefence: 256, speed: 306
        },
        types: ["Steel Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/revavroom.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/revavroom.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Cyclizar: {
    Name: "Cyclizar",
    stats: {
      hp: 344, attack: 317, defence: 251, specialAttack: 295, specialDefence: 251, speed: 375
    },
    types: ["Dragon Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cyclizar.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cyclizar.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Orthworm: {
    Name: "Orthworm",
    stats: {
      hp: 344, attack: 295, defence: 427, specialAttack: 240, specialDefence: 229, speed: 251
    },
    types: ["Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/orthworm.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/orthworm.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Glimmet: {
    Name: "Glimmet",
    stats: {
      hp: 300, attack: 185, defence: 201, specialAttack: 339, specialDefence: 240, speed: 240
    },
    types: ["Rock Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/glimmet.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/glimmet.mp3",
    evolutions: [
      {
        Name: "Glimmora",
        stats: {
          hp: 370, attack: 229, defence: 306, specialAttack: 394, specialDefence: 287, speed: 298
        },
        types: ["Rock Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/glimmora.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/glimmora.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Greavard: {
    Name: "Greavard",
    stats: {
      hp: 304, attack: 243, defence: 240, specialAttack: 174, specialDefence: 229, speed: 183
    },
    types: ["Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/greavard.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/greavard.mp3",
    evolutions: [
      {
        Name: "Houndstone",
        stats: {
          hp: 348, attack: 331, defence: 328, specialAttack: 218, specialDefence: 322, speed: 258
        },
        types: ["Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/houndstone.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/houndstone.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Flamigo: {
    Name: "Flamigo",
    stats: {
      hp: 368, attack: 361, defence: 271, specialAttack: 273, specialDefence: 249, speed: 306
    },
    types: ["Flying Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/flamigo.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/flamigo.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Cetoddle: {
    Name: "Cetoddle",
    stats: {
      hp: 420, attack: 258, defence: 207, specialAttack: 174, specialDefence: 196, speed: 203
    },
    types: ["Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/cetoddle.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/cetoddle.mp3",
    evolutions: [
      {
        Name: "Cetitan",
        stats: {
          hp: 544, attack: 357, defence: 251, specialAttack: 207, specialDefence: 229, speed: 269
        },
        types: ["Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/cetitan.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/cetitan.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Veluza: {
    Name: "Veluza",
    stats: {
      hp: 384, attack: 333, defence: 269, specialAttack: 280, specialDefence: 251, speed: 262
    },
    types: ["Water Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/veluza.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/veluza.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Dondozo: {
    Name: "Dondozo",
    stats: {
      hp: 504, attack: 328, defence: 361, specialAttack: 251, specialDefence: 251, speed: 185
    },
    types: ["Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/dondozo.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/dondozo.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Tatsugiri: {
    Name: "Tatsugiri",
    stats: {
      hp: 340, attack: 218, defence: 240, specialAttack: 372, specialDefence: 317, speed: 289
    },
    types: ["Dragon Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/tatsugiri.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/tatsugiri.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Clodsire: {
    Name: "Clodsire",
    stats: {
      hp: 464, attack: 273, defence: 240, specialAttack: 207, specialDefence: 328, speed: 152
    },
    types: ["Poison Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/clodsire.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/clodsire.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  GreatTusk: {
    Name: "Great Tusk",
    stats: {
      hp: 434, attack: 397, defence: 397, specialAttack: 225, specialDefence: 225, speed: 300
    },
    types: ["Ground Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/greattusk.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/greattusk.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  ScreamTail: {
    Name: "Scream Tail",
    stats: {
      hp: 434, attack: 251, defence: 326, specialAttack: 251, specialDefence: 361, speed: 353
    },
    types: ["Fairy Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/screamtail.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/screamtail.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  BruteBonnet: {
    Name: "Brute Bonnet",
    stats: {
      hp: 426, attack: 388, defence: 326, specialAttack: 282, specialDefence: 326, speed: 229
    },
    types: ["Grass Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/brutebonnet.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/brutebonnet.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  FlutterMane: {
    Name: "Flutter Mane",
    stats: {
      hp: 314, attack: 229, defence: 229, specialAttack: 405, specialDefence: 405, speed: 405
    },
    types: ["Ghost Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/fluttermane.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/fluttermane.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  SlitherWing: {
    Name: "Slither Wing",
    stats: {
      hp: 374, attack: 405, defence: 282, specialAttack: 295, specialDefence: 339, speed: 287
    },
    types: ["Bug Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/slitherwing.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/slitherwing.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  SandyShocks: {
    Name: "Sandy Shocks",
    stats: {
      hp: 374, attack: 287, defence: 322, specialAttack: 375, specialDefence: 295, speed: 331
    },
    types: ["Electric Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/sandyshocks.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/sandyshocks.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  IronTreads: {
    Name: "Iron Treads",
    stats: {
      hp: 384, attack: 355, defence: 372, specialAttack: 267, specialDefence: 262, speed: 342
    },
    types: ["Ground Steel"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/irontreads.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/irontreads.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  IronBundle: {
    Name: "Iron Bundle",
    stats: {
      hp: 316, attack: 284, defence: 359, specialAttack: 381, specialDefence: 240, speed: 408
    },
    types: ["Ice Water"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/ironbundle.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/ironbundle.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  IronHands: {
    Name: "Iron Hands",
    stats: {
      hp: 512, attack: 416, defence: 346, specialAttack: 218, specialDefence: 258, speed: 218
    },
    types: ["Fighting Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/ironhands.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/ironhands.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  IronJugulis: {
    Name: "Iron Jugulis",
    stats: {
      hp: 392, attack: 284, defence: 298, specialAttack: 377, specialDefence: 284, speed: 346
    },
    types: ["Dark Flying"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/ironjugulis.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/ironjugulis.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  IronMoth: {
    Name: "Iron Moth",
    stats: {
      hp: 364, attack: 262, defence: 240, specialAttack: 416, specialDefence: 350, speed: 350
    },
    types: ["Fire Poison"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/ironmoth.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/ironmoth.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  IronThorns: {
    Name: "Iron Thorns",
    stats: {
      hp: 404, attack: 403, defence: 350, specialAttack: 262, specialDefence: 293, speed: 267
    },
    types: ["Rock Electric"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/ironthorns.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/ironthorns.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Frigibax: {
    Name: "Frigibax",
    stats: {
      hp: 334, attack: 273, defence: 207, specialAttack: 185, specialDefence: 207, speed: 229
    },
    types: ["Dragon Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/frigibax.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/frigibax.mp3",
    evolutions: [
      {
        Name: "Arctibax",
        stats: {
          hp: 384, attack: 317, defence: 254, specialAttack: 207, specialDefence: 251, speed: 245
        },
        types: ["Dragon Ice"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/arctibax.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/arctibax.mp3",
        evolutions: [
          {
            Name: "Baxcalibur",
            stats: {
              hp: 434, attack: 427, defence: 311, specialAttack: 273, specialDefence: 298, speed: 300
            },
            types: ["Dragon Ice"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/baxcalibur.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/baxcalibur.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Gimmighoul: {
    Name: "Gimmighoul",
    stats: {
      hp: 294, attack: 174, defence: 262, specialAttack: 273, specialDefence: 262, speed: 130
    },
    types: ["Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/gimmighoul.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/gimmighoul.mp3",
    evolutions: [
      {
        Name: "Gholdengo",
        stats: {
          hp: 378, attack: 240, defence: 317, specialAttack: 401, specialDefence: 309, speed: 293
        },
        types: ["Steel Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/gen5/gholdengo.png",
        cry: "https://play.pokemonshowdown.com/audio/cries/gholdengo.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    ],
    forms: {
      Roaming: {
        Name: "Gimmighoul Roaming",
        stats: {
          hp: 294, attack: 174, defence: 163, specialAttack: 273, specialDefence: 207, speed: 284
        },
        types: ["Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/gen5/gimmighoul-roaming.png",
        cry: "https://play.pokemonshowdown.com/audio/cries/gimmighoul-roaming.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  WoChien: {
    Name: "Wo Chien",
    stats: {
      hp: 374, attack: 295, defence: 328, specialAttack: 317, specialDefence: 405, speed: 262
    },
    types: ["Dark Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/wochien.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/wochien.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  ChienPao: {
    Name: "Chien Pao",
    stats: {
      hp: 364, attack: 372, defence: 284, specialAttack: 306, specialDefence: 251, speed: 405
    },
    types: ["Dark Ice"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/chienpao.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/chienpao.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  TingLu: {
    Name: "Ting Lu",
    stats: {
      hp: 514, attack: 350, defence: 383, specialAttack: 229, specialDefence: 284, speed: 207
    },
    types: ["Dark Ground"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/tinglu.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/tinglu.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  ChiYu: {
    Name: "Chi Yu",
    stats: {
      hp: 314, attack: 284, defence: 284, specialAttack: 405, specialDefence: 372, speed: 328
    },
    types: ["Dark Fire"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/chiyu.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/chiyu.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  RoaringMoon: {
    Name: "Roaring Moon",
    stats: {
      hp: 414, attack: 414, defence: 265, specialAttack: 229, specialDefence: 331, speed: 370
    },
    types: ["Dragon Dark"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/roaringmoon.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/roaringmoon.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  IronValiant: {
    Name: "Iron Valiant",
    stats: {
      hp: 352, attack: 394, defence: 306, specialAttack: 372, specialDefence: 240, speed: 364
    },
    types: ["Fairy Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/ironvaliant.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/ironvaliant.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Koraidon: {
    Name: "Koraidon",
    stats: {
      hp: 404, attack: 405, defence: 361, specialAttack: 295, specialDefence: 328, speed: 405
    },
    types: ["Fighting Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/koraidon.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/koraidon.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Miraidon: {
    Name: "Miraidon",
    stats: {
      hp: 404, attack: 295, defence: 328, specialAttack: 405, specialDefence: 361, speed: 405
    },
    types: ["Electric Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/miraidon.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/miraidon.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  WalkingWake: {
    Name: "Walking Wake",
    stats: {
      hp: 402, attack: 291, defence: 309, specialAttack: 383, specialDefence: 291, speed: 348
    },
    types: ["Water Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/walkingwake.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/walkingwake.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  IronLeaves: {
    Name: "Iron Leaves",
    stats: {
      hp: 384, attack: 394, defence: 302, specialAttack: 262, specialDefence: 346, speed: 337
    },
    types: ["Grass Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/ironleaves.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/ironleaves.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Poltchageist: {
    Name: "Poltchageist",
    stats: {
      hp: 284, attack: 207, defence: 207, specialAttack: 271, specialDefence: 227, speed: 218
    },
    types: ["Grass Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/poltchageist.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/poltchageist.mp3",
    evolutions: [
      {
        Name: "Sinistcha",
        stats: {
          hp: 346, attack: 240, defence: 342, specialAttack: 375, specialDefence: 284, speed: 262
        },
        types: ["Grass Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/sinistcha.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/sinistcha.mp3",
        evolutions: [],
        forms: {
          Masterpiece: {
            Name: "Sinistcha Masterpiece",
            stats: {
              hp: 346, attack: 240, defence: 342, specialAttack: 375, specialDefence: 284, speed: 262
            },
            types: ["Grass Ghost"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/sinistcha-masterpiece.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/sinistcha-masterpiece.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Final"
      }
    ],
    forms: {
      Artisan: {
        Name: "Poltchageist Artisan",
        stats: {
          hp: 284, attack: 207, defence: 207, specialAttack: 271, specialDefence: 227, speed: 218
        },
        types: ["Grass Ghost"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/poltchageist-artisan.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/poltchageist-artisan.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

  Okidogi: {
    Name: "Okidogi",
    stats: {
      hp: 380, attack: 390, defence: 361, specialAttack: 236, specialDefence: 298, speed: 284
    },
    types: ["Poison Fighting"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/okidogi.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/okidogi.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Munkidori: {
    Name: "Munkidori",
    stats: {
      hp: 380, attack: 273, defence: 254, specialAttack: 394, specialDefence: 306, speed: 342
    },
    types: ["Poison Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/munkidori.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/munkidori.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Fezandipiti: {
    Name: "Fezandipiti",
    stats: {
      hp: 380, attack: 309, defence: 289, specialAttack: 262, specialDefence: 383, speed: 326
    },
    types: ["Poison Fairy"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/fezandipiti.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/fezandipiti.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Ogerpon: {
    Name: "Ogerpon",
    stats: {
      hp: 364, attack: 372, defence: 293, specialAttack: 240, specialDefence: 320, speed: 350
    },
    types: ["Grass"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/ogerpon.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/ogerpon.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Legendary"
  },

  Hydrapple: {
    Name: "Hydrapple",
    stats: {
      hp: 416, attack: 284, defence: 350, specialAttack: 372, specialDefence: 284, speed: 205
    },
    types: ["Grass Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/ani/hydrapple.gif",
    cry: "https://play.pokemonshowdown.com/audio/cries/hydrapple.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  GougingFire: {
    Name: "Gouging Fire",
    stats: {
      hp: 414, attack: 361, defence: 375, specialAttack: 251, specialDefence: 313, speed: 309
    },
    types: ["Fire Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/gougingfire.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/gougingfire.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  RagingBolt: {
    Name: "Raging Bolt",
    stats: {
      hp: 454, attack: 269, defence: 309, specialAttack: 410, specialDefence: 304, speed: 273
    },
    types: ["Electric Dragon"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/ragingbolt.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/ragingbolt.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  IronBoulder: {
    Name: "Iron Boulder",
    stats: {
      hp: 384, attack: 372, defence: 284, specialAttack: 258, specialDefence: 346, speed: 381
    },
    types: ["Rock Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/ironboulder.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/ironboulder.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  IronCrown: {
    Name: "Iron Crown",
    stats: {
      hp: 384, attack: 267, defence: 328, specialAttack: 377, specialDefence: 346, speed: 324
    },
    types: ["Steel Psychic"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/ironcrown.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/ironcrown.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Final"
  },

  Terapagos: {
    Name: "Terapagos",
    stats: {
      hp: 384, attack: 251, defence: 295, specialAttack: 251, specialDefence: 295, speed: 240
    },
    types: ["Normal"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/terapagos.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/terapagos.mp3",
    evolutions: [],
    forms: {
      Stellar: {
        Name: "Terapagos Stellar",
        stats: {
          hp: 524, attack: 339, defence: 350, specialAttack: 394, specialDefence: 350, speed: 295
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/gen5/terapagos-stellar.png",
        cry: "https://play.pokemonshowdown.com/audio/cries/terapagos.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      Terastal: {
        Name: "Terapagos Terastal",
        stats: {
          hp: 394, attack: 317, defence: 350, specialAttack: 339, specialDefence: 350, speed: 295
        },
        types: ["Normal"],
        sprite: "https://play.pokemonshowdown.com/sprites/gen5/terapagos-terastal.png",
        cry: "https://play.pokemonshowdown.com/audio/cries/terapagos.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Legendary"
  },

  Pecharunt: {
    Name: "Pecharunt",
    stats: {
      hp: 380, attack: 302, defence: 460, specialAttack: 302, specialDefence: 302, speed: 302
    },
    types: ["Poison Ghost"],
    sprite: "https://play.pokemonshowdown.com/sprites/gen5/pecharunt.png",
    cry: "https://play.pokemonshowdown.com/audio/cries/pecharunt.mp3",
    evolutions: [],
    forms: {

    },
    tier: "Mythical"
  },

  FlabB: {
    Name: "Flab\u00e9b\u00e9",
    stats: null,
    types: [],
    sprite: "",
    cry: "",
    evolutions: [
      {
        Name: "Floette",
        stats: {
          hp: 312, attack: 207, defence: 212, specialAttack: 273, specialDefence: 324, speed: 223
        },
        types: ["Fairy"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/floette.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/floette.mp3",
        evolutions: [
          {
            Name: "Florges",
            stats: {
              hp: 360, attack: 251, defence: 258, specialAttack: 355, specialDefence: 447, speed: 273
            },
            types: ["Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/florges.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/florges.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {
          Eternal: {
            Name: "Floette Eternal",
            stats: {
              hp: 352, attack: 251, defence: 256, specialAttack: 383, specialDefence: 390, speed: 311
            },
            types: ["Fairy"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/floette-eternal.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/floette-eternal.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        },
        tier: "Mid"
      }
    ],
    forms: {

    },
    tier: "Basic"
  },

  Nidoran: {
    Name: "Nidoran\u2640",
    stats: null,
    types: [],
    sprite: "",
    cry: "",
    evolutions: [
      {
        Name: "Nidorino",
        stats: {
          hp: 326, attack: 267, defence: 234, specialAttack: 229, specialDefence: 229, speed: 251
        },
        types: ["Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/nidorino.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/nidorino.mp3",
        evolutions: [
          {
            Name: "Nidoking",
            stats: {
              hp: 366, attack: 333, defence: 278, specialAttack: 295, specialDefence: 273, speed: 295
            },
            types: ["Poison Ground"],
            sprite: "https://play.pokemonshowdown.com/sprites/ani/nidoking.gif",
            cry: "https://play.pokemonshowdown.com/audio/cries/nidoking.mp3",
            evolutions: [],
            forms: {

            },
            tier: "Final"
          }
        ],
        forms: {

        },
        tier: "Mid"
      }
    ],
    forms: {
      Female: {
        Name: "Nidoran Female",
        stats: {
          hp: 314, attack: 212, defence: 223, specialAttack: 196, specialDefence: 196, speed: 199
        },
        types: ["Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/nidoran-f.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/nidoran-f.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      },
      M: {
        Name: "Nidoran M",
        stats: {
          hp: 296, attack: 234, defence: 196, specialAttack: 196, specialDefence: 196, speed: 218
        },
        types: ["Poison"],
        sprite: "https://play.pokemonshowdown.com/sprites/ani/nidoranm.gif",
        cry: "https://play.pokemonshowdown.com/audio/cries/nidoranm.mp3",
        evolutions: [],
        forms: {

        },
        tier: "Final"
      }
    },
    tier: "Basic"
  },

};

window.MergedPokemonData = MergedPokemonData;
