package services.generated

import java.util.UUID
import database.DatabaseContext
import database.generated.public.Email
import models.{EmailCreation, EmailUpdate}
import services.Utils.defaultErrorHandler
import services.converters.EmailConverter.toEmail
import utils.DateUtils

import scala.concurrent.{ExecutionContext, Future}

trait DefaultAllEmail {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def allEmails(scenarioId: UUID): Future[Seq[Email]] =
    run(allEmailsQuotation(scenarioId))

  def allEmailsAction(scenarioId: UUID): IO[Seq[Email], Effect.Read] =
    runIO(allEmailsQuotation(scenarioId))

  def allEmailsQuotation(scenarioId: UUID) =
    quote(query[Email].filter(_.scenarioId == lift(scenarioId)))
}

trait DefaultFindEmail {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def find(id: UUID): Future[Option[Email]] =
    run(findQuotation(id)).map(_.headOption)

  def findQuotation(id: UUID) =
    quote(query[Email].filter(_.id == lift(id)))
}

trait DefaultCreateEmail {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createEmail(creation: EmailCreation): Future[Email] =
    run(createEmailQuotation(creation))
      .recover(defaultErrorHandler)

  def createEmailQuotation(creation: EmailCreation) =
    quote(
      query[Email]
        .insert(lift(toEmail(creation)))
        .returning(email => email))
}

trait DefaultUpdateEmail {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def updateEmail(id: UUID, update: EmailUpdate): Future[Email] =
    performIO(updateEmailAction(id, update))
      .recover(defaultErrorHandler)

  def updateEmailAction(id: UUID, update: EmailUpdate) =
    runIO(updateEmailQuotation(id, update))

  def updateEmailQuotation(id: UUID, update: EmailUpdate) =
    quote(
      query[Email]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.sender -> lift(update.sender),
          _.recipient -> lift(update.recipient),
          _.ccRecipients -> lift(update.ccRecipients),
          _.subject -> lift(update.subject),
          _.directory -> lift(update.directory),
          _.receptionDelayInSeconds -> lift(update.receptionDelayInSeconds),
          _.isInitiallyRead -> lift(update.isInitiallyRead),
          _.relevance -> lift(update.relevance),
          _.message -> lift(update.message),
          _.scenarioId -> lift(update.scenarioId)
        )
        .returning(email => email))
}

trait DefaultDeleteEmail {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def delete(id: UUID): Future[UUID] =
    run(deleteQuotation(id))

  def deleteQuotation(id: UUID) =
    quote(
      query[Email]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
