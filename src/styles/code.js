import {colors} from './colors'

export const Code_ = () => {
    return{
        border : '0px',
        margin : '0.1em',
        fontSize: 'calc(100% + 30px)',
        width : '20%',
        textAlign : 'center',
        color : `${colors[2]}`,
        borderBottom : `0.05em solid ${colors[1]} `,
    }
    
}

export const CodeAlert_ = () => {
    return{
        border : '0px',
        margin : '0.1em',
        fontSize: 'calc(100% + 30px)',
        width : '20%',
        textAlign : 'center',
        color : `${colors[4]}`,
        borderBottom : `0.05em solid ${colors[4]} `,
    }
    
}