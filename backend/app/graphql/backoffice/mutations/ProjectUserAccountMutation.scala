package graphql.backoffice.mutations

import database.generated.public.ProjectUserAccount
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ProjectUserAccountMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createProjectUserAccount(projectId: UUID, userAccountId: UUID): Future[ProjectUserAccount] =
    projectUserAccountService.create(projectId, userAccountId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteProjectUserAccount(projectId: UUID, userAccountId: UUID): Future[ProjectUserAccount] =
    projectUserAccountService.delete(projectId, userAccountId)
}
