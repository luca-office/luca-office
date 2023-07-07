/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RuntimeSurveyResultsQuery
// ====================================================

export interface RuntimeSurveyResultsQuery_runtimeSurveyResults_questionResults_answerSelections {
  __typename: "RuntimeSurveyAnswerSelection";
  answerId: string | null;
  isFreetextAnswer: boolean;
  selectionsCount: number;
  selectionsAsPercent: number;
}

export interface RuntimeSurveyResultsQuery_runtimeSurveyResults_questionResults_participantResults {
  __typename: "RuntimeSurveyParticipantResult";
  invitationId: string;
  selectedAnswerIds: string[];
  wasFreetextAnswerSelected: boolean;
}

export interface RuntimeSurveyResultsQuery_runtimeSurveyResults_questionResults {
  __typename: "RuntimeSurveyQuestionResult";
  questionId: string;
  answerSelections: RuntimeSurveyResultsQuery_runtimeSurveyResults_questionResults_answerSelections[];
  participantResults: RuntimeSurveyResultsQuery_runtimeSurveyResults_questionResults_participantResults[];
}

export interface RuntimeSurveyResultsQuery_runtimeSurveyResults {
  __typename: "RuntimeSurveyResult";
  questionnaireId: string;
  participantIds: string[];
  completedParticipantIds: string[];
  questionResults: RuntimeSurveyResultsQuery_runtimeSurveyResults_questionResults[];
}

export interface RuntimeSurveyResultsQuery {
  runtimeSurveyResults: RuntimeSurveyResultsQuery_runtimeSurveyResults[];
}

export interface RuntimeSurveyResultsQueryVariables {
  surveyId: string;
  scenarioId: string;
}
