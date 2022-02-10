import {colors} from '../styles/colors'

export const Steps_ = (Arrgcolor) => {
    return {
        borderBlockColor :colors[Arrgcolor],
        width: '40px',
        color:colors[Arrgcolor],
        borderBottom : `2px solid ${colors[Arrgcolor]}`,
        margin:'2px',
        fontSize : '10px',
        textAlign:'center'
    }
}