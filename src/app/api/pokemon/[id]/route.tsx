import { NextRequest, NextResponse } from 'next/server';
import mongooseClient from '../../../../lib/mongooseClient';
import Pokemon from '../../../../models/Pokemon';
import { ErrorMessage, createErrorResponse, createSuccessResponse } from '../../../../lib/apiResponseUtil';

export async function GET(request: NextRequest, {
  params,
}: {
  params: {id: string}
}) {
  await mongooseClient();

  const id = params.id;
  const query = Pokemon.find();

  query.or([
    { _id: id },
    { name: id}
  ]).populate("types");

  try {
    const pokemon = await query.exec();
    if(pokemon.length > 0)
      return createSuccessResponse(pokemon);
    return createErrorResponse(404, null, ErrorMessage.POKEMON_NOT_FOUND_ERROR);
  }
  catch {
    return createErrorResponse(500, null, ErrorMessage.QUERY_EXEC_ERROR);
  }
}