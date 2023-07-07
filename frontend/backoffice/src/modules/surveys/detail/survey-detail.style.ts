import {css} from "@emotion/react"
import {
  Flex,
  fontColorLight,
  FontWeight,
  headerHeight,
  primaryColor,
  spacing,
  spacingHuger,
  spacingLarge,
  spacingMedium,
  spacingSmall,
  spacingTiny,
  textEllipsis,
  TextSize
} from "shared/styles"

const Color = {
  backgroundTest: "#f5f5f7"
}

export const surveyDetailStyles = {
  indexed: css({
    zIndex: 1
  }),
  content: css({
    overflow: "hidden",
    maxHeight: `calc(100vh - ${headerHeight}px)`
  }),
  contentContainer: css({
    overflow: "auto"
  }),
  cardContent: css({
    padding: spacingLarge,
    width: "auto"
  }),
  cardTestSurvey: css({
    borderColor: Color.backgroundTest
  }),
  cardContentTestSurvey: css({
    backgroundColor: Color.backgroundTest
  }),
  headlineWrapper: css({
    display: "grid",
    alignItems: "flex-end",
    gridTemplateColumns: "1fr 1fr",
    gridGap: spacingMedium,
    marginBottom: spacingLarge
  }),
  timingHeadline: css({
    textAlign: "right",
    padding: spacing(spacingTiny, 0)
  }),
  inlineField: css({
    marginLeft: -spacingSmall
  }),
  infoWrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridColumnGap: spacingMedium,
    marginTop: spacingHuger
  }),
  cardWrapperParent: css({
    display: "grid" // Safari Hack
  }),
  cardWrapper: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridColumnGap: spacingMedium
  }),
  detailSettingsCard: css({
    gridColumnStart: 1,
    gridColumnEnd: 3
  }),
  participationWrapper: css({
    minWidth: 0,
    marginBottom: spacingLarge,
    marginTop: spacingMedium,
    "div.content": {
      minWidth: 0
    }
  }),
  actionFieldInvitation: css({
    minWidth: 0,
    "> span": css(textEllipsis)
  }),
  actionFieldProject: css(Flex.row, {
    "> span": css(textEllipsis)
  }),
  actionFieldIcon: css({
    marginRight: spacingSmall
  }),
  metaInfoContainer: css({
    display: "grid",
    gridColumnGap: spacingMedium,
    gridTemplateColumns: "1fr 1fr",
    padding: spacing(spacingMedium, spacingMedium, spacingTiny, spacingMedium)
  }),
  editButton: css({
    padding: 0,
    marginBottom: spacingSmall,
    marginRight: spacingSmall,
    justifyContent: "flex-end",
    background: "initial",
    width: "initial",
    borderRadius: 0,
    color: primaryColor,
    height: 20,
    lineHeight: 1,
    fontSize: TextSize.Medium,
    fontWeight: FontWeight.Bold,

    ":disabled": {
      background: "transparent",
      color: fontColorLight
    }
  }),
  testInfoLine: css(Flex.row, {
    margin: spacing(-spacingSmall, -spacingSmall, spacingLarge, -spacingSmall)
  }),
  surveyProgressWrapper: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridColumnGap: spacingMedium,
    gridColumnStart: 1,
    gridColumnEnd: 4,
    marginTop: spacingHuger
  })
}
