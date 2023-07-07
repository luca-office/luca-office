package graphql.backoffice.queries

import database.generated.public.ReferenceBookContent
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ReferenceBookContentQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def referenceBookContents(referenceBookArticleId: UUID): Future[Seq[ReferenceBookContent]] =
    referenceBookContentService.allReferenceBookContents(referenceBookArticleId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def referenceBookContent(id: UUID): Future[Option[ReferenceBookContent]] =
    referenceBookContentService.find(id)
}
