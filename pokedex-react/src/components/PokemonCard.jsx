
import '../css/PokemonCard.css'
import { useEffect ,useState } from 'react'

function PokemonCard({ pokemon , onSelectPokemon }) {
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
        {image && (
        <img 
            className="pokemon-image"
            src={image}
            alt={pokemon.name}
            loading="eager"/>)}

        <strong>#{pokemon.id}</strong> - {pokemon.name}

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
