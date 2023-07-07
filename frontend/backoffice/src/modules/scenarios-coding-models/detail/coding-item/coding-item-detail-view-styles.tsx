import {css} from "@emotion/react"
import {
  boxHeightMediumLarge,
  fontColorLight,
  spacingHuger,
  spacingMedium,
  spacingSmall,
  spacingTiny
} from "shared/styles"

export const codingItemDetailStyles = {
  button: css({
    marginRight: spacingSmall
  }),
  editScoring: (isAutomated: boolean) =>
    css({
      cursor: isAutomated ? "default" : "pointer"
    }),
  headerRow: css({
    padding: spacingSmall
  }),
  editRule: css({
    marginTop: spacingMedium
  }),
  tableRow: css({
    height: boxHeightMediumLarge
  }),
  tableWrapper: css({
    marginTop: spacingHuger
  }),
  columns: {
    scoringTypeColumn: css({
      flexGrow: 0,
      flexBasis: 40,
      justifyContent: "flex-start"
    }),
    scoringTypeColumnHeader: css({
      display: "flex",
      justifyContent: "center"
    }),
    scoringTypeColumnContentItem: css({
      justifyContent: "center",
      display: "flex"
    }),
    scoringMethodColumn: css({
      marginRight: spacingMedium,
      cursor: "default"
    }),
    pointsColumnHeader: css({
      display: "flex",
      justifyContent: "flex-end"
    }),
    pointsColumn: css({flexGrow: 0, flexBasis: "auto"})
  },
  descriptionText: (isEmpty: boolean) => ({
    color: isEmpty ? fontColorLight : "initial",
    cursor: "pointer"
  }),
  icon: css({
    marginRight: spacingTiny
  }),
  score: css({textAlign: "right"})
}
