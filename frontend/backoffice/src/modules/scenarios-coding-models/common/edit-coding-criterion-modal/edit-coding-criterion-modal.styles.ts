import {css} from "@emotion/react"
import {
  borderRadiusLarge,
  cardBottomColor,
  cardBoxShadow,
  Flex,
  FontWeight,
  spacing,
  spacingHuge,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny
} from "shared/styles"

export const editCodingCriterionModalStyles = {
  modal: css({
    width: `calc(100vw - ${2 * spacingHuge}px)`,
    height: `calc(100vh - ${2 * spacingMedium}px)`,
    padding: 0,

    section: {
      overflow: "hidden"
    }
  }),
  modalHeader: css({
    backgroundColor: cardBottomColor,
    boxShadow: cardBoxShadow,
    padding: spacing(spacingMedium, spacingLarge),
    margin: 0,
    borderTopLeftRadius: borderRadiusLarge,
    borderTopRightRadius: borderRadiusLarge
  }),
  modalContent: css(Flex.row, {
    alignItems: "stretch"
  }),
  contentWrapper: css({
    width: "100%",
    display: "grid",
    gridTemplateRows: "minmax(0, 1fr) minmax(min-content, max-content)"
  }),
  content: css({
    padding: spacing(spacingSmall, spacingLarge, spacingMedium, spacingLarge)
  }),
  labeledContent: css({
    display: "grid",
    gridRowGap: spacingTiny,
    gridTemplateRows: "minmax(min-content, max-content) minmax(0, 1fr)"
  }),
  textLabel: css({
    fontWeight: FontWeight.Bold
  }),
  infoWrapper: css({
    display: "grid",
    gridRowGap: spacingMedium,
    gridTemplateRows: "minmax(min-content, max-content) minmax(0, 1fr)"
  }),
  criteriaWrapper: css({
    display: "grid",
    gridColumnGap: spacingMedium,
    gridTemplateColumns: "minmax(0,1fr) minmax(0, 2fr)"
  }),
  codingCriteriaList: css({
    minWidth: 0
  }),
  footer: css({
    padding: spacingSmall,
    backgroundColor: cardBottomColor,
    borderBottomLeftRadius: borderRadiusLarge,
    borderBottomRightRadius: borderRadiusLarge
  })
}
