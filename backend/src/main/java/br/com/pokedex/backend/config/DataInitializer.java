package br.com.pokedex.backend.config;

import br.com.pokedex.backend.model.Pokemon;
import br.com.pokedex.backend.repository.PokemonRepository;

import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner carregarPokemons(
            PokemonRepository repository,
            ObjectMapper mapper) {

        return args -> {

            // Verifica se já existem Pokémon no banco
            if (repository.count() > 0) {
                System.out.println("Pokémons já existem. Importação ignorada.");
                return;
            }

            // Localiza o arquivo JSON
            try (InputStream input = new ClassPathResource(
                    "data/pokedex-data.json").getInputStream()) {

                // Lê o conteúdo do JSON
                JsonNode raiz = mapper.readTree(input);

                // Extrai a lista de Pokémon
                List<Pokemon> pokemons = mapper.convertValue(
                        raiz.get("pokemon"),
                        new TypeReference<List<Pokemon>>() {}
                );

                // Salva todos os Pokémon no MongoDB
                repository.saveAll(pokemons);

                System.out.println(pokemons.size() + " Pokémon importados!");

            }
        };
    }
}