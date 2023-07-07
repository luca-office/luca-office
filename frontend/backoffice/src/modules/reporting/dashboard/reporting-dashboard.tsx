import {css} from "@emotion/react"
import React from "react"
import {Card, Content, DetailViewHeader, HeaderCarouselContainer, LoadingIndicator} from "shared/components"
import {CompletedParticipantCount, ProjectModule, SurveyResultsOverview} from "shared/models"
import {spacingMedium} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {ReportingDashboardHeaderCarousel} from ".."
import {ReportingDetailViewContainer} from "../detail/reporting-detail-view-container"
import {scenarioOrQuestionnaireForProjectModuleId, titleForProjectModuleId} from "../utils/common"
import {ReportingProjectOverview} from "./project-overview/project-overview"

interface ReportingDashboardProps {
  readonly handleCarouselNavigation: (nextElement: ReportingDashboardHeaderCarousel) => void
  readonly navigateToSurveyDetail: () => void
  readonly navigateToParticipantOverview: (surveyInvitationId: UUID) => void
  readonly navigateToScenario: (scenarioId: UUID) => void
  readonly navigateToQuestionnaire: (questionnaireId: UUID) => void
  readonly loading: boolean
  readonly scenarioId?: UUID
  readonly surveyId: UUID
  readonly questionnaireId?: UUID
  readonly projectId: UUID
  readonly projectModuleId?: UUID
  readonly projectModules: ProjectModule[]
  readonly surveyResultsOverview: SurveyResultsOverview
  readonly completedParticipantsCount: CompletedParticipantCount
}

export const ReportingDashboard: React.FC<ReportingDashboardProps> = ({
  handleCarouselNavigation,
  navigateToSurveyDetail,
  navigateToParticipantOverview,
  navigateToScenario,
  navigateToQuestionnaire,
  loading,
  scenarioId,
  questionnaireId,
  projectId,
  projectModules,
  projectModuleId,
  surveyId,
  surveyResultsOverview,
  completedParticipantsCount
}) => {
  const {t} = useLucaTranslation()

  const showProjectOverview = scenarioId === undefined && questionnaireId === undefined

  const headerCarouselElements: ReportingDashboardHeaderCarousel[] = [
    {
      label: t("dashboard__project_project_navigation"),
      scenarioId: null,
      questionnaireId: null,
      projectModuleId: null
    },
    ...projectModules.map(module => ({
      scenarioId: module.scenarioId,
      questionnaireId: module.questionnaireId,
      projectModuleId: module.id,
      label: `${titleForProjectModuleId(module.questionnaireId, module.scenarioId, projectModules)} (${
        module.questionnaireId !== null ? t("questionnaire__title") : t("scenario_title")
      })`
    }))
  ]

  const currentSelectedHeaderCarousel =
    headerCarouselElements.find(
      element => element.scenarioId === scenarioId || element.questionnaireId === questionnaireId
    ) ?? headerCarouselElements[0]

  const correspondingScenarioOrQuestionnaire = scenarioOrQuestionnaireForProjectModuleId(
    questionnaireId,
    scenarioId,
    projectModules
  )

  return (
    <Content
      subHeader={
        <DetailViewHeader
          navigationButtonConfig={{labelKey: "project_title_survey", onClick: navigateToSurveyDetail}}
          labelKey={"reporting_overview_subheader_title"}
        />
      }>
      <Card hasShadow={true}>
        {!loading && (
          <HeaderCarouselContainer
            defaultSelectedElement={currentSelectedHeaderCarousel}
            elements={headerCarouselElements}
            onChange={handleCarouselNavigation}
          />
        )}
        {loading ? (
          <LoadingIndicator />
        ) : (
          <div css={styles.content}>
            {showProjectOverview ? (
              <ReportingProjectOverview
                surveyResultsOverview={surveyResultsOverview}
                projectModules={projectModules}
                completedParticipantsCount={completedParticipantsCount}
                navigateToParticipantOverview={navigateToParticipantOverview}
                navigateToScenario={navigateToScenario}
                navigateToQuestionnaire={navigateToQuestionnaire}
              />
            ) : (
              correspondingScenarioOrQuestionnaire &&
              projectModuleId && (
                <ReportingDetailViewContainer
                  projectId={projectId}
                  surveyId={surveyId}
                  projectModuleId={projectModuleId}
                  correspondingScenarioOrQuestionnaire={correspondingScenarioOrQuestionnaire}
                />
              )
            )}
          </div>
        )}
      </Card>
    </Content>
  )
}

const styles = {
  content: css({
    padding: spacingMedium
  })
}
