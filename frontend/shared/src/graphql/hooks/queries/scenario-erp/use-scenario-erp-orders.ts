import {useQuery} from "@apollo/client"
import {ScenarioErpOrder} from "../../../../models"
import {ScenarioErpOrdersQuery, ScenarioErpOrdersQueryVariables} from "../../../generated/ScenarioErpOrdersQuery"
import {scenarioErpOrdersQuery} from "../../../queries"

export interface UseScenarioErpOrdersHook {
  readonly scenarioErpOrders: ScenarioErpOrder[]
  readonly scenarioErpOrdersLoading: boolean
}

export const useScenarioErpOrders = (scenarioId: UUID): UseScenarioErpOrdersHook => {
  const {data, loading} = useQuery<ScenarioErpOrdersQuery, ScenarioErpOrdersQueryVariables>(scenarioErpOrdersQuery, {
    variables: {scenarioId}
  })

  return {
    scenarioErpOrders: data?.scenarioErpOrders ?? [],
    scenarioErpOrdersLoading: loading
  }
}
