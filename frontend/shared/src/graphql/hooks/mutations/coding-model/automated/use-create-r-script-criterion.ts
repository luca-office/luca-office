import {PureQueryOptions, useMutation} from "@apollo/client"
import {RScriptScenarioCodingAutomatedCriterion} from "../../../../../models"
import {Option} from "../../../../../utils"
import {
  CreateRScriptScenarioCodingAutomatedCriterionMutation,
  CreateRScriptScenarioCodingAutomatedCriterionMutationVariables
} from "../../../../generated/CreateRScriptScenarioCodingAutomatedCriterionMutation"
import {RScriptScenarioCodingAutomatedCriterionCreation} from "../../../../generated/globalTypes"
import {createRScriptcenarioCodingAutomatedCriterionMutation} from "../../../../mutations"

export interface UseCreateRScriptScenarioCodingAutomatedCriterionHook {
  readonly createRScriptScenarioCodingAutomatedCriterion: (
    creation: RScriptScenarioCodingAutomatedCriterionCreation
  ) => Promise<Option<RScriptScenarioCodingAutomatedCriterion>>
  readonly createRScriptScenarioCodingAutomatedCriterionLoading: boolean
}

export const useCreateRScriptScenarioCodingAutomatedCriterion = (
  refetchQueries?: PureQueryOptions[]
): UseCreateRScriptScenarioCodingAutomatedCriterionHook => {
  const [createRScriptScenarioCodingAutomatedCriterion, {loading}] = useMutation<
    CreateRScriptScenarioCodingAutomatedCriterionMutation,
    CreateRScriptScenarioCodingAutomatedCriterionMutationVariables
  >(createRScriptcenarioCodingAutomatedCriterionMutation, {refetchQueries})

  return {
    createRScriptScenarioCodingAutomatedCriterion: (creation: RScriptScenarioCodingAutomatedCriterionCreation) =>
      new Promise<Option<RScriptScenarioCodingAutomatedCriterion>>((resolve, reject) => {
        createRScriptScenarioCodingAutomatedCriterion({
          variables: {creation}
        })
          .then(result =>
            resolve(
              Option.of(
                result?.data?.createRScriptScenarioCodingAutomatedCriterion as RScriptScenarioCodingAutomatedCriterion
              )
            )
          )
          .catch(reject)
      }),
    createRScriptScenarioCodingAutomatedCriterionLoading: loading
  }
}
