import {css} from "@emotion/react"
import {
  buttonBackgroundDanger,
  errorColor,
  Flex,
  fontColorLight,
  FontWeight,
  primaryColor,
  spacingSmall,
  TextSize
} from "shared/styles"

const Size = {
  metaContentBoxShadowOffsetY: 1,
  button: 20,
  binaryViewer: {width: "70vw", height: 743},
  paper: "15vh",
  minPaper: 150
}

export const DetailViewBinaryStyles = {
  contentWidth: css({
    width: `calc(100% - ${2 * Size.metaContentBoxShadowOffsetY}px)`,
    marginLeft: `${Size.metaContentBoxShadowOffsetY}px`
  }),
  content: css({
    flex: "1 1 auto"
  }),
  removeOverlay: (isDisabled: boolean) =>
    css(Flex.column, {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      visibility: isDisabled ? "hidden" : "visible",
      left: 0,
      backgroundColor: "rgba(46, 48, 50, 0.48)",
      color: "white",
      justifyContent: "flex-end",
      alignItems: "flex-end"
    }),
  wrapper: css({
    margin: 0,
    alignSelf: "center",

    "&:not(:hover) .remove-overlay": {
      display: "none"
    }
  }),
  deleteButton: css({
    background: buttonBackgroundDanger,
    borderColor: errorColor,
    margin: spacingSmall
  }),
  paper: (hasFile: boolean) =>
    css(Flex.row, {
      justifyContent: "center",
      alignItems: "center",
      boxSizing: "content-box",
      height: Size.paper,
      minHeight: Size.minPaper,
      ...(hasFile && {boxShadow: "none"})
    }),
  binaryContentWrapper: css(Flex.column, {
    width: "100%",
    maxHeight: "100%"
  }),
  editControl: css({
    marginTop: spacingSmall,
    alignSelf: "flex-end"
  }),
  editControlButton: css({
    padding: 0,
    background: "initial",
    width: "initial",
    borderRadius: 0,
    color: primaryColor,
    height: Size.button,
    lineHeight: `${Size.button}px`,
    fontSize: TextSize.Medium,
    fontWeight: FontWeight.Bold,

    ":disabled": {
      color: fontColorLight,
      background: "transparent"
    }
  }),
  binaryViewer: css({
    width: Size.binaryViewer.width,
    height: Size.binaryViewer.height
  })
}
