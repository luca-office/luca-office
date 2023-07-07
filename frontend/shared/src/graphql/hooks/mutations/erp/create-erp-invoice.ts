import {useMutation} from "@apollo/client"
import {ErpType} from "../../../../enums"
import {ErpInvoice} from "../../../../models"
import {addErpType, Option, removeTypename} from "../../../../utils"
import {CreateErpInvoiceMutation, CreateErpInvoiceMutationVariables} from "../../../generated/CreateErpInvoiceMutation"
import {ErpInvoiceCreation} from "../../../generated/globalTypes"
import {createErpInvoiceMutation} from "../../../mutations"
import {erpInvoicesQuery} from "../../../queries"

export interface CreateErpInvoiceProps {
  readonly createErpInvoice: (creation: ErpInvoiceCreation) => Promise<Option<ErpInvoice>>
  readonly isCreateErpInvoiceLoading: boolean
}

export const useCreateErpInvoice = (): CreateErpInvoiceProps => {
  const [createErpInvoice, {loading}] = useMutation<CreateErpInvoiceMutation, CreateErpInvoiceMutationVariables>(
    createErpInvoiceMutation
  )

  return {
    createErpInvoice: (creation: ErpInvoiceCreation) =>
      new Promise<Option<ErpInvoice>>((resolve, reject) => {
        createErpInvoice({
          variables: {creation},
          refetchQueries: [{query: erpInvoicesQuery, variables: {sampleCompanyId: creation.sampleCompanyId}}]
        })
          .then(result =>
            resolve(
              result.data?.createErpInvoice
                ? Option.of(addErpType(ErpType.Invoice)(removeTypename(result.data.createErpInvoice)))
                : Option.none()
            )
          )
          .catch(reject)
      }),
    isCreateErpInvoiceLoading: loading
  }
}
