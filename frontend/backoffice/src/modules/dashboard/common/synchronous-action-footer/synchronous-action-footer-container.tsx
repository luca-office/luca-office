import * as React from "react"
import {useDispatch, useSelector} from "react-redux"
import {Dispatch} from "redux"
import {
  DEFAULT_PROJECT_MODULE_DURATION_IN_S,
  getScenarioOrQuestionnaireDurationInSeconds
} from "shared/components/desktop/config"
import {useLatestStartedProjectModule, useProjectModules} from "shared/graphql/hooks"
import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {Project, ProjectModule, Survey, SurveyLight} from "shared/models"
import {Route as SharedRoute} from "shared/routes"
import {
  convertMillisecondsToSeconds,
  first,
  getDifferenceInMilliseconds,
  isDefined,
  now,
  Option,
  parseDateString,
  sortByPosition
} from "shared/utils"
import {useEndSurvey, useStartQuestionnaire, useStartScenario, useStartSurvey} from "../../../../graphql/hooks"
import {AppAction} from "../../../../redux/actions/app-action"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {setActiveModuleAction, setActiveModuleIndexAction} from "../../../../redux/actions/ui/synchron-survey-action"
import {AppState} from "../../../../redux/state/app-state"
import {ProjectModuleManualSurvey} from "../../../../redux/state/ui/synchron-survey-state"
import {Route} from "../../../../routes"
import {surveyPollingRate} from "../../../monitoring/config/config"
import {isManualSynchronousSurvey} from "../../../surveys/utils/common"
import {getCurrentlyActiveProjectModuleIndexOfSurvey} from "../survey-progress/utils/manual-synchron-survey"
import {SynchronousActionFooter, SynchronousActionFooterLocation} from "./synchronous-action-footer"

export interface SynchronousActionFooterContainer {
  readonly surveyId: UUID
  readonly projectId: UUID
  readonly projectOption: Option<Project>
  readonly location: SynchronousActionFooterLocation
  readonly isAsynchronousSurvey: boolean
  readonly chatParticipantsIds?: UUID[]
  readonly unreadParticipantMessages?: number
  readonly onClickChatButton?: () => void
}

