import React from 'react';
import axios from 'axios';
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        axios.post('https://joaoandrademyflix.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
            })
            .catch(e => {
                console.log('error registering the user')
            });

        return (
            <Row>
                <Col>
                    <Form className="form">
                        <h2>Create Account</h2>
                        <Form.Group>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} onInput={validate} placeholder="Username"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} onInput={validate} placeholder="Password"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} onInput={validate} placeholder="Email"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} onInput={validate} placeholder="Birthday"></Form.Control>
                        </Form.Group>
                        <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Create Account</Button>
                    </Form>
                </Col>
                <Col>
                    <Link to={`/`}>
                        <Button >Back to login</Button>
                    </Link>
                </Col>
            </Row>
        );
    }

    RegistrationView.propTypes = {
        user: PropTypes.shape({
            username: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            birthday: PropTypes.string.isRequired,
            password: PropTypes.string.isRequired
        })
    };
}