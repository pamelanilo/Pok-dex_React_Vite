package br.com.pokedex.backend.controller;

import br.com.pokedex.backend.model.Trainer;
import br.com.pokedex.backend.service.TrainerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainers")
@CrossOrigin(origins = "http://localhost:5173")
public class TrainerController {

    private final TrainerService trainerService;

    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    @GetMapping
    public List<Trainer> listarTodos() {
        return trainerService.listarTodos();
    }

    @GetMapping("/{id}")
    public Trainer buscarPorId(@PathVariable Integer id) {
        return trainerService.buscarPorId(id);
    }
}