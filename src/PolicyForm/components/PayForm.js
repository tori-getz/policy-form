
import React, { Component } from "react";
import KontinentClient from "../lib/KontinentClient";
import { Row, Col } from "react-grid-system";

export default class PayForm extends Component {
    constructor (props) {
        super(props)

        this.state = null;
    }

    async componentDidMount (e) {
        console.log("Creating pay form...");

        const client = new KontinentClient({
            key: this.props.partner,
            type: "travel"
        });

        const payForm = await client.pay({
            orderId: this.props.orderId,
            sum: this.props.sum,
            success_url: "https://konti.travel/",
            failure_url: "https://konti.travel"
        });

        this.setState(payForm);
    }

    async componentDidUpdate () {
        console.log("Updating pay form...");

        const client = new KontinentClient({
            key: this.props.partner,
            type: "travel"
        });

        const payForm = await client.pay({
            orderId: this.props.orderId,
            sum: this.props.sum,
            success_url: "https://konti.travel/",
            failure_url: "https://konti.travel"
        });

        this.setState(payForm);
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
                    { this.state !== null
                    ?
                    <form method={this.state.method} action={this.state.url}>
                        <input type="hidden" name="MNT_ID" value={this.state.params.MNT_ID} />
                        <input type="hidden" name="MNT_TRANSACTION_ID" value={this.state.params.MNT_TRANSACTION_ID} />
                        <input type="hidden" name="MNT_CURRENCY_CODE" value={this.state.params.MNT_CURRENCY_CODE} />
                        <input type="hidden" name="MNT_AMOUNT" value={this.state.params.MNT_AMOUNT} />
                        <input type="hidden" id="paymentsystem" name="paymentSystem.unitId" value="" />
                        <input type="hidden" id="followup" name="followup" value="false" />
                        <input type="hidden" name="javascriptEnabled" value="false" />
                        <input type="hidden" name="paymentSystem.accountId" value="2" />
                        <input type="hidden" name="MNT_SIGNATURE" value={this.state.params.MNT_SIGNATURE} />
                        <input type="hidden" name="MNT_SUCCESS_URL" value={this.state.params.MNT_SUCCESS_URL} />
                        <input type="hidden" name="MNT_FAIL_URL" value={this.state.params.MNT_FAIL_URL} />
                        <input type="hidden" name="MNT_RETURN_URL" value={this.state.params.MNT_RETURN_URL} />
                        <input type="submit" value="Оплатить" className="btn order-btn" />
                    </form>
                    :
                    <h3> Загрузка... </h3> }
                </Col>
            </Row>
        );
    }
}
