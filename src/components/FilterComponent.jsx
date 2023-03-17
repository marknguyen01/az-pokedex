import { PokemonDataContext } from '../context/PokemonDataContext';
import { useContext, useState } from "react";

export default function FilterComponent() {
    const [openDropdown, setOpenDropdown] = useState('');
    const [toggleType, setToggleType] = useState(false);
    const [toggleWeakness, setToggleWeakness] = useState(false);
    const {typeData, typeFilter, weaknessFilter, searchPokemons, previousSearchFilter} = useContext(PokemonDataContext);

    return (
        <div className="filter">
            <div className={`filter__select-wrapper ${typeFilter === '' ? 'active--all' : 'active--' + typeFilter}`} onClick={() => setToggleType((prev) => !prev)}>
                <div className='filter__select-title'>{ typeFilter === '' ? 'Types: All' : 'Types: ' + typeFilter}</div>
                <div className={`filter__select-expand ${toggleType ? 'active' : ''}`}></div>
                <div className={`filter__select-dropdown ${toggleType ? 'active--types' : ''}`}>
                <div 
                className={`filter__select-dropdown__option ${typeFilter === '' ? 'active--all' : ''}`}
                onClick={(e) => {searchPokemons(previousSearchFilter, '', weaknessFilter)}}
                >All</div>
                    {typeData.map((type) => (
                        <div 
                        className={`filter__select-dropdown__option ${typeFilter == type.name ? 'active--' + typeFilter : ''}`}  
                        key={type._id}
                        onClick={(e) => {searchPokemons(previousSearchFilter, type.name, weaknessFilter)}}
                        >{type.name}</div>
                    ))}
                </div>
            </div>
            <div className={`filter__select-wrapper ${weaknessFilter === '' ? 'active--all' : 'active--' + weaknessFilter}`} onClick={() => setToggleWeakness((prev) => !prev)}>
                <div className='filter__select-title'>{ weaknessFilter === '' ? 'Weakness: None' : 'Weakness: ' + weaknessFilter}</div>
                <div className={`filter__select-expand ${toggleWeakness ? 'active' : ''}`}></div>
                <div className={`filter__select-dropdown ${toggleWeakness ? 'active--types' : ''}`}>
                <div 
                className={`filter__select-dropdown__option ${weaknessFilter === '' ? 'active--all' : ''}`}
                onClick={(e) => {searchPokemons(previousSearchFilter, typeFilter, '')}}
                >None</div>
                    {typeData.map((type) => (
                        <div 
                        className={`filter__select-dropdown__option ${weaknessFilter == type.name ? 'active--' + weaknessFilter : ''}`}  
                        key={type._id}
                        onClick={(e) => {searchPokemons(previousSearchFilter, typeFilter, type.name)}}
                        >{type.name}</div>
                    ))}
                </div>
            </div>
            <div className="filter__select-reset" onClick={(e) => {searchPokemons()}}> 
                Reset
            </div>
        </div>
    )
}