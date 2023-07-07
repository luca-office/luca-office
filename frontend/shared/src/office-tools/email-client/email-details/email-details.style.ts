import {css} from "@emotion/react"
import {
  backgroundColorBright,
  border,
  borderRadius,
  borderRadiusSmall,
  buttonBackgroundDanger,
  cardBottomColor,
  deepShadow,
  Flex,
  fontColor,
  fontFamily,
  FontWeight,
  headerBoxShadow,
  inputHeight,
  spacing,
  spacingHuge,
  spacingHuger,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingSmaller,
  spacingTiny,
  TextSize,
  zIndex0,
  zIndex1,
  zIndex2
} from "../../../styles"

export const styles = {
  container: css({
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius,
    backgroundColor: backgroundColorBright
  }),
  content: css({
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  }),
  header: css(Flex.row, {
    flex: "0 0 auto",
    backgroundColor: cardBottomColor,
    height: spacingHuger,
    minHeight: spacingHuger,
    boxShadow: headerBoxShadow,
    borderRadius: spacing(borderRadius, borderRadius, 0, 0),
    padding: spacing(0, spacingMedium, 0, spacingMedium),
    justifyContent: "space-between",
    position: "relative",
    zIndex: zIndex2
  }),
  trashButton: css({
    background: buttonBackgroundDanger,
    marginLeft: spacingSmall,
    border: "none"
  }),
  headerSlot: css(Flex.row, {}),
  sender: css({
    fontFamily,
    fontSize: TextSize.Medium,
    color: fontColor,
    marginLeft: spacingSmall
  }),
  info: css(Flex.column, {
    flex: "0 0 auto",
    padding: spacing(spacingMedium, spacingLarge),
    fontFamily,
    fontSize: TextSize.Medium,
    color: fontColor,
    boxShadow: headerBoxShadow,
    backgroundColor: backgroundColorBright,
    position: "relative",
    zIndex: zIndex1
  }),
  infoSenderRow: css(Flex.row, {
    justifyContent: "space-between"
  }),
  infoSenderRowEdit: css(Flex.row, {
    marginBottom: spacingSmall,
    ".autocomplete-container": css({flexGrow: 1})
  }),
  infoSenderLabel: css({
    fontWeight: FontWeight.Bold,
    fontSize: TextSize.Medium
  }),
  infoSenderLabelEdit: css({
    fontWeight: FontWeight.Bold,
    fontSize: TextSize.Medium,
    width: spacing(85),
    marginRight: spacingSmall
  }),
  editTextInput: css({
    flex: "1 1 auto",

    "> div": {
      "> input": {
        height: inputHeight,
        lineHeight: `${inputHeight}px`
      }
    }
  }),
  editRecipientTextInput: css({
    marginRight: spacingHuge,
    "> div": {
      marginRight: 0,

      "> input ~ div": {
        marginRight: 0
      }
    }
  }),
  recipientAutocompleteList: css({
    borderRadius: borderRadiusSmall,
    border: border(1, "rgb(222, 222, 222)"),
    boxShadow: deepShadow
  }),
  infoSubject: css({
    marginTop: spacingTiny
  }),
  infoRecipient: css({
    marginTop: spacingLarge
  }),
  infoCc: css({marginBottom: spacingTiny}),
  message: css({
    flex: "1 1 auto",
    minHeight: 150,
    display: "flex",
    flexDirection: "column",
    padding: spacing(spacingMedium, spacingMedium),
    fontFamily,
    fontSize: TextSize.Medium,
    whiteSpace: "pre-wrap",
    position: "relative",
    zIndex: zIndex0,
    overflowY: "auto"
  }),
  textArea: css({
    flex: "1 1 auto",
    width: "100%",
    padding: spacingSmall,
    boxSizing: "border-box",
    fontFamily,
    fontSize: TextSize.Medium,
    outline: "none",
    resize: "none",
    backgroundColor: cardBottomColor,
    borderRadius,
    border: "none",
    textIndent: spacingTiny
  }),
  addFiles: css({
    flex: "0 0 auto",
    margin: spacing(0, spacingMedium),
    overflow: "auto"
  }),
  noEmailPlaceholder: css({
    fontFamily,
    fontSize: TextSize.Medium,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }),
  footer: css({
    backgroundColor: cardBottomColor,
    height: spacingMedium,
    borderRadius: spacing(0, 0, borderRadius, borderRadius)
  }),
  selectionFooter: css({
    marginLeft: spacingSmall
  })
}
