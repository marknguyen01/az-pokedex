'use client';

import React, { useState, createContext, useEffect } from 'react';

import PokemonCardComponent from '../components/PokemonCardComponent';
import SearchBarComponent from '../components/SearchBarComponent';

export const PokemonContext = createContext();

const HomepageComponent = ({pokemons}) => {
    const pokemonsObj = JSON.parse(pokemons);
    const [pokemonList, setPokemonList] = useState(pokemonsObj);
    const [previousSearchTerm, setPreviousSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('');

    const filterPokemons = (searchTerm, searchCategory) => {
        // Avoid running search again if it's the same search term
        if(previousSearchTerm !== searchTerm) {
            // Display all pokemons if empty
            if(searchTerm === '') {
                setPokemonList(pokemonsObj);
            } else {
                // If search term is just a number, filter by pokemon id
                if(!isNaN(parseInt(searchTerm))) {
                    setPokemonList(pokemonsObj.filter((pokemon) => {
                        return pokemon._id == searchTerm
                    }));
                } else {
                    // Search by category
                    setPokemonList(pokemonsObj.filter((pokemon) => {
                        if(searchCategory === 'types') {
                            return pokemon.types.some((type) => {
                                return type.type.name === searchTerm.toLowerCase().replaceAll(' ', '-');
                            });
                        } else {
                            return pokemon.name.includes(searchTerm.toLowerCase().replaceAll(' ', '-'));
                        }
                    }));
                }
            }
            setPreviousSearchTerm(searchTerm);
        }
    }

    const updateSearchCategoryState = (nextState) => {
        setSearchCategory(nextState);
    }

    return(
        <>
            <SearchBarComponent filterPokemons={filterPokemons}></SearchBarComponent>
            <PokemonCardComponent pokemons={pokemonList} filterPokemons={filterPokemons} updateSearchCategoryState={updateSearchCategoryState}></PokemonCardComponent>
        </>
    )
}

export default HomepageComponent;