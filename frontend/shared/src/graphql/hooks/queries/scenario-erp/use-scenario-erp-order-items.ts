import {useQuery} from "@apollo/client"
import {ScenarioErpOrderItem} from "../../../../models"
import {
  ScenarioErpOrderItemsQuery,
  ScenarioErpOrderItemsQueryVariables
} from "../../../generated/ScenarioErpOrderItemsQuery"
import {scenarioErpOrderItemsQuery} from "../../../queries"

export interface UseScenarioErpOrderItemsHook {
  readonly scenarioErpOrderItems: ScenarioErpOrderItem[]
  readonly scenarioErpOrderItemsLoading: boolean
}

export const useScenarioErpOrderItems = (scenarioId: UUID): UseScenarioErpOrderItemsHook => {
  const {data, loading} = useQuery<ScenarioErpOrderItemsQuery, ScenarioErpOrderItemsQueryVariables>(
    scenarioErpOrderItemsQuery,
    {
      variables: {scenarioId}
    }
  )

  return {
    scenarioErpOrderItems: data?.scenarioErpOrderItems ?? [],
    scenarioErpOrderItemsLoading: loading
  }
}
