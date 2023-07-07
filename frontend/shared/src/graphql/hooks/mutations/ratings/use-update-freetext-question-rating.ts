import {useMutation} from "@apollo/client"
import {FreetextQuestionRating} from "../../../../models"
import {Option} from "../../../../utils"
import {FreetextQuestionRatingUpdate} from "../../../generated/globalTypes"
import {
  UpdateFreetextQuestionRatingMutation,
  UpdateFreetextQuestionRatingMutationVariables
} from "../../../generated/UpdateFreetextQuestionRatingMutation"
import {updateFreetextQuestionRatingMutation} from "../../../mutations"
import {freetextQuestionRatingForParticipantQuery} from "../../../queries"

export interface UseUpdateFreetextQuestionRatingHook {
  readonly updateFreetextQuestionRating: (
    id: UUID,
    update: FreetextQuestionRatingUpdate
  ) => Promise<Option<FreetextQuestionRating>>
  readonly updateFreetextQuestionRatingLoading: boolean
}

export const useUpdateFreetextQuestionRating = (
  questionId: UUID,
  surveyInvitationId: UUID
): UseUpdateFreetextQuestionRatingHook => {
  const [updateFreetextQuestionRating, {loading}] = useMutation<
    UpdateFreetextQuestionRatingMutation,
    UpdateFreetextQuestionRatingMutationVariables
  >(updateFreetextQuestionRatingMutation)

  return {
    updateFreetextQuestionRating: (id: UUID, update: FreetextQuestionRatingUpdate) =>
      new Promise<Option<FreetextQuestionRating>>((resolve, reject) => {
        updateFreetextQuestionRating({
          variables: {id, update},
          refetchQueries: [
            {query: freetextQuestionRatingForParticipantQuery, variables: {questionId, surveyInvitationId}}
          ]
        })
          .then(result => resolve(Option.of(result.data?.updateFreetextQuestionRating)))
          .catch(reject)
      }),
    updateFreetextQuestionRatingLoading: loading
  }
}
