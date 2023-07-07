import {css} from "@emotion/react"
import {fontFamily} from "."
import {backgroundColor} from "./colors"

export const globalStyle = css`
  @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600&display=swap");

  body {
    margin: 0;
    padding: 0;
    background-color: ${backgroundColor};
    font-family: ${fontFamily};
  }
`
