import {useLazyQuery} from "@apollo/client"
import {ScenarioErpComponentErpProduct} from "../../../../models"
import {
  ScenarioErpComponentErpProductsQuery,
  ScenarioErpComponentErpProductsQueryVariables
} from "../../../generated/ScenarioErpComponentErpProductsQuery"
import {scenarioErpComponentErpProductsQuery} from "../../../queries"

export interface UseScenarioErpComponentErpProductsLazyHook {
  readonly scenarioErpComponentErpProducts: ScenarioErpComponentErpProduct[]
  readonly scenarioErpComponentErpProductsLoading: boolean
  readonly getScenarioErpComponentErpProducts: (scenarioId: UUID) => void
}

export const useScenarioErpComponentErpProductsLazy = (): UseScenarioErpComponentErpProductsLazyHook => {
  const [getScenarioErpComponentErpProducts, {data, loading}] = useLazyQuery<
    ScenarioErpComponentErpProductsQuery,
    ScenarioErpComponentErpProductsQueryVariables
  >(scenarioErpComponentErpProductsQuery)

  return {
    scenarioErpComponentErpProducts: data?.scenarioErpComponentErpProducts ?? [],
    scenarioErpComponentErpProductsLoading: loading,
    getScenarioErpComponentErpProducts: (scenarioId: UUID) =>
      getScenarioErpComponentErpProducts({
        variables: {scenarioId}
      })
  }
}
