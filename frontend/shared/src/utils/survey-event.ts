import {ApolloClient, FetchResult} from "@apollo/client"
import {difference} from "lodash-es"
import {Dispatch} from "redux"
import {CreateSurveyEvents, CreateSurveyEventsVariables} from "../graphql/generated/CreateSurveyEvents"
import {SurveyEventCreation, SurveyEventType} from "../graphql/generated/globalTypes"
import {SurveyEventFragment} from "../graphql/generated/SurveyEventFragment"
import {createSurveyEventMutation} from "../graphql/mutations"
import {SurveyEvent} from "../models"
import {SurveyEventCreationWithoutIndex} from "../models/survey-event-creation-without-index"
import {addSurveyEventAction} from "../redux/actions/data/survey-events-action"
import {sortByTimestampDate} from "./array"
import {formatDateForBackend, now, parseDateString} from "./date"

type EventsUpdaterFn = (events: SurveyEventCreation[], onSuccess: () => void) => Promise<void>

let surveyEventsQueue: SurveyEventCreation[] = []
let isCurrentlySendingSurveyEventQueueToBackend = false
let sendSurveyEventQueueToBackend: undefined | (() => void) = undefined

const surveyEventIndexProvider = (() => {
  let nextSurveyEventIndex = 0
  return {
    setNextIndex: (index: number) => {
      nextSurveyEventIndex = index
    },
    getNextIndex: () => {
      nextSurveyEventIndex = nextSurveyEventIndex + 1
      return nextSurveyEventIndex
    }
  }
})()

const sendSurveyEvent = (
  surveyEventCreation: SurveyEventCreationWithoutIndex,
  {dispatch, sendImmediately}: {dispatch?: Dispatch; sendImmediately?: boolean} = {}
) => {
  const surveyEvent = {
    ...surveyEventCreation,
    index: surveyEventIndexProvider.getNextIndex()
  }
  surveyEventsQueue.push(surveyEvent)

  if (dispatch !== undefined) {
    dispatch(addSurveyEventAction(surveyEvent))
  }

  if (sendImmediately) {
    sendSurveyEventQueueToBackend?.()
  }
}

interface SendBaseSurveyEventParams<T = Record<string, unknown>> {
  readonly surveyId: UUID
  readonly invitationId: UUID
  readonly eventType: SurveyEventType
  readonly data?: T
  readonly dispatch?: Dispatch
}

/**
 * Store Base Events for Survey on Backend Queue
 */
export const sendBaseSurveyEvent = <T>({
  surveyId,
  invitationId,
  eventType,
  data,
  dispatch
}: SendBaseSurveyEventParams<T>) =>
  sendSurveyEvent(
    {
      surveyId,
      invitationId,
      eventType,
      data: data !== undefined ? JSON.stringify(data) : null,
      timestamp: formatDateForBackend(now())
    },
    {dispatch}
  )

interface SendQuestionnaireSurveyEventParams<T = Record<string, unknown>> extends SendBaseSurveyEventParams<T> {
  readonly questionnaireId: UUID
  readonly scenarioId?: UUID
}

/**
 * Store Questionnaire Events for Survey on Backend Queue
 */
export const sendQuestionnaireSurveyEvent = <T>({
  surveyId,
  invitationId,
  questionnaireId,
  scenarioId,
  eventType,
  data,
  dispatch
}: SendQuestionnaireSurveyEventParams<T>) =>
  sendSurveyEvent(
    {
      surveyId,
      invitationId,
      eventType,
      data: data !== undefined ? JSON.stringify({...data, questionnaireId, scenarioId}) : null,
      timestamp: formatDateForBackend(now())
    },
    {dispatch}
  )

interface SendScenarioSurveyEventParams<T = Record<string, unknown>> extends SendBaseSurveyEventParams<T> {
  readonly scenarioId: UUID
}

/**
 * Store Scenario Events for Survey on Backend Queue
 */
export const sendScenarioSurveyEvent = <T>({
  surveyId,
  invitationId,
  scenarioId,
  eventType,
  data,
  dispatch
}: SendScenarioSurveyEventParams<T>) =>
  sendSurveyEvent(
    {
      surveyId,
      invitationId,
      eventType,
      data: data !== undefined ? JSON.stringify({...data, scenarioId}) : null,
      timestamp: formatDateForBackend(now())
    },
    {dispatch}
  )

interface SendChatMessageSurveyEventParams<T = Record<string, unknown>>
  extends Omit<SendBaseSurveyEventParams<T>, "eventType"> {
  readonly currentScenarioId: UUID | null
  readonly currentQuestionnaireId: UUID | null
  readonly message: string
}

