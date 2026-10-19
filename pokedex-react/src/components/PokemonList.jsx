
import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList({
  pokemon,
  onSelectPokemon,
  favoriteIds = [],
  onToggleFavorite,
}) {
  return (
    <ul className="pokemon-list">
      {pokemon.map((item) => (
        <PokemonCard
          key={item.id}
          pokemon={item}
          onSelectPokemon={onSelectPokemon}
          isFavorite={favoriteIds.includes(item.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ul>
  )
}

export default PokemonList
