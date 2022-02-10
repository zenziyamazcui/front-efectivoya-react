import React , {Component} from 'react'
import ReactDOM from 'react-dom'
import { Process} from '../../services/process'
import {product} from '../../model/product'
import {device} from '../../model/device'
import {Key} from '../../model/Key'
import {Container ,Row , Col , Button , Form} from 'react-bootstrap'
import {Slider} from '@material-ui/core'
import {Box_} from '../../styles/Box'
import {label_} from '../../styles/leters'
import {Btn_} from '../../styles/bottom'
import {Calcular_Cuota} from '../../services/cuotas'
import {colors} from '../../styles/colors'
import { withStyles } from '@material-ui/core/styles';
import {next_step} from '../../services/onboring'
import {COMP_Laberinto} from '../../components/laberinto/comp_laberinto'
import '../../css/Btt.css'
import { Trace } from '../../model/trace'
import { Utms } from '../../model/Utms'
import interaccionesService from '../../services/interacciones';
import { cookieValidator } from '../../helpers/cookieValidator'
import { keyOrigen } from '../../constants'
import { step } from '../../constants'
import { getUrl } from '../../helpers/getUrl'
import COMP_Login  from '../login/comp_login'

let BtnFrn = [];

function chagueFrecuencia(e)
{
    try
    {
        e.preventDefault();


        BtnFrn.forEach( x => {
          if(x == e.target.innerText)            
                document.getElementById(x).className = "m-1 Calc-Active"
          else    
                document.getElementById(x).className = "m-1 Calc-Desac"
            });

            Calcular_Cuota();

    
    }
    catch
    {
        //render_error()

    }

}



export class COMPCalculadoras extends Component {

  /* Variables Calculadora  */
  MontosFinales = React.createRef()
  FrecuenciasFinales = React.createRef()
  QCuotaFinales = React.createRef()
  MesesFinales = React.createRef()
  Moneda = React.createRef()
  MesSeleccionado = React.createRef()
  Usuario = null;
  //MontarComponente=React.componentWillMount()

  JsonServerData = []

  /* Valores Calculadora */

  state = { Data : []  }  // Utilizado para extraer datos para la calculadora}


  /* Se trata el objeto para mantener todas las combinaciones  */
  TratamientoComponentes(MontosDb = Object , Content=Boolean , Display = String ){
      
    let MontosDescompuestos = []
    MontosDb.map( element => 
    {
        for( var i = element.Minimo ; i <= element.Maximo ; i = i+element.Steps )
        {
          MontosDescompuestos.push(i)
        }
    })

    
    /* se ordena los valores*/
    MontosDescompuestos.sort( (a,b) => {return(a-b)} )
    MontosDescompuestos =   Array.from(new Set(MontosDescompuestos)) 
    let masks = new Object
    let Valores = []


    MontosDescompuestos.map( function(x,index)
            {  
                Valores.push( masks={ value: x, label : null } )
   })
   
  
   
    return Valores
}


async Crear_Slider_Montos_Render(objeto){



  product.Monto = objeto.length >0 ? objeto[0]["value"] : 0;

    const Zenziya = withStyles({
      root: {
        color: colors[1],
        height: 8,
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: colors[2],
        border: '2px solid currentColor',
        marginTop: -8,
        color:'white',
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
          boxShadow: 'inherit',
        },
      },
      active: {
      },
      track: {
        height: 8,
        borderRadius: 4,
        backgroundColor : colors[2],
      },
      rail: {
        height: 8,
        borderRadius: 4,
      },
  
      valueLabel: {
          left: 'calc(-100% + 12px)',
          top : 'calc(-70%)', 
          width :'10em',
          borderRadius:4,  
          background:'transparent',  
          '& *': {
                      background: 'transparent',
                      width : '10em',
                      color: colors[4],
          }
        }
  
    })(Slider)


