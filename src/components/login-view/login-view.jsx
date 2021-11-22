import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { Form, Button, Row, Card, Container } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
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
        <Form className="form" align="center">
            <h2>Log In</h2>
            <br />
            <Form.Group controlId="formUsername">
                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"></Form.Control>
            </Form.Group>
            <br />
            <Form.Group controlId="formPassword">
                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"></Form.Control>
            </Form.Group>
            <br></br>
            <div className="form-button">
                <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Log in</Button>
                <br />
                <br />
                <br />
            </div>
        </Form >
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};