import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList ({ pokemon, onSelectPokemon }) {
    return(
        <ul className="pokemon-list">
            {pokemon.map((item) => (
                <PokemonCard
                    key={item.id}
                    pokemon={item}
                    onSelectPokemon={onSelectPokemon}
                />
            ))}
        </ul>
    )
}

export default PokemonList