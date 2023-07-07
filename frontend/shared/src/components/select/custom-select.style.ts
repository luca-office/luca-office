import {css} from "@emotion/react"
import {
  backgroundColor,
  border,
  borderColor,
  borderRadiusSmall,
  Flex,
  fontColor,
  fontFamily,
  inputHeight,
  primaryColor,
  spacing,
  spacingSmall,
  spacingTiny,
  TextSize,
  zIndex2
} from "../../styles"

export const customSelectStyles = {
  container: (hasLabel: boolean) =>
    css({
      minWidth: 189,
      ...(!hasLabel && {
        boxSizing: "border-box",
        borderRadius: borderRadiusSmall,
        border: border(1, borderColor)
      })
    }),
  control: (hasLabel: boolean, showDuplicateIcon: boolean) => ({
    cursor: "pointer",
    background: "white",
    fontFamily: fontFamily,
    fontSize: TextSize.Medium,
    height: `${inputHeight}px`,
    minHeight: `${inputHeight}px`,
    borderRadius: borderRadiusSmall,
    border: hasLabel && !showDuplicateIcon ? border(1, borderColor) : "initial",

    ...(!showDuplicateIcon && {
      " &:hover": {
        borderColor: borderColor
      },
      "&:focus": {
        outlineColor: primaryColor,
        borderColor: primaryColor
      }
    })
  }),
  option: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center"
  },
  optionFocused: {
    backgroundColor: backgroundColor,
    color: fontColor
  },
  optionSelected: {
    backgroundColor: "white",
    color: fontColor,

    "&:active": {
      backgroundColor: backgroundColor
    }
  },
  optionIcon: css({
    marginRight: spacingSmall
  }),
  optionIconRight: css({
    marginLeft: "auto"
  }),
  content: (customZIndex?: number) =>
    css(Flex.row, {
      ".custom-select": {
        flex: "1 1 auto",
        "> div:last-of-type > [class$='-menu']": {
          zIndex: customZIndex ?? zIndex2
        }
      }
    }),
  duplicateIconWrapper: css({
    flex: "0 0 auto"
  }),
  duplicateIcon: css({
    padding: spacing(spacingSmall - 1, spacingSmall), // vertical: -1px border
    cursor: "pointer"
  }),
  infoIcon: css({
    marginLeft: spacingTiny
  })
}
