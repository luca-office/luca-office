import {noop} from "lodash-es"
import {EmailClientSurveyEvents} from "shared/office-tools/email-client"

export const useEmailClientSnapshotSurveyEvents = (): EmailClientSurveyEvents => {
  return {
    sendCreateEmailEvent: noop,
    sendShowEmailEvent: noop,
    sendDeleteEmailEvent: noop,
    sendMoveEmailToDirectoryEvent: noop,
    sendSendEmailEvent: noop,
    sendSelectEmailDirectoryEvent: noop,
    sendSearchEmailsEvent: noop,
    sendUpdateEmailEvent: noop,
    sendUpdateEmailTextEvent: noop,
    sendAnswerEmailEvent: noop,
    sendDownloadEmailAttachmentEvent: noop,
    sendAddEmailAttachmentEvent: noop,
    sendDeleteEmailAttachmentEvent: noop
  }
}
