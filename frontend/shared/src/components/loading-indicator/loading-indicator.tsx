import {css, keyframes} from "@emotion/react"
import * as React from "react"
import {IconName} from "../../enums"
import {CustomStyle} from "../../styles"
import {Icon} from ".."

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const LoadingIndicator: React.FC<CustomStyle> = ({customStyles}) => {
  const styleProp = customStyles ? [styles, customStyles] : styles
  return <Icon customStyles={styleProp} name={IconName.LucaLogo} />
}

const styles = css({
  animation: `${rotate} 2s alternate-reverse infinite`,
  width: 32,
  height: 32
})
