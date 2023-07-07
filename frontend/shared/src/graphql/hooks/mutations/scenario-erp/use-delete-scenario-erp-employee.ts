import {useMutation} from "@apollo/client"
import {ScenarioErpEmployee} from "../../../../models"
import {Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {
  DeleteScenarioErpEmployeeMutation,
  DeleteScenarioErpEmployeeMutationVariables
} from "../../../generated/DeleteScenarioErpEmployeeMutation"
import {
  ScenarioErpEmployeesQuery,
  ScenarioErpEmployeesQueryVariables
} from "../../../generated/ScenarioErpEmployeesQuery"
import {deleteScenarioErpEmployeeMutation} from "../../../mutations"
import {scenarioErpEmployeesQuery} from "../../../queries"

export interface UseDeleteScenarioErpEmployeeHook {
  readonly deleteScenarioErpEmployee: (employeeId: number) => Promise<Option<ScenarioErpEmployee>>
  readonly deleteScenarioErpEmployeeLoading: boolean
}

export const useDeleteScenarioErpEmployee = (scenarioId: UUID): UseDeleteScenarioErpEmployeeHook => {
  const [deleteScenarioErpEmployee, {loading}] = useMutation<
    DeleteScenarioErpEmployeeMutation,
    DeleteScenarioErpEmployeeMutationVariables
  >(deleteScenarioErpEmployeeMutation)

  return {
    deleteScenarioErpEmployee: (employeeId: number) =>
      new Promise<Option<ScenarioErpEmployee>>((resolve, reject) => {
        deleteScenarioErpEmployee({
          variables: {scenarioId, employeeId},
          update: deleteEntityFromCache<
            ScenarioErpEmployeesQuery,
            DeleteScenarioErpEmployeeMutation,
            ScenarioErpEmployeesQueryVariables,
            ScenarioErpEmployee
          >(scenarioErpEmployeesQuery, "scenarioErpEmployees", entity => entity.employeeId !== employeeId, {
            scenarioId
          })
        })
          .then(result => resolve(Option.of(result.data?.deleteScenarioErpEmployee)))
          .catch(reject)
      }),
    deleteScenarioErpEmployeeLoading: loading
  }
}
