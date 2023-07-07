import {css} from "@emotion/react"
import {
  boxHeightMediumLarge,
  cardBottomColor,
  Flex,
  flex1,
  fontColor,
  fontColorLight,
  FontWeight,
  spacing,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTinier,
  spacingTiny,
  textEllipsis,
  TextSize
} from "shared/styles"

const Sizes = {
  tableHeader: 48,
  imageColumn: 270
}
export const questionnaireQuestionDetailStyle = {
  content: css({
    boxSizing: "border-box",
    padding: spacing(spacingLarge, spacingLarge, spacingMedium),
    justifyContent: "start",
    overflowY: "auto",
    marginTop: spacingTinier,
    flexGrow: 6
  }),
  settingsCard: css({
    width: "50%"
  }),
  scenarioSpecificSettingsWrapper: css(Flex.column, {
    flex: flex1,
    flexGrow: 0,
    padding: spacingSmall,
    backgroundColor: cardBottomColor,
    flexBasis: "200px"
  }),
  placeholder: css({
    textAlign: "center"
  }),
  scenarioSpecificSettings: (showPlaceholder: boolean) =>
    css({
      ...(showPlaceholder && {
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flex: flex1
      })
    }),
  columnLayout: css({
    display: "grid",
    gridTemplateColumns: `1fr ${Sizes.imageColumn}px`,
    gridColumnGap: spacingMedium
  }),
  inlineField: css({
    marginLeft: -spacingSmall,

    ".textarea": {
      fontSize: TextSize.Larger,

      ".placeholder": {
        fontSize: TextSize.Larger
      }
    }
  }),
  detailHeader: css({
    justifyContent: "space-between"
  }),
  detailHeaderIcon: css({
    marginRight: spacingSmall
  }),
  detailFooter: css({
    justifyContent: "space-between",
    width: "calc(100% + 2px)",
    boxSizing: "border-box",
    margin: spacing(0, 0, -1, -1),
    height: boxHeightMediumLarge
  }),
  detailFooterText: (displayScoring: boolean) =>
    css({
      fontSize: TextSize.Medium,
      color: displayScoring ? fontColor : fontColorLight
    }),
  questionTypeWrapper: css({
    marginTop: spacingLarge,
    display: "grid",
    gridRowGap: spacingTiny,
    gridTemplateRows: "minmax(min-content, max-content) minmax(0, 1fr)"
  }),
  questionTypeTitle: css({
    fontWeight: FontWeight.Bold
  }),
  questionTypeActionFieldWrapper: css({
    display: "grid",
    gridColumnGap: spacingMedium,
    gridTemplateColumns: "1fr 1fr"
  }),
  questionTypeActionField: css({
    minHeight: "initial"
  }),
  questionType: css(Flex.row),
  questionTypeIcon: css({
    flex: "0 0 auto",
    marginRight: spacingSmall
  }),
  questionTypeLabel: css(textEllipsis, {
    flex: "1 1 auto"
  }),
  scoringWrapper: (columns: number) =>
    css({
      display: "grid",
      gridTemplateColumns: new Array(columns).fill("1fr").join(" "),
      columnGap: spacingMedium
    })
}
