import {css} from "@emotion/react"
import {
  Flex,
  FontWeight,
  primaryColor,
  spacing,
  spacingHeader,
  spacingLarge,
  spacingMedium,
  TextSize
} from "shared/styles"

export const styles = {
  contentContainer: css({
    padding: 0,
    marginBottom: 70
  }),
  contentContainerPlaceholder: css({
    display: "flex",
    flexDirection: "column"
  }),
  contentOverwrite: css({
    ".bottom-action-bar": {
      position: "fixed",
      bottom: 0,
      width: "100%"
    }
  }),

  subheader: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 3fr",
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
    width: 284
  })
}
