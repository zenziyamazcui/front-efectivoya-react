import React , { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import {COMPCalculadoras} from '../components/calculadora/comp_calculadora'
import {COMPIdentification} from '../components/Identification/comp_identification'
import {COMPMobile} from '../components/movil/comp_mobil'
import {COMPCode} from '../components/code/comp_code'
import COMP_Estudio from '../components/Estudio/comp_Estudio'
import { COMP_Deny } from '../components/Estudio/comp_Estudio'
import { device } from '../model/device'




let step_act = 1;


export const next_step = (e) => {
    step_act = step_act+1;

    switch(step_act){
        case 1:
                ReactDOM.render(<COMPCalculadoras/> , document.getElementById("e"));
            break;
        case 2:
                ReactDOM.render(<COMPIdentification/> , document.getElementById("e"));
            break;
        case 3:
                ReactDOM.render(<COMPMobile/> , document.getElementById("e"));
            break;
        case 4:
                ReactDOM.render(<COMPCode/> , document.getElementById("e"));
            break;
        case 5:
                ReactDOM.render(<BrowserRouter><COMP_Estudio/> </BrowserRouter>, document.getElementById("e"));
            break;
    }

}


export const ant_step = (e) => {

    step_act = step_act -1 ;
    
    switch(step_act){
        case 1:
                ReactDOM.render(<COMPCalculadoras/> , document.getElementById("e"));
            break;
        case 2:
                ReactDOM.render(<COMPIdentification/> , document.getElementById("e"));
            break;
        case 3:
                ReactDOM.render(<COMPMobile/> , document.getElementById("e"));
            break;
        case 4:
                ReactDOM.render(<COMPCode/> , document.getElementById("e"));
            break;
        case 5:
                ReactDOM.render(<COMP_Estudio/> , document.getElementById("e"));                
            break;
    }
}
