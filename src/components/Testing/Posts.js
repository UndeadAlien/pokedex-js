import React from 'react'

const Posts = ({ posts, loading }) => {

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <ul>
            {posts.map(post => (
                <li key={post.id}>
                    {post.name}
                </li>
            ))}
        </ul>
    )
}

export default Posts;
