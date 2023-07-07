import {css} from "@emotion/react"
import React from "react"
import {ContentLoadingIndicator} from "shared/components"
import {ProjectModuleType} from "shared/graphql/generated/globalTypes"
import {ModuleProgress} from "shared/models"
import {spacingLarge} from "shared/styles"
import {ParticipantQuestionnaireDetailContainer} from "../reporting-detail/participant-questionnaire-container"
import {ParticipantScenarioDetailContainer} from "../reporting-detail/participant-scenario-container"
import {ReportingHeader} from "../reporting-header/reporting-header"
import {useReportingOverview} from "../reporting-overview/hooks/use-reporting-overview"
import {ReportingOverview} from "../reporting-overview/reporting-overview"
import {ReportingSubHeader} from "../reporting-sub-header/reporting-sub-header"

interface Props {
  readonly surveyId: UUID
  readonly token: string
  readonly scenarioId: UUID | null
  readonly questionnaireId: UUID | null
}

export const ReportingContentContainer: React.FC<Props> = ({surveyId, token, scenarioId, questionnaireId}) => {
  const {
    dataLoading,
    survey: surveyOption,
    participantName: participantNameOption,
    averageScore,
    maximumScore,
    participantScore,
    participantProjectProgress: participantProjectProgressOption,
    projectProgress,
    navigateToScenarioDetail,
    navigateToQuestionnaireDetail,
    navigateToOverview,
    surveyInvitationId
  } = useReportingOverview({
    surveyId,
    token
  })

  const isOverview = scenarioId === null && questionnaireId === null

  const handleNavigation = (module: ModuleProgress) => {
    if (module.moduleType === ProjectModuleType.Scenario) {
      navigateToScenarioDetail(module.moduleId)
    } else {
      navigateToQuestionnaireDetail(module.moduleId)
    }
  }

  const scenarioProgress = participantProjectProgressOption
    .map(progress => progress.moduleProgress.find(module => module.moduleId === scenarioId))
    .orNull()

  const renderOverview = () => (
    <ReportingOverview
      participantScore={participantScore}
      projectProgress={projectProgress}
      participantProjectProgress={participantProjectProgressOption}
      averageScore={averageScore}
      maximumScore={maximumScore}
      onTableEntityClick={handleNavigation}
      survey={surveyOption}
      participantName={participantNameOption}
    />
  )

  const renderQuestionnaireDetail = () =>
    questionnaireId && surveyInvitationId
      ? surveyOption
          .map(survey => (
            <ParticipantQuestionnaireDetailContainer
              surveyId={survey.id}
              projectId={survey.projectId}
              questionnaireId={questionnaireId}
              surveyInvitationId={surveyInvitationId}
              onNavigateBack={navigateToOverview}
              token={token}
            />
          ))
          .orNull()
      : null

  const renderScenarioDetail = () => {
    if (scenarioId && scenarioProgress && surveyInvitationId) {
      return (
        <ParticipantScenarioDetailContainer
          onNavigateBack={navigateToOverview}
          invitationId={surveyInvitationId}
          surveyId={surveyId}
          token={token}
          scenarioId={scenarioId}
        />
      )
    } else {
      return null
    }
  }

  const renderContent = () => {
    if (isOverview) {
      return renderOverview()
    } else if (scenarioId !== null) {
      return renderScenarioDetail()
    } else if (questionnaireId !== null) {
      return renderQuestionnaireDetail()
    } else {
      return null
    }
  }

  return (
    <div css={styles.component}>
      <ReportingHeader participantName={participantNameOption} />
      <ReportingSubHeader />
      <div css={styles.wrapper}>
        {dataLoading ? <ContentLoadingIndicator customStyles={styles.loadingIndicator} /> : renderContent()}
      </div>
    </div>
  )
}

const styles = {
  component: css({
    display: "grid",
    gridTemplateRows: "repeat(2, minmax(min-content, max-content)) 1fr",
    height: "100vh"
  }),
  wrapper: css({
    padding: spacingLarge
  }),
  loadingIndicator: css({
    height: "100%",
    boxSizing: "border-box"
  })
}
