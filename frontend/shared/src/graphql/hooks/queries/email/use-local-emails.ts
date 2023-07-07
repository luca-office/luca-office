import {LocalEmail} from "../../../../models"
import {Option, remoteToLocalEmail} from "../../../../utils"
import {useEmails} from "./use-emails"

export interface UseLocalEmailsHook {
  localEmails: Option<LocalEmail[]>
  localEmailsLoading: boolean
}

export const useLocalEmails = (scenarioId: UUID): UseLocalEmailsHook => {
  const {emails: emailsOption, emailsLoading} = useEmails(scenarioId)

  return {
    localEmails: emailsOption.map(emails => emails.map(remoteToLocalEmail)),
    localEmailsLoading: emailsLoading
  }
}
