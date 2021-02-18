
import React, { Component } from "react";
import KontinentClient from "../lib/KontinentClient";
import { Row, Col } from "react-grid-system";

export default class PayForm extends Component {
    constructor (props) {
        super(props)
    }

    async clickPay () {
        console.log("Creating pay form...");

        const client = new KontinentClient({
            key: "a000154a364e819d25b043e79d713e2d6ee62244",
            type: "travel"
        });

        const payForm = await client.pay({

        });
    }

    render () {
        return (
            <Row className="order">
                <Col sm={6} className="sum-container order-container">
                    <Row>
                        <Col sm={9}>
                            <h3> Номер заказа: </h3>
                        </Col>
                        <Col>
                            <h3> {this.props.orderId} </h3>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <button
                        className="btn order-btn"
                        onClick={this.clickPay} >
                            Оплатить
                    </button>   
                </Col>
            </Row>
        );
    }
}
