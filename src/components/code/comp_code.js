import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Btn_ } from '../../styles/bottom'
import { Code_ } from '../../styles/code'
import { label_ } from '../../styles/leters'
import { Steps_ } from '../../styles/steps'
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap'
import { colors } from '../../styles/colors'
import { mobile } from '../../model/mobile'
import { Key } from '../../model/Key'
import { next_step } from '../../services/onboring'
import { Process } from '../../services/process'
import { Trace } from '../../model/trace'
import interaccionesService from '../../services/interacciones'
import { keyOrigen } from '../../constants'
import { step } from '../../constants'
import Countdown from "react-countdown";
const assets = process.env.REACT_APP_ASSETS

const redirect = () => {
    interaccionesService.interacciones({
        step: step.VALIDA_TELEFONO_AUTOMATICO,
        value: "true",
        KeyOrigen: keyOrigen,
        idCookie: localStorage.getItem('cookie'),
        timeStamp: new Date()
    });
    Process(Trace, "Log")
    next_step()
}

export class COMPCode extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isValidCode: false,
            changeInputTextError: false,
            code: "",
            intervalValid: true,
            interval: 0,
            timer: 60,
            seconds: 0,
            clickContinueButton: false
        }

        this.onRenderer = this.onRenderer.bind(this);
    }

    async componentDidMount() {
        Process(Trace, 'Log')

        this.myInterval = setInterval(() => {
            if (!this.state.isValidCode) {
                this.setState({seconds: parseInt(this.state.timer % 60, 10), timer: --this.state.timer})
                if (this.state.timer == 0) {
                    this.setState({timer: 0, seconds: 0, intervalValid: false})
                } 
                this.setState({ interval: this.state.seconds });
            }
        }, 1000)
    }

    onKeyDown = event => {
        if (event.key === "Delete" || event.key === "Backspace") {
            event.preventDefault();
            let InputIdBack = ""
            switch (event.target.id) {
                case "A0": InputIdBack = "A0"; break
                case "A1": InputIdBack = "A0"; break
                case "A2": InputIdBack = "A1"; break
                case "A3": InputIdBack = "A2"; break
            }
            document.getElementById(event.target.id).value = ""
            document.getElementById(InputIdBack).focus()
        }
    };

    NewCode = async e =>{
        mobile.KeyOrigen = Key.KeyOrigen
        let response = await Process(mobile, "Movil/SendCodeAccess")
        response.map((x) => {
            mobile.access = x.Pin
        });
        this.setState({intervalValid: true, timer: 60, seconds: 0, interval: 0})
    }

    ValidateCode = async (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            document.getElementById(e.target.id).value = e.target.value


            let pin = `${document.getElementById("A0").value}${document.getElementById("A1").value}${document.getElementById("A2").value}${document.getElementById("A3").value}`;

            if (document.getElementById("A0").value == '')
                document.getElementById("A0").select();
            else if (document.getElementById("A1").value == '')
                document.getElementById("A1").select();
            else if (document.getElementById("A2").value == '')
                document.getElementById("A2").select();
            else if (document.getElementById("A3").value == '')
                document.getElementById("A3").select();




            if (pin.length == 4) {


                if (mobile.access != pin) {
                    document.getElementById("A0").style.borderBottomColor = colors[7];
                    document.getElementById("A0").style.color = colors[7];

                    document.getElementById("A1").style.borderBottomColor = colors[7];
                    document.getElementById("A1").style.color = colors[7];

                    document.getElementById("A2").style.borderBottomColor = colors[7];
                    document.getElementById("A2").style.color = colors[7];

                    document.getElementById("A3").style.borderBottomColor = colors[7];
                    document.getElementById("A3").style.color = colors[7];


                    setTimeout(() => {
                        if (document != null) {
                            document.getElementById("A0").style.borderBottomColor = "#C4C4C4"
                            document.getElementById("A1").style.borderBottomColor = "#C4C4C4"
                            document.getElementById("A2").style.borderBottomColor = "#C4C4C4"
                            document.getElementById("A3").style.borderBottomColor = "#C4C4C4"

                            document.getElementById("A0").style.color = "#C4C4C4"
                            document.getElementById("A1").style.color = "#C4C4C4"
                            document.getElementById("A2").style.color = "#C4C4C4"
                            document.getElementById("A3").style.color = "#C4C4C4"

                            document.getElementById("A0").value = '';
                            document.getElementById("A1").value = '';
                            document.getElementById("A2").value = '';
                            document.getElementById("A3").value = '';
                            document.getElementById("A0").select();
                        }
                        this.setState({ changeInputTextError: false })


                    }, 2000);

                    interaccionesService.interacciones({
                        step: step.VALIDA_TELEFONO,
                        value: "false",
                        KeyOrigen: keyOrigen,
                        idCookie: localStorage.getItem('cookie'),
                        timeStamp: new Date()
                    });
                    this.setState({ isValidCode: false, changeInputTextError: true })
                    Trace.Valida_Pin = false;
                    Trace.Intentos_Pin = Trace.Intentos_Pin + 1;
                    Process(Trace, 'Log')

                }
                else {

                    this.setState({ isValidCode: true, code: pin, changeInputTextError: false })
                    Trace.Valida_Pin = true;
                    Process(Trace, 'Log')
                }
            }
            else {
                this.setState({ isValidCode: false })
                document.getElementById("A0").style.borderBottomColor = colors[2];
                document.getElementById("A0").style.color = colors[2];

                document.getElementById("A1").style.borderBottomColor = colors[2];
                document.getElementById("A1").style.color = colors[2];

                document.getElementById("A2").style.borderBottomColor = colors[2];
                document.getElementById("A2").style.color = colors[2];

                document.getElementById("A3").style.borderBottomColor = colors[2];
                document.getElementById("A3").style.color = colors[2];

            }
        } else {
            document.getElementById(e.target.id).value = ""
        }
    }

    changeFocus = () => {
        this.setState(prevState => ({
            inFocus: !prevState.inFocus
        }));
    };

    async onSubmitCode() {
        interaccionesService.interacciones({
            step: step.VALIDA_TELEFONO,
            value: "true",
            KeyOrigen: keyOrigen,
            idCookie: localStorage.getItem('cookie'),
            timeStamp: new Date()
        });
        Process(Trace, "Log")
        next_step()

        this.setState({clickContinueButton: true})
    }

    onRenderer({seconds, api}) {
        if (this.state.clickContinueButton) {
            api.stop()
        }

        if (!this.state.isValidCode) {
            api.stop()
        }

        return <label style={label_(1, 0, "0.8em", 0, 'normal', '0.9rem')}>En {seconds} segundos avanza al próximo paso</label>
    };

    render() {
        return (
            <div id="e">
                {/* paso 1 */}
                <Container className="pt-3 ">
                    <Row className="d-flex justify-content-center" >

                        <label style={Steps_(2)} ><img src={`${assets}acceptz.svg`} className="img img-fluid" style={{ width: '11px' }} /></label>
                        <label style={Steps_(2)} ><img src={`${assets}acceptz.svg`} className="img img-fluid" style={{ width: '11px' }} /></label>
                        <label style={Steps_(1)} >Paso 3</label>
                    </Row>
                </Container>
                <Container className="p-3">
                    <Row>
                        <Col xs={12} className="pt-4 text-center font-weight-bold">
                            <p style={label_(0, 0, "18px", "center")}>
                                Te enviamos un código al{" "}
                                <label style={label_(2, 0)}>{mobile.Telefono}</label>
                            </p>
                            <p style={label_(0, 0, "18px", "center")}>Ingrésalo aquí:</p>
                        </Col>

                        <Col xs={12} className="pt-2 text-center">

                            <input
                                type="text"
                                style={Code_()}
                                id="A0"
                                maxLength={1}
                                onKeyDown={this.onKeyDown}
                                onChange={this.ValidateCode}
                            />
                            <input
                                type="text"
                                style={Code_()}
                                id="A1"
                                maxLength={1}
                                onKeyDown={this.onKeyDown}
                                onChange={this.ValidateCode}
                                onClick={
                                    (this.valide = () => {
                                        if (document.getElementById("A0").value == "")
                                            document.getElementById("A0").select()
                                        else if (document.getElementById("A1").value == "")
                                            document.getElementById("A1").select()
                                        else if (document.getElementById("A2").value == "")
                                            document.getElementById("A2").select()
                                        else if (document.getElementById("A3").value == "")
                                            document.getElementById("A3").select()
                                    })
                                }
                            />
                            <input
                                type="text"
                                style={Code_()}
                                id="A2"
                                maxLength={1}
                                onKeyDown={this.onKeyDown}
                                onChange={this.ValidateCode}
                                onClick={
                                    (this.valide = () => {
                                        if (document.getElementById("A0").value == "")
                                            document.getElementById("A0").select()
                                        else if (document.getElementById("A1").value == "")
                                            document.getElementById("A1").select()
                                        else if (document.getElementById("A2").value == "")
                                            document.getElementById("A2").select()
                                        else if (document.getElementById("A3").value == "")
                                            document.getElementById("A3").select()
                                    })
                                }
                            />
                            <input
                                type="text"
                                style={Code_()}
                                id="A3"
                                maxLength={1}
                                onChange={this.ValidateCode}
                                onKeyDown={this.onKeyDown}
                                onClick={
                                    (this.valide = () => {
                                        if (document.getElementById("A0").value == "")
                                            document.getElementById("A0").select()
                                        else if (document.getElementById("A1").value == "")
                                            document.getElementById("A1").select()
                                        else if (document.getElementById("A2").value == "")
                                            document.getElementById("A2").select()
                                        else if (document.getElementById("A3").value == "")
                                            document.getElementById("A3").select()
                                    })
                                }
                            />
                        </Col>

                        <Col xs={12} className="pt-4 text-center">
                            {!this.state.intervalValid && !this.state.changeInputTextError ? <label style={label_(2, 0, "0.8em")} onClick={this.NewCode}>Solicitar otro código</label> : "" }
                            {!this.state.changeInputTextError && this.state.intervalValid && !this.state.isValidCode ?
                                <label style={label_(1, 0, "0.8em")}>
                                    Código válido por <label>{this.state.interval}</label>’
                                </label> :""}                           
                            {this.state.changeInputTextError ?
                            <label style={label_(7, 0, "0.8em")}>
                                Código incorrecto
                            </label> : ""}
                        </Col>
                       
                        <Col xs={12} className="text-center"> {!this.state.changeInputTextError ?
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
                            </button> : ""}
                            {this.state.isValidCode && <Countdown date={Date.now() + 3000} renderer={this.onRenderer} onComplete={redirect}/>}
                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }
}