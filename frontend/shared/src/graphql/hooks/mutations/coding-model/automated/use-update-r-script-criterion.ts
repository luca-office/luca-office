import {PureQueryOptions, useMutation} from "@apollo/client"
import {RScriptScenarioCodingAutomatedCriterion} from "../../../../../models"
import {Option} from "../../../../../utils"
import {RScriptScenarioCodingAutomatedCriterionUpdate} from "../../../../generated/globalTypes"
import {
  UpdateRScriptScenarioCodingAutomatedCriterionMutation,
  UpdateRScriptScenarioCodingAutomatedCriterionMutationVariables
} from "../../../../generated/UpdateRScriptScenarioCodingAutomatedCriterionMutation"
import {updateRScriptScenarioCodingAutomatedCriterionMutation} from "../../../../mutations"

export interface UseUpdateRScriptScenarioCodingAutomatedCriterionHook {
  readonly updateRScriptScenarioCodingAutomatedCriterion: (
    id: UUID,
    update: RScriptScenarioCodingAutomatedCriterionUpdate
  ) => Promise<Option<RScriptScenarioCodingAutomatedCriterion>>
  readonly updateRScriptScenarioCodingAutomatedCriterionLoading: boolean
}

export const useUpdateRScriptScenarioCodingAutomatedCriterion = (
  refetchQueries?: PureQueryOptions[]
): UseUpdateRScriptScenarioCodingAutomatedCriterionHook => {
  const [updateRScriptScenarioCodingAutomatedCriterion, {loading}] = useMutation<
    UpdateRScriptScenarioCodingAutomatedCriterionMutation,
    UpdateRScriptScenarioCodingAutomatedCriterionMutationVariables
  >(updateRScriptScenarioCodingAutomatedCriterionMutation, {refetchQueries})

  return {
    updateRScriptScenarioCodingAutomatedCriterion: (id: UUID, update: RScriptScenarioCodingAutomatedCriterionUpdate) =>
      new Promise<Option<RScriptScenarioCodingAutomatedCriterion>>((resolve, reject) => {
        updateRScriptScenarioCodingAutomatedCriterion({
          variables: {id, update}
        })
          .then(result =>
            resolve(
              Option.of<RScriptScenarioCodingAutomatedCriterion>(
                result?.data?.updateRScriptScenarioCodingAutomatedCriterion as RScriptScenarioCodingAutomatedCriterion
              )
            )
          )
          .catch(reject)
      }),
    updateRScriptScenarioCodingAutomatedCriterionLoading: loading
  }
}
