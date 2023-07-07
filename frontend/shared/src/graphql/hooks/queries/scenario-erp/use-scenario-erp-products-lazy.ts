import {useLazyQuery} from "@apollo/client"
import {ScenarioErpProduct} from "../../../../models"
import {ScenarioErpProductsQuery, ScenarioErpProductsQueryVariables} from "../../../generated/ScenarioErpProductsQuery"
import {scenarioErpProductsQuery} from "../../../queries"

export interface UseScenarioErpProductsLazyHook {
  readonly scenarioErpProducts: ScenarioErpProduct[]
  readonly scenarioErpProductsLoading: boolean
  readonly getScenarioErpProducts: (scenarioId: UUID) => void
}

export const useScenarioErpProductsLazy = (): UseScenarioErpProductsLazyHook => {
  const [getScenarioErpProducts, {data, loading}] = useLazyQuery<
    ScenarioErpProductsQuery,
    ScenarioErpProductsQueryVariables
  >(scenarioErpProductsQuery)

  return {
    scenarioErpProducts: data?.scenarioErpProducts ?? [],
    scenarioErpProductsLoading: loading,
    getScenarioErpProducts: (scenarioId: UUID) =>
      getScenarioErpProducts({
        variables: {scenarioId}
      })
  }
}
