import {css} from "@emotion/react"
import {Flex, flex1, fontColorLight, spacing, spacingLarge, spacingMedium, spacingSmall} from "shared/styles"

export const interventionGroupStyles = {
  header: css(Flex.row, {
    justifyContent: "space-between",
    flex: flex1
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  modal: css({
    minHeight: "15vh"
  }),
  position: css({
    flex: flex1
  }),
  table: css({
    marginTop: spacingLarge
  }),
  content: css({
    padding: spacing(spacingLarge, spacingMedium),
    display: "flex",
    width: "auto",
    flex: flex1
  }),
  placeholder: css(Flex.row, {
    flex: flex1,
    alignItems: "center",
    justifyContent: "center"
  }),
  contentPlaceholderTitle: css({
    textAlign: "center"
  }),
  interventionTable: css({
    marginTop: spacingLarge
  }),
  contentPlaceholderHint: css({
    color: fontColorLight,
    marginTop: spacingSmall
  })
}
