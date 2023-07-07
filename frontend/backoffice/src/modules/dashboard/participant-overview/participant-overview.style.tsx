import {css} from "@emotion/react"
import {
  boxHeightSmaller,
  cardBottomColor,
  Flex,
  flex1,
  spacing,
  spacingHuger,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  TextSize
} from "shared/styles"

export const participantOverviewStyle = {
  content: css({
    flex: flex1,
    display: "flex",
    flexDirection: "column"
  }),
  contentCard: css({
    gap: spacingMedium,
    justifyContent: "unset",
    width: "auto",
    padding: spacing(spacingLarge, spacingMedium, spacingHuger, spacingMedium)
  }),
  informationCard: css(Flex.row, {
    display: "grid",
    padding: spacingMedium,
    gridColumnGap: spacingMedium,
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    boxShadow: "inset 0px 0px 4px 0px rgba(0, 0, 0, 0.16)",
    backgroundColor: cardBottomColor,

    ":hover": {
      boxShadow: "inset 0px 0px 4px 0px rgba(0, 0, 0, 0.16)"
    }
  }),
  headerButton: css({
    fontSize: TextSize.Medium,
    width: 292
  }),
  emptyFooter: css({
    padding: "unset",
    height: boxHeightSmaller
  }),
  footerItem: css({
    flex: "1 1 0"
  }),
  lastFooterItem: css({
    flex: `0 0 ${spacingSmall}`
  }),
  footerIcon: css({marginRight: spacingSmall}),
  cardHeader: css({justifyContent: "space-between"}),
  cardHeaderIcon: css({
    marginRight: spacingSmall
  }),
  loadingIndicator: css(Flex.column, {
    flex: flex1,
    justifyContent: "center",
    alignItems: "center"
  }),
  tokenWrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr minmax(min-content, max-content)",
    gridColumnGap: spacingSmall,
    alignItems: "center",
    cursor: "pointer",

    "&:hover > .copy-icon": {
      display: "initial"
    }
  }),
  tokenCopyIcon: css({
    display: "none"
  })
}
