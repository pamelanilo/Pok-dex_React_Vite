package br.com.pokedex.backend.service;

import br.com.pokedex.backend.model.Trainer;
import br.com.pokedex.backend.repository.TrainerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerService {

    private final TrainerRepository trainerRepository;

    public TrainerService(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }

    public List<Trainer> listarTodos() {
        return trainerRepository.findAll();
    }

    public Trainer buscarPorId(Integer id) {
        return trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Treinador não encontrado: " + id
                ));
    }
}