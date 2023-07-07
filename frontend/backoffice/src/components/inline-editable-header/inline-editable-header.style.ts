import {css} from "@emotion/react"
import {
  backgroundColor,
  borderRadius,
  boxHeightMedium,
  boxHeightSmall,
  cardBottomColor,
  fontColor,
  fontColorLight,
  primaryColor8PercentOpacity,
  spacing,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"

export const inlineEditableHeaderStyle = {
  fullWidth: css({
    display: "flex",
    flexGrow: 1
  }),
  fullWidthChildren: css({
    ">div": {
      display: "flex",
      flexGrow: 1
    }
  }),
  wrapperDisabled: css({
    display: "flex",
    flexGrow: 1,
    height: boxHeightMedium + spacingTiny * 2,
    padding: spacing(spacingTiny, spacingSmall, spacingTiny, spacingSmall),
    width: "100%",
    boxSizing: "border-box",
    alignItems: "center"
  }),
  wrapper: css({
    "&:hover": {
      cursor: "pointer",
      backgroundColor: primaryColor8PercentOpacity,
      borderRadius: borderRadius,

      ".hover-icon": {
        display: "block"
      }
    }
  }),
  wrapperEditable: css({
    backgroundColor: backgroundColor
  }),
  inputWrapper: css({
    height: "100%",
    width: "100%",
    border: "none",
    outline: "none",

    marginRight: spacingSmall
  }),
  input: (isLoading: boolean, disabled: boolean) =>
    css({
      fontSize: TextSize.Larger,
      padding: 0,
      height: "100%",
      width: "100%",
      backgroundColor: "transparent",
      color: isLoading || disabled ? fontColorLight : fontColor,
      cursor: "pointer",
      textIndent: 0
    }),
  inputEditable: css({
    cursor: "default"
  }),
  inputDisabled: css({
    cursor: "default"
  }),
  inputPlaceholder: css({
    fontSize: TextSize.Smaller
  }),
  hoverIcon: css({
    width: 16,
    height: 16,
    display: "none",
    background: "transparent"
  }),
  icon: css({
    height: boxHeightSmall
  })
}
