import next, { NextApiRequest, NextApiResponse } from 'next';

import moongooseClient from '../../../../lib/mongooseClient';
import Pokemon from '../../../../models/Pokemon';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await moongooseClient();

    const pokemonList = await getPokemons();
    
    const bulkOps = pokemonList.map(pokemon => ({
        updateOne: {
            filter: {_id: pokemon.id},
            update: pokemon,
            upsert: true,
        }
    }));

    Pokemon.bulkWrite(bulkOps).then(result => {
        res.status(200).json({
            success: true,
        })
    }).catch(err => next(err));
}

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