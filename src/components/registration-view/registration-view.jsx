import React from 'react';
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        /* Send a request to the server for authentication */
        /* then call props on registored user(username) */
        props.onRegistration(username);
    }
    return (


        <Container fluid className="registerContainer" >

            <Navbar bg="navColor" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#logout">Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Row>
                <Col>
                    <CardGroup>
                        <Card className="registerCard">
                            <Card.Body>
                                <Card.Title className="text-center">Welcome to MyFlix.</Card.Title>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control className="mb-3" type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
                                    </Form.Group>
                                    <Button className="registerButton" variant="secondary" size="lg" type="submit" onClick={handleSubmit}>Register</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>

    );
}

RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};