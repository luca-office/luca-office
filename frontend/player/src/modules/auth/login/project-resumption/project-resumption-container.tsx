import {ApolloError, useApolloClient} from "@apollo/client"
import {differenceInSeconds} from "date-fns"
import * as React from "react"
import {useDispatch, useSelector} from "react-redux"
import {NotificationSeverity} from "shared/enums"
import {SurveyEventType} from "shared/graphql/generated/globalTypes"
import {ProjectModulesQuery} from "shared/graphql/generated/ProjectModulesQuery"
import {SurveyInvitationAndEventsForResumptionQuery} from "shared/graphql/generated/SurveyInvitationAndEventsForResumptionQuery"
import {useSurveyInvitationAndEventsForResumptionQueryLazy} from "shared/graphql/hooks/queries/survey-event/use-survey-invitation-and-events-for-resumption-query"
import {AppNotification, OfficeModule, StoreParticipantDataPayload, SurveyEvent} from "shared/models"
import {
  updateInvitationDataAction,
  updateNotification,
  updateOfficeModules,
  updateParticipantDataAction
} from "shared/redux/actions"
import {
  initializeAppStateAction,
  updateElapsedTimeOfProjectModuleAction
} from "shared/redux/actions/project-resumption-action"
import {scenarioSnapshotReducer} from "shared/redux/snapshot/state/scenario-snapshot-reducer"
import {SharedAppState} from "shared/redux/state"
import {initialChatState} from "shared/redux/state/data/chat-state"
import {ElapsedTimeOfProjectModuleForResumption} from "shared/redux/state/data/project-resumption-state"
import {useLucaTranslation} from "shared/translations"
import {
  convertSurveyEvent,
  findSurveyEventsByEventType,
  first,
  isDefined,
  LucaErrorType,
  now,
  Option,
  parseDateString,
  setSurveyEventIndex,
  sort,
  sortByTimestampDate
} from "shared/utils"
import {useProjectModulesLazy} from "../../../../graphql/hooks"
import {AppState} from "../../../../redux/state/app-state"
import {useSurveyProgress} from "../../../common/hooks/use-survey-progress"
import {ProjectResumption} from "./project-resumption"
import {initEmailsState, initSpreadsheetsState} from "./util/common"

