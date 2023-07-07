import {css} from "@emotion/react"
import {
  backgroundColorLight,
  borderRadius,
  boxHeightLarge,
  boxHeightMediumLarge,
  Flex,
  flex0,
  flex1,
  FontWeight,
  headerHeight,
  insetShadow,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  zIndex1
} from "shared/styles"

export const ratingOverviewSizes = {
  topContentHeight: 180,
  inviteButtonWidth: 395
}

const spacings = {
  // header height - sub-header height (+ padding) - content padding - footer height (+ padding)
  wrapper: 2 * headerHeight + 2 * spacingSmall + 2 * spacingMedium + boxHeightLarge + 2 * spacingTiny
}

export const styles = {
  container: css(Flex.column, {
    overflow: "hidden",
    maxHeight: `calc(100vh - ${spacings.wrapper}px)`
  }),
  contentCard: css({
    flex: flex1
  }),
  header: css({
    zIndex: zIndex1
  }),
  footer: css(Flex.row, {
    width: "100%"
  }),
  footerTextContainer: css(Flex.row, {
    height: boxHeightMediumLarge,
    backgroundColor: backgroundColorLight,
    boxShadow: insetShadow,
    borderRadius: borderRadius,
    padding: spacing(0, spacingLarge)
  }),
  footerIcon: css({
    marginRight: spacingSmall
  }),
  withMargin: css({
    marginRight: spacingMedium
  }),
  growing: css({
    flexGrow: 1,
    justifyContent: "space-between"
  }),
  contentTop: css(Flex.row, {
    flex: flex0,
    justifyContent: "space-between"
  }),
  cardContent: css({
    padding: spacingMedium,
    boxSizing: "border-box",
    justifyContent: "flex-start",
    overflow: "hidden",
    maxHeight: `calc(100vh - ${spacings.wrapper + spacingTiny}px)`
  }),
  ratersCard: css({
    flex: flex1,
    marginRight: spacingMedium,
    height: "100%"
  }),
  label: css({
    fontWeight: FontWeight.Bold,
    marginBottom: spacingTiny
  }),
  contentBottom: css(Flex.column, {
    flex: flex1,
    marginTop: spacingLarge,
    overflow: "hidden",
    gridTemplateRows: "initial",
    gridRowGap: "initial"
  }),
  tableHeader: css({
    flex: flex0,
    marginBottom: spacingTiny
  }),
  tableContent: css({
    flex: flex1,
    overflow: "hidden"
  }),
  loadingIndicatorContainer: css(Flex.column, {
    flex: flex1,
    justifyContent: "center",
    alignItems: "center"
  })
}
