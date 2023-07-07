import {useMutation} from "@apollo/client"
import {ScenarioErpProduct} from "../../../../models"
import {Option} from "../../../../utils"
import {updateEntityInCache} from "../../../cache"
import {ScenarioErpProductUpdate} from "../../../generated/globalTypes"
import {ScenarioErpProductsQuery, ScenarioErpProductsQueryVariables} from "../../../generated/ScenarioErpProductsQuery"
import {
  UpdateScenarioErpProductMutation,
  UpdateScenarioErpProductMutationVariables
} from "../../../generated/UpdateScenarioErpProductMutation"
import {updateScenarioErpProductMutation} from "../../../mutations"
import {scenarioErpProductsQuery} from "../../../queries"

export interface UseUpdateScenarioErpProductHook {
  readonly updateScenarioErpProduct: (
    productId: number,
    update: ScenarioErpProductUpdate
  ) => Promise<Option<ScenarioErpProduct>>
  readonly updateScenarioErpProductLoading: boolean
}

export const useUpdateScenarioErpProduct = (scenarioId: UUID): UseUpdateScenarioErpProductHook => {
  const [updateScenarioErpProduct, {loading}] = useMutation<
    UpdateScenarioErpProductMutation,
    UpdateScenarioErpProductMutationVariables
  >(updateScenarioErpProductMutation)

  return {
    updateScenarioErpProduct: (productId: number, update: ScenarioErpProductUpdate) =>
      new Promise<Option<ScenarioErpProduct>>((resolve, reject) => {
        updateScenarioErpProduct({
          variables: {scenarioId, productId, update},
          update: updateEntityInCache<
            ScenarioErpProductsQuery,
            UpdateScenarioErpProductMutation,
            ScenarioErpProduct,
            ScenarioErpProductsQueryVariables
          >(
            scenarioErpProductsQuery,
            "scenarioErpProducts",
            entity => entity.productId === productId,
            "updateScenarioErpProduct",
            {
              scenarioId
            }
          )
        })
          .then(result => resolve(Option.of(result.data?.updateScenarioErpProduct)))
          .catch(reject)
      }),
    updateScenarioErpProductLoading: loading
  }
}
