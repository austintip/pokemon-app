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
import { getAllPokemon } from './services/pokemon';
function Home() {
    const [pokemonData, setPokemonData] = useState([]);
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [ loading, setLoading] = useState(true);

    const initialUrl = 'https://pokeapi.co/api/v2/pokemon'

    useEffect(() => {
        async function fetchData() {
            let response = await getAllPokemon(initialUrl);
            console.log(response);
            setNextUrl(response.next);
            setPrevUrl(response.previous);
            // await loadingPokemon(response.results);
            setLoading(false);
        }
        fetchData();
    }, []);

    return(
        <div>
            { loading ? <h1>Loading...</h1> : (
                <h1>Data is fetched</h1>
            )}
        </div>
    )
}

export default Home;