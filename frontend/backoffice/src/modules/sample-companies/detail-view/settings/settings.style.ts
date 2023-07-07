import {css} from "@emotion/react"
import {primaryColor, spacingMedium, spacingSmall} from "shared/styles"

export const settingsStyle = {
  settings: css({
    ".card-content": {
      padding: spacingMedium
    }
  }),
  cards: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: spacingMedium
  }),
  cardHighlighted: css({
    borderColor: primaryColor,
    borderWidth: 1
  }),
  cardFooter: css({
    justifyContent: "space-between"
  }),
  cardFooterItem: css({
    "> div:first-of-type": {
      marginRight: spacingSmall
    }
  }),
  cardFooterItemLabel: css({
    color: primaryColor
  })
}
