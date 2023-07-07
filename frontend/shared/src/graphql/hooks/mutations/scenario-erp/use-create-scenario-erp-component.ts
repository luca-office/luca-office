import {useMutation} from "@apollo/client"
import {ScenarioErpComponent} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  CreateScenarioErpComponentMutation,
  CreateScenarioErpComponentMutationVariables
} from "../../../generated/CreateScenarioErpComponentMutation"
import {ScenarioErpComponentCreation} from "../../../generated/globalTypes"
import {
  ScenarioErpComponentsQuery,
  ScenarioErpComponentsQueryVariables
} from "../../../generated/ScenarioErpComponentsQuery"
import {createScenarioErpComponentMutation} from "../../../mutations"
import {scenarioErpComponentsQuery} from "../../../queries"

export interface UseCreateScenarioErpComponentHook {
  readonly createScenarioErpComponent: (creation: ScenarioErpComponentCreation) => Promise<Option<ScenarioErpComponent>>
  readonly createScenarioErpComponentLoading: boolean
}

export const useCreateScenarioErpComponent = (): UseCreateScenarioErpComponentHook => {
  const [createScenarioErpComponent, {loading}] = useMutation<
    CreateScenarioErpComponentMutation,
    CreateScenarioErpComponentMutationVariables
  >(createScenarioErpComponentMutation)

  return {
    createScenarioErpComponent: (creation: ScenarioErpComponentCreation) =>
      new Promise<Option<ScenarioErpComponent>>((resolve, reject) => {
        createScenarioErpComponent({
          variables: {creation},
          update: createEntityInCache<
            ScenarioErpComponentsQuery,
            CreateScenarioErpComponentMutation,
            ScenarioErpComponentsQueryVariables
          >(
            scenarioErpComponentsQuery,
            "scenarioErpComponents",
            query => query.scenarioErpComponents,
            "createScenarioErpComponent"
          )
        })
          .then(result => resolve(Option.of(result.data?.createScenarioErpComponent)))
          .catch(reject)
      }),
    createScenarioErpComponentLoading: loading
  }
}
