import {EmailUpdate} from "shared/graphql/generated/globalTypes"
import {useUpdateEmail} from "shared/graphql/hooks"
import {Email} from "shared/models"
import {Option} from "shared/utils"

export interface UseEmailUpdateHook {
  readonly updateEmail: (update: Partial<EmailUpdate>, onSuccess?: () => void) => Promise<Option<Email>>
  readonly updateEmailLoading: boolean
}

export const useEmailUpdate = (email: Email): UseEmailUpdateHook => {
  const {updateEmail, updateEmailLoading} = useUpdateEmail()

  const emailUpdate = {
    sender: email.sender,
    recipient: email.recipient,
    ccRecipients: email.ccRecipients,
    subject: email.subject,
    directory: email.directory,
    receptionDelayInSeconds: email.receptionDelayInSeconds,
    isInitiallyRead: email.receptionDelayInSeconds >= 0 ? false : email.isInitiallyRead,
    relevance: email.relevance,
    message: email.message,
    scenarioId: email.scenarioId
  }

  const handleEmailUpdate = (update: Partial<EmailUpdate>, onSuccess?: () => void) =>
    updateEmail(email.id, {...emailUpdate, ...update}, onSuccess)

  return {
    updateEmail: handleEmailUpdate,
    updateEmailLoading
  }
}
