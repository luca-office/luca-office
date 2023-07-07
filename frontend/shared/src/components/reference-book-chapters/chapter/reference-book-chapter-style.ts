import {css} from "@emotion/react"
import {
  backgroundColor,
  buttonHeight,
  contentListMinHeightSmall,
  contentListPlaceholderHeightSmall,
  Flex,
  fontColor,
  fontColorLight,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingTiny,
  tocFooterHeight
} from "../../../styles"

export const chapterStyles = {
  row: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }),
  card: css({
    borderColor: backgroundColor,
    height: `calc(100vh - ${buttonHeight}px - ${tocFooterHeight}px)`
  }),
  header: css({
    display: "flex",
    justifyContent: "space-between"
  }),
  headerInfo: css({
    color: fontColorLight
  }),
  headerButton: css({
    marginLeft: spacingMedium
  }),
  scrollable: css({
    overflowY: "auto"
  }),
  content: css({
    padding: spacing(spacingMedium, spacingMedium, spacingMedium, spacingLarge)
  }),
  headline: css({
    marginBottom: spacingMedium
  }),
  text: (isBundled: boolean) =>
    css({
      marginBottom: spacingLarge,
      color: isBundled ? fontColorLight : fontColor
    }),
  label: (isBundled: boolean) =>
    css({
      marginBottom: spacingTiny,
      color: isBundled ? fontColorLight : fontColor
    }),
  loader: css({
    margin: `${spacingLarge}px auto`
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
  table: css({
    minHeight: contentListMinHeightSmall,

    ".table-placeholder": {
      minHeight: contentListPlaceholderHeightSmall
    }
  })
}
