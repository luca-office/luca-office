import {useQuery} from "@apollo/client"
import {SurveyInvitationProgress} from "../../../../models"
import {Option, removeTypename} from "../../../../utils"
import {
  SurveyInvitationsProgressQuery,
  SurveyInvitationsProgressQueryVariables
} from "../../../generated/SurveyInvitationsProgressQuery"
import {surveyInvitationsProgressQuery} from "../../../queries"

export interface SurveyInvitationsProgressProps {
  readonly surveyInvitationsProgress: Option<SurveyInvitationProgress[]>
  readonly surveyInvitationsProgressLoading: boolean
}

export const useSurveyInvitationsProgress = (
  surveyId: UUID,
  pollIntervalInMillis?: number
): SurveyInvitationsProgressProps => {
  const {data, loading} = useQuery<SurveyInvitationsProgressQuery, SurveyInvitationsProgressQueryVariables>(
    surveyInvitationsProgressQuery,
    {variables: {surveyId}, pollInterval: pollIntervalInMillis}
  )

  return {
    surveyInvitationsProgress: Option.of(data?.surveyInvitations?.map(removeTypename)),
    surveyInvitationsProgressLoading: loading
  }
}
