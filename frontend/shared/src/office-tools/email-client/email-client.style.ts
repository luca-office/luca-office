import {css} from "@emotion/react"
import {Flex, spacing, spacingHuge, spacingMedium} from "../../styles"

export const emailClientStyle = {
  window: css(Flex.column, {justifyContent: "space-between"}),
  bar: css({
    flex: "0 0 content"
  }),
  content: css({
    display: "flex",
    flexDirection: "row",
    padding: spacing(spacingMedium, spacingHuge),
    flex: 1,
    overflow: "hidden"
  }),
  list: css({
    marginRight: spacingMedium,
    flex: 0,
    display: "flex"
  }),
  details: css({
    flex: 1,
    display: "flex"
  })
}