export const SynchronousActionFooterContainer: React.FunctionComponent<SynchronousActionFooterContainer> = ({
  surveyId,
  projectId,
  location,
  projectOption,
  isAsynchronousSurvey,
  chatParticipantsIds = [],
  onClickChatButton,
  unreadParticipantMessages
}) => {
  const dispatch = useDispatch()
  const activeModuleIndex = useSelector<AppState, Option<number>>(state => state.ui.synchronSurvey.activeModuleIndex)
  const activeProjectModule = useSelector<AppState, Option<ProjectModuleManualSurvey>>(
    state => state.ui.synchronSurvey.activeModule
  )

  const {startSurvey, startSurveyLoading} = useStartSurvey()
  const {endSurvey, endSurveyLoading} = useEndSurvey()
  const {startScenario, startScenarioLoading} = useStartScenario()
  const {startQuestionnaire, startQuestionnaireLoading} = useStartQuestionnaire()
  const {projectModules, projectModulesLoading} = useProjectModules(projectId)
  const {survey: surveyOption} = useSurveyLight(surveyId, surveyPollingRate)

  useLatestStartedProjectModule(surveyId, (id, startDate) =>
    handleOnLatestStartedModuleCompleted(id, startDate, dispatch, projectModules, surveyOption)
  )

  const projectModuleDurationMap: Map<UUID, number> = initProjectModuleDurationMap(projectModules)

  const hasSurveyStarted = surveyOption.exists(
    survey => survey.manualPeriod !== null && survey.manualPeriod.start !== null
  )
  const hasSurveyEnded = surveyOption.exists(survey => survey.manualPeriod !== null && survey.manualPeriod.end !== null)

  const isSurveyActive = hasSurveyStarted && !hasSurveyEnded

  const [isStartNextModuleModalVisible, setIsStartNextModuleModalVisible] = React.useState(false)
  const [isEndSurveyModalVisible, setIsEndSurveyModalVisible] = React.useState(false)
  const [remainingTimeOfModuleInSeconds, setRemainingTimeOfModuleInSeconds] = React.useState<null | number>(null)

  let intervall: number

  React.useEffect(() => {
    if (!isAsynchronousSurvey) {
      activeProjectModule.map(activeModule => {
        const moduleMaxDurationInSeconds =
          projectModuleDurationMap.get(activeModule.id) ?? DEFAULT_PROJECT_MODULE_DURATION_IN_S

        setRemainingTimeOfModuleInSeconds(
          remainingTimeOfActiveProjectModuleInSeconds(activeModule, moduleMaxDurationInSeconds)
        )

        const intervalHandler = () => {
          if (hasSurveyEnded) {
            return clearInterval(intervall)
          }

          const time = remainingTimeOfActiveProjectModuleInSeconds(activeModule, moduleMaxDurationInSeconds)

          setRemainingTimeOfModuleInSeconds(time)
        }

        intervall = window.setInterval(() => {
          intervalHandler()
        }, 1000)
      })
    }
    return () => {
      clearInterval(intervall)
    }
  }, [activeProjectModule.map(module => module.id).orNull()])

  React.useEffect(() => {
    if (isAsynchronousSurvey && isSurveyActive) {
      surveyOption.forEach(survey =>
        projectOption.forEach(project => {
          const time = remainingTimeOfProjectInSeconds(survey, project.maxDurationInSeconds)
          setRemainingTimeOfModuleInSeconds(time)

          const intervalHandler = () => {
            if (hasSurveyEnded) {
              return clearInterval(intervall)
            }
            const time = remainingTimeOfProjectInSeconds(survey, project.maxDurationInSeconds)
            setRemainingTimeOfModuleInSeconds(time)
          }

          intervall = window.setInterval(() => {
            intervalHandler()
          }, 1000)
        })
      )
    }
    return () => {
      clearInterval(intervall)
    }
  }, [
    surveyOption.map(survey => survey.manualPeriod?.start).orNull(),
    surveyOption.map(survey => survey.manualPeriod?.end).orNull(),
    projectOption.map(project => project.id).orNull()
  ])

  const setNextActiveModule = () => {
    if (activeModuleIndex.isEmpty()) {
      dispatch(setActiveModuleIndexAction(Option.of(0)))
      dispatch(setActiveModuleAction(Option.of(sortedProjectModules[0]), now()))
    } else {
      activeModuleIndex.map(index => {
        dispatch(setActiveModuleIndexAction(Option.of(index + 1)))
        dispatch(setActiveModuleAction(Option.of(sortedProjectModules[index + 1]), now()))
      })
    }
  }

  const sortedProjectModules = sortByPosition(projectModules)

  const nextProjectModule = activeModuleIndex
    .map(index => Option.of(sortedProjectModules[index + 1]))
    .getOrElse(first(sortedProjectModules))

  const handleStartScenario = (scenarioId: UUID, surveyId: UUID) => {
    startScenario(scenarioId, surveyId).then(setNextActiveModule)
  }

  const handleStartSurvey = (surveyId: UUID) => {
    startSurvey(surveyId).then(() => {
      first(sortedProjectModules).map(module => {
        if (module.questionnaireId !== null) {
          startQuestionnaire(module.questionnaireId, surveyId).then(setNextActiveModule)
        } else if (module.scenarioId !== null) {
          startScenario(module.scenarioId, surveyId).then(setNextActiveModule)
        }
      })
    })
  }

  const handleEndSurvey = (surveyId: UUID) => {
    endSurvey(surveyId)
  }

  const handleStartQuestionnaire = (questionnaireId: UUID, surveyId: UUID) => {
    startQuestionnaire(questionnaireId, surveyId).then(setNextActiveModule)
  }

  const handleStartNextModuleConfirm = () => {
    setIsStartNextModuleModalVisible(false)

    nextProjectModule.forEach(module => {
      if (module.scenarioId !== null) {
        const scenarioDuration = getScenarioOrQuestionnaireDurationInSeconds(module.scenario?.maxDurationInSeconds)
        setRemainingTimeOfModuleInSeconds(scenarioDuration)
        handleStartScenario(module.scenarioId, surveyId)
      } else if (module.questionnaireId !== null) {
        const questionnaireDuration = getScenarioOrQuestionnaireDurationInSeconds(
          module.questionnaire?.maxDurationInSeconds
        )

        setRemainingTimeOfModuleInSeconds(questionnaireDuration)
        handleStartQuestionnaire(module.questionnaireId, surveyId)
      }
    })
  }

  const navigateToProjectProgress = () =>
    dispatch(navigateToRouteAction(SharedRoute.SurveyMonitoring, {projectId, surveyId}))

  const navigateToScoringOverview = () => dispatch(navigateToRouteAction(Route.SurveyScoring, {projectId, surveyId}))

  const actionsLoading =
    startSurveyLoading || startScenarioLoading || startQuestionnaireLoading || projectModulesLoading || endSurveyLoading

  const completedCount = surveyOption.map(survey => survey.completedParticipationsCount).getOrElse(0)

  return (
    <SynchronousActionFooter
      actionsLoading={actionsLoading}
      assignedProject={surveyOption.map(survey => survey.project)}
      chatParticipantsIds={chatParticipantsIds}
      completedCount={completedCount}
      currentlyActiveProjectModule={activeProjectModule}
      endSurvey={handleEndSurvey}
      invitationsCount={surveyOption.map(survey => survey.invitationsCount).getOrElse(0)}
      hasSurveyStarted={hasSurveyStarted}
      hasSurveyEnded={hasSurveyEnded}
      isEndSurveyModalVisible={isEndSurveyModalVisible}
      isStartNextModuleModalVisible={isStartNextModuleModalVisible}
      isAsynchronousSurvey={isAsynchronousSurvey}
      location={location}
      navigateToProjectProgress={navigateToProjectProgress}
      navigateToScoring={navigateToScoringOverview}
      nextProjectModuleToBeStarted={nextProjectModule}
      onClickChatButton={onClickChatButton}
      onStartNextModuleConfirm={handleStartNextModuleConfirm}
      remainingTimeOfProjectModuleInSeconds={remainingTimeOfModuleInSeconds}
      setIsEndSurveyModalVisible={setIsEndSurveyModalVisible}
      setIsStartNextModuleModalVisible={setIsStartNextModuleModalVisible}
      startSurvey={handleStartSurvey}
      surveyId={surveyId}
      unreadParticipantMessages={unreadParticipantMessages || 0}
    />
  )
}

