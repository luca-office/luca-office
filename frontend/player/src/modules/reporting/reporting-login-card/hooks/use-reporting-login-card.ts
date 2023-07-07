import * as React from "react"
import {useDispatch, useSelector} from "react-redux"
import {SurveyParticipationStatus} from "shared/graphql/generated/globalTypes"
import {useSurveyParticipationInfoLazy} from "shared/graphql/hooks"
import {useLucaTranslation} from "shared/translations"
import {Option} from "shared/utils"
import {navigateToRouteAction} from "../../../../redux/actions/routing-action"
import {Route} from "../../../../routes"
import {updateInvitationDataAction} from "shared/redux/actions"
import {selectSurveyInvitation} from "shared/redux/state/data"

export interface UseReportingLoginCardHook {
  readonly loading: boolean
  readonly tokenInput: string
  readonly errorMessage: Option<string>
  readonly description: string
  readonly subDescription: Option<string>
  readonly onChange: (value: string) => void
  readonly navigateToReporting: (token: string) => void
}

export const useReportingLoginCard = (surveyId: UUID, isTokenAvailable: boolean): UseReportingLoginCardHook => {
  const {t} = useLucaTranslation()
  const dispatch = useDispatch()

  const [loading, setLoading] = React.useState(false)
  const [tokenInput, setTokenInput] = React.useState("")
  const [errorMessage, setErrorMessage] = React.useState<Option<string>>(Option.none())

  const surveyInvitationState = useSelector(selectSurveyInvitation)

  const {surveyParticipationInfoLoading, getSurveyParticipationInfo} = useSurveyParticipationInfoLazy()

  const description = isTokenAvailable
    ? t("reporting__show_description_available_token")
    : t("reporting__show_description_unavailable_token")
  const subDescription = isTokenAvailable
    ? Option.of(t("reporting__show_sub_description_available_token"))
    : Option.none<string>()

  const setParticipantNotFoundError = () => {
    setLoading(false)
    setErrorMessage(Option.of(t("reporting__error_no_participant_found")))
  }
  const setReportingNotAvailableError = () => {
    setLoading(false)
    setErrorMessage(Option.of(t("reporting__error_rating_in_progress")))
  }
  const resetErrorMessage = () => {
    setLoading(false)
    setErrorMessage(Option.none())
  }

  const onChange = (value: string) => setTokenInput(value)

  // checks if a report for the given token is available and routes to the report overview
  const navigateToReporting = (token: string) => {
    setLoading(true)

    getSurveyParticipationInfo(token)
      .then(surveyParticipationInfo => {
        const surveyInvitationOption = surveyParticipationInfo.map(({surveyInvitation}) => surveyInvitation)
        const surveyParticipationStatusOption = surveyParticipationInfo.map(
          ({surveyParticipationStatus}) => surveyParticipationStatus
        )

        const surveyInvitation = surveyInvitationOption.orNull()
        const surveyParticipationStatus = surveyParticipationStatusOption.orNull()
        if (surveyInvitation === null || surveyParticipationStatus === null) {
          setParticipantNotFoundError()
          return
        }

        if (surveyParticipationStatus !== SurveyParticipationStatus.RatingFinalized) {
          setReportingNotAvailableError()
          return
        }

        resetErrorMessage()
        dispatch(updateInvitationDataAction({...surveyInvitationState, token: Option.of(token)}))
        dispatch(navigateToRouteAction({routeType: Route.Report, parameters: {surveyId, token}}))
      })
      .catch(() => setParticipantNotFoundError())
  }

  return {
    loading: loading || surveyParticipationInfoLoading,
    tokenInput,
    errorMessage,
    description,
    subDescription,
    onChange,
    navigateToReporting
  }
}
