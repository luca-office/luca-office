import {css} from "@emotion/react"
import {ButtonVariant} from "../../enums"
import {
  boxHeightSmaller,
  buttonBackgroundDisabled,
  buttonBackgroundPrimary,
  buttonHeight,
  fontColorBright,
  fontFamily,
  primaryColor,
  spacingSmall,
  TextSize
} from "../../styles"

export const buttonStyle = (variant?: ButtonVariant) => ({
  button: css({
    minHeight: buttonHeight,
    width: variant === ButtonVariant.IconOnly ? buttonHeight : 165,
    borderRadius: 4,
    outline: "none",
    userSelect: "none",
    border:
      variant === ButtonVariant.Primary || variant === ButtonVariant.Ghost ? "none" : `1px solid  ${primaryColor}`,
    color: variant === ButtonVariant.Primary ? "white" : primaryColor,
    fontSize: TextSize.Medium,
    fontFamily: fontFamily,
    fontWeight: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    background:
      variant === ButtonVariant.Primary || variant === ButtonVariant.IconOnly ? buttonBackgroundPrimary : "none",
    cursor: "pointer",

    ":hover": {
      opacity: 0.8
    },

    ":disabled": {
      background: buttonBackgroundDisabled,
      cursor: "not-allowed",
      border: "none"
    }
  }),
  buttonContent: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }),
  icon: css({
    marginRight: variant === ButtonVariant.IconOnly ? 0 : spacingSmall
  }),
  loadingIndicator: css({
    height: boxHeightSmaller,
    width: boxHeightSmaller,
    color: fontColorBright,
    marginRight: spacingSmall
  })
})
