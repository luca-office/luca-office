/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuestionnaireSurveyResultsForParticipantsQuery
// ====================================================

export interface QuestionnaireSurveyResultsForParticipantsQuery_questionnaireSurveyResultsForParticipants_questionResults {
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

export interface QuestionnaireSurveyResultsForParticipantsQuery_questionnaireSurveyResultsForParticipants {
  __typename: "ParticipantQuestionnaireSurveyResult";
  surveyInvitationId: string;
  questionnaireId: string;
  questionResults: QuestionnaireSurveyResultsForParticipantsQuery_questionnaireSurveyResultsForParticipants_questionResults[];
}

export interface QuestionnaireSurveyResultsForParticipantsQuery {
  questionnaireSurveyResultsForParticipants: QuestionnaireSurveyResultsForParticipantsQuery_questionnaireSurveyResultsForParticipants[];
}

export interface QuestionnaireSurveyResultsForParticipantsQueryVariables {
  surveyId: string;
  questionnaireId: string;
}
