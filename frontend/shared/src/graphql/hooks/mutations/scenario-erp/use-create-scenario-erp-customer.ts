import {useMutation} from "@apollo/client"
import {ScenarioErpCustomer} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  CreateScenarioErpCustomerMutation,
  CreateScenarioErpCustomerMutationVariables
} from "../../../generated/CreateScenarioErpCustomerMutation"
import {ScenarioErpCustomerCreation} from "../../../generated/globalTypes"
import {
  ScenarioErpCustomersQuery,
  ScenarioErpCustomersQueryVariables
} from "../../../generated/ScenarioErpCustomersQuery"
import {createScenarioErpCustomerMutation} from "../../../mutations"
import {scenarioErpCustomersQuery} from "../../../queries"

export interface UseCreateScenarioErpCustomerHook {
  readonly createScenarioErpCustomer: (creation: ScenarioErpCustomerCreation) => Promise<Option<ScenarioErpCustomer>>
  readonly createScenarioErpCustomerLoading: boolean
}

export const useCreateScenarioErpCustomer = (): UseCreateScenarioErpCustomerHook => {
  const [createScenarioErpCustomer, {loading}] = useMutation<
    CreateScenarioErpCustomerMutation,
    CreateScenarioErpCustomerMutationVariables
  >(createScenarioErpCustomerMutation)

  return {
    createScenarioErpCustomer: (creation: ScenarioErpCustomerCreation) =>
      new Promise<Option<ScenarioErpCustomer>>((resolve, reject) => {
        createScenarioErpCustomer({
          variables: {creation},
          update: createEntityInCache<
            ScenarioErpCustomersQuery,
            CreateScenarioErpCustomerMutation,
            ScenarioErpCustomersQueryVariables
          >(
            scenarioErpCustomersQuery,
            "scenarioErpCustomers",
            query => query.scenarioErpCustomers,
            "createScenarioErpCustomer"
          )
        })
          .then(result => resolve(Option.of(result.data?.createScenarioErpCustomer)))
          .catch(reject)
      }),
    createScenarioErpCustomerLoading: loading
  }
}
