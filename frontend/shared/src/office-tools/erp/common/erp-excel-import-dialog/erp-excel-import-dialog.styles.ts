import {css} from "@emotion/react"
import {
  backgroundColorLight,
  borderRadius,
  errorColor,
  Flex,
  FontWeight,
  spacingCard,
  spacingHuger,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  successColor,
  textEllipsis
} from "../../../../styles"

const Size = {
  modal: 908,
  fileDropZone: 120,
  loadingIndicator: 16
}

export const erpExcelImportDialogStyles = {
  modal: css({
    width: Size.modal
  }),
  header: css({
    marginBottom: spacingCard
  }),
  content: css({
    display: "grid",
    gridTemplateRows: "repeat(5, minmax(min-content, max-content))",
    gridRowGap: spacingMedium,
    marginBottom: spacingHuger
  }),
  warning: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr",
    gridColumnGap: spacingTiny
  }),
  warningText: css({
    color: errorColor
  }),
  downloadButtonWrapper: css(Flex.row),
  downloadLink: css({
    color: "initial",
    cursor: "initial",
    textDecoration: "initial"
  }),
  downloadButton: css({
    width: "initial"
  }),
  uploadErrorWrapper: css(Flex.row, {
    justifyContent: "flex-end",
    marginTop: -(spacingMedium - spacingTiny)
  }),
  fileContent: css({
    marginTop: spacingHuger + spacingSmall,
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny
  }),
  fileContentLabel: css({
    fontWeight: FontWeight.Bold
  }),
  fileChip: (didUploadFail: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns: didUploadFail
        ? "minmax(min-content, max-content) 1fr 1fr minmax(min-content, max-content)"
        : "minmax(min-content, max-content) 1fr minmax(min-content, max-content)",
      gridColumnGap: spacingTiny,
      alignItems: "center",
      padding: spacingSmall
    }),
  fileChipText: css(textEllipsis),
  fileChipRemoveIcon: css({
    cursor: "pointer"
  }),
  fileDropZoneWrapper: (uploaded: boolean, uploadSuccessful: boolean) =>
    css({
      height: Size.fileDropZone,
      boxShadow: "inset 0px 0px 4px 0px rgba(0, 0, 0, 0.16)",
      padding: spacingMedium,
      borderRadius: borderRadius,
      backgroundColor: backgroundColorLight,
      boxSizing: "border-box",
      border: !uploaded ? "initial" : `2px solid ${uploadSuccessful ? successColor : errorColor}`
    }),
  fileDropZone: css({
    height: "100%",
    boxSizing: "border-box"
  }),
  fileDropZoneDescription: css(Flex.column, {
    justifyContent: "center",
    alignItems: "center"
  }),
  fileDropZoneLoadingIndicator: css({
    width: Size.loadingIndicator,
    height: Size.loadingIndicator
  })
}
