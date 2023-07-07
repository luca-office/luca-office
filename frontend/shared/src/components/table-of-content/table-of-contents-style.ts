import {css} from "@emotion/react"
import {
  boxHeightMediumLarge,
  contentHeight,
  Flex,
  fontColorLight,
  spacing,
  spacingHuger,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  tocFlexSizing
} from "../../styles"

export const tocStyles = {
  card: css({
    flex: tocFlexSizing,
    width: "100%",
    height: "auto"
  }),
  cardHeader: css({
    justifyContent: "space-between",
    flex: `0 0 ${boxHeightMediumLarge}px`
  }),
  headerButtons: css(Flex.row, {
    "> *": {
      marginLeft: spacingSmall
    }
  }),
  button: css({
    width: "100%"
  }),
  settings: css({
    padding: spacing(spacingTiny, spacingSmall)
  }),
  settingsHeader: css({
    marginBottom: spacingTiny
  }),
  content: css({
    padding: spacingMedium,
    flex: 1,
    // - spacing - header - footer
    height: `calc(100% - 2* ${spacingMedium}px - ${spacingHuger}px - ${spacingLarge}px)`
  }),
  children: css({
    marginTop: spacingSmall
  }),
  cardContent: css({
    height: "100%",
    overflow: "auto"
  }),
  cardContentCentered: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center"
  }),
  placeholder: css(Flex.column, {
    margin: "auto",
    textAlign: "center",
    minHeight: contentHeight,
    justifyContent: "center"
  }),
  hint: css({
    marginTop: spacingTiny,
    color: fontColorLight
  }),
  marginRightMedium: css({
    marginRight: spacingMedium
  })
}
