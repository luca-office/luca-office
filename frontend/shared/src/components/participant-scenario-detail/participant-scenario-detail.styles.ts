import {css} from "@emotion/react"
import {
  backgroundColorLight,
  Flex,
  flex1,
  FontWeight,
  insetShadow,
  onlineColor,
  primaryColor,
  spacing,
  spacingCard,
  spacingHuger,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny
} from "../../styles"

export const styles = {
  header: css({justifyContent: "space-between"}),
  navigateBackButton: css(Flex.row, {
    alignItems: "center",
    cursor: "pointer"
  }),
  backIcon: css({
    marginRight: spacingSmall
  }),
  buttonWrapper: (isChatEnabled: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns: `repeat(${isChatEnabled ? 2 : 1}, 292px)`,
      gridColumnGap: isChatEnabled ? spacingMedium : "initial"
    }),
  button: css({
    width: "100%"
  }),
  content: css({
    boxSizing: "border-box",
    padding: spacingMedium,
    justifyContent: "unset"
  }),
  description: css(Flex.column, {
    gap: spacingSmall,
    boxSizing: "border-box",
    padding: spacing(0, spacingSmall),
    marginBottom: spacingHuger
  }),
  module: css(Flex.row, {
    justifyContent: "space-between"
  }),
  moduleTitle: css(Flex.row, {
    gap: spacingMedium
  }),
  footer: css({
    padding: 0,
    height: spacingMedium
  }),

  cardsContainer: css(Flex.column, {
    gap: 20
  }),
  finalScoreCard: css({
    padding: spacingMedium,
    boxShadow: insetShadow,
    backgroundColor: backgroundColorLight,
    boxSizing: "border-box",
    gap: spacingLarge,
    "&:hover": {
      boxShadow: insetShadow
    }
  }),
  cardsGrid: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: spacingMedium,
    gap: spacingMedium,
    boxShadow: insetShadow,
    backgroundColor: backgroundColorLight,
    boxSizing: "border-box",
    "&:hover": {
      boxShadow: insetShadow
    }
  }),
  documentsProgress: css(Flex.row, {
    gap: spacingSmall
  }),
  label: css({
    fontWeight: FontWeight.Bold,
    marginBottom: spacingTiny
  }),
  progressBar: css({
    flex: flex1
  }),
  progressBarComplete: css({
    ".progress-element": {
      backgroundColor: onlineColor
    }
  }),
  cardButtonContainer: css(Flex.row, {
    flex: flex1,
    alignItems: "end",
    padding: spacing(spacingMedium, spacingCard),
    flexDirection: "row-reverse"
  }),
  finalScoreCardButtonContainer: css(Flex.row, {
    justifyContent: "space-between",
    padding: spacing(0, spacingCard, spacingMedium, spacingCard)
  }),
  finalScoreButton: css({
    alignSelf: "end"
  }),
  finalScoreLabel: css({
    fontWeight: FontWeight.Bold
  }),
  textButton: css({
    fontWeight: FontWeight.Bold,
    color: primaryColor,
    padding: 0,
    width: "initial",
    height: "initial",

    "&, &:disabled": {
      background: "initial"
    }
  }),
  tableFooter: css({
    padding: 0,
    height: spacingMedium
  }),
  loadingIndicatorContainer: css(Flex.column, {
    flex: flex1,
    justifyContent: "center",
    alignItems: "center"
  })
}
