package br.com.pokedex.backend.repository;

import br.com.pokedex.backend.model.Pokemon;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PokemonRepository extends MongoRepository<Pokemon, Integer> {

}