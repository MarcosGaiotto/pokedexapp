import { useState, useEffect } from 'react'
import { getPokemon, getPokemonInfo, searchPokemon } from '../../api'
import { Card } from '../../components/Card'
import { SearchBar } from '../../components/SearchBar'

import './styles.css'


export function Home() {

  const [pokemon, setPokemon] = useState([])
  const [page, setPage] = useState(0)

  function getPokemonImages(pokemonList) {
    return pokemonList.map((pokemon) => {
      const image = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default
      image != null ? pokemon.image = image : pokemon.image = pokemon.sprites.front_default
      return pokemon
    })
  }


  async function listPokemon() {
    const results = await getPokemon('https://pokeapi.co/api/v2/pokemon', page * 48, 48)
    const promiseList = results.map(async (result) => {
      return await getPokemonInfo(result.url)
    })
    const pokemonList = await Promise.all(promiseList)
    const pokemonListWithImage = getPokemonImages(pokemonList)
    setPokemon(pokemonListWithImage)
  }

  async function searchPokemonList(search) {
    const results = await searchPokemon('https://pokeapi.co/api/v2/pokemon', search)
    const promiseList = results.slice(0,48).map(async (result) => {
      return await getPokemonInfo(result.url)
    })
    const pokemonList = await Promise.all(promiseList)
    const pokemonListWithImage = getPokemonImages(pokemonList)
    setPokemon(pokemonListWithImage)
  }



  useEffect(() => {
    listPokemon()
  }, [page])




  return (
    <div className="main">
      <div className="head">
        <div className="logo">
          <img src="src/images/pokedex.png" alt="Pokédex" />
        </div>
        <SearchBar searchPokemon={searchPokemonList}/>
      </div>
      

      <div className="pokedex">
        {pokemon.map((pokemon) => {
          return (
            <Card key={pokemon.id} id={pokemon.id} name={pokemon.name} img={pokemon.image} bg={pokemon.types[0].type.name}/>
          )
        })}
      </div>

      <div className="page-info">
        <span>Page: {page + 1}</span>
        <div className="page-controls">
          {page != 0 && (
            <button onClick={() => setPage(page - 1) }>
            Previous
            </button>

          )}
          {page != 17 && (
            <button onClick={() => setPage(page + 1)}>
            Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
