import React from "react";
import PropTypes from "prop-types";

import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {
    render() {
        const { Director, onBackClick, movies } = this.props;

        return (
            <Container>
                <br />
                <Card align="center">
                    <h4>Director</h4>
                    <Card.Body>
                        <div>
                            <span className="label">Name: </span>
                            <span className="value">{Director.Name}</span>
                        </div>
                        <div>
                            <span className="label">Bio: </span>
                            <span className="value">{Director.Bio}</span>
                        </div>
                        <div>
                            <span className="label">Born: </span>
                            <span className="value">{Director.Birth}</span>
                        </div>
                        <div>
                            <span className="label">Death: </span>
                            <span className="value">{Director.Death}</span>
                        </div>
                        <br />
                        <div className="backButton">
                            <Button size="md" variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

DirectorView.proptypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
        Birth: PropTypes.number,
        Death: PropTypes.number,
    }).isRequired,
};