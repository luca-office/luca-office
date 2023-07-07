import {EmailCreation, EmailDirectory, Relevance} from "shared/graphql/generated/globalTypes"

export const emailCreationValues = (timeOffsetInSeconds: number, scenarioId: UUID, sender: string): EmailCreation => ({
  receptionDelayInSeconds: timeOffsetInSeconds,
  message: "",
  isInitiallyRead: false,
  directory: EmailDirectory.Inbox,
  ccRecipients: [],
  relevance: Relevance.PotentiallyHelpful,
  scenarioId,
  sender: sender,
  subject: ""
})
