import {useMutation} from "@apollo/client"
import {
  DeleteErpSupplierMutation,
  DeleteErpSupplierMutationVariables
} from "../../../generated/DeleteErpSupplierMutation"
import {deleteErpSupplierMutation} from "../../../mutations"
import {erpSuppliersQuery} from "../../../queries"

export interface DeleteErpSupplierProps {
  readonly deleteErpSupplier: (id: number, sampleCompanyId: UUID) => Promise<void>
  readonly isDeleteErpSupplierLoading: boolean
}

export const useDeleteErpSupplier = (): DeleteErpSupplierProps => {
  const [deleteErpSupplier, {loading}] = useMutation<DeleteErpSupplierMutation, DeleteErpSupplierMutationVariables>(
    deleteErpSupplierMutation
  )

  return {
    deleteErpSupplier: (id: number, sampleCompanyId: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteErpSupplier({
          variables: {id, sampleCompanyId},
          refetchQueries: [{query: erpSuppliersQuery, variables: {sampleCompanyId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    isDeleteErpSupplierLoading: loading
  }
}
