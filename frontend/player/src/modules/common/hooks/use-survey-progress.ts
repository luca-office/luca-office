import {useDispatch, useSelector} from "react-redux"
import {NotificationSeverity} from "shared/enums"
import {ProjectModuleType, SurveyEventType, SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {AppNotification, OfficeModule} from "shared/models"
import {resetDataStateAction, resetEmailsAction, updateNotesAction} from "shared/redux/actions"
import {resetProjectResumptionStateAction} from "shared/redux/actions/project-resumption-action"
import {cancelScheduledQuestionnaires} from "shared/redux/actions/ui/scheduled-questionnaires-action"
import {closeAllWindows} from "shared/redux/actions/ui/window-manager-action"
import {resetUiStateAction, updateActiveModuleAction, updateNotification} from "shared/redux/actions/ui-action"
import {selectSurveyInvitation} from "shared/redux/state/data"
import {
  first,
  Option,
  sendBaseSurveyEvent,
  sendResumeQuestionnaireEvent,
  sendResumeScenarioEvent,
  sendStartQuestionnaireEvent,
  sendStartScenarioEvent,
  sortByPosition
} from "shared/utils"
import {navigateToRouteAction} from "../../../redux/actions/routing-action"
import {AppState} from "../../../redux/state/app-state"
import {Route} from "../../../routes"

export interface UseSurveyProgress {
  readonly isLastModule: boolean
  readonly startNextModule: () => void
  readonly surveyExecutionType: Option<SurveyExecutionType>
  readonly activeModuleOption: Option<OfficeModule>
  readonly handleEndProject: () => void
  readonly startFirstModule: () => void
  readonly startSpecificModuleById: (moduleType: ProjectModuleType, moduleId: UUID) => void
  readonly resumeOfficeModule: (officeModule: OfficeModule) => void
  readonly resetLocalStateAndCloseWindows: () => void
}

export const useSurveyProgress = (): UseSurveyProgress => {
  const dispatch = useDispatch()
  const officeModules = useSelector<AppState, Array<OfficeModule>>(state => state.data.common.officeModules)
  const activeModuleOption = useSelector<AppState, Option<OfficeModule>>(state => state.ui.common.activeModule)
  const {executionType, surveyId: surveyIdOption, invitationId: invitationIdOption} = useSelector(
    selectSurveyInvitation
  )
  const sortedOfficeModules = sortByPosition(officeModules)
  const currentModuleIndex = sortedOfficeModules.findIndex(
    module => module.position === activeModuleOption.map(({position}) => position).orUndefined()
  )

  const resetLocalStateAndCloseWindows = () => {
    dispatch(closeAllWindows())
    dispatch(cancelScheduledQuestionnaires())
    dispatch(updateNotesAction(""))
    dispatch(resetEmailsAction())
    dispatch(resetUiStateAction())
  }

  const isLastModule = currentModuleIndex === sortedOfficeModules.length - 1

  const handleSendSurveyEvent = (eventType: SurveyEventType, data?: Record<string, unknown>) => {
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId => {
        sendBaseSurveyEvent({surveyId, invitationId, eventType, data})
      })
    )
  }

  const handleEndProject = () => {
    dispatch(updateActiveModuleAction(Option.none()))
    handleSendSurveyEvent(SurveyEventType.EndProject)

    dispatch(resetUiStateAction())
    dispatch(resetDataStateAction())

    dispatch(navigateToRouteAction({routeType: Route.EndOfProject}))
  }

  const startNextModule = () => {
    if (isLastModule) {
      handleEndProject()
    } else if (currentModuleIndex === -1) {
      // error: module not found
      dispatch(
        updateNotification(
          Option.of<AppNotification>({
            messageKey: "scenario__next_scenario_could_not_be_found",
            severity: NotificationSeverity.Error
          })
        )
      )
    } else {
      const nextModule = sortedOfficeModules[currentModuleIndex + 1]
      dispatch(updateActiveModuleAction(Option.of(nextModule)))

      if (nextModule.moduleType === ProjectModuleType.Scenario && nextModule.scenarioId !== null) {
        startScenario(nextModule.scenarioId)
      } else if (nextModule.questionnaireId !== null) {
        startQuestionnaire(nextModule.questionnaireId)
      }
    }
  }

  const startFirstModule = () => {
    const firstModule = first(sortedOfficeModules)

    firstModule.forEach(module => {
      dispatch(updateActiveModuleAction(Option.of(module)))

      if (module.moduleType === ProjectModuleType.Scenario && module.scenarioId !== null) {
        startScenario(module.scenarioId)
      } else if (module.questionnaireId !== null) {
        startQuestionnaire(module.questionnaireId)
      }
    })
  }

  const startSpecificModuleById = (moduleType: ProjectModuleType, moduleId: UUID) => {
    const nextModule = sortedOfficeModules.find(
      module =>
        (moduleType === ProjectModuleType.Questionnaire && module.questionnaireId === moduleId) ||
        (moduleType === ProjectModuleType.Scenario && module.scenarioId === moduleId)
    )

    if (nextModule !== undefined) {
      dispatch(updateActiveModuleAction(Option.of(nextModule)))

      if (nextModule.moduleType === ProjectModuleType.Scenario && nextModule.scenarioId !== null) {
        startScenario(nextModule.scenarioId)
      } else if (nextModule.questionnaireId !== null) {
        startQuestionnaire(nextModule.questionnaireId)
      }
    }
  }

  const resumeOfficeModule = (officeModule: OfficeModule) => {
    dispatch(updateActiveModuleAction(Option.of(officeModule)))
    if (officeModule.moduleType === ProjectModuleType.Scenario && officeModule.scenarioId !== null) {
      resumeScenario(officeModule.scenarioId)
    } else if (officeModule.questionnaireId !== null) {
      resumeQuestionnaire(officeModule.questionnaireId)
    }
  }

  const startScenario = (scenarioId: UUID) => {
    dispatch(resetProjectResumptionStateAction())
    dispatch(navigateToRouteAction({routeType: Route.ScenarioDetail, parameters: {scenarioId}}))
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId => sendStartScenarioEvent()(surveyId, invitationId, scenarioId))
    )
  }

  const resumeScenario = (scenarioId: UUID) => {
    dispatch(navigateToRouteAction({routeType: Route.ScenarioDetail, parameters: {scenarioId}}))
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId => sendResumeScenarioEvent()(surveyId, invitationId, scenarioId))
    )
  }

  const startQuestionnaire = (questionnaireId: UUID) => {
    dispatch(navigateToRouteAction({routeType: Route.Questionnaire, parameters: {questionnaireId}}))
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId => sendStartQuestionnaireEvent(questionnaireId)(surveyId, invitationId))
    )
  }

  const resumeQuestionnaire = (questionnaireId: UUID) => {
    dispatch(navigateToRouteAction({routeType: Route.Questionnaire, parameters: {questionnaireId}}))
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId => sendResumeQuestionnaireEvent(questionnaireId)(surveyId, invitationId))
    )
  }

  return {
    isLastModule,
    startNextModule,
    activeModuleOption,
    surveyExecutionType: executionType,
    handleEndProject,
    startFirstModule,
    startSpecificModuleById,
    resumeOfficeModule,
    resetLocalStateAndCloseWindows
  }
}
