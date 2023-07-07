import {css} from "@emotion/react"
import {
  backgroundColorBright,
  border,
  borderColor,
  borderRadius,
  borderRadiusSmall,
  Flex,
  FontWeight,
  inputHeight,
  primaryColor,
  spacing,
  spacingCard,
  spacingLarge,
  spacingSmall,
  spacingTiny,
  textEllipsis
} from "../../styles"

export const binaryUploadInputStyles = {
  binaryInputWrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr minmax(min-content, max-content)",
    gridColumnGap: spacingSmall,
    alignItems: "center"
  }),
  binaryInput: css(Flex.row, {
    backgroundColor: backgroundColorBright,
    border: border(2, borderColor),
    borderRadius: borderRadiusSmall,
    height: inputHeight,
    boxSizing: "border-box",
    padding: spacing(spacingTiny, spacingSmall)
  }),
  binaryInputLabel: (color: string) =>
    css(textEllipsis, {
      color,
      marginLeft: spacingSmall,
      userSelect: "none"
    }),
  binaryPaper: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr minmax(min-content, max-content)",
    gridColumnGap: spacingSmall,
    alignItems: "center",
    padding: spacing(0, spacingCard),
    height: inputHeight,
    boxSizing: "border-box",
    cursor: "pointer"
  }),
  binaryPaperLabel: css(textEllipsis),
  binaryPaperSelectable: css({
    cursor: "pointer",

    "&:hover": {
      opacity: 0.8
    }
  }),
  binaryPreviewLabel: css({
    color: primaryColor,
    fontWeight: FontWeight.Bold
  }),
  viewerTool: css({
    height: "80vh",
    width: "80vh"
  }),
  viewerToolPlaceholder: css({
    padding: spacingLarge,
    backgroundColor: "white",
    borderRadius: borderRadius
  })
}
