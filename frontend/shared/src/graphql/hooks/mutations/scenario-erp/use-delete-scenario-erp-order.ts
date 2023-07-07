import {useMutation} from "@apollo/client"
import {ScenarioErpOrder} from "../../../../models"
import {Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {
  DeleteScenarioErpOrderMutation,
  DeleteScenarioErpOrderMutationVariables
} from "../../../generated/DeleteScenarioErpOrderMutation"
import {ScenarioErpOrdersQuery, ScenarioErpOrdersQueryVariables} from "../../../generated/ScenarioErpOrdersQuery"
import {deleteScenarioErpOrderMutation} from "../../../mutations"
import {scenarioErpOrdersQuery} from "../../../queries"

export interface UseDeleteScenarioErpOrderHook {
  readonly deleteScenarioErpOrder: (orderId: number) => Promise<Option<ScenarioErpOrder>>
  readonly deleteScenarioErpOrderLoading: boolean
}

export const useDeleteScenarioErpOrder = (scenarioId: UUID): UseDeleteScenarioErpOrderHook => {
  const [deleteScenarioErpOrder, {loading}] = useMutation<
    DeleteScenarioErpOrderMutation,
    DeleteScenarioErpOrderMutationVariables
  >(deleteScenarioErpOrderMutation)

  return {
    deleteScenarioErpOrder: (orderId: number) =>
      new Promise<Option<ScenarioErpOrder>>((resolve, reject) => {
        deleteScenarioErpOrder({
          variables: {scenarioId, orderId},
          update: deleteEntityFromCache<
            ScenarioErpOrdersQuery,
            DeleteScenarioErpOrderMutation,
            ScenarioErpOrdersQueryVariables,
            ScenarioErpOrder
          >(scenarioErpOrdersQuery, "scenarioErpOrders", entity => entity.orderId !== orderId, {
            scenarioId
          })
        })
          .then(result => resolve(Option.of(result.data?.deleteScenarioErpOrder)))
          .catch(reject)
      }),
    deleteScenarioErpOrderLoading: loading
  }
}
