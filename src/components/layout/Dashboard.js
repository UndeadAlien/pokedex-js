import React, { Component } from 'react'

import PokemonList from '../Pokemon/PokemonList'

import SearchBar from '../Search/SearchBar'

export default class Dashboard extends Component {
    render() {
        return (
            <div className="row">
                <PokemonList />
            </div>
        )
    }
}
