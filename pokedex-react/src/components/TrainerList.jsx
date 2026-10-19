
import '../css/TrainerList.css'

function TrainerList({ trainers, pokemon }) {
  return (
    <section className="trainers-section">
      <h2>Treinadores Pokémon</h2>

      <div className="trainers-list">
        {trainers.map((trainer) => {
          const team = trainer.pokemonIds
            .map((pokemonId) =>
              pokemon.find((item) => item.id === pokemonId)
            )
            .filter(Boolean)

          return (
            <article className="trainer-card" key={trainer.id}>
              <h3>{trainer.name}</h3>

              <p>
                Insígnias: <strong>{trainer.badges}</strong>
              </p>

              <h4>Equipe Pokémon</h4>

              <ul className="trainer-pokemon-list">
                {team.map((item, index) => (
                  <li key={`${trainer.id}-${index}`}>
                    #{item.id} - {item.name}
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default TrainerList
