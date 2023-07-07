import {EmailDirectory} from "../../../graphql/generated/globalTypes"
import {LocalEmail} from "../../../models"
import {LucaTFunction} from "../../../translations"
import {Option} from "../../../utils"
import {EntryProps} from "../email-list/email-list"
import {getArrivalTimeLabel} from "./arrival-time"

export const getEntryPropsForEmail = (
  email: LocalEmail,
  scenarioFictiveDate: Option<Date>,
  scenarioStartedAt: Option<Date>,
  t: LucaTFunction
): Omit<EntryProps, "onClick"> => {
  switch (email.directory) {
    case EmailDirectory.Inbox:
      return {
        eMailAddress: email.sender || "",
        subject: email.subject,
        subLabel: getArrivalTimeLabel({email, scenarioStartedAt, t, scenarioFictiveDate}),
        isRead: email.isRead
      }
    case EmailDirectory.Sent:
      return {
        eMailAddress: email.recipient || "",
        subject: email.subject,
        subLabel: getArrivalTimeLabel({email, scenarioStartedAt, t, scenarioFictiveDate}),
        isRead: email.isRead
      }
    case EmailDirectory.Trash:
      return {
        eMailAddress: email.sender || "",
        subject: email.subject,
        subLabel: getArrivalTimeLabel({email, scenarioStartedAt, t, scenarioFictiveDate}),
        isRead: email.isRead
      }
    case EmailDirectory.Draft:
      return {
        eMailAddress: email.sender || "",
        subject: email.subject,
        subLabel: t("email__in_process"),
        isRead: true
      }
    default:
      return {eMailAddress: "", subject: "", isRead: false}
  }
}
