import {useMutation} from "@apollo/client"
import {ScenarioErpSupplier} from "../../../../models"
import {Option} from "../../../../utils"
import {updateEntityInCache} from "../../../cache"
import {ScenarioErpSupplierUpdate} from "../../../generated/globalTypes"
import {
  ScenarioErpSuppliersQuery,
  ScenarioErpSuppliersQueryVariables
} from "../../../generated/ScenarioErpSuppliersQuery"
import {
  UpdateScenarioErpSupplierMutation,
  UpdateScenarioErpSupplierMutationVariables
} from "../../../generated/UpdateScenarioErpSupplierMutation"
import {updateScenarioErpSupplierMutation} from "../../../mutations"
import {scenarioErpSuppliersQuery} from "../../../queries"

export interface UseUpdateScenarioErpSupplierHook {
  readonly updateScenarioErpSupplier: (
    supplierId: number,
    update: ScenarioErpSupplierUpdate
  ) => Promise<Option<ScenarioErpSupplier>>
  readonly updateScenarioErpSupplierLoading: boolean
}

export const useUpdateScenarioErpSupplier = (scenarioId: UUID): UseUpdateScenarioErpSupplierHook => {
  const [updateScenarioErpSupplier, {loading}] = useMutation<
    UpdateScenarioErpSupplierMutation,
    UpdateScenarioErpSupplierMutationVariables
  >(updateScenarioErpSupplierMutation)

  return {
    updateScenarioErpSupplier: (supplierId: number, update: ScenarioErpSupplierUpdate) =>
      new Promise<Option<ScenarioErpSupplier>>((resolve, reject) => {
        updateScenarioErpSupplier({
          variables: {scenarioId, supplierId, update},
          update: updateEntityInCache<
            ScenarioErpSuppliersQuery,
            UpdateScenarioErpSupplierMutation,
            ScenarioErpSupplier,
            ScenarioErpSuppliersQueryVariables
          >(
            scenarioErpSuppliersQuery,
            "scenarioErpSuppliers",
            entity => entity.supplierId === supplierId,
            "updateScenarioErpSupplier",
            {
              scenarioId
            }
          )
        })
          .then(result => resolve(Option.of(result.data?.updateScenarioErpSupplier)))
          .catch(reject)
      }),
    updateScenarioErpSupplierLoading: loading
  }
}
