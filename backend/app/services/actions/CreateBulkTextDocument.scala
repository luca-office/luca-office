package services.actions

import database.DatabaseContext
import database.generated.public.TextDocument
import models.TextDocumentCreation
import services.converters.TextDocumentConverter.toTextDocument

import java.util.UUID
import scala.concurrent.ExecutionContext

trait CreateBulkTextDocument {
  val context: DatabaseContext

  implicit val executionContext: ExecutionContext

  import context._
  import database.Encoders._
  import database.EnumEncoders._

  def createBulkTextDocumentAction(
      creationPairs: Seq[(TextDocumentCreation, UUID)]): IO[Seq[TextDocument], Effect.Write] =
    runIO(
      liftQuery(creationPairs.map { case (creation, id) => toTextDocument(creation).copy(id = id) })
        .foreach(textDocument => query[TextDocument].insert(textDocument).returning(textDocument => textDocument)))
}
