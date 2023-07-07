import {css} from "@emotion/react"
import {borderRadius, spacing, spacingLarge, spacingSmall, spacingTiny, TextSize} from "shared/styles"

export const fileDetailStyle = {
  wrapper: css({
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto"
  }),
  subject: css({
    margin: spacing(0, -spacingSmall),

    "form > div": {
      padding: spacing(spacingTiny, spacingSmall, spacingTiny, spacingSmall)
    },
    input: {
      fontSize: TextSize.Larger
    }
  }),
  viewerTool: css({
    height: "80vh",
    width: "80vw"
  }),
  viewerToolPlaceholder: css({
    padding: spacingLarge,
    backgroundColor: "white",
    borderRadius: borderRadius
  }),
  spreadsheetViewer: css({
    overflow: "hidden"
  })
}
