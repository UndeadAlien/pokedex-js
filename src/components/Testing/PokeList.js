import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Posts from './Posts';

function PokeList() {

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=100');
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
        <ul>
            <Posts posts={currentPosts} loading={loading} />
            <button onClick={loadMore}>More</button>
            <button onClick={showLess}>Less</button>
        </ul>
    )
}

export default PokeList;
