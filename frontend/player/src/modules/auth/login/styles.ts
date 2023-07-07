import {css} from "@emotion/react"
import {
  Flex,
  primaryColor,
  spacing,
  spacingHuge,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"

export const styles = {
  loginTypeWrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: spacingMedium
  }),
  cardRadioLabel: css({
    "div[class*='label-Heading']": {
      fontSize: TextSize.Medium
    }
  }),
  cardContent: css({
    cursor: "pointer",
    width: "auto",
    padding: spacing(spacingSmall, spacingMedium)
  }),
  label: css({
    marginBottom: spacingSmall
  }),
  heading: css({
    marginTop: spacingLarge,
    marginBottom: spacingTiny
  }),
  infoText: css({
    marginBottom: spacingMedium
  }),
  formWrapper: css({
    width: "50%",
    margin: "0 auto",
    marginTop: spacingHuge
  }),
  text: css({
    marginTop: spacingSmall
  }),
  input: css({
    width: "100%",
    marginBottom: spacingSmall
  }),
  passwordInput: css({
    width: "100%"
  }),
  button: css({
    width: "100%",
    marginTop: spacingHuge
  }),
  missingAccountText: css({
    textAlign: "center",
    marginTop: spacingSmall
  }),
  registerNowText: css({
    color: primaryColor,
    textAlign: "center",
    textDecoration: "underline",
    cursor: "pointer"
  }),
  passwordForgottenText: css({
    textAlign: "end",
    marginTop: spacingTiny
  }),
  resumption: css(Flex.row, {
    justifyContent: "space-between"
  }),
  resumptionButton: css({
    cursor: "pointer"
  }),
  resumptionWrapper: css({
    marginTop: spacingMedium
  })
}
