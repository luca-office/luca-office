import {EmailDirectory} from "../../../graphql/generated/globalTypes"
import {LocalEmail} from "../../../models"
import {EmailCounts} from "../config/email-button-bar"

export const getEmailCountsForDirectory = (emails: LocalEmail[]) =>
  emails.reduce(
    (counts, email) => {
      switch (email.directory) {
        case EmailDirectory.Inbox:
          return {...counts, inbox: counts.inbox + 1}
        case EmailDirectory.Sent:
          return {...counts, sent: counts.sent + 1}
        case EmailDirectory.Draft:
          return {...counts, draft: counts.draft + 1}
        case EmailDirectory.Trash:
          return {...counts, trash: counts.trash + 1}
        default:
          return counts
      }
    },
    {inbox: 0, sent: 0, draft: 0, trash: 0} as EmailCounts
  )
