import {useQuery} from "@apollo/client"
import {SurveyResultsForParticipant} from "../../../../models"
import {Option} from "../../../../utils"
import {
  SurveyResultsForParticipantQuery,
  SurveyResultsForParticipantQueryVariables
} from "../../../generated/SurveyResultsForParticipantQuery"
import {surveyResultsForParticipantQuery} from "../../../queries"

export interface UseSurveyResultsForParticipantHook {
  readonly surveyResultsForParticipant: Option<SurveyResultsForParticipant>
  readonly surveyResultsForParticipantLoading: boolean
}

export const useSurveyResultsForParticipant = (
  surveyId: UUID,
  surveyInvitationId: UUID
): UseSurveyResultsForParticipantHook => {
  const {data, loading} = useQuery<SurveyResultsForParticipantQuery, SurveyResultsForParticipantQueryVariables>(
    surveyResultsForParticipantQuery,
    {
      variables: {
        surveyId,
        surveyInvitationId
      }
    }
  )
  return {
    surveyResultsForParticipant: Option.of(data?.surveyResultsForParticipant),
    surveyResultsForParticipantLoading: loading
  }
}
