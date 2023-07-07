import {css} from "@emotion/react"
import {Flex, fontColorLight, spacing, spacingHuge, spacingMedium, spacingSmall, spacingTiny} from "shared/styles"

export const ReportingOverviewSize = {
  scorePaper: 260,
  progressBar: 16
}

export const reportingOverviewStyles = {
  content: css({
    padding: spacing(spacingMedium, spacingHuge),
    overflow: "hidden"
  }),
  loadingIndicator: css({
    height: "100%",
    boxSizing: "border-box"
  }),
  card: css({
    height: "100%"
  }),
  cardContent: css({
    display: "grid",
    gridTemplateRows: "repeat(3, minmax(min-content, max-content)) 1fr",
    gridRowGap: spacingMedium,
    justifyContent: "stretch",
    padding: spacingMedium,
    boxSizing: "border-box",
    overflow: "hidden"
  }),
  cardFooter: css({
    height: "initial",
    // use negative margin to get rid of white spacing
    margin: spacing(0, -1, -1, -1)
  }),
  placeholder: css(Flex.column, {
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  }),
  placeholderLabel: css({
    color: fontColorLight
  }),
  dataContentWrapper: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny
  }),
  metadata: css({
    marginTop: spacingMedium
  }),
  rating: css({
    marginTop: spacingSmall,
    overflow: "hidden"
  })
}
