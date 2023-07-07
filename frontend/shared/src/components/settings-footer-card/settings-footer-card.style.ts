import {css} from "@emotion/react"
import {
  borderRadius,
  fontColor,
  spacing,
  spacingCard,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  TextSize
} from "../../styles"

const Size = {
  text: 56
}

export const settingsFooterCardStyle = {
  card: css({
    position: "relative",
    cursor: "default",
    color: fontColor,
    height: "auto",

    "&:hover": {
      transform: "none"
    }
  }),
  contentWrapper: css({
    padding: spacing(spacingCard, spacingCard, spacingMedium, spacingCard),
    flexGrow: 1,
    justifyContent: "space-between"
  }),
  label: css({
    marginBottom: spacingTiny
  }),
  text: css({
    fontSize: TextSize.Smaller,
    minHeight: Size.text,
    marginBottom: spacingSmall
  }),
  disabledOverlay: css({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: fontColor,
    opacity: 0.2,
    borderRadius
  })
}
