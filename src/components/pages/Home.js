// import { useEffect, useState } from 'react'
// import DisplayCard from './DisplayCard'

// const Home = (props) => {
//     const [pokemon, setPokemon] = useState([]);
//     const [searchResults, setSearchResults] = useState([]);
//     const [query, setQuery] = useState('');

//     let list

//     useEffect(() => {
//         fetch('https://pokeapi.co/api/v2/pokemon/')
//             .then(response => response.json())
//             .then(jsonData => {
//                 setPokemon(jsonData.results)
//             }).catch(err => {
//                 console.log(err)
//             })
//     }, [])

//     if (pokemon.length > 0) {
//         list = pokemon.map((pokemon, i) => pokemon.name)
//     }

//     // let list = searchResults.map((poke, i) => {
//     //     return (
//     //         <DisplayCard
//     //             key={poke['file-name']}
//     //             pokemon={poke}
//     //         />
//     //     )
//     // })

//     // const dynamicSearch = e => {
//     //     setSearchResults(e.target.value)
//     //     let filtered = pokemon.filter(poke => {
//     //         return pokemon.name
//     //     })
//     //     setSearchResults(filtered)
//     // }

//     return (
//         <main>
//             <h1>Pokémon Rulez</h1>
//             {/* <input
//                 placeholder="Search for a Pokemon!" */}
//                 {/* // onChange={dynamicSearch} */}
//             {/* /> */}
//             <div className="pokemon-list">
//                 {list}
//                 {/* {list} */}
//             </div>
//         </main>
//     );
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import { getAllPokemon, getPokemon } from './services/pokemon';
import DisplayCard from './DisplayCard';

function Home() {
    const [pokemonData, setPokemonData] = useState([]);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [loading, setLoading] = useState(true);

    const initialUrl = 'https://pokeapi.co/api/v2/pokemon'

    useEffect(() => {
        async function fetchData() {
            let response = await getAllPokemon(initialUrl);
            console.log(response);
            setNextUrl(response.next);
            setPrevUrl(response.previous);
            let pokemon = await loadingPokemon(response.results);
            console.log(pokemon)
            setLoading(false);
        }
        fetchData();
    }, []);

    const next = async () => {
        setLoading(true);
        let data = await getAllPokemon(nextUrl)
        await loadingPokemon(data.results)
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const prev = async () => {
        if (!prevUrl) return;
        setLoading(true);
        let data = await getAllPokemon(prevUrl)
        await loadingPokemon(data.results)
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const loadingPokemon = async (data) => {
        let _pokemonData = await Promise.all(data.map(async pokemon => {
            let pokemonRecord = await getPokemon(pokemon.url);
            return pokemonRecord;
        }))

        setPokemonData(_pokemonData)
    }
    console.log(pokemonData);
    return (
        <>
            <div className="nav-buttons">
                <button onClick={prev}>Prev</button>
                <button onClick={next}>Next</button>
            </div>
            <div>
                {
                    loading ? <h1>Loading...</h1> : (
                        <>
                            <div className="grid-container">
                                {pokemonData.map((pokemon, i) => {
                                    return <DisplayCard key={i} pokemon={pokemon} />
                                })}
                            </div>
                        </>
                    )}
            </div>
            <div className="nav-buttons">
                <button onClick={prev}>Prev</button>
                <button onClick={next}>Next</button>
            </div>
        </>
    )
}

export default Home;