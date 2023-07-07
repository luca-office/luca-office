/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ScenarioRatingCriterionSelectionsQuery
// ====================================================

export interface ScenarioRatingCriterionSelectionsQuery_scenarioRatingCriterionSelections {
  __typename: "ScenarioRatingCriterionSelection";
  createdAt: string;
  manualCriterionId: string | null;
  automatedCriterionId: string | null;
  scenarioCodingItemRatingId: string;
}

export interface ScenarioRatingCriterionSelectionsQuery {
  scenarioRatingCriterionSelections: ScenarioRatingCriterionSelectionsQuery_scenarioRatingCriterionSelections[];
}

export interface ScenarioRatingCriterionSelectionsQueryVariables {
  scenarioCodingItemRatingId: string;
}
