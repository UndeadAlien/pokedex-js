import React, { Component } from 'react'

import {Link} from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <nav style={{ 'z-index': '2'}} className="navbar navbar-expand-md navbar-dark bg-dark position-sticky top-0">
                <a href="/" className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center">
                    Pokedex
                </a>

                <Link to="/nba"><button>NBA</button></Link>
            </nav>
        )
    }
}
