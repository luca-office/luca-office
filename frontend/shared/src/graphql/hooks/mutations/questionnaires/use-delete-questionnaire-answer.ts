import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {
  DeleteQuestionnaireAnswerMutation,
  DeleteQuestionnaireAnswerMutationVariables
} from "../../../generated/DeleteQuestionnaireAnswerMutation"
import {deleteQuestionnaireAnswerMutation} from "../../../mutations"
import {questionnaireQuestionQuery} from "../../../queries"

export const useDeleteQuestionnaireAnswer = (questionId: UUID): DeleteEntityHook => {
  const [deleteQuestionnaireAnswer, {loading}] = useMutation<
    DeleteQuestionnaireAnswerMutation,
    DeleteQuestionnaireAnswerMutationVariables
  >(deleteQuestionnaireAnswerMutation)

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteQuestionnaireAnswer({
          variables: {id},
          refetchQueries: [{query: questionnaireQuestionQuery, variables: {id: questionId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