export const ProjectResumptionContainer: React.FC = () => {
  const [token, setToken] = React.useState<string | null>(null)
  const [tokenError, setTokenError] = React.useState<string | null>(null)
  const [appStateInitialized, setAppStateInitialized] = React.useState(false)

  const appState = useSelector<AppState, AppState>(state => state)

  const {resumeOfficeModule} = useSurveyProgress()

  const {t} = useLucaTranslation()

  const client = useApolloClient()

  const dispatch = useDispatch()

  const onSurveyEventsForLatestInProgressProjectModuleCompleted = async (
    data: SurveyInvitationAndEventsForResumptionQuery | undefined
  ) => {
    if (data?.surveyInvitationAndEventsForResumption === null) {
      setTokenError(t("auth__project_resumption_token_error_no_project"))
    } else if (data?.surveyInvitationAndEventsForResumption.surveyEventsForLatestInProgressProjectModule === null) {
      setTokenError(t("auth__project_resumption_token_error"))
    } else if (data?.surveyInvitationAndEventsForResumption.surveyEventsForLatestInProgressProjectModule) {
      setTokenError(null)

      const {
        surveyEvents: originalSurveyEvents,
        scenarioId,
        questionnaireId
      } = data.surveyInvitationAndEventsForResumption.surveyEventsForLatestInProgressProjectModule

      const {survey, token, id} = data.surveyInvitationAndEventsForResumption.surveyInvitation
      const surveyInvitationState = {
        token: Option.of(token),
        invitationId: Option.of(id),
        surveyId: Option.of(survey.id),
        executionType: Option.of(survey.executionType),
        manualSurveyStartedAt: Option.of(
          isDefined(survey.manualPeriod?.start) ? parseDateString(survey.manualPeriod!.start) : undefined
        )
      }

      const maxSurveyEventIndex = Math.max(...originalSurveyEvents.map(event => event.index))
      setSurveyEventIndex(maxSurveyEventIndex)

      dispatch(updateInvitationDataAction(surveyInvitationState))

      const surveyEvents: SurveyEvent[] = originalSurveyEvents.map(convertSurveyEvent)

      if (scenarioId !== null) {
        const scenarioFirstStartedAt =
          surveyEvents.find(event => event.eventType === SurveyEventType.StartScenario)?.timestamp ?? now()

        const elapsedTimeOfProjectModule = getElapsedTimeOfScenarioOrQuestionnaire(
          surveyEvents,
          scenarioFirstStartedAt,
          true
        )

        const initialEmailsState = await initEmailsState({
          client,
          appState,
          scenarioId,
          scenarioFirstStartedAt,
          elapsedTimeOfProjectModuleForResumptionInSeconds: elapsedTimeOfProjectModule
        })

        const initialSpreadsheetState = await initSpreadsheetsState({client, scenarioId})

        const preparedSharedAppState: SharedAppState = {
          ...appState,
          data: {
            ...appState.data,
            surveyInvitation: surveyInvitationState,
            emails: initialEmailsState,
            spreadsheets: initialSpreadsheetState,
            chat: initialChatState
          }
        }

        const initialState = surveyEvents.reduce(scenarioSnapshotReducer, preparedSharedAppState)

        dispatch(initializeAppStateAction(initialState))

        dispatch(
          updateElapsedTimeOfProjectModuleAction(
            Option.of<ElapsedTimeOfProjectModuleForResumption>({
              elapsedTimeInSeconds: elapsedTimeOfProjectModule,
              questionnaireId: null,
              scenarioId
            })
          )
        )
      } else if (questionnaireId !== null) {
        const participantDataEvent = first(
          findSurveyEventsByEventType<StoreParticipantDataPayload>(surveyEvents, SurveyEventType.StoreParticipantData)
        )

        participantDataEvent.forEach(event => {
          if (event.data !== null) {
            dispatch(updateParticipantDataAction({...event.data, __typename: "ParticipantData"}))
          }
        })

        const questionnaireStartedAt =
          surveyEvents.find(event => event.eventType === SurveyEventType.StartQuestionnaire)?.timestamp ?? now()

        const elapsedTimeOfProjectModule = getElapsedTimeOfScenarioOrQuestionnaire(
          surveyEvents,
          questionnaireStartedAt,
          false
        )
        dispatch(
          updateElapsedTimeOfProjectModuleAction(
            Option.of<ElapsedTimeOfProjectModuleForResumption>({
              elapsedTimeInSeconds: elapsedTimeOfProjectModule,
              questionnaireId,
              scenarioId: null
            })
          )
        )
      }

      setAppStateInitialized(true)
    }
  }

  const onSurveyEventsForLatestInProgressProjectModuleFailed = (error: ApolloError) => {
    const errorType = error.graphQLErrors[0]?.extensions?.type

    if (errorType === LucaErrorType.SurveyAlreadyEnded) {
      setTokenError(t("auth__project_resumption_token_error_survey_ended"))
    }
  }

  const onProjectsModulesQueryCompleted = (data: ProjectModulesQuery) => {
    if (data?.projectModules.length > 0) {
      const sortedModules: Array<OfficeModule> = sort(
        projectModule => projectModule.position,
        data.projectModules.map(({moduleType, position, scenarioId, questionnaireId, projectId, id}) => ({
          moduleType,
          position,
          scenarioId,
          questionnaireId,
          projectId,
          id
        }))
      )

      dispatch(updateOfficeModules(sortedModules))

      surveyInvitationAndEventsForResumption.forEach(data => {
        if (data.surveyEventsForLatestInProgressProjectModule) {
          const {questionnaireId, scenarioId} = data.surveyEventsForLatestInProgressProjectModule
          if (questionnaireId !== null) {
            const questionnaireToBeResumed = sortedModules.find(module => module.questionnaireId === questionnaireId)
            if (questionnaireToBeResumed) {
              resumeOfficeModule(questionnaireToBeResumed)
            }
          } else if (scenarioId !== null) {
            const scenarioToBeResumed = sortedModules.find(module => module.scenarioId === scenarioId)
            if (scenarioToBeResumed) {
              resumeOfficeModule(scenarioToBeResumed)
            }
          }
        }
      })
    } else {
      dispatch(
        updateNotification(
          Option.of<AppNotification>({
            severity: NotificationSeverity.Warning,
            messageKey: "scenario__no_scenario_found"
          })
        )
      )
    }
  }

  const {
    getSurveyInvitationAndEventsForResumption,
    surveyInvitationAndEventsForResumption
  } = useSurveyInvitationAndEventsForResumptionQueryLazy(
    onSurveyEventsForLatestInProgressProjectModuleCompleted,
    onSurveyEventsForLatestInProgressProjectModuleFailed
  )

  const {getProjectModules} = useProjectModulesLazy({onCompleted: onProjectsModulesQueryCompleted})

  const onVerifyTokenClick = () => {
    if (token !== null) {
      getSurveyInvitationAndEventsForResumption(token)
    }
  }

  const onResumeProjectClick = () => {
    surveyInvitationAndEventsForResumption.forEach(data => getProjectModules(data.surveyInvitation.survey.project.id))
  }

  return (
    <ProjectResumption
      surveyInvitation={surveyInvitationAndEventsForResumption.map(data => data.surveyInvitation)}
      onVerifyTokenClick={onVerifyTokenClick}
      onResumeProjectClick={onResumeProjectClick}
      token={token}
      setToken={setToken}
      tokenErrorMessage={tokenError}
      appStateInitialized={appStateInitialized}
    />
  )
}

const getElapsedTimeOfScenarioOrQuestionnaire = (surveyEvents: SurveyEvent[], startedAt: Date, isScenario: boolean) => {
  let lastResumeEventIndex: number | null = null

  const sortedSurveyEvents = sortByTimestampDate(surveyEvents)
  return sortedSurveyEvents.reduce((accumulator, current, index) => {
    if (
      isScenario
        ? current.eventType === SurveyEventType.ResumeScenario
        : current.eventType === SurveyEventType.ResumeQuestionnaire
    ) {
      const lastEventForResumption = surveyEvents[index - 1]

      const absoluteDifferenceInSeconds = Math.abs(
        differenceInSeconds(
          lastEventForResumption.timestamp,
          lastResumeEventIndex !== null ? surveyEvents[lastResumeEventIndex].timestamp : startedAt
        )
      )

      lastResumeEventIndex = index

      return accumulator + absoluteDifferenceInSeconds
    } else if (index === surveyEvents.length - 1) {
      // last event

      const lastEvent = surveyEvents[index]
      return (
        accumulator +
        Math.abs(
          differenceInSeconds(
            lastEvent.timestamp,
            lastResumeEventIndex !== null ? surveyEvents[lastResumeEventIndex].timestamp : startedAt
          )
        )
      )
    } else {
      return accumulator
    }
  }, 0)
}
