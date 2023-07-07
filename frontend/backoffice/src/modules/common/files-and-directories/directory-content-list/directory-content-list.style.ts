import {css} from "@emotion/react"
import {boxHeightMedium, contentListMinHeight, contentListPlaceholderHeight, spacing, spacingSmall} from "shared/styles"

export const contentListStyle = {
  contentList: css({
    minHeight: contentListMinHeight,
    overflow: "auto",

    ".table-placeholder": {
      minHeight: contentListPlaceholderHeight
    }
  }),
  tableRowHeight: css({
    height: boxHeightMedium
  }),
  headerTitle: css({
    flexBasis: "50%"
  }),
  headerRelevance: css({
    flexBasis: "20%"
  }),
  operationColumn: css({
    flex: `0 0 10%`
  }),
  addFileTooltip: css({
    display: "contents"
  }),
  operationButton: css({
    width: "100%",
    padding: spacing(0, spacingSmall)
  }),
  operationHeaderColumn: css({
    overflow: "visible",
    paddingRight: 0
  }),
  lastOperationColumn: css({
    paddingRight: 0,
    display: "flex",
    justifyContent: "flex-end"
  }),
  tableHeaderRow: css({
    padding: spacingSmall
  })
}
