package services.converters

import java.util.UUID

import database.generated.public.Email
import models.EmailCreation
import utils.DateUtils

object EmailConverter {

  def toEmail(creation: EmailCreation): Email =
    Email(
      id = UUID.randomUUID(),
      createdAt = DateUtils.now,
      modifiedAt = DateUtils.now,
      sender = creation.sender,
      recipient = creation.recipient,
      ccRecipients = creation.ccRecipients,
      subject = creation.subject,
      directory = creation.directory,
      receptionDelayInSeconds = creation.receptionDelayInSeconds,
      isInitiallyRead = creation.isInitiallyRead,
      relevance = creation.relevance,
      message = creation.message,
      scenarioId = creation.scenarioId
    )

  def toEmailCreation(email: Email): EmailCreation =
    EmailCreation(
      sender = email.sender,
      recipient = email.recipient,
      ccRecipients = email.ccRecipients,
      subject = email.subject,
      directory = email.directory,
      receptionDelayInSeconds = email.receptionDelayInSeconds,
      isInitiallyRead = email.isInitiallyRead,
      relevance = email.relevance,
      message = email.message,
      scenarioId = email.scenarioId
    )
}
