import React , {Component, useState} from 'react'
import {Process} from '../../services/process'
import {Input_} from '../../styles/Box'
import {Btn_} from '../../styles/bottom'
import {label_} from '../../styles/leters'
import {Steps_} from '../../styles/steps'
import {Container,Row,Col,Button,Spinner,Form} from 'react-bootstrap'
import ReactDOM from 'react-dom'
import { colors } from '../../styles/colors'
import { client } from '../../model/client'
import { Key } from '../../model/Key'
import { Trace } from '../../model/trace'
import interaccionesService from '../../services/interacciones'
import { next_step } from '../../services/onboring'
import { device_m } from '../../model/device'
import { keyOrigen } from '../../constants'
import { step } from '../../constants'
import { cookieValidator } from '../../helpers/cookieValidator'
import Countdown from "react-countdown";
const assets = process.env.REACT_APP_ASSETS

const esCedulaValida = cedula => {
    
    cedula = cedula.replace(/-/g,'').padStart(11, "0");  
    var cedula_sin_digito_verificador = cedula.substr(0, cedula.length - 1);  
    var digito_verificador = cedula.substr(cedula.length - 1, 1);  
    var suma = 0;  

    if(cedula.length < 11) return false;

    for (var i = 0; i < cedula_sin_digito_verificador.length; i++) {  
        var mod = "";  
        
        if((i % 2) == 0){mod = 1} else {mod = 2}  
        
        var res = cedula_sin_digito_verificador.substr(i,1) * mod;  
        
        if (res > 9) {  
            res = res.toString();  
            res = eval(res.substr(0,1)) + eval(res.substr(1,1));  
        }  
        suma += eval(res);  
    }  
    var el_numero = (10 - (suma % 10)) % 10;  
    
	return el_numero == digito_verificador && cedula_sin_digito_verificador.substr(0,3) != "000";

}
const redirect = () => {
    interaccionesService.interacciones({
        step: step.VALIDA_IDENTIFICACION_AUTOMATICO,
        value: client.DocumentNumber,
        KeyOrigen: keyOrigen,
        idCookie: localStorage.getItem('cookie'),
        timeStamp: new Date()
    });
    
    next_step()
}

export class COMPIdentification extends Component{

    constructor(props){
        super(props);
        this.state = {
            clickContinueButton: false
        }

        this.onRenderer = this.onRenderer.bind(this);
    }

    componentDidMount(){
        cookieValidator();
        Trace.Ofert = true;
        Trace.Identificacion = true;
        Process(Trace , 'Log')
    }

    onRenderer({seconds, api}) {
        if (this.state.clickContinueButton) {
            api.stop()
        }

        return <label style={label_(1, 0, "0.8em", 0, 'normal', '0.9rem')}>En {seconds} segundos avanza al próximo paso</label>
    };

