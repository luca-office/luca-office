import {useMutation} from "@apollo/client"
import {ScenarioErpComponent} from "../../../../models"
import {Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {
  DeleteScenarioErpComponentMutation,
  DeleteScenarioErpComponentMutationVariables
} from "../../../generated/DeleteScenarioErpComponentMutation"
import {
  ScenarioErpComponentsQuery,
  ScenarioErpComponentsQueryVariables
} from "../../../generated/ScenarioErpComponentsQuery"
import {deleteScenarioErpComponentMutation} from "../../../mutations"
import {scenarioErpComponentsQuery} from "../../../queries"

export interface UseDeleteScenarioErpComponentHook {
  readonly deleteScenarioErpComponent: (componentId: number) => Promise<Option<ScenarioErpComponent>>
  readonly deleteScenarioErpComponentLoading: boolean
}

export const useDeleteScenarioErpComponent = (scenarioId: UUID): UseDeleteScenarioErpComponentHook => {
  const [deleteScenarioErpComponent, {loading}] = useMutation<
    DeleteScenarioErpComponentMutation,
    DeleteScenarioErpComponentMutationVariables
  >(deleteScenarioErpComponentMutation)

  return {
    deleteScenarioErpComponent: (componentId: number) =>
      new Promise<Option<ScenarioErpComponent>>((resolve, reject) => {
        deleteScenarioErpComponent({
          variables: {scenarioId, componentId},
          update: deleteEntityFromCache<
            ScenarioErpComponentsQuery,
            DeleteScenarioErpComponentMutation,
            ScenarioErpComponentsQueryVariables,
            ScenarioErpComponent
          >(scenarioErpComponentsQuery, "scenarioErpComponents", entity => entity.componentId !== componentId, {
            scenarioId
          })
        })
          .then(result => resolve(Option.of(result.data?.deleteScenarioErpComponent)))
          .catch(reject)
      }),
    deleteScenarioErpComponentLoading: loading
  }
}
