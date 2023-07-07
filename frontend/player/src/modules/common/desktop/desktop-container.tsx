/* eslint-disable max-lines */
/* eslint-disable import/max-dependencies */
import {css} from "@emotion/react"
import {isEqual, partial} from "lodash-es"
import * as React from "react"
import {useEffect, useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {ContentLoadingIndicator, Desktop, Text} from "shared/components"
import {questionnaireTypeForQuestionId} from "shared/components/desktop/utils/questionnaire"
import {OfficeTool, OfficeWindowType} from "shared/enums"
import {ProjectModuleEndType} from "shared/enums/project-module-end-type"
import {
  InterventionType,
  QuestionType,
  SurveyEventType,
  SurveyExecutionType
} from "shared/graphql/generated/globalTypes"
import {useInterventions, useScenario, useScenarioQuestionnaires} from "shared/graphql/hooks"
import {LatestStartedProjectModule, RuntimeSurveyAnswerSelectionIntervention} from "shared/models"
import {createRenderTool, useFilesAndDirectoriesRemoteState, useReferenceBookToolRemoteState} from "shared/office-tools"
import {useEmailClientRemoteState} from "shared/office-tools/email-client/hook/use-email-client-remote-state"
import {runtimeSurveyInterventionEmailAction} from "shared/redux/actions/data-action"
import {
  cancelScheduledQuestionnaires,
  deleteScheduledQuestionnaire,
  scheduleQuestionnaire
} from "shared/redux/actions/ui/scheduled-questionnaires-action"
import {closeWindow, minimizeWindow, openWindow} from "shared/redux/actions/ui/window-manager-action"
import {selectSurveyInvitation} from "shared/redux/state/data"
import {ElapsedTimeOfProjectModuleForResumption} from "shared/redux/state/data/project-resumption-state"
import {Flex, fontColorLight, TextSize} from "shared/styles"
import {useLucaTranslation} from "shared/translations"
import {
  first,
  Option,
  sendClipboardEvent,
  sendCloseToolEvent,
  sendEndScenarioEvent,
  sendMinimizeToolEvent
} from "shared/utils"
import {getElapsedTimeOfLaterStartToSurveyInSeconds} from "shared/utils/latest-started-project-module"
import {useCalculatorState} from "../../../office-tools/calculator/hooks/use-calculator-state"
import {useCalculatorSurveyEvents} from "../../../office-tools/calculator/hooks/use-calculator-survey-events"
import {useChatState, useChatStateActions} from "../../../office-tools/chat/hooks"
import {chatComposer} from "../../../office-tools/chat/hooks/chat-composer"
import {
  useEmailClientState,
  useEmailClientStateActions,
  useEmailClientSurveyEvents
} from "../../../office-tools/email-client/hooks"
import {useErpSurveyEvents} from "../../../office-tools/erp/hooks/use-erp-survey-events"
import {
  useFilesAndDirectoriesState,
  useFilesAndDirectoriesStateActions,
  useFilesAndDirectoriesSurveyEvents
} from "../../../office-tools/files-and-directories/hooks"
import {useImageViewerState, useImageViewerSurveyEvents} from "../../../office-tools/image-viewer/hooks"
import {useNotesState, useNotesStateActions, useNotesSurveyEvents} from "../../../office-tools/notes/hooks"
import {usePdfViewerState, usePdfViewerSurveyEvents} from "../../../office-tools/pdf-viewer/hooks"
import {
  useReferenceBookToolState,
  useReferenceBookToolStateActions,
  useReferenceBookToolSurveyEvents
} from "../../../office-tools/reference-book/hooks"
import {
  useSpreadsheetViewerState,
  useSpreadsheetViewerStateActions,
  useSpreadsheetViewerSurveyEvents
} from "../../../office-tools/spreadsheet-viewer/hooks"
import {
  useTextDocumentsState,
  useTextDocumentsStateActions,
  useTextDocumentsSurveyEvents
} from "../../../office-tools/text-editor/hooks"
import {useVideoViewerState, useVideoViewerSurveyEvents} from "../../../office-tools/video-viewer/hooks"
import {navigateToRouteAction} from "../../../redux/actions/routing-action"
import {AppState} from "../../../redux/state/app-state"
import {Route} from "../../../routes"
import {useQuestionnaireSurveyEvents} from "../../questionnaire/hooks/use-questionnaire-survey-events"
import {useSurveyProgress} from "../hooks/use-survey-progress"
import {TaskbarContainer} from "../taskbar/taskbar-container"
import {getScenarioDurationInSeconds, isResumptionOfActiveModule} from "./util"

interface Props {
  readonly scenarioId: Option<UUID>
}

export const DesktopContainer: React.FC<Props> = ({scenarioId: scenarioIdOption}) => {
  const {t} = useLucaTranslation()

  const {scenario: scenarioOption, scenarioLoading} = useScenario(
    scenarioIdOption.getOrElse(""),
    scenarioIdOption.isEmpty()
  )
  const {
    scenarioQuestionnaires: scenarioQuestionnairesOption,
    scenarioQuestionnairesLoading
  } = useScenarioQuestionnaires(scenarioIdOption.orUndefined())
  const {interventions: interventionsOption, interventionsLoading} = useInterventions(scenarioIdOption.getOrElse(""))

  const {
    startNextModule,
    activeModuleOption,
    isLastModule,
    handleEndProject,
    resetLocalStateAndCloseWindows
  } = useSurveyProgress()
  const questionnaireSurveyEvents = useQuestionnaireSurveyEvents(scenarioIdOption.orUndefined())

  const {invitationId: invitationIdOption, surveyId: surveyIdOption, executionType: executionTypeOption} = useSelector(
    selectSurveyInvitation
  )

  const openedWindows = useSelector<AppState, OfficeWindowType[]>(s => s.ui.windowManager.openWindows)
  const minimizedWindows = useSelector<AppState, OfficeWindowType[]>(s => s.ui.windowManager.minimizedWindows)
  const availableWindows = useSelector<AppState, OfficeWindowType[]>(s => s.ui.windowManager.availableWindows)
  const latestStartedProjectModule = useSelector<AppState, Option<LatestStartedProjectModule>>(
    s => s.data.common.latestStartedProjectModule
  )
  const projectResumptionProjectModuleDelay = useSelector<AppState, Option<ElapsedTimeOfProjectModuleForResumption>>(
    s => s.data.projectResumption.elapsedTimeOfProjectModule
  )
  const activeModuleStartedAt = useSelector<AppState, Option<Date>>(s => s.ui.common.activeModuleStartTime)
  const activeQuestionnaireIds = useSelector<AppState, UUID[]>(s => s.ui.scheduledQuestionnaires.activeQuestionnaireIds)
  const currentQuestionnaireId = first(activeQuestionnaireIds)

  const dispatch = useDispatch()
  const closeToolWindow = (tool: OfficeWindowType) => dispatch(closeWindow(tool))
  const minimizeToolWindow = (tool: OfficeWindowType) => dispatch(minimizeWindow(tool))

  const [timeoutIdOption, setTimeoutIdOption] = useState<Option<number>>(Option.none())
  const [isScenarioDurationExpired, setIsScenarioDurationExpired] = useState(false)
  const [isStartModalVisible, setIsStartModalVisible] = useState(true)
  const [isFinishModalVisible, setIsFinishModalVisible] = useState(false)
  const [resetFinishMail, setResetFinishMail] = useState(false)
  const [scenarioDurationInSeconds, setScenarioDurationInSeconds] = useState<number>()

  const isManualSurvey = executionTypeOption.exists(
    executionType => executionType !== SurveyExecutionType.AutomaticAsynchronous
  )

  useEffect(() => {
    if (
      !isStartModalVisible &&
      executionTypeOption.exists(executionType => executionType === SurveyExecutionType.ManualSynchronous)
    ) {
      setIsStartModalVisible(true)
    }
  }, [scenarioIdOption.orNull()])

  const scenarioQuestionnairesOptionRef = useRef(scenarioQuestionnairesOption.orUndefined())
  if (!isEqual(scenarioQuestionnairesOption.orUndefined(), scenarioQuestionnairesOptionRef.current)) {
    scenarioQuestionnairesOptionRef.current = scenarioQuestionnairesOption.orUndefined()
  }

  const isResumptionOfScenario = isResumptionOfActiveModule(
    scenarioIdOption.orNull(),
    null,
    projectResumptionProjectModuleDelay
  )

  const isLaterEntryToScenario = latestStartedProjectModule.isDefined() || isResumptionOfScenario

  React.useEffect(() => {
    const questionnaires = scenarioQuestionnairesOption.getOrElse([])

    if (isLaterEntryToScenario) {
      const elapsedTimeOfScenario = isResumptionOfScenario
        ? projectResumptionProjectModuleDelay.map(delay => delay.elapsedTimeInSeconds).getOrElse(0)
        : getElapsedTimeOfLaterStartToSurveyInSeconds(activeModuleOption, latestStartedProjectModule)

      questionnaires
        .filter(
          questionnaire => questionnaire.activationDelayInSeconds > elapsedTimeOfScenario
          // later entry -> get only questionnaires after entry time
        )
        .forEach(({questionnaireId, activationDelayInSeconds}) => {
          dispatch(scheduleQuestionnaire(questionnaireId, activationDelayInSeconds - elapsedTimeOfScenario))
        })
    } else {
      questionnaires.forEach(({questionnaireId, activationDelayInSeconds}) => {
        dispatch(scheduleQuestionnaire(questionnaireId, activationDelayInSeconds))
      })
    }
  }, [scenarioQuestionnairesOptionRef.current])

  React.useEffect(() => {
    if (!isStartModalVisible) {
      scenarioOption.forEach(scenario => {
        const durationInSeconds = getScenarioDurationInSeconds(
          scenario,
          latestStartedProjectModule,
          activeModuleOption,
          isResumptionOfScenario
            ? projectResumptionProjectModuleDelay.map(delay => delay.elapsedTimeInSeconds).orNull()
            : null
        )
        setScenarioDurationInSeconds(durationInSeconds)
        if (durationInSeconds !== undefined && !isManualSurvey) {
          // manual survey has no timeout, cause time can exceed the scenario duration
          setTimeoutIdOption(Option.of(window.setTimeout(handleScenarioExpired, durationInSeconds * 1000)))
        }
      })
    }
    return () => timeoutIdOption.forEach(clearTimeout)
  }, [isStartModalVisible])

  const handleScenarioExpired = () => {
    setIsScenarioDurationExpired(true)
    dispatch(cancelScheduledQuestionnaires())
  }

  const withSurveyParams = (handler: (surveyId: UUID, invitation: UUID, scenarioId: UUID) => void) =>
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId =>
        scenarioIdOption.forEach(scenarioId => handler(surveyId, invitationId, scenarioId))
      )
    )

  const onCloseTool = (tool: OfficeWindowType) => {
    withSurveyParams(sendCloseToolEvent(tool))
    closeToolWindow(tool)
  }

  const onMinimizeTool = (tool: OfficeWindowType, withSurveyEvent = true) => {
    withSurveyEvent && withSurveyParams(sendMinimizeToolEvent(tool))
    minimizeToolWindow(tool)
  }

  const onClipboardEvent = (eventType: SurveyEventType) => withSurveyParams(sendClipboardEvent(eventType))

  const handleExecutionTypeOnConfirm = () =>
    executionTypeOption.forEach(type => {
      switch (type) {
        case SurveyExecutionType.AutomaticAsynchronous:
        case SurveyExecutionType.ManualAsynchronous:
          startNextModule()
          setIsStartModalVisible(true)
          break
        case SurveyExecutionType.ManualSynchronous:
          if (isLastModule) {
            handleEndProject()
          } else {
            dispatch(navigateToRouteAction({routeType: Route.WaitForNextModule}))
          }

          break
      }
    })

  const handleCompletionMailSent = () => {
    setResetFinishMail(false)
    setIsFinishModalVisible(true)
  }

  const onAbortFinishModal = () => {
    dispatch(openWindow(OfficeTool.EmailClient))
    setResetFinishMail(true)
    setIsFinishModalVisible(false)
  }

  const onConfirmScenarioTimeUpModal = () => {
    withSurveyParams(sendEndScenarioEvent(ProjectModuleEndType.ByTime))
    setIsScenarioDurationExpired(false)
    resetLocalStateAndCloseWindows()
    handleExecutionTypeOnConfirm()
  }

  const onConfirmFinishModal = () => {
    setIsFinishModalVisible(false)
    timeoutIdOption.forEach(clearTimeout)
    withSurveyParams(sendEndScenarioEvent(ProjectModuleEndType.ByParticipant))
    resetLocalStateAndCloseWindows()
    handleExecutionTypeOnConfirm()
  }

  const onCloseQuestionnaireEvent = () => {
    currentQuestionnaireId.forEach(id => {
      questionnaireSurveyEvents.sendEndEvent(id)
      dispatch(deleteScheduledQuestionnaire(id))
      interventionsForQuestionnaireId(id).forEach(intervention =>
        dispatch(
          runtimeSurveyInterventionEmailAction(intervention, activeModuleStartedAt, {
            id: intervention.answer.questionId,
            type:
              questionnaireTypeForQuestionId(
                intervention.answer.questionId,
                id,
                scenarioQuestionnairesOption.getOrElse([])
              ) ?? QuestionType.SingleChoice
          })
        )
      )
    })
  }

  const onStartScenario = () => {
    setIsStartModalVisible(false)
  }

  const interventionsForQuestionnaireId = (questionnaireId: UUID): RuntimeSurveyAnswerSelectionIntervention[] => {
    const questionIds = scenarioQuestionnairesOption
      .getOrElse([])
      .filter(scenarioQuestionnaires => scenarioQuestionnaires.questionnaireId === questionnaireId)
      .map(scenarioQuestionnaires => scenarioQuestionnaires.questionnaire)
      .flatMap(questionnaire => questionnaire.questions)
      .map(question => question.id)

    const runtimeSurveyAnswerSelectionInterventions = interventionsOption
      .getOrElse([])
      .filter(
        intervention => intervention.interventionType === InterventionType.RuntimeSurveyAnswerSelection
      ) as RuntimeSurveyAnswerSelectionIntervention[]

    return runtimeSurveyAnswerSelectionInterventions.filter(intervention =>
      questionIds.includes(intervention.answer.questionId)
    )
  }

  return scenarioLoading ? (
    <ContentLoadingIndicator customStyles={styles.contentWrapper} />
  ) : (
    scenarioOption
      .map(scenario => (
        <Desktop
          abortScenarioFinishModal={onAbortFinishModal}
          availableWindows={availableWindows}
          closeQuestionnaireEvent={onCloseQuestionnaireEvent}
          closeWindow={onCloseTool}
          confirmScenarioFinishModal={onConfirmFinishModal}
          confirmScenarioTimeUpModal={onConfirmScenarioTimeUpModal}
          currentQuestionnaireId={currentQuestionnaireId}
          isFinishModalVisible={isFinishModalVisible}
          isScenarioDurationExpired={isScenarioDurationExpired}
          isScenarioLoading={scenarioLoading || scenarioQuestionnairesLoading || interventionsLoading}
          isStartModalVisible={isStartModalVisible}
          interventions={interventionsOption.getOrElse([])}
          minimizedWindows={minimizedWindows}
          minimizeWindow={onMinimizeTool}
          onStartScenario={onStartScenario}
          openedWindows={openedWindows}
          scenario={scenario}
          sendCompletionMail={handleCompletionMailSent}
          scenarioDurationInSeconds={scenarioDurationInSeconds}
          questionnaireSurveyEvents={questionnaireSurveyEvents}
          taskbar={<TaskbarContainer scenarioId={scenario.id} isHidden={isFinishModalVisible || isStartModalVisible} />}
          renderTool={renderTool({
            scenarioId: scenario.id,
            resetFinishMail,
            isQuestionnaireEventVisible: currentQuestionnaireId.isDefined()
          })}
          onClipboardEvent={onClipboardEvent}
        />
      ))
      .getOrElse(
        <div css={[styles.contentWrapper, styles.errorMessageWrapper]}>
          <Text customStyles={styles.errorMessage} size={TextSize.Medium}>
            {t("scenario__no_scenario_error")}
          </Text>
        </div>
      )
  )
}

