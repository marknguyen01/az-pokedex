import { PokemonDataContext } from '../context/PokemonDataContext';
import { useContext, useState } from "react";

export default function FilterComponent() {
    const [openDropdown, setOpenDropdown] = useState('');
    const [toggleType, setToggleType] = useState(false);
    const {typeData, typeFilter, weaknessFilter, searchPokemons, previousSearchFilter} = useContext(PokemonDataContext);

    return (
        <div className="filter">
            <div className={`filter__select-wrapper ${typeFilter === '' ? 'active--all' : 'active--' + typeFilter}`} onClick={() => setToggleType((prev) => !prev)}>
                <div className='filter__select-title'>{ typeFilter === '' ? 'Types: All' : 'Types: ' + typeFilter}</div>
                <div className={`filter__select-expand ${toggleType ? 'active' : ''}`}></div>
                <div className={`filter__select-dropdown ${toggleType ? 'active--types' : ''}`}>
                <div 
                className={`filter__select-dropdown__option ${typeFilter === '' ? 'active--all' : ''}`}
                onClick={(e) => {searchPokemons(previousSearchFilter)}}
                >All</div>
                    {typeData.map((type) => (
                        <div 
                        className={`filter__select-dropdown__option ${typeFilter == type.name ? 'active--' + typeFilter : ''}`}  
                        key={type._id}
                        onClick={(e) => {searchPokemons(previousSearchFilter, type.name)}}
                        >{type.name}</div>
                    ))}
                </div>
            </div>
            {/* <div className="filter__select-wrapper" onClick={(e) => toggleDropDown('weakness')}>
                <div>{ !(typeFilter in typeData) ? 'Weaknesses: All' : 'Weaknesses: ' + weaknessFilter}</div>
                <div className={`filter__select-dropdown ${isDropdownDisplayed('weakness') ? 'active--weakness' : ''}`}>
                    <div className={`filter__select-dropdown__option`}>All</div>
                    {typeData.map((type) => (
                        <div className="filter__select-dropdown__option"  key={type._id}>{type.name}</div>
                    ))}
                </div>
            </div>
            <div className="filter__select-wrapper" onClick={(e) => toggleDropDown('ability')}>
                <div>{ typeFilter == '' ? 'Abilities: All' : 'Abilities: ' + typeFilter}</div>
                <div className={`filter__select-dropdown ${isDropdownDisplayed('types') ? 'active--ability' : ''}`}>
                <div className={`filter__select-dropdown__option`}>All</div>
                    {typeData.map((type) => (
                        <div className="filter__select-dropdown__option"  key={type._id}>{type.name}</div>
                    ))}
                </div>
            </div> */}
            <div className="filter__select-reset" onClick={(e) => {searchPokemons()}}> 
                Reset
            </div>
        </div>
    )
}