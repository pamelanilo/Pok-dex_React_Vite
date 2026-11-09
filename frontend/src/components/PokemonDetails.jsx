import '../css/PokemonDetails.css'
import { useEffect, useRef } from 'react'
import '../css/PokemonDetails.css'

function PokemonDetails({ pokemon, onClose }) {
  if (!pokemon) return null

  const detailsRef = useRef(null)

useEffect(() => {
  if (pokemon) {
    detailsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}, [pokemon])

  const stats = [
    { label: 'HP', value: pokemon.stats.hp },
    { label: 'Ataque', value: pokemon.stats.attack },
    { label: 'Defesa', value: pokemon.stats.defense },
    { label: 'Ataque especial', value: pokemon.stats.specialAttack },
    { label: 'Defesa especial', value: pokemon.stats.specialDefense },
    { label: 'Velocidade', value: pokemon.stats.speed },
  ]

  const totalStats = stats.reduce((total, stat) => total + stat.value, 0)

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

  return (
    <section className="pokemon-details" ref={detailsRef}>
      <button
        className="details-close"
        onClick={onClose}
        type="button"
      >
        ×
      </button>

      <div className="details-header">
        <div className="details-image-container">
          <img
            src={imageUrl}
            alt={pokemon.name}
            className="details-image"
          />
        </div>

        <div className="details-identity">
          <span className="details-number">
            POKÉMON Nº {String(pokemon.id).padStart(3, '0')}
          </span>

          <h2>{pokemon.name}</h2>

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
        </div>
      </div>

      <div className="details-stats">
        <div className="details-stats-heading">
          <h3>Atributos básicos</h3>
          <span>Total: {totalStats}</span>
        </div>

        {stats.map((stat) => (
          <div className="details-stat" key={stat.label}>
            <div className="details-stat-info">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>

            <div className="details-stat-bar">
              <div
                className="details-stat-fill"
                style={{
                  width: `${Math.min(stat.value / 255 * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PokemonDetails