import {EmailFragment} from "../generated/EmailFragment"
import {EmailDirectory, Relevance} from "../generated/globalTypes"

export const emailMock = (scenarioId: UUID = "b9598531-8f75-4386-b54a-d64e179508b2"): EmailFragment => ({
  __typename: "Email",
  id: "0c27abb3-0a77-4dda-b119-ee3c0741d564",
  createdAt: new Date(2019, 10, 5).toISOString(),
  modifiedAt: new Date(2019, 10, 15).toISOString(),
  sender: "sender@cap3.de",
  recipient: "recipient@cap3.de",
  ccRecipients: [],
  subject: "e-mail test",
  directory: EmailDirectory.Inbox,
  receptionDelayInSeconds: 0,
  isInitiallyRead: false,
  relevance: Relevance.PotentiallyHelpful,
  message: "e-mail message",
  scenarioId
})
