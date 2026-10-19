import '../css/SearchBar.css'

function SearchBar({ search, setSearch }) {
    return (
        <input 
            className="search-bar"
            type="text"
            placeholder="Buscar Pokémon pelo nome..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
        />
    )
}

export default SearchBar