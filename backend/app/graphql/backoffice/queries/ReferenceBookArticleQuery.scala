package graphql.backoffice.queries

import database.generated.public.ReferenceBookArticle
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ReferenceBookArticleQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def referenceBookArticles(referenceBookChapterId: UUID): Future[Seq[ReferenceBookArticle]] =
    referenceBookArticleService.allReferenceBookArticles(referenceBookChapterId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def referenceBookArticle(id: UUID): Future[Option[ReferenceBookArticle]] =
    referenceBookArticleService.find(id)
}
