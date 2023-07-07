import React, {useState} from "react"
import {useDispatch} from "react-redux"
import {HeaderCarouselBaseElement} from "shared/components"
import {useProject, useProjectModules, useRatings, useSurveyResultsOverview} from "shared/graphql/hooks"
import {NavigationConfig} from "shared/models"
import {getCompletedParticipantsCount} from "shared/utils/get-completed-participants-count"
import {navigateToRouteAction} from "../../../redux/actions/navigation-action"
import {Route} from "../../../routes"
import {getFirstProjectModuleFromSurveyResultsOverview} from "../utils/project-module"
import {ReportingDashboard} from "./reporting-dashboard"

interface ReportingDashboardContainerProps {
  readonly projectId: UUID
  readonly surveyId: UUID
  readonly scenarioId?: UUID
  readonly questionnaireId?: UUID
  readonly projectModuleId?: UUID
}

export interface ReportingDashboardHeaderCarousel extends HeaderCarouselBaseElement {
  readonly scenarioId: UUID | null
  readonly questionnaireId: UUID | null
  readonly projectModuleId: UUID | null
}

export const ReportingDashboardContainer: React.FC<ReportingDashboardContainerProps> = ({
  projectId,
  surveyId,
  projectModuleId,
  scenarioId,
  questionnaireId
}) => {
  const dispatch = useDispatch()
  const {projectModules, projectModulesLoading} = useProjectModules(projectId)
  const {surveyResultsOverview, surveyResultsOverviewLoading} = useSurveyResultsOverview(surveyId)
  const {projectLoading, project} = useProject(projectId)

  const firstProjectModule = surveyResultsOverview.flatMap(overview =>
    getFirstProjectModuleFromSurveyResultsOverview(projectModules, overview)
  )

  const navigateToSurveyDetail = () => dispatch(navigateToRouteAction(Route.SurveyDetail, {id: projectId, surveyId}))

  const navigateToProjectModuleScenarioDetail = (scenarioId: UUID, projectModuleId: UUID) =>
    dispatch(
      navigateToRouteAction(Route.SurveyReportingScenario, {
        projectId,
        surveyId,
        projectModuleId,
        scenarioId
      })
    )

  const navigateToProjectModuleQuestionnaireDetail = (questionnaireId: UUID, projectModuleId: UUID) =>
    dispatch(
      navigateToRouteAction(Route.SurveyReportingQuestionnaire, {
        projectId,
        projectModuleId,
        surveyId,
        questionnaireId
      })
    )

  const navigateToReportingDashboard = (projectModuleId: UUID) =>
    dispatch(navigateToRouteAction(Route.SurveyReporting, {projectId, surveyId, projectModuleId}))

  const navigateToParticipantOverview = (surveyInvitationId: UUID) =>
    dispatch(navigateToRouteAction(Route.SurveyReportingParticipant, {projectId, surveyId, surveyInvitationId}))

  const navigateToScenario = (scenarioId: UUID) => {
    const moduleId = projectModules.find(module => module.scenarioId === scenarioId)?.id

    if (moduleId !== undefined) {
      dispatch(
        navigateToRouteAction(Route.SurveyReportingScenario, {
          projectId,
          surveyId,
          projectModuleId: moduleId,
          scenarioId
        })
      )
    }
  }

  const navigateToQuestionnaire = (questionnaireId: UUID) => {
    const moduleId = projectModules.find(module => module.questionnaireId === questionnaireId)?.id

    if (moduleId !== undefined) {
      dispatch(
        navigateToRouteAction(Route.SurveyReportingQuestionnaire, {
          projectId,
          surveyId,
          projectModuleId: moduleId,
          questionnaireId
        })
      )
    }
  }

  const handleCarouselNavigation = (nextActiveElement: ReportingDashboardHeaderCarousel) => {
    const {projectModuleId, questionnaireId, scenarioId} = nextActiveElement

    if (scenarioId !== null && projectModuleId !== null) {
      navigateToProjectModuleScenarioDetail(scenarioId, projectModuleId)
    } else if (questionnaireId !== null && projectModuleId !== null) {
      navigateToProjectModuleQuestionnaireDetail(questionnaireId, projectModuleId)
    } else {
      firstProjectModule.forEach(projectModule => navigateToReportingDashboard(projectModule.id))
    }
  }

  const completedParticipantsCount = surveyResultsOverview
    .map(getCompletedParticipantsCount)
    .getOrElse({numCompletedParticipants: 0, totalParticipants: 0})

  return surveyResultsOverview
    .map(resultsOverview => (
      <ReportingDashboard
        surveyId={surveyId}
        handleCarouselNavigation={handleCarouselNavigation}
        navigateToSurveyDetail={navigateToSurveyDetail}
        navigateToParticipantOverview={navigateToParticipantOverview}
        navigateToScenario={navigateToScenario}
        navigateToQuestionnaire={navigateToQuestionnaire}
        projectId={projectId}
        projectModules={projectModules}
        scenarioId={scenarioId}
        projectModuleId={projectModuleId}
        questionnaireId={questionnaireId}
        surveyResultsOverview={resultsOverview}
        loading={projectModulesLoading || surveyResultsOverviewLoading || projectLoading}
        completedParticipantsCount={completedParticipantsCount}
      />
    ))
    .orNull()
}
