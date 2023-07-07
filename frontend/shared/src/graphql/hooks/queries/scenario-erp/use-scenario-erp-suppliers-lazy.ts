import {useLazyQuery} from "@apollo/client"
import {ScenarioErpSupplier} from "../../../../models"
import {
  ScenarioErpSuppliersQuery,
  ScenarioErpSuppliersQueryVariables
} from "../../../generated/ScenarioErpSuppliersQuery"
import {scenarioErpSuppliersQuery} from "../../../queries"

export interface UseScenarioErpSuppliersLazyHook {
  readonly scenarioErpSuppliers: ScenarioErpSupplier[]
  readonly scenarioErpSuppliersLoading: boolean
  readonly getScenarioErpSuppliers: (scenarioId: UUID) => void
}

export const useScenarioErpSuppliersLazy = (): UseScenarioErpSuppliersLazyHook => {
  const [getScenarioErpSuppliers, {data, loading}] = useLazyQuery<
    ScenarioErpSuppliersQuery,
    ScenarioErpSuppliersQueryVariables
  >(scenarioErpSuppliersQuery)

  return {
    scenarioErpSuppliers: data?.scenarioErpSuppliers ?? [],
    scenarioErpSuppliersLoading: loading,
    getScenarioErpSuppliers: (scenarioId: UUID) =>
      getScenarioErpSuppliers({
        variables: {scenarioId}
      })
  }
}
