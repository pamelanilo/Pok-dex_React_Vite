import {useState} from 'react'
import pokedexData from './data/pokedex-data.json'
import PokemonList from './components/PokemonList'
import SearchBar from './components/SearchBar'

function App() {
  const [search, setSearch] = useState('')

  const filteredPokemon = pokedexData.pokemon.filter((pokemon) =>
  pokemon.name.toLowerCase().includes(search.toLowerCase())
)
 
  return ( 
    <main>
      <h1>Minha Pokédex</h1>

      <p>Total de Pokémon: {pokedexData.pokemon.length}</p>
      
      <SearchBar search={search} setSearch={setSearch} />

      <p>Pokémons encontrados: {filteredPokemon.length}</p>

      <PokemonList pokemon={pokedexData.pokemon} />
    </main>
  )
}

export default App