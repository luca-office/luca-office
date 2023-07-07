import {css} from "@emotion/react"
import {
  boxHeightMediumLarge,
  Flex,
  flex1,
  headerHeight,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTinier,
  spacingTiny,
  textEllipsis,
  zIndex1
} from "shared/styles"

const Sizes = {
  headerLabel: 26
}

export const monitoringDashboardStyle = {
  content: css({
    flex: flex1,
    display: "flex",
    flexDirection: "column"
  }),
  contentCard: css({
    padding: spacing(spacingLarge, spacingMedium, spacingMedium),
    width: "auto"
  }),
  flexCard: css({
    flex: flex1,
    minWidth: 0
  }),
  topGrid: css({
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gridColumnGap: spacingMedium,
    marginBottom: spacingMedium
  }),
  topCard: css({
    border: 0,
    height: `calc(100% - ${Sizes.headerLabel}px)`,
    flex: 1
  }),
  projectCardContent: css({
    padding: spacing(0, spacingMedium, spacingMedium, spacingMedium),
    width: "auto"
  }),
  projectCardText: css({
    overflowY: "auto"
  }),
  projectHeader: css(Flex.row, {
    justifyContent: "space-between",
    padding: spacing(spacingMedium, spacingMedium, spacingTiny, spacingMedium)
  }),
  projectHeaderHeading: css(Flex.row, {
    height: "100%",
    overflow: "hidden"
  }),
  projectTitle: css(textEllipsis),
  projectHeaderDuration: css(Flex.row, {
    minWidth: "fit-content"
  }),
  chartContent: css(Flex.column, {
    justifyContent: "center",
    padding: spacingMedium,
    width: "auto"
  }),
  moduleLabel: css({
    marginTop: spacingMedium,
    marginBottom: spacingTinier
  }),
  modulesGrid: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: spacingMedium,
    marginBottom: spacingMedium,
    padding: spacingSmall
  }),
  projectCardFooter: css({
    padding: spacing(spacingSmall, spacingMedium)
  }),
  eventsTableWrapper: css({
    marginBottom: spacingMedium
  }),
  eventsTable: {
    placeholder: css({
      minHeight: boxHeightMediumLarge
    })
  },
  zIndex: css({
    zIndex: zIndex1
  }),
  container: css({
    display: "flex",
    flexDirection: "row",
    overflow: "auto"
  }),
  contentWrapper: css({
    padding: 0,
    maxHeight: `calc(100vh - ${headerHeight}px)`,
    overflow: "hidden"
  }),
  loadingIndicator: css(Flex.column, {
    flex: flex1,
    justifyContent: "center",
    alignItems: "center"
  })
}
