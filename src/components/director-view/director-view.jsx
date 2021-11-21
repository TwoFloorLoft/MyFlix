import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card } from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends React.Component {

    constructor(props) {
        super();
        this.state = {
            movie: this.state,
            Director: [],
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getDirector(accessToken);
        }
    }



    getDirector(token) {
        const movie = this.state;
        const Director = movie.Director;
        axios.get(`https://joaoandrademyflix.herokuapp.com/directors/${Director._id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                this.setState({
                    Diretor: response.data.Director,
                });
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    render() {
        const { Director } = this.state;
        const { directors } = this.props;

        return (
            <Container className="mt-5">
                <Card>
                    <Row>
                        <Col xs={12}>
                            <h4>Director</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card.Body>
                                <Row className="director-body ">
                                    {Director.length > 0 &&
                                        directors.map((director) => {
                                            if (Director._id === Directors.find((dir) => dir === movie.Director)) {
                                                return (
                                                    <Card>
                                                        <Row
                                                            className="director-item card-content"
                                                            style={{ width: "16rem" }}
                                                            key={Director.Name}>
                                                        </Row>
                                                        <Row
                                                            className="director-item card-content"
                                                            style={{ width: "16rem" }}
                                                            key={Director.Bio}>
                                                        </Row>
                                                    </Card>
                                                );
                                            }
                                        }
                                        )
                                    }
                                </Row>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            </Container>
        );
    }
}

DirectorView.prototype = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string
    }).isRequired
};