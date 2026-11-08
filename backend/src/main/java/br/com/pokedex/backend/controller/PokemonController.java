package br.com.pokedex.backend.controller;

import br.com.pokedex.backend.model.Pokemon;
import br.com.pokedex.backend.service.PokemonService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pokemons")
@CrossOrigin(origins = "http://localhost:5173")
public class PokemonController {

    private final PokemonService pokemonService;

    public PokemonController(PokemonService pokemonService) {
        this.pokemonService = pokemonService;
    }

    // Listar todos os Pokémon
    @GetMapping
    public ResponseEntity<List<Pokemon>> listarTodos() {
        return ResponseEntity.ok(pokemonService.listarTodos());
    }

    // Buscar Pokémon pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Pokemon> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(pokemonService.buscarPorId(id));
    }

    // Cadastrar Pokémon
    @PostMapping
    public ResponseEntity<Pokemon> cadastrar(@RequestBody Pokemon pokemon) {
        Pokemon novoPokemon = pokemonService.cadastrar(pokemon);

        return ResponseEntity.status(HttpStatus.CREATED).body(novoPokemon);
    }

    // Atualizar Pokémon
    @PutMapping("/{id}")
    public ResponseEntity<Pokemon> atualizar(
            @PathVariable Integer id,
            @RequestBody Pokemon pokemon) {

        return ResponseEntity.ok(pokemonService.atualizar(id, pokemon));
    }

    // Excluir Pokémon
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        pokemonService.excluir(id);

        return ResponseEntity.noContent().build();
    }
}