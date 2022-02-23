import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./navbar-view.scss";

export function NavBarView() {
    const user = localStorage.getItem("user");

    onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    };

    onLoggedIn = () => {
        window.open("/", "_self");
    };

    onProfile = () => {
        window.open(`/users/${user}`, "_self");
    };

    return (
        <Navbar className="topnav" fixed="top">
            <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="topnav-centered">
                    <Nav.Link className="d-flex">
                        <Button variant="outline-primary" className="btn-outline-primary" onClick={() => { this.onLoggedIn() }}>Movies</Button>
                    </Nav.Link>
                    <Nav.Link className="d-flex">
                        <Button variant="outline-primary" className="btn-outline-primary" onClick={() => { this.onProfile() }}>Profile</Button>
                    </Nav.Link>
                    <Nav.Link className="d-flex">
                        <Button variant="outline-primary" className="btn-outline-primary" onClick={() => { this.onLoggedOut() }}>Logout</Button>
                    </Nav.Link>
                </Navbar.Collapse>
                <Nav.Link variant="outline-primary" >
                    ( Logged in as: <Link to={`/users/${user}`}>{user}</Link>)
                </Nav.Link>
            </Container>
        </Navbar>
    );
}