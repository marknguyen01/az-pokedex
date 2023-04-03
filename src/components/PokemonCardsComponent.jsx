import {useContext, useState, useEffect} from 'react';
import { PokemonSearchContext } from "../context/PokemonSearchContext";
import PokemonCardComponent from '../components/PokemonCardComponent';
import LoadingComponent from './LoadingComponent';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function PokemonCardsComponent(props) {
    const POKEMONS_PER_PAGE = 151;
    const [pokemons, setPokemons] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const { dispatch, state } = useContext(PokemonSearchContext);

    const { query, type, weakness, offset, loading } = state;

    useEffect(() => {
        fetchData();
    }, [query, type, weakness]);

    const fetchData = () => {
        dispatch({type: 'FETCH'});
        fetch(
            `/api/pokemon?search=${query}&type=${type}&weakness=${weakness}&limit=${POKEMONS_PER_PAGE}`
        ).then((res) => res.json())
        .then((data) => {
            setPokemons(data);
            dispatch({type: 'SUCCESS'});
        })
        .catch((err) => {
            console.log(err);
            dispatch({type: 'ERROR'});
        });
    }

    const fetchMoreData = () => {
        dispatch({type: "PAGINATE", payload: offset + 1});
        fetch(
            `/api/pokemon?search=${query}&type=${type}&weakness=${weakness}&offset=${offset}&limit=${POKEMONS_PER_PAGE}`
        ).then((res) => res.json())
        .then((data) => {
            if(data.length < 151) {
                setHasMore(false);
            }
            setPokemons(pokemons.concat(data));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') console.log(pokemons);

    return(
        <div className='pokemon-cards'>
            <InfiniteScroll
                dataLength={pokemons.length} //This is important field to render the next data
                next={fetchMoreData}
                hasMore={hasMore}

                >
                <div className='pokemon-cards__wrapper'>
                    {loading ? <LoadingComponent /> : <PokemonCardComponent pokemons={pokemons} />}
                </div>
            </InfiniteScroll>

        </div>
    )
}