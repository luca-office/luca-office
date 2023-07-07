import {css} from "@emotion/react"
import {
  backgroundColorBright,
  borderRadius,
  fileExplorerSelectedColor,
  Flex,
  fontColor,
  fontColorLight,
  primaryColor,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny
} from "shared/styles"

export interface EntryContentCssProps {
  readonly isCurrentPosition: boolean
  readonly isSelectedTargetPosition: boolean
  readonly isChildOfOrigin: boolean
  readonly handleMove: boolean
}

export const nodeStyles = {
  entry: (level: number, isSelected?: boolean) =>
    css({
      cursor: !isSelected ? "pointer" : "default",
      paddingLeft: level * spacingMedium,
      backgroundColor: isSelected ? fileExplorerSelectedColor : backgroundColorBright,
      borderRadius: spacingTiny,
      boxSizing: "border-box",
      marginBottom: spacingSmall
    }),
  nodeName: (isChildOfOrigin: boolean) =>
    css({
      color: isChildOfOrigin ? fontColorLight : fontColor
    }),
  entryContent: (options: EntryContentCssProps) =>
    css(Flex.row, {
      justifyContent: "space-between",
      height: spacingLarge,
      alignItems: "center",
      cursor: options.handleMove ? "pointer" : "default",
      border: `1px ${options.isSelectedTargetPosition ? `solid ${primaryColor}` : "solid transparent"}`,
      borderRadius,

      ":hover": {
        backgroundColor:
          options.isCurrentPosition || options.isSelectedTargetPosition || options.isChildOfOrigin
            ? undefined
            : fileExplorerSelectedColor,

        ".move-text": {
          visibility: !options.isSelectedTargetPosition ? "visible" : "hidden"
        }
      }
    }),
  chevronIcon: css({
    marginRight: spacingTiny,
    cursor: "pointer"
  }),
  moveIcon: css({
    marginLeft: spacingSmall,
    marginRight: spacingTiny
  })
}
