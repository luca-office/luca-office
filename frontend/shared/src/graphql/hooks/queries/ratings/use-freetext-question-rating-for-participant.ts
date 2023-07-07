import {useQuery} from "@apollo/client"
import {FreetextQuestionRating} from "../../../../models"
import {Option} from "../../../../utils"
import {
  FreetextQuestionRatingForParticipantQuery,
  FreetextQuestionRatingForParticipantQueryVariables
} from "../../../generated/FreetextQuestionRatingForParticipantQuery"
import {freetextQuestionRatingForParticipantQuery} from "../../../queries"

export interface UseFreetextQuestionRatingForParticipantHook {
  readonly freetextQuestionRatingForParticipant: Option<FreetextQuestionRating>
  readonly freetextQuestionRatingForParticipantLoading: boolean
}

export const useFreetextQuestionRatingForParticipant = (
  questionId: UUID,
  surveyInvitationId: UUID
): UseFreetextQuestionRatingForParticipantHook => {
  const {data, loading} = useQuery<
    FreetextQuestionRatingForParticipantQuery,
    FreetextQuestionRatingForParticipantQueryVariables
  >(freetextQuestionRatingForParticipantQuery, {variables: {questionId, surveyInvitationId}})

  return {
    freetextQuestionRatingForParticipant: Option.of(data?.freetextQuestionRatingForParticipant),
    freetextQuestionRatingForParticipantLoading: loading
  }
}
