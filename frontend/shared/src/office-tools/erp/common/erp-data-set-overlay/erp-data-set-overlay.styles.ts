import {css} from "@emotion/react"
import {
  borderRadius,
  borderRadiusLarge,
  cardBottomColor,
  cardBoxShadow,
  Flex,
  fontColor,
  FontWeight,
  inputHeight,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  textEllipsis,
  TextSize
} from "../../../../styles"

const Size = {
  modal: {width: 632, height: 528},
  modalHeader: {height: inputHeight + 2 * spacingSmall}
}

export const erpDataSetOverlayStyles = {
  modal: css({
    padding: 0,
    width: Size.modal.width,
    maxHeight: "80vh",
    height: "fit-content",
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) minmax(0, 1fr) minmax(min-content, max-content)"
  }),
  modalFooter: css({
    padding: spacing(spacingSmall, spacingLarge),
    width: "initial",
    boxSizing: "border-box",
    backgroundColor: cardBottomColor,
    borderBottomLeftRadius: borderRadiusLarge,
    borderBottomRightRadius: borderRadiusLarge
  }),
  modalHeaderWrapper: css({
    boxSizing: "border-box",
    height: Size.modalHeader.height,
    marginBottom: spacingMedium,
    padding: spacing(spacingMedium, spacingLarge),
    backgroundColor: cardBottomColor,
    borderTopLeftRadius: borderRadiusLarge,
    borderTopRightRadius: borderRadiusLarge,
    boxShadow: cardBoxShadow
  }),
  modalHeader: css(Flex.row),
  modalHeaderBackButton: css({
    marginRight: spacingSmall,
    background: "initial",
    border: "none"
  }),
  modalHeaderTitle: (isSelected: boolean) =>
    css({
      fontSize: TextSize.Medium,
      fontWeight: isSelected ? FontWeight.Bold : FontWeight.Regular,
      letterSpacing: 0
    }),
  modalHeaderIcon: css({
    margin: spacing(0, spacingSmall)
  }),
  entity: css({
    display: "grid",
    gridRowGap: spacingTiny,
    gridTemplateRows: "minmax(min-content, max-content) minmax(0, 1fr)"
  }),
  entityLabelWrapper: (hasKeyIcon: boolean, isRequired: boolean) =>
    css({
      display: "grid",
      gridColumnGap: spacingTiny,
      gridTemplateRows: hasKeyIcon
        ? `minmax(0, 1fr) repeat(${isRequired ? 2 : 1}, minmax(min-content, max-content))`
        : isRequired
        ? "minmax(0, 1fr) minmax(min-content, max-content)"
        : "minmax(0, 1fr)"
    }),
  entityLabel: css(Flex.row, {
    fontSize: TextSize.Medium,
    fontWeight: FontWeight.Bold
  }),
  entityIcon: css({
    marginLeft: spacingTiny
  }),
  entityInput: css({
    alignSelf: "end"
  }),
  contentWrapper: css({
    padding: spacing(0, spacingLarge),
    overflow: "auto !important",
    marginBottom: spacingMedium
  }),
  loadingIndicator: css({
    height: "100%",
    boxSizing: "border-box"
  }),
  content: css({
    padding: spacing(spacingSmall, spacingMedium),
    backgroundColor: cardBottomColor,
    borderRadius: borderRadius
  }),
  primaryKeyWrapper: css({
    marginBottom: spacingLarge
  }),
  binaryFileWrapper: css({
    marginTop: spacingLarge
  }),
  entitiesWrapper: css({
    display: "grid",
    gridColumnGap: spacingMedium,
    gridRowGap: spacingLarge,
    gridTemplateColumns: "1fr 1fr"
  }),
  copyIconWrapper: css(Flex.row, {
    justifyContent: "flex-end",
    marginTop: spacingMedium
  }),
  copyIconContent: css(Flex.row, {
    cursor: "pointer"
  }),
  copyIconTooltip: css(Flex.row),
  copyIconLabel: css(textEllipsis, {
    marginRight: spacingSmall,
    color: fontColor,
    fontSize: TextSize.Medium
  }),
  referencingPrimaryKeys: css({
    "&, > .erp-accordion:not(:first-of-type)": {
      marginTop: spacingMedium
    }
  }),
  deleteOrly: css({
    marginTop: 0,

    "> div > *": {
      marginTop: 0
    }
  }),
  requiredInfo: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content) 1fr",
    gridColumnGap: spacingTiny,
    marginTop: spacingLarge
  }),
  requiredInfoText: css(textEllipsis)
}
