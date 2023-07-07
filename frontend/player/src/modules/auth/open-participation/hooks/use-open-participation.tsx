import {ApolloError, useMutation} from "@apollo/client"
import * as React from "react"
import {useDispatch} from "react-redux"
import {useSurveyLight} from "shared/graphql/hooks/queries/survey/use-survey-light"
import {SurveyLight} from "shared/models"
import {updateInvitationDataAction} from "shared/redux/actions/data-action"
import {isDefined, Option, parseDateString} from "shared/utils"
import {
  StartOpenParticipationMutation,
  StartOpenParticipationMutationVariables
} from "../../../../graphql/generated/StartOpenParticipationMutation"
import {startOpenParticipationMutation} from "../../../../graphql/mutations"
import {navigateToRouteAction} from "../../../../redux/actions/routing-action"
import {Route} from "../../../../routes"

export interface UseOpenParticipationHook {
  readonly startOpenParticipation: (surveyId: string) => void
  readonly isLoading: boolean
  readonly hasBeenCalled: boolean
  readonly errorCode: Option<string>
  readonly isSurveyLoading: boolean
}

export const useOpenParticipation = (surveyId: Option<UUID>): UseOpenParticipationHook => {
  const dispatch = useDispatch()
  const [errorCode, setErrorCode] = React.useState<Option<string>>(Option.none())

  const onSurveyQueryCompleted = (survey: Option<SurveyLight>) => {
    const isRatingFinalized = survey.exists(survey => survey.isRatingFinalized)
    if (isRatingFinalized) {
      survey.forEach(survey =>
        dispatch(navigateToRouteAction({routeType: Route.ReportLogin, parameters: {surveyId: survey.id}}))
      )
    }
  }

  const {surveyLoading} = useSurveyLight(surveyId.getOrElse(""), undefined, surveyId.isEmpty(), onSurveyQueryCompleted)

  const handleCompletion = (data: StartOpenParticipationMutation) => {
    if (data?.startOpenSurveyParticipation.survey) {
      dispatch(
        updateInvitationDataAction({
          token: Option.of(data.startOpenSurveyParticipation.token),
          invitationId: Option.of(data.startOpenSurveyParticipation.id),
          surveyId: Option.of(data.startOpenSurveyParticipation.survey.id),
          executionType: Option.of(data.startOpenSurveyParticipation.survey.executionType),
          manualSurveyStartedAt: Option.of(
            isDefined(data.startOpenSurveyParticipation.survey.manualPeriod?.start)
              ? parseDateString(data.startOpenSurveyParticipation.survey.manualPeriod!.start)
              : undefined
          )
        })
      )
      dispatch(navigateToRouteAction({routeType: Route.Login}))
    }
  }

  const handleError = (error: ApolloError) => {
    setErrorCode(Option.of(`${error.graphQLErrors[0]?.extensions?.type}`))
  }

  const [startOpenParticipation, {loading, called}] = useMutation<
    StartOpenParticipationMutation,
    StartOpenParticipationMutationVariables
  >(startOpenParticipationMutation, {
    onCompleted: handleCompletion,
    onError: handleError
  })

  return {
    startOpenParticipation: (surveyId: string) => startOpenParticipation({variables: {surveyId: surveyId}}),
    isLoading: loading,
    hasBeenCalled: called,
    errorCode,
    isSurveyLoading: surveyLoading
  }
}
