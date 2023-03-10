import React, {useContext, useState} from 'react';
import { PokemonDataContext } from '../context/PokemonDataContext';

export default function SearchBarComponent() {
    const { searchPokemons, typeFilter, searchFilter, setSearchFilter } = useContext(PokemonDataContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        searchPokemons(searchFilter, typeFilter);
    }

    return(
        <form className="search-bar" onSubmit={handleSubmit}>
            <div className="search-bar__container">
                <input type="text" placeholder="Search your Pokemon!" className="search-bar__input" required
                    onChange={(e) => setSearchFilter(e.target.value)}/>
                <button className="search-bar__button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pokeball" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <circle cx="9" cy="9" r="9" transform="translate(3 3)" /> <circle cx="12" cy="12" r="3" /> <path d="M3 12h6m6 0h6" /> </svg>                    
                </button>
            </div>
        </form>
    )
}