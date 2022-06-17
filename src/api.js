import axios from "axios";

export async function getPokemon(url,offset,limit) {
    const response = await axios.get(`${url}?offset=${offset}&limit=${limit}`)
    return response.data.results
}

export async function getPokemonInfo(url) {
    const response = await axios.get(url)
    return response.data
}

export async function searchPokemon(url, search) {
    const response = await axios.get(`${url}?offset=0&limit=900`)
    return response.data.results.filter((pokemon) => {
        return pokemon.name.includes(search)
    })
}
