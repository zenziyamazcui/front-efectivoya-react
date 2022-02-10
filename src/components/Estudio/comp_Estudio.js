import React , { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import ReactDOM from 'react-dom'
import {Btn_} from '../../styles/bottom'
import {Container,Row,Col, Button,Form} from 'react-bootstrap'
import {label_} from '../../styles/leters'
import { client } from '../../model/client'
import { Process } from '../../services/process'
import {credit} from '../../model/credito'
import {Key} from '../../model/Key'
import { Trace } from '../../model/trace'
import {mobile} from '../../model/mobile'
import {product} from '../../model/product'
import {device_m} from '../../model/device'
import { COMP_Aprob } from './comp_Aprob'
import { keyOrigen } from '../../constants'
import { step } from '../../constants'
import interaccionesService from '../../services/interacciones'
const assets = process.env.REACT_APP_ASSETS

export class COMP_Deny extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        interaccionesService.interacciones({
            step: step.RECEPCION_MOTOR,
            value: `Resultado: Rechazado; Motivo: ${this.props.Data.Motivo}; ExtensionID: ${this.props.Data.ExtensionID}`,
            KeyOrigen: keyOrigen,
            idCookie: localStorage.getItem('cookie'),
            timeStamp: new Date()
        });

        Trace.Repcecion_Oferta = true;
        Trace.Estado = 'Rechazado';
        Process(Trace , 'Log')
    }


    render(){
        return(
            <Container>
                <Form onSubmit= {
                    this.hdls = (e) =>{
                        e.preventDefault();
                        ReactDOM.render(<COMP_Recomendaciones/>,document.getElementById("process"))

                    }
                } >
                    <div id="process" className="text-center" >
                        <Row>
                            <Col xs={12} className="pt-3 pb-3"  >
                                <label className="font-weight-bold" id="paso3b" style={label_(2,0,'18px')} >¡Lo sentimos {client.Name}!</label>
                            </Col>
                            <Col xs={12} className="pt-2" >
                                <img src={`${assets}deny.svg`} style={{height:'145px'}} className="img img-fluid" />
                            </Col>
                            <Col xs={12} className="pt-2" >
                                <p className="pt-2 font-weight-bold" style={label_(0,0,'16px')}>No podemos prestarte dinero <p>en este momento</p></p>
                                <p className="pt-2 font-weight-normal" style={label_(0,0,'12px')}>Con gusto volveremos a analizar <p>tu caso en unos días</p></p>
                                <div className="pt-2 pb-3" >
                                    <Button className="pt-2 font-weight-bold" style={Btn_(2,2,3,'275px')} type="submit" >¿Por qué no?</Button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Form>
            </Container>
        )
    }
}



class COMP_Recomendaciones extends Component{
    render(){
        return(
            <div id="process" className="pt-3 pb-3" >

                    <Col xs={12}>
                        <label className="font-weight-bold" style={label_(2,0,'18px')} >Algunas recomendaciones para obtener un préstamo con Efectivo Ya:</label>
                    </Col>

                    <Col xs={12} className="pt-3">
                        <div style={{marginLeft:'-12px'}} >
                            <ul style={label_(0,0,'12px','left')}>
                                <li><strong>Verificar ingresos mensuales:</strong> Es importante poder comprobar tu actividad y continuidad laboral.</li>
                                <li><strong>Pagar tus cuentas a tiempo:</strong> Procura cumplir con las fechas y términos acordados.</li>
                                <li><strong>Saldar tarjetas de crédito:</strong> Esfuérzate en mantener los saldos de tus tarjetas de crédito por debajo de 35% de tus límites.</li>
                            </ul>
                        </div>                
                    </Col>

                    <Col className="pt-3 text-center">
                            <Button 
                                onClick = { this.return = () => { location.reload()  }}
                                className="font-weight-bold" 
                                style={Btn_(2,2,3,'90%')} 
                                type="submit" >Entendido</Button>
                    </Col>

            </div>
        )
    }
}

class COMP_Pending extends Component{

    componentDidMount(){
        interaccionesService.interacciones({
            step: step.ENVIO_MOTOR,
            value: "true",
            KeyOrigen: keyOrigen,
            idCookie: localStorage.getItem('cookie'),
            timeStamp: new Date()
        });

        Trace.Envio_Oferta = true;
        Process(Trace , 'Log')
    }

    render(){
        return(
            <div id="process" className="p-3 my-auto">
                <Col xs={12}>
                    <label className="font-weight-bold" style={label_(2,0,'18px')} >!Estamos analizando tu <br/> solicitud!</label>
                </Col>
                <Col xs={12}>

                    <img src={`${assets}pending.svg`} style={{height:'145px'}} className="img img-fluid" />
                </Col>
                <Col xs={12} className="pt-5">
                    <label className="font-weight-bold" style={label_(0,0,'16px')}>Aguarda unos instantes para poder continuar con el proceso</label>
                </Col>
            </div>
        )
    }
}


class COMP_Estudio extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            element : 0 ,
            result : null
        }
    }

    async componentDidMount(){

        const { history } = this.props;

        credit.KeyOrigen = Key.KeyOrigen;
        credit.MontoSolicitado = product.Monto;
        credit.TraceID = null;
        credit.Cedula = client.DocumentNumber;
        credit.FrecuenciaSolicitada = product.Frecuencia;
        credit.CantCuotasSolicitadas = product.Numero_Cuotas;
        credit.Celular = mobile.Telefono;
        credit.Marca = device_m.device_brand;
        credit.Modelo = device_m.device_model;
        credit.TipoDispositivo = device_m.device_type;

        document.getElementById("xclos").style.display= "none";

        this.setState({result : await Process( credit , 'SolicitaTuCredito') })

        if(this.state.result.Done != null){
            this.setState({element : 1})
            if(history) history.push('/aprobado');
        }
        else if (this.state.result.Rejected != null){
            this.setState({element : 2})
        }
        else if (this.state.result.Done == null & this.state.result.Rejected == null & this.state.result.PreAbrobado == null){
            this.setState({element : 3})
        }
    }

    render()
    {
        return(
            <div>
                    <Container className="text-center">
                        <Row className="my-auto " >
                            { this.state.element === 0 
                                ? <COMP_Pending/> 
                                : this.state.element === 1
                                    ? <COMP_Aprob Data = {this.state.result.Done} />
                                    : <COMP_Deny Data = {this.state.result.Rejected || this.state.result.PreAbrobado} />
                            }
                        </Row>
                    </Container>
            </div>
        )
    }
}
export default withRouter(COMP_Estudio);