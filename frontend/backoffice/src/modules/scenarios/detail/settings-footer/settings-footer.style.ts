import {css} from "@emotion/react"
import {
  backgroundColorDarker,
  borderRadius,
  cardBottomColor,
  fontColor,
  fontColorDark,
  fontColorLight,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  TextSize
} from "shared/styles"

const Size = {
  icon: 30,
  spacerVertical: 2
}

export const settingsFooterStyle = {
  controls: css({
    justifyContent: "space-between",
    backgroundColor: cardBottomColor,
    padding: spacingSmall,
    borderRadius: spacing(0, 0, borderRadius, borderRadius)
  }),
  controlIcons: css({
    marginRight: spacingMedium,

    "> div:not(:last-of-type)": {
      marginRight: spacingLarge
    }
  }),
  spacerVertical: css({
    width: Size.spacerVertical,
    height: Size.icon,
    backgroundColor: fontColorLight,
    borderRadius: borderRadius
  }),
  icon: css({
    position: "relative",
    height: Size.icon,
    width: Size.icon
  }),
  iconPathColored: css({
    "svg path": {
      fill: fontColorLight
    }
  }),
  iconTablePath: css({
    "svg path": {
      stroke: fontColorLight
    }
  })
}
