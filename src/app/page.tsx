import React from 'react';
import PokemonCardComponent from '../components/PokemonCardComponent';

async function getPokemons() {
  const url = `${process.env.POKEMON_API_URL}pokedex/2`;
  
  const getPokemonsResponse = await fetch(url, {next: {revalidate: false}});

  if(!getPokemonsResponse.ok) {
    throw new Error(process.env.POKEMON_API_URL);
  }

  const getPokemonsJSON = await getPokemonsResponse.json();

  const pokemonEntries: any[] = [];
  await Promise.all(getPokemonsJSON.pokemon_entries.map(async (pokemonEntry : any) => {
    const getPokemonByIdJSON = await getPokemonById(pokemonEntry.entry_number);
    pokemonEntries.push(getPokemonByIdJSON);
  }));

  return pokemonEntries;
}

async function getPokemonById(pokemonId : bigint): Promise<any> {

  const url = `${process.env.POKEMON_API_URL}pokemon/${pokemonId}`;
  const res = await fetch(url, {next: {revalidate: false}});

  if(!res.ok) {
    throw new Error(process.env.POKEMON_API_URL);
  }
  return res.json();
}

export default async function Home() {
  const pokemonList = await getPokemons();
  pokemonList.sort((a, b) => a.id - b.id);

  return (
    <main className="container mx-auto p-6">
      <div className="pokedex_search grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-2 xl:grid-cols-6 xl:gap-3">
        <>
          { pokemonList && pokemonList.map((pokemon) => (
              <PokemonCardComponent key={pokemon.id} id={pokemon.id} name={pokemon.name} sprite={pokemon.sprites.front_default} types={pokemon.types}></PokemonCardComponent>
          ))}
        </>
      </div>
    </main>
  )
}
