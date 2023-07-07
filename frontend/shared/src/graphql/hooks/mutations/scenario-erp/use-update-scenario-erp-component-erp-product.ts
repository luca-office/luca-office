import {useMutation} from "@apollo/client"
import {ScenarioErpComponentErpProduct} from "../../../../models"
import {Option} from "../../../../utils"
import {updateEntityInCache} from "../../../cache"
import {ScenarioErpComponentErpProductUpdate} from "../../../generated/globalTypes"
import {
  ScenarioErpComponentErpProductsQuery,
  ScenarioErpComponentErpProductsQueryVariables
} from "../../../generated/ScenarioErpComponentErpProductsQuery"
import {
  UpdateScenarioErpComponentErpProductMutation,
  UpdateScenarioErpComponentErpProductMutationVariables
} from "../../../generated/UpdateScenarioErpComponentErpProductMutation"
import {updateScenarioErpComponentErpProductMutation} from "../../../mutations"
import {scenarioErpComponentErpProductsQuery} from "../../../queries"

export interface UseUpdateScenarioErpComponentErpProductHook {
  readonly updateScenarioErpComponentErpProduct: (
    componentProductId: number,
    update: ScenarioErpComponentErpProductUpdate
  ) => Promise<Option<ScenarioErpComponentErpProduct>>
  readonly updateScenarioErpComponentErpProductLoading: boolean
}

export const useUpdateScenarioErpComponentErpProduct = (
  scenarioId: UUID
): UseUpdateScenarioErpComponentErpProductHook => {
  const [updateScenarioErpComponentErpProduct, {loading}] = useMutation<
    UpdateScenarioErpComponentErpProductMutation,
    UpdateScenarioErpComponentErpProductMutationVariables
  >(updateScenarioErpComponentErpProductMutation)

  return {
    updateScenarioErpComponentErpProduct: (componentProductId: number, update: ScenarioErpComponentErpProductUpdate) =>
      new Promise<Option<ScenarioErpComponentErpProduct>>((resolve, reject) => {
        updateScenarioErpComponentErpProduct({
          variables: {scenarioId, componentProductId, update},
          update: updateEntityInCache<
            ScenarioErpComponentErpProductsQuery,
            UpdateScenarioErpComponentErpProductMutation,
            ScenarioErpComponentErpProduct,
            ScenarioErpComponentErpProductsQueryVariables
          >(
            scenarioErpComponentErpProductsQuery,
            "scenarioErpComponentErpProducts",
            entity => entity.componentProductId === componentProductId,
            "updateScenarioErpComponentErpProduct",
            {
              scenarioId
            }
          )
        })
          .then(result => resolve(Option.of(result.data?.updateScenarioErpComponentErpProduct)))
          .catch(reject)
      }),
    updateScenarioErpComponentErpProductLoading: loading
  }
}
