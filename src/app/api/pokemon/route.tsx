import { NextRequest } from 'next/server';
import Pokemon from '../../../models/Pokemon';
import {IType} from '../../../models/Type';
import fetchAPI, { FetchAPIRequest } from '../../../lib/api';
import moongooseClient from '../../../lib/mongooseClient';
import { ErrorMessage, createErrorResponse, createSuccessResponse } from '../../../lib/apiResponseUtil';

export async function GET(req: NextRequest) {
    await moongooseClient();

    const { searchParams } = new URL(req.url);
    const searchParam = searchParams.get("search");
    const sortByParam = searchParams.get("sortBy");
    const typeParam = searchParams.get("type");
    const weaknessParam = searchParams.get("weakness");
    const abilityParam = searchParams.get("ability");
    const limitParam = searchParams.get("limit");
    const offsetParam = searchParams.get("offset");


    let queryBuilder = Pokemon.find({});
    if(searchParam) {
        if(!isNaN(parseInt(searchParam))) {
            queryBuilder = Pokemon.find({$or: [
                {_id: parseInt(searchParam)},
                {name: {$regex: searchParam}}
            ]});
        }
        else {
            queryBuilder = Pokemon.find({name: {$regex: searchParam}});
        }
    }

    if(limitParam && isNaN(Number(limitParam))) {
        return createErrorResponse(500, "limit", ErrorMessage.NUMBER_ERROR);
    }
    if(offsetParam && isNaN(Number(offsetParam))) {
        return createErrorResponse(500, "offset", ErrorMessage.NUMBER_ERROR);
    }

    const limit:number = limitParam ? parseInt(limitParam) : 100;
    const offset:number = offsetParam ? parseInt(offsetParam) : 0;
    
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        console.log("Query: " + searchParam);
        console.log("Sort by: " + sortByParam);
        console.log("Type: " + typeParam);
        console.log("Weakness: " + weaknessParam);
        console.log("Ability: " + abilityParam);
        console.log("Limit: " + limit);
        console.log("Offset: " + offset);
    }

    try {
        const results = await queryBuilder.sort('_id').skip(offset * limit).limit(limit).populate("types").exec();

        if(results.length > 0) {
            let finalResults:any = results;
            if(typeParam) {
                finalResults = finalResults.filter((pokemon:any) => {
                    return pokemon.types.some((type:any) => {
                        return type.name === typeParam?.toLowerCase();
                    });
                });
            }

            if(weaknessParam) {
                await fetchAPI<IType[]>('api/type', FetchAPIRequest.GET).then((data:IType[]) => {
                    if(data && data.length > 0) {
                        const currentDmg = data?.find((type:IType) => {
                            return type.name === weaknessParam.toLowerCase();
                        })?.damage_relations;
                        
                        if(currentDmg) {
                            const doubleDmgTo = currentDmg.double_damage_to.map(type => type.name);
                            const halfDmgTo = currentDmg.half_damage_to.map(type => type.name);
                            const noDmgTo = currentDmg.no_damage_to.map(type => type.name);

                            finalResults = finalResults.filter((pokemon:any) => {
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
            console.log(finalResults.slice(0,3));
            return createSuccessResponse(finalResults);
        } else {
            return createErrorResponse(404, null, ErrorMessage.POKEMON_NOT_FOUND_ERROR);
        }
    } catch(err) {
        console.log(err);
        return createErrorResponse(500, null, ErrorMessage.QUERY_EXEC_ERROR);
    }


}

