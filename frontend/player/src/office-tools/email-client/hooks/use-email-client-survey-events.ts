import {useDispatch} from "react-redux"
import {Dispatch} from "redux"
import {EmailDirectory, SurveyEventType} from "shared/graphql/generated/globalTypes"
import {EmailClientSurveyEvents} from "shared/office-tools/email-client"
import {sendScenarioSurveyEvent} from "shared/utils"
import {useGetSurveyInvitationFromRedux} from "../../../hooks/use-get-survey-invitation"
import {AppAction} from "../../../redux/actions/app-action"

export const useEmailClientSurveyEvents = (scenarioId: UUID): EmailClientSurveyEvents => {
  const {invitationIdOption, surveyIdOption} = useGetSurveyInvitationFromRedux()
  const dispatch = useDispatch()

  const sendEvent = (eventType: SurveyEventType, data: Record<string, unknown>, dispatch?: Dispatch<AppAction>) =>
    invitationIdOption.forEach(invitationId =>
      surveyIdOption.forEach(surveyId =>
        sendScenarioSurveyEvent({surveyId, invitationId, scenarioId, eventType, data, dispatch})
      )
    )

  const sendCreateEmailEvent = (id: string) => sendEvent(SurveyEventType.CreateEmail, {id})

  const sendShowEmailEvent = (id: string, scenarioId: UUID) =>
    sendEvent(SurveyEventType.ShowEmail, {id, scenarioId}, dispatch)

  const sendDeleteEmailEvent = (id: string) => sendEvent(SurveyEventType.DeleteEmailDraft, {id})

  const sendMoveEmailToDirectoryEvent = (id: string, dir: EmailDirectory) =>
    sendEvent(SurveyEventType.MoveEmailToTrash, {id, dir})

  const sendSendEmailEvent = (id: string, isCompletionEmail: boolean, text: string) =>
    sendEvent(SurveyEventType.SendEmail, {id, isCompletionEmail, text})

  const sendSelectEmailDirectoryEvent = (directory: EmailDirectory) =>
    sendEvent(SurveyEventType.SelectEmailDirectory, {directory})

  const sendSearchEmailsEvent = (query: string) => sendEvent(SurveyEventType.SearchEmails, {query})

  const sendUpdateEmailEvent = (id: string, to: string, cc: string[], subject: string) =>
    sendEvent(SurveyEventType.UpdateEmail, {id, to, cc, subject})

  const sendUpdateEmailTextEvent = (id: string, text: string) => sendEvent(SurveyEventType.UpdateEmailText, {id, text})

  const sendAnswerEmailEvent = (scenarioId: UUID, createdEmailId: UUID, answeredEmailId: UUID) =>
    sendEvent(SurveyEventType.AnswerEmail, {scenarioId, createdEmailId, answeredEmailId})

  const sendDownloadEmailAttachmentEvent = (scenarioId: UUID, emailId: UUID, fileId: UUID) =>
    sendEvent(SurveyEventType.DownloadEmailAttachment, {scenarioId, emailId, fileId})

  const sendAddEmailAttachmentEvent = (scenarioId: UUID, emailId: UUID, fileId: UUID) =>
    sendEvent(SurveyEventType.AddEmailAttachment, {scenarioId, emailId, fileId})

  const sendDeleteEmailAttachmentEvent = (scenarioId: UUID, emailId: UUID, fileId: UUID) =>
    sendEvent(SurveyEventType.DeleteEmailAttachment, {scenarioId, emailId, fileId})

  return {
    sendCreateEmailEvent,
    sendShowEmailEvent,
    sendDeleteEmailEvent,
    sendMoveEmailToDirectoryEvent,
    sendSendEmailEvent,
    sendSelectEmailDirectoryEvent,
    sendSearchEmailsEvent,
    sendUpdateEmailEvent,
    sendUpdateEmailTextEvent,
    sendAnswerEmailEvent,
    sendDownloadEmailAttachmentEvent,
    sendAddEmailAttachmentEvent,
    sendDeleteEmailAttachmentEvent
  }
}
