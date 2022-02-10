import {product} from '../model/product'
import ReactDOM from 'react-dom'
import React from 'react'




export async function Calcular_Cuota()
{
    
    try {
        
        let F = product.Frecuencia == 1 ? 30 :  product.Frecuencia;
        let R = (product.Tasa/365) *F ;
        let C = product.Monto;
        let M = product.Numero_Cuotas;
        let P = C * ( R /( 1 - (1+R)**(-M)  ) )
        product.Cuota =  Math.round(P/5)*5;

        
           




        ReactDOM.render(<span id="lblcuota" >  {product.Cuota} </span>,document.getElementById("lblcuota"))
        ReactDOM.render(<label id="lblNcuota" > { product.Numero_Cuotas  } </label>,document.getElementById("lblNcuota"));
        ReactDOM.render(<label id="lblFrecuencia" > { product.Frecuencia  } </label>,document.getElementById("lblFrecuencia"));


        let d = product.Frecuencia == 1 
            ? new Date(new Date().setMonth(6)).toJSON().slice(0,10).replace(/-/g,'/').split('/')
            : new Date(new Date().setDate(new Date().getDate() + product.Frecuencia)).toJSON().slice(0,10).replace(/-/g,'/').split('/');


        ReactDOM.render(<span id="lblfecha" > {
            `${d[2]}/${d[1]}/${d[0]}`
            } </span>,document.getElementById("lblfecha"))

        


    }
    catch(error){
        //console.log(error);
    }
}
