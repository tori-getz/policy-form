
import React, { Component } from "react";
import KontinentClient from "../lib/KontinentClient";
import { Row, Col } from "react-grid-system";

export default class PayForm extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <Row>
                <Col>
                    <h3> Номер заказа: </h3>
                </Col>
                <Col>
                    <h3> {this.props.orderId} </h3>
                </Col>
                <Col>
                    <button
                        className="btn btn-success">
                            Оплатить
                    </button>   
                </Col>
            </Row>
        );
    }
}
