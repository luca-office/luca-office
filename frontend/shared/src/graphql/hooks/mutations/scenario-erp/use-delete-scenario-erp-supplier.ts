import {useMutation} from "@apollo/client"
import {ScenarioErpSupplier} from "../../../../models"
import {Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {
  DeleteScenarioErpSupplierMutation,
  DeleteScenarioErpSupplierMutationVariables
} from "../../../generated/DeleteScenarioErpSupplierMutation"
import {
  ScenarioErpSuppliersQuery,
  ScenarioErpSuppliersQueryVariables
} from "../../../generated/ScenarioErpSuppliersQuery"
import {deleteScenarioErpSupplierMutation} from "../../../mutations"
import {scenarioErpSuppliersQuery} from "../../../queries"

export interface UseDeleteScenarioErpSupplierHook {
  readonly deleteScenarioErpSupplier: (supplierId: number) => Promise<Option<ScenarioErpSupplier>>
  readonly deleteScenarioErpSupplierLoading: boolean
}

export const useDeleteScenarioErpSupplier = (scenarioId: UUID): UseDeleteScenarioErpSupplierHook => {
  const [deleteScenarioErpSupplier, {loading}] = useMutation<
    DeleteScenarioErpSupplierMutation,
    DeleteScenarioErpSupplierMutationVariables
  >(deleteScenarioErpSupplierMutation)

  return {
    deleteScenarioErpSupplier: (supplierId: number) =>
      new Promise<Option<ScenarioErpSupplier>>((resolve, reject) => {
        deleteScenarioErpSupplier({
          variables: {scenarioId, supplierId},
          update: deleteEntityFromCache<
            ScenarioErpSuppliersQuery,
            DeleteScenarioErpSupplierMutation,
            ScenarioErpSuppliersQueryVariables,
            ScenarioErpSupplier
          >(scenarioErpSuppliersQuery, "scenarioErpSuppliers", entity => entity.supplierId !== supplierId, {
            scenarioId
          })
        })
          .then(result => resolve(Option.of(result.data?.deleteScenarioErpSupplier)))
          .catch(reject)
      }),
    deleteScenarioErpSupplierLoading: loading
  }
}
