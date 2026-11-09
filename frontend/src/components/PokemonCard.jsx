
import '../css/PokemonCard.css'
import { useEffect ,useState } from 'react'

function PokemonCard({ pokemon , onSelectPokemon, isFavorite,onToggleFavorite, }) {
    const [image, setImage] = useState('')

    useEffect(() => {
        async function loadPokemon(){
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`
            )

            const data = await response.json()
            setImage(data.sprites.other['official-artwork'].front_default)
        }

        loadPokemon()
        },[pokemon.id])

  return (
    <li className="pokemon-card"
        onClick={() => onSelectPokemon(pokemon)}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key ===''){
                event.preventDefault()
                onSelectPokemon(pokemon)
        }
    }}>
        <button
            type="button"
            className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
            aria-label={
                isFavorite
                ? `Remover ${pokemon.name} dos favoritos`
                : `Adicionar ${pokemon.name} aos favoritos`
            }
            aria-pressed={isFavorite}
            onClick={(event) => {
                event.stopPropagation()
                onToggleFavorite(pokemon.id)
            }}
            >
            {isFavorite ? '♥' : '♡'}
        </button>

        {image && (
        <img 
            className="pokemon-image"
            src={image}
            alt={pokemon.name}
            loading="eager"/>)}

        <strong>#{String(pokemon.id).padStart(3, '0')}</strong>

            <h3 className="pokemon-name">
            {pokemon.name}
            </h3>

        <div className="pokemon-types">
            {pokemon.types.map((type) => (
            <span
                className={`pokemon-type ${type.name.toLowerCase()}`}
                key={type.id}
            >
                {type.name}
            </span>
            ))}
        </div>
    
        
        <div className="pokemon-stats">
        {[
            { label: 'HP', value: pokemon.stats.hp },
            { label: 'Ataque', value: pokemon.stats.attack },
            { label: 'Defesa', value: pokemon.stats.defense },
            { label: 'Atq. especial', value: pokemon.stats.specialAttack },
            { label: 'Def. especial', value: pokemon.stats.specialDefense },
            { label: 'Velocidade', value: pokemon.stats.speed },
        ].map((stat) => (
            <div className="stat" key={stat.label}>
            <div className="stat-info">
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
            </div>

            <div className="stat-bar">
                <div
                className="stat-bar-fill"
                style={{ width: `${Math.min(stat.value, 255) / 255 * 100}%` }}
                />
            </div>
            </div>
        ))}
        </div>


    </li>
  )
}

export default PokemonCard