const handleOnLatestStartedModuleCompleted = (
  latestStartedModuleId: UUID | null,
  startDate: Date | null,
  dispatch: Dispatch<AppAction>,
  projectModules: ProjectModule[],
  surveyOption: Option<SurveyLight>
) => {
  const {activeModuleIndexZeroBased, activeModule} = getCurrentlyActiveProjectModuleIndexOfSurvey(
    latestStartedModuleId,
    projectModules
  )

  const isSynchronousSurvey = isManualSynchronousSurvey(surveyOption.map(survey => survey.executionType))

  if (latestStartedModuleId !== null && startDate !== null && isSynchronousSurvey) {
    dispatch(setActiveModuleAction(activeModule, startDate))
    dispatch(setActiveModuleIndexAction(activeModuleIndexZeroBased))
  }
}

const initProjectModuleDurationMap = (projectModules: ProjectModule[]): Map<UUID, number> => {
  const map = new Map<UUID, number>()

  projectModules.map(module =>
    map.set(
      module.id,
      getScenarioOrQuestionnaireDurationInSeconds(
        module.scenario !== null ? module.scenario.maxDurationInSeconds : module.questionnaire?.maxDurationInSeconds
      )
    )
  )

  return map
}

const remainingTimeOfActiveProjectModuleInSeconds = (
  activeModule: ProjectModuleManualSurvey,
  moduleMaxDurationInSeconds: number
) =>
  moduleMaxDurationInSeconds - convertMillisecondsToSeconds(getDifferenceInMilliseconds(activeModule.startedAt, now()))

const remainingTimeOfProjectInSeconds = (survey: SurveyLight, projectMaxDurationInSeconds: number) => {
  if (isDefined(survey.manualPeriod?.start)) {
    return (
      projectMaxDurationInSeconds -
      convertMillisecondsToSeconds(getDifferenceInMilliseconds(parseDateString(survey.manualPeriod?.start!), now()))
    )
  } else {
    return null
  }
}
