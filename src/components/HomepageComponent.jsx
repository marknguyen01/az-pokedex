import React, { useState } from 'react';

import { PokemonDataContext } from '../context/PokemonDataContext';
import PokemonCardComponent from '../components/PokemonCardComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import FilterComponent from './FilterComponent';

const HomepageComponent = ({pokemons, types}) => {
    const pokemonData = JSON.parse(pokemons);
    const typeData = JSON.parse(types);
    const [finalResults, setFinalResults] = useState(pokemonData);
    const [isLoadingCards, setLoadingCards] = useState(true);

    const [previousSearchFilter, setPreviousSearchFilter] = useState('');
    const [searchFilter, setSearchFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [weaknessFilter, setWeaknessFilter] = useState('');
    const [abilityFilter, setAbilityFilter] = useState('');

    const searchPokemons = (searchTerm, searchTypeFilter = '', searchWeaknessFilter = '', searchAbilityFilter = '') => {
        setLoadingCards(true);
        let results = {};
        // Only run search again if one of the setting is changed
        if(!(searchTerm === previousSearchFilter && searchTypeFilter === typeFilter && searchWeaknessFilter === weaknessFilter 
            && searchAbilityFilter === abilityFilter)) {
            // If all settings are default, return the full list
            if(!searchTerm && !searchTypeFilter && !searchWeaknessFilter && !searchAbilityFilter) {
                results = pokemonData;
                setTypeFilter('');
                setSearchFilter('');
                setPreviousSearchFilter('');
            }
            else {
                // If search term is just a number, filter by pokemon id
                if(searchTerm && !isNaN(parseInt(searchTerm))) {
                    results = pokemonData.filter((pokemon) => {
                        return pokemon._id.toString().includes(searchTerm) || pokemon.name.includes(searchTerm);
                    });
                    setPreviousSearchFilter(searchTerm);
                } else {
                    if(!searchTerm) {
                        results = pokemonData;
                    } else {
                        results = pokemonData.filter((pokemon) => {
                            return pokemon.name.includes(searchTerm.toLowerCase().replaceAll(' ', '-'));
                        });
                    }
                    setPreviousSearchFilter(searchTerm);
                }
                
                if(searchTypeFilter) {
                    results = results.filter((pokemon) => {
                        return pokemon.types.some((type) => {
                            return type.type.name === searchTypeFilter.toLowerCase().replaceAll(' ', '-');
                        })
                    });
                }
                setTypeFilter(searchTypeFilter);
            }
    
            console.log(results);
    
            setFinalResults(results);
        }

    }
    return(
        <PokemonDataContext.Provider value={{
            pokemonData, typeData, 
            finalResults, setFinalResults,
            isLoadingCards, setLoadingCards,
            previousSearchFilter, setPreviousSearchFilter,
            searchFilter, setSearchFilter, 
            typeFilter, setTypeFilter,
            weaknessFilter, setWeaknessFilter,
            searchPokemons,
            }}>
            <SearchBarComponent></SearchBarComponent>
            <FilterComponent></FilterComponent>
            <PokemonCardComponent></PokemonCardComponent>
        </PokemonDataContext.Provider>
    )
}

export default HomepageComponent;