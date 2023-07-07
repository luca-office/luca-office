import {useMutation} from "@apollo/client"
import {
  DeleteErpOrderItemMutation,
  DeleteErpOrderItemMutationVariables
} from "../../../generated/DeleteErpOrderItemMutation"
import {deleteErpOrderItemMutation} from "../../../mutations"
import {erpOrderItemsQuery} from "../../../queries"

export interface DeleteErpOrderItemProps {
  readonly deleteErpOrderItem: (id: number, sampleCompanyId: UUID) => Promise<void>
  readonly isDeleteErpOrderItemLoading: boolean
}

export const useDeleteErpOrderItem = (): DeleteErpOrderItemProps => {
  const [deleteErpOrderItem, {loading}] = useMutation<DeleteErpOrderItemMutation, DeleteErpOrderItemMutationVariables>(
    deleteErpOrderItemMutation
  )

  return {
    deleteErpOrderItem: (id: number, sampleCompanyId: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteErpOrderItem({
          variables: {id, sampleCompanyId},
          refetchQueries: [{query: erpOrderItemsQuery, variables: {sampleCompanyId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    isDeleteErpOrderItemLoading: loading
  }
}
