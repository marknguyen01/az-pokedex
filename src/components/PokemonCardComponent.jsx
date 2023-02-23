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


export default function PokemonCardComponent({pokemons}) {
    const pokemonsJSON = JSON.parse(pokemons);
    return (
        <div className='pokedex_search grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6'>
            { pokemonsJSON.map((pokemon) => (
                <div className="pokemon-card card bg-base-100 shadow-md" key={pokemon._id}>
                    <figure className='pokemon-card_img py-10' style={createTypeBackground(pokemon.types)}>
                        <img className='w-32 h-32 backdrop-opacity-80 bg-white/30 rounded p-2' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon._id}.png`} alt={pokemon.name} />
                    </figure>
                    <div className='pokemon-card_id backdrop-opacity-80 text-white bg-white/30 text-center absolute rounded mt-2'>
                        {pokemon._id}
                    </div>
                    <div className='pokemon-card_body py-4'>
                        <h1 className='pokemon-card_name flex justify-center capitalize'>{pokemon.name}</h1>
                        <div className='pokemon-card_details'>
                            <div className='pokemon-card_types flex justify-center my-2'>
                                { pokemon.types.map((type) => 
                                    <div 
                                        key={type.type.name}
                                        className={`pokemon-card_type pokemon-card_type--${type.type.name} py-1 mx-1 rounded text-white uppercase`}
                                    >{ type.type.name }</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
