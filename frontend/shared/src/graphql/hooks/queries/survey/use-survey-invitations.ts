import {useQuery} from "@apollo/client"
import {SurveyInvitationLight} from "../../../../models"
import {SurveyInvitationsQuery, SurveyInvitationsQueryVariables} from "../../../generated/SurveyInvitationsQuery"
import {surveyInvitationsQuery} from "../../../queries"

export interface SurveyInvitationsProps {
  readonly surveyInvitations: SurveyInvitationLight[]
  readonly surveyInvitationsLoading: boolean
}

export const useSurveyInvitations = (surveyId: UUID, skip = false): SurveyInvitationsProps => {
  const {data, loading} = useQuery<SurveyInvitationsQuery, SurveyInvitationsQueryVariables>(surveyInvitationsQuery, {
    variables: {surveyId},
    skip
  })

  return {
    surveyInvitations: data?.surveyInvitations ?? [],
    surveyInvitationsLoading: loading
  }
}
