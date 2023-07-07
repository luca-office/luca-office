import {useQuery} from "@apollo/client"
import {ScenarioErpCustomer} from "../../../../models"
import {
  ScenarioErpCustomersQuery,
  ScenarioErpCustomersQueryVariables
} from "../../../generated/ScenarioErpCustomersQuery"
import {scenarioErpCustomersQuery} from "../../../queries"

export interface UseScenarioErpCustomersHook {
  readonly scenarioErpCustomers: ScenarioErpCustomer[]
  readonly scenarioErpCustomersLoading: boolean
}

export const useScenarioErpCustomers = (scenarioId: UUID): UseScenarioErpCustomersHook => {
  const {data, loading} = useQuery<ScenarioErpCustomersQuery, ScenarioErpCustomersQueryVariables>(
    scenarioErpCustomersQuery,
    {
      variables: {scenarioId}
    }
  )

  return {
    scenarioErpCustomers: data?.scenarioErpCustomers ?? [],
    scenarioErpCustomersLoading: loading
  }
}
