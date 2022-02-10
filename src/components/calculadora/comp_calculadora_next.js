import React , {Component} from 'react'
import {Container ,Row , Col , Button , Form} from 'react-bootstrap'
import '../../css/Btt.css'
const assets = process.env.REACT_APP_ASSETS
export class COMP_Calculadora_Next extends Component {
    
    
    render(){
        return(
            <div className="pt-5 pb-5 "
                style={{
                backgroundImage     : `url(${assets}element_bks/bk.svg)`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                }}
            >
                <Container fluid >
                    
                    <Row className="h-100">
                        <Col xs={12} className="text-rigth" >
                            <img  src={`${assets}ico.svg`}/>
                        </Col>

                        <Col xs={12}>
                            
                        </Col>

                    </Row>

                </Container>

            </div>
        )
    }

}