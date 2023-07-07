import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {LoadingIndicator} from "shared/components"
import {
  useRuntimeSurveyResultsLazy,
  useScenarioInfo,
  useScenarioQuestionnairesLazy,
  useSurveyEventsForSurvey,
  useSurveyResultsForProjectModule,
  useSurveyResultsOverview
} from "shared/graphql/hooks"
import {Questionnaire, Scenario} from "shared/models"
import {getCompletedParticipantsCount} from "shared/utils/get-completed-participants-count"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {Route} from "../../../routes"
import {ReportingDetailView} from "./reporting-detail-view"

interface Props {
  readonly correspondingScenarioOrQuestionnaire: Scenario | Questionnaire
  readonly surveyId: UUID
  readonly projectModuleId: UUID
  readonly projectId: UUID
}

export const ReportingDetailViewContainer: React.FC<Props> = ({
  correspondingScenarioOrQuestionnaire,
  surveyId,
  projectModuleId,
  projectId
}) => {
  const dispatch = useDispatch()

  const {surveyResultsForProjectModule, surveyResultsForProjectModuleLoading} = useSurveyResultsForProjectModule(
    surveyId,
    projectModuleId
  )

  const [isScoringOverlayVisible, setisScoringOverlayVisible] = useState(false)
  const {runtimeSurveyResults, getRuntimeSurveyResults, runtimeSurveyResultsLoading} = useRuntimeSurveyResultsLazy()

  const {
    scenarioQuestionnaires,
    scenarioQuestionnairesLoading,
    getScenarioQuestionnaires
  } = useScenarioQuestionnairesLazy()

  const {isLoading: scenarioInfoLoading, scenarioInfoOption} = useScenarioInfo({
    surveyId,
    scenarioId: correspondingScenarioOrQuestionnaire.id
  })

  const {surveyResultsOverview, surveyResultsOverviewLoading} = useSurveyResultsOverview(surveyId)

  const {surveyEvents, surveyEventsLoading} = useSurveyEventsForSurvey({
    surveyId,
    scenarioId: correspondingScenarioOrQuestionnaire.id
  })

  const disableFinalScoreButton =
    correspondingScenarioOrQuestionnaire.__typename === "Scenario"
      ? correspondingScenarioOrQuestionnaire.codingModel === null
      : false

  const completedParticipantsCount = surveyResultsOverview
    .map(getCompletedParticipantsCount)
    .getOrElse({numCompletedParticipants: 0, totalParticipants: 0})

  useEffect(() => {
    if (correspondingScenarioOrQuestionnaire.__typename === "Scenario") {
      getRuntimeSurveyResults(surveyId, correspondingScenarioOrQuestionnaire.id)
      getScenarioQuestionnaires(correspondingScenarioOrQuestionnaire.id)
    }
  }, [correspondingScenarioOrQuestionnaire.id])

  const navigateToParticipantOverview = (surveyInvitationId: UUID) => {
    if (correspondingScenarioOrQuestionnaire.__typename === "Scenario") {
      dispatch(
        navigateToRouteAction(Route.SurveyReportingParticipantScenario, {
          projectId,
          surveyId,
          surveyInvitationId,
          scenarioId: correspondingScenarioOrQuestionnaire.id,
          query: {fromModuleId: projectModuleId}
        })
      )
    } else {
      dispatch(
        navigateToRouteAction(Route.SurveyReportingParticipantQuestionnaire, {
          projectId,
          surveyId,
          surveyInvitationId,
          questionnaireId: correspondingScenarioOrQuestionnaire.id,
          query: {fromModuleId: projectModuleId}
        })
      )
    }
  }

  const isLoading =
    runtimeSurveyResultsLoading ||
    surveyResultsForProjectModuleLoading ||
    scenarioQuestionnairesLoading ||
    scenarioInfoLoading ||
    surveyResultsOverviewLoading ||
    surveyEventsLoading

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    surveyResultsForProjectModule
      .map(projectModuleResults => (
        <ReportingDetailView
          scenarioInfo={scenarioInfoOption}
          activeProjectModuleResult={projectModuleResults}
          correspondingScenarioOrQuestionnaire={correspondingScenarioOrQuestionnaire}
          runtimeSurveyResults={runtimeSurveyResults}
          scenarioQuestionnaires={scenarioQuestionnaires}
          setIsScoringOverlayVisible={setisScoringOverlayVisible}
          isScoringOverlayVisible={isScoringOverlayVisible}
          completedParticipantsCount={completedParticipantsCount}
          navigateToParticipantOverview={navigateToParticipantOverview}
          surveyId={surveyId}
          surveyEvents={surveyEvents}
          disableFinalScoreButton={disableFinalScoreButton}
        />
      ))
      .orNull()
  )
}
