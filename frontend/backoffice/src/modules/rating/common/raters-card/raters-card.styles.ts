import {css} from "@emotion/react"
import {
  backgroundColorLight,
  Flex,
  insetShadow,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny
} from "shared/styles"
import {ratingOverviewSizes} from "../../scoring/dashboard/scoring-dashboard.style"

export const ratersCardStyles = {
  container: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny
  }),
  card: css({
    height: ratingOverviewSizes.topContentHeight
  }),
  contentBackground: css({
    backgroundColor: backgroundColorLight,
    boxShadow: insetShadow,
    boxSizing: "border-box"
  }),
  placeholderWrapper: css(Flex.column, {
    justifyContent: "center",
    alignItems: "center",
    padding: spacing(spacingLarge, spacingMedium)
  }),
  placeholderText: css({
    marginBottom: spacingSmall
  }),
  placeholderButton: css({
    width: ratingOverviewSizes.inviteButtonWidth
  }),
  raterPapersWrapper: css({
    padding: spacing(0, spacingSmall),
    overflow: "auto"
  }),
  raterPapersContent: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: spacingSmall,
    margin: spacing(spacingSmall, 0)
  }),
  footer: css(Flex.row, {
    flexDirection: "row-reverse"
  })
}
