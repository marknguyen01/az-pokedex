import { NextApiRequest, NextApiResponse } from 'next';
import Pokemon from '../../../models/Pokemon';
import {IType} from '../../../models/Type';
import fetchAPI, { FetchAPIRequest } from '../../../lib/api';
import moongooseClient from '../../../lib/mongooseClient';

interface PokemonSearchParam {
    search?: string;
    sortBy?: string;
    type?: string;
    weakness?: string;
    ability?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await moongooseClient();

    if(req.method === "GET") {
        const query:PokemonSearchParam = req.query;
        let queryBuilder = Pokemon.find({});
        if(query.search) {
            if(!isNaN(parseInt(query.search))) {
                queryBuilder = Pokemon.find({$or: [
                    {_id: parseInt(query.search)},
                    {name: {$regex: query.search}}
                ]});
            }
            else {
                queryBuilder = Pokemon.find({name: {$regex: query.search}});
            }
        }
    
        queryBuilder.populate("types").exec(async (err, results) => {
            let finalResults = results;
            if(query.type) {
                finalResults = finalResults.filter((pokemon) => {
                    return pokemon.types.some((type:IType) => {
                        return type.name === query.type?.toLowerCase();
                    });
                });
            }

            if(query.weakness) {
                
                await fetchAPI<IType[]>('api/type', FetchAPIRequest.GET).then((data:IType[]) => {
                    if(data && data.length > 0) {
                        const currentDmg = data?.find((type:IType) => {
                            return type.name === query.weakness?.toLowerCase();
                        })?.damage_relations;
                        
                        if(currentDmg) {
                            const doubleDmgTo = currentDmg.double_damage_to.map(type => type.name);
                            const halfDmgTo = currentDmg.half_damage_to.map(type => type.name);
                            const noDmgTo = currentDmg.no_damage_to.map(type => type.name);

                            finalResults = finalResults.filter((pokemon) => {
                                let dmgMultiplier = 1;

                                pokemon.types.forEach((type:IType) => {
                                    const currentType = type.name;
                                    if(doubleDmgTo.includes(currentType)) {
                                        dmgMultiplier = dmgMultiplier * 2;
                                    }
                                    if(halfDmgTo.includes(currentType)) {
                                        dmgMultiplier = dmgMultiplier * 0.5;
                                    }
                                    if(noDmgTo.includes(currentType)) {
                                        dmgMultiplier = dmgMultiplier * 0;
                                    }
                                });
                                return dmgMultiplier >= 2;
                            });
                        }
                    }
                });


            }

            if (!err) {
                console.log(finalResults);
                return res.status(200).send(finalResults);
            } else {
                return res.status(500);
            }
        });

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log("Query: " + query.search);
            console.log("Sort by: " + query.sortBy);
            console.log("Type: " + query.type);
            console.log("Weakness: " + query.weakness);
            console.log("Ability: " + query.ability);
        }
    }
}

