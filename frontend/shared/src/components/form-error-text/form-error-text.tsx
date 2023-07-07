import {css} from "@emotion/react"
import * as React from "react"
import {Children, CustomStyle, errorColor, spacingTiny} from "../../styles"
import {Text, TextChildrenProps} from ".."

interface Props {
  readonly children: TextChildrenProps
}

export const FormErrorText: React.FC<CustomStyle & Props> = ({children, customStyles}) => (
  <Text customStyles={[styles, customStyles]}>{children}</Text>
)

const styles = css({
  color: errorColor,
  marginTop: spacingTiny
})
