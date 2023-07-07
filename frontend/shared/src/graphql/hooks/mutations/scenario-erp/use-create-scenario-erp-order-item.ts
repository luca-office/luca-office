import {useMutation} from "@apollo/client"
import {ScenarioErpOrderItem} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  CreateScenarioErpOrderItemMutation,
  CreateScenarioErpOrderItemMutationVariables
} from "../../../generated/CreateScenarioErpOrderItemMutation"
import {ScenarioErpOrderItemCreation} from "../../../generated/globalTypes"
import {
  ScenarioErpOrderItemsQuery,
  ScenarioErpOrderItemsQueryVariables
} from "../../../generated/ScenarioErpOrderItemsQuery"
import {createScenarioErpOrderItemMutation} from "../../../mutations"
import {scenarioErpOrderItemsQuery} from "../../../queries"

export interface UseCreateScenarioErpOrderItemHook {
  readonly createScenarioErpOrderItem: (creation: ScenarioErpOrderItemCreation) => Promise<Option<ScenarioErpOrderItem>>
  readonly createScenarioErpOrderItemLoading: boolean
}

export const useCreateScenarioErpOrderItem = (): UseCreateScenarioErpOrderItemHook => {
  const [createScenarioErpOrderItem, {loading}] = useMutation<
    CreateScenarioErpOrderItemMutation,
    CreateScenarioErpOrderItemMutationVariables
  >(createScenarioErpOrderItemMutation)

  return {
    createScenarioErpOrderItem: (creation: ScenarioErpOrderItemCreation) =>
      new Promise<Option<ScenarioErpOrderItem>>((resolve, reject) => {
        createScenarioErpOrderItem({
          variables: {creation},
          update: createEntityInCache<
            ScenarioErpOrderItemsQuery,
            CreateScenarioErpOrderItemMutation,
            ScenarioErpOrderItemsQueryVariables
          >(
            scenarioErpOrderItemsQuery,
            "scenarioErpOrderItems",
            query => query.scenarioErpOrderItems,
            "createScenarioErpOrderItem"
          )
        })
          .then(result => resolve(Option.of(result.data?.createScenarioErpOrderItem)))
          .catch(reject)
      }),
    createScenarioErpOrderItemLoading: loading
  }
}
