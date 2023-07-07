import {
  EndQuestionnareEventPayload,
  QuestionnaireBinaryFileEventPayload,
  QuestionnaireQuestionBinaryFileEventPayload
} from "."

export interface QuestionnaireSurveyEvents {
  readonly sendStartQuestionnaire: (questionnaireId: UUID) => void
  readonly sendResumeQuestionnaire: (questionnaireId: UUID) => void
  readonly sendEndQuestionnaire: (questionnaireId: UUID, payload: EndQuestionnareEventPayload) => void
  readonly sendStartEvent: (questionnaireId: UUID) => void
  readonly sendEndEvent: (questionnaireId: UUID) => void
  readonly sendPlayQuestionnaireQuestionVideo: (
    questionnaireId: UUID,
    payload: QuestionnaireQuestionBinaryFileEventPayload
  ) => void
  readonly sendQuestionnaireQuestionVideoPlaybackEnded: (
    questionnaireId: UUID,
    payload: QuestionnaireQuestionBinaryFileEventPayload
  ) => void
  readonly sendPauseQuestionnaireQuestionVideo: (
    questionnaireId: UUID,
    payload: QuestionnaireQuestionBinaryFileEventPayload
  ) => void
  readonly sendPlayQuestionnaireVideo: (questionnaireId: UUID, payload: QuestionnaireBinaryFileEventPayload) => void
  readonly sendQuestionnaireVideoPlaybackEnded: (
    questionnaireId: UUID,
    payload: QuestionnaireBinaryFileEventPayload
  ) => void
  readonly sendPauseQuestionnaireVideo: (questionnaireId: UUID, payload: QuestionnaireBinaryFileEventPayload) => void
  readonly sendSelectQuestionnaireAnswer: (
    questionnaireId: UUID,
    questionId: UUID,
    answerId: UUID,
    questionPosition: number,
    answerPosition: number,
    value: string
  ) => void
  readonly sendDeselectQuestionnaireAnswer: (
    questionnaireId: UUID,
    questionId: UUID,
    answerId: UUID,
    questionPosition: number,
    answerPosition: number,
    value: string
  ) => void
  readonly sendUpdateQuestionnaireFreeTextAnswer: (
    questionnaireId: UUID,
    questionId: UUID,
    text: string,
    questionPosition: number,
    answerPosition?: number
  ) => void
  readonly sendEnterFullscreenQuestionnaireVideo: (
    questionnaireId: UUID,
    payload: QuestionnaireBinaryFileEventPayload
  ) => void
  readonly sendLeaveFullscreenQuestionnaireVideo: (
    questionnaireId: UUID,
    payload: QuestionnaireBinaryFileEventPayload
  ) => void
  readonly sendLeaveFullscreenQuestionnaireQuestionVideo: (
    questionnaireId: UUID,
    payload: QuestionnaireQuestionBinaryFileEventPayload
  ) => void
  readonly sendEnterFullscreenQuestionnaireQuestionVideo: (
    questionnaireId: UUID,
    payload: QuestionnaireQuestionBinaryFileEventPayload
  ) => void
  readonly sendShrinkQuestionnaireQuestionBinary: (
    questionnaireId: UUID,
    payload: QuestionnaireQuestionBinaryFileEventPayload
  ) => void
  readonly sendEnlargeQuestionnaireQuestionBinary: (
    questionnaireId: UUID,
    payload: QuestionnaireQuestionBinaryFileEventPayload
  ) => void
  readonly sendShrinkQuestionnaireBinary: (questionnaireId: UUID, payload: QuestionnaireBinaryFileEventPayload) => void
  readonly sendEnlargeQuestionnaireBinary: (questionnaireId: UUID, payload: QuestionnaireBinaryFileEventPayload) => void
  readonly sendSelectQuestionnaireFreeTextAnswer: (
    questionnaireId: UUID,
    questionId: UUID,
    questionPosition: number,
    answerPosition: number,
    value: string
  ) => void
  readonly sendDeselectQuestionnaireFreeTextAnswer: (
    questionnaireId: UUID,
    questionId: UUID,
    questionPosition: number,
    answerPosition: number,
    value: string
  ) => void
}
