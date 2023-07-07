import {EmailDirectory, Relevance} from "../../../../graphql/generated/globalTypes"
import {LocalEmail} from "../../../../models"

export const emails: LocalEmail[] = [
  {
    id: "28260acf-b6e7-4d7c-94eb-ffcd6613c039",
    sender: "lorem.ispum@dolor.sit",
    recipient: "user@luca.de",
    ccRecipients: [],
    subject: "Lorem Ipsum",
    directory: EmailDirectory.Inbox,
    receptionDelayInSeconds: 0,
    isRead: false,
    relevance: Relevance.PotentiallyHelpful,
    message:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    scenarioId: "4d09512c-37e2-4758-a457-ff9fa7338e16",
    isVisible: true
  },
  {
    id: "36b003d5-7ec8-4d86-a4b6-f9363e5f5e6f",
    sender: "sea.takimata@sanctus.est",
    recipient: "",
    ccRecipients: [],
    subject: "At vero eos et accusam",
    directory: EmailDirectory.Draft,
    receptionDelayInSeconds: 0,
    isRead: false,
    relevance: Relevance.PotentiallyHelpful,
    message:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    scenarioId: "4d09512c-37e2-4758-a457-ff9fa7338e16",
    isVisible: true
  },
  {
    id: "d377089f-79c5-44d8-aa46-2165cc9d963c",
    sender: "dolores.et@ea.rebum",
    recipient: "user@luca.de",
    ccRecipients: [],
    subject: "consetetur sadipscing elitr",
    directory: EmailDirectory.Inbox,
    receptionDelayInSeconds: 0,
    isRead: false,
    relevance: Relevance.PotentiallyHelpful,
    message:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    scenarioId: "4d09512c-37e2-4758-a457-ff9fa7338e16",
    isVisible: true
  },
  {
    id: "b60ffcc0-f701-4856-8d3c-5a064c51acb3",
    sender: "eirmod.tempor@invidunt.ut ",
    recipient: "recipient@target.de",
    ccRecipients: [],
    subject: "sed diam voluptua",
    directory: EmailDirectory.Sent,
    receptionDelayInSeconds: 0,
    isRead: false,
    relevance: Relevance.PotentiallyHelpful,
    message:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    scenarioId: "4d09512c-37e2-4758-a457-ff9fa7338e16",
    isVisible: true
  },
  {
    id: "f8e43210-0a9a-49c7-b894-0101c0db46c2",
    sender: "consetetur.sadipscing@elitr.sed",
    recipient: "user@luca.de",
    ccRecipients: [],
    subject: "At vero eos et accusam",
    directory: EmailDirectory.Trash,
    receptionDelayInSeconds: 0,
    isRead: false,
    relevance: Relevance.PotentiallyHelpful,
    message:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    scenarioId: "4d09512c-37e2-4758-a457-ff9fa7338e16",
    isVisible: true
  },
  {
    id: "99c0a11c-2677-4215-baf3-827305ab4434",
    sender: "et.justo@duo.dolores",
    recipient: "recipient@target.de",
    ccRecipients: [],
    subject: "et dolore magna aliquyam erat",
    directory: EmailDirectory.Sent,
    receptionDelayInSeconds: 0,
    isRead: false,
    relevance: Relevance.PotentiallyHelpful,
    message:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    scenarioId: "4d09512c-37e2-4758-a457-ff9fa7338e16",
    isVisible: true
  },
  {
    id: "f0d5dae0-c0f9-469e-b4b5-4e65e6f97532",
    sender: "dolore.magna@aliquyam.erat",
    recipient: "user@luca.de",
    ccRecipients: [],
    subject: "sed diam nonumy eirmod",
    directory: EmailDirectory.Inbox,
    receptionDelayInSeconds: 0,
    isRead: false,
    relevance: Relevance.PotentiallyHelpful,
    message:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
    scenarioId: "4d09512c-37e2-4758-a457-ff9fa7338e16",
    isVisible: true
  }
]
