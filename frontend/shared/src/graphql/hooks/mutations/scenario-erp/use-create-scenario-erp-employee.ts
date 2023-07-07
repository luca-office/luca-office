import {useMutation} from "@apollo/client"
import {ScenarioErpEmployee} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  CreateScenarioErpEmployeeMutation,
  CreateScenarioErpEmployeeMutationVariables
} from "../../../generated/CreateScenarioErpEmployeeMutation"
import {ScenarioErpEmployeeCreation} from "../../../generated/globalTypes"
import {
  ScenarioErpEmployeesQuery,
  ScenarioErpEmployeesQueryVariables
} from "../../../generated/ScenarioErpEmployeesQuery"
import {createScenarioErpEmployeeMutation} from "../../../mutations"
import {scenarioErpEmployeesQuery} from "../../../queries"

export interface UseCreateScenarioErpEmployeeHook {
  readonly createScenarioErpEmployee: (creation: ScenarioErpEmployeeCreation) => Promise<Option<ScenarioErpEmployee>>
  readonly createScenarioErpEmployeeLoading: boolean
}

export const useCreateScenarioErpEmployee = (): UseCreateScenarioErpEmployeeHook => {
  const [createScenarioErpEmployee, {loading}] = useMutation<
    CreateScenarioErpEmployeeMutation,
    CreateScenarioErpEmployeeMutationVariables
  >(createScenarioErpEmployeeMutation)

  return {
    createScenarioErpEmployee: (creation: ScenarioErpEmployeeCreation) =>
      new Promise<Option<ScenarioErpEmployee>>((resolve, reject) => {
        createScenarioErpEmployee({
          variables: {creation},
          update: createEntityInCache<
            ScenarioErpEmployeesQuery,
            CreateScenarioErpEmployeeMutation,
            ScenarioErpEmployeesQueryVariables
          >(
            scenarioErpEmployeesQuery,
            "scenarioErpEmployees",
            query => query.scenarioErpEmployees,
            "createScenarioErpEmployee"
          )
        })
          .then(result => resolve(Option.of(result.data?.createScenarioErpEmployee)))
          .catch(reject)
      }),
    createScenarioErpEmployeeLoading: loading
  }
}
