package graphql.backoffice.mutations

import database.generated.public.SurveyUserAccount
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SurveyUserAccountMutation {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def createSurveyUserAccount(surveyId: UUID, userAccountId: UUID): Future[SurveyUserAccount] =
    surveyUserAccountService.create(surveyId, userAccountId)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def deleteSurveyUserAccount(surveyId: UUID, userAccountId: UUID): Future[SurveyUserAccount] =
    surveyUserAccountService.delete(surveyId, userAccountId)
}
