import {css} from "@emotion/react"
import {mediumBoxShadow, spacing, spacingTinier} from "../../styles"

export const scoringOverlayStyles = {
  scoringContentWrapper: css({
    minHeight: "initial",
    overflow: "hidden"
  }),
  scoringRatingDetailContent: css({
    overflow: "hidden"
  }),
  scoringRatingDetailContentContainer: css({
    overflow: "hidden"
  }),
  scoringRatingContent: css({
    gridTemplateColumns: "1fr 2fr",
    width: `calc(100% - ${spacingTinier}px)`,
    marginLeft: "auto",
    marginRight: "auto"
  }),
  scoringRatingCard: css({
    "&, &:hover": {
      boxShadow: mediumBoxShadow
    },
    overflow: "auto",
    marginBottom: spacingTinier
  }),
  scoringRatingCardHeader: css({
    margin: spacing(0, -1)
  }),
  scoringRatingLoadingIndicator: css({
    width: "100%",
    height: "100%",
    boxSizing: "border-box"
  })
}
