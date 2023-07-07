import {css} from "@emotion/react"
import {buttonHeight, Flex, fontColorLight, headerHeight, spacingMedium, subHeaderHeight} from "shared/styles"

const Size = {
  headerButton: {width: 252},
  footerButton: {width: 292},
  footer: buttonHeight + 2 * spacingMedium
}

export const referenceBookDetailStyles = {
  content: css({
    display: "flex",
    flex: "1 1 auto",
    overflow: "auto"
  }),
  contentContainer: css(Flex.column, {
    maxHeight: `calc(100vh - ${headerHeight + subHeaderHeight + Size.footer}px)`,
    boxSizing: "border-box"
  }),
  tableOfContent: css({
    marginRight: spacingMedium,
    minWidth: 0
  }),
  titleText: css({
    color: fontColorLight
  }),
  header: css({
    "> div > button:first-of-type": {
      width: Size.headerButton.width
    }
  }),
  footer: css({
    height: Size.footer,

    "&, .feature-disabled-marker": {
      "> button": {
        width: Size.footerButton.width
      }
    }
  })
}
