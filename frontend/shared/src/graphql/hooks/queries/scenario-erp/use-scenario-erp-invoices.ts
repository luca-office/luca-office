import {useQuery} from "@apollo/client"
import {ScenarioErpInvoice} from "../../../../models"
import {ScenarioErpInvoicesQuery, ScenarioErpInvoicesQueryVariables} from "../../../generated/ScenarioErpInvoicesQuery"
import {scenarioErpInvoicesQuery} from "../../../queries"

export interface UseScenarioErpInvoicesHook {
  readonly scenarioErpInvoices: ScenarioErpInvoice[]
  readonly scenarioErpInvoicesLoading: boolean
}

export const useScenarioErpInvoices = (scenarioId: UUID): UseScenarioErpInvoicesHook => {
  const {data, loading} = useQuery<ScenarioErpInvoicesQuery, ScenarioErpInvoicesQueryVariables>(
    scenarioErpInvoicesQuery,
    {
      variables: {scenarioId}
    }
  )

  return {
    scenarioErpInvoices: data?.scenarioErpInvoices ?? [],
    scenarioErpInvoicesLoading: loading
  }
}
