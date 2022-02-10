import React , {Component} from 'react'
import {Accordion,Card,Button,Container,Navbar,Row,Col} from 'react-bootstrap'
import {label_} from '../../styles/leters'
import {Btn_} from '../../styles/bottom'
import '../../css/preguntas.css'

const assets = process.env.REACT_APP_ASSETS
const land = process.env.REACT_APP_LAND
import * as constant from '../../constants'

export class COMP_Consultas extends Component{

    constructor(props)
    {
        super(props)
        this.state = { 
            element : constant.preguntasFrecuentes , 
            col : 0 
        }
    }

    render(){
        return(
            <>
                <div
                    style={{
                        backgroundImage     : `url(${assets}/bk_3.svg)`,
                        backgroundSize: 'cover', 
                        backgroundPosition: 'top , rigth',
                        backgroundRepeat: 'no-repeat',
                        }}>
                    <Container id="Ayuda" className="pt-5 pb-5 pl-3 pr-3" >

                        <Row className="pb-5 mt-3" >
                            <Col xs={12} className="pt-5 text-center">
                                <label className="font-weight-bold" style={label_(0,0,'30px')} >Todo lo que necesitas saber:</label>
                            </Col>

                            <Col xs={12} className="pt-3" >

                            <Accordion>
                                {
                                    this.state.element.map( x=> {

                                        return <Card.Text 
                                            className="border border-top-0 border-right-0 border-left-0"  >
                                                    <Accordion.Toggle 
                                                        onClick ={this.h = (e) => 
                                                            { 
                                                                this.state.col === x.Id
                                                                    ? this.setState({ col : 0 })
                                                                    : this.setState({ col : x.Id })  
                                                            } }
                                                        as={Card.Header} 
                                                        eventKey={x.Id} style={{backgroundColor:'transparent'}} >
                                                        
                                                        <Row className="mx-auto mt-2 mb-2 h-100 "  >
                                                            <Col xs={10} > <label style={label_(9,0,'16px')} >{x.Header}</label> </Col>
                                                                <img src={`${assets}next.svg`} id={x.Id} className={`img img-fluid text-right mt-3 h-100 m-auto ${ x.Id === this.state.col ? 'isRotated' : 'usRotated' } `} />
                                                        </Row>
                                                        
                                                    </Accordion.Toggle>
                                                    
                                                    <Accordion.Collapse eventKey={x.Id} >
                                                        <Card.Body className="mb-0 border-0 transp" >
                                                            <p style={label_(2,0,'14px')} >{x.Contenido}</p>
                                                        </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card.Text>
                                        
                                    })
                                }
        
                            </Accordion>
        

                            </Col>

                            <Col xs={12} className="mt-5 mb-5 text-center" >
                                <a href={`${land}Preguntas`} >
                                    <Button className="p-3 bg-white shadow font-weight-bold" style={Btn_(3,3,2,'275px')} type="submit" >Más preguntas frecuentes</Button>
                                </a>
                            </Col>

                        </Row>
                    </Container>

                </div>
            </>
        )
    }
}