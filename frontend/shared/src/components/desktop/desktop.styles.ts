import {css} from "@emotion/react"
import {CalculatorSizes} from "../../office-tools"
import {ChatSizes} from "../../office-tools/chat/chat"
import {
  backgroundColor,
  backgroundColorBright,
  boxHeightLarge,
  Flex,
  headerHeight,
  spacingTiny,
  zIndex1
} from "../../styles"

const Size = {
  taskbar: boxHeightLarge
}

export const styles = {
  container: css({
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: backgroundColor
  }),
  header: css({
    flex: "0 0 auto"
  }),
  contentWrapper: css(Flex.column, {
    flex: "1 1 auto"
  }),
  content: css({
    flex: "1 1 auto",
    position: "relative",
    height: `calc(100% - ${Size.taskbar}px)`
  }),
  taskbarWrapper: css({
    position: "relative",
    height: Size.taskbar,
    overflow: "hidden"
  }),
  fullScreenWindow: css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  }),
  nonFullScreenWindow: css({
    position: "absolute",
    top: "30vh",
    left: "50vw"
  }),
  calculatorWindow: css({
    top: CalculatorSizes ? `calc(30vh - ${CalculatorSizes.window.height / 2 - headerHeight}px)` : "30vh"
  }),
  chatWindow: css({
    left: `calc(50% - ${ChatSizes.window.width / 2}px)`,
    top: `calc(50% - ${ChatSizes.window.height / 2 - headerHeight}px)`
  }),
  hiddenWindow: css({
    display: "none"
  }),
  zIndex: (index: number) =>
    css({
      zIndex: index >= 0 ? (index + 1) * 10 : -1
    }),
  questionnaireWindow: css(Flex.column, {
    width: 900,
    maxHeight: "90vh",
    backgroundColor: backgroundColorBright
  }),
  placeholderContainer: css(Flex.column, {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
    zIndex: zIndex1
  }),
  placeholder: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny,
    width: 396
  }),
  placeholderText: css({
    textAlign: "center"
  }),
  backgroundOverlay: css({
    position: "relative",
    height: `calc(100vh - ${headerHeight}px)`
  }),
  backgroundOverlayContentWrapper: css({
    zIndex: "initial"
  }),
  backgroundOverlayContent: css({
    position: "relative",
    height: `calc(100vh - ${headerHeight}px)`
  }),
  contentBody: css({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }),
  eventQuestionnaireOverlay: css({
    position: "absolute"
  })
}
