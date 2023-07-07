import {useMutation} from "@apollo/client"
import {ScenarioErpSupplier} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  CreateScenarioErpSupplierMutation,
  CreateScenarioErpSupplierMutationVariables
} from "../../../generated/CreateScenarioErpSupplierMutation"
import {ScenarioErpSupplierCreation} from "../../../generated/globalTypes"
import {
  ScenarioErpSuppliersQuery,
  ScenarioErpSuppliersQueryVariables
} from "../../../generated/ScenarioErpSuppliersQuery"
import {createScenarioErpSupplierMutation} from "../../../mutations"
import {scenarioErpSuppliersQuery} from "../../../queries"

export interface UseCreateScenarioErpSupplierHook {
  readonly createScenarioErpSupplier: (creation: ScenarioErpSupplierCreation) => Promise<Option<ScenarioErpSupplier>>
  readonly createScenarioErpSupplierLoading: boolean
}

export const useCreateScenarioErpSupplier = (): UseCreateScenarioErpSupplierHook => {
  const [createScenarioErpSupplier, {loading}] = useMutation<
    CreateScenarioErpSupplierMutation,
    CreateScenarioErpSupplierMutationVariables
  >(createScenarioErpSupplierMutation)

  return {
    createScenarioErpSupplier: (creation: ScenarioErpSupplierCreation) =>
      new Promise<Option<ScenarioErpSupplier>>((resolve, reject) => {
        createScenarioErpSupplier({
          variables: {creation},
          update: createEntityInCache<
            ScenarioErpSuppliersQuery,
            CreateScenarioErpSupplierMutation,
            ScenarioErpSuppliersQueryVariables
          >(
            scenarioErpSuppliersQuery,
            "scenarioErpSuppliers",
            query => query.scenarioErpSuppliers,
            "createScenarioErpSupplier"
          )
        })
          .then(result => resolve(Option.of(result.data?.createScenarioErpSupplier)))
          .catch(reject)
      }),
    createScenarioErpSupplierLoading: loading
  }
}
