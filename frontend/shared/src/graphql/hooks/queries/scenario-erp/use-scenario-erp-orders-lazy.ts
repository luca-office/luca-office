import {useLazyQuery} from "@apollo/client"
import {ScenarioErpOrder} from "../../../../models"
import {ScenarioErpOrdersQuery, ScenarioErpOrdersQueryVariables} from "../../../generated/ScenarioErpOrdersQuery"
import {scenarioErpOrdersQuery} from "../../../queries"

export interface UseScenarioErpOrdersLazyHook {
  readonly scenarioErpOrders: ScenarioErpOrder[]
  readonly scenarioErpOrdersLoading: boolean
  readonly getScenarioErpOrders: (scenarioId: UUID) => void
}

export const useScenarioErpOrdersLazy = (): UseScenarioErpOrdersLazyHook => {
  const [getScenarioErpOrders, {data, loading}] = useLazyQuery<ScenarioErpOrdersQuery, ScenarioErpOrdersQueryVariables>(
    scenarioErpOrdersQuery
  )

  return {
    scenarioErpOrders: data?.scenarioErpOrders ?? [],
    scenarioErpOrdersLoading: loading,
    getScenarioErpOrders: (scenarioId: UUID) =>
      getScenarioErpOrders({
        variables: {scenarioId}
      })
  }
}
