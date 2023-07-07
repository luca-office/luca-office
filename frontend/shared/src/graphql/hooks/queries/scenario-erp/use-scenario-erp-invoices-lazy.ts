import {useLazyQuery} from "@apollo/client"
import {ScenarioErpInvoice} from "../../../../models"
import {ScenarioErpInvoicesQuery, ScenarioErpInvoicesQueryVariables} from "../../../generated/ScenarioErpInvoicesQuery"
import {scenarioErpInvoicesQuery} from "../../../queries"

export interface UseScenarioErpInvoicesLazyHook {
  readonly scenarioErpInvoices: ScenarioErpInvoice[]
  readonly scenarioErpInvoicesLoading: boolean
  readonly getScenarioErpInvoices: (scenarioId: UUID) => void
}

export const useScenarioErpInvoicesLazy = (): UseScenarioErpInvoicesLazyHook => {
  const [getScenarioErpInvoices, {data, loading}] = useLazyQuery<
    ScenarioErpInvoicesQuery,
    ScenarioErpInvoicesQueryVariables
  >(scenarioErpInvoicesQuery)

  return {
    scenarioErpInvoices: data?.scenarioErpInvoices ?? [],
    scenarioErpInvoicesLoading: loading,
    getScenarioErpInvoices: (scenarioId: UUID) =>
      getScenarioErpInvoices({
        variables: {scenarioId}
      })
  }
}
