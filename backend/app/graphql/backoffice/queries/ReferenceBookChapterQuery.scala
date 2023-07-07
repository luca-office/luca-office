package graphql.backoffice.queries

import database.generated.public.ReferenceBookChapter
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ReferenceBookChapterQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def referenceBookChapters: Future[Seq[ReferenceBookChapter]] =
    runWithUserAccount(referenceBookChapterService.all)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def referenceBookChapter(id: UUID): Future[Option[ReferenceBookChapter]] =
    runWithUserAccount(userAccount => referenceBookChapterService.find(id, userAccount))
}
