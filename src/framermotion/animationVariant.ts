import { Variant,VariantLabels } from "framer-motion";

export const scalPopupInitial: Variant | VariantLabels | any   = {
    scale: 0.1,
    opacity:0
}

export const scalPopupAnimate: Variant | VariantLabels | any = {
    scale: 1,
    opacity:1
}

export const translateYinitial: Variant | VariantLabels = {
    y: -100,
    opacity:0
}


export const translateYanimate: Variant | VariantLabels = {
    y: 0,
    opacity:1
}