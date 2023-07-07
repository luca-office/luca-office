package services

import database.DatabaseContext
import database.generated.public.TextDocument
import models.{TextDocumentCreation, TextDocumentUpdate}
import services.Utils.defaultErrorHandler
import services.generated._

import java.util.UUID
import javax.inject.Inject
import scala.concurrent.{ExecutionContext, Future}

class TextDocumentService @Inject() (databaseContext: DatabaseContext)(implicit val executionContext: ExecutionContext)
    extends DefaultAllTextDocument
    with DefaultFindTextDocument
    with DefaultCreateTextDocument
    with DefaultUpdateTextDocument
    with DefaultDeleteTextDocument {
  val context = databaseContext

  import context._

  def all: Future[Seq[TextDocument]] =
    performIO(allTextDocumentsAction)

  def find(id: UUID): Future[Option[TextDocument]] =
    performIO(findTextDocumentAction(id))

  def create(creation: TextDocumentCreation): Future[TextDocument] =
    performIO(createTextDocumentAction(creation))
      .recover(defaultErrorHandler)

  def update(id: UUID, update: TextDocumentUpdate): Future[TextDocument] =
    performIO(updateTextDocumentAction(id, update))
      .recover(defaultErrorHandler)

  def delete(id: UUID): Future[UUID] =
    performIO(deleteTextDocumentAction(id))
}
