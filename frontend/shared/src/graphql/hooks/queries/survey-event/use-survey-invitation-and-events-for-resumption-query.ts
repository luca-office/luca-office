import {ApolloError, useLazyQuery} from "@apollo/client"
import {SurveyInvitationAndEventsForResumption} from "../../../../models/survey-event/survey-events-for-latest-in-progress-project-module"
import {Option} from "../../../../utils"
import {
  SurveyInvitationAndEventsForResumptionQuery,
  SurveyInvitationAndEventsForResumptionQueryVariables
} from "../../../generated/SurveyInvitationAndEventsForResumptionQuery"
import {surveyInvitationAndEventsForResumptionQuery} from "../../../queries/survey-event"

export interface UseSurveyEventsForLatestInProgressProjectModule {
  readonly surveyInvitationAndEventsForResumptionLoading: boolean
  readonly surveyInvitationAndEventsForResumption: Option<SurveyInvitationAndEventsForResumption>
  readonly getSurveyInvitationAndEventsForResumption: (token: UUID) => void
}

export const useSurveyInvitationAndEventsForResumptionQueryLazy = (
  onCompleted?: (data: SurveyInvitationAndEventsForResumptionQuery | undefined) => void,
  onError?: (error: ApolloError) => void
): UseSurveyEventsForLatestInProgressProjectModule => {
  const [getSurveyInvitationAndEventsForResumption, {data, loading}] = useLazyQuery<
    SurveyInvitationAndEventsForResumptionQuery,
    SurveyInvitationAndEventsForResumptionQueryVariables
  >(surveyInvitationAndEventsForResumptionQuery, {onCompleted, onError})

  return {
    surveyInvitationAndEventsForResumptionLoading: loading,
    surveyInvitationAndEventsForResumption: Option.of(data?.surveyInvitationAndEventsForResumption),
    getSurveyInvitationAndEventsForResumption: (token: UUID) =>
      getSurveyInvitationAndEventsForResumption({variables: {token}})
  }
}
