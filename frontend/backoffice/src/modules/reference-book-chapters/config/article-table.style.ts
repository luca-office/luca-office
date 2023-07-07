import {css} from "@emotion/react"
import {buttonHeight, fontColor, fontColorLight, spacing, spacingHuge, spacingSmall, spacingTiny} from "shared/styles"

export const articleTableStyle = {
  smallCell: css({
    flex: "0 0 16px",
    textAlign: "center"
  }),
  controlCell: css({
    flex: `0 0 ${buttonHeight}px`
  }),
  sort: css({
    padding: spacing(spacingSmall, spacingTiny, spacingSmall, spacingSmall),
    marginLeft: spacingHuge + spacingSmall
  }),
  operation: css({
    padding: spacing(spacingSmall, spacingSmall, spacingSmall, spacingTiny)
  })
}
