import { useEffect, useState } from 'react'
import '../css/PokemonForm.css'

const initialStats = {
  hp: 45,
  attack: 49,
  defense: 49,
  specialAttack: 65,
  specialDefense: 65,
  speed: 45,
}

function PokemonForm({ pokemon, types, onSave, onCancel, saving }) {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [stats, setStats] = useState(initialStats)
  const [selectedTypes, setSelectedTypes] = useState([])

  useEffect(() => {
    if (pokemon) {
      setId(pokemon.id)
      setName(pokemon.name)
      setStats(pokemon.stats)
      setSelectedTypes(pokemon.types.map(type => type.id))
    } else {
      setId('')
      setName('')
      setStats(initialStats)
      setSelectedTypes([])
    }
  }, [pokemon])

  function handleStatChange(event) {
    const { name, value } = event.target

    setStats(currentStats => ({
      ...currentStats,
      [name]: Number(value),
    }))
  }

  function handleTypeChange(typeId) {
    setSelectedTypes(currentTypes => {
      if (currentTypes.includes(typeId)) {
        return currentTypes.filter(id => id !== typeId)
      }

      if (currentTypes.length >= 2) {
        return currentTypes
      }

      return [...currentTypes, typeId]
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!pokemon && (!Number.isInteger(Number(id)) || Number(id) <= 0)) {
      alert('Informe um ID inteiro maior que zero.')
      return
    }

    if (!name.trim()) {
      alert('Informe o nome do Pokémon.')
      return
    }

    if (selectedTypes.length === 0) {
      alert('Selecione pelo menos um tipo.')
      return
    }

    const pokemonData = {
      id: Number(id),
      name: name.trim(),
      stats,
      types: types
        .filter(type => selectedTypes.includes(type.id))
        .map(type => ({
          id: type.id,
          name: type.name,
        })),
    }

    onSave(pokemonData)
  }

  const statFields = [
    { name: 'hp', label: 'HP' },
    { name: 'attack', label: 'Ataque' },
    { name: 'defense', label: 'Defesa' },
    { name: 'specialAttack', label: 'Ataque especial' },
    { name: 'specialDefense', label: 'Defesa especial' },
    { name: 'speed', label: 'Velocidade' },
  ]

  return (
    <section className="pokemon-form-container">
      <div className="pokemon-form-heading">
        <div>
          <span>GERENCIAMENTO DA POKÉDEX</span>
          <h2>{pokemon ? 'Editar Pokémon' : 'Adicionar Pokémon'}</h2>
        </div>

        <button
          type="button"
          className="form-close"
          onClick={onCancel}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-fields">
          <label>
            ID
            <input
              type="number"
              value={id}
              onChange={event => setId(event.target.value)}
              disabled={!!pokemon}
              required
            />
          </label>

          <label>
            Nome
            <input
              type="text"
              value={name}
              onChange={event => setName(event.target.value)}
              placeholder="Ex: Chikorita"
              required
            />
          </label>
        </div>

        <h3>Tipos</h3>

        <div className="form-types">
          {types.filter(type => type.id !== 0).map(type => (
            <label
              key={type.id}
              className={`form-type ${type.name.toLowerCase()}`}
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type.id)}
                onChange={() => handleTypeChange(type.id)}
              />

              {type.name}
            </label>
          ))}
        </div>

        <h3>Atributos básicos</h3>

        <div className="form-stats">
          {statFields.map(stat => (
            <label key={stat.name}>
              {stat.label}

              <input
                type="number"
                name={stat.name}
                min="0"
                max="255"
                value={stats[stat.name]}
                onChange={handleStatChange}
                required
              />
            </label>
          ))}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>

          <button type="submit" disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar Pokémon'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default PokemonForm