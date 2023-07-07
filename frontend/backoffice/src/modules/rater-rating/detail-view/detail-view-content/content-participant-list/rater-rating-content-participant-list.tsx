import {css} from "@emotion/react"
import * as React from "react"
import {LoadingIndicator, Text} from "shared/components"
import {SurveyLight} from "shared/models"
import {
  backgroundColorDarker,
  CustomStyle,
  Flex,
  FontWeight,
  spacingSmall,
  spacingTiny,
  textEllipsis,
  TextSize
} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {TabbedCard} from "../../../../../components"
import {useRaterRatingContentParticipantList} from "./hooks/use-rater-rating-content-participant-list"
import {RaterRatingParticipantTable} from "./participant-table/rater-rating-participant-table"
import {RaterRatingProjectModuleTable} from "./project-module-table/rater-rating-project-module-table"

export interface RaterRatingContentParticipantListProps extends CustomStyle {
  readonly userAccountId: UUID
  readonly survey: SurveyLight
}

export const RaterRatingContentParticipantList: React.FC<RaterRatingContentParticipantListProps> = ({
  customStyles,
  userAccountId,
  survey
}) => {
  const {t} = useLucaTranslation()
  const {
    dataLoading,
    participantCount,
    fullyRatedParticipantsCount,
    projectModulesCount,
    fullyRatedProjectModulesCount,
    surveyInvitations,
    ratingProjectModules,
    allCodingDimensions
  } = useRaterRatingContentParticipantList(userAccountId, survey)

  const loadingIndicator = (
    <div css={styles.loadingIndicatorWrapper}>
      <LoadingIndicator />
    </div>
  )

  return (
    <div css={[styles.content, customStyles]}>
      <Text customStyles={styles.contentLabel} size={TextSize.Medium}>
        {t("rater_rating_details__rating_list")}
      </Text>
      <TabbedCard
        defaultActiveIndex={0}
        tabs={[
          {
            label: `${t("dashboard__progress_chart_legend_open")} (${fullyRatedParticipantsCount}/${participantCount})`,
            content: dataLoading ? (
              loadingIndicator
            ) : (
              <RaterRatingParticipantTable
                surveyInvitations={surveyInvitations}
                ratingProjectModules={ratingProjectModules}
              />
            )
          },
          {
            label: `${t(
              "rater_rating_details__project_modules"
            )} (${fullyRatedProjectModulesCount}/${projectModulesCount})`,
            content: dataLoading ? (
              loadingIndicator
            ) : (
              <RaterRatingProjectModuleTable
                fullyRatedParticipantCount={fullyRatedParticipantsCount}
                codingDimensions={allCodingDimensions}
                ratingProjectModules={ratingProjectModules}
              />
            )
          }
        ]}
      />
    </div>
  )
}

const styles = {
  content: css({
    display: "grid",
    gridTemplateRows: "minmax(min-content, max-content) 1fr",
    gridRowGap: spacingTiny
  }),
  contentLabel: css(textEllipsis, {
    fontWeight: FontWeight.Bold
  }),
  loadingIndicatorWrapper: css(Flex.column, {
    justifyContent: "center",
    alignItems: "center",
    padding: spacingSmall,
    backgroundColor: backgroundColorDarker
  })
}
