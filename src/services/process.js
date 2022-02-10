const axios = require('axios');
const port = process.env.REACT_APP_PORT
const baseUri = process.env.REACT_APP_BASE_URI
const prefix = process.env.REACT_APP_PREFIX
const authorization = process.env.REACT_APP_AUTHORIZATION
const amb = process.env.REACT_APP_AMB

export const Process = async (B,M) =>
{   
        const resp = await axios({
            method: 'post',
            port : port,
            url: `${baseUri}${prefix}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization,
                'amb': amb,
                'method': M }, 
                data: JSON.stringify(B) 
            });   


        return resp.data
} 


export const Data = async (B) =>
{

        const resp = await axios({
            method: 'post',
            url: `${baseUri}Data`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization,
                'amb': amb
            }, 
                data: JSON.stringify(B) 
            });   

        return resp.data
} 