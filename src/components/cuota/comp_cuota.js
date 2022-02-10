import React , { Component } from 'react'
import { label_ } from '../../styles/leters'
import { Container , Row , Col } from 'react-bootstrap'
import {device} from '../../model/device'
const assets = process.env.REACT_APP_ASSETS

export class COMP_Cuotas extends Component{

    render(){
        return(
            <div 
            style={{
                backgroundImage     : `url(${assets}/bk_4.svg)`,
                backgroundSize: 'auto', 
                backgroundPosition: '',
                backgroundRepeat: 'no-repeat',
                marginTop: '-13px'
                }}
            >
                <Container fluid id="Cuota" className="" >

                    <Row className="pt-3 pb-3" >
                        
                        <Col xs={12} className="pt-5 pb-5 text-center" >
                            <label className="font-weight-bold" style={label_(0,0,'30px')} >¿Cómo puedo pagar mi cuota?</label>
                        </Col>

                        <Col xs={12}>
                
                            <Row className="justify-content-md-center " >

                                    <Col xs={device.device.type === "desktop" ? 4 : 12 } className="p-3 pl-3" >
                                        <Col xs={12} className="">
                                            <Col xs={12}> <label className="font-weight-bold" style={label_(2,0,'20px')} >Depósito en estafeta</label> </Col>
                                            <Col xs={12} > <label style={label_(0,0,'14px')} >Dirígete a cualquier sucursal del BanReservas y haz tu pago por ventanilla. Recuerda que para confirmar tu pago debes incluir siempre como referencia tu número de cédula.</label> </Col>
                                            <Col xs={12}> <label style={label_(0,0,'18px')} >BanReservas</label> </Col>
                                            <Col xs={12}>
                                                <Row>
                                                    <Col xs={12} > <label style={label_(0,0,'14px')}> <strong>Número de Cuenta:</strong> 9603059624</label> </Col>
                                                    <Col xs={12} > <label style={label_(0,0,'14px')}> <strong>Titular de la cuenta:</strong> C.E.D. S.R.L.:</label></Col>
                                                    <Col xs={12} > <label className="mt-0" style={label_(0,0,'14px')}> BANCO DE RESERVAS, R.N.C. <br/> 1-3213877-5, cuenta corriente en RD$.</label>  </Col>
                                                    <Col xs={12} > <label style={label_(0,0,'14px')}> <strong>Referencia:</strong> Es imprescindible para confirmar tu pago que incluyas como referencia tu número de cédula.</label> </Col>
                                                </Row>
                                            </Col>
                                        </Col>
                                    </Col>

                                    <Col xs={device.device.type === "desktop" ? 4 : 12 } className="p-3 pl-3" >
                                        <Col xs={12} className="">
                                            <Col xs={12} className="" > <label  className="font-weight-bold"  style={label_(2,0,'20px')} >Transferencia</label> </Col>
                                            <Col xs={12} className="" > <label style={label_(0,0,'14px')} >Haz una transferencia bancaria normal desde tu banco o a través de su servicio de banca digital. Recuerda que es imprescindible que incluyas como referencia de pago tu número de cédula.</label> </Col>

                                            <Col xs={12} className="" > <label style={label_(0,0,'18px')} >Banco Popular Dominicano:</label> </Col>
                                            <Col xs={12}>
                                                <Row>
                                                    <Col xs={12} > <label style={label_(0,0,'14px')}> <strong>Titular de la Cuenta:</strong> C.E.D. S.RL., R.N.C. 1-3213877-5, Cuenta Corriente en RD$.</label> </Col>
                                                    <Col xs={12} > <label style={label_(0,0,'14px')}> <strong>Número de cuenta:</strong> 819252255</label> </Col>
                                                    <Col xs={12} > <label style={label_(0,0,'14px')}> <strong>Referencia:</strong> Es imprescindible para confirmar tu pago que incluyas como referencia tu número de cédula.</label></Col>
                                                </Row>
                                            </Col>
                                        </Col>
                                    </Col>

                            </Row>

                        </Col>

                </Row>

                </Container>
            </div>
        )
    }
}