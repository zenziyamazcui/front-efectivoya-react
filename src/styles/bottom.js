import { colors } from "./colors"
import { FontFamily } from "./leters"

export const Btn_ = (Arrcolor, ArrBcolor, ArrFcolor, Wd, hd, opacity) => {
    return {
        backgroundColor: colors[Arrcolor],
        borderColor: colors[ArrBcolor],
        fontFamily: FontFamily[0],
        color: colors[ArrFcolor],
        width: Wd,
        borderRadius: "10px",
        margin: "auto",
        padding: "0.8em",
        opacity,
    }
}