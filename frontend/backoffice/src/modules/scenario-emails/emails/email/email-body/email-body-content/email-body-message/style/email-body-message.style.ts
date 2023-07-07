import {css} from "@emotion/react"
import {
  cardBottomColor,
  Flex,
  fontColor,
  fontColorLight,
  FontWeight,
  primaryColor,
  spacing,
  spacingHuge,
  spacingSmall,
  spacingTinier,
  spacingTiny,
  textEllipsis,
  TextSize,
  zIndex0
} from "shared/styles"

const Size = {
  label: 20,
  messageText: 272,
  actionFieldMinWidth: 300,
  modalWidth: "71vw",
  modalHeight: "92vh"
}

export const emailBodyMessageStyle = {
  marginSmallHorizontal: css({
    margin: spacing(0, spacingSmall)
  }),
  marginTinyHorizontal: css({
    margin: spacing(0, spacingTiny)
  }),
  label: css({
    fontSize: TextSize.Medium,
    fontWeight: FontWeight.Bold,
    height: Size.label,
    lineHeight: `${Size.label}px`,
    letterSpacing: 0.15,
    marginBottom: spacingTiny
  }),
  messageLabelWrapper: css({
    display: "grid",
    gridTemplateColumns: "minmax(0, max-content) minmax(min-content, max-content)",
    gridColumnGap: spacingTiny,
    alignItems: "center",
    marginBottom: spacingTiny
  }),
  messageLabel: css(textEllipsis, {
    letterSpacing: 0.15
  }),
  message: css({
    marginTop: spacingHuge + spacingSmall
  }),
  messageTextField: css({
    minHeight: Size.messageText,
    marginBottom: spacingSmall,

    ".markdown-text-field": {
      alignItems: "flex-start",
      minHeight: "100%",
      paddingLeft: spacingSmall,

      "&:hover > div:last-of-type": {
        marginTop: spacingSmall,
        marginRight: spacingSmall
      }
    },
    ".placeholder": {
      marginTop: spacingTiny
    }
  }),
  messageInput: css({
    "&, .textarea": {
      minHeight: Size.messageText,
      overflow: "hidden"
    }
  }),
  modal: css({
    width: Size.modalWidth,
    height: Size.modalHeight,
    boxSizing: "border-box"
  }),
  modalContent: css({
    display: "grid",
    gridTemplateRows: "1fr minmax(min-content, max-content)"
  }),
  modalField: css({
    height: "100%",
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    marginBottom: 0
  }),
  modalTextArea: css({
    // margin-top 1px for textarea outline
    margin: spacing(1, 0, 0, 0),
    zIndex: zIndex0,
    borderRadius: 0
  }),
  modalFooterContainer: css(Flex.row, {
    justifyContent: "space-between",
    backgroundColor: cardBottomColor,
    borderRadius: spacing(0, 0, spacingTiny, spacingTiny),
    padding: spacingSmall
  }),
  sampleCompany: (hasCompany: boolean, emailMessageHasSignature: boolean) =>
    css(textEllipsis, {
      minHeight: 0,
      minWidth: Size.actionFieldMinWidth,
      color: hasCompany ? fontColor : fontColorLight,
      boxSizing: "border-box",

      ".content-wrapper": {
        ...(emailMessageHasSignature && {
          borderStyle: "solid",
          borderColor: primaryColor,
          borderWidth: spacingTinier
        })
      }
    }),
  sampleCompanyIcon: css({
    marginRight: spacingSmall
  }),
  sampleCompanyLabel: css({
    marginLeft: spacingSmall
  })
}
