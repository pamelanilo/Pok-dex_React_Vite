
import '../css/TrainerList.css'

const trainerImages = {
  Ash: 'ash.png',
  Brock: 'brock.png',
  Misty: 'misty.png',
  'Lt. Surge': 'ltsurge.png',
  Erika: 'erika.png',
  Koga: 'koga.png',
  Sabrina: 'sabrina.png',
  Blaine: 'blaine.png',
  Giovanni: 'giovanni.png',
  Gary: 'blue.png',
  'Team Rocket': 'teamrocket.png',
  Lance: 'lance.png',
}

const trainerImagesUrl = 'https://play.pokemonshowdown.com/sprites/trainers/'

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

          const imageFile = trainerImages[trainer.name]

          return (
            <article className="trainer-card" key={trainer.id}>
              <div className="trainer-image-container">
                {imageFile ? (
                  <img
                    className="trainer-image"
                    src={`${trainerImagesUrl}${imageFile}`}
                    alt={`Treinador ${trainer.name}`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none'
                    }}
                  />
                ) : null}
              </div>

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
