import React, { Suspense } from "react";
import fetchAPI, { FetchAPIRequest } from "../../../lib/api";
import { IPokemon } from "../../../models/Pokemon";

async function getPokemon(id:string):Promise<IPokemon> {
    const pokemon:IPokemon = await fetchAPI(`api/pokemon/${id}`, FetchAPIRequest.GET);
    return pokemon;
}

export default async function Page({ params: {id} }) {
    const pokemon:IPokemon = await getPokemon(id);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            { pokemon.name }
        </Suspense>
    )

}