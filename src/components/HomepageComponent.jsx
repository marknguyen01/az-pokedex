import React, { useState } from 'react';

import { PokemonSearchContextProvider } from '../context/PokemonSearchContext';

import SearchBarComponent from '../components/SearchBarComponent';
import FilterComponent from './FilterComponent';
import PokemonCardsComponent from './PokemonCardsComponent';

const HomepageComponent = ({types}) => {

    return(
        <PokemonSearchContextProvider>
            <SearchBarComponent></SearchBarComponent>
            <FilterComponent types={types}></FilterComponent>
            <PokemonCardsComponent></PokemonCardsComponent>
        </PokemonSearchContextProvider>
    )
}

export default HomepageComponent;