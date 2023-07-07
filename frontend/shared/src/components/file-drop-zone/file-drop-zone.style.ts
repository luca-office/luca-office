import {css} from "@emotion/react"
import * as React from "react"
import {
  backgroundColorLight,
  borderRadiusLarge,
  dashedBorderColor,
  errorColor,
  Flex,
  fontColor,
  FontWeight,
  primaryColor,
  spacingMedium,
  spacingSmall,
  spacingTiny
} from "../../styles"
import {DragState} from "./file-drop-zone"

const getColor = (props: DragState) => {
  if (props.isDragAccepted) {
    return primaryColor
  }
  if (props.isDragRejected) {
    return errorColor
  }
  if (props.isDragActive) {
    return primaryColor
  }
  return dashedBorderColor
}

const Size = {
  hint: 372
}

export const fileDropZoneHighlightStyle: React.CSSProperties = {
  fontWeight: "bold"
}

export const fileDropZoneStyle = {
  dragWrapper: (props: DragState, disabled: boolean) =>
    css(Flex.column, {
      flex: "1",
      alignItems: "center",
      padding: spacingMedium,
      cursor: disabled ? "not-allowed" : "pointer",
      borderWidth: "2px",
      borderRadius: borderRadiusLarge,
      borderColor: getColor(props),
      borderStyle: "dashed",
      backgroundColor: backgroundColorLight,
      color: "#bdbdbd",
      outline: "none",
      transition: "border 0.24s ease-in-out"
    }),
  selectFileButton: (isDisabled: boolean) =>
    css({
      color: isDisabled ? fontColor : primaryColor,
      fontWeight: FontWeight.Bold,
      marginTop: spacingSmall
    }),
  errorText: css({
    color: errorColor,
    marginTop: spacingTiny
  }),
  hint: css({
    maxWidth: Size.hint
  })
}
