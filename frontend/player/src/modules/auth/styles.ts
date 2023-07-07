import {css} from "@emotion/react"
import {flex1, spacingLarge, spacingMedium, spacingSmall} from "shared/styles"

export const styles = {
  contentWrapper: css({
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  }),
  content: css({
    backgroundColor: "white",
    alignItems: "flex-start",
    flex: flex1,
    flexBasis: 0
  }),
  button: css({
    flex: 1,
    marginTop: spacingLarge,
    marginLeft: spacingMedium
  }),
  loginColumn: css({
    padding: `5% ${spacingLarge}px ${spacingLarge}px ${spacingLarge}px`,
    maxHeight: "100%",
    boxSizing: "border-box",
    overflow: "auto"
  }),
  logoPlaceholder: css({
    flex: 1
  }),
  textHeading: css({
    marginBottom: spacingLarge
  }),
  label: css({
    marginBottom: spacingSmall
  }),
  entryCodeWrapper: css({
    display: "flex",
    alignItems: "center"
  }),
  entryCodeInput: css({
    flex: 1,
    width: "100%"
  })
}
