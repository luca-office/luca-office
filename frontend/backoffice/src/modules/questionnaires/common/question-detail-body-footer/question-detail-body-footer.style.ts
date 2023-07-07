import {css} from "@emotion/react"
import {
  cardBottomColor,
  Flex,
  fontColor,
  fontColorLight,
  FontWeight,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny
} from "shared/styles"

export const emailBodyFooterStyle = {
  content: css({
    padding: spacing(spacingSmall, spacingLarge, spacingMedium, spacingLarge),
    color: fontColor,
    backgroundColor: cardBottomColor
  }),
  label: css({
    fontWeight: FontWeight.Bold,
    letterSpacing: 0.15
  }),
  cards: css({
    marginTop: spacingTiny
  }),
  cardsGrid: css({
    display: "grid",
    gridTemplateColumns: "1fr",
    gridGap: spacingMedium
  }),
  dropdownWrapper: css({
    width: "100%"
  }),
  intervention: css({
    height: "initial",
    minHeight: "auto"
  }),
  interventionPlaceholder: css(Flex.row, {
    color: fontColorLight
  }),
  displayGraphicsContainer: css(Flex.row, {
    justifyContent: "space-between"
  }),
  settingsFooterCard: css({flexGrow: 1, justifyContent: "space-between"})
}
