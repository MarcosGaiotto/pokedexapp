import { useState, useEffect } from 'react'
import { getPokemon, getPokemonInfo } from '../../api'
import { Card } from '../../components/Card'

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
    const results = await getPokemon('https://pokeapi.co/api/v2/pokemon', page * 50, 50)
    const promiseList = results.map(async (result) => {
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
    <>
      <div className="pokedex">
        {pokemon.map((pokemon) => {
          return (
            <Card name={pokemon.name} img={pokemon.image} />
          )
        })}
      </div>
      <div>
        <span>Page: {page + 1}</span>
        {page != 0 && (
          <button onClick={() => setPage(page - 1) }>
          Previous Page
          </button>
        )}
        {page !=17 && (
          <button onClick={() => setPage(page + 1)}>
          Next Page
          </button>
        )}
        
      </div>
    </>
  )
}