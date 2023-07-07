import {ApolloError, useLazyQuery} from "@apollo/client"
import {SurveyInvitation} from "shared/models"
import {Option} from "shared/utils"
import {SurveyInvitationQuery, SurveyInvitationQueryVariables} from "../../generated/SurveyInvitationQuery"
import {surveyInvitationQuery as invitationQuery} from "../../queries"

interface UseSurveyInvitation {
  readonly surveyInvitationData: Option<SurveyInvitation>
  readonly getSurveyInvitation: (token: string) => void
  readonly surveyInvitationLoading: boolean
  readonly hasBeenCalled: boolean
}

export const useSurveyInvitation = (
  onCompleted?: (data: SurveyInvitationQuery) => void,
  onError?: (err: ApolloError) => void
): UseSurveyInvitation => {
  const [surveyInvitation, {loading, data, called}] = useLazyQuery<
    SurveyInvitationQuery,
    SurveyInvitationQueryVariables
  >(invitationQuery, {onCompleted, onError})

  const getSurveyInvitation = (token: string) => {
    surveyInvitation({variables: {token}})
  }

  return {
    getSurveyInvitation,
    surveyInvitationLoading: loading,
    surveyInvitationData: Option.of<SurveyInvitation>(data?.surveyInvitation),
    hasBeenCalled: called
  }
}
