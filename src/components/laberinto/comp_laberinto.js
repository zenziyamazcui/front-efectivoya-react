import React , { Component } from 'react'
import { Container ,Row , Col } from 'react-bootstrap'
import {COMPIdentification} from '../../components/Identification/comp_identification'
import {Box_} from '../../styles/Box'
import {device} from '../../model/device'
import {label_} from '../../styles/leters'
import * as contants from './../../constants'
const assets = process.env.REACT_APP_ASSETS

export  class COMP_Laberinto extends Component {

    constructor(props){
        super(props)
        this.state = {
            h : contants.header2,
            element : contants.pasosReq
        }
    }

    render(){
        return(
            <div
            style={{
                background: `url(${assets}bk.svg) `,
                backgroundSize: 'cover', 
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                width:  '100%',
                height:  device.device.type === "desktop" ? '100vh' : '100%'
            }}>
                <Container fluid className="h-100">
                    <Row className="my-auto d-flex justify-content-center" >

                        <Col xs={12} className="p-4 w-100" >
                            <Row>
                                <Col xs={6} className="text-left" >
                                    {this.state.h.map(x => {
                                        return(<img src={`${assets}${x.Contenido}`} style={{width:'195px'}} />)
                                    })}
                                </Col>
                                
                                <Col xs={6} className="text-right">
                                    <a href="./">
                                        <img src={`${assets}close.svg`} className="img img-fluid"  id="xclos" />
                                    </a>
                                </Col>
                            </Row>
                        </Col>

                        {
                        device.device.type === "desktop"
                        ?
                         <>
                            <Col xs={5} className="pt-3 my-auto " >
                                <Row className="d-flex justify-content-center" >
                                        <Col xs={12} className="p-2 pb-5 text-center" >
                                            <label style={label_(3,0,'25px')} >Recuerda los 3 requisitos:</label>
                                        </Col>
                                    {this.state.element.map (x => {
                                        return(
                                            <Col xs={10}>
                                                <Row className="p-2" >
                                                    <Col className="h-100">
                                                        <Row >
                                                            
                                                            <Col xs={2} className="my-auto text-center " > 
                                                                <img src={`${assets}${x.Source}`} className="img img-fluid" style={{height:'45px'}} />
                                                            </Col>
                                                            
                                                            <Col style={label_(3,0,'18px')} >
                                                                <label className="font-weight-light" >
                                                                    {x.Header} <br/> {x.Contenido}
                                                                </label>
                                                            </Col>

                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Col>

                            <Col xs={5} >
                                <div style={Box_(3, null , '332px' )} >
                                    <div id="e">
                                        <COMPIdentification/>
                                    </div>
                                </div>
                            </Col>
                         </>
                        : 
                        <>
                            <Col xs={12}>
                                <div style={Box_(3 )} id="e" >
                                    <COMPIdentification/>
                                </div>
                            </Col>

                            <Col xs={12} className="pt-3" >
                                <Row>
                                        <Col xs={12} className="p-2 text-center" >
                                            <label style={label_(3,0,'16px')} >Recuerda los 3 requisitos:</label>
                                        </Col>
                                    {this.state.element.map (x => {
                                        return(
                                            <Col xs={12}>
                                                <Row className="p-2" >
                                                    <Col className="ml-auto h-100">
                                                        <Row >
                                                            <Col xs={2} className="mx-auto d-flex align-items-center justify-content-center" > 
                                                            
                                                                <img src={`${assets}${x.Source}`} className="img img-fluid" style={{width:'18px'}} /></Col>
                                                            <Col style={label_(3,0,'14px')} >
                                                                <label className="font-weight-light" >
                                                                    {x.Header}{x.Contenido}
                                                                </label>
                                                                </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </Col>
                        </>
                        }


                        <Col xs={12} className= {`text-center p-3 ${device.device.type === "desktop" ? "fixed-bottom" : "" }`}  >
                            <label className="" style={label_(3,0,'12px')} >©️ C.E.D. S.R.L / Todos los derechos reservados</label>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}