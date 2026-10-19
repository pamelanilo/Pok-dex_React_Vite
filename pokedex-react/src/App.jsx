import {useState} from 'react'
import pokedexData from './data/pokedex-data.json'
import PokemonList from './components/PokemonList'
import SearchBar from './components/SearchBar'
import TypeFilter from './components/TypeFilter'

function App() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')

  
  const filteredPokemon = pokedexData.pokemon.filter((pokemon) => {
    const searchValue = search.trim().toLowerCase()
  
    const matchesName = pokemon.name
      .toLowerCase()
      .includes(searchValue)

    const matchesId = String(pokemon.id).includes(searchValue)

    const matchesType=
      selectedType === '' ||
      pokemon.types.some((type) => type.name === selectedType)

  return (matchesName || matchesId) && matchesType
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

      {filteredPokemon.length > 0? (
        <PokemonList pokemon = {filteredPokemon} />
      ) : (
        <p>Nenhum Pokémon encontrado. Tente outra pesquisa</p>
      )}
    </main>
  )
}

export default App