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
    const results = await getTypes();
    const types:IType[] = results.results;

    console.log(types);

    return (
        <PokemonSearchContextProvider>
            <SearchBar></SearchBar>
            {/* <FilterPokemon types={types}></FilterPokemon> */}
            <PokemonCards></PokemonCards>
        </PokemonSearchContextProvider>
    )
}