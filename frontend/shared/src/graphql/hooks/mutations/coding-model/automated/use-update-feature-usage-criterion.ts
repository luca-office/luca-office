import {PureQueryOptions, useMutation} from "@apollo/client"
import {FeatureUsageScenarioCodingAutomatedCriterion} from "../../../../../models"
import {Option} from "../../../../../utils"
import {FeatureUsageScenarioCodingAutomatedCriterionUpdate} from "../../../../generated/globalTypes"
import {
  UpdateFeatureUsageScenarioCodingAutomatedCriterionMutation,
  UpdateFeatureUsageScenarioCodingAutomatedCriterionMutationVariables
} from "../../../../generated/UpdateFeatureUsageScenarioCodingAutomatedCriterionMutation"
import {updateFeatureUsageScenarioCodingAutomatedCriterionMutation} from "../../../../mutations"

export interface UseUpdateFeatureUsageScenarioCodingAutomatedCriterionHook {
  readonly updateFeatureUsageScenarioCodingAutomatedCriterion: (
    id: UUID,
    update: FeatureUsageScenarioCodingAutomatedCriterionUpdate
  ) => Promise<Option<FeatureUsageScenarioCodingAutomatedCriterion>>
  readonly updateFeatureUsageScenarioCodingAutomatedCriterionLoading: boolean
}

export const useUpdateFeatureUsageScenarioCodingAutomatedCriterion = (
  refetchQueries?: PureQueryOptions[]
): UseUpdateFeatureUsageScenarioCodingAutomatedCriterionHook => {
  const [updateFeatureUsageScenarioCodingAutomatedCriterion, {loading}] = useMutation<
    UpdateFeatureUsageScenarioCodingAutomatedCriterionMutation,
    UpdateFeatureUsageScenarioCodingAutomatedCriterionMutationVariables
  >(updateFeatureUsageScenarioCodingAutomatedCriterionMutation, {refetchQueries})

  return {
    updateFeatureUsageScenarioCodingAutomatedCriterion: (
      id: UUID,
      update: FeatureUsageScenarioCodingAutomatedCriterionUpdate
    ) =>
      new Promise<Option<FeatureUsageScenarioCodingAutomatedCriterion>>((resolve, reject) => {
        updateFeatureUsageScenarioCodingAutomatedCriterion({
          variables: {id, update}
        })
          .then(result =>
            resolve(
              Option.of<FeatureUsageScenarioCodingAutomatedCriterion>(
                result?.data
                  ?.updateFeatureUsageScenarioCodingAutomatedCriterion as FeatureUsageScenarioCodingAutomatedCriterion
              )
            )
          )
          .catch(reject)
      }),
    updateFeatureUsageScenarioCodingAutomatedCriterionLoading: loading
  }
}
