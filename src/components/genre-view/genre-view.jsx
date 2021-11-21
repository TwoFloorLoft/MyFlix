import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';


export class GenreView extends React.Component {

    constructor() {
        super();

        this.state = {
            Description: null,
            Movies: []
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getGenre(accessToken);
    }

    getGenre(token) {
        const { genre } = this.props;
        axios.get(`https://joaoandrademyflix.herokuapp.com/genres/${genre.Name}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                this.setState({
                    Description: response.data.Description,
                    Movies: response.data.Movies,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        const { onBackClick, genre } = this.props;
        const { Description, Movies } = this.state;
        return (
            <div className="genre-view">
                <h1>{genre.Name}</h1>
                <div className="genre-description">{Description}</div>
                <div className="genre-movies">
                    <div>Other {genre.Name} movies:</div>
                    {Movies.map((movieId) => (
                        <div>{movieId}</div>
                    ))}
                </div>
                <Button onClick={() => { onBackClick(); }} variant="outline-primary" className="button-back">Back</Button>
            </div>
        );
    }
}

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Movies: PropTypes.array
    }).isRequired
};