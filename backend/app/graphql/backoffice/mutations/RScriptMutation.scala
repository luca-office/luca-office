package graphql.backoffice.mutations

import database.generated.public.RScript
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{RScriptCreation, RScriptUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait RScriptMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createRScript(creation: RScriptCreation): Future[RScript] =
    runWithUserAccount(rScriptService.create(_)(creation))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateRScript(id: UUID, update: RScriptUpdate): Future[RScript] =
    runWithUserAccount(rScriptService.update(_)(id, update))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteRScript(id: UUID): Future[UUID] =
    runWithUserAccount(rScriptService.delete(_)(id))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def archiveRScript(id: UUID): Future[RScript] =
    runWithUserAccount(rScriptService.archive(_)(id))
}
