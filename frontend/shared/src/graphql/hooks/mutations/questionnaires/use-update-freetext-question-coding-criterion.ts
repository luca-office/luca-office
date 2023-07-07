import {useMutation} from "@apollo/client"
import {FreetextQuestionCodingCriterion} from "../../../../models"
import {Option} from "../../../../utils"
import {FreetextQuestionCodingCriterionUpdate} from "../../../generated/globalTypes"
import {
  UpdateFreetextQuestionCodingCriterionMutation,
  UpdateFreetextQuestionCodingCriterionMutationVariables
} from "../../../generated/UpdateFreetextQuestionCodingCriterionMutation"
import {updateFreetextCodingCriterionMutation} from "../../../mutations"
import {questionnaireQuestionQuery} from "../../../queries"

export interface UpdateFreetextQuestionCodingCriterionProps {
  readonly updateFreetextQuestionCodingCriterion: (
    id: UUID,
    update: FreetextQuestionCodingCriterionUpdate
  ) => Promise<Option<FreetextQuestionCodingCriterion>>
  readonly updateFreetextQuestionCodingCriterionLoading: boolean
}

export const useUpdateFreetextQuestionCodingCriterion = (
  questionId: UUID
): UpdateFreetextQuestionCodingCriterionProps => {
  const [updateFreetextQuestionCodingCriterion, {loading}] = useMutation<
    UpdateFreetextQuestionCodingCriterionMutation,
    UpdateFreetextQuestionCodingCriterionMutationVariables
  >(updateFreetextCodingCriterionMutation)

  return {
    updateFreetextQuestionCodingCriterion: (id: UUID, update: FreetextQuestionCodingCriterionUpdate) =>
      new Promise<Option<FreetextQuestionCodingCriterion>>((resolve, reject) => {
        updateFreetextQuestionCodingCriterion({
          variables: {id, update},
          refetchQueries: [{query: questionnaireQuestionQuery, variables: {id: questionId}}]
        })
          .then(result => resolve(Option.of(result.data?.updateFreetextQuestionCodingCriterion)))
          .catch(reject)
      }),
    updateFreetextQuestionCodingCriterionLoading: loading
  }
}
