import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList ({pokemon}) {
    return(
        <ul className="pokemon-list">
            {pokemon.map((item) => (
                <PokemonCard
                key={item.id}
                pokemon={item}
                />
            ))}
        </ul>
    )
}

export default PokemonList