import {css} from "@emotion/react"
import {
  boxHeightMedium,
  cardBottomColor,
  Flex,
  fontColor,
  primaryColor,
  spacing,
  spacingSmall,
  spacingTiny,
  TextSize
} from "shared/styles"

const Size = {
  buttonIcon: 14
}

const smallIconStyle = [
  Flex.row,
  css({
    minWidth: Size.buttonIcon,
    justifyContent: "center",
    alignItems: "center",

    "&, > svg": {
      width: Size.buttonIcon,
      height: Size.buttonIcon
    }
  })
]

export const emailDirectoriesFooterStyle = {
  footer: css(Flex.column, {
    margin: -spacingSmall,
    padding: spacingSmall,
    backgroundColor: cardBottomColor
  }),
  footerBorder: (isSelected: boolean) =>
    css({
      border: isSelected ? `2px solid ${primaryColor}` : 0,
      // transparent border still leaves white border for the underlying card component, therefore margin is used
      margin: isSelected ? spacing(spacingSmall - 2, 0, 0, 0) : spacing(spacingSmall, 2, 2, 2)
    }),
  button: css({
    fontSize: TextSize.Medium,
    width: "auto",

    "> div > div": smallIconStyle
  }),
  smallIcon: smallIconStyle,
  card: (isDisabled: boolean) =>
    css({
      height: "initial",
      color: fontColor,

      "&:hover": {
        transform: "none",
        cursor: isDisabled ? "default" : "pointer"
      }
    }),
  cardContent: css(Flex.column, {
    padding: spacingSmall,
    marginLeft: boxHeightMedium
  }),
  cardLabelText: css({
    flex: "1 1 auto"
  }),
  cardText: css({
    marginTop: spacingTiny,
    fontSize: TextSize.Smaller
  }),
  introductionEmailCard: css({
    position: "relative"
  }),
  introductionEmailButton: css(Flex.column, {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    minWidth: boxHeightMedium,
    width: boxHeightMedium,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: primaryColor
  })
}
