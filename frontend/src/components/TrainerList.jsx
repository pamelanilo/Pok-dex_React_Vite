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

const pokemonImagesUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'

function TrainerList({ trainers, pokemon }) {
  return (
    <section className="trainers-section">
      <div className="trainers-heading">
        <div>
          <span className="trainers-eyebrow">UNIVERSO POKÉMON</span>
          <h2>Treinadores</h2>
          <p>Conheça os treinadores e suas equipes.</p>
        </div>

        <span className="trainers-count">
          {trainers.length} treinadores
        </span>
      </div>

      <div className="trainers-list">
        {trainers.map((trainer, index) => {
          const team = trainer.pokemonIds
            .map((pokemonId) =>
              pokemon.find((item) => item.id === pokemonId)
            )
            .filter(Boolean)

          const imageFile = trainerImages[trainer.name]

          return (
            <article
              className={`trainer-card trainer-theme-${index % 4}`}
              key={trainer.id}
            >
              <div className="trainer-card-top">
                <span className="trainer-card-label">
                  POKÉMON TRAINER
                </span>

                <span className="trainer-badges">
                  <span className="badge-icon">★</span>
                  {Number(trainer.badges ?? 0)} insígnias
                </span>
              </div>

              <div className="trainer-portrait">
                <div className="trainer-portrait-circle" />

                {imageFile && (
                  <img
                    className="trainer-image"
                    src={`${trainerImagesUrl}${imageFile}`}
                    alt={`Treinador ${trainer.name}`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none'
                    }}
                  />
                )}
              </div>

              <div className="trainer-information">
                <span className="trainer-subtitle">
                  TREINADOR Nº {String(trainer.id).padStart(2, '0')}
                </span>

                <h3>{trainer.name}</h3>
              </div>

              <div className="trainer-team">
                <div className="trainer-team-heading">
                  <h4>Minha equipe</h4>
                  <span>{team.length} Pokémon</span>
                </div>

                <div className="trainer-team-list">
                  {team.map((item) => (
                    <div
                      className="trainer-team-pokemon"
                      key={`${trainer.id}-${item.id}`}
                      title={`#${item.id} - ${item.name}`}
                    >
                      <img
                        src={`${pokemonImagesUrl}${item.id}.png`}
                        alt={item.name}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = 'none'
                        }}
                      />

                      <span>{item.name}</span>
                    </div>
                  ))}

                  {team.length === 0 && (
                    <span className="trainer-empty-team">
                      Nenhum Pokémon cadastrado.
                    </span>
                  )}
                </div>
              </div>

              <div className="trainer-card-footer">
                <span>POKÉDEX COLLECTION</span>
                <span>#{String(trainer.id).padStart(3, '0')}</span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default TrainerList