import { Key } from './Key'

export const Trace = {
    Accion : 1 ,
    Id_Solicitud : 0 ,
    N_Identificacion : null,
    Visita : false ,
    Ofert : false,
    Identificacion : false ,
    Valida_Identificacion : false ,
    Telefono : false , 
    Valida_Pin : false ,
    Intentos_Pin : 0 ,
    Envio_Oferta : false , 
    Repcecion_Oferta : false ,
    Salida_BM : false ,
    Estado  : null ,
    URL :  window.location.href,
    KeyOrigen : Key.KeyOrigen,
    IdCookie :null
}