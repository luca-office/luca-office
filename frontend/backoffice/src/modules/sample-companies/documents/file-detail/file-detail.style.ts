import {css} from "@emotion/react"
import {
  borderRadius,
  spacing,
  spacingHuge,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"

export const fileDetailStyles = {
  wrapper: css({
    display: "flex",
    flexDirection: "column",
    height: `calc(100% - ${2 * spacingLarge}px)`
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
    width: "80vh"
  }),
  viewerToolPlaceholder: css({
    padding: spacingLarge,
    backgroundColor: "white",
    borderRadius: borderRadius
  }),
  content: css({
    padding: spacingHuge,
    width: "initial",
    justifyContent: "flex-start"
  }),
  nameAndDirectoryWrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr minmax(0, 1fr)",
    gap: spacingMedium
  }),
  actionField: css({
    width: "100%",

    ".content": {
      minWidth: 0
    }
  }),
  textHint: css({
    margin: spacing(-spacingMedium, 0, spacingSmall)
  })
}
