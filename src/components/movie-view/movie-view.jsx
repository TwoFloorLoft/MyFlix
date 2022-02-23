import React from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {

    constructor(props) {
        super(props);

    }

    addFavoriteMovie() {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.post(`https://joaoandrademyflix.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
            method: 'POST'
        })
            .then(response => {
                alert(`Added to Favorites List`)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener("keypress", this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            user: null,
        });
        window.open("/", "_self");
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (

            <Container fluid className="moviesContainer" align="center">
                <Row>
                    <Col>
                        <br />
                        <div className="movie-view">
                            <div className="movie-poster" style={{ textAlign: "center", marginBottom: "30px" }}>
                                <img src={movie.ImagePath} crossOrigin="true" width="300" height="400" />
                            </div>
                            <div className="movie-title">
                                <span className="label">Title: </span>
                                <span className="value">{movie.Title}</span>
                            </div>
                            <div className="movie-description">
                                <span className="label">Description: </span>
                                <span className="value">{movie.Description}</span>
                            </div>
                            <div className="movie-genre">
                                <span className="label">Genre: </span>
                                <Link to={`/genres/${movie.Genre.Name}`}>
                                    <span className="value">{movie.Genre.Name}</span>
                                </Link>
                            </div>
                            <div className="movie-director">
                                <span className="label">Director: </span>
                                <Link to={`/directors/${movie.Director.Name}`}>
                                    <span className="value">{movie.Director.Name}</span>
                                </Link>
                            </div>
                            <br />
                            <div className="movie-button-div">
                                <Button variant="outline-primary" className="btn-outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                                {/* <Button variant="outline-primary" className="btn-outline-primary" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>Add to Favorites</Button> */}
                            </div>
                            <br />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        }),
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
};
