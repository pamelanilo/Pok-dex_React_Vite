import '../css/TypeFilter.css'

function TypeFilter({ types, selectedType, setSelectedType}) {
    return(
        <select
            className="type-filter"
            value={selectedType}
            onChange={(event) => setSelectedType(event.target.value)}
        >
            <option value="">Todos os tipos</option>

            {types.map((type) => (
                <option key={type.id} value={type.name}>
                    {type.name}
                </option>
            ))}
        </select>
    )
}

export default TypeFilter