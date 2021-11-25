import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import './movie-card.scss';

export class MovieCard extends React.Component {

    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            user: null,
        });
        window.open("/", "_self");
    }

    render() {
        const { movie } = this.props;

        return (

            <Container>
                <br />
                <Row>
                    <Card align="center">
                        <Card.Img variant="top" src={movie.ImagePath} crossOrigin="true" width="300" height="350" />
                        <Card.Body>
                            <Card.Title>{movie.Title}</Card.Title>
                            <Card.Text>{movie.Description}</Card.Text>
                            <br />
                            <Link to={`/movies/${movie._id}`}>
                                <Button variant="link">Show more</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
