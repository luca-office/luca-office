import {css} from "@emotion/react"
import {Flex, headerHeight, inputHeight, spacingHuge, spacingHuger, spacingMedium} from "shared/styles"

const Size = {
  icon: {width: 415, height: 160},
  button: 206,
  text: 600
}

export const notFoundPageStyle = {
  content: css(Flex.column, {
    justifyContent: "center",
    alignItems: "center",
    padding: spacingHuge,
    width: "100vw",
    height: `calc(100vh - ${headerHeight}px)`,
    boxSizing: "border-box"
  }),
  icon: css({
    width: Size.icon.width,
    minWidth: Size.icon.width,
    height: Size.icon.height
  }),
  text: css({
    width: Size.text,
    letterSpacing: 0,
    textAlign: "center"
  }),
  label: css({
    marginTop: spacingHuger,
    fontWeight: "bold",
    height: inputHeight,
    lineHeight: `${inputHeight}px`
  }),
  button: css({
    marginTop: spacingMedium,
    width: Size.button
  })
}
