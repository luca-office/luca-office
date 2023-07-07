import {PureQueryOptions, useMutation} from "@apollo/client"
import {ToolUsageScenarioCodingAutomatedCriterion} from "../../../../../models"
import {Option} from "../../../../../utils"
import {ToolUsageScenarioCodingAutomatedCriterionUpdate} from "../../../../generated/globalTypes"
import {
  UpdateToolUsageScenarioCodingAutomatedCriterionMutation,
  UpdateToolUsageScenarioCodingAutomatedCriterionMutationVariables
} from "../../../../generated/UpdateToolUsageScenarioCodingAutomatedCriterionMutation"
import {updateToolUsageScenarioCodingAutomatedCriterionMutation} from "../../../../mutations"

export interface UseUpdateToolUsageScenarioCodingAutomatedCriterionHook {
  readonly updateToolUsageScenarioCodingAutomatedCriterion: (
    id: UUID,
    update: ToolUsageScenarioCodingAutomatedCriterionUpdate
  ) => Promise<Option<ToolUsageScenarioCodingAutomatedCriterion>>
  readonly updateToolUsageScenarioCodingAutomatedCriterionLoading: boolean
}

export const useUpdateToolUsageScenarioCodingAutomatedCriterion = (
  refetchQueries?: PureQueryOptions[]
): UseUpdateToolUsageScenarioCodingAutomatedCriterionHook => {
  const [updateToolUsageScenarioCodingAutomatedCriterion, {loading}] = useMutation<
    UpdateToolUsageScenarioCodingAutomatedCriterionMutation,
    UpdateToolUsageScenarioCodingAutomatedCriterionMutationVariables
  >(updateToolUsageScenarioCodingAutomatedCriterionMutation, {refetchQueries})

  return {
    updateToolUsageScenarioCodingAutomatedCriterion: (
      id: UUID,
      update: ToolUsageScenarioCodingAutomatedCriterionUpdate
    ) =>
      new Promise<Option<ToolUsageScenarioCodingAutomatedCriterion>>((resolve, reject) => {
        updateToolUsageScenarioCodingAutomatedCriterion({
          variables: {id, update}
        })
          .then(result =>
            resolve(
              Option.of<ToolUsageScenarioCodingAutomatedCriterion>(
                result?.data
                  ?.updateToolUsageScenarioCodingAutomatedCriterion as ToolUsageScenarioCodingAutomatedCriterion
              )
            )
          )
          .catch(reject)
      }),
    updateToolUsageScenarioCodingAutomatedCriterionLoading: loading
  }
}
