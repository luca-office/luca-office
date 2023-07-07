import {css} from "@emotion/react"
import {
  backgroundColor,
  boxHeightLarge,
  contentWidth,
  Flex,
  headerHeight,
  spacing,
  spacingHuge,
  spacingMedium,
  spacingSmall
} from "../../styles"

const Size = {
  header: headerHeight + 2 * spacingSmall,
  footer: 10
}
const Spacing = {
  // The spacing consists of the header, the tools-header, the tools-subheader,
  // the padding of the tools-subheader, the padding of the content wrapper,
  // the height of the footer and the height of the taskbar
  card: 3 * headerHeight + 2 * spacingSmall + 2 * spacingMedium + boxHeightLarge + Size.footer
}

export const referenceBookToolStyle = {
  window: css(Flex.column, {justifyContent: "space-between"}),
  bar: css({
    flex: "0 0 content"
  }),
  footer: css({
    height: "auto"
  }),
  content: css({
    display: "grid",
    flex: "1 1 auto",
    gridTemplateColumns: "350px minmax(0, 4fr)",
    gridColumnGap: spacingMedium,
    overflow: "hidden",
    margin: spacing(spacingMedium, spacingHuge)
  }),
  card: css({
    maxHeight: `calc(100vh - ${Spacing.card}px)`,
    overflow: "hidden"
  }),
  cardContentWrapper: css({
    userSelect: "text",

    ".card-content": {
      overflow: "auto"
    }
  }),
  tableOfContentsCard: css({
    borderColor: backgroundColor,
    maxWidth: "initial",
    minWidth: contentWidth,

    ".card-header": {
      minHeight: Size.header
    },

    ".book-chapters-list": {
      overflow: "auto"
    }
  })
}
