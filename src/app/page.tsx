import mongooseClient from '@/lib/mongooseClient';
import React from 'react';
import PokemonCardComponent from '../components/PokemonCardComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import Pokemon from '../models/Pokemon';

export default async function Home() {
  await mongooseClient();

  const pokemonList = await Pokemon.find({});
  
  pokemonList.sort((a, b) => a.id - b.id);

  return (
    <main className="container mx-auto p-2 md:p-4 lg:p-6">
      <SearchBarComponent></SearchBarComponent>
      <PokemonCardComponent pokemons={JSON.stringify(pokemonList)}></PokemonCardComponent>
    </main>
  )
}
