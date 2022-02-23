import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setUser, updateUser } from '../../actions/actions';
import { connect } from 'react-redux';

import "./profile-view.scss";

export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: [],
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem("token");
        this.getUser(accessToken);
    }

    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            user: null,
        });
        window.open("/", "_self");
    }

    getUser = (token) => {
        const username = localStorage.getItem("user");
        axios
            .get(`https://joaoandrademyflix.herokuapp.com/users/${username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // Allow user to edit or update profile

    editUser = (e) => {
        e.preventDefault();
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        axios.put(`https://joaoandrademyflix.herokuapp.com/users/${username}`,
            {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                });

                localStorage.setItem("user", this.state.Username);
                const data = response.data;
                console.log(data);
                console.log(this.state.Username);
                alert("Profile is updated!");
                window.open(`/users/${username}`, "_self");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    //Remove a fav movie

    onRemoveFavorite() {
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://joaoandrademyflix.herokuapp.com/users/${username}/movies/${movie._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                console.log(response);
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Deregister

    onDeleteUser() {
        const username = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        axios.delete(`https://joaoandrademyflix.herokuapp.com/user/${username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response);
                alert("Profile has been deleted!");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.open(`/`, "_self");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setUsername(value) {
        this.state.Username = value;
    }

    setPassword(value) {
        this.state.Password = value;
    }

    setEmail(value) {
        this.state.Email = value;
    }

    setBirthday(value) {
        this.state.Birthday = value;
    }

    render() {
        const { movies, onBackClick, user } = this.props;
        const { FavoriteMovies, Username, Email, Birthday } = this.state;

        return (
            <Container className="profile-view" align="center">
                <Row>
                    <Col>
                        <Card className="user-profile">
                            <br />
                            <Card.Title>User Profile</Card.Title>
                            <Card.Text>
                                <div className="profile-container">
                                    <span className="label">Username: </span>
                                    <span className="value">{Username}</span>
                                    <br />
                                    <br />
                                    <span className="label">Email: </span>
                                    <span className="value">{Email}</span>
                                    <br />
                                    <br />
                                    <span className="label">Birthday: </span>
                                    <span className="value">{Birthday}</span>
                                    <br />
                                    <br />
                                </div>
                            </Card.Text>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Card className="update-profile">
                            <Card.Body>
                                <Card.Title>Update Profile</Card.Title>
                                <br />
                                <Form
                                    className="update-form"
                                    onSubmit={(e) =>
                                        this.editUser(
                                            e,
                                            this.Username,
                                            this.Password,
                                            this.Email,
                                            this.Birthday
                                        )
                                    }
                                >
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Username"
                                            placeholder="New Username"
                                            onChange={(e) => this.setUsername(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <br />

                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="Password"
                                            placeholder="New Password"
                                            onChange={(e) => this.setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <br />

                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="Email"
                                            placeholder="Enter Email"
                                            onChange={(e) => this.setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <br />

                                    <Form.Group>
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="Birthday"
                                            onChange={(e) => this.setBirthday(e.target.value)}
                                        />
                                    </Form.Group>
                                    <br />
                                    <div className="bt">
                                        <Button variant="outline-warning" type="submit" onClick={this.editUser}>Update User</Button>
                                        <Button className="delete-button" variant="outline-danger" onClick={() => this.onDeleteUser()} > Delete User </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <br />
                {/* <Card>
                    <Row style={{ marginTop: "20px" }}>
                        <Col>
                            <h4>{Username} Favorite Movies</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card.Body>
                                {FavoriteMovies.length === 0 && (
                                    <div className="text-center">No Favorite Movie</div>
                                )}
                                <Row className="favorite-container">
                                    {FavoriteMovies.length > 0 &&
                                        movies.map((movie) => {
                                            if (
                                                movie._id ===
                                                FavoriteMovies.find((fav) => fav === movie._id)
                                            ) {
                                                return (
                                                    <Card className="favorite-movie card-content" key={movie._id} >
                                                        <Card.Img
                                                            className="fav-poster"
                                                            variant="top"
                                                            src={movie.ImagePath}
                                                        />
                                                        <Card.Body style={{ backgroundColor: "black" }}>
                                                            <Card.Title className="movie_title">
                                                                {movie.Title}
                                                            </Card.Title>
                                                            <Button size="sm" variant="danger" value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)} > Remove </Button>
                                                        </Card.Body>
                                                    </Card>
                                                );
                                            }
                                        })}
                                </Row>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card> */}
                <br />
                <div className="backButton">
                    <Button size="md" variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                </div>
                <br />
            </Container>
        );
    }
}

let mapStateToProps = state => {
    return {
        user: state.user,
        movies: state.movies
    }
}

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);