    render(){
        return(
            <div id="e" >



                {/* paso 1 */}
                <Container className="pt-3 ">
                    <Row  className="d-flex justify-content-center" >
                        <label style={Steps_(2)} >Paso 1</label>
                        <label style={Steps_(1)} > </label>
                        <label style={Steps_(1)} > </label>
                    </Row>

                </Container>

                <Container className="pt-3 pb-1" >
                    <Row>
                    

                        <Col xs={12} className="pt-3 text-center" >
                            <label className="font-weight-bold" style={label_(0,0,'18px','center')}>Ingresa tu cédula</label>
                        </Col>

                        <Col xs={12} className="pt-3" >
                            <label style={label_(0,0,'14px')} className="ml-1 font-weight-bold">Número de cédula <label style={label_(1,0,'10px')} className="font-weight-normal"> sin espacios ni guiones</label></label>
                        </Col>

                        <Col xs={12} >


                                <span>
                                    <input 
                                        id="txtnumber" 
                                        type="text" 
                                        maxlength="11"                                          
                                        placeholder="Ingresa tu número de cédula de 10 dígitos" 
                                        style={Input_(1,4)} 
                                        onChange = {this.valhd = async (e) =>{
                                        const re = /^[0-9\b]+$/;
                                        if (re.test(e.target.value)) {
                                            document.getElementById(e.target.id).value = e.target.value

                                            e.preventDefault();
                                            var cedula = e.target.value
                                            document.getElementById("txtnumber").style.borderColor = colors[2]

                                            if(/[a-zA-Z- ]/g.exec(cedula) != null){

                                                ReactDOM.render( <img src = {`${assets}error.svg`} className="img img-fluid"  style={{display:'block', width:'10px' , margin:'4px 0 0 14px' }} id="SpEr" /> , document.getElementById("lblele"))
                                                document.getElementById("txtnumber").style.borderColor = colors[7]
      
                                                ReactDOM.render(
                                                    <p id="lblmessage" >
                                                        <label style={label_(5,0,'10px')}>No pudimos validar tu cédula, por favor verifica haberla ingresado correctamente y vuelve a intentarlo</label>
                                                    </p>
                                                    ,document.getElementById("lblmessage"))

                                            }
                                            else {

                                                ReactDOM.render( <i id="lblele"></i> , document.getElementById("lblele"))

                                                
                                                ReactDOM.render(
                                                    <p id="lblmessage" >
                                                        <label style={label_(2,0,'10px')}>No te preocupes, tus datos están protegidos!</label>
                                                        <p style={label_(1,0,'10px')} >Necesitamos tu cédula para consultar bases de datos financieras y obtener tu puntaje crediticio. Si está todo en orden, aprobamos tu solicitud de crédito.</p>
                                                    </p>
                                                    ,document.getElementById("lblmessage"))

                                                    

                                                    if (cedula.length > 8)
                                                        {
                                                            ReactDOM.render(<Spinner className="font-weight-light spinner-border spinner-border-sm" animation="border" role="status" style={{display:'block',  margin:'4px 0 0 14px' }} id="lblele" /> , document.getElementById("lblele"))
                                                            
                                                            await new Promise(r => setTimeout(r, 1000));

                                                            client.DocumentNumber = cedula;
                                                            client.KeyOrigen = Key.KeyOrigen;
                                                            
                                                            interaccionesService.interacciones({
                                                                step: step.INGRESA_IDENTIFICACION,
                                                                value: client.DocumentNumber,
                                                                KeyOrigen: keyOrigen,
                                                                idCookie: localStorage.getItem('cookie'),
                                                                timeStamp: new Date()
                                                            });

                                                            if(esCedulaValida(cedula))
                                                            {
                                                                client.Valid = true;

                                                                document.getElementById("txtnumber").style.borderColor = colors[6];
                                                            
                                                                ReactDOM.render( <img src ={`${assets}accept.svg`} className="img img-fluid"  style={{display:'block', width:'10px' , margin:'4px 0 0 14px' }} id="lblele"/> , document.getElementById("lblele"))

                                                                device_m.mp_Identification = client.DocumentNumber;
                                                            
                                                                Process(device_m,'/SetDevices?acc=0')

                                                                Trace.Valida_Identificacion = true;
                                                                Trace.N_Identificacion = client.DocumentNumber;
                                                                Process(Trace , 'Log');
                                                            
                                                                ReactDOM.render(
                                                                    <div id="lblmessage">
                                                                        <Form onSubmit={ this.handleSubmit = (e) => 
                                                                            { 
                                                                                e.preventDefault();
                                                                                
                                                                                interaccionesService.interacciones({
                                                                                    step: step.VALIDA_IDENTIFICACION,
                                                                                    value: client.DocumentNumber,
                                                                                    KeyOrigen: keyOrigen,
                                                                                    idCookie: localStorage.getItem('cookie'),
                                                                                    timeStamp: new Date()
                                                                                });
                                                                                next_step();
                                                                            } } >
                                                                            <Row>
                                                                                <Col xs={12} className="text-center">
                                                                                    <p style={{color: 'rgb(0, 0, 100)'}}>¡Perfecto! Tu cédula es correcta</p>
                                                                                </Col>
                                                                                <Col xs={12} className="pt-3 text-center" >
                                                                                    <Button className="font-weight-bold" type="submit" id="paso2" style={Btn_(2,2,3,'100%')} onClick={() => this.setState({clickContinueButton: true})}>Continuar</Button>
                                                                                    <Countdown date={Date.now() + 3000} renderer={this.onRenderer} onComplete={redirect}/>
                                                                                </Col>
                                                                            </Row>
                                                                        </Form>
                                                                    
                                                                    </div>,document.getElementById("lblmessage"));
                                                                        
                                                            }
                                                            else{
                                                                client.Valid = false;

                                                                interaccionesService.interacciones({
                                                                    step: step.IDENTIFICACION_INVALIDA,
                                                                    value: client.DocumentNumber,
                                                                    KeyOrigen: keyOrigen,
                                                                    idCookie: localStorage.getItem('cookie'),
                                                                    timeStamp: new Date()
                                                                });
                                                                    
                                                                document.getElementById("txtnumber").style.borderColor = colors[7]

                                                                ReactDOM.render(<p id="lblmessage"><label style={label_(5,0,'10px')}>No pudimos validar tu cédula, por favor verifica haberla ingresado correctamente y vuelve a intentarlo</label></p>, document.getElementById("lblmessage"))
                                                            } 
                                                            
                                                            ReactDOM.render( <i id="lblele"></i> , document.getElementById("lblele"))

                                                        }
                                                }
                                            }
                                            else{
                                                if(e.target.value.length > 1)
                                                document.getElementById(e.target.id).value = document.getElementById(e.target.id).value.slice(0, - 1);
                                                else
                                                document.getElementById(e.target.id).value = "";
                                            }
                                        }
                                    }/>
                                    <div style={{position:'absolute',left:'calc(100% - 4em)',top:'0.5em' , color: `${colors[2]}`}} >
                                        <i id="lblele"></i>
                                    </div>
                                 </span>                                 

                                 <label className="text-left" style={label_(1,0,'10px')} >Ejemplo: 3456728394</label>

                        </Col>

                        <Col xs={12} className="pt-1 pb-1" >
                            
                            <p id="lblmessage" >
                                <label style={label_(2,0,'10px')}>No te preocupes, tus datos están protegidos!</label>
                                <p style={label_(1,0,'8px')} >Necesitamos tu cédula para consultar bases de datos financieras y obtener tu puntaje crediticio. Si está todo en orden, aprobamos tu solicitud de crédito.</p>
                            </p>
                        </Col>


                    </Row>
                </Container>
            </div>
        )
    }
}