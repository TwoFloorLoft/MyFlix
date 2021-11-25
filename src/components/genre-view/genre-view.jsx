import React from "react";
import PropTypes from "prop-types";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
    render() {
        const { Genre, onBackClick, movies } = this.props;

        return (
            <Container>
                <br />
                <Card align="center">
                    <br />
                    <h4>{Genre.Name}</h4>
                    <Card.Body>
                        <div>
                            <span className="label">Description: </span>
                            <span className="value">{Genre.Description}</span>
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

GenreView.propTypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
    }).isRequired,
};