import '../css/PokemonCard.css'


function PokemonCard({ pokemon }) {
    return ( 
        <li className = "pokemon-card">
            <strong>#{pokemon.id}</strong> - {pokemon.name}
        </li>
    )
}

export default PokemonCard