
import "bootstrap/dist/css/bootstrap.min.css";
import "./policy-form.css"
import React, { Component } from "react";
import createReactClass from "create-react-class";
import { Container, Row, Col } from "react-grid-system";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import Button from "react-validation/build/button";
import ReactMaskMixin from "react-mask-mixin";
import KontinentClient from "./KontinentClient";

import { required, date, email, phone, passport } from './validators';

export const MaskedInput = createReactClass({
    mixins: [ ReactMaskMixin ],
    render () {
        return (
            <Input {...this.props} {...this.mask.props} />
        );
    }
});

export default class PolicyForm extends Component {
    constructor () {
        super();

        this.state = {
            insuredBirthday: "",

            radio: 1,
            sum: 0,

            termsAccept: false
        }

        this.pay = this.pay.bind(this);
        this.arrange = this.arrange.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.radio = this.radio.bind(this);
    }

    async arrange () {
        const client = new KontinentClient({
            key: "a000154a364e819d25b043e79d713e2d6ee62244",
            type: "travel"
        });

        const sum = await client.fullCalc({
            tourists: [
                { birthDay: this.state.insuredBirthday }
            ],
            dateStart: '01.04.2021'
        });

        this.setState({ sum: sum / this.state.radio });
    }

    pay (event) {
        event.preventDefault();
        console.log(this.state);
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

    radio (number) {
        this.setState({ radio: number });
        this.arrange();
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
                                <option value="male"> Мужской </option>
                                <option value="female"> Женский </option>
                            </Select>
                        </Col>
                        <Col sm={3}>
                            <MaskedInput
                                className="form-control"
                                mask="99-99 999999"
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
                                validations={[ required, phone ]}
                                placeholder="Номер телефона"
                            />
                        </Col>
                        <Col lg={3}>
                            <Input
                                type="text"
                                className="form-control"
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
                            <Select validations={[ required ]} name="insuredGender" className="form-select">
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
                                    name="flexRadioDefault" 
                                    id="flexRadioDefault1"
                                    onChange={() => this.radio(6)}/>
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    1 месяц
                                </label>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    onChange={() => this.radio(4)}/>
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    3 месяца
                                </label>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    onChange={() => this.radio(2)}/>
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    6 месяцев
                                </label>
                            </div>
                        </Col>
                        <Col sm={2}>
                            <div className="form-check">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="flexRadioDefault" 
                                    id="flexRadioDefault1"
                                    onChange={() => this.radio(1)}/>
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    12 месяцев
                                </label>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="form-check">
                                <Input 
                                    className="form-check-input"
                                    type="checkbox" 
                                    id="flexCheckDefault"
                                    name="termsAccept"
                                    value="0"
                                    validations={[ required ]}/>
                                <label 
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault" >
                                Нажимая кнопку «Оформить», я даю свое согласие на обработку моих персональных данных и соглашаетесь с политикой конфиденциальности, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ «О персональных данных», на условиях и для целей, определенных в Согласии на обработку персональных данных
                                </label>
                            </div>
                        </Col>
                    </Row>
                    <Row className="sum">
                        <Col>
                            <h2> Стоимость </h2>
                        </Col>
                        <Col>
                            <h2> {this.state.sum} ₽ </h2>
                        </Col>
                        <Col>
                            <Button
                                className="btn btn-primary"
                                validated={this.arrange}
                                onClick={this.pay} >
                                    Оформить
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        );
    }
}