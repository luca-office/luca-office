import {useMutation} from "@apollo/client"
import {ScenarioErpInvoice} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  CreateScenarioErpInvoiceMutation,
  CreateScenarioErpInvoiceMutationVariables
} from "../../../generated/CreateScenarioErpInvoiceMutation"
import {ScenarioErpInvoiceCreation} from "../../../generated/globalTypes"
import {ScenarioErpInvoicesQuery, ScenarioErpInvoicesQueryVariables} from "../../../generated/ScenarioErpInvoicesQuery"
import {createScenarioErpInvoiceMutation} from "../../../mutations"
import {scenarioErpInvoicesQuery} from "../../../queries"

export interface UseCreateScenarioErpInvoiceHook {
  readonly createScenarioErpInvoice: (creation: ScenarioErpInvoiceCreation) => Promise<Option<ScenarioErpInvoice>>
  readonly createScenarioErpInvoiceLoading: boolean
}

export const useCreateScenarioErpInvoice = (): UseCreateScenarioErpInvoiceHook => {
  const [createScenarioErpInvoice, {loading}] = useMutation<
    CreateScenarioErpInvoiceMutation,
    CreateScenarioErpInvoiceMutationVariables
  >(createScenarioErpInvoiceMutation)

  return {
    createScenarioErpInvoice: (creation: ScenarioErpInvoiceCreation) =>
      new Promise<Option<ScenarioErpInvoice>>((resolve, reject) => {
        createScenarioErpInvoice({
          variables: {creation},
          update: createEntityInCache<
            ScenarioErpInvoicesQuery,
            CreateScenarioErpInvoiceMutation,
            ScenarioErpInvoicesQueryVariables
          >(
            scenarioErpInvoicesQuery,
            "scenarioErpInvoices",
            query => query.scenarioErpInvoices,
            "createScenarioErpInvoice"
          )
        })
          .then(result => resolve(Option.of(result.data?.createScenarioErpInvoice)))
          .catch(reject)
      }),
    createScenarioErpInvoiceLoading: loading
  }
}
