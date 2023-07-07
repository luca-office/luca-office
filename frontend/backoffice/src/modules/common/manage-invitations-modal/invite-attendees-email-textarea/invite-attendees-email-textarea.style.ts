import {css} from "@emotion/react"
import {errorColor, fontColor, spacingMedium, spacingTiny, TextSize} from "shared/styles"

export const styles = {
  wrapper: css({
    flex: 1
  }),
  heading: css({
    marginBottom: spacingTiny
  }),
  helpText: css({
    marginBottom: spacingMedium
  }),
  textarea: css({
    fontSize: TextSize.Small,
    "> textarea": {
      textIndent: 0,
      padding: spacingTiny,
      "&::placeholder": {
        fontSize: TextSize.Small
      }
    }
  }),
  validityCheck: (isValid: boolean) =>
    css({
      textAlign: "right",
      color: isValid ? fontColor : errorColor
    })
}
