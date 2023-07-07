import {css} from "@emotion/react"
import {
  backgroundColorDarker,
  borderRadius,
  buttonBackgroundPrimary,
  cardBottomColor,
  deepShadow,
  Flex,
  flex0,
  fontColorLight,
  primaryColor,
  spacing,
  spacingCard,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingSmaller,
  spacingTiny,
  textEllipsis,
  TextSize
} from "../../../../styles"

const Size = {
  freeTextPaper: 80
}

export const criterionRatingTableStyles = {
  container: (hasFreeTextAnswer: boolean, isFinalRater: boolean, showAutomatedCodingItemRuleField: boolean) => {
    const repeat = showAutomatedCodingItemRuleField ? 2 : 1
    return css({
      display: "grid",
      gridTemplateRows:
        !hasFreeTextAnswer && !isFinalRater && !showAutomatedCodingItemRuleField
          ? "1fr"
          : `repeat(${hasFreeTextAnswer && isFinalRater ? repeat + 1 : repeat}, minmax(min-content, max-content)) 1fr`,
      gridRowGap: spacingLarge
    })
  },
  label: css({
    textAlign: "initial"
  }),
  description: css({
    whiteSpace: "initial"
  }),
  automatedDataIcon: css({
    marginTop: spacingTiny
  }),
  freeTextAnswerWrapper: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingSmall
  }),
  freeTextPaper: css({
    padding: spacingSmall,
    minHeight: Size.freeTextPaper
  }),
  freeTextLoading: css(Flex.column, {
    alignItems: "center",
    justifyContent: "center"
  }),
  freeTextPlaceholder: css({
    color: fontColorLight
  }),
  criteriaWrapper: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny
  }),
  tableHeader: css({
    padding: spacing(spacingSmall, spacingMedium)
  }),
  scoreContent: (showPercentage: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns: showPercentage ? "minmax(min-content, max-content) 1fr" : "1fr",
      gridColumnGap: spacingCard
    }),
  scoreInfo: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingSmaller
  }),
  scoreDescription: (hasIcon: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns: hasIcon ? "minmax(min-content, max-content) 1fr" : "1fr",
      gridColumnGap: spacingSmall
    }),
  selectionHeader: (hasIcon: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns: hasIcon ? "1fr minmax(min-content, max-content)" : "1fr",
      gridColumnGap: spacingSmall,
      alignItems: "center"
    }),
  selectionCheckboxBorder: css({
    background: buttonBackgroundPrimary
  }),
  selectionWrapper: (hasLabel: boolean, hideSelectionInput: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns:
        !hideSelectionInput && hasLabel ? "1fr minmax(min-content, max-content)" : "minmax(min-content, max-content)",
      gridColumnGap: spacingSmall
    }),
  selectionLabel: (readOnly: boolean) =>
    css(textEllipsis, {
      color: readOnly ? fontColorLight : primaryColor
    }),
  selectionColumn: css({
    flex: flex0,
    alignSelf: "flex-start"
  }),
  percentagePrefix: css({
    margin: spacing(-spacingSmall, 0, -spacingSmall, -spacingSmall)
  }),
  footerWrapper: css({
    padding: 0,
    backgroundColor: backgroundColorDarker,
    height: "initial"
  }),
  footer: (hasFooterCard: boolean) =>
    css({
      display: "grid",
      gridTemplateRows: hasFooterCard ? "minmax(min-content, max-content) 1fr" : "1fr",
      gridRowGap: spacingSmall,
      width: "100%"
    }),
  footerCard: (showPercentage: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns: showPercentage ? "minmax(min-content, max-content) 1fr" : "1fr",
      gridColumnGap: spacingCard,
      borderRadius: borderRadius,
      margin: spacing(0, spacingSmall),
      padding: spacingSmall,
      backgroundColor: "white",
      boxShadow: deepShadow
    }),
  footerCardContentWrapper: (isNoCriterionFulfilledButtonVisible: boolean) =>
    css(Flex.column, {
      display: "grid",
      gridTemplateColumns: isNoCriterionFulfilledButtonVisible ? "1fr minmax(min-content, max-content)" : "1fr",
      gridColumnGap: spacingSmall,
      fontSize: TextSize.Medium
    }),
  footerCardContent: (showNoCriterionFulfilledDescription: boolean) =>
    css({
      display: "grid",
      gridTemplateRows: showNoCriterionFulfilledDescription
        ? "minmax(min-content, max-content) 1fr"
        : "minmax(min-content, max-content)",
      gridRowGap: spacingSmaller,
      ...(!showNoCriterionFulfilledDescription && {
        alignSelf: "center",
        textAlign: "right",
        marginRight: spacingMedium
      })
    }),
  footerCardButton: css({
    width: "initial",
    alignSelf: "center",
    paddingLeft: spacingCard,
    paddingRight: spacingCard
  }),
  subFooter: css({
    display: "grid",
    gridTemplateColumns: "minmax(min-content, max-content)",
    justifyContent: "end",
    backgroundColor: cardBottomColor,
    padding: spacingSmall,
    borderRadius: spacing(0, 0, borderRadius, borderRadius)
  }),
  tooltipIcon: css({
    marginLeft: spacingTiny
  }),
  noCriterionFulfilledButtonWrapper: (hasComputerRaterLabel: boolean) =>
    css({
      display: "grid",
      gridTemplateColumns: `repeat(${hasComputerRaterLabel ? 2 : 1}, minmax(min-content, max-content))`,
      gridColumnGap: spacingSmall,
      alignItems: "center"
    })
}
