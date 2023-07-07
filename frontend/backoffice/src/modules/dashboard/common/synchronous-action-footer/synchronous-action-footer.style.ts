import {css} from "@emotion/react"
import {
  backgroundColorLight,
  border,
  Flex,
  flex1,
  primaryColor,
  shadowedCard,
  spacing,
  spacingHuger,
  spacingMedium,
  spacingSmall
} from "shared/styles"

const Sizes = {
  button: 227
}

export const styles = {
  container: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr minmax(0,2fr) auto",
    gridAutoFlow: "column",
    gap: spacingMedium,
    width: "100%",
    alignItems: "center"
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  footerEntry: css(shadowedCard, Flex.row, {
    padding: spacing(0, spacingMedium),
    height: spacingHuger
  }),
  footerEntryRow: css(Flex.row, {
    minWidth: 0,
    flex: flex1,
    flexBasis: 0
  }),
  button: css({
    marginLeft: "auto",
    justifySelf: "flex-end",
    background: backgroundColorLight,
    color: primaryColor,
    width: Sizes.button,
    border: border(1, primaryColor)
  }),
  secondaryButton: css({
    flex: flex1,
    flexBasis: 0,
    marginLeft: spacingMedium
  })
}