    const element = <Zenziya 
          step={null}
          valueLabelDisplay   ="on"
          valueLabelFormat    = {this.valuetext = (value) => { return `RD$${product.Monto}`  }}
          min={objeto[0] ? objeto[0]["value"] : 0}
          max={objeto[objeto.length-1] ? objeto[objeto.length-1]["value"] : 0}
          marks={objeto} 
          onChange={  this.Hadlechage= (event,value) =>  {

            /* se asigna valor a la propiedad */    
            product.Monto = value

            /* se vuelve a renderizar los meses */
            
            /* Logica por cambio efectuado  */
            if(product.Monto > 0){
              
                // ------------------------  INICIO DE RENDERIZADO NUEVO POR FILTRO -----------------------------------
                // ------------------------  INICIO DE RENDERIZADO NUEVO POR FILTRO -----------------------------------
              let Obj = new Object , ResultadoQ = [] , ResultadoF = [] , ResultadoM = []


              this.JsonServerData.map (x => {
                if( x.FCO_FrecuenciaQ == product.Frecuencia )
                {

                  ResultadoQ.push( Obj = {
                    Maximo : x.FCO_QcuotasMax,
                    Minimo : x.FCO_QcuotasMin,
                    Steps  : x.FCO_QcuotasStep,
                    Resultado : x.FCO_QcuotasMax/x.FCO_QcuotasStep })

                    ResultadoM.push(Obj = {
                      Maximo : x.FCO_Mes_Max,
                      Minimo : x.FCO_Mes_Min,
                      Steps : x.FCO_Mes_Step,
                      Resultado : x.FCO_Mes_Max/x.FCO_Mes_Step})

                }

              })

              
                  // this.Crear_Slider_Meses(this.TratamientoComponentes(ResultadoQ,false,"Meses"));
                  this.Crear_Slider_Frecuencias(this.TratamientoComponentes(ResultadoF,true,null));
                  Calcular_Cuota();
                // ------------------------  FIN DE RENDERIZADO NUEVO POR FILTRO -----------------------------------              
              }

            
            }  }
            />;
    ReactDOM.render(element,document.getElementById('SliderMonto'))
  }    






async Crear_Slider_Montos(objeto){

  product.Monto = objeto[0]["value"];



    const Zenziya = withStyles({
      root: {
        color: colors[1],
        height: 8,
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: colors[2],
        border: '2px solid currentColor',
        marginTop: -8,
        color:'white',
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
          boxShadow: 'inherit',
        },
      },
      active: {
      },
      track: {
        height: 8,
        borderRadius: 4,
        backgroundColor : colors[2],
      },
      rail: {
        height: 8,
        borderRadius: 4,
      },
  
      valueLabel: {
          left: 'calc(-100% + 12px)',
          top : 'calc(-70%)', 
          width :'10em',
          borderRadius:4,  
          background:'transparent',  
          '& *': {
                      background: 'transparent',
                      width : '10em',
                      color: colors[4],
          }
        }
  
    })(Slider)


    const element = <Zenziya 
          step={null}
          valueLabelDisplay   ="on"
          valueLabelFormat    = {this.valuetext = (value) => { return `RD$${product.Monto}`  }}
          min={objeto[0] ? objeto[0]["value"] : 0}
          max={objeto[objeto.length-1] ? objeto[objeto.length-1]["value"] : 0}
          marks={objeto}  
          onChange={  this.Hadlechage= (event,value) =>  {
            /* se asigna valor a la propiedad */    
            product.Monto = value


            /* Logica por cambio efectuado  */
            if(product.Monto > 0){

                            
              // ------------------------  INICIO DE RENDERIZADO NUEVO POR FILTRO -----------------------------------
              let Obj = new Object , ResultadoQ = [] , ResultadoF = [] , ResultadoM = []

              
              this.JsonServerData.map (x => {
                if( x.FCO_FrecuenciaQ == product.Frecuencia )
                {

                  ResultadoQ.push( Obj = {
                    Maximo : x.FCO_QcuotasMax,
                    Minimo : x.FCO_QcuotasMin,
                    Steps  : x.FCO_QcuotasStep,
                    Resultado : x.FCO_QcuotasMax/x.FCO_QcuotasStep })

                    ResultadoM.push(Obj = {
                      Maximo : x.FCO_Mes_Max,
                      Minimo : x.FCO_Mes_Min,
                      Steps : x.FCO_Mes_Step,
                      Resultado : x.FCO_Mes_Max/x.FCO_Mes_Step})

                }

              })


                  this.Crear_Slider_Meses(this.TratamientoComponentes(ResultadoQ,false,"Meses"));
                  this.Crear_Slider_Frecuencias(this.TratamientoComponentes(ResultadoF,true,null));
                  Calcular_Cuota();
                
              
              // ------------------------  FIN DE RENDERIZADO NUEVO POR FILTRO -----------------------------------              
            }
          }  }
           />;
    ReactDOM.render(element,document.getElementById('SliderMonto'))
  }




