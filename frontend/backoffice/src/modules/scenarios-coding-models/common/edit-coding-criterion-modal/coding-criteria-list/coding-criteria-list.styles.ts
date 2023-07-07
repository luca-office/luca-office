import {css} from "@emotion/react"
import {
  borderRadius,
  boxHeightSmall,
  buttonHeight,
  cardBottomColor,
  deepShadow,
  fileExplorerSelectedColor,
  fontColorLight,
  spacing,
  spacingSmall,
  spacingTinier,
  spacingTiny,
  TextSize
} from "shared/styles"

export const codingCriteriaListStyles = {
  listWrapper: css({
    display: "grid",
    gridTemplateRows: "minmax(0, 1fr) minmax(min-content, max-content)",
    boxShadow: deepShadow,
    overflow: "hidden"
  }),
  card: css({
    overflow: "auto"
  }),
  icon: css({
    marginRight: spacingSmall
  }),
  table: css({
    background: "white",
    overflowY: "auto"
  }),
  tableHeader: css({
    minHeight: boxHeightSmall * 2
  }),
  list: (hasContent: boolean) =>
    css({
      background: "initial",
      overflowY: "auto",
      borderRadius,
      height: "initial",
      boxShadow: "initial",
      fontSize: TextSize.Small,

      ...(hasContent && {
        cursor: "pointer",

        "&:hover": {
          backgroundColor: fileExplorerSelectedColor
        }
      })
    }),
  listBodyRow: css({
    boxShadow: "none"
  }),
  labelHeader: css({
    padding: spacingSmall,
    height: buttonHeight,
    lineHeight: `${buttonHeight}px`
  }),
  labelColumn: css({
    flex: "1 1 auto",
    padding: 0
  }),
  pointColumn: css({
    flex: "0 0 auto",
    padding: 0,
    color: fontColorLight
  }),
  columnCell: (isSelected: boolean) =>
    css({
      padding: spacing(spacingTiny + spacingTinier, spacingSmall),
      ...(isSelected && {backgroundColor: fileExplorerSelectedColor})
    }),

  footer: css({
    backgroundColor: cardBottomColor,
    padding: spacingSmall
  }),
  footerButton: css({
    width: "100%"
  })
}
