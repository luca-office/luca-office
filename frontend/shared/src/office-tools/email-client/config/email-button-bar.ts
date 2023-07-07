import {IconName} from "../../../enums"
import {EmailDirectory} from "../../../graphql/generated/globalTypes"
import {LucaTFunction} from "../../../translations"

export interface EmailCounts {
  inbox: number
  sent: number
  draft: number
  trash: number
}

export const getEmailListTabButtons = (
  counts: EmailCounts,
  selectDirectory: (directory: EmailDirectory) => void,
  t: LucaTFunction
) => {
  return [
    {
      icon: IconName.EmailIncoming,
      label: `${t("email__incoming")} (${counts.inbox})`,
      onClick: () => selectDirectory(EmailDirectory.Inbox)
    },
    {
      icon: IconName.EmailOutgoing,
      label: `${t("email__sent")} (${counts.sent})`,
      onClick: () => selectDirectory(EmailDirectory.Sent)
    },
    {
      icon: IconName.EditBordered,
      label: `${t("email__draft")} (${counts.draft})`,
      onClick: () => selectDirectory(EmailDirectory.Draft)
    },
    {
      icon: IconName.Trash,
      label: `${t("email__trash")} (${counts.trash})`,
      onClick: () => selectDirectory(EmailDirectory.Trash)
    }
  ]
}
