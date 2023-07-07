import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {
  DeleteFreetextQuestionCodingCriterionMutation,
  DeleteFreetextQuestionCodingCriterionMutationVariables
} from "../../../generated/DeleteFreetextQuestionCodingCriterionMutation"
import {deleteFreetextCodingCriterionMutation} from "../../../mutations"
import {questionnaireQuestionQuery} from "../../../queries"

export const useDeleteFreetextQuestionCodingCriterion = (questionId: UUID): DeleteEntityHook => {
  const [deleteFreetextQuestionCodingCriterion, {loading}] = useMutation<
    DeleteFreetextQuestionCodingCriterionMutation,
    DeleteFreetextQuestionCodingCriterionMutationVariables
  >(deleteFreetextCodingCriterionMutation)

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteFreetextQuestionCodingCriterion({
          variables: {id},
          refetchQueries: [{query: questionnaireQuestionQuery, variables: {id: questionId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
