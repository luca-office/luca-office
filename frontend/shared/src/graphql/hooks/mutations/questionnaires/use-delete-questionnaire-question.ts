import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {DeleteQuestionnaireMutationVariables} from "../../../generated/DeleteQuestionnaireMutation"
import {DeleteQuestionnaireQuestionMutation} from "../../../generated/DeleteQuestionnaireQuestionMutation"
import {deleteQuestionnaireQuestionMutation} from "../../../mutations"
import {questionnaireQuery} from "../../../queries"

export const useDeleteQuestionnaireQuestion = (questionnaireId: UUID): DeleteEntityHook => {
  const [deleteQuestionnaireQuestion, {loading}] = useMutation<
    DeleteQuestionnaireQuestionMutation,
    DeleteQuestionnaireMutationVariables
  >(deleteQuestionnaireQuestionMutation)

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteQuestionnaireQuestion({
          variables: {id},
          refetchQueries: [{query: questionnaireQuery, variables: {id: questionnaireId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
