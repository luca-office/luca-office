/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteFreetextQuestionRatingCriterionSelectionMutation
// ====================================================

export interface DeleteFreetextQuestionRatingCriterionSelectionMutation_deleteFreetextQuestionRatingCriterionSelection {
  __typename: "FreetextQuestionRatingCriterionSelection";
  createdAt: string;
  freetextQuestionRatingId: string;
  criterionId: string;
}

export interface DeleteFreetextQuestionRatingCriterionSelectionMutation {
  deleteFreetextQuestionRatingCriterionSelection: DeleteFreetextQuestionRatingCriterionSelectionMutation_deleteFreetextQuestionRatingCriterionSelection;
}

export interface DeleteFreetextQuestionRatingCriterionSelectionMutationVariables {
  freetextQuestionRatingId: string;
  criterionId: string;
}
