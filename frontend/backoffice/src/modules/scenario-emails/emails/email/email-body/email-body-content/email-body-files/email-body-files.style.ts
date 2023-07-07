import {css} from "@emotion/react"
import {inputHeight, spacingSmall, textEllipsis} from "shared/styles"

export const emailStyle = {
  iconTitleColumn: css({
    flexBasis: "90%"
  }),
  deleteColumn: css({
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 0,
    minWidth: inputHeight
  }),
  addButton: css({
    width: inputHeight,
    height: inputHeight
  }),
  addButtonIcon: css({
    margin: 0
  }),
  nameColumnContent: css(textEllipsis, {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gridGap: spacingSmall,
    alignItems: "center"
  }),
  deleteButton: css({
    paddingRight: spacingSmall
  }),
  deleteButtonInner: css({
    background: "transparent"
  })
}
