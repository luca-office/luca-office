import {useMutation} from "@apollo/client"
import {
  DeleteErpCustomerMutation,
  DeleteErpCustomerMutationVariables
} from "../../../generated/DeleteErpCustomerMutation"
import {deleteErpCustomerMutation} from "../../../mutations"
import {erpCustomersQuery} from "../../../queries"

export interface DeleteErpCustomerProps {
  readonly deleteErpCustomer: (id: number, sampleCompanyId: UUID) => Promise<void>
  readonly isDeleteErpCustomerLoading: boolean
}

export const useDeleteErpCustomer = (): DeleteErpCustomerProps => {
  const [deleteErpCustomer, {loading}] = useMutation<DeleteErpCustomerMutation, DeleteErpCustomerMutationVariables>(
    deleteErpCustomerMutation
  )

  return {
    deleteErpCustomer: (id: number, sampleCompanyId: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteErpCustomer({
          variables: {id, sampleCompanyId},
          refetchQueries: [{query: erpCustomersQuery, variables: {sampleCompanyId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    isDeleteErpCustomerLoading: loading
  }
}
