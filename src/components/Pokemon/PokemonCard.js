import React, { Component } from 'react'
import { Sprite, Card, StyledLink } from './PokemonElements';
import spinner from './spinner.gif';

export default class PokemonCard extends Component {

    state = {
        name: '',
        imageURL: '',
        pokemonId: '',
        imageLoading: true,
        toManyRequests: false,
    }


    componentDidMount() {
        const { name, url } = this.props;
        const pokemonID = url.split("/")[url.split('/').length - 2];
        const imageURL = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonID}.png?raw=true`

        this.setState({
            name,
            imageURL,
            pokemonID,
        });
    }


    render() {
        return (
            <div className="col-md-3 col-sm-6 mb-5">
                <StyledLink to={`pokemon/${this.state.pokemonID}`}>
                    <Card className="card">
                        <h5 className="card-header">{this.state.pokemonID}</h5>

                        {this.state.imageLoading ? (
                            <img src={spinner} alt="" style={{ width: '5em', height: '5em' }} className="card-img-top rounded mx-auto d-block mt-2" />
                        ) : null}

                        <Sprite
                            className="card-img-top rounded mx-auto mt-2"
                            onLoad={() => this.setState({ imageLoading: false })}
                            onError={() => this.setState({ toManyRequests: true })}
                            src={this.state.imageURL}
                            style={
                                this.state.toManyRequests ? { display: 'none' } :
                                    this.state.imageLoading ? null : { display: 'block' }
                            }
                        />
                        {this.state.toManyRequests ? (
                            <h6 className="mx-auto">
                                <span className="badge badge-danger mt-2">
                                    To Many Request
                                </span>
                            </h6>
                        ) : null}
                        <div className="card-body mx-auto">
                            <h6 className="card-title">
                                {this.state.name
                                    .toLowerCase()
                                    .split(" ")
                                    .map(letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                                    .join(' ')}
                            </h6>
                        </div>
                    </Card>
                </StyledLink>
            </div>
        )
    }
}
