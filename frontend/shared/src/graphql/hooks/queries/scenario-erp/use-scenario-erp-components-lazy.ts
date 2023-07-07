import {useLazyQuery} from "@apollo/client"
import {ScenarioErpComponent} from "../../../../models"
import {
  ScenarioErpComponentsQuery,
  ScenarioErpComponentsQueryVariables
} from "../../../generated/ScenarioErpComponentsQuery"
import {scenarioErpComponentsQuery} from "../../../queries"

export interface UseScenarioErpComponentsLazyHook {
  readonly scenarioErpComponents: ScenarioErpComponent[]
  readonly scenarioErpComponentsLoading: boolean
  readonly getScenarioErpComponents: (scenarioId: UUID) => void
}

export const useScenarioErpComponentsLazy = (): UseScenarioErpComponentsLazyHook => {
  const [getScenarioErpComponents, {data, loading}] = useLazyQuery<
    ScenarioErpComponentsQuery,
    ScenarioErpComponentsQueryVariables
  >(scenarioErpComponentsQuery)

  return {
    scenarioErpComponents: data?.scenarioErpComponents ?? [],
    scenarioErpComponentsLoading: loading,
    getScenarioErpComponents: (scenarioId: UUID) =>
      getScenarioErpComponents({
        variables: {scenarioId}
      })
  }
}
