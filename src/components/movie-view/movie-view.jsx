import React from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {

    addToFavs() {
        const Username = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        const { movie } = this.props;

        axios.post(`https://joaoandrademyflix.herokuapp.com/users/${Username}/movies/${movie._id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response);
                console.log(movie._id);
                alert("The movie is now on your list.");
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        document.addEventListener("keypress", this.keypressCallback);
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
        const { movie, onBackClick, user } = this.props;

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
                                <span className="title">Title: </span>
                                <span className="value">{movie.Title}</span>
                            </div>
                            <div className="movie-description">
                                <span className="description">Description: </span>
                                <span className="value">{movie.Description}</span>
                            </div>
                            <div className="movie-genre">
                                <span className="label">Genre: </span>
                                <Link to={`/genres/${movie.Genre.Name}`}>
                                    <span className="value">{movie.Genre.Name}</span>
                                </Link>
                            </div>
                            <div className="movie-director">
                                <span className="director">Director: </span>
                                <Link to={`/directors/${movie.Director.Name}`}>
                                    <span className="value">{movie.Director.Name}</span>
                                </Link>
                            </div>
                            <br />
                            <div className="movie-button-div">
                                <Button variant="outline-primary" className="btn-outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                                <Button variant="outline-primary" className="btn-outline-primary" onClick={() => { this.addToFavs(); }}>Add to Favorite</Button>
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
