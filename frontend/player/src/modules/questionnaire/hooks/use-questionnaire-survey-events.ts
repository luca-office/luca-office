import {useDispatch} from "react-redux"
import {
  EndQuestionnareEventPayload,
  QuestionnaireBinaryFileEventPayload,
  QuestionnaireQuestionBinaryFileEventPayload,
  QuestionnaireSurveyEvents
} from "shared/models"
import {
  sendDeselectQuestionnaireAnswerEvent,
  sendDeselectQuestionnaireFreeTextAnswerEvent,
  sendEndEventEvent,
  sendEndQuestionnaireEvent,
  sendEnlargeQuestionnaireBinaryEvent,
  sendEnlargeQuestionnaireQuestionBinaryEvent,
  sendEnterFullscreenQuestionnaireQuestionVideoEvent,
  sendEnterFullscreenQuestionnaireVideoEvent,
  sendLeaveFullscreenQuestionnaireQuestionVideoEvent,
  sendLeaveFullscreenQuestionnaireVideoEvent,
  sendPauseQuestionnaireQuestionVideoEvent,
  sendPauseQuestionnaireVideoEvent,
  sendPlayQuestionnaireQuestionVideoEvent,
  sendPlayQuestionnaireVideoEvent,
  sendQuestionnaireQuestionVideoPlaybackEndedEvent,
  sendQuestionnaireVideoPlaybackEndedEvent,
  sendResumeQuestionnaireEvent,
  sendSelectQuestionnaireAnswerEvent,
  sendSelectQuestionnaireFreeTextAnswerEvent,
  sendShrinkQuestionnaireBinaryEvent,
  sendShrinkQuestionnaireQuestionBinaryEvent,
  sendStartEventEvent,
  sendStartQuestionnaireEvent,
  sendUpdateQuestionnaireFreeTextAnswerEvent
} from "shared/utils"
import {useGetSurveyInvitationFromRedux} from "../../../hooks/use-get-survey-invitation"

