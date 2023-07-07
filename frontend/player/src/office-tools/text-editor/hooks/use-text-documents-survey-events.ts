import {useDispatch} from "react-redux"
import {UpdateTextDocumentContentEventPayload} from "shared/models"
import {TextDocumentSurveyEvents} from "shared/office-tools/text-editor/text-editor-container"
import {sendCloseTextDocumentSurveyEvent, sendUpdateTextDocumentSurveyEvent} from "shared/utils"
import {useGetSurveyInvitationFromRedux} from "../../../hooks/use-get-survey-invitation"

export const useTextDocumentsSurveyEvents = (scenarioId: UUID): TextDocumentSurveyEvents => {
  const {invitationIdOption, surveyIdOption} = useGetSurveyInvitationFromRedux()

  const dispatch = useDispatch()

  const withSurveyParams = (handler: (surveyId: UUID, invitationId: UUID, scenarioId: UUID) => void) =>
    surveyIdOption.forEach(surveyId =>
      invitationIdOption.forEach(invitationId => handler(surveyId, invitationId, scenarioId))
    )

  const sendUpdateTextDocumentEvent = (payload: UpdateTextDocumentContentEventPayload) =>
    withSurveyParams(sendUpdateTextDocumentSurveyEvent(payload, dispatch))

  const sendCloseTextDocumentEvent = (textDocumentId: UUID) =>
    withSurveyParams(sendCloseTextDocumentSurveyEvent(textDocumentId))

  return {
    sendUpdateTextDocumentEvent,
    sendCloseTextDocumentEvent
  }
}
