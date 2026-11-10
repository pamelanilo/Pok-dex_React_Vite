package br.com.pokedex.backend.config;

import br.com.pokedex.backend.model.Trainer;
import br.com.pokedex.backend.repository.TrainerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TrainerDataInitializer implements CommandLineRunner {

    private final TrainerRepository trainerRepository;

    public TrainerDataInitializer(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }

    @Override
    public void run(String... args) {

        if (trainerRepository.count() > 0) {
            System.out.println("Treinadores já existem no MongoDB. Importação inicial ignorada.");
            return;
        }

        List<Trainer> trainers = List.of(
            new Trainer(1, "Ash", 9, List.of(25, 3, 6, 9, 131, 143)),
            new Trainer(2, "Brock", 1, List.of(74, 95)),
            new Trainer(3, "Misty", 2, List.of(120, 121)),
            new Trainer(4, "Lt. Surge", 3, List.of(26)),
            new Trainer(5, "Erika", 4, List.of(114, 70, 44)),
            new Trainer(6, "Koga", 5, List.of(48, 48, 48, 49)),
            new Trainer(7, "Sabrina", 6, List.of(63, 64, 65)),
            new Trainer(8, "Blaine", 7, List.of(38, 78, 59)),
            new Trainer(9, "Giovanni", 8, List.of(51, 53, 31, 34, 112)),
            new Trainer(10, "Gary", 9, List.of(28, 65, 103, 82, 38, 134)),
            new Trainer(11, "Team Rocket", 0, List.of(23, 52, 109)),
            new Trainer(12, "Lance", 9, List.of(130, 148, 149, 142, 149))
        );

        trainerRepository.saveAll(trainers);

        System.out.println("Treinadores cadastrados no MongoDB: " + trainers.size());
    }
}