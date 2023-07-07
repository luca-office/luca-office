import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {useErrorHandler} from "../../../../utils"
import {DeleteCodingItemMutation, DeleteCodingItemMutationVariables} from "../../../generated/DeleteCodingItemMutation"
import {deleteCodingItemMutation} from "../../../mutations"
import {codingDimensionQuery} from "../../../queries"

export const useDeleteCodingItem = (dimensionId: UUID): DeleteEntityHook => {
  const [deleteCodingItem, {loading: deleteEntityLoading}] = useMutation<
    DeleteCodingItemMutation,
    DeleteCodingItemMutationVariables
  >(deleteCodingItemMutation, {
    onError: err => handleError(err.graphQLErrors[0], "coding_models__coding_item_deletion_fk_error")
  })

  const handleError = useErrorHandler()

  const deleteEntity = (id: UUID) =>
    new Promise<void>((resolve, reject) => {
      deleteCodingItem({
        variables: {id},
        refetchQueries: [{query: codingDimensionQuery, variables: {id: dimensionId}}]
      })
        .then(() => resolve())
        .catch(reject)
    })

  return {
    deleteEntity,
    deleteEntityLoading
  }
}
