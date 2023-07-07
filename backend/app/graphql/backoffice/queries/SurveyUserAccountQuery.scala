package graphql.backoffice.queries

import database.generated.public.{Survey, UserAccount}
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SurveyUserAccountQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def userAccountsForSurvey(surveyId: UUID): Future[Seq[UserAccount]] =
    surveyUserAccountService.userAccountsForSurvey(surveyId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def surveysForUserAccount(userAccountId: UUID): Future[Seq[Survey]] =
    surveyUserAccountService.surveysForUserAccount(userAccountId)
}
