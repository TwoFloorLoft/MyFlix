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
                        <Row className="director-movies text-center">
                            <Col>
                                <p>
                                    <strong>{Director.Name}'s Movies</strong>
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="img-container text-center">
                                {movies.map((m) => {
                                    if (m.Director && m.Director.Name === Director.Name) {
                                        return (
                                            <Card.Img
                                                className="movie-img"
                                                variant="top"
                                                key={m._id}
                                                src={m.ImagePath}
                                            />
                                        );
                                    }
                                })}
                            </Col>
                        </Row>
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