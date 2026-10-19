import '../css/PokemonDetails.css'

function PokemonDetails({ pokemon, onClose }) {
    if(!pokemon) return null

    return (
        <section className="pokemon-details">
            <button onClick={onClose}>Fechar detalhes</button>

            <h2>#{pokemon.id}-{pokemon.name}</h2>

            <p>Tipos:{pokemon.types.map((type) => type.name).join(',')}</p>

            <h3>Atributos</h3>

            <ul>
                <li>HP: {pokemon.stats.hp}</li>
                <li>Ataque: {pokemon.stats.attack}</li>
                <li>Defesa: {pokemon.stats.defense}</li>
                <li>Ataque especial: {pokemon.stats.specialAttack}</li>
                <li>Defesa especial: {pokemon.stats.specialDefense}</li>
                <li>Velocidade: {pokemon.stats.speed}</li>
            </ul>
        
        </section>
    )
}

export default PokemonDetails