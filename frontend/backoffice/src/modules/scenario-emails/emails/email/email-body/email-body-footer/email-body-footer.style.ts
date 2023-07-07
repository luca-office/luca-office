import {css} from "@emotion/react"
import {
  cardBottomColor,
  Flex,
  flex1,
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
  interventionWrapper: css(Flex.row, {
    flex: flex1,
    justifyContent: "space-between"
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  cards: css({
    marginTop: spacingTiny
  }),
  cardsGrid: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: spacingMedium
  }),
  dropdownWrapper: css({
    width: "100%"
  }),
  intervention: css({
    height: "initial",
    minHeight: "auto",
    width: "100%",
    flex: flex1,
    marginRight: spacingSmall
  }),
  interventionPlaceholder: css({
    color: fontColorLight
  }),
  settingsFooterCard: css({flexGrow: 1, justifyContent: "space-between"})
}
