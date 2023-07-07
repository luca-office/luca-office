import {css} from "@emotion/react"
import {
  buttonBackgroundDanger,
  Flex,
  FontWeight,
  primaryColor,
  spacing,
  spacingHeader,
  spacingLarge,
  spacingMedium,
  TextSize,
  validationErrorColor
} from "shared/styles"

export const styles = {
  contentContainer: css({
    padding: "0px",
    marginBottom: "70px"
  }),
  cardOverview: css({
    margin: spacing(0, spacingLarge)
  }),
  contentOverwrite: css({
    ".bottom-action-bar": {
      position: "fixed",
      bottom: 0,
      width: "100%"
    }
  }),
  card: css({
    height: 160
  }),
  header: css({
    position: "relative"
  }),
  subheader: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 3fr 30px",
    padding: spacing(spacingLarge, spacingHeader, spacingMedium, spacingHeader),
    gap: spacingMedium
  }),
  footerText: css({
    fontSize: TextSize.Medium
  }),
  footerWithText: css(Flex.row, {
    justifyContent: "space-between",
    cursor: "default"
  }),
  fullWidth: css({
    width: "100%"
  }),
  footer: css(Flex.row, {
    justifyContent: "flex-end"
  }),
  selectedText: css({
    color: primaryColor,
    fontWeight: FontWeight.Bold
  }),
  addButton: css({
    width: "284px"
  }),
  deleteButton: css({
    background: buttonBackgroundDanger,
    borderColor: validationErrorColor
  }),
  detailLink: css({
    cursor: "pointer"
  })
}
