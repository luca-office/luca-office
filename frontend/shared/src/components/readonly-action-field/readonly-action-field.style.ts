import {css} from "@emotion/react"
import {
  flex1,
  fontColor,
  fontColorLight,
  fontFamily,
  FontWeight,
  primaryColor,
  spacing,
  spacingSmall,
  spacingTiny,
  textEllipsis,
  TextSize
} from "../../styles"

const Size = {
  label: 20,
  button: 20,
  contentWrapper: 32,
  contentWrapperPlain: "auto",
  boxShadowOffsetY: 1,
  boxShadowBlurRadius: 2
}
const Color = {
  white: "#ffffff"
}

export const readonlyActionFieldStyle = {
  textOverflowHidden: textEllipsis,
  inputContainer: (disabled?: boolean) =>
    css({
      minHeight: Size.label + spacingTiny + Size.contentWrapper + Size.boxShadowBlurRadius,
      cursor: disabled ? "not-allowed" : "pointer"
    }),
  label: css({
    color: fontColor,
    fontSize: TextSize.Medium,
    fontFamily: fontFamily,
    fontWeight: FontWeight.Bold,
    height: Size.label,
    lineHeight: `${Size.label}px`,
    letterSpacing: 0.15,
    marginBottom: spacingTiny
  }),
  labelIcon: css({
    paddingLeft: spacingTiny,
    paddingBottom: spacingTiny
  }),
  contentWrapper: css({
    minHeight: Size.contentWrapper,
    padding: spacing(spacingTiny, spacingSmall),
    boxSizing: "border-box",
    boxShadow: `0px ${Size.boxShadowOffsetY}px ${Size.boxShadowBlurRadius}px 0px rgba(0, 0, 0, 0.24)`,
    borderRadius: 4,
    backgroundColor: Color.white
  }),
  contentWrapperPlain: css({
    height: Size.contentWrapperPlain,
    padding: 0,
    boxShadow: "none",
    border: "none"
  }),
  content: (showButton: boolean) =>
    css({
      flex: flex1,
      marginRight: showButton ? spacingSmall : "initial"
    }),
  contentPlain: {
    marginRight: 0
  },
  button: css({
    padding: 0,
    background: "initial",
    width: "initial",
    borderRadius: 0,
    color: primaryColor,
    height: Size.button,
    lineHeight: `${Size.button}px`,
    fontSize: TextSize.Medium,
    fontWeight: FontWeight.Bold,

    ":disabled": {
      color: fontColorLight,
      background: "transparent"
    }
  }),
  placeholder: css({
    color: fontColorLight
  })
}
