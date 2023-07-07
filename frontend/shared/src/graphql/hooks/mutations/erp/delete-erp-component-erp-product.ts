import {useMutation} from "@apollo/client"
import {
  DeleteErpComponentErpProductMutation,
  DeleteErpComponentErpProductMutationVariables
} from "../../../generated/DeleteErpComponentErpProductMutation"
import {deleteErpComponentErpProductMutation} from "../../../mutations"
import {erpComponentErpProductsQuery} from "../../../queries"

export interface DeleteErpComponentErpProductProps {
  readonly deleteErpComponentErpProduct: (id: number, sampleCompanyId: UUID) => Promise<void>
  readonly isDeleteErpComponentErpProductLoading: boolean
}

export const useDeleteErpComponentErpProduct = (): DeleteErpComponentErpProductProps => {
  const [deleteErpComponentErpProduct, {loading}] = useMutation<
    DeleteErpComponentErpProductMutation,
    DeleteErpComponentErpProductMutationVariables
  >(deleteErpComponentErpProductMutation)

  return {
    deleteErpComponentErpProduct: (id: number, sampleCompanyId: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteErpComponentErpProduct({
          variables: {id, sampleCompanyId},
          refetchQueries: [{query: erpComponentErpProductsQuery, variables: {sampleCompanyId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    isDeleteErpComponentErpProductLoading: loading
  }
}
