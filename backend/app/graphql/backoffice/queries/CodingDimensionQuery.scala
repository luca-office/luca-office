package graphql.backoffice.queries

import database.generated.public.CodingDimension
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait CodingDimensionQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def codingDimensions(modelId: UUID): Future[Seq[CodingDimension]] =
    codingDimensionService.all(modelId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def codingDimension(id: UUID): Future[Option[CodingDimension]] =
    codingDimensionService.find(id)
}
