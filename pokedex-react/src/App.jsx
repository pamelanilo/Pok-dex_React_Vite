import {useState} from 'react'
import pokedexData from './data/pokedex-data.json'
import PokemonList from './components/PokemonList'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'

function App() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')

  
  const filteredPokemon = pokedexData.pokemon.filter((pokemon) => {
  const matchesName = pokemon.name
    .toLowerCase()
    .includes(search.toLowerCase())

  const matchesType =
    selectedType === '' ||
    pokemon.types.some((type) => type.name === selectedType)

  return matchesName && matchesType
})
 
  return ( 
    <main>
      <h1>Minha Pokédex</h1>

      <p>Total de Pokémon: {pokedexData.pokemon.length}</p>

      <SearchBar search={search} setSearch={setSearch} />

      <TypeFilter
        types={pokedexData.types}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      <p>Pokémon encontrados: {filteredPokemon.length}</p>

      <PokemonList pokemon={filteredPokemon} />

      <PokemonList pokemon={pokedexData.pokemon} />
    </main>
  )
}

export default App