package graphql.backoffice.mutations

import database.generated.public.ProjectModule
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.ProjectModuleCreation
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ProjectModuleMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createProjectModule(creation: ProjectModuleCreation): Future[ProjectModule] =
    projectModuleService.create(creation)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteProjectModule(id: UUID): Future[ProjectModule] =
    projectModuleService.delete(id)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def repositionProjectModule(id: UUID, predecessorId: Option[UUID]): Future[ProjectModule] =
    projectModuleService.reposition(id, predecessorId)
}
