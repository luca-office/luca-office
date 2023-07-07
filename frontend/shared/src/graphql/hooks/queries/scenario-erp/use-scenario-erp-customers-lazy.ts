import {useLazyQuery} from "@apollo/client"
import {ScenarioErpCustomer} from "../../../../models"
import {
  ScenarioErpCustomersQuery,
  ScenarioErpCustomersQueryVariables
} from "../../../generated/ScenarioErpCustomersQuery"
import {scenarioErpCustomersQuery} from "../../../queries"

export interface UseScenarioErpCustomersLazyHook {
  readonly scenarioErpCustomers: ScenarioErpCustomer[]
  readonly scenarioErpCustomersLoading: boolean
  readonly getScenarioErpCustomers: (scenarioId: UUID) => void
}

export const useScenarioErpCustomersLazy = (): UseScenarioErpCustomersLazyHook => {
  const [getScenarioErpCustomers, {data, loading}] = useLazyQuery<
    ScenarioErpCustomersQuery,
    ScenarioErpCustomersQueryVariables
  >(scenarioErpCustomersQuery)

  return {
    scenarioErpCustomers: data?.scenarioErpCustomers ?? [],
    scenarioErpCustomersLoading: loading,
    getScenarioErpCustomers: (scenarioId: UUID) =>
      getScenarioErpCustomers({
        variables: {scenarioId}
      })
  }
}
