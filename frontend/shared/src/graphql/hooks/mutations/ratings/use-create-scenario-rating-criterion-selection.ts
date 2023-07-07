import {useMutation} from "@apollo/client"
import {ScenarioRatingCriterionSelection} from "../../../../models"
import {Option} from "../../../../utils"
import {createEntityInCache} from "../../../cache"
import {
  CreateScenarioRatingCriterionSelectionMutation,
  CreateScenarioRatingCriterionSelectionMutationVariables
} from "../../../generated/CreateScenarioRatingCriterionSelectionMutation"
import {ScenarioRatingCriterionSelectionCreation} from "../../../generated/globalTypes"
import {
  ScenarioRatingCriterionSelectionsQuery,
  ScenarioRatingCriterionSelectionsQueryVariables
} from "../../../generated/ScenarioRatingCriterionSelectionsQuery"
import {createScenarioRatingCriterionSelectionMutation} from "../../../mutations"
import {scenarioRatingCriterionSelectionsQuery} from "../../../queries"

export interface UseCreateScenarioRatingCriterionSelectionHook {
  readonly createScenarioRatingCriterionSelection: (
    creation: ScenarioRatingCriterionSelectionCreation
  ) => Promise<Option<ScenarioRatingCriterionSelection>>
  readonly createScenarioRatingCriterionSelectionLoading: boolean
}

export const useCreateScenarioRatingCriterionSelection = (): UseCreateScenarioRatingCriterionSelectionHook => {
  const [createScenarioRatingCriterionSelection, {loading}] = useMutation<
    CreateScenarioRatingCriterionSelectionMutation,
    CreateScenarioRatingCriterionSelectionMutationVariables
  >(createScenarioRatingCriterionSelectionMutation)

  return {
    createScenarioRatingCriterionSelection: (creation: ScenarioRatingCriterionSelectionCreation) =>
      new Promise<Option<ScenarioRatingCriterionSelection>>((resolve, reject) => {
        createScenarioRatingCriterionSelection({
          variables: {creation},
          update: createEntityInCache<
            ScenarioRatingCriterionSelectionsQuery,
            CreateScenarioRatingCriterionSelectionMutation,
            ScenarioRatingCriterionSelectionsQueryVariables
          >(
            scenarioRatingCriterionSelectionsQuery,
            "scenarioRatingCriterionSelections",
            query => query.scenarioRatingCriterionSelections,
            "createScenarioRatingCriterionSelection",
            {scenarioCodingItemRatingId: creation.scenarioCodingItemRatingId}
          )
        })
          .then(result => resolve(Option.of(result.data?.createScenarioRatingCriterionSelection)))
          .catch(reject)
      }),
    createScenarioRatingCriterionSelectionLoading: loading
  }
}
