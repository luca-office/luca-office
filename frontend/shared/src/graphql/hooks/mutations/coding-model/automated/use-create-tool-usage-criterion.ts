import {PureQueryOptions, useMutation} from "@apollo/client"
import {ToolUsageScenarioCodingAutomatedCriterion} from "../../../../../models"
import {Option} from "../../../../../utils"
import {
  CreateToolUsageScenarioCodingAutomatedCriterionMutation,
  CreateToolUsageScenarioCodingAutomatedCriterionMutationVariables
} from "../../../../generated/CreateToolUsageScenarioCodingAutomatedCriterionMutation"
import {ToolUsageScenarioCodingAutomatedCriterionCreation} from "../../../../generated/globalTypes"
import {createToolUsageScenarioCodingAutomatedCriterionMutation} from "../../../../mutations"

export interface UseCreateToolUsageScenarioCodingAutomatedCriterionHook {
  readonly createToolUsageScenarioCodingAutomatedCriterion: (
    creation: ToolUsageScenarioCodingAutomatedCriterionCreation
  ) => Promise<Option<ToolUsageScenarioCodingAutomatedCriterion>>
  readonly createToolUsageScenarioCodingAutomatedCriterionLoading: boolean
}

export const useCreateToolUsageScenarioCodingAutomatedCriterion = (
  refetchQueries?: PureQueryOptions[]
): UseCreateToolUsageScenarioCodingAutomatedCriterionHook => {
  const [createToolUsageScenarioCodingAutomatedCriterion, {loading}] = useMutation<
    CreateToolUsageScenarioCodingAutomatedCriterionMutation,
    CreateToolUsageScenarioCodingAutomatedCriterionMutationVariables
  >(createToolUsageScenarioCodingAutomatedCriterionMutation, {refetchQueries})

  return {
    createToolUsageScenarioCodingAutomatedCriterion: (creation: ToolUsageScenarioCodingAutomatedCriterionCreation) =>
      new Promise<Option<ToolUsageScenarioCodingAutomatedCriterion>>((resolve, reject) => {
        createToolUsageScenarioCodingAutomatedCriterion({
          variables: {creation}
        })
          .then(result =>
            resolve(
              Option.of(
                result?.data
                  ?.createToolUsageScenarioCodingAutomatedCriterion as ToolUsageScenarioCodingAutomatedCriterion
              )
            )
          )
          .catch(reject)
      }),
    createToolUsageScenarioCodingAutomatedCriterionLoading: loading
  }
}
