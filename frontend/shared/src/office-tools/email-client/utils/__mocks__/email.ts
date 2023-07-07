import {EmailDirectory, Relevance} from "../../../../graphql/generated/globalTypes"
import {LocalEmail} from "../../../../models"

export const mockEmails: LocalEmail[] = [
  {
    id: "123",
    sender: "test@cap3.de",
    recipient: "test@test.com",
    ccRecipients: [],
    subject: "Testing",
    directory: EmailDirectory.Inbox,
    receptionDelayInSeconds: 0,
    isRead: false,
    relevance: Relevance.PotentiallyHelpful,
    message: "Testing the Test",
    scenarioId: "321",
    isVisible: true
  },
  {
    id: "456",
    sender: "test@test.com",
    recipient: "test@cap3.de",
    ccRecipients: [],
    subject: "Testing",
    directory: EmailDirectory.Sent,
    receptionDelayInSeconds: 0,
    isRead: false,
    relevance: Relevance.PotentiallyHelpful,
    message: "Testing the Test",
    scenarioId: "321",
    isVisible: true
  },
  {
    id: "789",
    sender: "test@cap3.de",
    recipient: "test@test.com",
    ccRecipients: [],
    subject: "Testing",
    directory: EmailDirectory.Draft,
    receptionDelayInSeconds: 0,
    isRead: false,
    relevance: Relevance.Required,
    message: "Testing the Test",
    scenarioId: "321",
    isVisible: true
  },
  {
    id: "012",
    sender: "test@cap3.de",
    recipient: "test@test.com",
    ccRecipients: [],
    subject: "Testing",
    directory: EmailDirectory.Trash,
    receptionDelayInSeconds: 0,
    isRead: false,
    relevance: Relevance.Required,
    message: "Testing the Test",
    scenarioId: "321",
    isVisible: true
  }
]
