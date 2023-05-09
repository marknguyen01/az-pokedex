import {useContext, useState, useEffect} from 'react';
import { PokemonSearchContext } from "../context/PokemonSearchContext";
import PokemonCardComponent from '../components/PokemonCardComponent';
import LoadingComponent from './LoadingComponent';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function PokemonCardsComponent(props) {
    const POKEMONS_PER_PAGE = 100;
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
            `/api/pokemon?search=${query}&type=${type}&weakness=${weakness}&limit=${(query || type || weakness) ? 0 : POKEMONS_PER_PAGE}&offset=${offset}`
        ).then((res) => res.json())
        .then((data) => {
            if((query || type || weakness)) {
                setHasMore(false);
            }
            if(data.results.length < POKEMONS_PER_PAGE) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setPokemons(data.results);
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
            `/api/pokemon?search=${query}&type=${type}&weakness=${weakness}&limit=${POKEMONS_PER_PAGE}&offset=${offset + 1}`
        ).then((res) => res.json())
        .then((data) => {
            if(data.results.length < POKEMONS_PER_PAGE) {
                setHasMore(false);
            }
            setPokemons(pokemons.concat(data.results));
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