// ==> cambiar a botones  
async Crear_Slider_Frecuencias(objeto){

  product.Frecuencia = objeto[0]["value"];


    const Zenziya = withStyles({
      root: {
        color: colors[1],
        height: 8,
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: colors[2],
        border: '2px solid currentColor',
        marginTop: -8,
        color:'white',
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
          boxShadow: 'inherit',
        },
      },
      active: {
      },
      track: {
        height: 8,
        borderRadius: 4,
        backgroundColor : colors[2],
      },
      rail: {
        height: 8,
        borderRadius: 4,
      },
      valueLabel: {
          left: 'calc(-100% + 5px)',
          top : 'calc(-50% + 35px)', 
          width :'10em',
          borderRadius:4,  
          background:'transparent',  
          '& *': {
                      background: 'transparent',
                      width : '10em',
                      color: colors[4],
          }
        }
  
    })(Slider)

    const element = <Zenziya 
          step={null}
          aria-labelledby="discrete-slider-custom"
          defaultValue = { objeto[0] ? objeto[0]["value"] : 0 }
          min={objeto[0] ? objeto[0]["value"] : 0}
          max={objeto[objeto.length-1] ? objeto[objeto.length-1]["value"] : 0}
          marks={objeto} 
          onChange={  this.Hadlechage= (event,value) =>  {
            product.Frecuencia = value
            /*
            Validacion por frecuencia
            */
           let Obj = new Object , ResultadoQ = [] , ResultadoMonto = [] , ResultadoMeses =[]
              this.JsonServerData.map(x=>{
                  if(x.FCO_FrecuenciaQ == product.Frecuencia){
                    
                    ResultadoQ.push( Obj = {
                        Maximo : x.FCO_QcuotasMax,
                        Minimo : x.FCO_QcuotasMin,
                        Steps  : x.FCO_QcuotasStep,
                        Resultado : x.FCO_QcuotasMax/x.FCO_QcuotasStep
                       } )

                    ResultadoMonto.push(Obj = {
                        Maximo : x.FCO_ValorMax,
                        Minimo : x.FCO_ValorMin,
                        Steps : x.FCO_ValorStep,
                        Resultado : x.FCO_ValorMax/x.FCO_ValorStep
                    })

                    ResultadoMeses.push(Obj = {
                        Maximo : x.FCO_Mes_Max,
                        Minimo : x.FCO_Mes_Min,
                        Steps : x.FCO_Mes_Step,
                        Resultado : x.FCO_Mes_Max/x.FCO_Mes_Step
                    })

                    this.Crear_Slider_Montos_Render(this.TratamientoComponentes(ResultadoMonto,false,this.Moneda))
                    this.Crear_Slider_Meses(this.TratamientoComponentes(ResultadoMeses,false,"Meses"))

    
                  }


                  Calcular_Cuota();
                  
              })
            
            Calcular_Cuota()
          }  }
          valueLabelDisplay="auto"  />;
   
   ReactDOM.render(
    <Row className="d-flex justify-content-center">
    {
      objeto.map(x=>{

         BtnFrn.push(x.value == '1' ? 'Mensual' : 'Quincenal');
        return(
          <Form onSubmit={chagueFrecuencia} >
              <Button
                  type ="submit"
                  id = {x.value == '1' ? 'Mensual' : 'Quincenal' }
                  onClick = {   this.Hadlechage= (event) =>  {
                    product.Frecuencia = event.target.id == 'Mensual' ? 1 : 15;
                    /*
                    Validacion por frecuencia
                    */
                   let Obj = new Object , ResultadoQ = [] , ResultadoMonto = [] , ResultadoMeses =[]
                      this.JsonServerData.map(x=>{
                          if(x.FCO_FrecuenciaQ == event.target.id == 'Mensual' ? 1 : 15 ){
                            
                            ResultadoQ.push( Obj = {
                                Maximo : x.FCO_QcuotasMax,
                                Minimo : x.FCO_QcuotasMin,
                                Steps  : x.FCO_QcuotasStep,
                                Resultado : x.FCO_QcuotasMax/x.FCO_QcuotasStep
                               } )
    
                            ResultadoMonto.push(Obj = {
                                Maximo : x.FCO_ValorMax,
                                Minimo : x.FCO_ValorMin,
                                Steps : x.FCO_ValorStep,
                                Resultado : x.FCO_ValorMax/x.FCO_ValorStep
                            })
    
                            ResultadoMeses.push(Obj = {
                                Maximo : x.FCO_Mes_Max,
                                Minimo : x.FCO_Mes_Min,
                                Steps : x.FCO_Mes_Step,
                                Resultado : x.FCO_Mes_Max/x.FCO_Mes_Step
                            })
                          }
    
                          this.Crear_Slider_Montos_Render(this.TratamientoComponentes(ResultadoMonto,false,this.Moneda))
                          this.Crear_Slider_Meses(this.TratamientoComponentes(ResultadoMeses,false,"Meses"))
                          Calcular_Cuota();
                          
                      })
                    
                    Calcular_Cuota()
                  }  }
                  className = {
                    objeto.indexOf(x) == 0 
                     ? "Calc-Active m-1"
                     : "Calc-Desac m-1"
                  }
                >{x.value == '1' ? 'Mensual' : 'Quincenal' }</Button>
          </Form>
        )
      })
    }
    </Row>, document.getElementById('SliderFrecuencias'))
  }






