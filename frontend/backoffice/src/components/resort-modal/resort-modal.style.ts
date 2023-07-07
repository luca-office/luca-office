import {css} from "@emotion/react"
import {
  backgroundColorLight,
  borderRadius,
  buttonHeight,
  Flex,
  fontColor,
  FontWeight,
  insetShadow,
  primaryColor,
  spacingHuger,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  textEllipsis
} from "shared/styles"

const Size = {
  modal: "70vw",
  table: 300,
  tableHeader: spacingHuger
}

export const resortModalStyle = {
  modal: css({
    width: Size.modal,
    maxHeight: `calc(100vh - ${2 * spacingHuger}px)`,

    section: css(Flex.column, {
      overflow: "hidden"
    })
  }),
  content: css(Flex.column, {
    overflow: "hidden"
  }),
  tableHeader: css({
    marginBottom: spacingTiny
  }),
  headerRowStyle: (isProject?: boolean) =>
    css({
      padding: spacingSmall,
      "> div": {
        "&:last-of-type": {
          //buttonHeight is used for width according to button.styles.ts
          flex: isProject ? `0 0 ${buttonHeight * 2 + spacingSmall}px` : undefined
        }
      }
    }),
  table: css({
    minHeight: Size.table + Size.tableHeader,
    marginBottom: spacingLarge,
    borderRadius: borderRadius,
    overflow: "auto",
    background: backgroundColorLight,
    boxShadow: insetShadow
  }),
  tableDescription: css({
    marginBottom: spacingMedium,
    marginTop: spacingSmall
  }),
  tableRow: (isProject?: boolean) =>
    css({
      "> div": {
        "&:first-of-type": {
          flex: !isProject ? "1 1 auto" : "1 1 0"
        },
        "&:last-of-type": {
          flex: "0 0 auto"
        }
      }
    }),
  tableTitleColumn: (color: string = fontColor) =>
    css(textEllipsis, {
      color
    }),
  previewButton: css({
    fontWeight: FontWeight.Bold,
    color: primaryColor,
    padding: 0,
    width: "initial",
    height: "initial",

    "&, &:disabled": {
      background: "initial"
    }
  })
}
