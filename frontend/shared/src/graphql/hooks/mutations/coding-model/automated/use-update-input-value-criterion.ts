import {PureQueryOptions, useMutation} from "@apollo/client"
import {InputValueScenarioCodingAutomatedCriterion} from "../../../../../models"
import {Option} from "../../../../../utils"
import {InputValueScenarioCodingAutomatedCriterionUpdate} from "../../../../generated/globalTypes"
import {
  UpdateInputValueScenarioCodingAutomatedCriterionMutation,
  UpdateInputValueScenarioCodingAutomatedCriterionMutationVariables
} from "../../../../generated/UpdateInputValueScenarioCodingAutomatedCriterionMutation"
import {updateInputValueScenarioCodingAutomatedCriterionMutation} from "../../../../mutations"

export interface UseUpdateInputValueScenarioCodingAutomatedCriterionHook {
  readonly updateInputValueScenarioCodingAutomatedCriterion: (
    id: UUID,
    update: InputValueScenarioCodingAutomatedCriterionUpdate
  ) => Promise<Option<InputValueScenarioCodingAutomatedCriterion>>
  readonly updateInputValueScenarioCodingAutomatedCriterionLoading: boolean
}

export const useUpdateInputValueScenarioCodingAutomatedCriterion = (
  refetchQueries?: PureQueryOptions[]
): UseUpdateInputValueScenarioCodingAutomatedCriterionHook => {
  const [updateInputValueScenarioCodingAutomatedCriterion, {loading}] = useMutation<
    UpdateInputValueScenarioCodingAutomatedCriterionMutation,
    UpdateInputValueScenarioCodingAutomatedCriterionMutationVariables
  >(updateInputValueScenarioCodingAutomatedCriterionMutation, {refetchQueries})

  return {
    updateInputValueScenarioCodingAutomatedCriterion: (
      id: UUID,
      update: InputValueScenarioCodingAutomatedCriterionUpdate
    ) =>
      new Promise<Option<InputValueScenarioCodingAutomatedCriterion>>((resolve, reject) => {
        updateInputValueScenarioCodingAutomatedCriterion({
          variables: {id, update}
        })
          .then(result =>
            resolve(
              Option.of<InputValueScenarioCodingAutomatedCriterion>(
                result?.data
                  ?.updateInputValueScenarioCodingAutomatedCriterion as InputValueScenarioCodingAutomatedCriterion
              )
            )
          )
          .catch(reject)
      }),
    updateInputValueScenarioCodingAutomatedCriterionLoading: loading
  }
}
