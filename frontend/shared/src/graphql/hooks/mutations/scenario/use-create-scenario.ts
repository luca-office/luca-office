import {useMutation} from "@apollo/client"
import {Scenario} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {CreateScenarioMutation, CreateScenarioMutationVariables} from "../../../generated/CreateScenarioMutation"
import {ScenarioCreation} from "../../../generated/globalTypes"
import {ScenariosQuery} from "../../../generated/ScenariosQuery"
import {createScenarioMutation} from "../../../mutations"
import {scenariosQuery} from "../../../queries"

export interface CreateScenarioProps {
  readonly createScenario: (creation: ScenarioCreation) => Promise<Option<Scenario>>
  readonly isCreateScenarioLoading: boolean
}

export const useCreateScenario = (): CreateScenarioProps => {
  const [createScenario, {loading}] = useMutation<CreateScenarioMutation, CreateScenarioMutationVariables>(
    createScenarioMutation
  )

  return {
    createScenario: (creation: ScenarioCreation) =>
      new Promise<Option<Scenario>>((resolve, reject) => {
        createScenario({
          variables: {creation},
          update: createEntityInCache<ScenariosQuery, CreateScenarioMutation>(
            scenariosQuery,
            "scenarios",
            query => query.scenarios,
            "createScenario"
          )
        })
          .then(result => resolve(Option.of(result.data?.createScenario)))
          .catch(reject)
      }),
    isCreateScenarioLoading: loading
  }
}
