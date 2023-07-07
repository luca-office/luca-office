import {useDispatch} from "react-redux"
import {EmailDirectory, SurveyEventType} from "shared/graphql/generated/globalTypes"
import {EmailClientSurveyEvents} from "shared/office-tools/email-client"
import {addSurveyEventAction} from "shared/redux/actions/data/survey-events-action"
import {createPreviewEvent} from "../../utils"

export const useEmailClientSurveyEvents = (): EmailClientSurveyEvents => {
  const dispatch = useDispatch()

  const sendCreateEmailEvent = (id: string) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.CreateEmail, {id})))

  const sendShowEmailEvent = (id: string, scenarioId: UUID) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.ShowEmail, {id, scenarioId})))

  const sendDeleteEmailEvent = (id: string) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.DeleteEmailDraft, {id})))

  const sendMoveEmailToDirectoryEvent = (id: string, dir: EmailDirectory) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.MoveEmailToTrash, {id, dir})))

  const sendSendEmailEvent = (id: string, isCompletionEmail: boolean, text: string) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.SendEmail, {id, isCompletionEmail, text})))

  const sendSelectEmailDirectoryEvent = (directory: EmailDirectory) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.SelectEmailDirectory, {directory})))

  const sendSearchEmailsEvent = (query: string) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.SearchEmails, {query})))

  const sendUpdateEmailEvent = (id: string, to: string, cc: string[], subject: string) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.UpdateEmail, {id, to, cc, subject})))

  const sendUpdateEmailTextEvent = (id: string, text: string) =>
    dispatch(addSurveyEventAction(createPreviewEvent(SurveyEventType.UpdateEmailText, {id, text})))

  const sendAnswerEmailEvent = (scenarioId: UUID, createdEmailId: UUID, answeredEmailId: UUID) =>
    dispatch(
      addSurveyEventAction(
        createPreviewEvent(SurveyEventType.AnswerEmail, {scenarioId, createdEmailId, answeredEmailId})
      )
    )

  const sendDownloadEmailAttachmentEvent = (scenarioId: UUID, emailId: UUID, fileId: UUID) =>
    dispatch(
      addSurveyEventAction(createPreviewEvent(SurveyEventType.DownloadEmailAttachment, {scenarioId, emailId, fileId}))
    )

  const sendAddEmailAttachmentEvent = (scenarioId: UUID, emailId: UUID, fileId: UUID) =>
    dispatch(
      addSurveyEventAction(createPreviewEvent(SurveyEventType.AddEmailAttachment, {scenarioId, emailId, fileId}))
    )

  const sendDeleteEmailAttachmentEvent = (scenarioId: UUID, emailId: UUID, fileId: UUID) =>
    dispatch(
      addSurveyEventAction(createPreviewEvent(SurveyEventType.DeleteEmailAttachment, {scenarioId, emailId, fileId}))
    )

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
