import {css} from "@emotion/react"
import {headerHeight, spacing, spacingHuge, spacingMedium, spacingSmall} from "shared/styles"

const Spacing = {
  // The content-card spacing consists of the header, the sub-header and its padding and the padding of the content
  contentCard: 2 * headerHeight + 2 * spacingSmall + 2 * spacingMedium
}

export const filesDirectoriesStyles = {
  wrapper: css({
    display: "flex",
    flexDirection: "column",
    height: `calc(100vh - ${headerHeight}px)`
  }),
  content: css({
    flex: "1 1 auto",
    display: "grid",
    gap: spacingMedium,
    gridTemplateColumns: "350px minmax(0, 3fr)",
    padding: spacing(spacingMedium, spacingHuge)
  }),
  card: css({
    maxHeight: `calc(100vh - ${Spacing.contentCard}px)`
  }),
  cardContent: css({
    overflow: "auto"
  }),
  preview: css({
    width: "90vw",
    height: "90vh"
  })
}
