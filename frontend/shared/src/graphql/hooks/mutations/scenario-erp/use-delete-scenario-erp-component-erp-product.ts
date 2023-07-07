import {useMutation} from "@apollo/client"
import {ScenarioErpComponentErpProduct} from "../../../../models"
import {Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {
  DeleteScenarioErpComponentErpProductMutation,
  DeleteScenarioErpComponentErpProductMutationVariables
} from "../../../generated/DeleteScenarioErpComponentErpProductMutation"
import {
  ScenarioErpComponentErpProductsQuery,
  ScenarioErpComponentErpProductsQueryVariables
} from "../../../generated/ScenarioErpComponentErpProductsQuery"
import {deleteScenarioErpComponentErpProductMutation} from "../../../mutations"
import {scenarioErpComponentErpProductsQuery} from "../../../queries"

export interface UseDeleteScenarioErpComponentErpProductHook {
  readonly deleteScenarioErpComponentErpProduct: (
    componentProductId: number
  ) => Promise<Option<ScenarioErpComponentErpProduct>>
  readonly deleteScenarioErpComponentErpProductLoading: boolean
}

export const useDeleteScenarioErpComponentErpProduct = (
  scenarioId: UUID
): UseDeleteScenarioErpComponentErpProductHook => {
  const [deleteScenarioErpComponentErpProduct, {loading}] = useMutation<
    DeleteScenarioErpComponentErpProductMutation,
    DeleteScenarioErpComponentErpProductMutationVariables
  >(deleteScenarioErpComponentErpProductMutation)

  return {
    deleteScenarioErpComponentErpProduct: (componentProductId: number) =>
      new Promise<Option<ScenarioErpComponentErpProduct>>((resolve, reject) => {
        deleteScenarioErpComponentErpProduct({
          variables: {scenarioId, componentProductId},
          update: deleteEntityFromCache<
            ScenarioErpComponentErpProductsQuery,
            DeleteScenarioErpComponentErpProductMutation,
            ScenarioErpComponentErpProductsQueryVariables,
            ScenarioErpComponentErpProduct
          >(
            scenarioErpComponentErpProductsQuery,
            "scenarioErpComponentErpProducts",
            entity => entity.componentProductId !== componentProductId,
            {
              scenarioId
            }
          )
        })
          .then(result => resolve(Option.of(result.data?.deleteScenarioErpComponentErpProduct)))
          .catch(reject)
      }),
    deleteScenarioErpComponentErpProductLoading: loading
  }
}
