package models

import enums.{EmailDirectory, Relevance}

import java.util.UUID

case class EmailCreation(
    sender: Option[String],
    recipient: Option[String],
    ccRecipients: Seq[String],
    subject: String,
    directory: EmailDirectory,
    receptionDelayInSeconds: Int,
    isInitiallyRead: Boolean,
    relevance: Relevance,
    message: String,
    scenarioId: UUID
)

case class EmailUpdate(
    sender: Option[String],
    recipient: Option[String],
    ccRecipients: Seq[String],
    subject: String,
    directory: EmailDirectory,
    receptionDelayInSeconds: Int,
    isInitiallyRead: Boolean,
    relevance: Relevance,
    message: String,
    scenarioId: UUID
)
