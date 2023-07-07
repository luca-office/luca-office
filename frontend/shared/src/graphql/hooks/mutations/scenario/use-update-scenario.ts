import {useMutation} from "@apollo/client"
import {Scenario} from "../../../../models"
import {Option} from "../../../../utils"
import {ScenarioUpdate} from "../../../generated/globalTypes"
import {UpdateScenarioMutation, UpdateScenarioMutationVariables} from "../../../generated/UpdateScenarioMutation"
import {updateScenarioMutation} from "../../../mutations"

export interface UseUpdateScenarioHook {
  readonly updateScenario: (id: UUID, update: ScenarioUpdate) => Promise<Option<Scenario>>
  readonly isUpdateScenarioLoading: boolean
}

export const useUpdateScenario = (): UseUpdateScenarioHook => {
  const [updateScenario, {loading}] = useMutation<UpdateScenarioMutation, UpdateScenarioMutationVariables>(
    updateScenarioMutation
  )

  return {
    updateScenario: (id: UUID, update: ScenarioUpdate) =>
      new Promise<Option<Scenario>>((resolve, reject) => {
        updateScenario({
          variables: {id, update}
        })
          .then(result => resolve(Option.of(result.data?.updateScenario)))
          .catch(reject)
      }),
    isUpdateScenarioLoading: loading
  }
}