const styles = {
  contentWrapper: css({
    height: "100vh",
    boxSizing: "border-box"
  }),
  errorMessageWrapper: css(Flex.column, {
    justifyContent: "center",
    alignItems: "center"
  }),
  errorMessage: css({
    color: fontColorLight
  })
}

const renderTool = ({
  scenarioId,
  resetFinishMail,
  isQuestionnaireEventVisible
}: {
  readonly scenarioId: UUID
  readonly resetFinishMail: boolean
  readonly isQuestionnaireEventVisible: boolean
}) =>
  createRenderTool({
    useCalculatorState,
    useCalculatorSurveyEvents: partial(useCalculatorSurveyEvents, scenarioId),
    useEmailClientState: partial(useEmailClientState, scenarioId),
    useEmailClientRemoteState: useEmailClientRemoteState<AppState>(state => state),
    useEmailClientStateActions,
    useEmailClientSurveyEvents: partial(useEmailClientSurveyEvents, scenarioId),
    useErpSurveyEvents: partial(useErpSurveyEvents, scenarioId),
    useFilesAndDirectoriesState,
    useFilesAndDirectoriesRemoteState,
    useFilesAndDirectoriesStateActions,
    useFilesAndDirectoriesSurveyEvents: partial(useFilesAndDirectoriesSurveyEvents, scenarioId),
    useImageViewerState,
    useImageViewerSurveyEvents: partial(useImageViewerSurveyEvents, scenarioId),
    useNotesState,
    useNotesStateActions,
    useNotesSurveyEvents: partial(useNotesSurveyEvents, scenarioId),
    usePdfViewerState,
    usePdfViewerSurveyEvents: partial(usePdfViewerSurveyEvents, scenarioId),
    useReferenceBookToolState,
    useReferenceBookToolRemoteState,
    useReferenceBookToolStateActions,
    useReferenceBookToolSurveyEvents: partial(useReferenceBookToolSurveyEvents, scenarioId),
    useSpreadsheetViewerState: partial(useSpreadsheetViewerState, isQuestionnaireEventVisible),
    useSpreadsheetViewerStateActions,
    useSpreadsheetViewerSurveyEvents: partial(useSpreadsheetViewerSurveyEvents, scenarioId),
    useVideoViewerState,
    useVideoViewerSurveyEvents: partial(useVideoViewerSurveyEvents, scenarioId),
    useTextDocumentsStateActions,
    useTextDocumentsState,
    useTextDocumentsSurveyEvents: partial(useTextDocumentsSurveyEvents, scenarioId),
    useChatComposer: () => chatComposer(useChatState, useChatStateActions),
    resetFinishMail
  })
