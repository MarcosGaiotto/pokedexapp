import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPokemon, getPokemonInfo, searchPokemon } from '../../api'
import { Card } from '../../components/Card'
import { Header } from '../../components/Header'
import { SearchBar } from '../../components/SearchBar'
import { Footer } from '../../components/Footer'

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
    const results = await getPokemon('https://pokeapi.co/api/v2/pokemon', page * 49, 49)
    const promiseList = results.map(async (result) => {
      return await getPokemonInfo(result.url)
    })
    const pokemonList = await Promise.all(promiseList)
    const pokemonListWithImage = getPokemonImages(pokemonList)
    setPokemon(pokemonListWithImage)
  }

  async function searchPokemonList(search) {
    const results = await searchPokemon('https://pokeapi.co/api/v2/pokemon', search)
    const promiseList = results.slice(0,49).map(async (result) => {
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
    <div className="app">
    
      <Header>
        <SearchBar searchPokemon={searchPokemonList}/>
      </Header>

      <main className="pokedex">
        {pokemon.map((pokemon) => {
          return (
            <Link className="link" to={`/pokemon/${pokemon.id}`} key={pokemon.id}><Card id={pokemon.id} name={pokemon.name} img={pokemon.image} bg={pokemon.types[0].type.name}/></Link>
          )
        })}
      </main>

      <Footer>
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
      </Footer>
    </div>
  )
}
