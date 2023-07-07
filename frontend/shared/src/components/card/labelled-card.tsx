import {css} from "@emotion/react"
import * as React from "react"
import {Children, CustomStyle} from "../../styles"
import {Label} from "../label/label"

interface Props extends CustomStyle, Children {
  readonly label: string
}

export const LabelledCard: React.FC<Props> = ({children, label, customStyles}) => (
  <div css={[style, customStyles]}>
    <Label label={label} />
    {children}
  </div>
)

const style = {
  container: css({
    display: "flex",
    flexDirection: "column"
  })
}
