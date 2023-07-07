import {useMutation} from "@apollo/client"
import {ScenarioErpCustomer} from "../../../../models"
import {Option} from "../../../../utils"
import {updateEntityInCache} from "../../../cache"
import {ScenarioErpCustomerUpdate} from "../../../generated/globalTypes"
import {
  ScenarioErpCustomersQuery,
  ScenarioErpCustomersQueryVariables
} from "../../../generated/ScenarioErpCustomersQuery"
import {
  UpdateScenarioErpCustomerMutation,
  UpdateScenarioErpCustomerMutationVariables
} from "../../../generated/UpdateScenarioErpCustomerMutation"
import {updateScenarioErpCustomerMutation} from "../../../mutations"
import {scenarioErpCustomersQuery} from "../../../queries"

export interface UseUpdateScenarioErpCustomerHook {
  readonly updateScenarioErpCustomer: (
    customerId: number,
    update: ScenarioErpCustomerUpdate
  ) => Promise<Option<ScenarioErpCustomer>>
  readonly updateScenarioErpCustomerLoading: boolean
}

export const useUpdateScenarioErpCustomer = (scenarioId: UUID): UseUpdateScenarioErpCustomerHook => {
  const [updateScenarioErpCustomer, {loading}] = useMutation<
    UpdateScenarioErpCustomerMutation,
    UpdateScenarioErpCustomerMutationVariables
  >(updateScenarioErpCustomerMutation)

  return {
    updateScenarioErpCustomer: (customerId: number, update: ScenarioErpCustomerUpdate) =>
      new Promise<Option<ScenarioErpCustomer>>((resolve, reject) => {
        updateScenarioErpCustomer({
          variables: {scenarioId, customerId, update},
          update: updateEntityInCache<
            ScenarioErpCustomersQuery,
            UpdateScenarioErpCustomerMutation,
            ScenarioErpCustomer,
            ScenarioErpCustomersQueryVariables
          >(
            scenarioErpCustomersQuery,
            "scenarioErpCustomers",
            entity => entity.customerId === customerId,
            "updateScenarioErpCustomer",
            {
              scenarioId
            }
          )
        })
          .then(result => resolve(Option.of(result.data?.updateScenarioErpCustomer)))
          .catch(reject)
      }),
    updateScenarioErpCustomerLoading: loading
  }
}
