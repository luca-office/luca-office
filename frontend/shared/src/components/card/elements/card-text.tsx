import {css} from "@emotion/react"
import * as React from "react"
import {CustomStyle, spacingCard} from "../../../styles"
import {Text} from "../.."

interface Props extends CustomStyle {
  children?: React.ReactElement | string | number | null
}

export const CardText: React.FC<Props> = ({children, customStyles}) => (
  <Text customStyles={[styles, customStyles]}>{children}</Text>
)

const styles = css({
  padding: spacingCard,
  flex: 1
})
