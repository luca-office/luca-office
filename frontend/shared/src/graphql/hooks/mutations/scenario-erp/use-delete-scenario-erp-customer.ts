import {useMutation} from "@apollo/client"
import {ScenarioErpCustomer} from "../../../../models"
import {Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {
  DeleteScenarioErpCustomerMutation,
  DeleteScenarioErpCustomerMutationVariables
} from "../../../generated/DeleteScenarioErpCustomerMutation"
import {
  ScenarioErpCustomersQuery,
  ScenarioErpCustomersQueryVariables
} from "../../../generated/ScenarioErpCustomersQuery"
import {deleteScenarioErpCustomerMutation} from "../../../mutations"
import {scenarioErpCustomersQuery} from "../../../queries"

export interface UseDeleteScenarioErpCustomerHook {
  readonly deleteScenarioErpCustomer: (customerId: number) => Promise<Option<ScenarioErpCustomer>>
  readonly deleteScenarioErpCustomerLoading: boolean
}

export const useDeleteScenarioErpCustomer = (scenarioId: UUID): UseDeleteScenarioErpCustomerHook => {
  const [deleteScenarioErpCustomer, {loading}] = useMutation<
    DeleteScenarioErpCustomerMutation,
    DeleteScenarioErpCustomerMutationVariables
  >(deleteScenarioErpCustomerMutation)

  return {
    deleteScenarioErpCustomer: (customerId: number) =>
      new Promise<Option<ScenarioErpCustomer>>((resolve, reject) => {
        deleteScenarioErpCustomer({
          variables: {scenarioId, customerId},
          update: deleteEntityFromCache<
            ScenarioErpCustomersQuery,
            DeleteScenarioErpCustomerMutation,
            ScenarioErpCustomersQueryVariables,
            ScenarioErpCustomer
          >(scenarioErpCustomersQuery, "scenarioErpCustomers", entity => entity.customerId !== customerId, {
            scenarioId
          })
        })
          .then(result => resolve(Option.of(result.data?.deleteScenarioErpCustomer)))
          .catch(reject)
      }),
    deleteScenarioErpCustomerLoading: loading
  }
}
