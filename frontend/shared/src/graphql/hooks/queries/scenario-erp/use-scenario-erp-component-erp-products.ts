import {useQuery} from "@apollo/client"
import {ScenarioErpComponentErpProduct} from "../../../../models"
import {
  ScenarioErpComponentErpProductsQuery,
  ScenarioErpComponentErpProductsQueryVariables
} from "../../../generated/ScenarioErpComponentErpProductsQuery"
import {scenarioErpComponentErpProductsQuery} from "../../../queries"

export interface UseScenarioErpComponentErpProductsHook {
  readonly scenarioErpComponentErpProducts: ScenarioErpComponentErpProduct[]
  readonly scenarioErpComponentErpProductsLoading: boolean
}

export const useScenarioErpComponentErpProducts = (scenarioId: UUID): UseScenarioErpComponentErpProductsHook => {
  const {data, loading} = useQuery<ScenarioErpComponentErpProductsQuery, ScenarioErpComponentErpProductsQueryVariables>(
    scenarioErpComponentErpProductsQuery,
    {
      variables: {scenarioId}
    }
  )

  return {
    scenarioErpComponentErpProducts: data?.scenarioErpComponentErpProducts ?? [],
    scenarioErpComponentErpProductsLoading: loading
  }
}
