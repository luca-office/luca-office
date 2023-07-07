import {css} from "@emotion/react"
import {
  border,
  borderColor,
  borderRadius,
  borderRadiusSmall,
  buttonHeight,
  errorColor,
  Flex,
  fontColor,
  fontColorLight,
  spacing,
  spacingHuge,
  spacingMedium,
  spacingSmall,
  spacingTinier,
  spacingTiny,
  TextSize
} from "shared/styles"

const Size = {
  headerButton: {width: 252},
  footerButton: {width: 292},
  footer: buttonHeight + 2 * spacingMedium,
  answerInput: spacingHuge,
  checkbox: 14
}

export const questionnaireDetailStyles = {
  answerHeader: css(Flex.row, {
    justifyContent: "space-between"
  }),
  contentContainer: css(Flex.column, {
    boxSizing: "border-box",
    overflowY: "auto",
    flexBasis: 0
  }),
  gridWrapper: css(Flex.row, {
    alignItems: "stretch",
    flex: "1 1 auto",
    overflowY: "auto"
  }),
  grid: css({
    width: "100%",
    display: "grid",
    gap: spacingMedium,
    gridTemplateColumns: "350px minmax(0, 4fr)"
  }),
  detailCard: css({
    overflow: "hidden"
  }),
  tableOfContent: css({
    overflowY: "auto",
    marginRight: spacingMedium,
    minWidth: 0
  }),
  smallColumn: css({
    display: "flex",
    justifyContent: "flex-end",
    flex: "0 0 40px",
    padding: 0
  }),
  iconColumn: css({
    display: "flex",
    justifyContent: "center",
    flex: "0 0 24px",
    paddingLeft: spacingTinier
  }),
  buttonColumn: css({
    display: "flex",
    justifyContent: "flex-end",
    flex: "0 0 150px",
    padding: 0,
    borderRadius: borderRadius
  }),
  scoreColumn: css({
    display: "flex",
    flex: "0 0 130px",
    padding: spacing(spacingSmall, spacingSmall, spacingSmall, 0)
  }),
  scoreHeader: css({
    flex: "0 0 120px"
  }),
  emptyColumn: css({
    display: "flex",
    justifyContent: "flex-end",
    flex: "0 0 0",
    padding: 0
  }),
  answerWrapper: css({
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: "auto"
  }),
  answerInput: css({
    border: border(1, borderColor),
    borderRadius: borderRadiusSmall,
    height: Size.answerInput,

    "form > div": {
      height: Size.answerInput
    },

    input: {
      fontSize: TextSize.Medium
    }
  }),
  answerIcon: css({
    position: "absolute",
    right: spacingSmall
  }),
  textStyle: (hasContent: boolean) =>
    css({
      color: hasContent ? fontColor : errorColor,
      fontSize: TextSize.Medium
    }),
  answerColumnCheckbox: css({
    marginRight: spacingSmall,

    "> div": {
      width: Size.checkbox,
      height: Size.checkbox
    }
  }),
  disabledFreeTextWrapper: css({
    position: "relative"
  }),
  disabledFreeText: css({
    border: `1px solid ${borderColor}`,
    borderRadius: borderRadiusSmall
  }),
  textareaIcon: css({
    top: spacingSmall
  }),
  plainText: css({
    minHeight: 20
  }),
  checkBox: css({
    marginRight: spacingSmall
  }),
  placeholder: css({
    color: fontColorLight,
    border: `1px solid ${borderColor}`,
    borderRadius: borderRadiusSmall,
    padding: spacing(spacingTiny, spacingSmall)
  }),
  radioButton: css({
    marginRight: spacingSmall
  })
}
