package graphql.backoffice.mutations

import database.generated.public.Email
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{EmailCreation, EmailUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait EmailMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createEmail(creation: EmailCreation): Future[Email] =
    emailService.createEmail(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateEmail(id: UUID, update: EmailUpdate): Future[Email] =
    emailService.updateEmail(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteEmail(id: UUID): Future[UUID] =
    emailService.delete(id)
}
