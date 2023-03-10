import { NextApiRequest, NextApiResponse } from 'next';
import wretch from 'wretch';
import moongooseClient from '../../../../lib/mongooseClient';
import Type from '../../../../models/Type';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
        await moongooseClient();
        
        const typeList = await getTypes();

        console.log(typeList[1]);
        
        const bulkOps = typeList.map(type => ({
            updateOne: {
                filter: {_id: type.id},
                update: type,
                upsert: true,
            }
        }));

        Type.bulkWrite(bulkOps).then(result => {
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
}

async function getTypes() {
    const api = wretch(`${process.env.POKEMON_API_URL}type`, { mode: "cors"});
    const typeEntries: any[] = [];

    try {
        await api.get().json(async response  => {
            await Promise.all(response.results.map(async (entry) =>
                await api.get(`/${entry.name}`).json(json2 => {
                    typeEntries.push(json2)
                })
            )).catch((error) => new Error("Fetch error: " + error));
        }).catch((error) => new Error("Fetch error: " + error));

    } catch (error) {
        const message =
        typeof error.message === "object" && Object.keys(error.message).length > 0
          ? JSON.stringify(error.message)
          : error.response
        console.error(`${error.status}: ${message}`)
    }
    return typeEntries;
}