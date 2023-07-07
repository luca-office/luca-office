import {CSSInterpolation} from "@emotion/serialize"
import React from "react"

export interface CustomStyle {
  readonly customStyles?: CSSInterpolation
}

export interface Children {
  readonly children?: JSX.Element | JSX.Element[] | React.ReactNode
}
