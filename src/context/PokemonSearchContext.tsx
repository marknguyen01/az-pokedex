"use client";

import React, { useReducer, createContext } from "react";

interface State {
    query: string,
    type: string,
    weakness: string,
    offset: number,
    loading: boolean,
}

type Action = 
    | { type: 'FETCH' }
    | { type: 'QUERY', payload: string }
    | {type: 'ADD_TYPE', payload: string}
    | {type: 'ADD_WEAKNESS', payload: string}
    | {type: 'RESET'}
    | {type: 'PAGINATE', payload: number}
    | {type: 'SUCCESS'}
    | {type: 'ERROR'}

const INITIAL_STATE:State = {
    query: "",
    type: "",
    weakness: "",
    offset: 0,
    loading: true,
}

const PokemonSearchReducer = (state: State, action: Action) => {
    switch(action?.type) {
        case "QUERY":
            return { ...state, query: action.payload};
        case "ADD_TYPE": 
            return { ...state, type: action.payload, offset: 0};
        case "ADD_WEAKNESS":
            return { ...state, weakness: action.payload, offset: 0};
        case "RESET":
            return {...state, query: "", type: "", weakness: ""};
        case "PAGINATE":
            return {...state, offset: Number(action.payload)};


        case "FETCH":
            return { ...state, loading: true};
        case "SUCCESS" || "ERROR":
            return { ...state, loading: false};

        default:
            return state;
    }
}

export const PokemonSearchContext = createContext<{
    state: State,
    dispatch: React.Dispatch<Action>
}>({
    state: INITIAL_STATE, 
    dispatch: () => {}
})

interface ProviderProps {
    children: React.ReactNode
}

export const PokemonSearchContextProvider = ({children}: ProviderProps) => {
    const [state, dispatch] = useReducer(PokemonSearchReducer, INITIAL_STATE);

    return (
        <PokemonSearchContext.Provider value={{state, dispatch}}>
            {children}
        </PokemonSearchContext.Provider>
    )
}