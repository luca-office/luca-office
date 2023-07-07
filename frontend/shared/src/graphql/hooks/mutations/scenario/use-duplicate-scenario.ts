import {useMutation} from "@apollo/client"
import {Scenario} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  DuplicateScenarioMutation,
  DuplicateScenarioMutationVariables
} from "../../../generated/DuplicateScenarioMutation"
import {ScenariosQuery} from "../../../generated/ScenariosQuery"
import {duplicateScenarioMutation} from "../../../mutations"
import {scenariosQuery} from "../../../queries"

export interface UseDuplicateScenarioHook {
  readonly duplicateScenario: (id: UUID) => Promise<Option<Scenario>>
  readonly duplicateScenarioLoading: boolean
}

export const useDuplicateScenario = (): UseDuplicateScenarioHook => {
  const [duplicateScenario, {loading}] = useMutation<DuplicateScenarioMutation, DuplicateScenarioMutationVariables>(
    duplicateScenarioMutation
  )

  return {
    duplicateScenario: (id: UUID) =>
      new Promise<Option<Scenario>>((resolve, reject) => {
        duplicateScenario({
          variables: {id},
          update: createEntityInCache<ScenariosQuery, DuplicateScenarioMutation>(
            scenariosQuery,
            "scenarios",
            query => query.scenarios,
            "duplicateScenario"
          )
        })
          .then(result => resolve(Option.of(result.data?.duplicateScenario)))
          .catch(reject)
      }),
    duplicateScenarioLoading: loading
  }
}
