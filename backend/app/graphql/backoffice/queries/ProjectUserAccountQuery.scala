package graphql.backoffice.queries

import database.generated.public.{Project, UserAccount}
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ProjectUserAccountQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def userAccountsForProject(projectId: UUID): Future[Seq[UserAccount]] =
    projectUserAccountService.userAccountsForProject(projectId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def projectsForUserAccount(userAccountId: UUID): Future[Seq[Project]] =
    projectUserAccountService.projectsForUserAccount(userAccountId)
}
