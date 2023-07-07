import {ApolloError} from "@apollo/client"
import * as React from "react"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {SurveyParticipationStatus} from "shared/graphql/generated/globalTypes"
import {useSurveyParticipationInfoLazy} from "shared/graphql/hooks"
import {SurveyInvitation} from "shared/models"
import {updateInvitationDataAction} from "shared/redux/actions/data-action"
import {isDefined, isSurveyParticipationCompleted, Option, parseDateString} from "shared/utils"
import {SurveyInvitationQuery} from "../../../graphql/generated/SurveyInvitationQuery"
import {useSurveyInvitation} from "../../../graphql/hooks"
import {navigateToRouteAction} from "../../../redux/actions/routing-action"
import {Route} from "../../../routes"
import {VerifyToken, VerifyTokenFormData} from "./verify-token"

export const VerifyTokenContainer: React.FC = () => {
  const dispatch = useDispatch()
  const [errorCode, setErrorCode] = React.useState<Option<string>>(Option.none())
  const formMethods = useForm<VerifyTokenFormData>()
  const {surveyParticipationInfoLoading, getSurveyParticipationInfo} = useSurveyParticipationInfoLazy()

  const handleCompletion = (data: SurveyInvitationQuery) => {
    if (data.surveyInvitation) {
      dispatch(
        updateInvitationDataAction({
          token: Option.of(data.surveyInvitation.token),
          invitationId: Option.of(data.surveyInvitation.id),
          surveyId: Option.of(data.surveyInvitation.survey.id),
          executionType: Option.of(data.surveyInvitation.survey.executionType),
          manualSurveyStartedAt: Option.of(
            isDefined(data.surveyInvitation.survey.manualPeriod?.start)
              ? parseDateString(data.surveyInvitation.survey.manualPeriod!.start)
              : undefined
          )
        })
      )
      dispatch(navigateToRouteAction({routeType: Route.Login}))
    }
  }
  const handleError = (error: ApolloError) => {
    const tokenAlreadyUsed = error.graphQLErrors[0]?.extensions?.type === "TokenAlreadyUsed"

    if (tokenAlreadyUsed) {
      dispatch(
        navigateToRouteAction({
          routeType: Route.ResumeProject,
          parameters: {token: formMethods.getValues().token}
        })
      )
    }
    setErrorCode(Option.of(`${error.graphQLErrors[0]?.extensions?.type}`))
  }

  const {
    hasBeenCalled,
    getSurveyInvitation: fetchSurveyInvitationAndRouteToLogin,
    surveyInvitationLoading
  } = useSurveyInvitation(handleCompletion, handleError)

  // Checks whether a participant has already taken part in the survey and redirects
  // to start-project to display the report-card or redirects to login
  const verifyEntryToken = async (token: string) => {
    let surveyInvitationOption = Option.none<SurveyInvitation>()
    let surveyParticipationStatusOption = Option.none<SurveyParticipationStatus>()
    try {
      const surveyParticipationInfo = await getSurveyParticipationInfo(token)
      surveyInvitationOption = surveyParticipationInfo.map(({surveyInvitation}) => surveyInvitation)
      surveyParticipationStatusOption = surveyParticipationInfo.map(
        ({surveyParticipationStatus}) => surveyParticipationStatus
      )
    } catch (error) {
      fetchSurveyInvitationAndRouteToLogin(token)
      return
    }

    const surveyInvitation = surveyInvitationOption.orNull()
    const surveyParticipationStatus = surveyParticipationStatusOption.orNull()
    if (surveyInvitation === null || surveyParticipationStatus === null) {
      fetchSurveyInvitationAndRouteToLogin(token)
      return
    }

    const isSurveyFinished = isSurveyParticipationCompleted(surveyParticipationStatus)
    if (isSurveyFinished) {
      dispatch(
        updateInvitationDataAction({
          token: Option.of(token),
          invitationId: Option.of(surveyInvitation.id),
          surveyId: Option.of(surveyInvitation.survey.id),
          executionType: Option.of(surveyInvitation.survey.executionType),
          manualSurveyStartedAt: Option.of(
            isDefined(surveyInvitation.survey.manualPeriod?.start)
              ? parseDateString(surveyInvitation.survey.manualPeriod!.start)
              : undefined
          )
        })
      )
      dispatch(navigateToRouteAction({routeType: Route.StartProject}))
      return
    }
    fetchSurveyInvitationAndRouteToLogin(token)
  }

  return (
    <VerifyToken
      formData={formMethods}
      surveyInvitationHasBeenCalled={hasBeenCalled}
      surveyInvitationLoading={surveyInvitationLoading}
      verifyEntryToken={verifyEntryToken}
      errorCode={errorCode}
      isLoading={surveyParticipationInfoLoading}
    />
  )
}
