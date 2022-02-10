import React , {Component} from 'react'
import {COMP_Hist} from '../../components/historias/historias_comp'
import {label_} from '../../styles/leters'
import {Container,Row, Col, Carousel} from 'react-bootstrap'
import {device} from '../../model/device'
import * as constant from '../../constants'
const assets = process.env.REACT_APP_ASSETS

export class COMP_Pasos extends Component {

    render(){
        return(
            <>
            <div
            style={{
                backgroundImage     : `url(${assets}/bk_2.svg)`,
                backgroundSize: 'contain , cover', 
                backgroundPosition: 'bottom',
                backgroundRepeat: 'no-repeat',
                }}
             >
                {device.device.type === "desktop" 
                ?
                <Container fluid className="pt-3 pb-5" >
                    <Row>
                        
                    <Col xs={12} className="pt-5 pb-5 shadow">
                            <Carousel >

                                <Carousel.Item>
                                    <COMP_Hist 
                                        subject={"Excelente servicio"}
                                        body={`"Depositaron el dinero en mi cuenta súper rápido. Todo funcionó perfecto!"`}
                                        name = {"Janeth Torres"}
                                        date = {"Hace 3 días"}
                                        SRC = {`${assets}janet.svg`}
                                        on = {4}
                                        off ={1}
                                        />
                                </Carousel.Item>

                                <Carousel.Item>
                                    <COMP_Hist 
                                        subject={"¡Pude arreglar mi carro!"}
                                        body={`"Obtuve un préstamo para arreglar mi carro, sin moverme de mi casa."`}
                                        name = {"Jason Fernandez"}
                                        date = {"Hace 3 días"}
                                        SRC = {`${assets}json.svg`}
                                        on = {5}
                                        off ={0}
                                        />
                                </Carousel.Item>

                                <Carousel.Item>
                                    <COMP_Hist 
                                        subject={"¡Súper rápido!"}
                                        body={`"Recibí el dinero en mi cuenta en 24 horas. Gracias!!!"`}
                                        name = {"Heiner Lopez"}
                                        date = {"Hace 3 días"}
                                        SRC = {`${assets}Heiner.svg`}
                                        on = {5}
                                        off ={0}
                                        />
                                </Carousel.Item>

                            </Carousel>
                        </Col>

                        <Col xs={device.device.type === "desktop" ? 12 : 0 } className="pt-5 pb-1 text-center" style={{marginTop: '100px'}}>
                            <label className="font-weight-bold" style={label_(0,0,'45px',null,'136.7%')} >Tu préstamo en 3 pasos:</label>
                            <p className="font-weight-normal" style={label_(0,0,'25px')} >Una vez aprobado sigue los pasos en el chat y listo! </p>
                        </Col>

                        <Col xs={12} className="pt-5 pb-2" >
                            <Row className="pb-5" >
                        {
                            constant.pasosCredito.map(x=> 
                                {
                                    return(
                                            <Col xs={device.device.type === "desktop" ? 0 : 12 } className="pt-2 pb-2 text-center">
                                                <Col xs={12} >
                                                    <img src={`${assets}${x.Source}`} className="img img-fluid" style={{height:'45px'}}  />
                                                </Col>
                                                <Col xs={12} className="pt-2">
                                                    <p className="font-weight-bold" style={label_(1,0,'18px')} >{x.Header}</p>
                                                    <p className="font-weight-normal" style={label_(1,0,'16px')} >
                                                        <label className="col-10">
                                                            {x.Contenido}
                                                        </label>
                                                    </p>
                                                </Col>
                                            </Col>
                                    )
                                })
                        }
                            </Row>
                        </Col>

                    </Row>
                </Container>
                :
                <Container fluid className="pt-5 pb-5" >
                    <Row>

                        <Col xs={12} className="pb-5 shadow" >
                            <Carousel >

                                <Carousel.Item>
                                    <COMP_Hist 
                                        subject={"Excelente servicio"}
                                        body={`"Depositaron el dinero en mi cuenta súper rápido. Todo funcionó perfecto!"`}
                                        name = {"Janeth Torres"}
                                        date = {"Hace 3 días"}
                                        SRC = {`${assets}janet.svg`}
                                        on = {4}
                                        off ={1}
                                        />
                                </Carousel.Item>

                                <Carousel.Item>
                                    <COMP_Hist 
                                        subject={"¡Pude arreglar mi carro!"}
                                        body={`"Obtuve un préstamo para arreglar mi carro, sin moverme de mi casa."`}
                                        name = {"Jason Fernandez"}
                                        date = {"Hace 3 días"}
                                        SRC = {`${assets}json.svg`}
                                        on = {5}
                                        off ={0}
                                        />
                                </Carousel.Item>

                                <Carousel.Item>
                                    <COMP_Hist 
                                        subject={"¡Súper rápido!"}
                                        body={`"Recibí el dinero en mi cuenta en 24 horas. Gracias!!!"`}
                                        name = {"Heiner Lopez"}
                                        date = {"Hace 3 días"}
                                        SRC = {`${assets}Heiner.svg`}
                                        on = {5}
                                        off ={0}
                                        />
                                </Carousel.Item>

                            </Carousel>
                        </Col>

                        <Col xs={device.device.type === "desktop" ? 12 : 0 } className="pt-1 pb-1 text-center" style={{marginTop: '100px'}}>
                            <label className="font-weight-bold" style={label_(0,0,'30px',null,'136.7%')} >Tu préstamo en 3 pasos:</label>
                            <p className="font-weight-normal" style={label_(0,0,'17px')} >Una vez aprobado sigue los pasos en el chat y listo! </p>
                        </Col>

                        <Col xs={12} className="pt-5 pb-2" >
                            <Row className="pb-5" >
                        {
                            constant.pasosCredito.map(x=> 
                                {
                                    return(
                                            <Col xs={device.device.type === "desktop" ? 0 : 12 } className="pt-2 pb-2 text-center">
                                                <Col xs={12} >
                                                    <img src={`${assets}${x.Source}`} className="img img-fluid" style={{height:'45px'}}  />
                                                </Col>
                                                <Col xs={12} className="pt-2">
                                                    <p className="font-weight-bold" style={label_(1,0,'18px')} >{x.Header}</p>
                                                    <p className="font-weight-normal" style={label_(1,0,'16px')} >
                                                        <label className="col-10">
                                                            {x.Contenido}
                                                        </label>
                                                    </p>
                                                </Col>
                                            </Col>
                                    )
                                })
                        }
                            </Row>
                        </Col>

                    </Row>
                </Container>
                }
            </div>
                
            </>
        )
    }
}