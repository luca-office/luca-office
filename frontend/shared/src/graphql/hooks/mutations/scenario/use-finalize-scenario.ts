import {useMutation} from "@apollo/client"
import {Scenario} from "../../../../models"
import {Option} from "../../../../utils"
import {FinalizeScenarioMutation, FinalizeScenarioMutationVariables} from "../../../generated/FinalizeScenarioMutation"
import {finalizeScenarioMutation} from "../../../mutations"
import {scenariosQuery} from "../../../queries"

export interface UseFinalizeScenarioHook {
  readonly finalizeScenario: (id: UUID) => Promise<Option<Scenario>>
  readonly isFinalizeScenarioLoading: boolean
}

export const useFinalizeScenario = (): UseFinalizeScenarioHook => {
  const [finalizeScenario, {loading}] = useMutation<FinalizeScenarioMutation, FinalizeScenarioMutationVariables>(
    finalizeScenarioMutation
  )

  return {
    finalizeScenario: (id: UUID) =>
      new Promise<Option<Scenario>>((resolve, reject) => {
        finalizeScenario({
          variables: {id},
          refetchQueries: [{query: scenariosQuery}]
        })
          .then(result => resolve(Option.of(result.data?.finalizeScenario)))
          .catch(reject)
      }),
    isFinalizeScenarioLoading: loading
  }
}
