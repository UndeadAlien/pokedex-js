import React, { Component } from 'react'
import styled from 'styled-components'

const Brand = styled.a`
    margin-left: 25px;
    font-weight: bold;
    font-size: 1.5em;
`;

export default class NavBar extends Component {


    render() {
        return (
            <>
                <nav style={{ 'z-index': '2'}} className="navbar navbar-expand-md navbar-dark bg-dark position-sticky top-0 mb-3">
                    <Brand href="/" className="navbar-brand col-sm-4 col-md-3">Pokedex</Brand>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/"><h5>Pokemon</h5></a>
                        </li>
                    </ul>
                </nav>
            </>
        )
    }
}