async Crear_Slider_Meses(objeto){



  switch(product.Frecuencia)
  {
    case 1:
          product.Numero_Cuotas = 1 * objeto[0]["value"];
         break;
    case 7:
          product.Numero_Cuotas = 4 * objeto[0]["value"];
         break;
    case 15:
          product.Numero_Cuotas = 2 * objeto[0]["value"];
         break;
        }

 
    const Zenziya = withStyles({
      root: {
        color: colors[1],
        height: 8,
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: colors[2],
        border: '2px solid currentColor',
        marginTop: -8,
        color:'white',
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
          boxShadow: 'inherit',
        },
      },
      active: {
      },
      track: {
        height: 8,
        borderRadius: 4,
        backgroundColor : colors[2],
      },
      rail: {
        height: 8,
        borderRadius: 4,
      },
      valueLabel: {
        left: 'calc(-100% + 12px)',
        top : 'calc(-70%)',  
        width :'10em',
        borderRadius:4,  
        background:'transparent',  
        '& *': {
                    background: 'transparent',
                    width : '10em',
                    color: colors[4],
        }
      }
  
    })(Slider)


    const element = <Zenziya 

    step                = {null}
    valueLabelFormat    = {this.valuetext = (value) => { return `${ isNaN(value) ? objeto[0]["value"] : value  } Meses `   }}
    valueLabelDisplay   = "on"
    min                 = {objeto[0]["value"]}
    max                 = {objeto[objeto.length-1]["value"]}
    marks={objeto} 
    onChange={  this.Hadlechage= (event,value) =>  {

      this.MesSeleccionado = value
            
            switch(product.Frecuencia){
                case 1:
                     product.Numero_Cuotas = 1 * value;
                     break;
                case 7:
                     product.Numero_Cuotas = 4 * value;
                     break;
                case 15:
                     product.Numero_Cuotas = 2 * value;
                     break;
            }
            

            Calcular_Cuota()
          }  }  />;
    ReactDOM.render(element,document.getElementById('SliderMeses'))
  }



  async Inicializador() {
    this.Crear_Slider_Montos(this.MontosFinales)
    this.Crear_Slider_Frecuencias(this.FrecuenciasFinales)
    this.Crear_Slider_Meses(this.MesesFinales)
    Calcular_Cuota();
    await Process(Trace , 'Log').then( x=> Trace.Id_Solicitud = x.Id_Solicitud , Trace.Accion = 2 );
}




