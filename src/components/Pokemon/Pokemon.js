import React, { Component } from 'react'
import axios from 'axios'

const PTYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
};

export default class Pokemon extends Component {

    state = {
        name: '',
        pokemonID: '',
        imageURL: '',
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: '',
        },
        height: '',
        weight: '',
        catchRate: '',
        eggGroups: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: '',
    };

    async componentDidMount() {
        const { pokemonID } = this.props.match.params;

        const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemonID}/`;
        const pokemonSpeciesURL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}/`;

        const pokemonRes = await axios.get(pokemonURL);
        const name = pokemonRes.data.name;

        const imageURL = pokemonRes.data.sprites.front_default;

        let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

        pokemonRes.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
            }
        });

        const height = (Math.round(pokemonRes.data.height * 0.328084 + 0.0001) * 100) / 100;
        const weight = (Math.round(pokemonRes.data.weight * 0.220462 + 0.0001) * 100) / 100;

        const types = pokemonRes.data.types.map(type => type.type.name);

        const abilities = pokemonRes.data.abilities.map(ability => {
            return ability.ability.name
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
        });

        const evs = pokemonRes.data.stats.filter(stat => {
            if (stat.effort > 0) {
                return true;
            } else {
                return false;
            }

        }).map(stat => {
            return `${stat.effort} ${stat.stat.name}`
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
        }).join(', ');

        // Pokemon Description
        await axios.get(pokemonSpeciesURL).then(res => {
            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return;
                }
            });

            const femaleRate = res.data['gender_rate'];
            const genderRatioFemale = 12.5 * femaleRate;
            const genderRatioMale = 12.5 * (8 - femaleRate);

            const catchRate = (Math.round((100 / 255) * res.data['capture_rate']));

            const eggGroups = res.data['egg_groups'].map(group => {
                return group.name
                    .toLowerCase()
                    .split('-')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
            }).join(', ');

            const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

            this.setState({ name, description, genderRatioFemale, genderRatioMale, catchRate, eggGroups, hatchSteps });
        });

        this.setState({
            imageURL,
            pokemonID,
            name,
            types,
            stats: {
                hp,
                attack,
                defense,
                speed,
                specialAttack,
                specialDefense,
            },
            height,
            weight,
            abilities,
            evs
        });



    }

    render() {
        return (
            <div className="col">
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-5">
                                <h5>PokeID: {this.state.pokemonID}</h5>
                            </div>
                            <div className="col-7">
                                <div className="float-end">
                                    {this.state.types.map(type => (
                                        <span
                                            key={type}
                                            className="badge badge-pill mr-1"
                                            style={{
                                                backgroundColor: `#${PTYPE_COLORS[type]}`,
                                                color: 'white',
                                                margin: '0 5px'
                                            }}
                                        >
                                            {type
                                                .toLowerCase()
                                                .split(" ")
                                                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                                .join(' ')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <img
                                    src={this.state.imageURL}
                                    className="card-img-top rounded mx-auto mt-2"
                                />

                            </div>
                            <div className="col-md-9">
                                <h4 class="mx-auto">
                                    {this.state.name
                                        .toLowerCase()
                                        .split(" ")
                                        .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                                        .join(' ')}
                                </h4>
                                {/* Health */}
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-3`}>HP</div>

                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{ width: `${this.state.stats.hp}%` }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.hp}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Attack */}
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-3`}>Attack</div>

                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{ width: `${this.state.stats.attack}%` }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.attack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Defense */}
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-3`}>Defense</div>

                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{ width: `${this.state.stats.defense}%` }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.defense}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Speed */}
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-3`}>Speed</div>

                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{ width: `${this.state.stats.speed}%` }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.speed}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Special Attack */}
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-3`}>Special Attack</div>

                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{ width: `${this.state.stats.specialAttack}%` }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.specialAttack}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Special Defense */}
                                <div className="row align-items-center">
                                    <div className={`col-12 col-md-3`}>Special Defense</div>

                                    <div className="col-12 col-md-9">
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressBar"
                                                style={{ width: `${this.state.stats.specialDefense}%` }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                <small>{this.state.stats.specialDefense}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col">
                                <p className="p-2">{this.state.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="card-body">
                    <h5 className="card-title text-center">Profile</h5>
                    <div className="row">

                        <div className="col-md-6">
                            {/* Height */}
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="float-end">Height:</h6>
                                </div>
                                <div className="col-md-6"><h6 className="float-start">{this.state.height}ft.</h6></div>
                            </div>
                            {/* Weight */}
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="float-end">Weight:</h6>
                                </div>
                                <div className="col-md-6"><h6 className="float-start">{this.state.weight}lbs.</h6></div>
                            </div>
                            {/* Catch Rate */}
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="float-end">Catch Rate:</h6>
                                </div>
                                <div className="col-md-6"><h6 className="float-start">{this.state.catchRate}%</h6></div>
                            </div>
                            {/* Gendar Ratio */}
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="float-end">Gendar Ratio:</h6>
                                </div>
                                <div className="col-6">
                                    <div className="progress">

                                        <div
                                            className="progress-bar"
                                            role="progressBar"
                                            style={{
                                                width: `${this.state.genderRatioFemale}%`,
                                                backgroundColor: 'pink'
                                            }}
                                            aria-valuenow="15"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            <small>{this.state.genderRatioFemale}</small>
                                        </div>

                                        <div
                                            className="progress-bar"
                                            role="progressBar"
                                            style={{
                                                width: `${this.state.genderRatioMale}%`,
                                                backgroundColor: 'blue'
                                            }}
                                            aria-valuenow="30"
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        >
                                            <small>{this.state.genderRatioMale}</small>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            {/* Egg Groups */}
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="float-end">Egg Groups:</h6>
                                </div>
                                <div className="col-md-6"><h6 className="float-start">{this.state.eggGroups}</h6></div>
                            </div>
                            {/* Abilities */}
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="float-end">Abilities:</h6>
                                </div>
                                <div className="col-md-6"><h6 className="float-start">{this.state.abilities}</h6></div>
                            </div>
                            {/* EVs */}
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="float-end">EVs:</h6>
                                </div>
                                <div className="col-md-6"><h6 className="float-start">{this.state.evs}</h6></div>
                            </div>
                            {/* Hatch Steps */}
                            <div className="row">
                                <div className="col-md-6">
                                    <h6 className="float-end">Hatch Steps:</h6>
                                </div>
                                <div className="col-md-6"><h6 className="float-start">{this.state.hatchSteps}</h6></div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="card-footer text-muted">
                    Data From {' '}
                    <a href="https://pokeapi.co/" target="_blank" className="card-link">PokeApi.co</a>
                </div>
            </div >
        )
    }
}
