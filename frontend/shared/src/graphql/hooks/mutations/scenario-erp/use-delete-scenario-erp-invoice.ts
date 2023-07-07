import {useMutation} from "@apollo/client"
import {ScenarioErpInvoice} from "../../../../models"
import {Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {
  DeleteScenarioErpInvoiceMutation,
  DeleteScenarioErpInvoiceMutationVariables
} from "../../../generated/DeleteScenarioErpInvoiceMutation"
import {ScenarioErpInvoicesQuery, ScenarioErpInvoicesQueryVariables} from "../../../generated/ScenarioErpInvoicesQuery"
import {deleteScenarioErpInvoiceMutation} from "../../../mutations"
import {scenarioErpInvoicesQuery} from "../../../queries"

export interface UseDeleteScenarioErpInvoiceHook {
  readonly deleteScenarioErpInvoice: (invoiceId: number) => Promise<Option<ScenarioErpInvoice>>
  readonly deleteScenarioErpInvoiceLoading: boolean
}

export const useDeleteScenarioErpInvoice = (scenarioId: UUID): UseDeleteScenarioErpInvoiceHook => {
  const [deleteScenarioErpInvoice, {loading}] = useMutation<
    DeleteScenarioErpInvoiceMutation,
    DeleteScenarioErpInvoiceMutationVariables
  >(deleteScenarioErpInvoiceMutation)

  return {
    deleteScenarioErpInvoice: (invoiceId: number) =>
      new Promise<Option<ScenarioErpInvoice>>((resolve, reject) => {
        deleteScenarioErpInvoice({
          variables: {scenarioId, invoiceId},
          update: deleteEntityFromCache<
            ScenarioErpInvoicesQuery,
            DeleteScenarioErpInvoiceMutation,
            ScenarioErpInvoicesQueryVariables,
            ScenarioErpInvoice
          >(scenarioErpInvoicesQuery, "scenarioErpInvoices", entity => entity.invoiceId !== invoiceId, {
            scenarioId
          })
        })
          .then(result => resolve(Option.of(result.data?.deleteScenarioErpInvoice)))
          .catch(reject)
      }),
    deleteScenarioErpInvoiceLoading: loading
  }
}
