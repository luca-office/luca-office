import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {binaryViewerWindows, officeToolWindows} from "shared/components/desktop/config"
import {OfficeTool, OfficeWindowType} from "shared/enums"
import {useInterventions, useScenario, useScenarioQuestionnaires} from "shared/graphql/hooks"
import {Intervention, Scenario} from "shared/models"
import {closeAllWindows, closeWindow, minimizeWindow, openWindow} from "shared/redux/actions/ui/window-manager-action"
import {SharedAppState} from "shared/redux/state"
import {useLucaTranslation} from "shared/translations"
import {getDummyParticipantData, last, Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../redux/actions/navigation-action"
import {addTimeoutId, initializeState, resetPreview} from "../../../../redux/actions/player-preview-actions"
import {AppState} from "../../../../redux/state/app-state"
import {Route} from "../../../../routes"
import {useTaskbarPreview} from "./use-taskbar-preview"

export interface UseScenarioPreviewHook {
  readonly abortScenarioFinishModal: () => void
  readonly availableWindows: OfficeWindowType[]
  readonly closeQuestionnaireEvent: () => void
  readonly openWindow: (window: OfficeWindowType) => void
  readonly closeWindow: (window: OfficeWindowType) => void
  readonly confirmScenarioFinishModal: () => void
  readonly confirmScenarioTimeUpModal: () => void
  readonly currentQuestionnaireId: Option<UUID>
  readonly isFinishModalVisible: boolean
  readonly isScenarioDurationExpired: boolean
  readonly isLoading: boolean
  readonly interventions: Intervention[]
  readonly minimizeWindow: (windowType: OfficeWindowType) => void
  readonly sendCompletionMail: () => void
  readonly isStartModalVisible: boolean
  readonly onStartScenario: () => void
  readonly scenarioOption: Option<Scenario>
  readonly navigateToScenarioDetail: () => void
  readonly openWindows: Array<OfficeWindowType>
  readonly minimizedWindows: Array<OfficeWindowType>
  readonly unreadEmailsCount: number
  readonly newEmailDownloadsCount: number
}

export const useScenarioPreview = (scenarioId: UUID): UseScenarioPreviewHook => {
  const dispatch = useDispatch()
  const {t} = useLucaTranslation()
  const {scenario: scenarioOption, scenarioLoading} = useScenario(scenarioId)
  const {interventions: interventionsOption, interventionsLoading} = useInterventions(scenarioId)
  const {
    scenarioQuestionnaires: scenarioQuestionnairesOption,
    scenarioQuestionnairesLoading
  } = useScenarioQuestionnaires(scenarioId)
  const {unreadEmailsCount, newEmailDownloads} = useTaskbarPreview()

  const sharedAppState = useSelector<AppState, SharedAppState>(state => state.playerPreview.player)
  const openWindows = useSelector<AppState, Array<OfficeWindowType>>(
    state => state.playerPreview.player.ui.windowManager.openWindows
  )
  const minimizedWindows = useSelector<AppState, Array<OfficeWindowType>>(
    state => state.playerPreview.player.ui.windowManager.minimizedWindows
  )
  useEffect(() => {
    const initialState: SharedAppState = {
      ...sharedAppState,
      data: {
        ...sharedAppState.data,
        common: {
          ...sharedAppState.data.common,
          participantData: Option.of(getDummyParticipantData(t))
        }
      }
    }

    dispatch(initializeState(initialState))
  }, [])

  const [isStartModalVisible, setIsStartModalVisible] = useState(true)
  const [isFinishModalVisible, setIsFinishModalVisible] = useState(false)
  const [isScenarioDurationExpired, setIsScenarioDurationExpired] = useState(false)
  const [currentQuestionnaireId, setCurrentQuestionnaireId] = useState(Option.none<UUID>())
  const [scheduledQuestionnaireIds, setScheduledQuestionnaireIds] = useState<Array<UUID>>([])
  const [resetTrigger, setResetTrigger] = useState<Date>()

  const timeoutIds = useSelector<AppState, Array<number>>(state => state.playerPreview.timeoutIds)

  useEffect(() => {
    if (!scenarioQuestionnairesLoading) {
      const questionnaires = scenarioQuestionnairesOption.getOrElse([])
      questionnaires.forEach(({questionnaireId, activationDelayInSeconds}) => {
        const timeoutId = window.setTimeout(
          () => setScheduledQuestionnaireIds([questionnaireId, ...scheduledQuestionnaireIds]),
          activationDelayInSeconds * 1000
        )
        dispatch(addTimeoutId(timeoutId))
      })
    }
  }, [scenarioQuestionnairesLoading, resetTrigger])

  useEffect(() => {
    setCurrentQuestionnaireId(last(scheduledQuestionnaireIds))
  }, [scheduledQuestionnaireIds])

  useEffect(() => {
    return () => {
      timeoutIds.forEach(id => clearTimeout(id))
      dispatch(resetPreview())
    }
  }, [resetTrigger])

  const availableWindows = [...officeToolWindows, ...binaryViewerWindows]
    .map(window => window.tool)
    .filter(window => window !== OfficeTool.Chat)

  const onOpenWindow = (windowType: OfficeWindowType) => dispatch(openWindow(windowType))

  const onMinimizeWindow = (windowType: OfficeWindowType) => dispatch(minimizeWindow(windowType))

  const onCloseWindow = (windowType: OfficeWindowType) => dispatch(closeWindow(windowType))

  const onConfirmFinishModal = () => {
    // reset the scenario
    dispatch(closeAllWindows())
    setScheduledQuestionnaireIds([])
    setIsFinishModalVisible(false)

    timeoutIds.forEach(id => clearTimeout(id))
    dispatch(resetPreview())

    setResetTrigger(new Date())

    setIsStartModalVisible(true)
  }

  const onStartScenario = () => {
    scenarioOption.forEach(scenario => {
      if (scenario.maxDurationInSeconds !== null) {
        const timeoutId = window.setTimeout(
          () => setIsScenarioDurationExpired(true),
          scenario.maxDurationInSeconds * 1000
        )
        dispatch(addTimeoutId(timeoutId))
      }
    })

    setIsStartModalVisible(false)
  }

  const onConfirmScenarioTimeUpModal = () => {
    setIsScenarioDurationExpired(false)
    closeAllWindows()
  }

  const onCloseQuestionnaireEvent = () => {
    currentQuestionnaireId.forEach(id =>
      setScheduledQuestionnaireIds(scheduledQuestionnaireIds.filter(scheduledId => scheduledId !== id))
    )
  }

  const onSendCompletionMail = () => {
    setIsFinishModalVisible(true)
  }

  const navigateToScenarioDetail = () => dispatch(navigateToRouteAction(Route.ScenarioDetail, {scenarioId}))

  return {
    abortScenarioFinishModal: () => setIsFinishModalVisible(false),
    availableWindows,
    closeQuestionnaireEvent: onCloseQuestionnaireEvent,
    openWindow: onOpenWindow,
    closeWindow: onCloseWindow,
    confirmScenarioFinishModal: onConfirmFinishModal,
    confirmScenarioTimeUpModal: onConfirmScenarioTimeUpModal,
    currentQuestionnaireId,
    isFinishModalVisible,
    isScenarioDurationExpired,
    isLoading: scenarioLoading || interventionsLoading || scenarioQuestionnairesLoading,
    interventions: interventionsOption.getOrElse([]),
    minimizeWindow: onMinimizeWindow,
    sendCompletionMail: onSendCompletionMail,
    isStartModalVisible,
    onStartScenario,
    scenarioOption,
    navigateToScenarioDetail,
    openWindows,
    minimizedWindows,
    unreadEmailsCount,
    newEmailDownloadsCount: newEmailDownloads
  }
}
