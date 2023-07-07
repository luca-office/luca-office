import {PureQueryOptions, useMutation} from "@apollo/client"
import {InputValueScenarioCodingAutomatedCriterion} from "../../../../../models"
import {Option} from "../../../../../utils"
import {
  CreateInputValueScenarioCodingAutomatedCriterionMutation,
  CreateInputValueScenarioCodingAutomatedCriterionMutationVariables
} from "../../../../generated/CreateInputValueScenarioCodingAutomatedCriterionMutation"
import {InputValueScenarioCodingAutomatedCriterionCreation} from "../../../../generated/globalTypes"
import {createInputValueScenarioCodingAutomatedCriterionMutation} from "../../../../mutations"

export interface UseCreateInputValueScenarioCodingAutomatedCriterionHook {
  readonly createInputValueScenarioCodingAutomatedCriterion: (
    creation: InputValueScenarioCodingAutomatedCriterionCreation
  ) => Promise<Option<InputValueScenarioCodingAutomatedCriterion>>
  readonly createInputValueScenarioCodingAutomatedCriterionLoading: boolean
}

export const useCreateInputValueScenarioCodingAutomatedCriterion = (
  refetchQueries?: PureQueryOptions[]
): UseCreateInputValueScenarioCodingAutomatedCriterionHook => {
  const [createInputValueScenarioCodingAutomatedCriterion, {loading}] = useMutation<
    CreateInputValueScenarioCodingAutomatedCriterionMutation,
    CreateInputValueScenarioCodingAutomatedCriterionMutationVariables
  >(createInputValueScenarioCodingAutomatedCriterionMutation, {refetchQueries})

  return {
    createInputValueScenarioCodingAutomatedCriterion: (creation: InputValueScenarioCodingAutomatedCriterionCreation) =>
      new Promise<Option<InputValueScenarioCodingAutomatedCriterion>>((resolve, reject) => {
        createInputValueScenarioCodingAutomatedCriterion({
          variables: {creation}
        })
          .then(result =>
            resolve(
              Option.of(
                result?.data
                  ?.createInputValueScenarioCodingAutomatedCriterion as InputValueScenarioCodingAutomatedCriterion
              )
            )
          )
          .catch(reject)
      }),
    createInputValueScenarioCodingAutomatedCriterionLoading: loading
  }
}
