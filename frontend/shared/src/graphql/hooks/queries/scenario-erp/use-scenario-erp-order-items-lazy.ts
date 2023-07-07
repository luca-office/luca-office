import {useLazyQuery} from "@apollo/client"
import {ScenarioErpOrderItem} from "../../../../models"
import {
  ScenarioErpOrderItemsQuery,
  ScenarioErpOrderItemsQueryVariables
} from "../../../generated/ScenarioErpOrderItemsQuery"
import {scenarioErpOrderItemsQuery} from "../../../queries"

export interface UseScenarioErpOrderItemsLazyHook {
  readonly scenarioErpOrderItems: ScenarioErpOrderItem[]
  readonly scenarioErpOrderItemsLoading: boolean
  readonly getScenarioErpOrderItems: (scenarioId: UUID) => void
}

export const useScenarioErpOrderItemsLazy = (): UseScenarioErpOrderItemsLazyHook => {
  const [getScenarioErpOrderItems, {data, loading}] = useLazyQuery<
    ScenarioErpOrderItemsQuery,
    ScenarioErpOrderItemsQueryVariables
  >(scenarioErpOrderItemsQuery)

  return {
    scenarioErpOrderItems: data?.scenarioErpOrderItems ?? [],
    scenarioErpOrderItemsLoading: loading,
    getScenarioErpOrderItems: (scenarioId: UUID) =>
      getScenarioErpOrderItems({
        variables: {scenarioId}
      })
  }
}
