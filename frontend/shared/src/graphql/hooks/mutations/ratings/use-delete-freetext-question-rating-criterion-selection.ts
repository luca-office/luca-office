import {useMutation} from "@apollo/client"
import {
  DeleteFreetextQuestionRatingCriterionSelectionMutation,
  DeleteFreetextQuestionRatingCriterionSelectionMutationVariables
} from "../../../generated/DeleteFreetextQuestionRatingCriterionSelectionMutation"
import {deleteFreetextQuestionRatingCriterionSelectionMutation} from "../../../mutations"
import {freetextQuestionRatingForParticipantQuery} from "../../../queries"

export interface UseDeleteFreetextQuestionRatingCriterionSelectionHook {
  readonly deleteFreetextQuestionRatingCriterionSelection: (
    freetextQuestionRatingId: UUID,
    criterionId: UUID
  ) => Promise<void>
  readonly deleteFreetextQuestionRatingCriterionSelectionLoading: boolean
}

export const useDeleteFreetextQuestionRatingCriterionSelection = (
  questionId: UUID,
  surveyInvitationId: UUID
): UseDeleteFreetextQuestionRatingCriterionSelectionHook => {
  const [deleteFreetextQuestionRatingCriterionSelection, {loading}] = useMutation<
    DeleteFreetextQuestionRatingCriterionSelectionMutation,
    DeleteFreetextQuestionRatingCriterionSelectionMutationVariables
  >(deleteFreetextQuestionRatingCriterionSelectionMutation)

  return {
    deleteFreetextQuestionRatingCriterionSelection: (freetextQuestionRatingId: UUID, criterionId: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteFreetextQuestionRatingCriterionSelection({
          variables: {freetextQuestionRatingId, criterionId},
          refetchQueries: [
            {query: freetextQuestionRatingForParticipantQuery, variables: {questionId, surveyInvitationId}}
          ]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteFreetextQuestionRatingCriterionSelectionLoading: loading
  }
}
