import {useMutation} from "@apollo/client"
import {DeleteErpOrderMutation, DeleteErpOrderMutationVariables} from "../../../generated/DeleteErpOrderMutation"
import {deleteErpOrderMutation} from "../../../mutations"
import {erpOrdersQuery} from "../../../queries"

export interface DeleteErpOrderProps {
  readonly deleteErpOrder: (id: number, sampleCompanyId: UUID) => Promise<void>
  readonly isDeleteErpOrderLoading: boolean
}

export const useDeleteErpOrder = (): DeleteErpOrderProps => {
  const [deleteErpOrder, {loading}] = useMutation<DeleteErpOrderMutation, DeleteErpOrderMutationVariables>(
    deleteErpOrderMutation
  )

  return {
    deleteErpOrder: (id: number, sampleCompanyId: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteErpOrder({
          variables: {id, sampleCompanyId},
          refetchQueries: [{query: erpOrdersQuery, variables: {sampleCompanyId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    isDeleteErpOrderLoading: loading
  }
}
