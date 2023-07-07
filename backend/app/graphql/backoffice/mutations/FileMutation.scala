package graphql.backoffice.mutations

import database.generated.public.File
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.{FileCreation, FileUpdate}
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait FileMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createFile(creation: FileCreation): Future[File] =
    fileService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def updateFile(id: UUID, update: FileUpdate): Future[File] =
    fileService.update(id, update)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteFile(id: UUID): Future[UUID] =
    fileService.delete(id)
}
