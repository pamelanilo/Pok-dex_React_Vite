import { useEffect, useState } from 'react'
import PokemonList from './components/PokemonList'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'
import PokemonForm from './components/PokemonForm'
import './css/App.css'

const API_URL = 'http://localhost:8080/api/pokemons'
const TRAINERS_API_URL = 'http://localhost:8080/api/trainers'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [trainers, setTrainers] = useState([])

  const [loading, setLoading] = useState(true)
  const [trainersLoading, setTrainersLoading] = useState(true)
  const [error, setError] = useState('')
  const [trainersError, setTrainersError] = useState('')

  const [showForm, setShowForm] = useState(false)
  const [editingPokemon, setEditingPokemon] = useState(null)
  const [saving, setSaving] = useState(false)

  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [activeTab, setActiveTab] = useState('pokedex')

  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('pokedex-favorites')
      return savedFavorites ? JSON.parse(savedFavorites) : []
    } catch {
      return []
    }
  })

  // Busca os Pokémon na API
  useEffect(() => {
    async function carregarPokemons() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Não foi possível carregar os Pokémon.')
        }

        const data = await response.json()
        setPokemons(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    carregarPokemons()
  }, [])

  // Busca os treinadores na API
  useEffect(() => {
    async function carregarTreinadores() {
      try {
        const response = await fetch(TRAINERS_API_URL)

        if (!response.ok) {
          throw new Error('Não foi possível carregar os treinadores.')
        }

        const data = await response.json()
        setTrainers(data)
      } catch (error) {
        setTrainersError(error.message)
      } finally {
        setTrainersLoading(false)
      }
    }

    carregarTreinadores()
  }, [])

  // Salva os favoritos no navegador
  useEffect(() => {
    localStorage.setItem(
      'pokedex-favorites',
      JSON.stringify(favoriteIds)
    )
  }, [favoriteIds])

  // Extrai os tipos dos Pokémon carregados pela API
  const types = [
    ...new Map(
      pokemons
        .flatMap(pokemon => pokemon.types || [])
        .map(type => [type.id, type])
    ).values()
  ]

  // Pesquisa e filtro
  const filteredPokemon = pokemons.filter((pokemon) => {
    const searchValue = search.trim().toLowerCase()

    const matchesName = pokemon.name
      .toLowerCase()
      .includes(searchValue)

    const matchesId = String(pokemon.id).includes(searchValue)

    const matchesType =
      selectedType === '' ||
      pokemon.types?.some(type => type.name === selectedType)

    return (matchesName || matchesId) && matchesType
  })

  // Filtra os Pokémon favoritos
  const favoritePokemon = pokemons.filter((pokemon) =>
    favoriteIds.includes(pokemon.id)
  )

  // Adiciona ou remove um favorito
  function toggleFavorite(pokemonId) {
    setFavoriteIds((currentIds) =>
      currentIds.includes(pokemonId)
        ? currentIds.filter((id) => id !== pokemonId)
        : [...currentIds, pokemonId]
    )
  }

  // Troca de aba
  function changeTab(tab) {
    setActiveTab(tab)
    setSelectedPokemon(null)
  }

  // Abre o formulário para cadastrar
  function handleAddPokemon() {
    setEditingPokemon(null)
    setShowForm(true)
    setSelectedPokemon(null)
  }

  // Abre o formulário para editar
  function handleEditPokemon(pokemon) {
    setEditingPokemon(pokemon)
    setSelectedPokemon(null)
    setActiveTab('pokedex')
    setShowForm(true)
  }

  // Fecha o formulário
  function handleCancelForm() {
    setShowForm(false)
    setEditingPokemon(null)
  }

  // Cadastra ou atualiza um Pokémon
  async function handleSavePokemon(pokemonData) {
    try {
      setSaving(true)

      const isEditing = editingPokemon !== null

      if (
        !isEditing &&
        pokemons.some(pokemon => pokemon.id === pokemonData.id)
      ) {
        alert('Já existe um Pokémon com esse ID.')
        return
      }

      const url = isEditing
        ? `${API_URL}/${editingPokemon.id}`
        : API_URL

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pokemonData),
      })

      if (!response.ok) {
        throw new Error('Não foi possível salvar o Pokémon.')
      }

      const savedPokemon = await response.json()

      if (isEditing) {
        setPokemons(current =>
          current.map(pokemon =>
            pokemon.id === savedPokemon.id ? savedPokemon : pokemon
          )
        )

        setSelectedPokemon(savedPokemon)
      } else {
        setPokemons(current => [...current, savedPokemon])
      }

      setShowForm(false)
      setEditingPokemon(null)

      alert(
        isEditing
          ? 'Pokémon atualizado com sucesso!'
          : 'Pokémon cadastrado com sucesso!'
      )

    } catch (error) {
      alert(error.message)
    } finally {
      setSaving(false)
    }
  }

  // Exclui um Pokémon
  async function handleDeletePokemon(pokemon) {
    const confirmed = window.confirm(
      `Deseja realmente excluir ${pokemon.name} da Pokédex?`
    )

    if (!confirmed) return

    try {
      const response = await fetch(`${API_URL}/${pokemon.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Não foi possível excluir o Pokémon.')
      }

      setPokemons(current =>
        current.filter(item => item.id !== pokemon.id)
      )

      setFavoriteIds(current =>
        current.filter(id => id !== pokemon.id)
      )

      setSelectedPokemon(null)

      alert('Pokémon excluído com sucesso!')

    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <main className="app-container">

      <header className="app-header">
        <p className="app-eyebrow">SEU GUIA POKÉMON</p>

        <h1>Minha Pokédex</h1>

        <p className="app-subtitle">
          Explore Pokémon, conheça treinadores e monte sua coleção.
        </p>
      </header>

      <nav className="app-tabs" aria-label="Navegação principal">

        <button
          className={activeTab === 'pokedex' ? 'active' : ''}
          onClick={() => changeTab('pokedex')}
        >
          Pokédex
        </button>

        <button
          className={activeTab === 'trainers' ? 'active' : ''}
          onClick={() => changeTab('trainers')}
        >
          Treinadores
        </button>

        <button
          className={activeTab === 'favorites' ? 'active' : ''}
          onClick={() => changeTab('favorites')}
        >
          Favoritos ({favoriteIds.length})
        </button>

      </nav>

      {/* ABA POKÉDEX */}
      {activeTab === 'pokedex' && (
        <section className="tab-content">

          <div className="section-heading">
            <div>
              <h2>Explore os Pokémon</h2>
              <p>Encontre seu próximo favorito.</p>
            </div>

            <span className="result-count">
              {filteredPokemon.length} encontrados
            </span>
          </div>

          <button
            type="button"
            className="add-pokemon-button"
            onClick={handleAddPokemon}
          >
            + Adicionar Pokémon
          </button>

          {showForm && (
            <PokemonForm
              pokemon={editingPokemon}
              types={types}
              onSave={handleSavePokemon}
              onCancel={handleCancelForm}
              saving={saving}
            />
          )}

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <TypeFilter
            types={types}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />

          <PokemonDetails
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
            onEdit={handleEditPokemon}
            onDelete={handleDeletePokemon}
          />

          {loading ? (
            <p className="empty-message">
              Carregando Pokémon...
            </p>
          ) : error ? (
            <p className="empty-message">
              {error}
            </p>
          ) : filteredPokemon.length > 0 ? (
            <PokemonList
              pokemon={filteredPokemon}
              onSelectPokemon={setSelectedPokemon}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          ) : (
            <p className="empty-message">
              Nenhum Pokémon encontrado. Tente outra pesquisa.
            </p>
          )}

        </section>
      )}

      {/* ABA TREINADORES */}
      {activeTab === 'trainers' && (
        <section className="tab-content">

          <div className="section-heading">
            <div>
              <h2>Treinadores</h2>
              <p>Conheça os treinadores e suas equipes.</p>
            </div>
          </div>

          {trainersLoading ? (
            <p className="empty-message">
              Carregando treinadores...
            </p>
          ) : trainersError ? (
            <p className="empty-message">
              {trainersError}
            </p>
          ) : (
            <TrainerList
              trainers={trainers}
              pokemon={pokemons}
            />
          )}

        </section>
      )}

      {/* ABA FAVORITOS */}
      {activeTab === 'favorites' && (
        <section className="tab-content">

          <div className="section-heading">
            <div>
              <h2>Meus favoritos</h2>
              <p>Uma coleção dos Pokémon que você escolheu.</p>
            </div>
          </div>

          {loading ? (
            <p className="empty-message">
              Carregando favoritos...
            </p>
          ) : favoritePokemon.length > 0 ? (
            <PokemonList
              pokemon={favoritePokemon}
              onSelectPokemon={setSelectedPokemon}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          ) : (
            <p className="empty-message">
              Você ainda não tem favoritos.
              Vá à Pokédex e toque no coração de um Pokémon!
            </p>
          )}

          <PokemonDetails
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />

        </section>
      )}

    </main>
  )
}

export default App