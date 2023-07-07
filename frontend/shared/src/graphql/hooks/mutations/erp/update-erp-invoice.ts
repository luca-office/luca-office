import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpInvoice} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {ErpInvoiceUpdate} from "../../../generated/globalTypes"
import {UpdateErpInvoiceMutation, UpdateErpInvoiceMutationVariables} from "../../../generated/UpdateErpInvoiceMutation"
import {updateErpInvoiceMutation} from "../../../mutations"

export interface UpdateErpInvoiceProps {
  readonly updateErpInvoice: (
    id: number,
    sampleCompanyId: UUID,
    update: ErpInvoiceUpdate
  ) => Promise<Option<ErpInvoice>>
  readonly isUpdateErpInvoiceLoading: boolean
}

export const useUpdateErpInvoice = (): UpdateErpInvoiceProps => {
  const [updateErpInvoice, {loading}] = useMutation<UpdateErpInvoiceMutation, UpdateErpInvoiceMutationVariables>(
    updateErpInvoiceMutation
  )

  return {
    updateErpInvoice: (id: number, sampleCompanyId: UUID, update: ErpInvoiceUpdate) =>
      new Promise<Option<ErpInvoice>>((resolve, reject) => {
        updateErpInvoice({variables: {id, sampleCompanyId, update}})
          .then(result =>
            resolve(
              result.data?.updateErpInvoice
                ? Option.of(addErpType(ErpType.Invoice)(removeTypename(result.data.updateErpInvoice)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isUpdateErpInvoiceLoading: loading
  }
}
