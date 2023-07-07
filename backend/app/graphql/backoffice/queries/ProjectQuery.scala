package graphql.backoffice.queries

import database.generated.public.Project
import graphql.Private
import graphql.backoffice.BackofficeContext
import sangria.macros.derive.{GraphQLField, GraphQLFieldTags}

import java.util.UUID
import scala.concurrent.Future

trait ProjectQuery {
  context: BackofficeContext =>

  @GraphQLField
  @GraphQLFieldTags(Private)
  def projects: Future[Seq[Project]] =
    runWithUserAccount(projectService.all)

  @GraphQLField
  @GraphQLFieldTags(Private)
  def project(id: UUID): Future[Option[Project]] =
    runWithUserAccount(userAccount => projectService.find(id, userAccount))

  @GraphQLField
  @GraphQLFieldTags(Private)
  def projectForSurvey(surveyId: UUID): Future[Option[Project]] =
    runWithUserAccount(userAccount => projectService.findForSurvey(userAccount, surveyId))
}
