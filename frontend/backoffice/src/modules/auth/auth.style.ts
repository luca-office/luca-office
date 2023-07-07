import {css} from "@emotion/react"
import {spacingHuge, spacingLarge, spacingMedium, spacingSmall, spacingTiny} from "shared/styles"

export const authStyles = {
  content: css({
    backgroundColor: "white",
    height: "100vh"
  }),
  passwordForgottenText: css({
    textAlign: "end",
    marginTop: spacingTiny
  }),
  formColumn: css({
    backgroundColor: "pink"
  }),
  formWrapper: css({width: "50%", margin: "0 auto"}),
  buttonFirst: css({
    marginTop: spacingHuge
  }),
  button: css({
    width: "100%",
    marginTop: spacingSmall
  }),
  formHeader: css({
    marginBottom: spacingSmall
  }),
  formText: css({
    marginBottom: spacingLarge
  }),
  logoPlaceholder: css({
    height: "100%"
  }),
  text: css({
    cursor: "pointer",
    marginTop: spacingMedium,
    textAlign: "center"
  })
}
