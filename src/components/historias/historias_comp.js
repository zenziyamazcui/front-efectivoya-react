import React , {Component} from 'react'
import {Container,Carousel , Row , Col} from 'react-bootstrap'
import {label_} from '../../styles/leters'
import {device} from '../../model/device'
import * as constant from '../../constants'
const assets = process.env.REACT_APP_ASSETS

class COMP_start extends Component {

    
    constructor(props){
        super(props)
        this.state ={
            on :  [],
            off : []
        }
    }

    componentDidMount(){

        let a1 = [], b1 = [] 

        for(var a = 1; a <= this.props.on ; a++)
            a1.push(a);
        
        for(var b = 1; b <= this.props.off ; b++)
            b1.push(b);


        this.setState({on:a1});
        this.setState({off:b1});

    }

    render(){
        return (
            <>
            

                {this.state.on.map(x=> {
                    return(
                        <img src={`${assets}start_check.svg`} className="img img-fluid" style={{margin:'0.3em'}} />
                    )
                })}

                {this.state.off.map(x=> {
                    return(
                        <img src={`${assets}start.svg`} className="img img-fluid" style={{margin:'0.3em'}} />
                    )
                })}
            </>
        )
            
    }
}


export class COMP_Hist extends Component{
    constructor(props){
        super(props)   
    }



    render(){
        return(
            <>
                {
                    device.device.type === "desktop"
                    ?
                    <Row className="justify-content-md-center">
                        <Col xs lg="4">
                            <label >
                                <COMP_start on = {this.props.on}  off={this.props.off} /> 
                            </label>
                            <br />
                            <label style={label_(9,0,'20px')}>{this.props.body}</label><br/>
                        </Col>

                        <Col md="auto">
                            <img src={this.props.SRC} className="img img-fluid"  style={{height:'100px'}} />
                        </Col>

                        <Col xs lg="2">
                            <label className="pt-4" style={label_(2,0,'20px')}>{this.props.name}</label><br/>
                            <p style={{marginTop:'-15px'}}>  <label style={label_(1,0,'12px')}>{this.props.date}</label></p>
                        </Col>
                    </Row>
                    
                    :
                    <Row>
                        <Col xs={12} className="mt-5" >
                            <Row className="mb-4">
                                <Col xs={4} > <img src={this.props.SRC} className="img img-fluid" style={{height:'79,62px', width: '119px'}} /> </Col>
                                <Col className="my-auto" >
                                    <COMP_start on = {this.props.on}  off={this.props.off} />
                                </Col>
                            </Row>

                        </Col>

                        <Col xs={12}>
                            <label style={label_(9,0,'16px')}>{this.props.body}</label><br/>
                            <label className="pt-1" style={label_(2,0,'15px')}>{this.props.name}</label><br/>
                            <p style={{marginTop:'-15px'}}>  <label style={label_(1,0,'10px')}>{this.props.date}</label></p>
                        </Col>
                    </Row>
                    }
                    
            </>
        )
    }
}


export class COMP_historia extends Component {


    render(){
        return(
            <>
                <Container fluid >
                    <Row>

                        <Col xs={device.device.type === "desktop" ? 12 : 12 } >
                            <Row>
                                <div
                                    style={{
                                        backgroundImage     : `url(${assets}bgk3.svg)`,
                                        backgroundSize: 'cover', 
                                        backgroundPosition: 'center center',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                >

                                    
                                    <Col xs={12} className="p-5 text-center" id="Quienes" >
                                        <label className="font-weight-bold" style={label_(3,0,'30px')} >Quienes somos</label>
                                    </Col>

                                    <Col xs={12} className="pt-3 pb-3" >
                                        <div className="pb-5" >
                                            {constant.quienesSomos.map( x=> {
                                                return(
                                                        <Row className="pt-3 pb-3 justify-content-md-center">                                        
                                                                <Col xs={device.device.type === "desktop" ? 1 : 12} className="pb-3 my-auto text-center" >
                                                                    <img src={`${assets}${x.Source}`} className="img img-fluid " style={{height:'40px'}} />
                                                                </Col>

                                                                <Col  xs={device.device.type === "desktop" ? 8 : 12} className="my-auto " >
                                                                    <p style={label_(3,0,'13px')} >{x.Contenido}</p>
                                                                </Col>
                                                                
                                                        </Row>
                                                )
                                            })}
                                        </div>
                                    </Col>

                                </div>

                            </Row>
                        </Col>

                    </Row>
                </Container>            
            </>
        )
    }
}
