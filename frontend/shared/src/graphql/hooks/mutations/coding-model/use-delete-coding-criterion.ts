import {useMutation} from "@apollo/client"
import {CodingCriterion, DeleteEntityHook} from "../../../../models"
import {deleteIdEntityFromCache} from "../../../cache"
import {CodingCriteriaQuery, CodingCriteriaQueryVariables} from "../../../generated/CodingCriteriaQuery"
import {
  DeleteCodingCriterionMutation,
  DeleteCodingCriterionMutationVariables
} from "../../../generated/DeleteCodingCriterionMutation"
import {deleteCodingCriterionMutation} from "../../../mutations"
import {codingCriteriaQuery, codingDimensionsQuery} from "../../../queries"

export const useDeleteCodingCriterion = (codingItemId: UUID, codingModelId: UUID): DeleteEntityHook => {
  const [deleteCodingCriterion, {loading: deleteEntityLoading}] = useMutation<
    DeleteCodingCriterionMutation,
    DeleteCodingCriterionMutationVariables
  >(deleteCodingCriterionMutation)

  const deleteEntity = (id: UUID) =>
    new Promise<void>((resolve, reject) => {
      deleteCodingCriterion({
        variables: {id},
        update: deleteIdEntityFromCache<
          CodingCriteriaQuery,
          DeleteCodingCriterionMutation,
          CodingCriteriaQueryVariables,
          CodingCriterion
        >(codingCriteriaQuery, "codingCriteria", id, {itemId: codingItemId}),
        refetchQueries: [
          {
            query: codingDimensionsQuery,
            variables: {
              modelId: codingModelId
            }
          }
        ]
      })
        .then(() => resolve())
        .catch(reject)
    })

  return {
    deleteEntity,
    deleteEntityLoading
  }
}
