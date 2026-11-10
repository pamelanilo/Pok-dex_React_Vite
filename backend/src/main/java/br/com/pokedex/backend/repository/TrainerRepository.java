package br.com.pokedex.backend.repository;

import br.com.pokedex.backend.model.Trainer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TrainerRepository extends MongoRepository<Trainer, Integer> {
}