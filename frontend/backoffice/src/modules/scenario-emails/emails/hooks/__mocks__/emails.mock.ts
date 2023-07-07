import {scenariosMock} from "shared/graphql/__mocks__"
import {EmailFragment} from "shared/graphql/generated/EmailFragment"
import {EmailDirectory, Relevance} from "shared/graphql/generated/globalTypes"

const getDateString = (day: number) => new Date(2020, 10, day).toISOString()

const scenarioId = scenariosMock[0].id

const message =
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."

const defaultEmailData: Omit<EmailFragment, "id" | "createdAt" | "modifiedAt" | "subject" | "directory"> = {
  __typename: "Email",
  sender: "sender@cap3.de",
  recipient: null,
  ccRecipients: ["cc1@cap3.de", "cc2@cap3.de", "cc3@cap3.de"],
  receptionDelayInSeconds: 0,
  isInitiallyRead: false,
  relevance: Relevance.PotentiallyHelpful,
  message,
  scenarioId
}

export const emailsMock: EmailFragment[] = [
  {
    ...defaultEmailData,
    id: "e8afefb5-a32c-44df-b51e-193503ab2983",
    createdAt: getDateString(1),
    modifiedAt: getDateString(1),
    subject: "Mock-Email 1",
    directory: EmailDirectory.Inbox
  },
  {
    ...defaultEmailData,
    id: "2dbdae38-581a-430c-b635-c56b3ce4defa",
    createdAt: getDateString(2),
    modifiedAt: getDateString(2),
    subject: "Mock-Email 2",
    directory: EmailDirectory.Inbox
  },
  {
    ...defaultEmailData,
    id: "46da5197-a7a9-4a1b-9a21-f18ffabe5646",
    createdAt: getDateString(3),
    modifiedAt: getDateString(3),
    subject: "Mock-Email 3",
    directory: EmailDirectory.Inbox
  },
  {
    ...defaultEmailData,
    id: "b3b03237-ef77-4807-bd00-61180ce5503c",
    createdAt: getDateString(4),
    modifiedAt: getDateString(4),
    subject: "Mock-Email 4",
    directory: EmailDirectory.Draft
  },
  {
    ...defaultEmailData,
    id: "06a55f2e-1d87-4368-913b-173efef5efa9",
    createdAt: getDateString(5),
    modifiedAt: getDateString(5),
    subject: "Mock-Email 5",
    directory: EmailDirectory.Draft
  },
  {
    ...defaultEmailData,
    id: "2ccb2a0f-7671-4825-920f-880747e5371f",
    createdAt: getDateString(6),
    modifiedAt: getDateString(6),
    subject: "Mock-Email 6",
    directory: EmailDirectory.Draft
  },
  {
    ...defaultEmailData,
    id: "29f2d3c2-6dba-4c58-8c6d-4decc379469d",
    createdAt: getDateString(7),
    modifiedAt: getDateString(7),
    subject: "Mock-Email 7",
    directory: EmailDirectory.Sent
  },
  {
    ...defaultEmailData,
    id: "e9e74904-47a9-4e09-8921-b2cf81990cab",
    createdAt: getDateString(8),
    modifiedAt: getDateString(8),
    subject: "Mock-Email 8",
    directory: EmailDirectory.Sent
  },
  {
    ...defaultEmailData,
    id: "7ab33417-7c8f-4a00-871e-a3d266365f2b",
    createdAt: getDateString(9),
    modifiedAt: getDateString(9),
    subject: "Mock-Email 9",
    directory: EmailDirectory.Sent
  },
  {
    ...defaultEmailData,
    id: "0179bb15-ca9d-424e-a70f-c85c68b84d37",
    createdAt: getDateString(10),
    modifiedAt: getDateString(10),
    subject: "Mock-Email 10",
    directory: EmailDirectory.Trash
  },
  {
    ...defaultEmailData,
    id: "8909a9f3-a208-4962-8d6a-bdf1ee5c1ed6",
    createdAt: getDateString(11),
    modifiedAt: getDateString(11),
    subject: "Mock-Email 11",
    directory: EmailDirectory.Trash
  },
  {
    ...defaultEmailData,
    id: "5bb478b6-33eb-4f10-a84a-759e2c5136b5",
    createdAt: getDateString(12),
    modifiedAt: getDateString(12),
    subject: "Mock-Email 12",
    directory: EmailDirectory.Trash
  }
]
