import {css} from "@emotion/react"
import {
  boxHeightMediumLarge,
  boxHeightSmaller,
  fontColor,
  fontColorLight,
  FontWeight,
  spacingMedium,
  TextSize
} from "shared/styles"

export const styles = {
  card: css({width: "90vw", padding: spacingMedium}),
  closeIcon: css({
    cursor: "pointer"
  }),
  heading: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingMedium
  }),
  leftTableWrapper: css({
    flexGrow: 2,
    marginRight: spacingMedium
  }),
  rightTableWrapper: css({
    flexGrow: 1
  }),
  lastTableColumn: (greyedOut?: boolean) =>
    css({
      float: "right",
      color: greyedOut ? fontColorLight : fontColor
    }),
  tableHeader: css({
    height: boxHeightMediumLarge,
    fontWeight: FontWeight.Bold,
    fontSize: TextSize.Medium
  }),
  table: css({
    height: "80vh",
    overflow: "scroll"
  }),
  emptyFooter: css({
    padding: 0,
    height: boxHeightSmaller
  })
}
