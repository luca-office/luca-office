import {useMutation} from "@apollo/client"
import {ScenarioErpOrderItem} from "../../../../models"
import {Option} from "../../../../utils"
import {updateEntityInCache} from "../../../cache"
import {ScenarioErpOrderItemUpdate} from "../../../generated/globalTypes"
import {
  ScenarioErpOrderItemsQuery,
  ScenarioErpOrderItemsQueryVariables
} from "../../../generated/ScenarioErpOrderItemsQuery"
import {
  UpdateScenarioErpOrderItemMutation,
  UpdateScenarioErpOrderItemMutationVariables
} from "../../../generated/UpdateScenarioErpOrderItemMutation"
import {updateScenarioErpOrderItemMutation} from "../../../mutations"
import {scenarioErpOrderItemsQuery} from "../../../queries"

export interface UseUpdateScenarioErpOrderItemHook {
  readonly updateScenarioErpOrderItem: (
    orderItemId: number,
    update: ScenarioErpOrderItemUpdate
  ) => Promise<Option<ScenarioErpOrderItem>>
  readonly updateScenarioErpOrderItemLoading: boolean
}

export const useUpdateScenarioErpOrderItem = (scenarioId: UUID): UseUpdateScenarioErpOrderItemHook => {
  const [updateScenarioErpOrderItem, {loading}] = useMutation<
    UpdateScenarioErpOrderItemMutation,
    UpdateScenarioErpOrderItemMutationVariables
  >(updateScenarioErpOrderItemMutation)

  return {
    updateScenarioErpOrderItem: (orderItemId: number, update: ScenarioErpOrderItemUpdate) =>
      new Promise<Option<ScenarioErpOrderItem>>((resolve, reject) => {
        updateScenarioErpOrderItem({
          variables: {scenarioId, orderItemId, update},
          update: updateEntityInCache<
            ScenarioErpOrderItemsQuery,
            UpdateScenarioErpOrderItemMutation,
            ScenarioErpOrderItem,
            ScenarioErpOrderItemsQueryVariables
          >(
            scenarioErpOrderItemsQuery,
            "scenarioErpOrderItems",
            entity => entity.orderItemId === orderItemId,
            "updateScenarioErpOrderItem",
            {
              scenarioId
            }
          )
        })
          .then(result => resolve(Option.of(result.data?.updateScenarioErpOrderItem)))
          .catch(reject)
      }),
    updateScenarioErpOrderItemLoading: loading
  }
}
