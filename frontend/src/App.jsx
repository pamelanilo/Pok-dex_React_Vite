import { useEffect, useState } from 'react'
import pokedexData from './data/pokedex-data.json'
import PokemonList from './components/PokemonList'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'
import './css/App.css'

const API_URL = 'http://localhost:8080/api/pokemons'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  // Salva os favoritos no navegador
  useEffect(() => {
    localStorage.setItem(
      'pokedex-favorites',
      JSON.stringify(favoriteIds)
    )
  }, [favoriteIds])

  // Pesquisa e filtro
  const filteredPokemon = pokemons.filter((pokemon) => {
    const searchValue = search.trim().toLowerCase()

    const matchesName = pokemon.name
      .toLowerCase()
      .includes(searchValue)

    const matchesId = String(pokemon.id).includes(searchValue)

    const matchesType =
      selectedType === '' ||
      pokemon.types.some((type) => type.name === selectedType)

    return (matchesName || matchesId) && matchesType
  })

  const favoritePokemon = pokemons.filter((pokemon) =>
    favoriteIds.includes(pokemon.id)
  )

  function toggleFavorite(pokemonId) {
    setFavoriteIds((currentIds) =>
      currentIds.includes(pokemonId)
        ? currentIds.filter((id) => id !== pokemonId)
        : [...currentIds, pokemonId]
    )
  }

  function changeTab(tab) {
    setActiveTab(tab)
    setSelectedPokemon(null)
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

          <SearchBar search={search} setSearch={setSearch} />

          <TypeFilter
            types={pokedexData.types}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />

          <PokemonDetails
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />

          {loading ? (
            <p className="empty-message">Carregando Pokémon...</p>
          ) : error ? (
            <p className="empty-message">{error}</p>
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

      {activeTab === 'trainers' && (
        <section className="tab-content">
          <div className="section-heading">
            <div>
              <h2>Treinadores</h2>
              <p>Conheça os treinadores e suas equipes.</p>
            </div>
          </div>

          <TrainerList
            trainers={pokedexData.trainers}
            pokemon={pokemons}
          />
        </section>
      )}

      {activeTab === 'favorites' && (
        <section className="tab-content">
          <div className="section-heading">
            <div>
              <h2>Meus favoritos</h2>
              <p>Uma coleção dos Pokémon que você escolheu.</p>
            </div>
          </div>

          {loading ? (
            <p className="empty-message">Carregando favoritos...</p>
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