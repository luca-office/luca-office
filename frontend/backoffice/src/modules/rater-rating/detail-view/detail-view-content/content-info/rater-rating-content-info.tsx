import {css} from "@emotion/react"
import * as React from "react"
import {Heading, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {SurveyLight} from "shared/models"
import {
  Flex,
  FontWeight,
  spacingLarge,
  spacingMedium,
  spacingTiny,
  subHeaderHeight,
  textEllipsis,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {getManualSurveyTimingHeadline, getSurveyTimingHeadline} from "../../../../../utils"
import {isManualSurvey} from "../../../../surveys/utils/common"

export interface RaterRatingContentInfoProps {
  readonly survey: SurveyLight
}

export const RaterRatingContentInfo: React.FC<RaterRatingContentInfoProps> = ({survey}) => {
  const {t} = useLucaTranslation()

  const isManualExecutionType = isManualSurvey(Option.of(survey.executionType))

  const surveyStatusLabel = isManualExecutionType
    ? getManualSurveyTimingHeadline(t, survey)
    : getSurveyTimingHeadline(t, survey.startsAt, survey.endsAt, survey.isCompleted)

  return (
    <div css={styles.info}>
      <div css={styles.infoContentWrapper}>
        <Text customStyles={styles.label} size={TextSize.Medium}>
          {t("rater_rating_details__title")}
        </Text>
        <div css={styles.infoTitle}>
          <Heading customStyles={styles.infoTitleLabel} level={HeadingLevel.h1}>
            {survey.title}
          </Heading>
          <Heading customStyles={textEllipsis} level={HeadingLevel.h1}>
            {surveyStatusLabel}
          </Heading>
        </div>
      </div>
      <div css={styles.infoContentWrapper}>
        <Text customStyles={styles.label} size={TextSize.Medium}>
          {t("rater_rating_details__description")}
        </Text>
        <Text customStyles={styles.description} size={TextSize.Medium}>
          {survey.description}
        </Text>
      </div>
    </div>
  )
}

const styles = {
  infoContentWrapper: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny
  }),
  label: css(textEllipsis, {
    fontWeight: FontWeight.Bold
  }),
  info: css({
    display: "grid",
    gridTemplateRows: "repeat(2, minmax(min-content, max-content))",
    gridRowGap: spacingLarge
  }),
  infoTitle: css(Flex.row, {
    justifyContent: "space-between"
  }),
  infoTitleLabel: css(textEllipsis, {
    marginRight: spacingMedium
  }),
  description: css({
    height: subHeaderHeight,
    overflow: "auto"
  })
}
