import {differenceInSeconds} from "date-fns"
import {identity, isEqual} from "lodash-es"
import * as React from "react"
import {useEffect, useMemo, useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {binaryViewerWindows, officeToolWindows} from "shared/components/desktop/config"
import {OfficeTool, OfficeWindowType} from "shared/enums"
import {SurveyEventType, SurveyExecutionType} from "shared/graphql/generated/globalTypes"
import {ParticipantDataFragment} from "shared/graphql/generated/ParticipantDataFragment"
import {
  useFilesForScenario,
  useInterventions,
  useLocalEmails,
  useScenario,
  useScenarioReferenceBookChapters,
  useSurveyEvents
} from "shared/graphql/hooks"
import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {Intervention, LocalEmail, Scenario, SurveyEvent} from "shared/models"
import {setEmailsAction} from "shared/redux/actions"
import {
  closeWindow as closeWindowAction,
  minimizeWindow as minimizeWindowAction,
  openWindow as openWindowAction,
  updateAvailableWindows
} from "shared/redux/actions/ui/window-manager-action"
import {emailsReducer} from "shared/redux/reducers/data/emails-reducer"
import {windowManagerReducer} from "shared/redux/reducers/ui/window-manager-reducer"
import {scenarioSnapshotReducer} from "shared/redux/snapshot/state/scenario-snapshot-reducer"
import {SharedAppState} from "shared/redux/state"
import {initialSpreadsheetState, SpreadsheetState} from "shared/redux/state/data"
import {initialChatState} from "shared/redux/state/data/chat-state"
import {
  contains,
  find,
  getSurveyEventsByScenarioId,
  isSpreadsheetFile,
  now,
  Option,
  toLocalSpreadsheet
} from "shared/utils"
import {
  dependencyInitialized,
  initializeState,
  resetPreview,
  resetPreviewWithoutTools
} from "../../../../redux/actions/player-preview-actions"
import {AppState} from "../../../../redux/state/app-state"
import {InitDependentOfficeTool} from "../../../../redux/state/player-preview-state"
import {surveyPollingRate} from "../../../monitoring/config/config"

export interface UseSurveySnapshotHook {
  readonly dataLoading: boolean
  readonly scenario: Option<Scenario>
  readonly availableWindows: Array<OfficeWindowType>
  readonly openWindows: OfficeWindowType[]
  readonly minimizedWindows: OfficeWindowType[]
  readonly openWindow: (window: OfficeWindowType) => void
  readonly closeWindow: (window: OfficeWindowType) => void
  readonly minimizeWindow: (windowType: OfficeWindowType) => void
  readonly interventions: Intervention[]
  readonly unreadEmailsCount: number
}

export const useScenarioSnapshot = (
  scenarioId: UUID,
  surveyInvitationId: UUID,
  surveyId: UUID,
  pollSurveyEvents = false
): UseSurveySnapshotHook => {
  const dispatch = useDispatch()

  const {surveyEvents: allSurveyEvents, surveyEventsLoading} = useSurveyEvents({
    surveyInvitationId,
    scenarioId,
    pollingRateInMillis: pollSurveyEvents ? surveyPollingRate : undefined
  })
  const {scenario, scenarioLoading} = useScenario(scenarioId)
  const {interventions, interventionsLoading} = useInterventions(scenarioId)
  const {files: filesForScenario, filesLoading} = useFilesForScenario(scenarioId)
  const {localEmails, localEmailsLoading} = useLocalEmails(scenarioId)
  const {scenarioReferenceBooks, scenarioReferenceBooksLoading} = useScenarioReferenceBookChapters(scenarioId)
  const {survey, surveyLoading} = useSurveyLight(surveyId)

  const sharedAppState = useSelector<AppState, SharedAppState>(state => state.playerPreview.player)

  const initializedTools = useSelector<AppState, Record<InitDependentOfficeTool, boolean>>(
    state => state.playerPreview.initializedTools
  )

  const [isStateInitialized, setIsStateInitialized] = useState(false)

  const initializedToolsRef = useRef(initializedTools)
  if (!isEqual(initializedTools, initializedToolsRef.current)) {
    initializedToolsRef.current = initializedTools
  }

  const isEveryToolInitialized = useMemo(() => {
    return Object.values(initializedToolsRef.current).every(identity)
  }, [initializedToolsRef.current])

  const availableWindows = useSelector<AppState, Array<OfficeWindowType>>(
    state => state.playerPreview.player.ui.windowManager.availableWindows
  )

  const openWindows = useSelector<AppState, OfficeWindowType[]>(
    state => state.playerPreview.player.ui.windowManager.openWindows
  )

  const minimizedWindows = useSelector<AppState, OfficeWindowType[]>(
    state => state.playerPreview.player.ui.windowManager.minimizedWindows
  )

  const emails = useSelector<AppState, Array<LocalEmail>>(state => state.playerPreview.player.data.emails)
  const emailsRef = useRef(emails)
  if (!isEqual(emailsRef.current, emails)) {
    emailsRef.current = emails
  }

  const unreadEmailsCount = useMemo(() => {
    return emailsRef.current.filter(email => !email.isRead && email.isVisible).length
  }, [emailsRef.current])

  const allSurveyEventsRef = React.useRef<SurveyEvent[]>([])
  if (!isEqual(allSurveyEventsRef.current, allSurveyEvents)) {
    allSurveyEventsRef.current = allSurveyEvents
  }

  const surveyEvents = React.useMemo(() => {
    return getSurveyEventsByScenarioId(allSurveyEventsRef.current, scenarioId)
  }, [allSurveyEventsRef.current, scenarioId])

  const previousSurveyEventsRef = React.useRef<SurveyEvent[]>([])
  const surveyEventsRef = React.useRef<SurveyEvent[]>([])
  if (!isEqual(surveyEventsRef.current, surveyEvents)) {
    surveyEventsRef.current = surveyEvents
  }

  const onOpenWindow = (windowType: OfficeWindowType) => dispatch(openWindowAction(windowType))

  const onMinimizeWindow = (windowType: OfficeWindowType) => dispatch(minimizeWindowAction(windowType))

  const onCloseWindow = (windowType: OfficeWindowType) => dispatch(closeWindowAction(windowType))

  const knownScenarioIds = React.useRef<UUID[]>([])
  useEffect(() => {
    if (contains(scenarioId, knownScenarioIds.current)) {
      dispatch(resetPreviewWithoutTools())
    } else {
      dispatch(resetPreview())
    }
    knownScenarioIds.current = [...knownScenarioIds.current.filter(id => id !== scenarioId), scenarioId]
    setIsStateInitialized(false)
  }, [scenarioId])

  useEffect(() => {
    dispatch(resetPreview())
    setIsStateInitialized(false)
  }, [surveyInvitationId])

  // check available tools
  useEffect(() => {
    if (!availableWindows.length && !scenarioReferenceBooksLoading && !surveyLoading) {
      let availWindows = officeToolWindows.concat(binaryViewerWindows).map(window => window.tool)

      if (
        !scenarioReferenceBooks
          .map(books => books.map(book => book.articles?.length).filter(count => count > 0).length > 0)
          .getOrElse(false)
      ) {
        availWindows = availWindows.filter(window => window !== OfficeTool.ReferenceBookViewer)
        dispatch(dependencyInitialized(OfficeTool.ReferenceBookViewer))
      }

      const showChat = survey
        .map(survey => survey.executionType !== SurveyExecutionType.AutomaticAsynchronous)
        .getOrElse(true)

      if (!showChat) {
        availWindows = availWindows.filter(window => window !== OfficeTool.Chat)
      }

      // use timeout to ensure that all reset were completed
      setTimeout(() => {
        // update available windows
        dispatch(updateAvailableWindows(availWindows))
        dispatch(dependencyInitialized("taskbar"))
      }, 0)
    }
  }, [scenarioReferenceBooksLoading, availableWindows, surveyLoading])

  useEffect(() => {
    if (
      isEveryToolInitialized &&
      surveyEventsRef.current.length > 0 &&
      (!isStateInitialized || (pollSurveyEvents && !isEqual(previousSurveyEventsRef.current, surveyEventsRef.current)))
    ) {
      const participantDataOption = find(
        event => event.eventType === SurveyEventType.StoreParticipantData,
        surveyEventsRef.current
      ).map(event => ({...event.data, __typename: "ParticipantData"} as ParticipantDataFragment))

      const scenarioStartedAt =
        surveyEvents.find(event => event.eventType === SurveyEventType.StartScenario)?.timestamp ?? now()

      const differenceBetweenScenarioFirstStartAndNow = Math.abs(differenceInSeconds(scenarioStartedAt, now()))

      const emails: LocalEmail[] = localEmails.getOrElse([])

      const notDelayedEmails = emails
        .filter(email => email.receptionDelayInSeconds <= 0)
        .map(email => ({
          ...email,
          receptionDelayInSeconds: email.receptionDelayInSeconds - differenceBetweenScenarioFirstStartAndNow,
          isVisible: true
        }))

      // reception delay does not need to be adjusted, will be adjusted in reducer with corresponding receive event
      const delayedEmails = emails
        .filter(email => email.receptionDelayInSeconds > 0)
        .map(email => ({...email, isVisible: false}))

      const emailsState = emailsReducer(
        sharedAppState.data.emails,
        setEmailsAction([...notDelayedEmails, ...delayedEmails])
      )

      const windowsState = windowManagerReducer(
        sharedAppState.ui.windowManager,
        sharedAppState.ui.binaryViewer,
        sharedAppState.ui.spreadsheetViewer,
        updateAvailableWindows(availableWindows)
      )

      const spreadsheets = filesForScenario
        .map(files =>
          files
            .filter(isSpreadsheetFile)
            .filter(file => file.spreadsheet !== null)
            .map(file => file.spreadsheet)
        )
        .getOrElse([])

      const spreadsheetState: SpreadsheetState = spreadsheets.reduce((map, sheet) => {
        map[sheet.id] = toLocalSpreadsheet(sheet)
        return map
      }, initialSpreadsheetState)

      const preparedSharedAppState: SharedAppState = {
        ...sharedAppState,
        data: {
          ...sharedAppState.data,
          chat: initialChatState,
          common: {
            ...sharedAppState.data.common,
            participantData: participantDataOption
          },
          spreadsheets: spreadsheetState,
          emails: emailsState,
          surveyInvitation: {
            ...sharedAppState.data.surveyInvitation,
            surveyId: Option.of(surveyId),
            executionType: survey.map(survey => survey.executionType)
          }
        },
        ui: {
          ...sharedAppState.ui,
          windowManager: windowsState
        }
      }

      const initialState = surveyEventsRef.current.reduce(scenarioSnapshotReducer, preparedSharedAppState)

      // email client shows arrival label depending on activeModuleStartTime -> needs to be set to now
      const initialStateWithUpdateModuleStartTime = {
        ...initialState,
        ui: {...initialState.ui, common: {...initialState.ui.common, activeModuleStartTime: Option.of(now())}}
      }

      setIsStateInitialized(true)
      dispatch(initializeState(initialStateWithUpdateModuleStartTime))
    }
    previousSurveyEventsRef.current = surveyEventsRef.current
  }, [surveyEventsRef.current, isEveryToolInitialized, isStateInitialized, previousSurveyEventsRef.current])

  useEffect(() => {
    return () => {
      dispatch(resetPreview())
    }
  }, [])

  return {
    dataLoading:
      localEmailsLoading ||
      interventionsLoading ||
      scenarioLoading ||
      surveyEventsLoading ||
      filesLoading ||
      surveyLoading,
    scenario,
    availableWindows,
    openWindows,
    minimizedWindows,
    interventions: interventions.getOrElse([]),
    unreadEmailsCount,
    openWindow: onOpenWindow,
    minimizeWindow: onMinimizeWindow,
    closeWindow: onCloseWindow
  }
}
