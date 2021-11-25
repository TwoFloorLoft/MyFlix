import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from "../profile-view/profile-view";
import { NavBarView } from "../navbar-view/navbar-view";
import MoviesList from '../movies-list/movies-list';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { createStore } from 'redux';

import { setMovies } from '../../actions/actions';
//import MoviesList from '../movies-list/movies-list';



class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            user: null,
        };
    }

    getUsers(token) {
        axios.get(`https://joaoandrademyflix.herokuapp.com/users/`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                this.setState({
                    users: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getMovies(token) {
        axios.get('https://joaoandrademyflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie,
        });
    }

    onRegistration(registration) {
        this.setState({
            registration,
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username,
        });

        localStorage.setItem("token", authData.token);
        localStorage.setItem("user", authData.user.Username);
        this.getMovies(authData.token);
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
        const { user, users } = this.state;
        const { movies } = this.props;

        return (
            <Router>
                <NavBarView />
                <br />
                <br />
                <br />
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView
                                onLoggedIn={(user) => this.onLoggedIn(user)}
                            />
                            <RegistrationView />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <MoviesList movies={movies} />;
                    }} />

                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route
                        path="/directors/:Name"
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <Col md={8}>
                                    <DirectorView
                                        Director={
                                            movies.find(
                                                (m) => m.Director.Name === match.params.Name
                                            ).Director
                                        }
                                        movies={movies}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />
                    <Route
                        path="/genres/:Name"
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <Col md={8}>
                                    <GenreView
                                        movies={movies}
                                        Genre={
                                            movies.find((m) => m.Genre.Name === match.params.Name)
                                                .Genre
                                        }
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />
                    <Route
                        exact
                        path="/users/:Username"
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <ProfileView
                                    history={history}
                                    movies={movies}
                                    users={users}
                                    user={user}
                                    onBackClick={() => history.goBack()}
                                />
                            );
                        }}
                    />
                </Row>
            </Router>
        );
    }
}
let mapStateToProps = state => {
    return { movies: state.movies }
}
export default connect(mapStateToProps, { setMovies })(MainView);