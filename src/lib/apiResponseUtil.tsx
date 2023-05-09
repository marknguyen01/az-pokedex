import { NextResponse } from "next/server";

export enum ErrorMessage {
    POKEMON_NOT_FOUND_ERROR = "No pokemon was found!",
    TYPE_NOT_FOUND_ERROR = "No type was found!",
    QUERY_EXEC_ERROR = "Query failed to execute!",
    NUMBER_ERROR = "Must be a number",
}

export function createErrorResponse(errorCode: number, errorField: string | null, errorMessage: string) {
    if(errorField) {
        return NextResponse.json({
            success: false,
            message: {
                [errorField]: errorMessage
            },
            results: []
            }, { status: 500 }
        )
    }

    return NextResponse.json({
        success: false,
        message: errorMessage,
        results: []
        }, { status: 500 }
    )
}

export function createSuccessResponse(results:any[]) {
    return NextResponse.json({
        success: true,
        message: "",
        results: results
        }, { status: 200 }
    ) 
}