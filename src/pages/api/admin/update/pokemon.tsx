import { NextApiRequest, NextApiResponse } from 'next';

import moongooseClient from '../../../../lib/mongooseClient';
import Pokemon from '../../../../models/Pokemon';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // The intention is to run this test env where you have more resources to scrap the data
    // Disable this in prod if your server can't handle the work load
    // if(!process.env.DISABLE_ADMIN_SCRAP_IN_PROD) {
        await moongooseClient();

        const pokemonList = await getPokemons();

        const bulkOps = pokemonList.map(pokemon => {

            pokemon.types = pokemon.types.map((type:any) => {
                const paths = type.type.url.split("/");
                return parseInt(paths[paths.length - 2]);
            });

            console.log(pokemon.types);

            return { updateOne: {
                filter: {_id: pokemon.id},
                update: pokemon,
                upsert: true,
            }}
        });
    
        Pokemon.bulkWrite(bulkOps).then(() => {
            res.json({
                success: true,
            })
            res.status(200).end();
        }).catch(err => {
            console.log(err);
            res.json({
                success: false,
            });
            res.status(400).end();
        });
    //}
}

async function getPokemons() {
    const url = `${process.env.POKEMON_API_URL}pokedex/1`;
    
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