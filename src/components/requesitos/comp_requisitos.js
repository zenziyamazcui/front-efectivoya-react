import React , {Component} from 'react'
import {label_} from '../../styles/leters'
import {Container,Row, Col} from 'react-bootstrap'
import {device} from '../../model/device'
import * as constant from '../../constants'
const assets = process.env.REACT_APP_ASSETS

export class COMP_Requisitos extends Component {

    render(){
        return(
            <>
            <div>
                <Container fluid id="Requisito" className="pt-3 pb-3" >
                    <Row>
                        
                        <Col xs={device.device.type === "desktop" ? 12 : 0 } className="pt-5 text-center">
                            <label className="font-weight-bold" style={label_(3,0,'30px')} >Solo 3 requisitos:</label>
                            <p style={label_(3,0,'17px')} >Y muchas ganas de tener tu efectivo ya!</p>
                        </Col>

                        <Col xs={12} className="pt-3 pb-5" >

                            <Row>

                        {
                            constant.pasosReq.map(x=> 
                                {
                                    return(
                                        <Col xs={device.device.type === "desktop" ? 0 : 12 } className="mt-5 text-center">
                                            <Col xs={12}>
                                                <img src={`${assets}${x.Source}`} className="img img-fluid" style={{height:'45px'}}  />
                                            </Col>
                                            <Col xs={12} className="mt-3">
                                                <span className="mb-0" style={label_(3,0,'17px')} >{x.Header}</span><br/>
                                                <span className="mb-0" style={label_(3,0,'17px')} >{x.Contenido}</span>
                                            </Col>
                                        </Col>
                                    )
                                })
                        }
                            </Row>

                        </Col>


                        


                    </Row>
                </Container>
            </div>
                
            </>
        )
    }
}