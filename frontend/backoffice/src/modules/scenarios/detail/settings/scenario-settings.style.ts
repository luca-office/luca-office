import {css} from "@emotion/react"
import {backgroundColorDarker, fontColorLight, primaryColor, spacingMedium, spacingSmall} from "shared/styles"

export const settingStyles = {
  content: css({
    backgroundColor: backgroundColorDarker
  }),
  settings: css({
    ".card-content": {
      padding: spacingMedium
    }
  }),
  cards: css({
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: spacingMedium
  }),
  card: (hasContent: boolean, isFinalized: boolean) =>
    css({
      border: `1px solid ${hasContent ? primaryColor : "transparent"}`,
      pointerEvents: isFinalized && !hasContent ? "none" : "all"
    }),
  cardFooter: css({
    justifyContent: "space-between"
  }),
  cardFooterItem: css({
    "> div:not(:last-of-type)": {
      marginRight: spacingSmall
    }
  }),
  cardFooterItemLocked: (isFinalized: boolean) =>
    css({
      "> div:first-of-type > svg > g > g": {
        stroke: isFinalized ? fontColorLight : primaryColor
      }
    })
}
