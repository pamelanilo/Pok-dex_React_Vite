import '../css/PokemonCard.css'


function PokemonCard({ pokemon }) {
    return ( 
        <li className = "pokemon-card">
            <strong>#{pokemon.id}</strong> - {pokemon.name}
            
            <div className="pokemon-types">
            {pokemon.types.map((type) => (
                <span className="pokemon-type" key={type.id}>
                {type.name}
                </span>
            ))}
            </div>

        </li>
    )
}

export default PokemonCard