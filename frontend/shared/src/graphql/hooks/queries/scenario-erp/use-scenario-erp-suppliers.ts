import {useQuery} from "@apollo/client"
import {ScenarioErpSupplier} from "../../../../models"
import {
  ScenarioErpSuppliersQuery,
  ScenarioErpSuppliersQueryVariables
} from "../../../generated/ScenarioErpSuppliersQuery"
import {scenarioErpSuppliersQuery} from "../../../queries"

export interface UseScenarioErpSuppliersHook {
  readonly scenarioErpSuppliers: ScenarioErpSupplier[]
  readonly scenarioErpSuppliersLoading: boolean
}

export const useScenarioErpSuppliers = (scenarioId: UUID): UseScenarioErpSuppliersHook => {
  const {data, loading} = useQuery<ScenarioErpSuppliersQuery, ScenarioErpSuppliersQueryVariables>(
    scenarioErpSuppliersQuery,
    {
      variables: {scenarioId}
    }
  )

  return {
    scenarioErpSuppliers: data?.scenarioErpSuppliers ?? [],
    scenarioErpSuppliersLoading: loading
  }
}
