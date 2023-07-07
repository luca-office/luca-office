import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {
  ProjectProps,
  SurveyProps,
  useProject,
  useProjectModules,
  useRuntimeSurveyResults,
  useScenarioQuestionnairesLazy,
  useSurvey,
  useSurveyInvitationsProgress
} from "shared/graphql/hooks"
import {ParticipantProjectProgress, ProjectModule, RuntimeSurveyResults, ScenarioQuestionnaire} from "shared/models"
import {computeSurveyProgress, find, Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {AppState} from "../../../../redux/state/app-state"
import {ProjectModuleManualSurvey} from "../../../../redux/state/ui/synchron-survey-state"
import {Route} from "../../../../routes"
import {surveyPollingRate} from "../../config/config"
import {isSurveyFinished} from "shared/utils/survey-finished"

export interface ManualSynchronousParticipantProgress extends ParticipantProjectProgress {
  readonly isOnline: boolean
}

export interface UseMonitoringDashboardHook extends Pick<ProjectProps, "project">, Pick<SurveyProps, "survey"> {
  readonly activeModule: Option<ProjectModule>
  readonly activeModuleIndex: number
  readonly currentModuleOfSynchronSurvey: Option<ProjectModuleManualSurvey>
  readonly dataLoading: boolean
  readonly navigateToParticipantOverview: (id: UUID) => void
  readonly selectedQuestionnaireId: string | null
  readonly projectModules: ProjectModule[]
  readonly questionnaireCount: number
  readonly runtimeSurveyResults: RuntimeSurveyResults[]
  readonly scenarioQuestionnaires: ScenarioQuestionnaire[]
  readonly scenarioCount: number
  readonly surveyProgress: ParticipantProjectProgress[]
  readonly setSelectedQuestionnaireId: React.Dispatch<React.SetStateAction<string | null>>
  readonly onlineCount: number
}

export const useMonitoringDashboard = (
  projectId: UUID,
  surveyId: UUID,
  moduleId?: UUID
): UseMonitoringDashboardHook => {
  const dispatch = useDispatch()

  const {project, projectLoading} = useProject(projectId)
  const {survey, surveyLoading} = useSurvey(surveyId, surveyPollingRate)

  const pollingRateForProgress = survey.exists(survey => isSurveyFinished(survey)) ? undefined : surveyPollingRate
  const {surveyInvitationsProgress, surveyInvitationsProgressLoading} = useSurveyInvitationsProgress(
    surveyId,
    pollingRateForProgress
  )

  const currentModuleOfSynchronSurvey = useSelector<AppState, Option<ProjectModuleManualSurvey>>(
    state => state.ui.synchronSurvey.activeModule
  )

  const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState<string | null>(null)

  const {projectModules, projectModulesLoading} = useProjectModules(projectId)

  const activeModule = find(module => module.id === moduleId, projectModules)
  const activeModuleIndex = activeModule.map(module => projectModules.indexOf(module)).getOrElse(-1)

  const scenarioId = activeModule.map(module => module.scenarioId).orNull()

  const {runtimeSurveyResults, runtimeSurveyResultsLoading} = useRuntimeSurveyResults(
    surveyId,
    scenarioId ?? "",
    pollingRateForProgress,
    scenarioId === null
  )

  React.useEffect(() => {
    const scenarioId = activeModule.map(module => module.scenarioId).orNull()

    if (scenarioId !== null) {
      getScenarioQuestionnaires(scenarioId)
    }
  }, [activeModule.map(module => module.scenarioId).orNull()])

  const {
    getScenarioQuestionnaires,
    scenarioQuestionnaires,
    scenarioQuestionnairesLoading
  } = useScenarioQuestionnairesLazy()

  const navigateToParticipantOverview = (surveyInvitationId: UUID) =>
    dispatch(navigateToRouteAction(Route.SurveyMonitoringParticipant, {projectId, surveyId, surveyInvitationId}))

  const surveyProgress = computeSurveyProgress(projectModules, surveyInvitationsProgress)

  const availableParticipantIds = useSelector<AppState, UUID[]>(state => state.chat.availableParticipantIds)

  const onlineCount = availableParticipantIds.length

  return {
    activeModule,
    activeModuleIndex,
    currentModuleOfSynchronSurvey,
    dataLoading:
      surveyInvitationsProgressLoading ||
      projectModulesLoading ||
      projectLoading ||
      surveyLoading ||
      scenarioQuestionnairesLoading ||
      runtimeSurveyResultsLoading,
    navigateToParticipantOverview,
    selectedQuestionnaireId,
    setSelectedQuestionnaireId,
    project,
    projectModules,
    questionnaireCount: projectModules.filter(modules => !!modules.questionnaire).length,
    runtimeSurveyResults,
    scenarioCount: projectModules.filter(modules => !!modules.scenario).length,
    survey,
    surveyProgress,
    onlineCount,
    scenarioQuestionnaires
  }
}
