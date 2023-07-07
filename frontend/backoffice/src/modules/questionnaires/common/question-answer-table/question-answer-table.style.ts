import {css} from "@emotion/react"
import {
  borderColor,
  borderRadius,
  buttonHeight,
  cardBottomColor,
  Flex,
  FontWeight,
  selectedBorderColor,
  spacing,
  spacingHuge,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"

const Sizes = {
  tableHeader: 48
}

export const questionAnswerTableStyles = {
  noScoreCard: css({
    flex: "1 0 100%"
  }),
  spacedLabel: css({
    marginTop: spacingLarge,
    overflow: "visible"
  }),
  tableHeader: css({
    height: Sizes.tableHeader
  }),
  tableFooter: css({
    backgroundColor: cardBottomColor,
    padding: spacing(spacingSmall),
    height: "auto"
  }),
  noScoreContent: css({
    padding: spacingSmall,
    boxSizing: "border-box",
    display: "grid",
    gridColumnGap: spacingMedium,
    gridTemplateColumns: "minmax(0, 1fr) minmax(min-content, max-content)"
  }),
  noScoreHeadline: css({
    fontWeight: FontWeight.Bold,
    marginBottom: spacingTiny
  }),
  scoreLabel: css({
    marginRight: spacingSmall
  }),
  scoreLabelText: css({
    fontSize: TextSize.Medium
  }),
  tableRow: (isSelected: boolean, canBeSelected: boolean) =>
    css({
      border: `2px solid ${isSelected ? selectedBorderColor : "transparent"}`,
      borderRadius,
      cursor: canBeSelected ? "pointer" : "not-allowed !important"
    }),
  placeholder: css({
    textAlign: "center"
  }),
  scoreLine: css(Flex.row, {
    flex: "1 1 auto",
    justifyContent: "flex-end",
    padding: spacing(spacingSmall, spacingSmall, 0, spacingSmall)
  }),
  scoreEditField: css({
    border: `1px solid ${borderColor}`,
    width: 100,
    flexGrow: 0,
    background: "white",
    height: spacingHuge - 2, //take border into account
    "form > div": {
      background: "white",
      height: spacingHuge - 2
    }
  }),
  scoreInput: css({
    input: {
      fontSize: TextSize.Small,
      fontWeight: FontWeight.Regular
    }
  }),
  emptyFooter: css({
    height: 8
  }),
  noScoreButton: css({
    height: buttonHeight,
    alignSelf: "center"
  })
}
