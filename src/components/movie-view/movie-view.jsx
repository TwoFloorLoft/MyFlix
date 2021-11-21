import React from 'react';
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from 'react-bootstrap';

import { Link } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (

            <Container fluid className="moviesContainer">
                <Row>
                    <Col>
                        <div className="movie-view">
                            <div className="movie-poster" style={{ textAlign: "center", marginBottom: "30px" }}>
                                <img src={movie.ImagePath} crossOrigin="true" width="300" />
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
                            <div className="genre-description">
                                <span className="genre">Description: </span>
                                <span className="value">{movie.Genre.Description}</span>
                            </div>
                            <div className="movie-director">
                                <span className="director">Director: </span>
                                <Link to={`/directors/${movie.Director.Name}`}>
                                    <span className="value">{movie.Director.Name}</span>
                                </Link>
                            </div>
                            <div className="director-bio">
                                <span className="director">Bio: </span>
                                <span className="value">{movie.Director.Bio}</span>
                            </div>
                            <div className="movie-button-div">
                                <Button variant="outline-primary" className="btn-outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                                <Button variant="outline-primary" className="btn-outline-primary" onClick={() => { this.onLoggedOut() }}>Log out</Button>
                            </div>
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
