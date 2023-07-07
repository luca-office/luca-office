import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import * as React from "react"
import {fontColor, primaryColor, spacingCard} from "../../styles"
import {Text} from ".."

interface Props {
  readonly text: string
  readonly backgroundColor: TagBackgroundColor
  readonly customWrapperStyle?: CSSInterpolation
  readonly customTagStyle?: CSSInterpolation
}

export enum TagBackgroundColor {
  PRIMARY,
  GREY
}

export const Tag: React.FC<Props> = ({text, backgroundColor, customWrapperStyle, customTagStyle}) => {
  const customStyles = styles(backgroundColor)

  return (
    <div css={[customStyles.wrapper, customWrapperStyle]}>
      <Text customStyles={[customStyles.text, customTagStyle]}>{text}</Text>
    </div>
  )
}

const styles = (backgroundColor: TagBackgroundColor) => ({
  wrapper: css({
    backgroundColor: backgroundColor === TagBackgroundColor.PRIMARY ? primaryColor : "#f0f0f0",
    width: "fit-content",
    borderRadius: 12,
    userSelect: "none"
  }),
  text: css({
    color: backgroundColor === TagBackgroundColor.PRIMARY ? "white" : fontColor,
    padding: `2px ${spacingCard}px`
  })
})
