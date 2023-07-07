import {css} from "@emotion/react"
import {
  backgroundColorLight,
  borderRadius,
  boxHeightSmaller,
  deepShadow,
  Flex,
  flex1,
  spacingMedium,
  spacingSmall,
  TextSize
} from "../../styles"

export const participantQuestionnaireDetailStyle = {
  content: css({
    boxSizing: "border-box",
    padding: spacingMedium,
    justifyContent: "unset"
  }),
  cardHeader: css({justifyContent: "space-between"}),
  cardHeaderIcon: css({
    marginRight: spacingSmall
  }),
  headerButton: css({
    fontSize: TextSize.Medium,
    width: 292
  }),
  heading: css({padding: spacingMedium}),
  headingText: css({
    marginLeft: spacingMedium
  }),
  headingRow: [
    Flex.row,
    css({
      justifyContent: "space-between"
    })
  ],
  headingQuestionsProgress: css({
    paddingBottom: spacingSmall
  }),
  card: css({
    width: "50%",
    margin: spacingMedium
  }),
  innerCard: css({
    padding: spacingMedium,
    borderRadius: borderRadius,
    boxShadow: deepShadow,
    backgroundColor: backgroundColorLight
  }),
  emptyFooter: css({
    padding: "unset",
    height: boxHeightSmaller
  }),
  progressCard: css({padding: spacingSmall}),
  reportingProgressInfo: css({margin: spacingMedium}),
  attendeeName: css({cursor: "pointer"}),
  loadingIndicatorContainer: css(Flex.column, {
    flex: flex1,
    justifyContent: "center",
    alignItems: "center"
  })
}
