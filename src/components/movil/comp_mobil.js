import React, { Component } from 'react'
import { Process } from '../../services/process'
import { Box_, Input_ } from '../../styles/Box'
import { Btn_ } from '../../styles/bottom'
import { label_ } from '../../styles/leters'
import { Steps_ } from '../../styles/steps'
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { colors } from '../../styles/colors'
import { mobile } from '../../model/mobile'
import { client } from '../../model/client'
import { Key } from '../../model/Key'
import { next_step } from '../../services/onboring'
import { Trace } from '../../model/trace'
import '../../css/placeholder.css'
import interaccionesService from '../../services/interacciones'
import { keyOrigen } from '../../constants'
import { step } from '../../constants'
import Countdown from "react-countdown";

const assets = process.env.REACT_APP_ASSETS

const redirect = () => {
    interaccionesService.interacciones({
        step: step.INSERTA_TELEFONO_AUTOMATICO,
        value: mobile.Telefono,
        KeyOrigen: keyOrigen,
        idCookie: localStorage.getItem('cookie'),
        timeStamp: new Date()
    });
    Process(Trace, "Log")

    next_step()
}

export class COMPMobile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isValidCode: false,
            clickContinueButton: false
        }

        this.onRenderer = this.onRenderer.bind(this);
    }
    componentDidMount() {
        Trace.Telefono = true;
        Process(Trace, 'Log')
    }
    async onSubmitCode() {
        interaccionesService.interacciones({
            step: step.INSERTA_TELEFONO,
            value: mobile.Telefono,
            KeyOrigen: keyOrigen,
            idCookie: localStorage.getItem('cookie'),
            timeStamp: new Date()
        });
        Process(Trace, "Log")
        next_step()
    }

    onRenderer({seconds, api}) {
        if (!this.state.isValidCode) {
            api.stop()
        }

        if (this.state.clickContinueButton) {
            api.stop()
        }

        return <label style={label_(1, 0, "0.8em", 0, 'normal', '0.9rem')}>En {seconds} segundos avanza al próximo paso</label>
    };

    render() {
        return (
            <>
                <div id="e">

                    <Container className="pt-3 ">
                        <Row className="d-flex justify-content-center" >


                            <label style={Steps_(2)} ><img src={`${assets}acceptz.svg`} className="img img-fluid" style={{ width: '11px' }} /> </label>
                            <label style={Steps_(2)} >Paso 2</label>
                            <label style={Steps_(1)} > </label>
                        </Row>

                    </Container>


                    {/* Form */}
                    <Container>

                        <Row className="p-3" >
                            <Col xs={12} className="pt-3 text-center" >
                                <label className="font-weight-bold" style={label_(0, 0, '18px', 'center')} >Ingresa tu número de celular</label>
                            </Col>

                            <Col xs={12} className="pt-3">
                                <label className="font-weight-bold" style={label_(0, 0, '14px')} >Número de celular  <label className="font-weight-normal" style={label_(1, 0, '10px')} > sin espacios ni guiones</label></label>
                            </Col>

                            <Col style={{ marginTop: '-8px' }} >

                                <input
                                    id="txtmobil"
                                    type="text"
                                    maxlength="10"
                                    placeholder="Ingresa tu número de celular de 10 dígitos" style={Input_(1, 4)}
                                    onChange={this.HndMobil = async (e) => {
                                        const re = /^[0-9\b]+$/;
                                        if (re.test(e.target.value)) {
                                            document.getElementById(e.target.id).value = e.target.value

                                            e.preventDefault();

                                            document.getElementById("txtmobil").style.borderColor = colors[2]

                                            if (/[a-zA-Z- ]/g.exec(e.target.value) != null) {


                                                ReactDOM.render(<img src={`${assets}error.svg`} className="img img-fluid" style={{ display: 'block', width: '10px', margin: '4px 0 0 20px' }} id="SpEr" />, document.getElementById("lblele"))
                                                document.getElementById("txtmobil").style.borderColor = colors[7]

                                                ReactDOM.render(
                                                    <p id="lblmessage" >
                                                        <label style={label_(5, 0, '10px')}>No pudimos validar tu número celular, por favor verifica haberlo ingresado correctamente y vuelve a intentarlo</label>
                                                    </p>
                                                    , document.getElementById("lblmessage"))

                                            }
                                            else {
                                                ReactDOM.render(<i id="lblele"></i>, document.getElementById("lblele"))

                                                ReactDOM.render(
                                                    <p id="lblmessage" >
                                                        <label style={label_(2, 0, '10px')}>No te preocupes, tus datos están protegidos!</label>
                                                        <p style={label_(1, 0, '10px')} >Necesitamos tu cédula para consultar bases de datos financieras y obtener tu puntaje crediticio. Si está todo en orden, aprobamos tu solicitud de crédito.</p>
                                                    </p>
                                                    , document.getElementById("lblmessage"))


                                                if (e.target.value.length === 10) {

                                                    ReactDOM.render(<Spinner className="font-weight-light spinner-border spinner-border-sm" animation="border" role="status" style={{ display: 'block', margin: '4px 0 0 15px' }} id="lblele" />, document.getElementById("lblele"))

                                                    mobile.Telefono = e.target.value;
                                                    mobile.Identificacion = client.DocumentNumber;
                                                    mobile.KeyOrigen = Key.KeyOrigen;

                                                    let response = await Process(mobile, "Movil/SendCodeAccess");

                                                    response.map(x => {
                                                        mobile.access = x.Pin,
                                                            document.getElementById("txtmobil").style.borderColor = colors[6]

                                                        ReactDOM.render(<img src={`${assets}accept.svg`} className="img img-fluid" style={{ display: 'block' }} id="lblele" />, document.getElementById("lblele"))
                                                        this.setState({ isValidCode: true });
                                                    })
                                                } else {
                                                    this.setState({ isValidCode: false });
                                                }
                                            }
                                        }
                                        else{
                                            if(e.target.value.length > 1)
                                            document.getElementById(e.target.id).value = document.getElementById(e.target.id).value.slice(0, - 1);
                                            else
                                            document.getElementById(e.target.id).value = "";
                                        }

                                    }}
                                />
                                <div style={{ position: 'absolute', left: 'calc(100% - 4em)', top: '0.5em', color: `${colors[2]}` }} >
                                    <i id="lblele"></i>
                                </div>
                            </Col>

                            <Col xs={12}>
                                <label style={label_(1, 0, '10px')}>Ejemplo: 8290556472</label>
                            </Col>

                            <Col xs={12} className="pt-3" >
                                <p id="lblmessage" >
                                    <label style={label_(2, 0, '10px')}>No te preocupes, tus datos están protegidos!</label>
                                    <p style={label_(1, 0, '8px')} >Necesitamos tu celular para consultar bases de datos financieras y obtener tu puntaje crediticio. Si está todo en orden, aprobamos tu solicitud de crédito.</p>
                                </p>
                            </Col>
                            <Col xs={12} className="text-center">
                                <button
                                    style={Btn_(
                                        2,
                                        2,
                                        3,
                                        "100%",
                                        null,
                                        this.state.isValidCode ? "inherit" : 0.3
                                    )}
                                    disabled={!this.state.isValidCode}
                                    onClick={this.onSubmitCode}
                                >
                                    Continuar
                                </button>
                                {this.state.isValidCode && <Countdown date={Date.now() + 3000} renderer={this.onRenderer} onComplete={redirect}/>}
                            </Col>

                        </Row>


                    </Container>



                </div>
            </>
        )
    }
}