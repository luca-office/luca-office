import {PureQueryOptions, useMutation} from "@apollo/client"
import {FeatureUsageScenarioCodingAutomatedCriterion} from "../../../../../models"
import {Option} from "../../../../../utils"
import {
  CreateFeatureUsageScenarioCodingAutomatedCriterionMutation,
  CreateFeatureUsageScenarioCodingAutomatedCriterionMutationVariables
} from "../../../../generated/CreateFeatureUsageScenarioCodingAutomatedCriterionMutation"
import {FeatureUsageScenarioCodingAutomatedCriterionCreation} from "../../../../generated/globalTypes"
import {createFeatureUsageScenarioCodingAutomatedCriterionMutation} from "../../../../mutations"

export interface UseCreateFeatureUsageScenarioCodingAutomatedCriterionHook {
  readonly createFeatureUsageScenarioCodingAutomatedCriterion: (
    creation: FeatureUsageScenarioCodingAutomatedCriterionCreation
  ) => Promise<Option<FeatureUsageScenarioCodingAutomatedCriterion>>
  readonly createFeatureUsageScenarioCodingAutomatedCriterionLoading: boolean
}

export const useCreateFeatureUsageScenarioCodingAutomatedCriterion = (
  refetchQueries?: PureQueryOptions[]
): UseCreateFeatureUsageScenarioCodingAutomatedCriterionHook => {
  const [createFeatureUsageScenarioCodingAutomatedCriterion, {loading}] = useMutation<
    CreateFeatureUsageScenarioCodingAutomatedCriterionMutation,
    CreateFeatureUsageScenarioCodingAutomatedCriterionMutationVariables
  >(createFeatureUsageScenarioCodingAutomatedCriterionMutation, {refetchQueries})

  return {
    createFeatureUsageScenarioCodingAutomatedCriterion: (
      creation: FeatureUsageScenarioCodingAutomatedCriterionCreation
    ) =>
      new Promise<Option<FeatureUsageScenarioCodingAutomatedCriterion>>((resolve, reject) => {
        createFeatureUsageScenarioCodingAutomatedCriterion({
          variables: {creation}
        })
          .then(result =>
            resolve(
              Option.of(
                result?.data
                  ?.createFeatureUsageScenarioCodingAutomatedCriterion as FeatureUsageScenarioCodingAutomatedCriterion
              )
            )
          )
          .catch(reject)
      }),
    createFeatureUsageScenarioCodingAutomatedCriterionLoading: loading
  }
}
