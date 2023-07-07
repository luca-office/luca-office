import {css} from "@emotion/react"
import {
  borderRadius,
  chartProgressColor,
  Flex,
  fontColor,
  fontColorLight,
  spacingSmall,
  spacingTiny
} from "../../../../../styles"

export const tocEntryStyles = {
  overviewRatingRow: (isSelected: boolean) =>
    css(Flex.row, {
      minWidth: 0,
      flexGrow: 1,
      ...(isSelected && {
        backgroundColor: "rgba(79, 130, 207, 0.14)",
        borderRadius
      })
    }),
  ratingRow: css(Flex.row, {
    minWidth: 0,
    flexGrow: 1
  }),
  ratingLabel: css(Flex.row, {
    justifySelf: "right",
    marginLeft: "auto",
    alignSelf: "flex-end"
  }),
  ratingIcon: css({
    marginLeft: spacingSmall
  }),
  ratingColor: (isRated: boolean, useDefaultColor = false) =>
    css({
      color: !isRated && !useDefaultColor ? chartProgressColor : fontColor
    }),
  overviewSpacing: css({
    padding: spacingTiny,
    marginBottom: spacingSmall
  }),
  disabledColor: css({
    color: fontColorLight
  })
}
