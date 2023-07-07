package graphql.backoffice.queries

import database.generated.public.TextDocument
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait TextDocumentQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def textDocuments: Future[Seq[TextDocument]] =
    textDocumentService.all

  @GraphQLField
  @GraphQLFieldTags(Private)
  def textDocument(id: UUID): Future[Option[TextDocument]] =
    textDocumentService.find(id)
}
