import {useQuery} from "@apollo/client"
import {ScenarioErpComponent} from "../../../../models"
import {
  ScenarioErpComponentsQuery,
  ScenarioErpComponentsQueryVariables
} from "../../../generated/ScenarioErpComponentsQuery"
import {scenarioErpComponentsQuery} from "../../../queries"

export interface UseScenarioErpComponentsHook {
  readonly scenarioErpComponents: ScenarioErpComponent[]
  readonly scenarioErpComponentsLoading: boolean
}

export const useScenarioErpComponents = (scenarioId: UUID): UseScenarioErpComponentsHook => {
  const {data, loading} = useQuery<ScenarioErpComponentsQuery, ScenarioErpComponentsQueryVariables>(
    scenarioErpComponentsQuery,
    {
      variables: {scenarioId}
    }
  )

  return {
    scenarioErpComponents: data?.scenarioErpComponents ?? [],
    scenarioErpComponentsLoading: loading
  }
}
