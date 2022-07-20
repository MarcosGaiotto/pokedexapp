import "./styles.css"

export function SearchBar(props) {
    return(
        <div className="search-bar">
            <input type="text" name="search" id="search" placeholder="Search pokemon..." onChange = {e => props.searchPokemon(e.target.value)} />
        </div>
    )
}