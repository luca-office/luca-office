import {useLazyQuery} from "@apollo/client"
import {ScenarioErpEmployee} from "../../../../models"
import {
  ScenarioErpEmployeesQuery,
  ScenarioErpEmployeesQueryVariables
} from "../../../generated/ScenarioErpEmployeesQuery"
import {scenarioErpEmployeesQuery} from "../../../queries"

export interface UseScenarioErpEmployeesLazyHook {
  readonly scenarioErpEmployees: ScenarioErpEmployee[]
  readonly scenarioErpEmployeesLoading: boolean
  readonly getScenarioErpEmployees: (scenarioId: UUID) => void
}

export const useScenarioErpEmployeesLazy = (): UseScenarioErpEmployeesLazyHook => {
  const [getScenarioErpEmployees, {data, loading}] = useLazyQuery<
    ScenarioErpEmployeesQuery,
    ScenarioErpEmployeesQueryVariables
  >(scenarioErpEmployeesQuery)

  return {
    scenarioErpEmployees: data?.scenarioErpEmployees ?? [],
    scenarioErpEmployeesLoading: loading,
    getScenarioErpEmployees: (scenarioId: UUID) =>
      getScenarioErpEmployees({
        variables: {scenarioId}
      })
  }
}
