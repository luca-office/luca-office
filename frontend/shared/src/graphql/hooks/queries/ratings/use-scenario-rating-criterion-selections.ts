import {useQuery} from "@apollo/client"
import {ScenarioRatingCriterionSelection} from "../../../../models"
import {
  ScenarioRatingCriterionSelectionsQuery,
  ScenarioRatingCriterionSelectionsQueryVariables
} from "../../../generated/ScenarioRatingCriterionSelectionsQuery"
import {scenarioRatingCriterionSelectionsQuery} from "../../../queries"

export interface UseScenarioRatingCriterionSelectionsHook {
  readonly scenarioRatingCriterionSelections: ScenarioRatingCriterionSelection[]
  readonly scenarioRatingCriterionSelectionsLoading: boolean
}

export const useScenarioRatingCriterionSelections = (
  scenarioCodingItemRatingId: UUID
): UseScenarioRatingCriterionSelectionsHook => {
  const {data, loading} = useQuery<
    ScenarioRatingCriterionSelectionsQuery,
    ScenarioRatingCriterionSelectionsQueryVariables
  >(scenarioRatingCriterionSelectionsQuery, {variables: {scenarioCodingItemRatingId}})

  return {
    scenarioRatingCriterionSelections: data?.scenarioRatingCriterionSelections ?? [],
    scenarioRatingCriterionSelectionsLoading: loading
  }
}
