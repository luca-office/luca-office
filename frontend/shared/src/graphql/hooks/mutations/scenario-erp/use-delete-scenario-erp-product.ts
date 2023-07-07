import {useMutation} from "@apollo/client"
import {ScenarioErpProduct} from "../../../../models"
import {Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {
  DeleteScenarioErpProductMutation,
  DeleteScenarioErpProductMutationVariables
} from "../../../generated/DeleteScenarioErpProductMutation"
import {ScenarioErpProductsQuery, ScenarioErpProductsQueryVariables} from "../../../generated/ScenarioErpProductsQuery"
import {deleteScenarioErpProductMutation} from "../../../mutations"
import {scenarioErpProductsQuery} from "../../../queries"

export interface UseDeleteScenarioErpProductHook {
  readonly deleteScenarioErpProduct: (productId: number) => Promise<Option<ScenarioErpProduct>>
  readonly deleteScenarioErpProductLoading: boolean
}

export const useDeleteScenarioErpProduct = (scenarioId: UUID): UseDeleteScenarioErpProductHook => {
  const [deleteScenarioErpProduct, {loading}] = useMutation<
    DeleteScenarioErpProductMutation,
    DeleteScenarioErpProductMutationVariables
  >(deleteScenarioErpProductMutation)

  return {
    deleteScenarioErpProduct: (productId: number) =>
      new Promise<Option<ScenarioErpProduct>>((resolve, reject) => {
        deleteScenarioErpProduct({
          variables: {scenarioId, productId},
          update: deleteEntityFromCache<
            ScenarioErpProductsQuery,
            DeleteScenarioErpProductMutation,
            ScenarioErpProductsQueryVariables,
            ScenarioErpProduct
          >(scenarioErpProductsQuery, "scenarioErpProducts", entity => entity.productId !== productId, {
            scenarioId
          })
        })
          .then(result => resolve(Option.of(result.data?.deleteScenarioErpProduct)))
          .catch(reject)
      }),
    deleteScenarioErpProductLoading: loading
  }
}
