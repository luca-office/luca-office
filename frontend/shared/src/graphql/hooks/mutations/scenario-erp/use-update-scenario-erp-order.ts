import {useMutation} from "@apollo/client"
import {ScenarioErpOrder} from "../../../../models"
import {Option} from "../../../../utils"
import {updateEntityInCache} from "../../../cache"
import {ScenarioErpOrderUpdate} from "../../../generated/globalTypes"
import {ScenarioErpOrdersQuery, ScenarioErpOrdersQueryVariables} from "../../../generated/ScenarioErpOrdersQuery"
import {
  UpdateScenarioErpOrderMutation,
  UpdateScenarioErpOrderMutationVariables
} from "../../../generated/UpdateScenarioErpOrderMutation"
import {updateScenarioErpOrderMutation} from "../../../mutations"
import {scenarioErpOrdersQuery} from "../../../queries"

export interface UseUpdateScenarioErpOrderHook {
  readonly updateScenarioErpOrder: (
    orderId: number,
    update: ScenarioErpOrderUpdate
  ) => Promise<Option<ScenarioErpOrder>>
  readonly updateScenarioErpOrderLoading: boolean
}

export const useUpdateScenarioErpOrder = (scenarioId: UUID): UseUpdateScenarioErpOrderHook => {
  const [updateScenarioErpOrder, {loading}] = useMutation<
    UpdateScenarioErpOrderMutation,
    UpdateScenarioErpOrderMutationVariables
  >(updateScenarioErpOrderMutation)

  return {
    updateScenarioErpOrder: (orderId: number, update: ScenarioErpOrderUpdate) =>
      new Promise<Option<ScenarioErpOrder>>((resolve, reject) => {
        updateScenarioErpOrder({
          variables: {scenarioId, orderId, update},
          update: updateEntityInCache<
            ScenarioErpOrdersQuery,
            UpdateScenarioErpOrderMutation,
            ScenarioErpOrder,
            ScenarioErpOrdersQueryVariables
          >(
            scenarioErpOrdersQuery,
            "scenarioErpOrders",
            entity => entity.orderId === orderId,
            "updateScenarioErpOrder",
            {
              scenarioId
            }
          )
        })
          .then(result => resolve(Option.of(result.data?.updateScenarioErpOrder)))
          .catch(reject)
      }),
    updateScenarioErpOrderLoading: loading
  }
}
