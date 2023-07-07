import {css} from "@emotion/react"
import {
  fontColor,
  headerBoxShadow,
  primaryColor,
  spacing,
  spacingHuge,
  spacingMedium,
  spacingSmall,
  TextSize
} from "../../styles"

const Size = {
  header: 48,
  button: 292
}
const Color = {
  white: "#ffffff"
}

export const detailViewHeaderStyle = {
  header: css({
    display: "grid",
    gridTemplateColumns: "1fr max-content 1fr",
    gridGap: spacingMedium,
    alignItems: "center",
    boxShadow: headerBoxShadow,
    height: Size.header,
    backgroundColor: Color.white,
    padding: spacing(spacingSmall, spacingHuge),
    boxSizing: "border-box"
  }),
  label: css({
    color: primaryColor,
    fontWeight: "bold",
    fontSize: TextSize.Medium,
    gridColumn: 2
  }),
  button: css({
    fontSize: TextSize.Medium
  }),
  navigationButton: css({
    width: "fit-content",
    color: fontColor,
    padding: 0,
    borderRadius: "initial",
    background: "initial"
  }),
  navigationButtonIcon: css({
    marginRight: spacingSmall
  }),
  navigationButtonLabel: css({
    fontWeight: "normal"
  }),
  operationButton: css({
    width: Size.button
  }),
  secondOperationButton: css({
    marginLeft: spacingSmall
  }),
  deleteButton: css({
    marginLeft: spacingSmall
  }),
  buttonWrapper: css({
    marginLeft: "auto"
  })
}
