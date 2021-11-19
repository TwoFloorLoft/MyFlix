import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };
    }

    componentDidMount() {
        axios.get('https://joaoandrademyflix.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onRegistration(register) {
        this.setState({
            register,
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user, register } = this.state;

        if (!register) return (<RegistrationView onRegistration={register => this.onRegistration(register)} />);

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                <Navbar bg="navColor" variant="dark" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Movies</Nav.Link>
                            <Nav.Link href="#user">Profile</Nav.Link>
                            <Nav.Link href="#logout">Logout</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <div>
                    <Container>
                        {selectedMovie
                            ? (
                                <Row className="justify-content-lg-center">
                                    <Col lg={9} >
                                        <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                                    </Col>
                                </Row>
                            )
                            : (
                                <Row className="justify-content-lg-center">
                                    {movies.map(movie => (
                                        <Col lg={3} md={4} sm={6} >
                                            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                                        </Col>
                                    ))
                                    }
                                </Row>
                            )
                        }
                    </Container>
                </div>

            </div>
        );

    }

}

export default MainView;