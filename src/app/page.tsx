import { PokemonSearchContextProvider } from '../context/PokemonSearchContext';
import FilterPokemon from '../ui/FilterPokemon';
import SearchBar from '../components/SearchBar';
import PokemonCards from '../components/PokemonCards';
import fetchAPI, { FetchAPIRequest } from "../lib/api";
import { IType } from "../models/Type";

async function getTypes():Promise<any> {
    return await fetchAPI('/api/type', FetchAPIRequest.GET);
}

export default async function Page() {
    const res = await getTypes();
    const types:IType[] = res.results;

    console.log(res);

    return (
        <PokemonSearchContextProvider>
            <SearchBar></SearchBar>
            <FilterPokemon types={types}></FilterPokemon>
            <PokemonCards></PokemonCards>
        </PokemonSearchContextProvider>
    )
}