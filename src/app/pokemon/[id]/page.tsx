import React, { Suspense } from "react";
import fetchAPI, { FetchAPIRequest } from "../../../lib/api";
import { IPokemon } from "../../../models/Pokemon";

async function getPokemon(id:string):Promise<any> {
    return await fetchAPI(`api/pokemon/${id}`, FetchAPIRequest.GET);
}

export default async function Page({
    params,
}: {
    params: { id: string }
}) {

    const result = await getPokemon(params.id);
    const pokemon:IPokemon = result.results[0];

    console.log(pokemon);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {pokemon.name}
        </Suspense>
    )

}