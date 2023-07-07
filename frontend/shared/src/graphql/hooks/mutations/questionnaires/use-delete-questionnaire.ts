import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {
  DeleteQuestionnaireMutation,
  DeleteQuestionnaireMutationVariables
} from "../../../generated/DeleteQuestionnaireMutation"
import {deleteQuestionnaireMutation} from "../../../mutations"
import {questionnairesQuery} from "../../../queries"

export const useDeleteQuestionnaire = (isRuntimeSurvey: boolean): DeleteEntityHook => {
  const [deleteQuestionnaire, {loading}] = useMutation<
    DeleteQuestionnaireMutation,
    DeleteQuestionnaireMutationVariables
  >(deleteQuestionnaireMutation)

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteQuestionnaire({
          variables: {id},
          refetchQueries: [{query: questionnairesQuery, variables: {isRuntimeSurvey}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