/**
 * Store Chat Message Events for Survey on Backend Queue
 */
export const sendChatMessageSurveyEvent = <T>({
  surveyId,
  invitationId,
  currentScenarioId,
  currentQuestionnaireId,
  message,
  dispatch
}: SendChatMessageSurveyEventParams<T>) =>
  sendSurveyEvent(
    {
      surveyId,
      invitationId,
      eventType: SurveyEventType.SendParticipantChatMessage,
      data: JSON.stringify({invitationId, currentScenarioId: currentScenarioId, currentQuestionnaireId, message}),
      timestamp: formatDateForBackend(now())
    },
    {dispatch, sendImmediately: true}
  )

/**
 * Setup timer to send queued backend events
 * @param updater - EventsUpdaterFn, handles update
 * @param eventTimeout - timeout in ms
 */
export const initSurveyEventQueue = (updater: EventsUpdaterFn, eventTimeout: number) => {
  sendSurveyEventQueueToBackend = () => {
    if (isCurrentlySendingSurveyEventQueueToBackend) {
      return
    }

    isCurrentlySendingSurveyEventQueueToBackend = true
    try {
      const surveyEvents = [...surveyEventsQueue]
      if (surveyEvents.length > 0) {
        const onSuccess = () => {
          surveyEventsQueue = difference(surveyEventsQueue, surveyEvents)
        }
        updater(surveyEvents, onSuccess).finally(() => {
          isCurrentlySendingSurveyEventQueueToBackend = false
        })
      }
    } catch (err) {
      console.log("Error on sending survey events to backend: ", err)
    } finally {
      isCurrentlySendingSurveyEventQueueToBackend = false
    }
  }
  setInterval(sendSurveyEventQueueToBackend, eventTimeout)
}

export const setSurveyEventIndex = (index: number) => {
  surveyEventIndexProvider.setNextIndex(index)
}

/**
 * create a backend updater sending events to graphql
 * @param client - apollo client
 */
export const createBackendEventUpdater = (client: ApolloClient<unknown>): EventsUpdaterFn => async (
  surveyEvents: SurveyEventCreation[],
  onSuccess?: () => void
) => {
  if (surveyEvents.length > 0) {
    await client
      .mutate<CreateSurveyEvents, CreateSurveyEventsVariables>({
        mutation: createSurveyEventMutation,
        variables: {
          creations: surveyEvents
        }
      })
      .then((response: FetchResult<CreateSurveyEvents>) => {
        if (response.data?.createSurveyEvents !== "") {
          console.error(response.data?.createSurveyEvents)
        }
        if (response.data && !response.errors && onSuccess) {
          onSuccess()
        }
      })
      .catch(err => {
        console.error("Error on running mutation ", err)
      })
  } else if (onSuccess) {
    onSuccess()
  }
}

export const convertSurveyEvent = <TData = Record<string, unknown>>(
  surveyEvent: SurveyEventFragment
): SurveyEvent<TData> => ({
  ...surveyEvent,
  timestamp: parseDateString(surveyEvent.timestamp),
  data: surveyEvent.data ? JSON.parse(surveyEvent.data) : null
})

export const isChatSurveyEvent = (event: SurveyEvent) =>
  event.eventType === "SendSupervisorChatMessage" || event.eventType === "SendParticipantChatMessage"

export const getSurveyEventsByScenarioId = (surveyEvents: SurveyEvent[], scenarioId: UUID): SurveyEvent[] =>
  sortByTimestampDate(surveyEvents).filter(
    event =>
      event.data !== null &&
      (event.data.scenarioId === scenarioId ||
        isChatSurveyEvent(event) ||
        event.eventType === SurveyEventType.StoreParticipantData)
  )

export const getSurveyEventsByQuestionnaireId = (surveyEvents: SurveyEvent[], questionnaireId: UUID): SurveyEvent[] =>
  sortByTimestampDate(surveyEvents).filter(
    ({data}) => data !== null && data.scenarioId === undefined && data.questionnaireId === questionnaireId
  )

export const findSurveyEventsByEventType = <T>(
  surveyEvents: SurveyEvent[],
  eventType: SurveyEventType
): SurveyEvent<T>[] => surveyEvents.filter(surveyEvent => surveyEvent.eventType === eventType) as SurveyEvent<T>[]

export const toRawSurveyEvent = (surveyEvent: SurveyEvent): SurveyEventFragment => ({
  ...surveyEvent,
  timestamp: surveyEvent.timestamp.toISOString(),
  data: JSON.stringify(surveyEvent.data)
})
