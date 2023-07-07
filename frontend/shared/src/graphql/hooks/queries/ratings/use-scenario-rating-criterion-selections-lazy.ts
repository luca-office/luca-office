import {useLazyQuery} from "@apollo/client"
import {ScenarioRatingCriterionSelection} from "../../../../models"
import {
  ScenarioRatingCriterionSelectionsQuery,
  ScenarioRatingCriterionSelectionsQueryVariables
} from "../../../generated/ScenarioRatingCriterionSelectionsQuery"
import {scenarioRatingCriterionSelectionsQuery} from "../../../queries"

export interface UseScenarioRatingCriterionSelectionsLazyHook {
  readonly scenarioRatingCriterionSelections: ScenarioRatingCriterionSelection[]
  readonly scenarioRatingCriterionSelectionsLoading: boolean
  readonly getScenarioRatingCriterionSelections: (scenarioCodingItemRatingId: UUID) => void
}

export const useScenarioRatingCriterionSelectionsLazy = (): UseScenarioRatingCriterionSelectionsLazyHook => {
  const [getScenarioRatingCriterionSelections, {data, loading}] = useLazyQuery<
    ScenarioRatingCriterionSelectionsQuery,
    ScenarioRatingCriterionSelectionsQueryVariables
  >(scenarioRatingCriterionSelectionsQuery)

  return {
    scenarioRatingCriterionSelections: data?.scenarioRatingCriterionSelections ?? [],
    scenarioRatingCriterionSelectionsLoading: loading,
    getScenarioRatingCriterionSelections: (scenarioCodingItemRatingId: UUID) =>
      getScenarioRatingCriterionSelections({variables: {scenarioCodingItemRatingId}})
  }
}
