
import "typeface-roboto";
import "bootstrap/dist/css/bootstrap.min.css";
import "./policy-form.css"
import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import Button from "react-validation/build/button";
import KontinentClient from "./lib/KontinentClient";
import dateFormat from "dateformat";
import MaskedInput from "./components/Maskedinput";
import Error from "./components/Error";
import PayForm from "./components/PayForm";

import { required, date, email, phone, passport, checked } from './validators';

export default class PolicyForm extends Component {
    constructor (props) {
        super(props);

        this.state = {
            radio: 1,
            sum: 0,

            orderId: "",

            termsAccept: false,
            loading: false
        }

        this.order = this.order.bind(this);
        this.arrange = this.arrange.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.radio = this.radio.bind(this);
    }

    async arrange () {
        const client = new KontinentClient({
            key: this.props.partner,
            type: "travel"
        });

        let now = new Date();
        now.setMonth(now.getMonth() + 1);
        let dateStart = dateFormat(now, 'dd.mm.yyyy');

        const sum = await client.fullCalc({
            tourists: [
                { birthDay: this.state.insuredBirthday }
            ],
            dateStart: dateStart,
            months: this.state.radio
        });

        this.setState({ sum: sum });
    }

    async order (event) {
        event.preventDefault();
        console.log(this.state);

        this.setState({
            loading: true
        });

        const client = new KontinentClient({
            key: this.props.partner,
            type: "travel"
        });

        let now = new Date();
        now.setMonth(now.getMonth() + 1);
        let dateStart = dateFormat(now, 'dd.mm.yyyy');

        const buyerName = this.state.fio.split(" ");
        const buyerPassport = this.state.passport.split(" ");

        const insuredName = this.state.insuredData.split(" ");

        const book = await client.book({
            buyer: {
                firstName: buyerName[0],
                lastName: buyerName[1],
                middleName: buyerName[2],
                gender: this.state.gender,
                email: this.state.email,
                birthDay: this.state.birthday,
                passport_type: 1,
                passport_ser: buyerPassport[0],
                passport_num: buyerPassport[1],
                phone: this.state.phone
            },
            tourists: [
                {
                    firstName: insuredName[0],
                    lastName: insuredName[1],
                    middleName: insuredName[2],
                    gender: this.state.insuredGender,
                    birthDay: this.state.insuredBirthday
                }
            ],
            dateStart: dateStart,
            months: this.state.radio
        });

        console.log(book.success)

        if (book.success) {
            console.log('Form valid');
            this.setState({ orderErrorMessage: "", orderId: book.orderId, loading: false })
        } else {
            console.log("Form invalid");
            this.setState({ orderErrorMessage: book.errmessg, loading: false });
        }
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({ [name]: value });

        this.form.validateAll();

        if (name.includes("insured")) {
            this.arrange();
        }
    }

    async radio (number) {
        await this.setState({ radio: number });
        await this.arrange();
    }

