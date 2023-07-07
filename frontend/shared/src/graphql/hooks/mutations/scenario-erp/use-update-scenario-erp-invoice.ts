import {useMutation} from "@apollo/client"
import {ScenarioErpInvoice} from "../../../../models"
import {Option} from "../../../../utils"
import {updateEntityInCache} from "../../../cache"
import {ScenarioErpInvoiceUpdate} from "../../../generated/globalTypes"
import {ScenarioErpInvoicesQuery, ScenarioErpInvoicesQueryVariables} from "../../../generated/ScenarioErpInvoicesQuery"
import {
  UpdateScenarioErpInvoiceMutation,
  UpdateScenarioErpInvoiceMutationVariables
} from "../../../generated/UpdateScenarioErpInvoiceMutation"
import {updateScenarioErpInvoiceMutation} from "../../../mutations"
import {scenarioErpInvoicesQuery} from "../../../queries"

export interface UseUpdateScenarioErpInvoiceHook {
  readonly updateScenarioErpInvoice: (
    invoiceId: number,
    update: ScenarioErpInvoiceUpdate
  ) => Promise<Option<ScenarioErpInvoice>>
  readonly updateScenarioErpInvoiceLoading: boolean
}

export const useUpdateScenarioErpInvoice = (scenarioId: UUID): UseUpdateScenarioErpInvoiceHook => {
  const [updateScenarioErpInvoice, {loading}] = useMutation<
    UpdateScenarioErpInvoiceMutation,
    UpdateScenarioErpInvoiceMutationVariables
  >(updateScenarioErpInvoiceMutation)

  return {
    updateScenarioErpInvoice: (invoiceId: number, update: ScenarioErpInvoiceUpdate) =>
      new Promise<Option<ScenarioErpInvoice>>((resolve, reject) => {
        updateScenarioErpInvoice({
          variables: {scenarioId, invoiceId, update},
          update: updateEntityInCache<
            ScenarioErpInvoicesQuery,
            UpdateScenarioErpInvoiceMutation,
            ScenarioErpInvoice,
            ScenarioErpInvoicesQueryVariables
          >(
            scenarioErpInvoicesQuery,
            "scenarioErpInvoices",
            entity => entity.invoiceId === invoiceId,
            "updateScenarioErpInvoice",
            {
              scenarioId
            }
          )
        })
          .then(result => resolve(Option.of(result.data?.updateScenarioErpInvoice)))
          .catch(reject)
      }),
    updateScenarioErpInvoiceLoading: loading
  }
}
