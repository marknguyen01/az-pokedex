import typeData from "../data/typeData"


export default function FilterComponent(props) {
    return (
        <div className="filter">
            <div class="filter__select-wrapper">
                <select className="select">
                    <option disabled selected>Type</option>
                    {props.types.map((type) => (
                        <option value={type.name} key={type._id} name={`type-${type.name}`}>{type.name}</option>
                    ))}
                </select>
            </div>
            <div class="filter__select-wrapper">
                <select className="select">
                    <option disabled selected>Weakness</option>
                    {props.types.map((type) => (
                        <option value={type.name} key={type._id} name={`weakness-${type.name}`}>{type.name}</option>
                    ))}
                </select>
            </div>
            <div class="filter__select-wrapper">
                <select className="select">
                    <option disabled selected>Ability</option>
                </select>
            </div>
        </div>
    )
}