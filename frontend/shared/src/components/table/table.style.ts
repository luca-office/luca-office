import {css} from "@emotion/react"
import {CSSInterpolation} from "@emotion/serialize"
import {
  backgroundColor,
  backgroundColorDarker,
  borderRadius,
  cardBottomColor,
  cardBoxShadow,
  contentHeight,
  errorColor,
  Flex,
  fontColor,
  fontColorLight,
  fontFamily,
  mediumBoxShadow,
  spacing,
  spacingHuge,
  spacingSmall,
  spacingTinier,
  spacingTiny,
  textEllipsis,
  TextSize
} from "../../styles"

const cellStyle: CSSInterpolation = {
  flex: "1 1 0",
  padding: spacing(spacingSmall, spacingSmall)
}
const rowStyle: CSSInterpolation = {
  display: "flex",
  alignItems: "center"
}
const rowSelectionStyle: CSSInterpolation = {
  flexGrow: 1
}

export const tableStyles = {
  container: css({
    display: "flex",
    fontFamily: fontFamily,
    background: backgroundColorDarker,
    flexDirection: "column"
  }),
  entityWrapper: css({
    overflow: "auto",
    marginTop: spacingTinier,
    flex: 1
  }),
  sortButton: css({
    marginLeft: spacingSmall
  }),
  headerRow: css({
    ...rowStyle,
    height: spacingHuge,
    padding: spacing(0, spacingSmall),
    fontSize: TextSize.Small,
    backgroundColor: cardBottomColor,
    boxShadow: cardBoxShadow
  }),
  bodyRow: (isSelectable: boolean, isSelected?: boolean) =>
    css(
      isSelectable ? Flex.row : Flex.column,
      {
        margin: spacingSmall,
        fontSize: TextSize.Medium,
        borderRadius: borderRadius,
        backgroundColor: "white",
        boxShadow: mediumBoxShadow
      },
      isSelectable && {...{alignItems: "center", border: `1px solid transparent`}},
      isSelected && {...{border: `1px solid ${errorColor}`}}
    ),
  rowContent: (isSelectable: boolean) => css({...rowStyle}, isSelectable && rowSelectionStyle),
  rowSelectButton: css({paddingLeft: spacingSmall}),
  rowClickable: css({cursor: "pointer"}),
  selectedRowContent: css({
    backgroundColor: backgroundColor
  }),
  headerCell: (isSortable: boolean) =>
    css(textEllipsis, cellStyle, isSortable && {display: "flex", flexDirection: "row", alignItems: "center"}),
  bodyCell: css(textEllipsis, {
    ...cellStyle
  }),
  placeholder: css(Flex.row, {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    flex: 1,
    minHeight: contentHeight,
    color: fontColor
  }),
  rowActions: css({
    ...rowStyle,
    flex: "1 0 100%",
    height: 40,
    padding: spacingTiny,
    backgroundColor: cardBottomColor
  }),
  footer: css({
    borderRadius: spacing(0, 0, borderRadius, borderRadius),
    padding: spacingSmall
  }),
  bundled: css({
    color: fontColorLight,
    opacity: 0.75
  })
}
