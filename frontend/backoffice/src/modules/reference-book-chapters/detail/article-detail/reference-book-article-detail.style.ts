import {css} from "@emotion/react"
import {
  boxHeightMedium,
  contentListMinHeight,
  contentListMinHeightSmall,
  contentListPlaceholderHeight,
  contentListPlaceholderHeightSmall,
  Flex,
  fontColor,
  fontColorLight,
  iconDefaultColor,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  textEllipsis
} from "shared/styles"

export const bookArticleStyles = {
  card: css`
    width: 100%;
    overflow: auto;
  `,
  header: css({
    display: "flex",
    justifyContent: "space-between"
  }),
  title: css({
    display: "flex",
    alignItems: "center"
  }),
  titleHeadingWrapper: css({
    overflow: "hidden",
    marginRight: spacingSmall
  }),
  titleHeading: css(textEllipsis),
  icon: css({
    marginRight: spacingSmall
  }),
  deleteIcon: css({
    marginLeft: spacingSmall
  }),
  content: css({
    padding: spacing(spacingMedium, spacingLarge),
    overflowY: "auto"
  }),
  subheader: css({
    margin: `${spacingMedium}px 0px`
  }),
  tableWrapper: css({
    marginTop: spacingTiny
  }),
  table: (isFinalized: boolean) =>
    css({
      minHeight: isFinalized ? contentListMinHeightSmall : contentListMinHeight,

      ".table-placeholder": {
        minHeight: isFinalized ? contentListPlaceholderHeightSmall : contentListPlaceholderHeight
      }
    }),
  description: css({
    marginLeft: -spacingSmall
  }),
  paddingLeftZero: css({
    "form div": {
      paddingLeft: 0
    }
  }),
  bottomMarginLarge: css({
    marginBottom: spacingLarge
  }),
  markdownPlaceholder: css({
    "&:hover": {
      ".article-text-placeholder > .article-text-placeholder-icon > svg > g > g": {
        stroke: iconDefaultColor
      },
      ".article-text-placeholder > .article-text-placeholder-heading": {
        color: fontColor
      }
    }
  }),
  placeholderContainer: css(Flex.column, {
    height: "100%",
    justifyContent: "center",
    textAlign: "center"
  }),
  hint: css({
    marginTop: spacingTiny,
    color: fontColorLight
  }),
  tableHeaderRow: css({
    padding: spacingSmall
  }),
  tableRowHeight: css({
    height: boxHeightMedium
  })
}
