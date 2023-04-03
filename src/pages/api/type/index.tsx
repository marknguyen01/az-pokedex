import { NextApiRequest, NextApiResponse } from 'next';
import Type from '../../../models/Type';
import moongooseClient from '../../../lib/mongooseClient';

interface TypeSearchParam {
    search?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await moongooseClient();

    if(req.method === "GET") {
        const query:TypeSearchParam = req.query;
        let queryBuilder = Type.find({});
        if(query.search) {
            if(!isNaN(parseInt(query.search))) {
                queryBuilder = Type.find({$or: [
                    {_id: parseInt(query.search)},
                    {name: {$regex: query.search}}
                ]});
            }
            else {
                queryBuilder = Type.find({name: {$regex: query.search}});
            }
        }

        queryBuilder.exec((err, results) => {
            if (!err) {
                return res.status(200).send(results);
            } else {
                return res.status(500);
            }
        });
    }
}