async componentDidMount(){

    let MontosDb = [] , FrecuenciasDb = [] ,  CuotasDb = [] , MesDb = []
    var Obj = new Object

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString)
    params.forEach((value, key) => {
        if (Utms[key] === '') {
          return Utms[key] = value;
        }
        Utms.AditionalParams[key] = value;
      }
    )
    Utms.AditionalParams = JSON.stringify(Utms.AditionalParams);
    const urlVisita = await getUrl();
    const handleInteraccion = async () => {
      await cookieValidator();
      interaccionesService.interacciones({
          step: step.VISITA,
          value: urlVisita,
          KeyOrigen: keyOrigen,
          idCookie: localStorage.getItem('cookie'),
          utm_source: Utms.utm_source,
          utm_medium: Utms.utm_medium,
          utm_campaign: Utms.utm_campaign,
          utm_content: Utms.utm_content,
          utm_term: Utms.utm_term,
          AditionalParams: Utms.AditionalParams,
          timeStamp: new Date()
      })
    }
    handleInteraccion();
    Trace.IdCookie = localStorage.getItem('cookie');

    Process( Key , 'Calculadora/Datos').then( 
      result => {

        this.setState({Data: result})

        this.state.Data.map( x => {

              this.JsonServerData.push(x)
              
              /* Utilizado para Montos  */
              MontosDb.push( Obj = {
                  Maximo    : x.FCO_ValorMax, 
                  Minimo    : x.FCO_ValorMin,
                  Steps     : x.FCO_ValorStep,
                  Resultado : x.FCO_ValorMax/x.FCO_ValorStep,
                  Display   : x.FCO_Moneda
              })
  
              /* Utilizado para Frecuencias */
              FrecuenciasDb.push( Obj = {
                  Maximo : x.FCO_FrecuenciaQ,
                  Minimo : x.FCO_FrecuenciaQ,
                  Steps  : x.FCO_FrecuenciaQ
              })
              
              /* Utilizado para la cantidad de cuotas*/
              CuotasDb.push( Obj = {
                  Maximo : x.FCO_QcuotasMax,
                  Minimo : x.FCO_QcuotasMin,
                  Steps  : x.FCO_QcuotasStep,
                  Resultado : x.FCO_QcuotasMax/x.FCO_QcuotasStep
              })

              /* Utilizado para la cantidad de cuotas*/
              MesDb.push( Obj = {
                  Maximo : x.FCO_Mes_Max,
                  Minimo : x.FCO_Mes_Min,
                  Steps  : x.FCO_Mes_Step,
                  Resultado : x.FCO_Mes_Max/x.FCO_Mes_Step
              })
  
      })

        /* se renderiza  */
        this.Moneda =  this.JsonServerData[0]["FCO_Moneda"];
        this.MontosFinales =  this.TratamientoComponentes(MontosDb,false,this.Moneda);
        this.FrecuenciasFinales = this.TratamientoComponentes(FrecuenciasDb,true,null);
        this.QCuotaFinales = this.TratamientoComponentes(CuotasDb,false,"Meses");
        this.MesesFinales = this.TratamientoComponentes(MesDb,false,"Meses")
        this.Inicializador();


      }
    )

  }

    
    
    render(){

        return(
            <>
                <div style={Box_(3, '445px' , '332px' )} className="p-3 mb-2 shadow-sm">
                  <div id="e">
                      <Form onSubmit={ this.handleSubmit = (e) => 
                { 
                  e.preventDefault();
                  if (!this.Usuario) {
                    // { ReactDOM.render(<COMP_Login />, document.getElementById("master")) }
                    // product.Monto = 0;
                  } 

                           
                            if(product.Monto >= 1)
                              { ReactDOM.render( <COMP_Laberinto/> , document.getElementById("master"))
                                interaccionesService.interacciones({
                                  step: step.OFERTA,
                                  value: `Frecuencia: ${product.Frecuencia == '1' ? 'Mensual' : 'Quincenal'}, Monto: ${product.Monto}, Cuotas: ${product.Numero_Cuotas}`,
                                  KeyOrigen: keyOrigen,
                                  idCookie: localStorage.getItem('cookie'),
                                  timeStamp: new Date()
                                })
                                next_step()
                              }
                        } } >
                        <Container fluid>
                          {
                            device.device.type === "desktop"
                            ?
                            <Row>
                                <Col className="pt-1 text-center" xs={12} >
                                    <label className="font-weight-bold" style={label_(0,0,'18px','center')} >Calcula tu cuota</label>
                                </Col>

                                  <Col xs={12} >
                                    <label className="pt-3" style={label_(0,0,'14px')}><span className="font-weight-bold">Frecuencia</span> <span style={label_(1,0,'10px')} >(¿cada cuanto realizarás tus pagos?)</span>  </label>
                                    <div id="SliderFrecuencias" ></div>
                                </Col>
                                
                                <Col xs={12} > 
                                    <label className="pt-4" style={label_(0,0,'14px')}><span className="font-weight-bold">Monto</span> <span style={label_(1,0,'10px')} >(¿Cuánto dinero necesitas?)</span>  </label>
                                    <div className="d-flex justify-content-center" >
                                      <div style={{ marginTop:'5px', width:'90%' }} id="SliderMonto" />
                                    </div>
                                </Col>

                                <Col xs={12} >  
                                    <label className="pt-2" style={label_(0,0,'14px')}><span className="font-weight-bold">Plazo</span> <span style={label_(1,0,'10px')} >(¿En cuánto tiempo lo quieres pagar?)</span>  </label>
                                    <div className="d-flex justify-content-center" >
                                      <div style={{marginTop:'5px', width:'90%' }} id="SliderMeses" />
                                    </div>
                                </Col>

                                <Col xs={12} className="pt-1 text-center">
                                  <label className="font-weight-bold" style={label_(2,0,'16px','center','24px')} >
                                    <span> <label id="lblNcuota"> {  product.Numero_Cuotas / 100 }  </label> </span> 
                                    <span style={label_(0,0)} > cuotas de </span> 
                                    <span style={label_(2,0)} >RD$ </span>
                                    <span style={label_(2,0)} id="lblcuota" >{product.Cuota}</span>
                                  </label>
                                </Col>

                                <Col xs={12} className="text-center" > 
                                    <Button className="font-weight-bold" style={Btn_(2,2,3,'90%')} type="submit"  id="paso1">Continuar</Button>
                                </Col>

                            </Row>
                            :
                            <Row>
                                <Col className="pt-1 text-center" xs={12} >
                                    <label className="font-weight-bold" style={label_(0,0,'18px','center')} >Calcula tu cuota</label>
                                </Col>

                                  <Col xs={12} >
                                    <label className="pt-3" style={label_(0,0,'14px')}><span className="font-weight-bold">Frecuencia</span> <span style={label_(1,0,'10px')} >(¿cada cuanto realizarás tus pagos?)</span>  </label>
                                    <div id="SliderFrecuencias" ></div>
                                </Col>
                                
                                <Col xs={12} > 
                                    <label className="pt-4" style={label_(0,0,'14px')}><span className="font-weight-bold">Monto</span> <span style={label_(1,0,'10px')} >(¿Cuánto dinero necesitas?)</span>  </label>
                                    <div className="d-flex justify-content-center" >
                                      <div style={{ width:'90%' }} id="SliderMonto" />
                                    </div>
                                </Col>

                                <Col xs={12} >  
                                    <label style={label_(0,0,'14px')}><span className="font-weight-bold">Plazo</span> <span style={label_(1,0,'10px')} >(¿En cuánto tiempo lo quieres pagar?)</span>  </label>
                                    <div className="d-flex justify-content-center" >
                                      <div style={{ width:'90%' }} id="SliderMeses" />
                                    </div>
                                </Col>

                                <Col xs={12} className="pb-1 text-center">
                                  <label className="font-weight-bold" style={label_(2,0,'16px','center','24px')} >
                                    <span style={label_(0,0)} >Cuota {product.Frecuencia == '1' ? 'Mensual' : 'Quincenal'}: RD$</span>
                                    <span style={label_(2,0)} id="lblcuota" >{product.Cuota}</span>
                                  </label>
                                </Col>

                                <Col xs={12} className="text-center" > 
                                    <Button className="font-weight-bold" style={Btn_(2,2,3,'90%')} type="submit"  id="paso1">Continuar</Button>
                                </Col>

                            </Row>
                          }
                      </Container>
                      </Form>
                    </div>
                </div>
            </>
        )

    }
}
