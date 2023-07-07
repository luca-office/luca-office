import {
  RuntimeSurveyResultFragment,
  RuntimeSurveyResultFragment_questionResults,
  RuntimeSurveyResultFragment_questionResults_answerSelections,
  RuntimeSurveyResultFragment_questionResults_participantResults
} from "../generated/RuntimeSurveyResultFragment"

export const runtimeSurveyQuestionAnswerSelection: RuntimeSurveyResultFragment_questionResults_answerSelections = {
  __typename: "RuntimeSurveyAnswerSelection",
  answerId: "1",
  isFreetextAnswer: false,
  selectionsCount: 1,
  selectionsAsPercent: 25
}

export const runtimeSurveyQuestionParticipantResult: RuntimeSurveyResultFragment_questionResults_participantResults = {
  __typename: "RuntimeSurveyParticipantResult",
  invitationId: "123",
  selectedAnswerIds: [runtimeSurveyQuestionAnswerSelection.answerId!],
  wasFreetextAnswerSelected: false
}

export const runtimeSurveyQuestionResultsMock: RuntimeSurveyResultFragment_questionResults = {
  __typename: "RuntimeSurveyQuestionResult",
  questionId: "1234",
  answerSelections: [runtimeSurveyQuestionAnswerSelection],
  participantResults: [runtimeSurveyQuestionParticipantResult]
}

export const runtimeSurveyResultsMock: RuntimeSurveyResultFragment = {
  __typename: "RuntimeSurveyResult",
  questionnaireId: "345",
  participantIds: ["123"],
  completedParticipantIds: [],
  questionResults: [runtimeSurveyQuestionResultsMock]
}
