import React, { useState } from 'react';

import { PokemonSearchContextProvider } from '../context/PokemonSearchContext';

import SearchBarComponent from '../components/SearchBarComponent';
import FilterComponent from './FilterComponent';
import PokemonCardsComponent from './PokemonCardsComponent';
import NavbarComponent from './NavbarComponent';

const HomepageComponent = ({types}) => {

    return(
        <PokemonSearchContextProvider>
            <NavbarComponent></NavbarComponent>
            <SearchBarComponent></SearchBarComponent>
            <FilterComponent types={types}></FilterComponent>
            <PokemonCardsComponent></PokemonCardsComponent>
        </PokemonSearchContextProvider>
    )
}

export default HomepageComponent;