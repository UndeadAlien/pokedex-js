import React, {useState} from 'react'
import PokemonCard from './PokemonCard';

const Cards = ({ posts }) => {

    const [input, setInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    if (input.length > 0) {
        posts = posts.filter((i) => {
            return i.name.toLowerCase().match(input);
        })
    }

    return (
        <>

        <ul>

            <div className="input-group mb-3">
                <span className="input-group-text" id ="inputGroup-sizing-sm">Pokemon</span>
                <input 
                    type="text"
                    placeholder="Search..."
                    onChange={handleChange}
                    value={input}
                    class="form-control"
                    aria-describedby="inputGroup-sizing-lg"
                />  
            </div>

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
            
        </ul>

        </>
    )
}

export default Cards;
