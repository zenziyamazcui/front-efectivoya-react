import DeviceDetector from "device-detector-js";
import {Key} from './Key'

const deviceDetector = new DeviceDetector();
const userAgent = window.navigator.userAgent;
export const device = deviceDetector.parse(userAgent);



export const device_m = {
    KeyOrigen : Key.KeyOrigen ,
    mp_Identification : null ,
    client_engine: device.client.engine,
    client_engineVersion: device.client.engineVersion,
    client_name:device.client.name,
    client_type:device.client.type,
    client_version:device.client.version,
    device_brand:device.device.brand,
    device_model:device.device.model,
    device_type:device.device.type, 
    os_name:device.os.name,
    os_platform:device.os.platform,
    os_version:device.os.version,  
    IdCookie: localStorage.getItem('cookie')
}
