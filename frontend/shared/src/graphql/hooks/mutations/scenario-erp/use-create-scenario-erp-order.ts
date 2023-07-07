import {useMutation} from "@apollo/client"
import {ScenarioErpOrder} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  CreateScenarioErpOrderMutation,
  CreateScenarioErpOrderMutationVariables
} from "../../../generated/CreateScenarioErpOrderMutation"
import {ScenarioErpOrderCreation} from "../../../generated/globalTypes"
import {ScenarioErpOrdersQuery, ScenarioErpOrdersQueryVariables} from "../../../generated/ScenarioErpOrdersQuery"
import {createScenarioErpOrderMutation} from "../../../mutations"
import {scenarioErpOrdersQuery} from "../../../queries"

export interface UseCreateScenarioErpOrderHook {
  readonly createScenarioErpOrder: (creation: ScenarioErpOrderCreation) => Promise<Option<ScenarioErpOrder>>
  readonly createScenarioErpOrderLoading: boolean
}

export const useCreateScenarioErpOrder = (): UseCreateScenarioErpOrderHook => {
  const [createScenarioErpOrder, {loading}] = useMutation<
    CreateScenarioErpOrderMutation,
    CreateScenarioErpOrderMutationVariables
  >(createScenarioErpOrderMutation)

  return {
    createScenarioErpOrder: (creation: ScenarioErpOrderCreation) =>
      new Promise<Option<ScenarioErpOrder>>((resolve, reject) => {
        createScenarioErpOrder({
          variables: {creation},
          update: createEntityInCache<
            ScenarioErpOrdersQuery,
            CreateScenarioErpOrderMutation,
            ScenarioErpOrdersQueryVariables
          >(scenarioErpOrdersQuery, "scenarioErpOrders", query => query.scenarioErpOrders, "createScenarioErpOrder")
        })
          .then(result => resolve(Option.of(result.data?.createScenarioErpOrder)))
          .catch(reject)
      }),
    createScenarioErpOrderLoading: loading
  }
}
