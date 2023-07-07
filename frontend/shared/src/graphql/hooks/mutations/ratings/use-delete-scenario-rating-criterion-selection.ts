import {useMutation} from "@apollo/client"
import {ScenarioRatingCriterionSelection} from "../../../../models"
import {isDefined, Option} from "../../../../utils"
import {deleteEntityFromCache} from "../../../cache"
import {
  DeleteScenarioRatingCriterionSelectionMutation,
  DeleteScenarioRatingCriterionSelectionMutationVariables
} from "../../../generated/DeleteScenarioRatingCriterionSelectionMutation"
import {
  ScenarioRatingCriterionSelectionsQuery,
  ScenarioRatingCriterionSelectionsQueryVariables
} from "../../../generated/ScenarioRatingCriterionSelectionsQuery"
import {deleteScenarioRatingCriterionSelectionMutation} from "../../../mutations"
import {scenarioRatingCriterionSelectionsQuery} from "../../../queries"

interface DeleteScenarioRatingCriterionSelectionParams {
  readonly scenarioCodingItemRatingId: UUID
  readonly manualCriterionId?: string | null
  readonly automatedCriterionId?: string | null
}

export interface UseDeleteScenarioRatingCriterionSelectionHook {
  readonly deleteScenarioRatingCriterionSelection: (
    params: DeleteScenarioRatingCriterionSelectionParams
  ) => Promise<Option<ScenarioRatingCriterionSelection>>
  readonly deleteScenarioRatingCriterionSelectionLoading: boolean
}

export const useDeleteScenarioRatingCriterionSelection = (): UseDeleteScenarioRatingCriterionSelectionHook => {
  const [deleteScenarioRatingCriterionSelection, {loading}] = useMutation<
    DeleteScenarioRatingCriterionSelectionMutation,
    DeleteScenarioRatingCriterionSelectionMutationVariables
  >(deleteScenarioRatingCriterionSelectionMutation)

  return {
    deleteScenarioRatingCriterionSelection: ({
      scenarioCodingItemRatingId,
      manualCriterionId,
      automatedCriterionId
    }: DeleteScenarioRatingCriterionSelectionParams) =>
      new Promise<Option<ScenarioRatingCriterionSelection>>((resolve, reject) => {
        deleteScenarioRatingCriterionSelection({
          variables: {scenarioCodingItemRatingId, manualCriterionId, automatedCriterionId},
          update: deleteEntityFromCache<
            ScenarioRatingCriterionSelectionsQuery,
            DeleteScenarioRatingCriterionSelectionMutation,
            ScenarioRatingCriterionSelectionsQueryVariables,
            ScenarioRatingCriterionSelection
          >(
            scenarioRatingCriterionSelectionsQuery,
            "scenarioRatingCriterionSelections",
            scenarioRatingCriterionSelection =>
              scenarioRatingCriterionSelection.scenarioCodingItemRatingId !== scenarioCodingItemRatingId &&
              ((isDefined(manualCriterionId) &&
                scenarioRatingCriterionSelection.manualCriterionId === manualCriterionId) ||
                (isDefined(automatedCriterionId) &&
                  scenarioRatingCriterionSelection.automatedCriterionId === automatedCriterionId)),
            {scenarioCodingItemRatingId}
          )
        })
          .then(result => resolve(Option.of(result.data?.deleteScenarioRatingCriterionSelection)))
          .catch(reject)
      }),
    deleteScenarioRatingCriterionSelectionLoading: loading
  }
}
