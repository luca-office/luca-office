import {css} from "@emotion/react"
import React from "react"
import {ColumnProps, Heading, Icon, ProgressBar, TableContainer, Text} from "shared/components"
import {HeadingLevel} from "shared/enums"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {ProjectModuleResultFragment} from "shared/graphql/generated/ProjectModuleResultFragment"
import {ProjectModule, ProjectModuleResult, SurveyResultsOverview} from "shared/models"
import {CustomStyle, Flex, FontWeight, spacingSmall, textEllipsis, TextSize} from "shared/styles"
import {LucaTFunction, useLucaTranslation} from "shared/translations"
import {find, getProjectModuleIcon, getProjectModuleTranslationKey, roundNumber, sort, toPercent} from "shared/utils"
import {TabbedCard} from "../../../../components"
import {ReportingParticipantsTable} from "../../common/participants-table/reporting-participants-table"
import {titleForProjectModuleId} from "../../utils/common"

interface Props extends CustomStyle {
  readonly projectModules: ProjectModule[]
  readonly surveyResultsOverview: SurveyResultsOverview
  readonly navigateToParticipantOverview: (surveyInvitationId: UUID) => void
  readonly navigateToScenario: (scenarioId: UUID) => void
  readonly navigateToQuestionnaire: (questionnaireId: UUID) => void
}

export const ModulesAndParticipantsTabbedCard: React.FC<Props> = ({
  customStyles,
  projectModules,
  surveyResultsOverview,
  navigateToParticipantOverview,
  navigateToScenario,
  navigateToQuestionnaire
}) => {
  const {t} = useLucaTranslation()

  const {averageScore, projectModuleResults, participantResults, maximumScore} = surveyResultsOverview

  const sortedProjectModuleResults = sort(projectModuleResult => {
    const projectModule = find(
      projectModule =>
        projectModuleResult.scenarioId !== null
          ? projectModule.moduleType === ProjectModuleType.Scenario &&
            projectModule.scenarioId === projectModuleResult.scenarioId
          : projectModule.moduleType === ProjectModuleType.Questionnaire &&
            projectModule.questionnaireId === projectModuleResult.questionnaireId,
      projectModules
    )
    return projectModule.map(({position}) => position).getOrElse(0)
  }, projectModuleResults)

  const projectModulesColumns = getProjectModuleResultsColumns(t, projectModules)

  const onModuleClicked = (entity: ProjectModuleResultFragment) => {
    if (entity.scenarioId !== null) {
      navigateToScenario(entity.scenarioId)
    } else if (entity.questionnaireId !== null) {
      navigateToQuestionnaire(entity.questionnaireId)
    }
  }

  return (
    <TabbedCard
      customStyles={customStyles}
      tabs={[
        {
          label: t("reporting_overview_project_modules", {count: sortedProjectModuleResults.length}),
          content: (
            <TableContainer<ProjectModuleResult>
              entities={sortedProjectModuleResults}
              entityKey={entity => (entity.questionnaireId ? entity.questionnaireId : entity.scenarioId) ?? ""}
              columns={projectModulesColumns}
              customStyles={styles.projectModulesTable}
              showFooter={true}
              onClick={onModuleClicked}
            />
          )
        },
        {
          label: t("projects__surveys_table_participants_count", {count: participantResults.length}),
          content: (
            <ReportingParticipantsTable
              averageScore={averageScore}
              maximumScore={maximumScore}
              participantResults={participantResults}
              navigateToParticipantOverview={navigateToParticipantOverview}
            />
          )
        }
      ]}
    />
  )
}

export const getProjectModuleResultsColumns = (
  t: LucaTFunction,
  projectModules: ProjectModule[]
): ColumnProps<ProjectModuleResult>[] => {
  return [
    {
      header: (
        <Heading customStyles={textEllipsis} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("rater_rating_details__project_module")}
        </Heading>
      ),
      content: (entity: ProjectModuleResult) => (
        <Text size={TextSize.Medium}>
          {titleForProjectModuleId(entity.questionnaireId, entity.scenarioId, projectModules)}
        </Text>
      ),
      key: "name"
    },
    {
      header: (
        <Heading customStyles={textEllipsis} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("type")}
        </Heading>
      ),
      content: (entity: ProjectModuleResult) => {
        const projectModuleType = entity.scenarioId ? ProjectModuleType.Scenario : ProjectModuleType.Questionnaire
        return (
          <div css={Flex.row}>
            <Icon name={getProjectModuleIcon(projectModuleType)} hasSpacing={true} />
            {t(getProjectModuleTranslationKey(projectModuleType))}
          </div>
        )
      },
      key: "type"
    },
    {
      header: (
        <Heading customStyles={textEllipsis} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("rater_rating_details__project_module_max_points")}
        </Heading>
      ),
      content: (entity: ProjectModuleResult) => (
        <Text size={TextSize.Medium}>{`${entity.maximumScore} ${
          entity.maximumScore === 1 ? t("coding_models__detail_score_singular") : t("rating__scoring_unit")
        }`}</Text>
      ),
      key: "maxPoints"
    },
    {
      header: (
        <Heading customStyles={textEllipsis} level={HeadingLevel.h3} fontWeight={FontWeight.Bold}>
          {t("reporting_overview_average_points")}
        </Heading>
      ),
      content: (entity: ProjectModuleResult) => {
        const averageScoreInPercent = toPercent(entity.averageScore, entity.maximumScore)
        return (
          <div css={Flex.row}>
            <ProgressBar
              customStyles={styles.progress}
              progressInPercent={averageScoreInPercent}
              verticalLinePositionInPercent={averageScoreInPercent}
            />
            <Text size={TextSize.Medium}>{`${roundNumber(entity.averageScore)} ${
              entity.averageScore === 1 ? t("coding_models__detail_score_singular") : t("rating__scoring_unit")
            }`}</Text>
          </div>
        )
      },
      key: "averagePoints"
    }
  ]
}

const styles = {
  progress: css({
    flexGrow: 1,
    marginRight: spacingSmall
  }),
  projectModulesTable: css({
    marginTop: spacingSmall
  })
}
