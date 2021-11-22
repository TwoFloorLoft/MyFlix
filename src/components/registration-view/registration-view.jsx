import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Form, Button, Container, Col, Row } from "react-bootstrap";
import "./registration-view.scss";
import axios from "axios";

export function RegistrationView(props) {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Birthday, setBirthday] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`https://joaoandrademyflix.herokuapp.com/users`, {
            Username: Username,
            Password: Password,
            Email: Email,
            Birthday: Birthday,
        })
            .then((response) => {
                const data = response.data;
                console.log(data);
                alert("Registration Successful!");
                window.open("/", "_self");
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Form className="register-card" align="center" onSubmit={this.handleSubmit}>
            <h2>Create New Account</h2>
            <Form.Group controlId="formRegisterUsername">
                <Form.Control type="text" value={Username} onChange={(e) => setUsername(e.target.value)} placeholder="Username - min 5 chars."
                />
            </Form.Group>
            <Form.Group controlId="formRegisterPassword">
                <br />
                <Form.Control
                    type="password" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                />
            </Form.Group>
            <br />
            <Form.Group controlId="formEmail">
                <Form.Control
                    type="email" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                />
            </Form.Group>
            <br />
            <Form.Group controlId="formBirthday">
                <Form.Control type="date" value={Birthday} onChange={(e) => setBirthday(e.target.value)}
                />
            </Form.Group>
            <br />
            <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Register</Button>
        </Form>
    );
}

RegistrationView.propTypes = {
    registeration: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string,
    }),
    onRegistration: PropTypes.func,
};