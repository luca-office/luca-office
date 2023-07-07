package graphql.backoffice.queries

import database.generated.public.RScript
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait RScriptQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def rScripts: Future[Seq[RScript]] =
    rScriptService.all

  @GraphQLField
  @GraphQLFieldTags(Private)
  def rScript(id: UUID): Future[Option[RScript]] =
    rScriptService.find(id)
}
