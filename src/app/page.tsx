import mongooseClient from '@/lib/mongooseClient';
import React from 'react';
import HomepageComponent from '../components/HomepageComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import Pokemon from '../models/Pokemon';

export default async function Home() {
  await mongooseClient();

  const pokemonList = await Pokemon.find({});
  
  pokemonList.sort((a, b) => a.id - b.id);

  return (
    <main className="container mx-auto p-2 md:p-4 lg:p-6">
      <HomepageComponent pokemons={JSON.stringify(pokemonList)}></HomepageComponent>
    </main>
  )
}
