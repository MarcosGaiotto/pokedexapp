import { useState, useEffect } from 'react'
import { getPokemon, getPokemonInfo } from '../../api'
import { Card } from '../../components/Card'
import { SearchBar } from '../../components/SearchBar'

import './styles.css'


export function Home() {

  const [pokemon, setPokemon] = useState([])
  const [page, setPage] = useState(0)
  const [searching, setSearching] = useState('')

  function getPokemonImages(pokemonList) {
    return pokemonList.map((pokemon) => {
      const image = pokemon.sprites.versions['generation-v']['black-white'].animated.front_default
      image != null ? pokemon.image = image : pokemon.image = pokemon.sprites.front_default
      return pokemon
    })
  }


  async function listPokemon(search) {
    let results
    search != '' ? { async () {
        const promise = await getPokemon('https://pokeapi.co/api/v2/pokemon')
        results = promise.filter((pokemon) => { return pokemon.name.includes(search) })
      }
    } : {
      results = await getPokemon('https://pokeapi.co/api/v2/pokemon', page * 50, 50)
    }
      const promiseList = results.map(async (result) => {
      return await getPokemonInfo(result.url)
    })
    const pokemonList = await Promise.all(promiseList)
    const pokemonListWithImage = getPokemonImages(pokemonList)
    setPokemon(pokemonListWithImage)
  }

  function handleSearch(search) {
    setSearching(search)
  }

  useEffect(() => {
    listPokemon(searching)
  }, [page, searching])




  return (
    <>
      <input onChange={e =>  handleSearch(e.target.value)}/>
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
        {page != 17 && (
          <button onClick={() => setPage(page + 1)}>
          Next Page
          </button>
        )}
      </div>
    </>
  )
}
