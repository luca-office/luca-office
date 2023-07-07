import {css} from "@emotion/react"
import {
  Flex,
  fontColorLight,
  FontWeight,
  primaryColor,
  spacing,
  spacingCard,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  textEllipsis
} from "shared/styles"

export const uploadFileTypeCardStyle = {
  header: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  }),
  iconCursor: css({
    cursor: "pointer"
  }),
  icon: css({marginRight: spacingSmall}),
  text: css({
    padding: spacingCard,
    paddingTop: 0
  }),
  previewButton: css({
    fontWeight: FontWeight.Bold,
    color: primaryColor,
    padding: 0,
    margin: spacing(0, spacingMedium + spacingTiny / 2),
    width: "initial",
    height: "initial",

    "&, &:disabled": {
      background: "initial"
    }
  }),
  title: css(textEllipsis),
  subTitle: css(textEllipsis, {
    color: fontColorLight,
    marginLeft: spacingSmall
  }),
  metadata: css(Flex.row, {
    minWidth: 0
  }),
  controls: css(Flex.row, {
    flex: "0 0 auto"
  })
}
