import {css} from "@emotion/react"
import {
  Flex,
  flex1,
  fontColorLight,
  headerHeight,
  spacingMedium,
  subHeaderHeight,
  zIndex1,
  zIndexSlideMenu
} from "../../styles"

export const ratingDetailStyles = {
  fullWidth: css({
    width: "100%"
  }),
  content: css({
    display: "flex",
    flex: "1 1 auto",
    overflow: "auto",
    gap: spacingMedium
  }),
  contentContainer: css(Flex.column, {
    maxHeight: `calc(100vh - ${headerHeight + subHeaderHeight}px)`,
    boxSizing: "border-box",
    isolation: "isolate"
  }),
  noPadding: css({
    padding: 0
  }),
  tableOfContent: css({
    marginRight: spacingMedium,
    minWidth: 0
  }),
  titleText: css({
    color: fontColorLight
  }),
  snapshot: css({
    flex: flex1,
    height: "auto"
  }),
  header: css({
    zIndex: zIndex1
  }),
  slideMenu: css({
    zIndex: zIndexSlideMenu
  }),
  ratingContent: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr",
    gridColumnGap: spacingMedium
  }),
  desktopContainer: css({
    display: "flex",
    minWidth: "100%"
  })
}
