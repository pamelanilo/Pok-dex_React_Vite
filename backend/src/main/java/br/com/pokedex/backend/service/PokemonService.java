package br.com.pokedex.backend.service;

import br.com.pokedex.backend.model.Pokemon;
import br.com.pokedex.backend.repository.PokemonRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PokemonService {

    private final PokemonRepository pokemonRepository;

    public PokemonService(PokemonRepository pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
    }

    // Buscar todos os Pokémon
    public List<Pokemon> listarTodos() {
        return pokemonRepository.findAll();
    }

    // Buscar Pokémon pelo ID
    public Pokemon buscarPorId(Integer id) {
        return pokemonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pokémon não encontrado."));
    }

    // Cadastrar Pokémon
    public Pokemon cadastrar(Pokemon pokemon) {
        return pokemonRepository.save(pokemon);
    }

    // Atualizar Pokémon
    public Pokemon atualizar(Integer id, Pokemon pokemonAtualizado) {

        Pokemon pokemonExistente = buscarPorId(id);

        pokemonExistente.setName(pokemonAtualizado.getName());
        pokemonExistente.setStats(pokemonAtualizado.getStats());
        pokemonExistente.setTypes(pokemonAtualizado.getTypes());

        return pokemonRepository.save(pokemonExistente);
    }

    // Excluir Pokémon
    public void excluir(Integer id) {

        Pokemon pokemon = buscarPorId(id);

        pokemonRepository.delete(pokemon);
    }
}