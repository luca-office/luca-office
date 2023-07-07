package graphql.backoffice.queries

import database.generated.public.UserAccount
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait UserAccountQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def userAccounts: Future[Seq[UserAccount]] =
    userAccountService.all

  @GraphQLField
  @GraphQLFieldTags(Private)
  def userAccount(id: UUID): Future[Option[UserAccount]] =
    userAccountService.find(id)

  @GraphQLField
  def checkLogin: Option[UserAccount] = userAccountOption
}
