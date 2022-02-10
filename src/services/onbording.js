import {Ofert_, Ofert_T} from '../model/Ofert_'
import {Key} from '../model/Key'
import {Process} from '../services/process'
import {TratamientoComponentes} from '../services/calculadora'


export var Fil = 1 ;

export const Read_Data = async () => {
    Ofert_.DataC = await Process(Key , 'Calculadora/Datos');
    return Ofert_;
}


export const Read_Freq = async () => {
    try{


       Ofert_T.Frecuencias_=  TratamientoComponentes(
             Ofert_.DataC.filter( x => x.FCO_FrecuenciaQ != 0 ).sort().map ( function (x) {
                return Object = {
                    Maximo : x.FCO_FrecuenciaQ,
                    Minimo : x.FCO_FrecuenciaQ,
                    Steps  : x.FCO_FrecuenciaQ,
                    label : x.FCO_FrecuenciaQ == 1 ? 'Mensual' : x.FCO_FrecuenciaQ == 15 ? 'Quincenal' : 'Semanal' 
                } 
            }))

            //ReactDOM.render(<p>!"·</p>, document.getElementById("F") );

        }
        catch(error){
            //console.log("***********************")
            //console.log(error)
            //console.log("***********************")
            
        }

        /*
                a.push(
                    Object = {
                        Maximo : x.FCO_FrecuenciaQ,
                        Minimo : x.FCO_FrecuenciaQ,
                        Steps  : x.FCO_FrecuenciaQ,
                        label : x.FCO_FrecuenciaQ == 1 ? 'Mensual' : x.FCO_FrecuenciaQ == 15 ? 'Quincenal' : 'Semanal' 
                    }) 
                })
        */
    



   
}


