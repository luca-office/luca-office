import {useMutation} from "@apollo/client"
import {DeleteErpProductMutation, DeleteErpProductMutationVariables} from "../../../generated/DeleteErpProductMutation"
import {deleteErpProductMutation} from "../../../mutations"
import {erpProductsQuery} from "../../../queries"

export interface DeleteErpProductProps {
  readonly deleteErpProduct: (id: number, sampleCompanyId: UUID) => Promise<void>
  readonly isDeleteErpProductLoading: boolean
}

export const useDeleteErpProduct = (): DeleteErpProductProps => {
  const [deleteErpProduct, {loading}] = useMutation<DeleteErpProductMutation, DeleteErpProductMutationVariables>(
    deleteErpProductMutation
  )

  return {
    deleteErpProduct: (id: number, sampleCompanyId: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteErpProduct({
          variables: {id, sampleCompanyId},
          refetchQueries: [{query: erpProductsQuery, variables: {sampleCompanyId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    isDeleteErpProductLoading: loading
  }
}
