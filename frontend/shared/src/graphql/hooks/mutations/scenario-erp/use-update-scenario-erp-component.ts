import {useMutation} from "@apollo/client"
import {ScenarioErpComponent} from "../../../../models"
import {Option} from "../../../../utils"
import {updateEntityInCache} from "../../../cache"
import {ScenarioErpComponentUpdate} from "../../../generated/globalTypes"
import {
  ScenarioErpComponentsQuery,
  ScenarioErpComponentsQueryVariables
} from "../../../generated/ScenarioErpComponentsQuery"
import {
  UpdateScenarioErpComponentMutation,
  UpdateScenarioErpComponentMutationVariables
} from "../../../generated/UpdateScenarioErpComponentMutation"
import {updateScenarioErpComponentMutation} from "../../../mutations"
import {scenarioErpComponentsQuery} from "../../../queries"

export interface UseUpdateScenarioErpComponentHook {
  readonly updateScenarioErpComponent: (
    componentId: number,
    update: ScenarioErpComponentUpdate
  ) => Promise<Option<ScenarioErpComponent>>
  readonly updateScenarioErpComponentLoading: boolean
}

export const useUpdateScenarioErpComponent = (scenarioId: UUID): UseUpdateScenarioErpComponentHook => {
  const [updateScenarioErpComponent, {loading}] = useMutation<
    UpdateScenarioErpComponentMutation,
    UpdateScenarioErpComponentMutationVariables
  >(updateScenarioErpComponentMutation)

  return {
    updateScenarioErpComponent: (componentId: number, update: ScenarioErpComponentUpdate) =>
      new Promise<Option<ScenarioErpComponent>>((resolve, reject) => {
        updateScenarioErpComponent({
          variables: {scenarioId, componentId, update},
          update: updateEntityInCache<
            ScenarioErpComponentsQuery,
            UpdateScenarioErpComponentMutation,
            ScenarioErpComponent,
            ScenarioErpComponentsQueryVariables
          >(
            scenarioErpComponentsQuery,
            "scenarioErpComponents",
            entity => entity.componentId === componentId,
            "updateScenarioErpComponent",
            {
              scenarioId
            }
          )
        })
          .then(result => resolve(Option.of(result.data?.updateScenarioErpComponent)))
          .catch(reject)
      }),
    updateScenarioErpComponentLoading: loading
  }
}
