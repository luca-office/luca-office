package graphql.backoffice.queries

import database.generated.public.Email
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait EmailQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def emails(scenarioId: UUID): Future[Seq[Email]] =
    emailService.allEmails(scenarioId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def email(id: UUID): Future[Option[Email]] =
    emailService.find(id)
}
