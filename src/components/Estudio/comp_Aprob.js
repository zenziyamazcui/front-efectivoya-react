import React , { Component } from 'react'
import {Btn_} from '../../styles/bottom'
import {Row,Col, Button} from 'react-bootstrap'
import {label_} from '../../styles/leters'
import { client } from '../../model/client'
import { Process } from '../../services/process'
import { product } from '../../model/product'
import { keyOrigen } from '../../constants'
import { Trace } from '../../model/trace'
import { step } from '../../constants'
import Countdown from "react-countdown";
import interaccionesService from '../../services/interacciones'
const assets = process.env.REACT_APP_ASSETS

function Calcular (Frecuencia, Monto, Numero_Cuotas)
{ 
    let F = Frecuencia == 1 ? 30 : Frecuencia;
    let R = (2.2/365) * F ;
    let P = Monto * (R / (1 - (1+R)**(-Numero_Cuotas)))

    return Math.round(P/5) * 5;
}

const redirect = () => {
    interaccionesService.interacciones({
        step: step.INICIO_CHATBOT_AUTOMATICO,
        value: "true",
        KeyOrigen: keyOrigen,
        idCookie: localStorage.getItem('cookie'),
        timeStamp: new Date()
    });
    Trace.Salida_BM = true
    Process(Trace , 'Log')

    return window.location.href = `https://api.whatsapp.com/send/?phone=18494104542&text=Mi+numero+de+c%C3%A9dula+es+${client.DocumentNumber}+y+%C2%A1Quiero+un+pr%C3%A9stamo+Efectivo+Ya!&app_absent=0`;
}

export class COMP_Aprob extends Component {

    constructor(props){
        super(props)
        this.state = {
            clickContinueButton: false
        }

        this.onRenderer = this.onRenderer.bind(this);
    }

    componentDidMount(){
        interaccionesService.interacciones({
            step: step.RECEPCION_MOTOR,
            value: `Resultado: Aprobado; Motivo: ${this.props.Data.Motivo}; ExtensionID: ${this.props.Data.ExtensionID}`,
            KeyOrigen: keyOrigen,
            idCookie: localStorage.getItem('cookie'),
            timeStamp: new Date()
        });
        window.fbq('track', 'Lead')
        window.gtag('event', 'conversion', {'send_to': 'AW-377670293/oTOmCIayjeQCEJWVi7QB'});

        Trace.Repcecion_Oferta = true;
        Trace.Estado = 'Aprobado'
        Process(Trace , 'Log')
    }

    onRenderer({seconds, api}) {
        if (this.state.clickContinueButton) {
            api.stop()
        }

        return <label style={label_(1, 0, "0.8em", 0, 'normal', '0.9rem')}>En {seconds} segundos avanza al chat</label>
    };
    
    render(){
        return(
            <div id="process" className="p-3 my-auto">
                
                
                <Col xs={12}>
                    <label className="font-weight-bold" style={label_(2,0,'18px')} >¡Felicitaciones {client.Name}!</label>
                </Col>

                <Col xs={12}>
                    <img src={`${assets}aprobado.svg`} style={{height:'145px'}} className="img img-fluid" />
                </Col>

                <Col xs={12} className="pt-3 font-weight-bold" >
               

                        <label className="col-12" style={label_(0,0,'16px')} >Has sido aprobado por:</label>
                        <label className="col-12" style={label_(2,0,'24px')}>RD$ {this.props.Data.MontoOfrecido} </label>


                        <Row className="d-flex justify-content-center" >

                        <div className="text-left col-10">
                            <label className="font-weight-normal" style={label_(2,0,'12px')}>  
                            <img src={`${assets}aprocheck.svg`} style={{height:'8px'}} className="img img-fluid" /> <span> </span>
                            {this.props.Data.FrecuenciaOfrecida == 1 
                                ? this.props.Data.PlazoOfrecido : 
                                    this.props.Data.FrecuenciaOfrecida == 15 ? 
                                        this.props.Data.PlazoOfrecido * 2 
                                            : this.props.Data.PlazoOfrecido * 4} <span style={label_(0,0)}>cuotas de </span>RD$ {
                                                Calcular( 
                                                    this.props.Data.FrecuenciaOfrecida  == 1 ? 30 : this.props.Data.FrecuenciaOfrecida ,
                                                    this.props.Data.MontoOfrecido ,
                                                    this.props.Data.FrecuenciaOfrecida == 1 
                                                        ? this.props.Data.PlazoOfrecido : 
                                                            this.props.Data.FrecuenciaOfrecida == 15 ? 
                                                                this.props.Data.PlazoOfrecido * 2 
                                                                    : this.props.Data.PlazoOfrecido * 4
                                             )} <span style={label_(0,0)}>cada una.</span></label>
                        </div>

                        <div className="text-left col-10">

                        <label className="font-weight-normal" style={label_(0,0,'12px')}> 
                            <img src={`${assets}aprocheck.svg`} style={{height:'8px'}} className="img img-fluid" /> 
                            <label> Primer vencimiento: </label> <span style={label_(0,0)} > 
                            {
                            this.props.Data.FrecuenciaOfrecida
                                ? new Date(new Date().setMonth(6)).toJSON().slice(0,10).replace(/-/g,'/')
                                : new Date(new Date().setDate(new Date().getDate() + product.Frecuencia)).toJSON().slice(0,10).replace(/-/g,'/')
                            } </span>
                            </label>
                        </div>

                        </Row>

                    <a href={`https://api.whatsapp.com/send/?phone=18494104542&text=Mi+numero+de+c%C3%A9dula+es+${client.DocumentNumber}+y+%C2%A1Quiero+un+pr%C3%A9stamo+Efectivo+Ya!&app_absent=0`} >
                        <Button id="paso3a"
                            onClick = {this.a = ( ) => {
                                this.setState({clickContinueButton: true})

                                interaccionesService.interacciones({
                                    step: step.INICIO_CHATBOT,
                                    value: "true",
                                    KeyOrigen: keyOrigen,
                                    idCookie: localStorage.getItem('cookie'),
                                    timeStamp: new Date()
                                });
                                Trace.Salida_BM = true
                                Process(Trace , 'Log')
                            } }  
                            className="font-weight-bold"  style={Btn_(2,2,3,'90%')}>Lo quiero YA!</Button>
                    </a>
                    <br/>
                    <Col xs={12} className="text-center">
                        <Countdown date={Date.now() + 3000} renderer={this.onRenderer} onComplete={redirect}/>
                    </Col>
                </Col>

            </div>
        )
    }
}
