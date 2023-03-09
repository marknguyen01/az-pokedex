const types = {
    "normal": {
        "double_damage_from": [{
            "name": "fighting",
        }],
        "double_damage_to": [],
        "half_damage_from": [],
        "half_damage_to": [{
                "name": "rock",
            },
            {
                "name": "steel",
            }
        ],
        "no_damage_from": [{
            "name": "ghost",
        }],
        "no_damage_to": [{
            "name": "ghost",
        }]
    },
    "fighting": {
        "double_damage_from": [{
                "name": "flying",
                "url": "https://pokeapi.co/api/v2/type/3/"
            },
            {
                "name": "psychic",
                "url": "https://pokeapi.co/api/v2/type/14/"
            },
            {
                "name": "fairy",
                "url": "https://pokeapi.co/api/v2/type/18/"
            }
        ],
        "double_damage_to": [{
                "name": "normal",
                "url": "https://pokeapi.co/api/v2/type/1/"
            },
            {
                "name": "rock",
                "url": "https://pokeapi.co/api/v2/type/6/"
            },
            {
                "name": "steel",
                "url": "https://pokeapi.co/api/v2/type/9/"
            },
            {
                "name": "ice",
                "url": "https://pokeapi.co/api/v2/type/15/"
            },
            {
                "name": "dark",
                "url": "https://pokeapi.co/api/v2/type/17/"
            }
        ],
        "half_damage_from": [{
                "name": "rock",
                "url": "https://pokeapi.co/api/v2/type/6/"
            },
            {
                "name": "bug",
                "url": "https://pokeapi.co/api/v2/type/7/"
            },
            {
                "name": "dark",
                "url": "https://pokeapi.co/api/v2/type/17/"
            }
        ],
        "half_damage_to": [{
                "name": "flying",
                "url": "https://pokeapi.co/api/v2/type/3/"
            },
            {
                "name": "poison",
                "url": "https://pokeapi.co/api/v2/type/4/"
            },
            {
                "name": "bug",
                "url": "https://pokeapi.co/api/v2/type/7/"
            },
            {
                "name": "psychic",
                "url": "https://pokeapi.co/api/v2/type/14/"
            },
            {
                "name": "fairy",
                "url": "https://pokeapi.co/api/v2/type/18/"
            }
        ],
        "no_damage_from": [],
        "no_damage_to": [{
            "name": "ghost",
            "url": "https://pokeapi.co/api/v2/type/8/"
        }]
    },
    "flying": {
            "double_damage_from": [
              {
                "name": "rock",
                "url": "https://pokeapi.co/api/v2/type/6/"
              },
              {
                "name": "electric",
                "url": "https://pokeapi.co/api/v2/type/13/"
              },
              {
                "name": "ice",
                "url": "https://pokeapi.co/api/v2/type/15/"
              }
            ],
            "double_damage_to": [
              {
                "name": "fighting",
                "url": "https://pokeapi.co/api/v2/type/2/"
              },
              {
                "name": "bug",
                "url": "https://pokeapi.co/api/v2/type/7/"
              },
              {
                "name": "grass",
                "url": "https://pokeapi.co/api/v2/type/12/"
              }
            ],
            "half_damage_from": [
              {
                "name": "fighting",
                "url": "https://pokeapi.co/api/v2/type/2/"
              },
              {
                "name": "bug",
                "url": "https://pokeapi.co/api/v2/type/7/"
              },
              {
                "name": "grass",
                "url": "https://pokeapi.co/api/v2/type/12/"
              }
            ],
            "half_damage_to": [
              {
                "name": "rock",
                "url": "https://pokeapi.co/api/v2/type/6/"
              },
              {
                "name": "steel",
                "url": "https://pokeapi.co/api/v2/type/9/"
              },
              {
                "name": "electric",
                "url": "https://pokeapi.co/api/v2/type/13/"
              }
            ],
            "no_damage_from": [
              {
                "name": "ground",
                "url": "https://pokeapi.co/api/v2/type/5/"
              }
            ],
            "no_damage_to": []


            
    }
}


export default new Map(Object.entries(types));

