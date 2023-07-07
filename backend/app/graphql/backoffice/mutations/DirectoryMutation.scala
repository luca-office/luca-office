package graphql.backoffice.mutations

import database.generated.public.Directory
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{DirectoryCreation, DirectoryUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait DirectoryMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createDirectory(creation: DirectoryCreation): Future[Directory] =
    directoryService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateDirectory(id: UUID, update: DirectoryUpdate): Future[Directory] =
    directoryService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteDirectory(id: UUID): Future[UUID] =
    directoryService.delete(id)
}
