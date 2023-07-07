package graphql.backoffice.queries

import database.generated.public.ProjectModule
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ProjectModuleQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def projectModules(projectId: UUID): Future[Seq[ProjectModule]] =
    projectModuleService.all(projectId)
}
