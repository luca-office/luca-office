import {useMutation} from "@apollo/client"
import {Scenario} from "../../../../models"
import {Option} from "../../../../utils"
import {PublishScenarioMutation, PublishScenarioMutationVariables} from "../../../generated/PublishScenarioMutation"
import {publishScenarioMutation} from "../../../mutations"

export interface UsePublishScenarioHook {
  readonly publishScenario: (id: UUID) => Promise<Option<Scenario>>
  readonly isPublishScenarioLoading: boolean
}

export const usePublishScenario = (): UsePublishScenarioHook => {
  const [publishScenario, {loading}] = useMutation<PublishScenarioMutation, PublishScenarioMutationVariables>(
    publishScenarioMutation
  )

  return {
    publishScenario: (id: UUID) =>
      new Promise<Option<Scenario>>((resolve, reject) => {
        publishScenario({
          variables: {id}
        })
          .then(result => resolve(Option.of(result.data?.publishScenario)))
          .catch(reject)
      }),
    isPublishScenarioLoading: loading
  }
}
