import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import pokedexData from './data/pokedex-data.json'

function App() {
 
  return (

      <main>
        <h1>Minha Pokédex</h1>

        <p>Total de Pokémom: {pokedexData.pokemon.length}</p>

        <ul>
          {pokedexData.pokemon.slice(0, 10).map((pokemon) => (
            <li key={pokemon.id}>
              #{pokemon.id} - {pokemon.name}
            </li>
          ))}
        </ul>
      </main>
  
  )
}

export default App