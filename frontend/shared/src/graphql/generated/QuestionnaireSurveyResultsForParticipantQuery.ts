/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuestionnaireSurveyResultsForParticipantQuery
// ====================================================

export interface QuestionnaireSurveyResultsForParticipantQuery_questionnaireSurveyResultsForParticipant_questionResults {
  __typename: "ParticipantQuestionSurveyResult";
  questionId: string;
  score: number;
  maximumScore: number;
  averageScore: number;
  selectedAnswerIds: string[];
  selectedCriteriaIds: string[];
  noCriterionFulfilled: boolean;
  freetextAnswer: string;
}

export interface QuestionnaireSurveyResultsForParticipantQuery_questionnaireSurveyResultsForParticipant {
  __typename: "ParticipantQuestionnaireSurveyResult";
  surveyInvitationId: string;
  questionnaireId: string;
  questionResults: QuestionnaireSurveyResultsForParticipantQuery_questionnaireSurveyResultsForParticipant_questionResults[];
}

export interface QuestionnaireSurveyResultsForParticipantQuery {
  questionnaireSurveyResultsForParticipant: QuestionnaireSurveyResultsForParticipantQuery_questionnaireSurveyResultsForParticipant;
}

export interface QuestionnaireSurveyResultsForParticipantQueryVariables {
  surveyId: string;
  surveyInvitationId: string;
  questionnaireId: string;
}
