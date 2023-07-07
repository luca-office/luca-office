import {differenceInSeconds} from "date-fns"
import {EmailDirectory, SurveyEventType} from "../../../graphql/generated/globalTypes"
import {ReceiveEmailPayload, SurveyEvent} from "../../../models"
import {EmailClientState} from "../../../office-tools"
import {SharedAppState} from "../../../redux/state"
import {EmailsState} from "../../../redux/state/data"
import {createEmailDraft, getUserEmail, now, Option} from "../../../utils"

export const initialEmailClientState: EmailClientState = {
  availableEmailDownloadIds: [],
  emails: [],
  participantData: Option.none(),
  token: Option.none(),
  scenarioStartedAt: Option.none(),
  availableEmailUploadFiles: {}
}

export const emailsSnapshotReducer = (state: SharedAppState, surveyEvent: SurveyEvent): EmailsState => {
  const emails = state.data.emails

  switch (surveyEvent.eventType) {
    case SurveyEventType.CreateEmail: {
      const data = surveyEvent.data as {id: UUID}
      const sender = getUserEmail(state.data.common.participantData, Option.none())
      return [...emails, createEmailDraft("", sender, data.id, "")]
    }
    case SurveyEventType.ShowEmail: {
      const data = surveyEvent.data as {id: UUID; scenarioId: UUID}
      return emails.map(email => (email.id === data.id ? {...email, isRead: true} : email))
    }
    case SurveyEventType.DeleteEmailDraft: {
      const data = surveyEvent.data as {id: UUID}
      return emails.filter(email => email.id !== data.id)
    }
    case SurveyEventType.MoveEmailToTrash: {
      const data = surveyEvent.data as {id: UUID; dir: EmailDirectory}
      return emails.map(email => (email.id === data.id ? {...email, directory: data.dir} : email))
    }
    case SurveyEventType.SendEmail: {
      const data = surveyEvent.data as {id: UUID}
      return emails.map(email =>
        email.id === data.id ? {...email, directory: EmailDirectory.Sent, isRead: true} : email
      )
    }
    case SurveyEventType.UpdateEmail: {
      const data = surveyEvent.data as {id: UUID; to: string; cc: Array<string>; subject: string}
      return emails.map(email =>
        email.id === data.id ? {...email, recipient: data.to, ccRecipients: data.cc, subject: data.subject} : email
      )
    }
    case SurveyEventType.UpdateEmailText: {
      const data = surveyEvent.data as {id: UUID; text: string}
      return emails.map(email => (email.id === data.id ? {...email, message: data.text} : email))
    }
    case SurveyEventType.AnswerEmail: {
      const data = surveyEvent.data as {scenarioId: UUID; createdEmailId: UUID; answeredEmailId: UUID}
      const sender = getUserEmail(state.data.common.participantData, Option.none())
      const recipient = emails.find(email => email.id === data.answeredEmailId)?.sender ?? ""
      return [...emails, createEmailDraft(data.scenarioId, sender, data.createdEmailId, recipient)]
    }
    case SurveyEventType.ReceiveEmail: {
      const data = surveyEvent.data as ReceiveEmailPayload

      const differenceBetweenReceiveEventAndNow = differenceInSeconds(now(), surveyEvent.timestamp)
      return emails.map(email =>
        email.id === data.emailId
          ? {
              ...email,
              isVisible: true,
              receptionDelayInSeconds: -differenceBetweenReceiveEventAndNow
            }
          : email
      )
    }

    default:
      return emails
  }
}
