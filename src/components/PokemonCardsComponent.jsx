import {useContext, useState, useEffect} from 'react';
import { PokemonSearchContext } from "../context/PokemonSearchContext";
import PokemonCardComponent from '../components/PokemonCardComponent';
import LoadingComponent from './LoadingComponent';

export default function PokemonCardsComponent(props) {
    const [pokemons, setPokemons] = useState("");

    const { dispatch, state } = useContext(PokemonSearchContext);

    const { query, type, weakness, loading } = state;

    useEffect(() => {
        dispatch({type: 'FETCH'});

        fetch(
            `/api/pokemon?search=${query}&type=${type}&weakness=${weakness}`
        ).then((res) => res.json())
        .then((data) => {
            setPokemons(data);
            dispatch({type: 'SUCCESS'});
        })
        .catch((err) => {
            console.log(err);
            dispatch({type: 'ERROR'});
        });

    }, [query, type, weakness]);

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') console.log(pokemons);

    return(
        <div className='pokemon-cards'>
            <div className='pokemon-cards__wrapper'>
                {loading ? <LoadingComponent /> : <PokemonCardComponent pokemons={pokemons} />}
            </div>
        </div>
    )
}