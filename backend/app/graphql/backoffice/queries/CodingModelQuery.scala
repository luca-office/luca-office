package graphql.backoffice.queries

import database.generated.public.CodingModel
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait CodingModelQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def codingModels: Future[Seq[CodingModel]] =
    codingModelService.all

  @GraphQLField
  @GraphQLFieldTags(Private)
  def codingModel(id: UUID): Future[Option[CodingModel]] =
    codingModelService.find(id)
}
