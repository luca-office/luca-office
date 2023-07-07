import {useApolloClient} from "@apollo/client"
import {isEqual} from "lodash-es"
import {useEffect, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useFilesForScenario, useLocalEmails, useScenario} from "../../../graphql/hooks"
import {
  Intervention,
  InterventionWithTimeOffset,
  LatestStartedProjectModule,
  LocalEmail,
  OfficeModule
} from "../../../models"
import {
  updateDelayedEmailsInitializedAction,
  updateInterventionEmailsInitializedAction
} from "../../../redux/actions/project-resumption-action"
import {SharedAppState} from "../../../redux/state"
import {ElapsedTimeOfProjectModuleForResumption} from "../../../redux/state/data/project-resumption-state"
import {Option} from "../../../utils"
import {initEmailsForProjectResumption, initInterventionsForProjectResumption} from "../../../utils/project-resumption"
import {EmailClientRemoteState} from "../email-client-container"
import {
  handleEmailsForLaterStartOfSurvey,
  handleInterventionsForLaterStartOfSurvey
} from "../utils/later-start-to-survey"

export interface EmailClientRemoteStateHookProps {
  readonly scenarioId: UUID
  readonly interventions: Array<Intervention>
  readonly setEmails: (emails: Array<LocalEmail>) => void
  readonly delayEmail: (email: LocalEmail) => void
  readonly delayInterventionEmail: (intervention: InterventionWithTimeOffset) => void
  readonly emails: Array<LocalEmail>
}

export const useEmailClientRemoteState = <State>(getSharedState: (state: State) => SharedAppState) => ({
  scenarioId,
  interventions,
  setEmails,
  delayInterventionEmail,
  delayEmail,
  emails
}: EmailClientRemoteStateHookProps): EmailClientRemoteState => {
  const {scenario: scenarioOption, scenarioLoading} = useScenario(scenarioId)
  const {localEmails: predefinedEmailsOption, localEmailsLoading: predefinedEmailsLoading} = useLocalEmails(scenarioId)
  const {files: filesOption, filesLoading} = useFilesForScenario(scenarioId, scenarioId === "")

  const latestStartedProjectModule = useSelector<State, Option<LatestStartedProjectModule>>(
    state => getSharedState(state).data.common.latestStartedProjectModule
  )
  const elapsedTimeOfProjectModuleForResumption = useSelector<State, Option<ElapsedTimeOfProjectModuleForResumption>>(
    state => getSharedState(state).data.projectResumption.elapsedTimeOfProjectModule
  )

  const dispatch = useDispatch()

  const client = useApolloClient()

  const token = useSelector<State, Option<string>>(state => getSharedState(state).data.surveyInvitation.token)

  const isLaterStartToSurvey = latestStartedProjectModule.isDefined()
  const isSurveyResumption = elapsedTimeOfProjectModuleForResumption.isDefined()

  const activeModule = useSelector<State, Option<OfficeModule>>(state => getSharedState(state).ui.common.activeModule)
  const areDelayedEmailsForProjectResumptionInitialized = useSelector<State, boolean>(
    state => getSharedState(state).data.projectResumption.areDelayedEmailsInitialized
  )
  const areInterventionEmailsForProjectResumptionInitialized = useSelector<State, boolean>(
    state => getSharedState(state).data.projectResumption.areInterventionEmailsInitialized
  )

  const setAreDelayedEmailsForProjectResumptionInitialized = (areInitialized: boolean) =>
    dispatch(updateDelayedEmailsInitializedAction(areInitialized))

  const setAreInterventionEmailsForProjectResumptionInitialized = (areInitialized: boolean) =>
    dispatch(updateInterventionEmailsInitializedAction(areInitialized))

  useEffect(() => {
    // bail out if there are already emails in state, except if survey resumption, because emails will be initialized before and set to visible=false
    if (
      (emails.length > 0 && !isSurveyResumption) ||
      (isSurveyResumption && areDelayedEmailsForProjectResumptionInitialized)
    )
      return

    if (predefinedEmailsLoading) {
      return
    }

    const newEmails: LocalEmail[] = predefinedEmailsOption.getOrElse([])

    const interventionEmailIds = interventions.map(intervention => intervention.interventionEmailId)

    const emailsWithoutInterventionEmails = newEmails.filter(email => !interventionEmailIds.includes(email.id))

    if (isLaterStartToSurvey) {
      handleEmailsForLaterStartOfSurvey({
        activeModule,
        allLocalEmails: newEmails,
        interventionEmailIds,
        latestStartedProjectModule,
        setEmails,
        delayEmail
      })
    } else if (isSurveyResumption) {
      elapsedTimeOfProjectModuleForResumption.forEach(elapsedTime =>
        token.forEach(async participantToken => {
          await initEmailsForProjectResumption({
            delayEmail,
            elapsedTimeOfProjectModuleForResumptionInSeconds: elapsedTime.elapsedTimeInSeconds,
            emailsWithoutInterventionEmails,
            client,
            participantToken,
            setAreEmailsForProjectResumptionInitialized: setAreDelayedEmailsForProjectResumptionInitialized
          })
        })
      )
    } else {
      // standard start
      setEmails(newEmails.filter(email => email.receptionDelayInSeconds <= 0))
      const delayedEmails = emailsWithoutInterventionEmails.filter(email => email.receptionDelayInSeconds > 0)
      delayedEmails.forEach(email => delayEmail(email))
    }
  }, [predefinedEmailsLoading])

  const interventionsRef = useRef(interventions)
  if (!isEqual(interventionsRef.current, interventions)) {
    interventionsRef.current = interventions
  }

  useEffect(() => {
    // bail out if there are already emails in state,except if survey resumption, because emails will be initialized before and set to visible=false
    if (
      (emails.length > 0 && !isSurveyResumption) ||
      (isSurveyResumption && areInterventionEmailsForProjectResumptionInitialized)
    )
      return

    if (latestStartedProjectModule.isDefined()) {
      handleInterventionsForLaterStartOfSurvey({
        activeModule,
        latestStartedProjectModule,
        interventions,
        delayInterventionEmail
      })
    } else if (isSurveyResumption) {
      elapsedTimeOfProjectModuleForResumption.forEach(elapsedTime =>
        token.forEach(async token => {
          await initInterventionsForProjectResumption({
            delayInterventionEmail,
            elapsedTimeOfProjectModuleForResumptionInSeconds: elapsedTime.elapsedTimeInSeconds,
            interventions,
            client,
            participantToken: token,
            setAreInterventionEmailsForProjectResumptionInitialized
          })
        })
      )
    } else {
      interventions
        .filter(intervention => intervention.__typename !== "RuntimeSurveyAnswerSelectionIntervention")
        .forEach(intervention => {
          intervention.__typename !== "RuntimeSurveyAnswerSelectionIntervention" && delayInterventionEmail(intervention) // fix type error that intervention has no timeoffset, despite the filter of corresponding typename
        })
    }
  }, [interventionsRef.current])

  return {
    scenarioOption,
    isLoading: filesLoading || scenarioLoading || predefinedEmailsLoading,
    filesOption
  }
}
