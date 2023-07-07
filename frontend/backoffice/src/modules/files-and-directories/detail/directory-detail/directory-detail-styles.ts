import {css} from "@emotion/react"
import {inputHeight, spacing, spacingHuger, spacingMedium, spacingSmall} from "shared/styles"

export const directoryDetailStyles = {
  hintText: css({
    margin: spacing(-spacingMedium, 0, spacingSmall)
  }),
  header: css({
    height: spacingHuger
  }),
  emailColumn: css({
    flexGrow: 2
  }),
  deleteColumn: css({
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 0,
    minWidth: inputHeight,
    flexGrow: 0
  }),
  deleteButton: css({
    paddingRight: spacingSmall
  })
}
