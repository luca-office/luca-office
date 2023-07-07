package graphql.backoffice.queries

import database.generated.public.Survey
import graphql.Private
import graphql.backoffice.BackofficeContext
import models.SurveyParticipationInfo
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait SurveyQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def surveys(projectId: UUID): Future[Seq[Survey]] =
    runWithUserAccount(userAccount => surveyService.all(projectId, userAccount))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def survey(id: UUID): Future[Option[Survey]] =
    runWithUserAccount(userAccount => surveyService.find(id, userAccount))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def surveyParticipationInfo(token: String): Future[Option[SurveyParticipationInfo]] =
    surveyService.findParticipationInfo(token)
}
