import {css} from "@emotion/react"
import {borderRadiusSmall, buttonBackgroundDisabled, buttonBackgroundPrimary, Flex, spacingMedium} from "../../styles"

const Size = {
  checkbox: 16
}

export const checkboxStyles = {
  checkbox: css({
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center"
  }),
  checkboxBorder: (disabled: boolean) =>
    css(Flex.column, {
      alignItems: "center",
      justifyContent: "center",
      width: Size.checkbox + 2, // 2 * 1px border
      height: Size.checkbox + 2, // 2 * 1px border
      background: disabled ? buttonBackgroundDisabled : buttonBackgroundPrimary,
      borderRadius: borderRadiusSmall
    }),
  checkboxPlaceholder: css({
    width: Size.checkbox,
    height: Size.checkbox,
    backgroundColor: "white",
    borderRadius: borderRadiusSmall
  }),
  button: css({
    height: 16,
    width: 16,
    position: "relative"
  }),
  buttonChecked: css({background: buttonBackgroundPrimary}),
  input: css({
    position: "absolute",
    width: "100%",
    height: "100%",
    appearance: "none",
    margin: 0,
    outline: 0,
    cursor: "pointer"
  }),
  inputDisabled: css({
    cursor: "not-allowed"
  }),
  labelLeft: css({
    marginRight: spacingMedium
  }),
  labelRight: css({
    marginLeft: spacingMedium
  }),
  checkIconDisabled: css({
    background: buttonBackgroundDisabled
  })
}
