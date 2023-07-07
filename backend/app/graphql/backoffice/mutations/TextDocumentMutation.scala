package graphql.backoffice.mutations

import database.generated.public.TextDocument
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{TextDocumentCreation, TextDocumentUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait TextDocumentMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createTextDocument(creation: TextDocumentCreation): Future[TextDocument] =
    textDocumentService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateTextDocument(id: UUID, update: TextDocumentUpdate): Future[TextDocument] =
    textDocumentService.update(id, update)
}
