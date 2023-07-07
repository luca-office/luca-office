/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FreetextAnswersForQuestionnaireQuery
// ====================================================

export interface FreetextAnswersForQuestionnaireQuery_freetextAnswersForQuestionnaire {
  __typename: "FreetextAnswer";
  surveyInvitationId: string;
  questionnaireId: string;
  questionId: string;
  text: string;
}

export interface FreetextAnswersForQuestionnaireQuery {
  freetextAnswersForQuestionnaire: FreetextAnswersForQuestionnaireQuery_freetextAnswersForQuestionnaire[];
}

export interface FreetextAnswersForQuestionnaireQueryVariables {
  questionnaireId: string;
  surveyId: string;
}
