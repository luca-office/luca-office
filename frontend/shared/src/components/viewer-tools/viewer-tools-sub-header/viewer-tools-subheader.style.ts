import {css} from "@emotion/react"
import {
  backgroundColorBright,
  Flex,
  fontColor,
  fontFamily,
  headerBoxShadow,
  spacing,
  spacingHuge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  zIndex1
} from "../../../styles"

export const viewerToolsSubheaderStyle = {
  subHeaderBar: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    background: backgroundColorBright,
    padding: spacing(spacingSmall, spacingMedium, spacingTiny),
    fontFamily: fontFamily,
    color: fontColor,
    boxSizing: "border-box",
    boxShadow: headerBoxShadow,
    zIndex: zIndex1,
    position: "relative"
  }),
  labelContainer: css({
    display: "flex",
    alignItems: "center",
    height: "100%"
  }),
  navigationButtons: css(Flex.row, {
    marginLeft: "auto"
  }),
  navigationButton: css({
    height: spacingHuge,
    width: spacingHuge,
    marginLeft: spacingSmall
  }),
  tabs: css(Flex.row, {
    overflowY: "hidden",
    overflowX: "auto",
    width: "100%",
    boxSizing: "border-box",
    paddingBottom: spacingTiny,
    paddingRight: spacingSmall
  }),
  tabContainer: css(Flex.row, {
    alignItems: "center"
  }),
  tab: css({
    marginRight: spacingSmall
  })
}
