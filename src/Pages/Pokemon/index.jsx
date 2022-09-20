import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPokemonInfo } from '../../api'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

import './styles.css'

export function Pokemon() {
    const id = useParams().id
    const [pokemon, setPokemon] = useState()
    const [pokemonSwitcher, setPokemonSwitcher] = useState([])
    const [loading, setLoading] = useState(true)

    async function setPokemonInfo(id) {
        const promise = await getPokemonInfo(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemonInfo = await Promise.resolve(promise)
        pokemonInfo.image = pokemonInfo.sprites.other['official-artwork'].front_default
        setPokemon(pokemonInfo)
    }

    async function setPokemonSwitcherInfo(id) {
        const prevPromise = await getPokemonInfo(`https://pokeapi.co/api/v2/pokemon/${parseInt(id) - 1}`)
        const prevPokemonInfo = await Promise.resolve(prevPromise)
        const nextPromise = await getPokemonInfo(`https://pokeapi.co/api/v2/pokemon/${parseInt(id) + 1}`)
        const nextPokemonInfo = await Promise.resolve(nextPromise)
        const switcherPokemon = [prevPokemonInfo, nextPokemonInfo]
        setPokemonSwitcher(switcherPokemon.map((e) => {
            return {
                id: e.id,
                name: e.name,
                image: e.sprites.versions['generation-v']['black-white'].animated.front_default
            }
        }))
        setLoading(false);
    }

    useEffect(() => {
        setPokemonInfo(id)
        setPokemonSwitcherInfo(id)
    }, [id])

    if (!loading) {
        return (
            <div className="app">
                <Header />
                <div className="pokemon">
                    <div className="image-area">
                        <img src={pokemon.image} alt={pokemon.name} />
                    </div>
                    <div className="data">
                        <div className="stats">
                            <h3>Stats</h3>
                            <ul>
                                {
                                    pokemon.stats.map((stat) => {
                                        return (
                                            <li key={stat.stat.name}>
                                                <span>{stat.stat.name}</span>
                                                <div className="stat-bar">
                                                    <div className="fill-bar" style={{ "width": `${stat.base_stat}px` }}></div>
                                                </div>
                                            </li>

                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="info">
                            <h3>Info</h3>
                            <div className="pokemon-info">
                                <span>Height: {pokemon.height / 10}m</span>
                                <span>Weight: {pokemon.weight / 10}kg</span>
                                <span>Type:</span>
                                <ul>
                                    {
                                        pokemon.types.map((type) => {
                                            return (
                                                <li key={type.type.name}>{type.type.name}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="abilities">
                            <h3>Abilities</h3>
                            <div className="pokemon-abilities">
                                <ul>
                                    {
                                        pokemon.abilities.map((ability) => {
                                            return (
                                                <li key={ability.ability.name}>{ability.ability.name}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer>
                    <Link className="previous" to={`/pokemon/${pokemonSwitcher[0].id}`}>
                        <img className="switchImg" src={pokemonSwitcher[0].image} alt="Previous pokemon" />
                        <span>Previous</span>
                    </Link>
                    <Link className="next" to={`/pokemon/${pokemonSwitcher[1].id}`}>
                        <img className="switchImg" src={pokemonSwitcher[1].image} alt="Next pokemon" />
                        <span>Next</span>
                    </Link>
                </Footer>
            </div>
        )
    }
}