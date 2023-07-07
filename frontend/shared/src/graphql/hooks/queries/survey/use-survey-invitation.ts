import {useQuery} from "@apollo/client"
import {SurveyInvitation} from "../../../../models"
import {Option} from "../../../../utils"
import {SurveyInvitationQuery, SurveyInvitationQueryVariables} from "../../../generated/SurveyInvitationQuery"
import {surveyInvitationQuery} from "../../../queries"

export interface SurveyInvitationProps {
  readonly surveyInvitation: Option<SurveyInvitation>
  readonly surveyInvitationLoading: boolean
}

export const useSurveyInvitation = (invitationId: UUID): SurveyInvitationProps => {
  const {data, loading} = useQuery<SurveyInvitationQuery, SurveyInvitationQueryVariables>(surveyInvitationQuery, {
    variables: {token: invitationId}
  })

  return {
    surveyInvitation: Option.of<SurveyInvitation>(data?.surveyInvitation),
    surveyInvitationLoading: loading
  }
}
