'use client';

import React from 'react';

function createTypeBackground(types) {
    const typesMap = new Map([
        ["normal", "#A8A77A"],
        ["fire", "#EE8130"],
        ["water", "#6390F0"],
        ["electric", "#F7D02C"],
        ["grass", "#7AC74C"],
        ["ice", "#96D9D6"],
        ["fighting", "#C22E28"],
        ["poison", "#A33EA1"],
        ["ground", "#E2BF65"],
        ["flying", "#A98FF3"],
        ["psychic", "#F95587"],
        ["bug", "#A6B91A"],
        ["rock", "#B6A136"],
        ["ghost", "#735797"],
        ["dragon", "#6F35FC"],
        ["dark", "#705746"],
        ["steel", "#B7B7CE"],
        ["fairy", "#D685AD"]
    ]);

    if(types.length < 2) {
        return {background: `${typesMap.get(types[0].type.name)}`}
    } else {
        return {background: `linear-gradient(90deg, ${typesMap.get(types[0].type.name)} 50%, ${typesMap.get(types[1].type.name)} 50%)`}
    }
}



function decodeStatName(statName) {
    const statNameMap = new Map([
        ["hp", "hp"],
        ["attack", "atk"],
        ["defense", "def"],
        ["special-attack", "spa"],
        ["special-defense", "spd"],
        ["speed", "spe"],
    ]);

    return statNameMap.get(statName);
}

function changeStatOrder(stat) {
    const statOrderMap = new Map([
        ["hp", 1],
        ["attack", 3],
        ["defense", 4],
        ["special-attack", 5],
        ["special-defense", 6],
        ["speed", 2],
    ]);

    return 'lg:order-' + statOrderMap.get(stat).toString();
}


export default function PokemonCardComponent({pokemons}) {
    const pokemonsJSON = JSON.parse(pokemons);
    return (
        <div className='pokedex_search grid grid-cols-2 gap-x-1 gap-y-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-3'>
            { pokemonsJSON.map((pokemon) => (
                <div className="pokemon-card card bg-base-100 shadow-md h-128" key={pokemon._id}>
                    <figure className='pokemon-card_img h-24 mb-10' style={createTypeBackground(pokemon.types)}>
                        <img className='w-32 h-32 absolute top-6' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon._id}.png`} alt={pokemon.name} />
                        <div className='pokemon-card_types flex justify-center my-2'>
                            { pokemon.types.map((type, index) => 
                                <div 
                                    key={type.type.name}
                                    className={`pokemon-card_type pokemon-card_type--${type.type.name} w-16 py-1 mx-1 backdrop-opacity-80 text-white bg-white/30 rounded text-white uppercase absolute top-2 ${index == 0 ? 'left-1' : 'right-1'}`}
                                >{ type.type.name }</div>
                            )}
                        </div>
                        <div className='pokemon-card_id backdrop-opacity-80 text-white bg-white/30 text-center absolute rounded top-2 left-1/2 transform -translate-x-1/2 px-1'>
                            {pokemon._id}
                        </div>
                    </figure>
                    <div className='pokemon-card_body p-4'>
                        <h1 className='pokemon-card_name flex justify-center capitalize font-semibold'>
                            {pokemon.name.replaceAll('-', ' ')}
                        </h1>
                        <div className='pokemon-card_details mt-3'>
                            <div className='pokemon-card__abilities card-actions justify-start overflow-y-auto h-12'>
                                { pokemon.abilities.map(ability => ability.ability.name)
                                .filter((value, index, self) => self.indexOf(value) === index).map(ability => (
                                    <div className={`pokemon-card__ability overflow-clip capitalize text-center badge badge-outline`}>
                                        {ability.replaceAll('-', ' ')}
                                    </div>    
                                ))}
                            </div>
                        </div>
                        

                        <div className='pokemon-card_details mt-3'>
                            <div className='pokemon-card__stats grid grid-cols-1 gap-1 lg:grid-cols-2'>
                                { pokemon.stats.map((stat) => (
                                    <div className={`pokemon-card__stat uppercase text-center inline-block ${changeStatOrder(stat.stat.name)}`} key={stat.stat.name}>
                                        <div className="pokemon-card__stat__name badge relative top-1.5 float-left">{decodeStatName(stat.stat.name)} {stat.base_stat}</div>
                                        <progress className="progress" value={stat.base_stat} max="255"></progress>
                                    </div>    
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
