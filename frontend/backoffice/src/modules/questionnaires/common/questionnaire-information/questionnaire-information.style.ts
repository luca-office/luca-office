import {css} from "@emotion/react"
import {Flex, spacing, spacingLarge, spacingMedium, spacingSmall} from "shared/styles"

const Sizes = {
  tableHeader: 48,
  imageColumn: 270
}
export const questionnaireInformationStyle = {
  content: (hasFooter: boolean) =>
    css({
      flexBasis: 0,
      overflow: "auto",
      justifyContent: "flex-start",
      boxSizing: "border-box",
      padding: spacing(spacingLarge, spacingLarge, spacingMedium)
    }),
  header: css({
    justifyContent: "space-between"
  }),
  headerIcon: css({
    marginRight: spacingSmall
  }),
  columnLayout: css({
    display: "grid",
    gridTemplateColumns: `1fr ${Sizes.imageColumn}px`,
    gridColumnGap: spacingMedium
  }),
  inlineField: css({
    marginLeft: -spacingSmall
  }),
  inlineFieldReadonly: css({
    marginLeft: -spacingMedium
  }),
  spacedLabel: css({
    marginTop: spacingLarge,
    overflow: "initial"
  }),
  tableHeader: css({
    height: Sizes.tableHeader
  }),
  table: css({
    overflow: "auto"
  }),
  detailHeaderTime: css({
    flexGrow: 1,
    marginBottom: spacingSmall
  }),
  noTime: css(Flex.row, {
    marginRight: spacingMedium
  }),
  noTimeIcon: css({
    marginRight: spacingSmall
  })
}