    render () {
        return (
            <Container>
                <h1 className="header"> Оформление полиса </h1>
                <h3 className="form-header"> Данные страхователя </h3>
                <Form ref={(c) => this.form = c }>
                    <Row>
                        <Col lg={6}>
                            <Input 
                                type="text"
                                name="fio"
                                className='form-control'
                                onChange={this.handleUserInput}
                                validations={[ required ]}
                                placeholder="Фамилия Имя Отчество" />
                        </Col>
                        <Col sm={3}>
                            <MaskedInput
                                className="form-control"
                                mask="99.99.9999"
                                name="birthday"
                                onChange={this.handleUserInput}
                                validations={[ required, date ]}
                                placeholder="Дата рождения"
                            />
                        </Col>
                        <Col sm={3}>
                            <Select 
                                validations={[ required ]}
                                className="form-select"
                                name="gender"
                                onChange={this.handleUserInput}>
                                <option defaultValue> Пол </option>
                                <option value="M"> Мужской </option>
                                <option value="F"> Женский </option>
                            </Select>
                        </Col>
                        <Col sm={3}>
                            <MaskedInput
                                className="form-control"
                                mask="9999 999999"
                                name="passport"
                                onChange={this.handleUserInput}
                                validations={[ required, passport ]}
                                placeholder="Серия номер паспорта"
                            />
                        </Col>
                        <Col sm={3}>
                            <MaskedInput
                                className="form-control"
                                mask="+7 (999) 999-9999"
                                name="phone"
                                onChange={this.handleUserInput}
                                validations={[ required, phone ]}
                                placeholder="Номер телефона"
                            />
                        </Col>
                        <Col lg={3}>
                            <Input
                                type="text"
                                className="form-control"
                                name="email"
                                onChange={this.handleUserInput}
                                validations={[ required, email ]}
                                placeholder="Email" />
                        </Col>
                    </Row>
                    <h3 className="form-header"> Данные застрахованного </h3>
                    <Row>
                        <Col sm={6}>
                            <Input
                                type="text"
                                className="form-control"
                                name="insuredData"
                                onChange={this.handleUserInput}
                                validations={[ required ]}/>
                        </Col>
                        <Col sm={3}>
                            <MaskedInput 
                                className="form-control"
                                mask="99.99.9999"
                                name="insuredBirthday"
                                placeholder="Дата рождения"
                                onChange={this.handleUserInput}
                                validations={[ required, date ]}
                                />
                        </Col>
                        <Col sm={3}>
                            <Select validations={[ required ]} name="insuredGender" className="form-select" onChange={this.handleUserInput}>
                                <option defaultValue> Пол </option>
                                <option value="M"> Мужской </option>
                                <option value="F"> Женский </option>
                            </Select>
                        </Col>
                    </Row>
                    <Row className="radio-buttons">
                        <Col sm={2}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio" 
                                    name="orange-radio" 
                                    id="1-month"
                                    value="0"
                                    defaultChecked
                                    onChange={() => this.radio(1)}/>
                                <label class="new-radio" htmlFor="1-month">
                                    1 месяц
                                </label>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="orange-radio"
                                    id="3-month"
                                    onChange={() => this.radio(3)}/>
                                <label class="new-radio" htmlFor="3-month">
                                     3 месяца
                                </label>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="orange-radio"
                                    id="6-month"
                                    onChange={() => this.radio(6)}/>
                                <label class="new-radio" htmlFor="6-month">
                                    6 месяцев
                                </label>
                            </div>
                        </Col>
                        <Col sm={3}>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="orange-radio" 
                                    id="12-month"
                                    onChange={() => this.radio(12)}/>
                                <label class="new-radio" htmlFor="12-month">
                                    12 месяцев
                                </label>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={9}>
                            <div className="form-check">
                                <input 
                                    className="form-check-input"
                                    type="checkbox" 
                                    id="terms-accept"
                                    defaultChecked
                                    validations={[ checked ]}/>
                                <label 
                                    className="new-checkbox"
                                    htmlFor="terms-accept" >
                                Нажимая кнопку «Оформить», я даю свое согласие на обработку моих персональных данных и соглашаетесь с политикой конфиденциальности, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ «О персональных данных», на условиях и для целей, определенных в Согласии на обработку персональных данных
                                </label>
                            </div>
                        </Col>
                    </Row>
                    <Error message={this.state.orderErrorMessage} />
                    <Row className="sum">
                        <Col sm={6} className="sum-container">
                            <Row>
                                <Col sm={9}>
                                    <h3> Стоимость полиса: </h3>
                                </Col>
                                <Col className="policy-sum">
                                    <h3> {this.state.sum} ₽ </h3>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={2}>
                            <Button
                                className="btn"
                                onClick={this.order} >
                                    { !this.state.loading ? "Оформить" : "Подождите..." }
                            </Button>
                        </Col>
                    </Row>
                    { this.state.orderId !== "" ? <PayForm orderId={this.state.orderId} partner={this.props.partner} sum={this.state.sum} /> : ""}
                </Form>
            </Container>
        );
    }
}