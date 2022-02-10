import React ,{ Component } from 'react'
import {colors} from '../../styles/colors'
import {Container,Row,Col} from 'react-bootstrap'
import {label_} from '../../styles/leters'
import logo_asociacion from './../../images/adofintech_logo.png'
import {device} from '../../model/device'
const assets = process.env.REACT_APP_ASSETS
const land = process.env.REACT_APP_LAND

export class COMP_Footer extends Component {
    
    render(){
        var fontSize = device.device.type === "desktop" ? "18px" : "14px";
        var imageWidth = device.device.type === "desktop" ? "35%" : "70%";
        
        return(
            <>
                <Row style={{"margin": "60px 0px"}}>
                    <Col className="text-right">
                        <label style={{"color": "rgb(0, 0, 100)", fontSize: fontSize, fontFamily: "Poppins", marginTop: "9%"}}>Miembros de</label>
                    </Col>
                    <Col>
                        <img src={logo_asociacion} className="img img-fluid" alt="logo" style={{width: imageWidth}}/>
                    </Col>
                </Row>
                <div style={{ backgroundColor:colors[8] }} className="pt-5" >
                    <Container fluid className="pt-5 pb-5" >
                        {device.device.type === "desktop" 
                        ?
                        <>
                            <Row className="pt-5 pb-5" >

                                <Col xs={0} className ="my-auto text-center"  >
                                         <img src={`${assets}efectivoya__.svg`} className="img img-fluid" />
                                </Col>

                                <Col xs={0} >
                                        <Col xs={12} >
                                            <a href="#Requisito">
                                                <label style={label_(0,0,'16px')} className="font-weight-bold" >Ayuda</label>
                                            </a>
                                        </Col>
                                        
                                        <Col xs={12} >
                                            <a href="#Ayuda">
                                                <label style={label_(0,0,'10px')} >Preguntas frecuentes</label>
                                            </a>
                                        </Col>
                                        
                                        <Col xs={12} >
                                            <a href="#Cuota">
                                                <label style={label_(0,0,'10px')} >¿Cómo pago mi cuota?</label>
                                            </a>
                                        </Col>
                                        
                                        <Col xs={12}>
                                            <a href="#Requisito">
                                            <label style={label_(0,0,'10px')} >Requisitos</label>
                                            </a>
                                        </Col>
                                </Col>

                                <Col xs={0} >
                                        <Col xs={12} >
                                            <label style={label_(0,0,'16px')} className="font-weight-bold" >Empresa</label>
                                        </Col>
                                        <Col xs={12} >
                                            <a href="#Quienes">
                                                <label style={label_(0,0,'10px')} >Quiénes somos</label>
                                            </a>
                                        </Col>
                                </Col>

                                <Col xs={device.device.type === "desktop" ? 0 : 6 } >
                                        <Col xs={12} >
                                            <a href="#"> 
                                                <label style={label_(0,0,'16px')} className="font-weight-bold" >Contacto</label>
                                            </a></Col>
                                        <Col xs={12} >
                                            <a href="mailto:info@efectivoya.do">
                                                <label style={label_(0,0,'10px')} >info@efectivoya.do</label>
                                            </a>
                                        </Col>
                                </Col>

                                </Row>

                                <hr className="pt-3" />

                                <Row className="mt-4 text-center" >
                                <Col xs={4}>
                                    <label style={label_(1,0,'14px')}>©️ C.E.D. S.R.L / Todos los derechos reservados</label>
                                </Col>

                                <Col xs={2}> <a href={`${land}Privacidad`}> <u style={label_(0,0,'12px')} >Privacidad</u></a></Col>
                                <Col xs={2}> <a href={`${land}Consentimiento`}> <u style={label_(0,0,'12px')} >Consentimiento Informado</u> </a></Col>
                                <Col xs={2}> <a href={`${land}TYC`}> <u style={label_(0,0,'12px')} >Términos y condiciones</u> </a></Col>

                                <Col xs={2} > 


                                    <a className="p-2" href="https://www.facebook.com/EYDO-107584304945063">
                                        <img src={`${assets}facebook.svg`} className="img img-fluid" style={{width:'1.5em'}} /> 
                                    </a>

                                    <a className="p-2" href="https://www.instagram.com/efectivoya_rd/">
                                    <img src={`${assets}instagram.svg`} className="img img-fluid" style={{width:'1.5em'}} /> 
                                    </a>
                                </Col>
                                </Row>
                        </>
                        :
                        <>
                            <Row>
                                <Col xs={12} className="p-5">
                                    <img src={`${assets}efectivoya_.svg`} className="img img-fluid" />
                                </Col>

                                <Col xs={12} className="pt-3 pb-3 pl-5">
                                    <Row>
                                        <Col xs={12}>
                                            <label style={label_(0,0,'16px')} className="font-weight-bold" >Empresa</label>
                                        </Col>
                                        
                                        <Col xs={12}>
                                            <a href="#Quienes">
                                                <label style={label_(0,0,'10px')} >Quiénes somos</label>
                                            </a>
                                        </Col>

                                    </Row>
                                </Col>

                                <Col xs={12} className="pt-3 pb-3 pl-5">
                                    <Row>
                                        <Col xs={12}>
                                            <label style={label_(0,0,'16px')} className="font-weight-bold" >Ayuda</label>
                                        </Col>
                                        
                                        <Col xs={12} >
                                            <a href="#Ayuda">
                                                <label style={label_(0,0,'10px')} >Preguntas frecuentes</label>
                                            </a>
                                        </Col>
                                        
                                        <Col xs={12} >
                                            <a href="#Cuota">
                                                <label style={label_(0,0,'10px')} >¿Cómo pago mi cuota?</label>
                                            </a>
                                        </Col>
                                        
                                        <Col xs={12}>
                                            <a href="#Requisito">
                                            <label style={label_(0,0,'10px')} >Requisitos</label>
                                            </a>
                                        </Col>

                                    </Row>
                                </Col>

                                <Col xs={12} className="pt-3 pb-3 pl-5">
                                    <Row>
                                        <Col xs={12}>
                                            <label style={label_(0,0,'16px')} className="font-weight-bold" >Contacto</label>
                                        </Col>
                                        
                                        <Col xs={12} >
                                            <a href="mailto:info@efectivoya.do">
                                                <label style={label_(0,0,'10px')} >info@efectivoya.do</label>
                                            </a>
                                        </Col>


                                    </Row>
                                </Col>

                                <Col xs={12} className="pt-5" >
                                    <hr/>
                                </Col>

                                <Col xs={12} className="pt-5 pb-3 pl-4" > 

                                    <a className="p-4" href="https://www.facebook.com/EYDO-107584304945063">
                                        <img src={`${assets}facebook.svg`} className="img img-fluid" style={{width:'30px'}} /> 
                                    </a>

                                    <a className="p-4" href="https://www.instagram.com/efectivoya_rd/">
                                    <img src={`${assets}instagram.svg`} className="img img-fluid" style={{width:'30px'}} /> 
                                    </a>
                                </Col>

                                <Col xs={12} className="pt-4 pl-5"> <a href={`${land}Privacidad`} > <u style={label_(0,0,'12px')} >Privacidad</u></a></Col>
                                <Col xs={12} className="pt-2 pl-5"> <a href={`${land}Consentimiento`}><u style={label_(0,0,'12px')} >Términos y condiciones</u></a></Col>
                                <Col xs={12} className="pt-2 pl-5"> <a href={`${land}TYC`}> <u style={label_(0,0,'12px')} >Consentimiento Informado</u></a></Col>

                                <Col xs={12}  className="pt-4 pl-5" >
                                    <label style={label_(1,0,'12px')}>©️ C.E.D. S.R.L / Todos los derechos reservados</label>
                                </Col>


                            </Row>
                        </>
                        }
                        
                    </Container>
                </div>
            </>
        )
    }
}