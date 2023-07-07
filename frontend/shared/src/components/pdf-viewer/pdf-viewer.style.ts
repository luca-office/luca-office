import {css} from "@emotion/react"
import {
  borderRadius,
  boxHeightSmall,
  cardBottomColor,
  Flex,
  fontColor,
  fontColorLight,
  radius,
  spacing,
  spacingCard,
  spacingLarge,
  spacingSmall,
  spacingTiny,
  zIndex1
} from "../../styles"

const Size = {
  control: 28,
  pagesInput: 57
}

export const pdfViewerStyle = {
  viewer: css(Flex.column),
  subHeader: css({
    zIndex: zIndex1
  }),
  pdfContent: css(Flex.row, {
    justifyContent: "center",
    flexDirection: "column",
    flexGrow: 1,
    overflow: "auto"
  }),
  footerWrapper: css(Flex.row, {
    justifyContent: "center",
    backgroundColor: cardBottomColor,
    height: boxHeightSmall,
    borderRadius: radius(0, 0, borderRadius, borderRadius),
    padding: spacingTiny
  }),
  footer: css(Flex.row),
  footerControls: css(Flex.row, {
    marginRight: spacingLarge + spacingTiny
  }),
  footerControlButtonMarginRight: css({
    marginRight: spacingCard
  }),
  footerPages: css(Flex.row),
  footerPagesInput: css({
    width: Size.pagesInput
  }),
  footerPagesDivider: css({
    margin: spacing(0, spacingSmall)
  })
}
