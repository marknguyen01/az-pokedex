'use client';

import React, {useContext} from 'react';
import Image from 'next/image'
import { PokemonSearchContext } from '../context/PokemonSearchContext';
import { IPokemon } from '../models/Pokemon';
import { IType } from '../models/Type';

function createTypeBackground(types:IType[]) {
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
        return {background: `${typesMap.get(types[0].name)}`}
    } else {
        return {background: `linear-gradient(90deg, ${typesMap.get(types[0].name)} 50%, ${typesMap.get(types[1].name)} 50%)`}
    }
}

export default function PokemonCard({pokemons}: {
    pokemons: IPokemon[]
}) {
    const { dispatch } = useContext(PokemonSearchContext);

    return (
        <>
            { pokemons?.length > 0 ? pokemons?.map((pokemon, index) => (
                <div className="pokemon-card" key={pokemon._id}>
                    <figure className='pokemon-card__hero' style={createTypeBackground(pokemon.types)}>
                        <a className='pokemon-card__img' href={`/pokemon/${pokemon.name}`}>
                            { Number(process.env.POKEMON_IMG_LAZY_LOAD_LIMIT) && index < Number(process.env.POKEMON_IMG_LAZY_LOAD_LIMIT) ?
                                <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon._id}.png`} 
                                alt={pokemon.name} width={128} height={128}
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgAgMAAACf9p+rAAAADFBMVEUAAAC9vb3m5ub///8UsA9cAAAAAXRSTlMAQObYZgAAAPZJREFUSMft1EEOgyAQBVATDsCRPIWb9gbtwlN1w8YjlMt04Y5tCZEiijLDTEJi0rSJs3DhC4xj4DfNWf9W0ntDvRc+lCbAxyI3msswC8olMgFe0iZwzE54L7GDplvgJu0OjmkBm4gcNGxhVawnbBJg7GINEELv1wI97M6Cz8FXgICgEdyUepDQr48MJAQDYJxno8DOfwPD9tMXcIdhSnNgsGlyDO9vwUDCJZ4SAq74LEoI5gAICBqB7e40TGoojjsEfG+2rfBNS81dDcgcTA2IHDS+zumrigBY53B1kcGGDBtLfJCx0ceGJR+vbCDzEc6G/lk/XR8gtJNFwkBaRQAAAABJRU5ErkJggg==" />
                                : <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon._id}.png`} 
                                alt={pokemon.name} width={128} height={128} />
                            }
                        </a>
                        <div className='pokemon-card__types flex justify-center my-2'>
                            { pokemon.types.map((type, index) => 
                                <div 
                                    key={index}
                                    className={`pokemon-card__type pokemon-card_type--${type.name} ${index == 0 ? 'left-1' : 'right-1'}`}
                                    onClick={() => dispatch({type: "ADD_TYPE", payload: type.name})}
                                >{ type.name }</div>
                            )}
                        </div>
                    </figure>
                    <div className='pokemon-card__body'>
                        <div className='pokemon-card__id'>
                            N&deg;{pokemon._id}
                        </div>
                        <div className='pokemon-card__name'>
                            {pokemon.name.replaceAll('-', ' ')}
                        </div>
                        {/* <div className='pokemon-card__details mt-3'>
                            <div className='pokemon-card__abilities card-actions justify-start overflow-y-auto h-12'>
                                { pokemon.abilities.map(ability => ability.ability.name)
                                .filter((value, index, self) => self.indexOf(value) === index).map(ability => (
                                    <div className={`pokemon-card__ability overflow-clip capitalize text-center badge badge-outline`} key={ability}>
                                        {ability.replaceAll('-', ' ')}
                                    </div>    
                                ))}
                            </div>
                        </div>
                        

                        <div className='pokemon-card__details mt-3'>
                            <div className='pokemon-card__stats grid grid-cols-1 gap-1 lg:grid-cols-2'>
                                { pokemon.stats.map((stat) => (
                                    <div className={`pokemon-card__stat uppercase text-center inline-block ${changeStatOrder(stat.stat.name)}`} key={stat.stat.name}>
                                        <div className="pokemon-card__stat__name badge relative top-1.5 float-left">{decodeStatName(stat.stat.name)} {stat.base_stat}</div>
                                        <progress className="progress" value={stat.base_stat} max="255"></progress>
                                    </div>    
                                ))}
                            </div>
                        </div> */}
                    </div>
                </div>
            )) : <div className="pokemon-card-not-found">No Pokemon found! Please change/reset your search criterias.</div>}
        </>
    )
}
