import {useQuery} from "@apollo/client"
import {ScenarioErpProduct} from "../../../../models"
import {ScenarioErpProductsQuery, ScenarioErpProductsQueryVariables} from "../../../generated/ScenarioErpProductsQuery"
import {scenarioErpProductsQuery} from "../../../queries"

export interface UseScenarioErpProductsHook {
  readonly scenarioErpProducts: ScenarioErpProduct[]
  readonly scenarioErpProductsLoading: boolean
}

export const useScenarioErpProducts = (scenarioId: UUID): UseScenarioErpProductsHook => {
  const {data, loading} = useQuery<ScenarioErpProductsQuery, ScenarioErpProductsQueryVariables>(
    scenarioErpProductsQuery,
    {
      variables: {scenarioId}
    }
  )

  return {
    scenarioErpProducts: data?.scenarioErpProducts ?? [],
    scenarioErpProductsLoading: loading
  }
}
