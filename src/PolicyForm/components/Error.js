
import React, { Component } from "react";
import { Row, Col } from "react-grid-system";

export default class Error extends Component {
    render () {
        return (
            <Row>
                <Col>
                    <p className="text-danger error-message"> { this.props.message } </p>
                </Col>
            </Row>
        );
    }
}