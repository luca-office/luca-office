import {css} from "@emotion/react"
import {backgroundColorLight} from "./colors"
import {borderRadius} from "./common"

export const insetShadow = "inset 0px 0px 4px 0px rgba(0, 0, 0, 0.16)"
export const deepShadow = "0px 1px 2px 0px rgba(0, 0, 0, 0.24)"
export const floatingWindowShadow = "0px 2px 4px 2px rgba(46, 48, 50, 0.16)"
export const shadowedCard = css({
  background: backgroundColorLight,
  borderRadius: borderRadius,
  boxShadow: insetShadow,

  "&:hover": {
    background: backgroundColorLight,
    borderRadius: borderRadius,
    boxShadow: insetShadow
  }
})
