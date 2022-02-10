import {colors} from './colors'

export const Box_ = (Arrcolor, H, W) => {
    return {
        margin : 'auto',
        borderRadius:'1em',
        backgroundColor : colors[Arrcolor],
        height :H,
        width : W ,
        shadowColor: colors[Arrcolor],
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24
    }
}



export const Input_ = (ColorBord,ColorFont) => {
    return {
            color : colors[ColorFont],
            border : `1px solid ${colors[ColorBord]}`,
            borderRadius:'5px',
            width : '100%',
            fontSize:'14px',
            fontWeigth:'bold',
            height : '39px',
            padding: '6px 12px',
            ':hover':{
                backgroundColor: colors[4],
                fontSize:'8px',
            },
            ':focus':{
                border : `1px solid ${colors[3]}`,
                backgroundColor: colors[4],
                fontSize:'8px',
            }
    }
}


