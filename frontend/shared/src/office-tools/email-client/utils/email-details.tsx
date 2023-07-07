import {IconName} from "../../../enums"
import {EmailDirectory} from "../../../graphql/generated/globalTypes"
import {LocalEmail, ParticipantData, SampleCompany} from "../../../models"
import {LucaTFunction} from "../../../translations"
import {getSenderAndRecipient, Option} from "../../../utils"
import {getArrivalTimeLabel} from "./arrival-time"

export const getEmailDirectoryIcon = (directory: EmailDirectory) => {
  switch (directory) {
    case EmailDirectory.Inbox:
      return IconName.EmailIncoming
    case EmailDirectory.Sent:
      return IconName.EmailOutgoing
    case EmailDirectory.Draft:
      return IconName.EditBordered
    case EmailDirectory.Trash:
      return IconName.Trash
  }
}

export interface EmailDirectoryLabelConfig {
  readonly email: LocalEmail
  readonly scenarioStartedAt: Option<Date>
  readonly scenarioFictiveDate: Option<Date>
  readonly t: LucaTFunction
  readonly participantData: Option<ParticipantData>
  readonly sampleCompany: Option<SampleCompany>
}

export const getEmailDirectoryLabel = ({
  email,
  participantData,
  sampleCompany,
  scenarioFictiveDate,
  scenarioStartedAt,
  t
}: EmailDirectoryLabelConfig) => {
  switch (email.directory) {
    case EmailDirectory.Draft:
      return t("email__draft")
    case EmailDirectory.Inbox:
    case EmailDirectory.Sent:
    case EmailDirectory.Trash:
    default:
      return `${
        {
          ...email,
          ...getSenderAndRecipient(email, participantData, sampleCompany)
        }.sender
      } (${getArrivalTimeLabel({
        email,
        t,
        scenarioStartedAt,
        scenarioFictiveDate
      })})`
  }
}
