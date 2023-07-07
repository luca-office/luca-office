/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: RuntimeSurveyQuestionResultFragment
// ====================================================

export interface RuntimeSurveyQuestionResultFragment_answerSelections {
  __typename: "RuntimeSurveyAnswerSelection";
  answerId: string | null;
  isFreetextAnswer: boolean;
  selectionsCount: number;
  selectionsAsPercent: number;
}

export interface RuntimeSurveyQuestionResultFragment_participantResults {
  __typename: "RuntimeSurveyParticipantResult";
  invitationId: string;
  selectedAnswerIds: string[];
  wasFreetextAnswerSelected: boolean;
}

export interface RuntimeSurveyQuestionResultFragment {
  __typename: "RuntimeSurveyQuestionResult";
  questionId: string;
  answerSelections: RuntimeSurveyQuestionResultFragment_answerSelections[];
  participantResults: RuntimeSurveyQuestionResultFragment_participantResults[];
}
