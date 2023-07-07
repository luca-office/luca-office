import {css} from "@emotion/react"
import {
  buttonHeight,
  cardBottomColor,
  cardBoxShadow,
  Flex,
  fontColor,
  fontColorLight,
  FontWeight,
  inputHeight,
  spacing,
  spacingHuge,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"

export const codingCriteriaCardStyles = {
  card: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) minmax(0, 1fr) minmax(min-content, max-content)",
    boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.24)",
    overflow: "auto"
  }),
  header: css(Flex.row, {
    padding: spacing(spacingSmall, spacingSmall, spacingSmall, spacingMedium),
    backgroundColor: cardBottomColor,
    boxShadow: cardBoxShadow
  }),
  headerLabel: css({
    flex: "1 1 auto",
    height: buttonHeight,
    lineHeight: `${buttonHeight}px`
  }),
  headerButton: css({
    flex: "0 0 auto",
    marginLeft: spacingMedium,
    border: "none",
    background: "transparent",

    "svg > g > g": {
      stroke: fontColor
    }
  }),
  textLabel: css({
    fontWeight: FontWeight.Bold
  }),
  labeledContent: css({
    display: "grid",
    gridRowGap: spacingTiny,
    gridTemplateRows: "minmax(min-content, max-content) minmax(0, 1fr)"
  }),
  content: css({
    position: "relative",
    overflow: "auto"
  }),
  contentWrapper: css({
    width: "100%",
    height: "100%",
    padding: spacingLarge,
    boxSizing: "border-box",
    display: "grid",
    gridRowGap: spacingHuge + spacingSmall,
    gridTemplateRows: "minmax(min-content, max-content) minmax(min-content, max-content)"
  }),
  pointsCard: css({
    padding: spacingMedium
  }),
  pointInputWrapper: css(Flex.row, {
    marginTop: spacingMedium
  }),
  pointInput: css({
    width: 80
  }),
  pointInputLabel: css({
    fontSize: TextSize.Medium,
    letterSpacing: 0,
    marginLeft: spacingSmall
  }),
  descriptionTextArea: css({
    height: 3 * inputHeight,
    resize: "none"
  }),
  placeholder: css(Flex.column, {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  }),
  placeholderLabel: css({
    letterSpacing: 0.15
  }),
  placeholderSubLabel: css({
    color: fontColorLight,
    letterSpacing: 0,
    marginTop: spacingTiny
  }),
  footer: css(Flex.row, {
    backgroundColor: cardBottomColor,
    padding: spacing(spacingMedium, spacingSmall, spacingMedium, spacingMedium)
  }),
  footerContent: css({
    flex: "1 1 auto"
  }),
  footerContentWrapper: css(Flex.row, {
    justifyContent: "space-between"
  }),
  footerContentText: css({
    fontSize: TextSize.Medium,
    letterSpacing: 0
  }),
  footerContentPoints: css({
    marginLeft: spacingSmall
  }),
  footerControls: css(Flex.row, {
    flex: "0 0 auto",
    marginLeft: spacingMedium,

    "Button:not(:last-of-type)": {
      marginRight: spacingSmall
    }
  })
}
