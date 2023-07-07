import {css} from "@emotion/react"
import * as React from "react"
import {ColumnProps, Heading, Icon, Text, Tooltip} from "shared/components"
import {HeadingLevel, IconName} from "shared/enums"
import {ProjectModuleProgressType} from "shared/graphql/generated/globalTypes"
import {Flex, FontWeight, ratingIndicatorFinalized, spacingSmall, TextSize} from "shared/styles"
import {LucaTFunction} from "shared/translations"
import {every, getParticipantNameOrToken} from "shared/utils"
import {RaterRatingParticipantProgressIndicator} from "../common"
import {IndexedSurveyInvitation, RatingProjectModule} from "../models"
import {isRatingOfEveryModulePossible, isRatingOfSomeModulePossible} from "../utils"

export const getRaterRatingParticipantTableColumns = (
  t: LucaTFunction,
  indexedSurveyInvitations: IndexedSurveyInvitation[],
  projectModules: RatingProjectModule[],
  fullyRatedProjectModulesCount: number
): ColumnProps<IndexedSurveyInvitation>[] => [
  {
    key: "token",
    header: (
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("dashboard__project_table_participant_header", {count: indexedSurveyInvitations.length})}
      </Heading>
    ),
    content: surveyInvitation => {
      const isFullyRatable = isRatingOfEveryModulePossible(surveyInvitation.projectModuleProgresses)
      const isPartlyRatable = isRatingOfSomeModulePossible(surveyInvitation.projectModuleProgresses)

      return (
        <div css={Flex.row}>
          <Text size={TextSize.Medium}>
            {getParticipantNameOrToken(surveyInvitation.participantData, surveyInvitation.token)}
          </Text>
          {!isFullyRatable && (
            <Tooltip
              title={t(isPartlyRatable ? "rating__partly_not_possible_tooltip" : "rating__not_possible_tooltip")}>
              <Text customStyles={styles.marginLeft} size={TextSize.Medium}>
                {`(${t(isPartlyRatable ? "rating__partly_not_possible" : "rating__not_possible")})`}
              </Text>
            </Tooltip>
          )}
        </div>
      )
    },
    sortConfig: {
      key: "token",
      isSortable: true,
      customSort: surveyInvitation =>
        getParticipantNameOrToken(surveyInvitation.participantData, surveyInvitation.token).trim().toLowerCase()
    },
    customStyles: styles.mediumColumn
  },
  {
    key: "index",
    header: (
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("rating__participant_index")}
      </Heading>
    ),
    content: surveyInvitation => surveyInvitation.index,
    sortConfig: {
      key: "index",
      isSortable: true
    },
    customStyles: styles.smallColumn
  },
  {
    key: "projectModuleProgresses",
    header: (
      <Heading level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
        {t("rater_rating__participant_table_column_full_rated", {count: fullyRatedProjectModulesCount})}
      </Heading>
    ),
    content: surveyInvitation => (
      <RaterRatingParticipantProgressIndicator projectModules={projectModules} surveyInvitation={surveyInvitation} />
    ),
    sortConfig: {
      key: "projectModuleProgresses",
      isSortable: true,
      customSort: surveyInvitation =>
        surveyInvitation.projectModuleProgresses.reduce(
          (accumulator, progress) =>
            progress.status === ProjectModuleProgressType.Completed
              ? accumulator + 1
              : progress.questionsInProgressCount !== null && progress.questionsInProgressCount > 0
              ? accumulator + 0.5
              : accumulator,
          0
        )
    },
    customStyles: styles.largeColumn
  },
  {
    key: "status",
    header: <Icon name={IconName.PaperCorrection} />,
    content: surveyInvitation => {
      const ratingsByParticipants = projectModules.flatMap(projectModule => projectModule.ratingsByParticipants)

      const ratingsForParticipant = ratingsByParticipants.filter(
        ({participantId}) => participantId === surveyInvitation.id
      )
      const allModulesRated = every(
        ({isFullyRated, isNotRatable}) => isFullyRated || isNotRatable,
        ratingsForParticipant
      )

      return allModulesRated ? <Icon name={IconName.Check} color={ratingIndicatorFinalized} /> : null
    },
    customStyles: styles.statusIconColumn
  }
]

const styles = {
  statusIconColumn: css({
    flex: `0 0 ${Icon.defaultProps?.width ?? 0}px`
  }),
  smallColumn: css({
    flex: "1 1 0"
  }),
  mediumColumn: css({
    flex: "2 2 0"
  }),
  largeColumn: css({
    flex: "3 3 0"
  }),
  marginLeft: {
    marginLeft: spacingSmall
  }
}
