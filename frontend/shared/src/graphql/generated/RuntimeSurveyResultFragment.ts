/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RuntimeSurveyResultFragment
// ====================================================

export interface RuntimeSurveyResultFragment_questionResults_answerSelections {
  __typename: "RuntimeSurveyAnswerSelection";
  answerId: string | null;
  isFreetextAnswer: boolean;
  selectionsCount: number;
  selectionsAsPercent: number;
}

export interface RuntimeSurveyResultFragment_questionResults_participantResults {
  __typename: "RuntimeSurveyParticipantResult";
  invitationId: string;
  selectedAnswerIds: string[];
  wasFreetextAnswerSelected: boolean;
}

export interface RuntimeSurveyResultFragment_questionResults {
  __typename: "RuntimeSurveyQuestionResult";
  questionId: string;
  answerSelections: RuntimeSurveyResultFragment_questionResults_answerSelections[];
  participantResults: RuntimeSurveyResultFragment_questionResults_participantResults[];
}

export interface RuntimeSurveyResultFragment {
  __typename: "RuntimeSurveyResult";
  questionnaireId: string;
  participantIds: string[];
  completedParticipantIds: string[];
  questionResults: RuntimeSurveyResultFragment_questionResults[];
}
