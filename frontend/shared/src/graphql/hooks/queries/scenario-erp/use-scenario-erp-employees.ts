import {useQuery} from "@apollo/client"
import {ScenarioErpEmployee} from "../../../../models"
import {
  ScenarioErpEmployeesQuery,
  ScenarioErpEmployeesQueryVariables
} from "../../../generated/ScenarioErpEmployeesQuery"
import {scenarioErpEmployeesQuery} from "../../../queries"

export interface UseScenarioErpEmployeesHook {
  readonly scenarioErpEmployees: ScenarioErpEmployee[]
  readonly scenarioErpEmployeesLoading: boolean
}

export const useScenarioErpEmployees = (scenarioId: UUID): UseScenarioErpEmployeesHook => {
  const {data, loading} = useQuery<ScenarioErpEmployeesQuery, ScenarioErpEmployeesQueryVariables>(
    scenarioErpEmployeesQuery,
    {
      variables: {scenarioId}
    }
  )

  return {
    scenarioErpEmployees: data?.scenarioErpEmployees ?? [],
    scenarioErpEmployeesLoading: loading
  }
}
