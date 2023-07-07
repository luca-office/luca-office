import {useMutation} from "@apollo/client"
import {ScenarioErpEmployee} from "../../../../models"
import {Option} from "../../../../utils"
import {updateEntityInCache} from "../../../cache"
import {ScenarioErpEmployeeUpdate} from "../../../generated/globalTypes"
import {
  ScenarioErpEmployeesQuery,
  ScenarioErpEmployeesQueryVariables
} from "../../../generated/ScenarioErpEmployeesQuery"
import {
  UpdateScenarioErpEmployeeMutation,
  UpdateScenarioErpEmployeeMutationVariables
} from "../../../generated/UpdateScenarioErpEmployeeMutation"
import {updateScenarioErpEmployeeMutation} from "../../../mutations"
import {scenarioErpEmployeesQuery} from "../../../queries"

export interface UseUpdateScenarioErpEmployeeHook {
  readonly updateScenarioErpEmployee: (
    employeeId: number,
    update: ScenarioErpEmployeeUpdate
  ) => Promise<Option<ScenarioErpEmployee>>
  readonly updateScenarioErpEmployeeLoading: boolean
}

export const useUpdateScenarioErpEmployee = (scenarioId: UUID): UseUpdateScenarioErpEmployeeHook => {
  const [updateScenarioErpEmployee, {loading}] = useMutation<
    UpdateScenarioErpEmployeeMutation,
    UpdateScenarioErpEmployeeMutationVariables
  >(updateScenarioErpEmployeeMutation)

  return {
    updateScenarioErpEmployee: (employeeId: number, update: ScenarioErpEmployeeUpdate) =>
      new Promise<Option<ScenarioErpEmployee>>((resolve, reject) => {
        updateScenarioErpEmployee({
          variables: {scenarioId, employeeId, update},
          update: updateEntityInCache<
            ScenarioErpEmployeesQuery,
            UpdateScenarioErpEmployeeMutation,
            ScenarioErpEmployee,
            ScenarioErpEmployeesQueryVariables
          >(
            scenarioErpEmployeesQuery,
            "scenarioErpEmployees",
            entity => entity.employeeId === employeeId,
            "updateScenarioErpEmployee",
            {
              scenarioId
            }
          )
        })
          .then(result => resolve(Option.of(result.data?.updateScenarioErpEmployee)))
          .catch(reject)
      }),
    updateScenarioErpEmployeeLoading: loading
  }
}
