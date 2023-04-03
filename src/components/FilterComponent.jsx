import { PokemonSearchContext } from '../context/PokemonSearchContext';
import { useContext, useState } from "react";

export default function FilterComponent({types}) {
    const [toggleType, setToggleType] = useState(false);
    const [toggleWeakness, setToggleWeakness] = useState(false);
    const { dispatch, state } = useContext(PokemonSearchContext);
    const { type, weakness } = state;

    const typeData = types;


    return (
        <div className="filter">
            <div className='filter-wrapper'>
                <div className={`filter__select-wrapper ${type === '' ? 'active--all' : 'active--' + type}`} onClick={() => setToggleType((prev) => !prev)}>
                    <div className='filter__select-title'>{type === '' ? 'Types: All' : 'Types: ' + type}</div>
                    <div className={`filter__select-expand ${toggleType ? 'active' : ''}`}></div>
                </div>
                <div className={`filter-dropdown ${toggleType ? 'active--types' : ''}`}>
                    <div 
                        className={`filter-dropdown__option ${type === '' ? 'active--all' : ''}`}
                        onClick={(e) => {dispatch({type: "ADD_TYPE", payload: ""})}}
                    >All</div>
                    {typeData.map((currentType) => (
                        <div 
                        className={`filter-dropdown__option ${type == currentType.name ? 'active--' + currentType.name : ''}`}  
                        key={currentType._id}
                        onClick={(e) => {dispatch({type: "ADD_TYPE", payload: currentType.name})}}
                        >{currentType.name}</div>
                    ))}
                </div>
            </div>
            <div className='filter-wrapper'>
                <div className={`filter__select-wrapper ${weakness === '' ? 'active--all' : 'active--' + weakness}`} onClick={() => setToggleWeakness((prev) => !prev)}>
                    <div className='filter__select-title'>{ weakness === '' ? 'Weakness: None' : 'Weakness: ' + weakness}</div>
                    <div className={`filter__select-expand ${toggleWeakness ? 'active' : ''}`}></div>
                </div>
                <div className={`filter-dropdown ${toggleWeakness ? 'active--types' : ''}`}>
                    <div 
                        className={`filter-dropdown__option ${weakness === '' ? 'active--all' : ''}`}
                        onClick={(e) => {dispatch({type: "ADD_WEAKNESS", payload: ""})}}
                    >None</div>
                    {typeData.map((type) => (
                        <div 
                        className={`filter-dropdown__option ${weakness == type.name ? 'active--' + weakness : ''}`}  
                        key={type._id}
                        onClick={(e) => {dispatch({type: "ADD_WEAKNESS", payload: type.name})}}
                        >{type.name}</div>
                    ))}
                </div>
            </div>

            <div className="filter__select-reset" onClick={(e) => {dispatch({type: "RESET"})}}> 
                Reset
            </div>
        </div>
    )
}