import {useMutation} from "@apollo/client"
import {ScenarioErpOrderItem} from "../../../../models"
import {Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {
  DeleteScenarioErpOrderItemMutation,
  DeleteScenarioErpOrderItemMutationVariables
} from "../../../generated/DeleteScenarioErpOrderItemMutation"
import {
  ScenarioErpOrderItemsQuery,
  ScenarioErpOrderItemsQueryVariables
} from "../../../generated/ScenarioErpOrderItemsQuery"
import {deleteScenarioErpOrderItemMutation} from "../../../mutations"
import {scenarioErpOrderItemsQuery} from "../../../queries"

export interface UseDeleteScenarioErpOrderItemHook {
  readonly deleteScenarioErpOrderItem: (orderItemId: number) => Promise<Option<ScenarioErpOrderItem>>
  readonly deleteScenarioErpOrderItemLoading: boolean
}

export const useDeleteScenarioErpOrderItem = (scenarioId: UUID): UseDeleteScenarioErpOrderItemHook => {
  const [deleteScenarioErpOrderItem, {loading}] = useMutation<
    DeleteScenarioErpOrderItemMutation,
    DeleteScenarioErpOrderItemMutationVariables
  >(deleteScenarioErpOrderItemMutation)

  return {
    deleteScenarioErpOrderItem: (orderItemId: number) =>
      new Promise<Option<ScenarioErpOrderItem>>((resolve, reject) => {
        deleteScenarioErpOrderItem({
          variables: {scenarioId, orderItemId},
          update: deleteEntityFromCache<
            ScenarioErpOrderItemsQuery,
            DeleteScenarioErpOrderItemMutation,
            ScenarioErpOrderItemsQueryVariables,
            ScenarioErpOrderItem
          >(scenarioErpOrderItemsQuery, "scenarioErpOrderItems", entity => entity.orderItemId !== orderItemId, {
            scenarioId
          })
        })
          .then(result => resolve(Option.of(result.data?.deleteScenarioErpOrderItem)))
          .catch(reject)
      }),
    deleteScenarioErpOrderItemLoading: loading
  }
}
