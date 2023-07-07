import {useMutation} from "@apollo/client"
import {FreetextQuestionRatingCriterionSelection} from "../../../../models"
import {Option} from "../../../../utils"
import {
  CreateFreetextQuestionRatingCriterionSelectionMutation,
  CreateFreetextQuestionRatingCriterionSelectionMutationVariables
} from "../../../generated/CreateFreetextQuestionRatingCriterionSelectionMutation"
import {FreetextQuestionRatingCriterionSelectionCreation} from "../../../generated/globalTypes"
import {createFreetextQuestionRatingCriterionSelectionMutation} from "../../../mutations"
import {freetextQuestionRatingForParticipantQuery} from "../../../queries"

export interface UseCreateFreetextQuestionRatingCriterionSelectionHook {
  readonly createFreetextQuestionRatingCriterionSelection: (
    creation: FreetextQuestionRatingCriterionSelectionCreation
  ) => Promise<Option<FreetextQuestionRatingCriterionSelection>>
  readonly createFreetextQuestionRatingCriterionSelectionLoading: boolean
}

export const useCreateFreetextQuestionRatingCriterionSelection = (
  questionId: UUID,
  surveyInvitationId: UUID
): UseCreateFreetextQuestionRatingCriterionSelectionHook => {
  const [createFreetextQuestionRatingCriterionSelection, {loading}] = useMutation<
    CreateFreetextQuestionRatingCriterionSelectionMutation,
    CreateFreetextQuestionRatingCriterionSelectionMutationVariables
  >(createFreetextQuestionRatingCriterionSelectionMutation)

  return {
    createFreetextQuestionRatingCriterionSelection: (creation: FreetextQuestionRatingCriterionSelectionCreation) =>
      new Promise<Option<FreetextQuestionRatingCriterionSelection>>((resolve, reject) => {
        createFreetextQuestionRatingCriterionSelection({
          variables: {creation},
          refetchQueries: [
            {query: freetextQuestionRatingForParticipantQuery, variables: {questionId, surveyInvitationId}}
          ]
        })
          .then(result => resolve(Option.of(result.data?.createFreetextQuestionRatingCriterionSelection)))
          .catch(reject)
      }),
    createFreetextQuestionRatingCriterionSelectionLoading: loading
  }
}
