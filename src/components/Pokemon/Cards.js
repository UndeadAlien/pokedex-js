import React from 'react'
import PokemonCard from './PokemonCard';

const Cards = ({ posts, loading }) => {

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <ul>
            {posts ? (
                <div className="row">
                    {posts.map((pokemon) => (
                        <PokemonCard
                            key={pokemon.name}
                            name={pokemon.name}
                            image={pokemon.image}
                            url={pokemon.url}
                        />
                    ))}
                </div>
            ) : (
                    <h1>Loading...</h1>
                )}
        </ul>
    )
}

export default Cards;
