
import {colors} from './colors'

export const FontFamily = ["Poppins"]

export const label_ = (Arrcolor, ArrFont , FontSize, FontAling , LineH, marginTop  ) => {
    return{
        color : colors[Arrcolor],
        fontSize : FontSize,
        textAlign : FontAling,
        fontFamily : FontFamily[ArrFont] ,
        lineHeight : LineH,
        marginTop : marginTop
    }
}
