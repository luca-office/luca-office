import {useMutation} from "@apollo/client"
import {DeleteErpInvoiceMutation, DeleteErpInvoiceMutationVariables} from "../../../generated/DeleteErpInvoiceMutation"
import {deleteErpInvoiceMutation} from "../../../mutations"
import {erpInvoicesQuery} from "../../../queries"

export interface DeleteErpInvoiceProps {
  readonly deleteErpInvoice: (id: number, sampleCompanyId: UUID) => Promise<void>
  readonly isDeleteErpInvoiceLoading: boolean
}

export const useDeleteErpInvoice = (): DeleteErpInvoiceProps => {
  const [deleteErpInvoice, {loading}] = useMutation<DeleteErpInvoiceMutation, DeleteErpInvoiceMutationVariables>(
    deleteErpInvoiceMutation
  )

  return {
    deleteErpInvoice: (id: number, sampleCompanyId: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteErpInvoice({
          variables: {id, sampleCompanyId},
          refetchQueries: [{query: erpInvoicesQuery, variables: {sampleCompanyId}}]
        })
          .then(() => resolve())
          .catch(reject)
      }),
    isDeleteErpInvoiceLoading: loading
  }
}
