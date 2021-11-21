import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { Form, Button, Row, Card, Container } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://joaoandrademyflix.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
    };

    return (
        <Container fluid className="loginContainer" >
            <Card className="loginCard">
                <Card.Body>
                    <Card.Title className="text-center">Welcome to MyFlix</Card.Title>
                    <Form >
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={e => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                className="mb-3"
                                type="password"
                                onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <div className="form-button">
                            <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Log in</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};