export const useQuestionnaireSurveyEvents = (scenarioId?: UUID): QuestionnaireSurveyEvents => {
  const {invitationIdOption, surveyIdOption} = useGetSurveyInvitationFromRedux()

  const dispatch = useDispatch()

  const withSurveyParams = (handler: (surveyId: UUID, invitationId: UUID, scenarioId?: UUID) => void) =>
    surveyIdOption.forEach(surveyId =>
      invitationIdOption.forEach(invitationId => handler(surveyId, invitationId, scenarioId))
    )

  const sendStartQuestionnaire = (questionnaireId: UUID) =>
    withSurveyParams(sendStartQuestionnaireEvent(questionnaireId))

  const sendResumeQuestionnaire = (questionnaireId: UUID) =>
    withSurveyParams(sendResumeQuestionnaireEvent(questionnaireId))

  const sendQuestionnaireQuestionVideoPlaybackEnded = (
    questionnaireId: UUID,
    payload: QuestionnaireQuestionBinaryFileEventPayload
  ) => withSurveyParams(sendQuestionnaireQuestionVideoPlaybackEndedEvent(questionnaireId, payload))

  const sendPlayQuestionnaireQuestionVideo = (
    questionnaireId: UUID,
    payload: QuestionnaireQuestionBinaryFileEventPayload
  ) => withSurveyParams(sendPlayQuestionnaireQuestionVideoEvent(questionnaireId, payload))

  const sendSelectQuestionnaireAnswer = (
    questionnaireId: UUID,
    questionId: UUID,
    answerId: UUID,
    questionPosition: number,
    answerPosition: number,
    value: string
  ) =>
    withSurveyParams(
      sendSelectQuestionnaireAnswerEvent(dispatch)(
        questionnaireId,
        questionId,
        answerId,
        questionPosition,
        answerPosition,
        value
      )
    )

  const sendDeselectQuestionnaireAnswer = (
    questionnaireId: UUID,
    questionId: UUID,
    answerId: UUID,
    questionPosition: number,
    answerPosition: number,
    value: string
  ) =>
    withSurveyParams(
      sendDeselectQuestionnaireAnswerEvent(dispatch)(
        questionnaireId,
        questionId,
        answerId,
        questionPosition,
        answerPosition,
        value
      )
    )

  const sendUpdateQuestionnaireFreeTextAnswer = (
    questionnaireId: UUID,
    questionId: UUID,
    text: string,
    questionPosition: number,
    answerPosition?: number
  ) =>
    withSurveyParams(
      sendUpdateQuestionnaireFreeTextAnswerEvent(questionnaireId, questionId, text, questionPosition, answerPosition)
    )

  const sendEnterFullscreenQuestionnaireQuestionVideo = (
    questionnaireId: UUID,
    payload: QuestionnaireQuestionBinaryFileEventPayload
  ) => withSurveyParams(sendEnterFullscreenQuestionnaireQuestionVideoEvent(questionnaireId, payload))

  const sendLeaveFullscreenQuestionnaireQuestionVideo = (
    questionnaireId: UUID,
    payload: QuestionnaireQuestionBinaryFileEventPayload
  ) => withSurveyParams(sendLeaveFullscreenQuestionnaireQuestionVideoEvent(questionnaireId, payload))

  const sendEnlargeQuestionnaireQuestionBinary = (
    questionnaireId: UUID,
    payload: QuestionnaireQuestionBinaryFileEventPayload
  ) => withSurveyParams(sendEnlargeQuestionnaireQuestionBinaryEvent(questionnaireId, payload))

  const sendShrinkQuestionnaireQuestionBinary = (
    questionnaireId: UUID,
    payload: QuestionnaireQuestionBinaryFileEventPayload
  ) => withSurveyParams(sendShrinkQuestionnaireQuestionBinaryEvent(questionnaireId, payload))

  const sendPauseQuestionnaireQuestionVideo = (
    questionnaireId: UUID,
    payload: QuestionnaireQuestionBinaryFileEventPayload
  ) => withSurveyParams(sendPauseQuestionnaireQuestionVideoEvent(questionnaireId, payload))

  const sendShrinkQuestionnaireBinary = (questionnaireId: UUID, payload: QuestionnaireBinaryFileEventPayload) =>
    withSurveyParams(sendShrinkQuestionnaireBinaryEvent(questionnaireId, payload))

  const sendEnlargeQuestionnaireBinary = (questionnaireId: UUID, payload: QuestionnaireBinaryFileEventPayload) =>
    withSurveyParams(sendEnlargeQuestionnaireBinaryEvent(questionnaireId, payload))

  const sendEnterFullscreenQuestionnaireVideo = (questionnaireId: UUID, payload: QuestionnaireBinaryFileEventPayload) =>
    withSurveyParams(sendEnterFullscreenQuestionnaireVideoEvent(questionnaireId, payload))

  const sendLeaveFullscreenQuestionnaireVideo = (questionnaireId: UUID, payload: QuestionnaireBinaryFileEventPayload) =>
    withSurveyParams(sendLeaveFullscreenQuestionnaireVideoEvent(questionnaireId, payload))

  const sendQuestionnaireVideoPlaybackEnded = (questionnaireId: UUID, payload: QuestionnaireBinaryFileEventPayload) =>
    withSurveyParams(sendQuestionnaireVideoPlaybackEndedEvent(questionnaireId, payload))

  const sendPauseQuestionnaireVideo = (questionnaireId: UUID, payload: QuestionnaireBinaryFileEventPayload) =>
    withSurveyParams(sendPauseQuestionnaireVideoEvent(questionnaireId, payload))

  const sendPlayQuestionnaireVideo = (questionnaireId: UUID, payload: QuestionnaireBinaryFileEventPayload) =>
    withSurveyParams(sendPlayQuestionnaireVideoEvent(questionnaireId, payload))

  const sendEndQuestionnaire = (questionnaireId: UUID, payload: EndQuestionnareEventPayload) =>
    withSurveyParams(sendEndQuestionnaireEvent(questionnaireId, payload))

  const sendStartEvent = (questionnaireId: UUID) => withSurveyParams(sendStartEventEvent(questionnaireId))

  const sendEndEvent = (questionnaireId: UUID) => withSurveyParams(sendEndEventEvent(questionnaireId))

  const sendSelectQuestionnaireFreeTextAnswer = (
    questionnaireId: UUID,
    questionId: UUID,
    questionPosition: number,
    answerPosition: number,
    value: string
  ) =>
    withSurveyParams(
      sendSelectQuestionnaireFreeTextAnswerEvent(questionnaireId, questionId, questionPosition, answerPosition, value)
    )

  const sendDeselectQuestionnaireFreeTextAnswer = (
    questionnaireId: UUID,
    questionId: UUID,
    questionPosition: number,
    answerPosition: number,
    value: string
  ) =>
    withSurveyParams(
      sendDeselectQuestionnaireFreeTextAnswerEvent(questionnaireId, questionId, questionPosition, answerPosition, value)
    )

  return {
    sendStartQuestionnaire,
    sendEndQuestionnaire,
    sendStartEvent,
    sendEndEvent,
    sendPlayQuestionnaireQuestionVideo,
    sendQuestionnaireQuestionVideoPlaybackEnded,
    sendPauseQuestionnaireQuestionVideo,
    sendPlayQuestionnaireVideo,
    sendQuestionnaireVideoPlaybackEnded,
    sendPauseQuestionnaireVideo,
    sendSelectQuestionnaireAnswer,
    sendDeselectQuestionnaireAnswer,
    sendUpdateQuestionnaireFreeTextAnswer,
    sendEnterFullscreenQuestionnaireVideo,
    sendLeaveFullscreenQuestionnaireVideo,
    sendEnterFullscreenQuestionnaireQuestionVideo,
    sendLeaveFullscreenQuestionnaireQuestionVideo,
    sendEnlargeQuestionnaireQuestionBinary,
    sendShrinkQuestionnaireQuestionBinary,
    sendShrinkQuestionnaireBinary,
    sendEnlargeQuestionnaireBinary,
    sendSelectQuestionnaireFreeTextAnswer,
    sendDeselectQuestionnaireFreeTextAnswer,
    sendResumeQuestionnaire
  }
}
