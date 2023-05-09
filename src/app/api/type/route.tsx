import { NextRequest } from 'next/server';
import Type from '../../../models/Type';
import moongooseClient from '../../../lib/mongooseClient';
import { ErrorMessage, createErrorResponse, createSuccessResponse } from '../../../lib/apiResponseUtil';

export async function GET(req: NextRequest) {
    await moongooseClient();

    if(req.method === "GET") {
        const { searchParams } = new URL(req.url);
        const searchParam = searchParams.get("search");
        const blackListId = {
            '$and': [
                {'_id': {
                    '$ne': 10001
                }},
                {'_id': {
                    '$ne': 10002
                }}
            ]
        };
        let queryBuilder = Type.find(blackListId);
        if(searchParam) {
            if(!isNaN(parseInt(searchParam))) {
                queryBuilder = Type.find({...{$or: [
                    {_id: parseInt(searchParam)},
                    {name: {$regex: searchParam}},
                ]}, ...blackListId});
            }
            else {
                queryBuilder = Type.find({...{name: {$regex: searchParam}}, ...blackListId});
            }
        }

        try {
            const results = await queryBuilder.sort("_id").exec();

            if(results.length > 0) {
                return createSuccessResponse(results);
            }
            return createErrorResponse(404, null, ErrorMessage.TYPE_NOT_FOUND_ERROR);
        } catch (error) {
            console.log(error);
            return createErrorResponse(500, null, ErrorMessage.QUERY_EXEC_ERROR);
        }
    }
}