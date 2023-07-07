import {css} from "@emotion/react"
import {
  borderRadiusLarge,
  buttonBackgroundDanger,
  cardBottomColor,
  contentWidth,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall
} from "../../styles"

export const modalStyle = {
  wrapper: css({
    minWidth: contentWidth,
    minHeight: 200,
    background: "white",
    borderRadius: borderRadiusLarge,
    padding: `${spacingMedium}px ${spacingLarge}px`,
    display: "flex",
    flexDirection: "column"
  }),
  closeIcon: css({
    cursor: "pointer"
  }),
  heading: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingMedium
  }),
  content: css({
    flex: 1
  }),
  footer: (hasOnlyConfirmButton: boolean) =>
    css({
      display: "flex",
      alignItems: "center",
      justifyContent: hasOnlyConfirmButton ? "center" : "flex-end",
      width: "100%"
    }),
  emptyFooter: css({
    padding: spacing(spacingSmall, spacingLarge),
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: cardBottomColor
  }),
  button: css({
    width: "auto",
    minWidth: 165
  }),
  confirmButton: css({
    marginRight: spacingMedium
  }),
  dismissButton: (hasDeleteButton: boolean) =>
    css({
      marginLeft: hasDeleteButton ? spacingMedium : 0
    }),
  deleteButton: css({
    background: buttonBackgroundDanger,
    paddingLeft: spacingMedium,
    paddingRight: spacingMedium,
    marginRight: "auto"
  })
}
