package graphql.backoffice.queries

import database.generated.public.CodingCriterion
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait CodingCriterionQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def codingCriteria(itemId: UUID): Future[Seq[CodingCriterion]] =
    codingCriterionService.allCodingCriteria(itemId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def codingCriterion(id: UUID): Future[Option[CodingCriterion]] =
    codingCriterionService.find(id)
}
