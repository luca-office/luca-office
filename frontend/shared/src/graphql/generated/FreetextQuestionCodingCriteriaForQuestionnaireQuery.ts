/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FreetextQuestionCodingCriteriaForQuestionnaireQuery
// ====================================================

export interface FreetextQuestionCodingCriteriaForQuestionnaireQuery_freetextQuestionCodingCriteriaForQuestionnaire {
  __typename: "FreetextQuestionCodingCriterion";
  id: string;
  createdAt: string;
  modifiedAt: string;
  description: string;
  score: number;
  questionId: string;
}

export interface FreetextQuestionCodingCriteriaForQuestionnaireQuery {
  freetextQuestionCodingCriteriaForQuestionnaire: FreetextQuestionCodingCriteriaForQuestionnaireQuery_freetextQuestionCodingCriteriaForQuestionnaire[];
}

export interface FreetextQuestionCodingCriteriaForQuestionnaireQueryVariables {
  questionnaireId: string;
}
