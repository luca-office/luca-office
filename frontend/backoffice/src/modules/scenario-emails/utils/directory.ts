import {IconName} from "shared/enums"
import {EmailDirectory} from "shared/graphql/generated/globalTypes"
import {Email} from "shared/models"
import {LucaTFunction} from "shared/translations"

export const getDirectoryHeaderLabel = (selectedDirectory: EmailDirectory, t: LucaTFunction) => {
  switch (selectedDirectory) {
    case EmailDirectory.Inbox:
      return t("email__directory_inbox")
    case EmailDirectory.Sent:
      return t("email__directory_sent")
    case EmailDirectory.Trash:
      return t("email__directory_trash")
    default:
      return ""
  }
}

export const getDirectoryOptions = (t: LucaTFunction) => [
  {
    value: EmailDirectory.Inbox,
    label: t("email__directory_inbox"),
    iconName: IconName.EmailIncoming
  },
  {
    value: EmailDirectory.Sent,
    label: t("email__directory_sent"),
    iconName: IconName.EmailOutgoing
  },
  {
    value: EmailDirectory.Trash,
    label: t("email__directory_trash"),
    iconName: IconName.Trash
  }
]

type SortableEmail = Pick<Email, "id"> & Pick<Email, "receptionDelayInSeconds">

export const createEmailsSortFn = (selectedDirectory: EmailDirectory, introductionEmailId: UUID | null = null) => (
  email1: SortableEmail,
  email2: SortableEmail
) => {
  if (selectedDirectory === EmailDirectory.Inbox) {
    return email1.id !== introductionEmailId && email1.receptionDelayInSeconds >= email2.receptionDelayInSeconds
      ? 1
      : -1
  } else {
    return email1.receptionDelayInSeconds <= email2.receptionDelayInSeconds ? 1 : -1
  }
}

export const isOutgoingEmail = (directory: EmailDirectory) =>
  directory === EmailDirectory.Sent || directory === EmailDirectory.Draft
