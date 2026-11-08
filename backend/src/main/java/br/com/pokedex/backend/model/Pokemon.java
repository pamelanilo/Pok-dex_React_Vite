package br.com.pokedex.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "pokemons")
public class Pokemon {

    @Id
    private Integer id;

    private String name;
    private Stats stats;
    private List<PokemonType> types;

    public Pokemon() {
    }

    public Pokemon(Integer id, String name, Stats stats, List<PokemonType> types) {
        this.id = id;
        this.name = name;
        this.stats = stats;
        this.types = types;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Stats getStats() {
        return stats;
    }

    public void setStats(Stats stats) {
        this.stats = stats;
    }

    public List<PokemonType> getTypes() {
        return types;
    }

    public void setTypes(List<PokemonType> types) {
        this.types = types;
    }
}