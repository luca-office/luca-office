package services.generated

import database.DatabaseContext
import database.generated.public.TextDocument
import models.{TextDocumentCreation, TextDocumentUpdate}
import services.converters.TextDocumentConverter.toTextDocument
import utils.DateUtils

import java.util.UUID
import scala.concurrent.ExecutionContext

trait DefaultAllTextDocument {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def allTextDocumentsAction: IO[Seq[TextDocument], Effect.Read] =
    runIO(allTextDocumentsQuotation)

  def allTextDocumentsQuotation =
    quote(query[TextDocument])
}

trait DefaultFindTextDocument {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def findTextDocumentAction(id: UUID): IO[Option[TextDocument], Effect.Read] =
    runIO(findTextDocumentQuotation(id)).map(_.headOption)

  def findTextDocumentQuotation(id: UUID) =
    quote(query[TextDocument].filter(_.id == lift(id)))
}

trait DefaultCreateTextDocument {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def createTextDocumentAction(creation: TextDocumentCreation): IO[TextDocument, Effect.Write] =
    runIO(createTextDocumentQuotation(creation))

  def createTextDocumentQuotation(creation: TextDocumentCreation) =
    quote(
      query[TextDocument]
        .insert(lift(toTextDocument(creation)))
        .returning(textDocument => textDocument))
}

trait DefaultUpdateTextDocument {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._

  def updateTextDocumentAction(id: UUID, update: TextDocumentUpdate): IO[TextDocument, Effect.Write] =
    runIO(updateTextDocumentQuotation(id, update))

  def updateTextDocumentQuotation(id: UUID, update: TextDocumentUpdate) =
    quote(
      query[TextDocument]
        .filter(_.id == lift(id))
        .update(
          _.modifiedAt -> lift(DateUtils.now),
          _.content -> lift(update.content)
        )
        .returning(textDocument => textDocument))
}

trait DefaultDeleteTextDocument {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._

  def deleteTextDocumentAction(id: UUID): IO[UUID, Effect.Write] =
    runIO(deleteTextDocumentQuotation(id))

  def deleteTextDocumentQuotation(id: UUID) =
    quote(
      query[TextDocument]
        .filter(_.id == lift(id))
        .delete
        .returning(_.id))
}
