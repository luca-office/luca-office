import {useMutation} from "@apollo/client"
import {DeleteEntityHook} from "../../../../models"
import {deleteIdEntityFromCache} from "../../../cache"
import {DeleteScenarioMutation, DeleteScenarioMutationVariables} from "../../../generated/DeleteScenarioMutation"
import {ScenarioFragment} from "../../../generated/ScenarioFragment"
import {ScenariosQuery} from "../../../generated/ScenariosQuery"
import {deleteScenarioMutation} from "../../../mutations"
import {scenariosQuery} from "../../../queries"

export const useDeleteScenario = (): DeleteEntityHook => {
  const [deleteScenario, {loading}] = useMutation<DeleteScenarioMutation, DeleteScenarioMutationVariables>(
    deleteScenarioMutation
  )

  return {
    deleteEntity: (id: UUID) =>
      new Promise<void>((resolve, reject) => {
        deleteScenario({
          variables: {id},
          update: deleteIdEntityFromCache<ScenariosQuery, DeleteScenarioMutation, unknown, ScenarioFragment>(
            scenariosQuery,
            "scenarios",
            id
          )
        })
          .then(() => resolve())
          .catch(reject)
      }),
    deleteEntityLoading: loading
  }
}
