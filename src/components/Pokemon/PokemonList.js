import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Cards';
import { ButtonContainer, LoadMoreButton, ShowLessButton } from './PokemonElements';


function PokemonList() {

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const [index, setIndex] = useState(null);
    const [value, setValue] = useState([]);
    const [lines, setLines] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=2000');
            setPosts(res.data['results']);
            setLoading(false);
        }
        
        fetchPosts();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const loadMore = () => {
        setPostsPerPage(postsPerPage + 10);
    }
    
    const showLess = () => {
        setPostsPerPage(postsPerPage - 10);
    }

    return (
        <>
            <div className="container">
                {index == null &&
                    <Cards posts={currentPosts} loading={loading} />
                }
                

                <ButtonContainer className="button__container">

                    {postsPerPage <= indexOfLastPost &&
                        <LoadMoreButton className="loadMoreButtton" onClick={loadMore}>Load more</LoadMoreButton>
                    }

                    {postsPerPage > 10 &&
                        <ShowLessButton className="showLessButton" onClick={showLess}>Show less</ShowLessButton>
                    }

                </ButtonContainer>

            </div>
        </>
    )
}


export default PokemonList;